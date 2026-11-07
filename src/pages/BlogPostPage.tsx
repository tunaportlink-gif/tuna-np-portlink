import React, { useEffect, useState, useMemo } from 'react';
import { PageRoute, BlogPost } from '../types';
import { COMPANY_INFO, CO_FOUNDER_1 } from '../data/companyData';
import { NewsletterSubscribe } from '../components/NewsletterSubscribe';
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  Check,
  Tag,
  BookOpen,
  ShieldCheck,
  Building2,
  MapPin,
  ChevronRight,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

interface BlogPostPageProps {
  slug: string;
  onNavigate: (page: PageRoute, targetSlugOrId?: string) => void;
  allPosts: BlogPost[];
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  slug,
  onNavigate,
  allPosts,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const post = useMemo(() => {
    return allPosts.find((p) => p.slug.toLowerCase() === slug.toLowerCase()) || null;
  }, [allPosts, slug]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return allPosts
      .filter((p) => p.id !== post.id && p.status === 'published')
      .filter((p) => p.category === post.category || true)
      .slice(0, 3);
  }, [allPosts, post]);

  // Dynamic SEO & Structured Data Injection (Schema.org JSON-LD)
  useEffect(() => {
    if (!post) return;

    // Update document title
    const originalTitle = document.title;
    document.title = `${post.seo.metaTitle || post.title} | ${COMPANY_INFO.name}`;

    // Update meta description
    const metaDescEl = document.querySelector('meta[name="description"]');
    const prevDesc = metaDescEl ? metaDescEl.getAttribute('content') : '';
    if (metaDescEl && post.seo.metaDescription) {
      metaDescEl.setAttribute('content', post.seo.metaDescription);
    }

    // Dynamic Schema.org JSON-LD injection
    const scriptId = 'json-ld-article-schema';
    let existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';

    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          '@id': `https://tunaportlink.com/#blog/${post.slug}#article`,
          isPartOf: {
            '@type': 'Blog',
            '@id': 'https://tunaportlink.com/#blog',
            name: 'Tuna NP Portlink Logistics Industry Insights',
          },
          headline: post.title,
          description: post.seo.metaDescription || post.excerpt,
          image: post.coverImage,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt || post.publishedAt,
          author: {
            '@type': 'Person',
            name: post.authorName,
            jobTitle: post.authorRole,
          },
          publisher: {
            '@type': 'Organization',
            name: COMPANY_INFO.name,
            url: 'https://tunaportlink.com',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Office No. 12, First Floor, Hari Krupa Complex, Plot 306, Sector 12B',
              addressLocality: 'Gandhidham',
              addressRegion: 'Gujarat',
              postalCode: '370201',
              addressCountry: 'IN',
            },
          },
          keywords: post.tags.join(', '),
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `https://tunaportlink.com/#blog/${post.slug}#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://tunaportlink.com',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Blog',
              item: 'https://tunaportlink.com/#blog',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: post.title,
              item: `https://tunaportlink.com/#blog/${post.slug}`,
            },
          ],
        },
      ],
    };

    script.textContent = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      document.title = originalTitle;
      if (metaDescEl && prevDesc) {
        metaDescEl.setAttribute('content', prevDesc);
      }
      const s = document.getElementById(scriptId);
      if (s) s.remove();
    };
  }, [post]);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShareWhatsApp = () => {
    if (!post) return;
    const text = encodeURIComponent(`${post.title}\n\nRead more at: ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  if (!post) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#F7F7F2] py-24 px-4">
        <div className="bg-white rounded-2xl p-10 max-w-md w-full border border-gray-200 text-center shadow-sm space-y-4">
          <BookOpen className="w-12 h-12 text-[#145A43] mx-auto" />
          <h1 className="text-2xl font-extrabold text-[#17221D] font-['Plus_Jakarta_Sans']">
            Article Not Found
          </h1>
          <p className="text-sm text-[#59635D]">
            The article you are looking for may have been moved, updated, or is currently in draft status.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('blog')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0B3D2E] text-white text-xs font-bold tracking-wider"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN TO ALL ARTICLES</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Helper parser for markdown-style body
  const renderFormattedContent = (rawText: string) => {
    const paragraphs = rawText.split('\n\n');

    return paragraphs.map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // Heading 3: ###
      if (trimmed.startsWith('### ')) {
        return (
          <h3
            key={idx}
            className="text-xl sm:text-2xl font-bold text-[#17221D] font-['Plus_Jakarta_Sans'] mt-8 mb-4 border-l-4 border-[#145A43] pl-3"
          >
            {trimmed.replace('### ', '')}
          </h3>
        );
      }

      // Heading 2: ##
      if (trimmed.startsWith('## ')) {
        return (
          <h2
            key={idx}
            className="text-2xl sm:text-3xl font-extrabold text-[#17221D] font-['Plus_Jakarta_Sans'] mt-10 mb-4"
          >
            {trimmed.replace('## ', '')}
          </h2>
        );
      }

      // Bullet List
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const items = trimmed.split('\n').map((li) => li.replace(/^[\*\-]\s+/, ''));
        return (
          <ul key={idx} className="space-y-2.5 my-4 pl-2">
            {items.map((item, itemIdx) => {
              // Parse **bold** within list item
              const parts = item.split(/(\*\*.*?\*\*)/g);
              return (
                <li key={itemIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-[#47524C] leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#145A43] mt-2.5 shrink-0" />
                  <span>
                    {parts.map((part, pIdx) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={pIdx} className="text-[#17221D]">{part.slice(2, -2)}</strong>;
                      }
                      return part;
                    })}
                  </span>
                </li>
              );
            })}
          </ul>
        );
      }

      // Numbered list
      if (/^\d+\.\s/.test(trimmed)) {
        const items = trimmed.split('\n');
        return (
          <ol key={idx} className="space-y-2.5 my-4 pl-2">
            {items.map((item, itemIdx) => {
              const cleanItem = item.replace(/^\d+\.\s+/, '');
              const parts = cleanItem.split(/(\*\*.*?\*\*)/g);
              return (
                <li key={itemIdx} className="flex items-start gap-3 text-sm sm:text-base text-[#47524C] leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-[#F7F7F2] border border-[#145A43]/30 text-[#145A43] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {itemIdx + 1}
                  </span>
                  <span>
                    {parts.map((part, pIdx) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={pIdx} className="text-[#17221D]">{part.slice(2, -2)}</strong>;
                      }
                      return part;
                    })}
                  </span>
                </li>
              );
            })}
          </ol>
        );
      }

      // Standard Paragraph with **bold** support
      const parts = trimmed.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={idx} className="text-base sm:text-lg text-[#47524C] leading-relaxed my-4 font-['Manrope']">
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx} className="text-[#17221D] font-bold">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <article className="w-full bg-[#F7F7F2] pt-28 pb-20">
      {/* 1. BREADCRUMB & TOP CONTROLS */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
          <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-gray-500">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#145A43] transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <button
              onClick={() => onNavigate('blog')}
              className="hover:text-[#145A43] transition-colors cursor-pointer"
            >
              Blog
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#145A43] font-semibold truncate max-w-[200px] sm:max-w-xs">
              {post.category}
            </span>
          </nav>

          <button
            onClick={() => onNavigate('blog')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#145A43] hover:text-[#0B3D2E] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all articles</span>
          </button>
        </div>
      </div>

      {/* 2. ARTICLE HEADER */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-[#0B3D2E] text-white text-xs font-extrabold uppercase tracking-wider">
            {post.category}
          </span>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {post.publishedAt}
          </span>
          <span className="text-xs text-gray-500">•</span>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readTimeMinutes} min read
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17221D] font-['Plus_Jakarta_Sans'] tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-xl text-[#59635D] font-medium leading-relaxed font-['Manrope']">
          {post.excerpt}
        </p>

        {/* Author Attribution & Social Sharing Strip */}
        <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#0B3D2E] text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
              {post.authorName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold text-[#17221D] font-['Plus_Jakarta_Sans']">
                {post.authorName}
              </p>
              <p className="text-xs text-[#145A43] font-medium">
                {post.authorRole} • Tuna NP Portlink Logistics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 text-xs font-semibold shadow-2xs transition-colors"
              title="Copy shareable link"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-gray-500" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="p-1.5 rounded-md bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] border border-[#25D366]/30 text-xs font-semibold"
              title="Share on WhatsApp"
            >
              WhatsApp
            </button>

            <button
              onClick={handleShareLinkedIn}
              className="p-1.5 rounded-md bg-[#0077b5]/10 hover:bg-[#0077b5]/20 text-[#0077b5] border border-[#0077b5]/30 text-xs font-semibold"
              title="Share on LinkedIn"
            >
              LinkedIn
            </button>
          </div>
        </div>
      </header>

      {/* 3. COVER IMAGE */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200">
          <img
            src={post.coverImage}
            alt={post.coverImageAlt || post.title}
            className="w-full max-h-[460px] object-cover object-center"
          />
        </div>
        <p className="text-[11px] text-gray-500 text-center mt-2 italic">
          Commercial maritime & logistics operations in Western India.
        </p>
      </div>

      {/* 4. MAIN ARTICLE BODY */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-12 border border-gray-200 shadow-sm">
          {/* Formatted body */}
          <div className="space-y-6">
            {renderFormattedContent(post.content)}
          </div>

          {/* Tags list */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mr-1 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Tags:</span>
                </span>
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-[#F7F7F2] border border-gray-200 text-xs text-[#145A43] font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* AUTHOR CREDENTIALS BOX */}
          <div className="mt-10 p-6 rounded-xl bg-[#F7F7F2] border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-[#0B3D2E] text-[#B89B5E] font-black text-xl flex items-center justify-center shrink-0 border-2 border-[#145A43]">
              {post.authorName.slice(0, 2).toUpperCase()}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-base font-bold text-[#17221D] font-['Plus_Jakarta_Sans']">
                  About {post.authorName}
                </h4>
                <span className="px-2 py-0.5 rounded bg-[#145A43]/10 text-[#145A43] text-[10px] font-bold">
                  {post.authorRole}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#59635D] leading-relaxed">
                Extensive practical experience across customs clearance, shipping operations, and Indian trade procedures across Gandhidham, Kandla, and Mundra ports.
              </p>
            </div>
          </div>
        </div>

        {/* SUBSCRIBE TO INSIGHTS COMPONENT */}
        <div className="mt-8">
          <NewsletterSubscribe variant="in-article" source={`blog-post-${post.slug}`} />
        </div>
      </div>

      {/* 5. CONSULTATION / IN-ARTICLE CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-[#0B3D2E] text-white rounded-2xl p-8 sm:p-10 border border-[#145A43] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#B89B5E]">
              <ShieldCheck className="w-4 h-4 text-[#B89B5E]" />
              <span>CUSTOMS BROKERAGE CONSULTATION</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold font-['Plus_Jakarta_Sans']">
              Need assistance with your consignment?
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 max-w-lg">
              Contact our team in Gandhidham for dependable customs clearance, documentation review, and port coordination.
            </p>
          </div>

          <button
            onClick={() => onNavigate('contact')}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#145A43] hover:bg-[#1a7356] border border-[#6FAF8F]/50 text-white font-bold text-xs sm:text-sm tracking-wider shadow-md hover:border-[#B89B5E] transition-all cursor-pointer"
          >
            <span>GET IN TOUCH</span>
            <ArrowRight className="w-4 h-4 text-[#B89B5E]" />
          </button>
        </div>
      </div>

      {/* 6. RELATED ARTICLES */}
      {relatedPosts.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#17221D] font-['Plus_Jakarta_Sans']">
              Related Articles & Guidance
            </h3>
            <button
              onClick={() => onNavigate('blog')}
              className="text-xs font-bold text-[#145A43] hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPosts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onNavigate('blog-post', rel.slug)}
                className="group bg-white rounded-xl border border-gray-200 p-4 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <img
                    src={rel.coverImage}
                    alt={rel.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <span className="text-[10px] font-bold text-[#145A43] uppercase tracking-wider block mb-1">
                    {rel.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[#17221D] group-hover:text-[#145A43] font-['Plus_Jakarta_Sans'] line-clamp-2 mb-2 transition-colors">
                    {rel.title}
                  </h4>
                </div>
                <div className="text-[11px] text-gray-500 pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span>{rel.publishedAt}</span>
                  <span className="text-[#145A43] font-semibold">Read ›</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};
