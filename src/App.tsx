import React, { useState, useEffect, useCallback } from 'react';
import { PageRoute, BlogPost } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { BlogLandingPage } from './pages/BlogLandingPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AdminApp } from './admin/AdminApp';
import { getBlogPosts } from './data/blogData';

// Helper to check if current environment/URL is the Admin CMS
const checkIsAdminContext = (): boolean => {
  const host = window.location.hostname.toLowerCase();
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  return (
    host.startsWith('admin.') ||
    path.startsWith('/secure-admin-panel') ||
    hash.startsWith('#secure-admin-panel') ||
    hash.startsWith('#admin')
  );
};

export default function App() {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => checkIsAdminContext());

  // Listen for hash / history changes to route to admin panel if requested
  useEffect(() => {
    const handleUrlChange = () => {
      setIsAdmin(checkIsAdminContext());
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // If in admin mode, mount the strictly isolated Admin Application
  if (isAdmin) {
    return <AdminApp />;
  }

  // Otherwise, mount the 100% public website
  return <PublicWebsiteApp />;
}

function PublicWebsiteApp() {
  // Parse initial route and params from URL path or hash
  const parseRouteFromUrl = (): { route: PageRoute; slug?: string; serviceId?: string } => {
    const rawHash = window.location.hash.replace('#', '').trim();
    const cleanHash = rawHash.startsWith('/') ? rawHash.slice(1) : rawHash;
    const path = window.location.pathname.toLowerCase();

    // Blog post deep-link: #blog/slug-name or /blog/slug-name
    if (cleanHash.startsWith('blog/') || path.includes('/blog/')) {
      const parts = cleanHash.startsWith('blog/')
        ? cleanHash.split('/')
        : path.split('/blog/')[1]?.split('/');
      const slug = parts && parts[1] ? parts[1] : '';
      if (slug) {
        return { route: 'blog-post', slug };
      }
      return { route: 'blog' };
    }

    if (cleanHash === 'blog' || path === '/blog') return { route: 'blog' };
    if (cleanHash === 'about' || path === '/about') return { route: 'about' };
    if (cleanHash === 'services' || path === '/services') return { route: 'services' };
    if (cleanHash === 'contact' || path === '/contact') return { route: 'contact' };

    return { route: 'home' };
  };

  const initialParsed = parseRouteFromUrl();
  const [currentPage, setCurrentPage] = useState<PageRoute>(initialParsed.route);
  const [currentSlug, setCurrentSlug] = useState<string>(initialParsed.slug || '');
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(
    initialParsed.serviceId
  );

  // Published blog posts state (filtered strictly to published posts)
  const [publishedPosts, setPublishedPosts] = useState<BlogPost[]>(() =>
    getBlogPosts().filter((p) => p.status === 'published')
  );

  // Fetch published blog posts from public API with client fallback
  useEffect(() => {
    const fetchPublishedPosts = async () => {
      try {
        const res = await fetch('/api/blog/posts');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data?.posts) && data.posts.length > 0) {
            // Strictly published articles only
            setPublishedPosts(data.posts.filter((p: BlogPost) => p.status === 'published'));
          }
        }
      } catch {
        // Fallback to local default published posts
      }
    };

    fetchPublishedPosts();
  }, []);

  // Update document title dynamically based on current page
  useEffect(() => {
    switch (currentPage) {
      case 'home':
        document.title = 'Tuna NP Portlink Logistics | Customs Broker & Logistics Services';
        break;
      case 'about':
        document.title = 'About Us | Tuna NP Portlink Logistics';
        break;
      case 'services':
        document.title = 'Customs & Logistics Solutions | Tuna NP Portlink Logistics';
        break;
      case 'contact':
        document.title = 'Contact Us | Tuna NP Portlink Logistics - Gandhidham';
        break;
      case 'blog':
        document.title = 'Blog & Industry Insights | Tuna NP Portlink Logistics';
        break;
      case 'blog-post':
        // Managed dynamically in BlogPostPage based on post SEO title
        break;
      default:
        document.title = 'Tuna NP Portlink Logistics | Customs Broker & Logistics Services';
    }
  }, [currentPage]);

  // Handle browser back and forward
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseRouteFromUrl();
      setCurrentPage(parsed.route);
      if (parsed.slug) setCurrentSlug(parsed.slug);
      if (parsed.serviceId) setSelectedServiceId(parsed.serviceId);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Main navigation handler with strict scroll-to-top reset
  const handleNavigate = useCallback(
    (page: PageRoute, targetParam?: string) => {
      if (page === 'services') {
        setSelectedServiceId(targetParam);
      } else {
        setSelectedServiceId(undefined);
      }

      if (page === 'blog-post' && targetParam) {
        setCurrentSlug(targetParam);
      }

      // If already on the same page and no parameter change, scroll smoothly to top
      if (currentPage === page && !targetParam) {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        return;
      }

      // Update URL hash/state cleanly
      let newHash = '';
      if (page === 'home') {
        newHash = '';
      } else if (page === 'blog-post' && targetParam) {
        newHash = `#blog/${targetParam}`;
      } else {
        newHash = `#${page}`;
      }

      if (window.location.hash !== newHash) {
        window.history.pushState({ page, targetParam }, '', newHash || window.location.pathname);
      }

      setCurrentPage(page);

      // Force instant scroll reset to top of the new page
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    },
    [currentPage]
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F2] text-[#17221D]">
      {/* Sticky Header */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Area with subtle, fast transition (200ms fade) */}
      <main id="main-content" className="flex-grow">
        <div key={currentPage + (currentSlug || '')} className="animate-in fade-in duration-200">
          {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}

          {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}

          {currentPage === 'services' && (
            <ServicesPage
              onNavigate={handleNavigate}
              initialServiceId={selectedServiceId}
            />
          )}

          {currentPage === 'blog' && (
            <BlogLandingPage
              onNavigate={handleNavigate}
              posts={publishedPosts}
            />
          )}

          {currentPage === 'blog-post' && (
            <BlogPostPage
              slug={currentSlug}
              onNavigate={handleNavigate}
              allPosts={publishedPosts}
            />
          )}

          {currentPage === 'contact' && (
            <ContactPage
              onNavigate={handleNavigate}
              preselectedServiceId={selectedServiceId}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
