import React, { useState, useEffect } from 'react';
import { BlogPost, PostStatus } from '../types';
import { BLOG_CATEGORIES, PRESET_IMAGES } from '../data/blogData';
import {
  Save,
  Send,
  Eye,
  ArrowLeft,
  Calendar,
  Clock,
  Sparkles,
  Image,
  Tag,
  FileText,
  Search,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';

interface AdminPostEditorProps {
  post: BlogPost | null;
  onSave: (post: BlogPost) => Promise<boolean>;
  onPreview: (post: BlogPost) => void;
  onCancel: () => void;
}

export const AdminPostEditor: React.FC<AdminPostEditorProps> = ({
  post,
  onSave,
  onPreview,
  onCancel,
}) => {
  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [category, setCategory] = useState(post?.category || BLOG_CATEGORIES[0]);
  const [customCategory, setCustomCategory] = useState('');
  const [tagsInput, setTagsInput] = useState(post?.tags?.join(', ') || 'Customs, Logistics, Trade');
  const [authorName, setAuthorName] = useState(post?.authorName || 'PARTNER 1');
  const [authorRole, setAuthorRole] = useState(post?.authorRole || 'Co-Founder');
  const [coverImage, setCoverImage] = useState(post?.coverImage || PRESET_IMAGES[0].url);
  const [coverImageAlt, setCoverImageAlt] = useState(post?.coverImageAlt || '');
  const [status, setStatus] = useState<PostStatus>(post?.status || 'published');
  const [scheduledDate, setScheduledDate] = useState(post?.scheduledDate || '');
  const [publishedAt, setPublishedAt] = useState(
    post?.publishedAt || new Date().toISOString().split('T')[0]
  );
  const [readTimeMinutes, setReadTimeMinutes] = useState(post?.readTimeMinutes || 5);
  const [featured, setFeatured] = useState(post?.featured || false);

  // SEO fields
  const [metaTitle, setMetaTitle] = useState(post?.seo?.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(post?.seo?.metaDescription || '');
  const [focusKeyword, setFocusKeyword] = useState(post?.seo?.focusKeyword || '');
  const [canonicalUrl, setCanonicalUrl] = useState(post?.seo?.canonicalUrl || '');

  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Auto-generate slug when title changes if new post
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!post) {
      const generatedSlug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generatedSlug);
    }
  };

  const constructPostObject = (targetStatus: PostStatus): BlogPost => {
    const finalCategory =
      category === 'CUSTOM' && customCategory.trim() ? customCategory.trim() : category;

    const finalTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const wordCount = content.trim().split(/\s+/).length;
    const computedReadTime = Math.max(2, Math.ceil(wordCount / 180));

    return {
      id: post ? post.id : `post-${Date.now()}`,
      slug: slug.trim() || 'untitled-post',
      title: title.trim() || 'Untitled Post',
      excerpt: excerpt.trim() || title.trim(),
      content: content.trim(),
      category: finalCategory,
      tags: finalTags.length ? finalTags : ['Logistics'],
      authorName: authorName.trim() || 'PARTNER 1',
      authorRole: authorRole.trim() || 'Co-Founder',
      coverImage: coverImage.trim() || PRESET_IMAGES[0].url,
      coverImageAlt: coverImageAlt.trim() || title.trim(),
      publishedAt: publishedAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      readTimeMinutes: computedReadTime,
      status: targetStatus,
      scheduledDate: targetStatus === 'scheduled' ? scheduledDate : undefined,
      featured,
      seo: {
        metaTitle: metaTitle.trim() || `${title} | Tuna NP Portlink Logistics`,
        metaDescription: metaDescription.trim() || excerpt.slice(0, 155),
        focusKeyword: focusKeyword.trim() || finalTags[0] || 'customs clearance',
        canonicalUrl: canonicalUrl.trim() || `https://tunaportlink.com/#blog/${slug.trim()}`,
      },
    };
  };

  const handleAction = async (targetStatus: PostStatus) => {
    if (!title.trim()) {
      setErrorMessage('Post Title is required.');
      return;
    }
    if (!slug.trim()) {
      setErrorMessage('URL Slug is required.');
      return;
    }
    if (!content.trim()) {
      setErrorMessage('Post Content is required.');
      return;
    }

    setSaving(true);
    setErrorMessage('');

    try {
      const postData = constructPostObject(targetStatus);
      const success = await onSave(postData);
      if (!success) {
        setErrorMessage('Failed to save post. Please check your credentials and server connection.');
      }
    } catch {
      setErrorMessage('Error during post save operation.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Editor Action Header */}
      <div className="sticky top-16 z-20 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            title="Back to post list"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">
              {post ? 'EDITING POST' : 'CREATING NEW POST'}
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 truncate max-w-md sm:max-w-xl">
              {title || 'Untitled Post Draft'}
            </h2>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onPreview(constructPostObject(status))}
            className="px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4 text-slate-500" />
            <span>PREVIEW</span>
          </button>

          <button
            onClick={() => handleAction('draft')}
            disabled={saving}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-slate-600" />
            <span>SAVE DRAFT</span>
          </button>

          <button
            onClick={() => handleAction('published')}
            disabled={saving}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold tracking-wider flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>PUBLISH</span>
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Column: Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Title & Slug */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Article Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Understanding Import Customs Clearance at Kandla & Mundra"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm sm:text-base font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                URL Slug * (public path: /blog/slug)
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2.5 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-xs text-slate-500 font-mono">
                  /blog/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="customs-clearance-kandla-mundra"
                  className="flex-grow px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-r-xl text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Summary / Excerpt *
              </label>
              <textarea
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Concise overview summarizing the article for cards and search snippets..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
              />
            </div>
          </div>

          {/* Body Content */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Article Body Content (Markdown Supported) *
              </label>
              <span className="text-[11px] text-slate-400">
                Use ## for H2, ### for H3, * for bullets
              </span>
            </div>

            <textarea
              rows={16}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your article content here in clear, structured paragraphs..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
            />
          </div>

          {/* SEO & Search Engine Optimization Box */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 border-b border-slate-100 pb-3">
              <Search className="w-4 h-4" />
              <span>SEARCH ENGINE OPTIMIZATION (SEO) & OPEN GRAPH</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">SEO Title</label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="Defaults to article title"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Focus Keyword</label>
                <input
                  type="text"
                  value={focusKeyword}
                  onChange={(e) => setFocusKeyword(e.target.value)}
                  placeholder="e.g. customs clearance gandhidham"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Meta Description</label>
              <textarea
                rows={2}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Recommended 140-160 characters for search engine result snippets..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Canonical URL</label>
              <input
                type="text"
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                placeholder="https://tunaportlink.com/#blog/slug"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-600"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Column: Settings & Metadata */}
        <div className="lg:col-span-4 space-y-6">
          {/* Publishing Status Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2">
              Publication Settings
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Current Post Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PostStatus)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="published">PUBLISHED (Live on Website)</option>
                <option value="draft">DRAFT (Internal / Hidden)</option>
                <option value="scheduled">SCHEDULED (Automatic Release)</option>
                <option value="unpublished">UNPUBLISHED (Archived)</option>
              </select>
            </div>

            {status === 'scheduled' && (
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 space-y-1.5 animate-in fade-in">
                <label className="block text-xs font-bold text-blue-900">
                  Release Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg text-xs font-mono"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Publication Date
              </label>
              <input
                type="date"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="featured-post-check"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="featured-post-check" className="text-xs font-semibold text-slate-700 cursor-pointer">
                Feature as Highlighted Header Article
              </label>
            </div>
          </div>

          {/* Category & Tags Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2">
              Taxonomy & Categorization
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Primary Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800"
              >
                {BLOG_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
                <option value="CUSTOM">+ Add Custom Category</option>
              </select>
            </div>

            {category === 'CUSTOM' && (
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Enter new category name..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Customs, Mundra Port, Bill of Entry"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>

          {/* Author Details Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2">
              Author Attribution
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Author Name</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="PARTNER 1"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Author Role</label>
              <input
                type="text"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                placeholder="Co-Founder"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>

          {/* Featured Image Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2">
              Featured Cover Image
            </h3>

            {coverImage && (
              <div className="rounded-lg overflow-hidden border border-slate-200 h-32 bg-slate-100">
                <img src={coverImage} alt="Cover preview" className="w-full h-full object-cover" />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Image Alt Text
              </label>
              <input
                type="text"
                value={coverImageAlt}
                onChange={(e) => setCoverImageAlt(e.target.value)}
                placeholder="Descriptive alt text for accessibility & SEO"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">
                Quick Select Presets:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setCoverImage(preset.url);
                      setCoverImageAlt(preset.label);
                    }}
                    className={`p-1.5 rounded-lg border text-left text-[11px] truncate transition-all cursor-pointer ${
                      coverImage === preset.url
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
