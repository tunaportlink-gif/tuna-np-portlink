import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { DEFAULT_BLOG_POSTS } from './src/data/blogData.js';
import { BlogPost, NewsletterSubscriber } from './src/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// Ensure data directory exists
const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const POSTS_FILE = path.join(DATA_DIR, 'posts.json');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json');

// --- Helper Functions for Data Persistence ---
function loadPosts(): BlogPost[] {
  try {
    if (fs.existsSync(POSTS_FILE)) {
      const raw = fs.readFileSync(POSTS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading posts.json, fallback to defaults:', err);
  }
  // Initialize with DEFAULT_BLOG_POSTS
  try {
    fs.writeFileSync(POSTS_FILE, JSON.stringify(DEFAULT_BLOG_POSTS, null, 2), 'utf-8');
  } catch {
    // ignore
  }
  return DEFAULT_BLOG_POSTS;
}

function savePosts(posts: BlogPost[]): void {
  try {
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save posts to disk:', err);
  }
}

function loadSubscribers(): NewsletterSubscriber[] {
  try {
    if (fs.existsSync(SUBSCRIBERS_FILE)) {
      const raw = fs.readFileSync(SUBSCRIBERS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.error('Error loading subscribers.json:', err);
  }
  return [];
}

function saveSubscribers(subs: NewsletterSubscriber[]): void {
  try {
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subs, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save subscribers to disk:', err);
  }
}

// In-memory caches
let postsCache: BlogPost[] = loadPosts();
let subscribersCache: NewsletterSubscriber[] = loadSubscribers();

// --- Rate Limiting & Brute-Force Protection ---
interface FailedAttempt {
  count: number;
  firstAttempt: number;
  lockedUntil: number;
}

const failedAttemptsMap = new Map<string, FailedAttempt>();
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

// --- Session Store ---
interface AdminSession {
  token: string;
  userId: string;
  email: string;
  role: 'admin';
  createdAt: number;
  expiresAt: number;
  ip: string;
}

const activeSessions = new Map<string, AdminSession>();
const SESSION_LIFETIME_MS = 24 * 60 * 60 * 1000; // 24 hours

// Middleware setup
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Authentication Guard Middleware for /api/admin/*
function requireAdminAuth(req: Request, res: Response, next: NextFunction): void {
  const cookieToken = req.cookies?.admin_session;
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const token = cookieToken || bearerToken;

  if (!token) {
    res.status(401).json({ error: 'Unauthorized: No active admin session.' });
    return;
  }

  const session = activeSessions.get(token);
  if (!session) {
    res.status(401).json({ error: 'Unauthorized: Session invalid or expired.' });
    return;
  }

  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    res.status(401).json({ error: 'Unauthorized: Session has expired.' });
    return;
  }

  // Attach session to request
  (req as any).adminSession = session;
  next();
}

// ==========================================
// 1. PUBLIC API ROUTES
// ==========================================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// GET /api/blog/posts - Public list of published blog posts only
app.get('/api/blog/posts', (req, res) => {
  // STRICT SECURITY MANDATE: Only posts with status === 'published' are served to public!
  const publishedOnly = postsCache.filter((p) => p.status === 'published');
  res.json({ posts: publishedOnly });
});

// GET /api/blog/posts/:slug - Public single post by slug (must be published)
app.get('/api/blog/posts/:slug', (req, res) => {
  const { slug } = req.params;
  const post = postsCache.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase() && p.status === 'published'
  );

  if (!post) {
    res.status(404).json({ error: 'Post not found or unavailable.' });
    return;
  }

  res.json({ post });
});

// POST /api/newsletter/subscribe - Public newsletter subscription
app.post('/api/newsletter/subscribe', (req, res) => {
  const { email, source } = req.body;
  if (!email || typeof email !== 'string') {
    res.status(400).json({ success: false, message: 'A valid email address is required.' });
    return;
  }

  const cleanEmail = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    res.status(400).json({ success: false, message: 'Invalid email address format.' });
    return;
  }

  // Deduplicate
  const existing = subscribersCache.find((s) => s.email.toLowerCase() === cleanEmail);
  if (existing) {
    res.json({
      success: true,
      message: 'You are already subscribed to Tuna NP Portlink industry insights.',
    });
    return;
  }

  const newSub: NewsletterSubscriber = {
    id: `sub-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    email: cleanEmail,
    subscribedAt: new Date().toISOString().split('T')[0],
    source: typeof source === 'string' ? source : 'Website Insights Signup',
    status: 'active',
  };

  subscribersCache.push(newSub);
  saveSubscribers(subscribersCache);

  res.json({
    success: true,
    message: 'Thank you for subscribing! You will receive future industry updates and customs advisories.',
  });
});

// ==========================================
// 2. ADMIN AUTHENTICATION & API ROUTES
// ==========================================

// POST /api/admin/login
app.post('/api/admin/login', (req, res) => {
  const { adminId, password } = req.body;
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown-ip';
  const identifierKey = `${clientIp}_${String(adminId || '').toLowerCase()}`;

  // Check brute force lockout
  const attemptRecord = failedAttemptsMap.get(identifierKey);
  const now = Date.now();

  if (attemptRecord && attemptRecord.lockedUntil > now) {
    const remainingSeconds = Math.ceil((attemptRecord.lockedUntil - now) / 1000);
    res.status(429).json({
      error: 'Security lockout: Too many failed attempts.',
      lockoutRemaining: remainingSeconds,
    });
    return;
  }

  // Configured Admin Credentials
  const expectedAdminId = process.env.ADMIN_ID || 'admin@tunanpportlink.com';
  const expectedPassword = process.env.ADMIN_PASSWORD || 'Portlink@Admin2026!';

  // Constant-time check or strict verification
  const isValidUser =
    String(adminId || '').trim().toLowerCase() === expectedAdminId.toLowerCase() ||
    String(adminId || '').trim() === 'admin';
  const isValidPassword = String(password || '') === expectedPassword;

  if (!isValidUser || !isValidPassword) {
    // Record failed attempt
    const current = failedAttemptsMap.get(identifierKey) || {
      count: 0,
      firstAttempt: now,
      lockedUntil: 0,
    };

    if (now - current.firstAttempt > ATTEMPT_WINDOW_MS) {
      current.count = 1;
      current.firstAttempt = now;
    } else {
      current.count += 1;
    }

    if (current.count >= MAX_FAILED_ATTEMPTS) {
      current.lockedUntil = now + LOCKOUT_DURATION_MS;
      failedAttemptsMap.set(identifierKey, current);
      res.status(429).json({
        error: 'Security lockout: Account temporarily locked for 15 minutes due to multiple failed attempts.',
        lockoutRemaining: Math.ceil(LOCKOUT_DURATION_MS / 1000),
      });
      return;
    }

    failedAttemptsMap.set(identifierKey, current);

    // Generic error message to prevent enumeration
    res.status(401).json({ error: 'Invalid credentials or access denied.' });
    return;
  }

  // Success - Clear failed attempts
  failedAttemptsMap.delete(identifierKey);

  // Generate cryptographically secure session token
  const token = crypto.randomBytes(32).toString('hex');
  const session: AdminSession = {
    token,
    userId: 'admin-01',
    email: expectedAdminId,
    role: 'admin',
    createdAt: now,
    expiresAt: now + SESSION_LIFETIME_MS,
    ip: clientIp,
  };

  activeSessions.set(token, session);

  // Set secure HttpOnly cookie
  res.cookie('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_LIFETIME_MS,
    path: '/',
  });

  res.json({
    success: true,
    user: {
      id: session.userId,
      email: session.email,
      role: session.role,
    },
  });
});

// POST /api/admin/logout
app.post('/api/admin/logout', (req, res) => {
  const token = req.cookies?.admin_session;
  if (token) {
    activeSessions.delete(token);
  }
  res.clearCookie('admin_session', { path: '/' });
  res.json({ success: true });
});

// GET /api/admin/session - Verify session
app.get('/api/admin/session', requireAdminAuth, (req, res) => {
  const session = (req as any).adminSession as AdminSession;
  res.json({
    authenticated: true,
    user: {
      id: session.userId,
      email: session.email,
      role: session.role,
    },
  });
});

// GET /api/admin/posts - Get ALL posts (draft, scheduled, published, unpublished)
app.get('/api/admin/posts', requireAdminAuth, (req, res) => {
  res.json({ posts: postsCache });
});

// POST /api/admin/posts - Create new post
app.post('/api/admin/posts', requireAdminAuth, (req, res) => {
  const postData = req.body as BlogPost;
  if (!postData.title || !postData.slug || !postData.content) {
    res.status(400).json({ error: 'Title, slug, and content are required.' });
    return;
  }

  // Ensure unique ID
  const newPost: BlogPost = {
    ...postData,
    id: postData.id || `post-${Date.now()}`,
    publishedAt: postData.publishedAt || new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
  };

  // Add to beginning of array
  postsCache = [newPost, ...postsCache.filter((p) => p.id !== newPost.id)];
  savePosts(postsCache);

  res.status(201).json({ success: true, post: newPost });
});

// PUT /api/admin/posts/:id - Update existing post
app.put('/api/admin/posts/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const postData = req.body as BlogPost;

  const index = postsCache.findIndex((p) => p.id === id);
  if (index === -1) {
    // If not found by id, check slug or append
    postsCache = [postData, ...postsCache.filter((p) => p.id !== postData.id)];
  } else {
    postsCache[index] = {
      ...postData,
      id,
      updatedAt: new Date().toISOString().split('T')[0],
    };
  }

  savePosts(postsCache);
  res.json({ success: true, post: postsCache[index] || postData });
});

// DELETE /api/admin/posts/:id - Delete post
app.delete('/api/admin/posts/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  postsCache = postsCache.filter((p) => p.id !== id);
  savePosts(postsCache);
  res.json({ success: true, id });
});

// GET /api/admin/preview/:id - Get private preview of any post
app.get('/api/admin/preview/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const post = postsCache.find((p) => p.id === id);
  if (!post) {
    res.status(404).json({ error: 'Preview article not found.' });
    return;
  }
  res.json({ post });
});

// GET /api/admin/subscribers - Get newsletter subscribers list
app.get('/api/admin/subscribers', requireAdminAuth, (req, res) => {
  res.json({ subscribers: subscribersCache });
});

// DELETE /api/admin/subscribers/:id - Remove subscriber
app.delete('/api/admin/subscribers/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  subscribersCache = subscribersCache.filter((s) => s.id !== id);
  saveSubscribers(subscribersCache);
  res.json({ success: true, id });
});

// ==========================================
// 3. VITE MIDDLEWARE & STATIC SERVING
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`Tuna NP Portlink Server running on http://${HOST}:${PORT}`);
  });
}

startServer();
