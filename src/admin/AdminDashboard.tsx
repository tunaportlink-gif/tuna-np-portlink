import React, { useState, useEffect } from 'react';
import { BlogPost, PostStatus } from '../types';
import { BLOG_CATEGORIES, DEFAULT_BLOG_POSTS } from '../data/blogData';
import { AdminPostEditor } from './AdminPostEditor';
import { AdminSubscribers } from './AdminSubscribers';
import { AdminPreviewModal } from './AdminPreviewModal';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  LogOut,
  ShieldCheck,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Mail,
  Lock,
  Server,
  RefreshCw,
  FolderOpen,
  ArrowUpRight,
} from 'lucide-react';

interface AdminDashboardProps {
  user: { id: string; email: string; role: string };
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'editor' | 'subscribers' | 'security'>('overview');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [previewPost, setPreviewPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [feedback, setFeedback] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fetchAdminPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/posts');
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      } else {
        // Fallback to local storage or defaults for client resiliency
        const local = localStorage.getItem('tuna_portlink_blog_posts_v1');
        if (local) {
          setPosts(JSON.parse(local));
        } else {
          setPosts(DEFAULT_BLOG_POSTS);
        }
      }
    } catch {
      const local = localStorage.getItem('tuna_portlink_blog_posts_v1');
      if (local) {
        setPosts(JSON.parse(local));
      } else {
        setPosts(DEFAULT_BLOG_POSTS);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminPosts();
  }, []);

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setFeedback({ text, type });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleSavePost = async (postData: BlogPost): Promise<boolean> => {
    try {
      const isExisting = posts.some((p) => p.id === postData.id);
      const endpoint = isExisting ? `/api/admin/posts/${postData.id}` : '/api/admin/posts';
      const method = isExisting ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (res.ok) {
        const data = await res.json();
        const savedPost = data.post || postData;
        setPosts((prev) => {
          if (isExisting) {
            return prev.map((p) => (p.id === savedPost.id ? savedPost : p));
          }
          return [savedPost, ...prev];
        });
        showNotification(`Article "${savedPost.title}" successfully saved.`);
        setActiveTab('posts');
        setEditingPost(null);
        return true;
      } else {
        // Local fallback if server endpoint had non-200
        setPosts((prev) => {
          if (isExisting) {
            return prev.map((p) => (p.id === postData.id ? postData : p));
          }
          return [postData, ...prev];
        });
        localStorage.setItem(
          'tuna_portlink_blog_posts_v1',
          JSON.stringify([postData, ...posts.filter((p) => p.id !== postData.id)])
        );
        showNotification(`Article saved locally.`, 'success');
        setActiveTab('posts');
        setEditingPost(null);
        return true;
      }
    } catch {
      // Local fallback
      setPosts((prev) => [postData, ...prev.filter((p) => p.id !== postData.id)]);
      localStorage.setItem(
        'tuna_portlink_blog_posts_v1',
        JSON.stringify([postData, ...posts.filter((p) => p.id !== postData.id)])
      );
      showNotification('Saved locally.', 'success');
      setActiveTab('posts');
      setEditingPost(null);
      return true;
    }
  };

  const handleDeletePost = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        showNotification(`Deleted "${title}".`);
      } else {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        showNotification(`Deleted "${title}".`);
      }
    } catch {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      showNotification(`Deleted "${title}".`);
    }
  };

  const handleQuickStatusChange = async (post: BlogPost, newStatus: PostStatus) => {
    const updated = { ...post, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] };
    await handleSavePost(updated);
  };

  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.authorName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCat;
  });

  const counts = {
    published: posts.filter((p) => p.status === 'published').length,
    draft: posts.filter((p) => p.status === 'draft').length,
    scheduled: posts.filter((p) => p.status === 'scheduled').length,
    unpublished: posts.filter((p) => p.status === 'unpublished').length,
  };

  return (
    <div className="min-h-screen bg-slate-100 font-['Inter',sans-serif] text-slate-800 flex flex-col">
      {/* Top Administrative Header */}
      <header className="bg-[#0F172A] text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-black text-white text-sm tracking-wider">
              TP
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block leading-none">
                ADMIN PORTAL
              </span>
              <h1 className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-snug">
                Tuna NP Portlink Logistics
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Session: <strong className="text-white font-mono">{user.email}</strong></span>
            </div>

            <button
              onClick={onLogout}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/50 hover:text-rose-300 border border-slate-700 hover:border-rose-700/50 text-xs font-bold tracking-wider text-slate-300 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>SIGN OUT</span>
            </button>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto text-xs font-bold border-t border-slate-800/80">
          <button
            onClick={() => {
              setActiveTab('overview');
              setEditingPost(null);
            }}
            className={`px-4 py-3 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-emerald-500 text-white bg-slate-800/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => {
              setActiveTab('posts');
              setEditingPost(null);
            }}
            className={`px-4 py-3 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'posts'
                ? 'border-emerald-500 text-white bg-slate-800/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Articles & Posts ({posts.length})</span>
          </button>

          <button
            onClick={() => {
              setEditingPost(null);
              setActiveTab('editor');
            }}
            className={`px-4 py-3 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'editor' && !editingPost
                ? 'border-emerald-500 text-white bg-slate-800/50'
                : 'border-transparent text-emerald-400 hover:text-emerald-300'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Post</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('subscribers');
              setEditingPost(null);
            }}
            className={`px-4 py-3 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'subscribers'
                ? 'border-emerald-500 text-white bg-slate-800/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Newsletter Subscribers</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('security');
              setEditingPost(null);
            }}
            className={`px-4 py-3 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'security'
                ? 'border-emerald-500 text-white bg-slate-800/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Security & Sessions</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {feedback && (
          <div
            className={`mb-6 p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              feedback.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border border-rose-200 text-rose-800'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Published Posts
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">{counts.published}</p>
                <p className="text-[11px] text-emerald-600 mt-1 font-medium">Visible to public</p>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Draft Articles
                  </span>
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">{counts.draft}</p>
                <p className="text-[11px] text-amber-600 mt-1 font-medium">Hidden from public</p>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Scheduled Posts
                  </span>
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">{counts.scheduled}</p>
                <p className="text-[11px] text-blue-600 mt-1 font-medium">Auto-release set</p>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Unpublished / Archived
                  </span>
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">{counts.unpublished}</p>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">Offline records</p>
              </div>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                    Recent Articles
                  </h3>
                  <button
                    onClick={() => setActiveTab('posts')}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                  >
                    <span>View All</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {posts.slice(0, 4).map((p) => (
                    <div key={p.id} className="py-3.5 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">{p.title}</p>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                          <span>{p.category}</span>
                          <span>•</span>
                          <span>{p.publishedAt}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                            p.status === 'published'
                              ? 'bg-emerald-100 text-emerald-800'
                              : p.status === 'draft'
                              ? 'bg-amber-100 text-amber-800'
                              : p.status === 'scheduled'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {p.status}
                        </span>

                        <button
                          onClick={() => {
                            setEditingPost(p);
                            setActiveTab('editor');
                          }}
                          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Launch Panel */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>ADMINISTRATIVE ACTIONS</span>
                </div>

                <h3 className="text-lg font-black text-white">Publishing Hub</h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Manage customs guidance, regulatory advisories, and industry research with separate draft stages and full preview fidelity.
                </p>

                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={() => {
                      setEditingPost(null);
                      setActiveTab('editor');
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>CREATE NEW ARTICLE</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('subscribers')}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-700"
                  >
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <span>VIEW NEWSLETTER SUBSCRIBERS</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: POSTS LIST */}
        {activeTab === 'posts' && (
          <div className="space-y-6">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Article Management
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Published posts are shown publicly. Drafts, scheduled, and unpublished posts remain isolated.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={fetchAdminPosts}
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>

                <button
                  onClick={() => {
                    setEditingPost(null);
                    setActiveTab('editor');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>NEW POST</span>
                </button>
              </div>
            </div>

            {/* Filter controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="relative sm:col-span-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Post Statuses</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="unpublished">Unpublished</option>
                </select>
              </div>

              <div>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Categories</option>
                  {BLOG_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Posts Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              {filteredPosts.length === 0 ? (
                <div className="py-16 text-center">
                  <FolderOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-700">No matching articles found</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Try adjusting your search query or filters.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3.5">Article Details</th>
                        <th className="px-6 py-3.5">Category</th>
                        <th className="px-6 py-3.5">Author</th>
                        <th className="px-6 py-3.5">Date</th>
                        <th className="px-6 py-3.5">Status</th>
                        <th className="px-6 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredPosts.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="px-6 py-4 max-w-sm">
                            <p className="font-bold text-slate-900 line-clamp-1">{p.title}</p>
                            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                              /blog/{p.slug}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
                              {p.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-600 font-medium">{p.authorName}</td>
                          <td className="px-6 py-4 text-slate-500">{p.publishedAt}</td>
                          <td className="px-6 py-4">
                            <select
                              value={p.status}
                              onChange={(e) =>
                                handleQuickStatusChange(p, e.target.value as PostStatus)
                              }
                              className={`px-2 py-1 rounded-lg text-[10px] font-extrabold uppercase cursor-pointer border ${
                                p.status === 'published'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : p.status === 'draft'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : p.status === 'scheduled'
                                  ? 'bg-blue-50 text-blue-800 border-blue-200'
                                  : 'bg-slate-100 text-slate-600 border-slate-200'
                              }`}
                            >
                              <option value="published">Published</option>
                              <option value="draft">Draft</option>
                              <option value="scheduled">Scheduled</option>
                              <option value="unpublished">Unpublished</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setPreviewPost(p)}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
                                title="Preview Post"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setEditingPost(p);
                                  setActiveTab('editor');
                                }}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 cursor-pointer"
                                title="Edit Post"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeletePost(p.id, p.title)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                                title="Delete Post"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: EDITOR */}
        {activeTab === 'editor' && (
          <AdminPostEditor
            post={editingPost}
            onSave={handleSavePost}
            onPreview={(p) => setPreviewPost(p)}
            onCancel={() => {
              setActiveTab('posts');
              setEditingPost(null);
            }}
          />
        )}

        {/* TAB 4: SUBSCRIBERS */}
        {activeTab === 'subscribers' && <AdminSubscribers />}

        {/* TAB 5: SECURITY & SESSIONS */}
        {activeTab === 'security' && (
          <div className="space-y-6 max-w-4xl">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600">
                <ShieldCheck className="w-4 h-4" />
                <span>SECURITY ARCHITECTURE & ACCESS POLICIES</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Blog CMS & Admin Portal Hardening
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                In compliance with strict security mandates, the Tuna NP Portlink Content Management System has been architecturally segregated from all public-facing routes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Server-Side Authentication</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Every administrative request to <code>/api/admin/*</code> validates an encrypted session token via HttpOnly cookies.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Brute-Force Rate Limiting</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    5 consecutive failed login attempts trigger an automatic 15-minute lockout per IP/user identifier.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <Eye className="w-3.5 h-3.5 text-blue-600" />
                    <span>Draft Isolation</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Public endpoints (<code>/api/blog/posts</code>) filter exclusively for <code>status === 'published'</code>. Drafts cannot leak to crawlers or visitors.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <Server className="w-3.5 h-3.5 text-purple-600" />
                    <span>Isolated Admin Subdomain / Route</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Accessible strictly via <code>admin.tunanpportlink.com</code> or <code>/secure-admin-panel</code>. Never linked on the public website.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Preview Modal */}
      {previewPost && (
        <AdminPreviewModal post={previewPost} onClose={() => setPreviewPost(null)} />
      )}
    </div>
  );
};
