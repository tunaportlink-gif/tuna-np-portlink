import React, { useState, useMemo } from 'react';
import { PageRoute, BlogPost } from '../types';
import { BLOG_CATEGORIES } from '../data/blogData';
import { NewsletterSubscribe } from '../components/NewsletterSubscribe';
import {
  Search,
  Filter,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Tag,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

interface BlogLandingPageProps {
  onNavigate: (page: PageRoute, targetSlugOrId?: string) => void;
  posts: BlogPost[];
}

export const BlogLandingPage: React.FC<BlogLandingPageProps> = ({
  onNavigate,
  posts,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Only show published articles to normal visitors
  const publishedPosts = useMemo(() => {
    return posts.filter((p) => p.status === 'published');
  }, [posts]);

  // Categories list combining predefined plus any custom categories
  const allCategories = useMemo(() => {
    const cats = new Set<string>(['All', ...BLOG_CATEGORIES]);
    publishedPosts.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats);
  }, [publishedPosts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return publishedPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        !searchQuery.trim() ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.authorName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [publishedPosts, selectedCategory, searchQuery]);

  // Featured post: either explicitly featured or the very first published post
  const featuredPost = useMemo(() => {
    if (selectedCategory !== 'All' || searchQuery.trim()) return null;
    return publishedPosts.find((p) => p.featured) || publishedPosts[0] || null;
  }, [publishedPosts, selectedCategory, searchQuery]);

  // Remaining posts (exclude featured if we are displaying it separately)
  const regularPosts = useMemo(() => {
    if (featuredPost && selectedCategory === 'All' && !searchQuery.trim()) {
      return filteredPosts.filter((p) => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost, selectedCategory, searchQuery]);

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section
        id="blog-hero"
        className="relative bg-[#0B3D2E] text-white pt-32 pb-20 overflow-hidden"
      >
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80"
            alt="Logistics container port operations"
            className="w-full h-full object-cover object-center mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B3D2E]/80 via-[#0B3D2E] to-[#0B3D2E]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#145A43]/80 border border-[#6FAF8F]/40 text-[#B89B5E] text-xs font-bold tracking-wider uppercase mb-4 shadow-sm">
                <BookOpen className="w-4 h-4 text-[#B89B5E]" />
                <span>INDUSTRY INSIGHTS & REGULATORY UPDATES</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-['Plus_Jakarta_Sans'] tracking-tight mb-4">
                Customs, Shipping & Logistics Knowledge.
              </h1>
              <p className="text-base sm:text-lg text-[#6FAF8F] font-medium leading-relaxed font-['Manrope'] max-w-2xl">
                Practical insights, regulatory breakdowns, and operational guidance for businesses navigating customs procedures and cargo movement through Western India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & FILTER TOOLBAR */}
      <section className="bg-white border-b border-gray-200 py-6 sticky top-[68px] z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Category pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {allCategories.map((cat) => {
                const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#0B3D2E] text-white shadow-2xs'
                        : 'bg-[#F7F7F2] text-gray-700 hover:bg-gray-200 border border-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-80 shrink-0">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, keywords, tags..."
                className="w-full pl-9 pr-8 py-2 bg-[#F7F7F2] border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#145A43]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-semibold"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT AREA */}
      <div className="bg-[#F7F7F2] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* FEATURED POST (Shown only on initial unfiltered view) */}
          {featuredPost && (
            <div
              id="blog-featured-card"
              onClick={() => onNavigate('blog-post', featuredPost.slug)}
              className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer grid grid-cols-1 lg:grid-cols-12"
            >
              <div className="lg:col-span-7 relative h-64 lg:h-auto overflow-hidden">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B3D2E] text-white text-xs font-extrabold uppercase tracking-wider shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-[#B89B5E]" />
                    <span>FEATURED INSIGHT</span>
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="px-2.5 py-0.5 rounded bg-[#145A43]/10 text-[#145A43] font-bold uppercase text-[11px]">
                      {featuredPost.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredPost.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredPost.readTimeMinutes} min read
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#17221D] font-['Plus_Jakarta_Sans'] group-hover:text-[#145A43] transition-colors leading-snug mb-3">
                    {featuredPost.title}
                  </h2>

                  <p className="text-sm text-[#59635D] leading-relaxed line-clamp-3 mb-6">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#0B3D2E] text-white font-bold flex items-center justify-center text-xs">
                      {featuredPost.authorName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#17221D]">{featuredPost.authorName}</p>
                      <p className="text-[11px] text-gray-500">{featuredPost.authorRole}</p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#145A43] group-hover:text-[#0B3D2E]">
                    <span>Read article</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* REGULAR POSTS GRID */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#17221D] font-['Plus_Jakarta_Sans']">
                {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
                <span className="text-xs font-normal text-gray-500 ml-2">
                  ({regularPosts.length} {regularPosts.length === 1 ? 'article' : 'articles'})
                </span>
              </h2>
            </div>

            {regularPosts.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
                <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-700">No articles found matching your criteria</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                  Try clearing your search terms or choosing another category above.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 rounded-lg bg-[#0B3D2E] text-white text-xs font-bold tracking-wider"
                >
                  RESET FILTERS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <article
                    key={post.id}
                    id={`blog-card-${post.slug}`}
                    onClick={() => onNavigate('blog-post', post.slug)}
                    className="group bg-white rounded-xl border border-gray-200 shadow-2xs hover:shadow-md hover:border-[#145A43]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      {/* Thumbnail image */}
                      <div className="relative h-48 overflow-hidden bg-gray-100">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded bg-[#0B3D2E]/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-2.5">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.publishedAt}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTimeMinutes} min read
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-[#17221D] group-hover:text-[#145A43] font-['Plus_Jakarta_Sans'] leading-snug mb-2 line-clamp-2 transition-colors">
                          {post.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-[#59635D] leading-relaxed line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 pb-6 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-[#17221D]">{post.authorName}</p>
                        <p className="text-[10px] text-gray-500">{post.authorRole}</p>
                      </div>

                      <span className="inline-flex items-center gap-1 font-bold text-[#145A43] group-hover:text-[#0B3D2E] text-xs">
                        <span>Read</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. SUBSCRIBE TO INSIGHTS NEWSLETTER */}
      <NewsletterSubscribe variant="default" source="blog-landing" />

      {/* 5. CONSULTATION STRIP */}
      <section className="bg-[#08291F] text-white py-14 border-t border-[#145A43]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#145A43] text-[#B89B5E] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#B89B5E]" />
            <span>EXPERT PROCEDURAL ADVISORY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Plus_Jakarta_Sans']">
            Navigating a Complex Customs or Logistics Matter?
          </h2>
          <p className="text-sm sm:text-base text-gray-200 max-w-xl mx-auto">
            Discuss your Bill of Entry, ICEGATE documentation, port examination, or transport requirements directly with our team in Gandhidham.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#145A43] hover:bg-[#1a7356] border border-[#6FAF8F]/50 text-white font-bold text-xs sm:text-sm tracking-wider shadow-md hover:border-[#B89B5E] transition-all cursor-pointer"
            >
              <span>CONTACT OUR CUSTOMS BROKERAGE TEAM</span>
              <ArrowRight className="w-4 h-4 text-[#B89B5E]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
