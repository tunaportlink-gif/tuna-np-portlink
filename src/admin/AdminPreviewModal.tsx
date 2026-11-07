import React from 'react';
import { BlogPost } from '../types';
import { X, Calendar, Clock, Tag, ExternalLink, ShieldCheck, User } from 'lucide-react';

interface AdminPreviewModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const AdminPreviewModal: React.FC<AdminPreviewModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  const renderContent = (raw: string) => {
    return raw.split('\n\n').map((block, i) => {
      const trimmed = block.trim();
      if (!trimmed) return null;
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={i} className="text-xl font-bold text-slate-900 mt-6 mb-3 border-l-4 border-emerald-600 pl-3">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={i} className="text-2xl font-extrabold text-slate-900 mt-8 mb-4">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const items = trimmed.split('\n').map((li) => li.replace(/^[\*\-]\s+/, ''));
        return (
          <ul key={i} className="space-y-2 my-3 pl-2">
            {items.map((it, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-700 text-sm leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={i} className="text-slate-700 text-sm leading-relaxed mb-4">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Preview header banner */}
        <div className="sticky top-0 z-20 bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
              PREVIEW MODE ({post.status.toUpperCase()})
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline-block">
              Slug: /blog/{post.slug}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Article content container */}
        <div className="p-6 sm:p-10 space-y-6">
          {/* Category & meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.publishedAt}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTimeMinutes} min read
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            {post.title}
          </h1>

          <p className="text-base text-slate-600 font-medium leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-3 py-3 border-y border-slate-100">
            <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
              {post.authorName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">{post.authorName}</p>
              <p className="text-[11px] text-slate-500">{post.authorRole}</p>
            </div>
          </div>

          {post.coverImage && (
            <div className="rounded-xl overflow-hidden border border-slate-200">
              <img
                src={post.coverImage}
                alt={post.coverImageAlt || post.title}
                className="w-full max-h-[400px] object-cover"
              />
            </div>
          )}

          <div className="prose prose-slate max-w-none pt-4">
            {renderContent(post.content)}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-2 items-center">
              <Tag className="w-4 h-4 text-slate-400" />
              {post.tags.map((t, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded bg-slate-100 text-xs text-slate-600 font-medium">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
