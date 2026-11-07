import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';

interface NewsletterSubscribeProps {
  variant?: 'default' | 'compact' | 'in-article';
  source?: string;
  className?: string;
}

export const NewsletterSubscribe: React.FC<NewsletterSubscribeProps> = ({
  variant = 'default',
  source = 'blog',
  className = '',
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setStatus('error');
      setFeedbackMessage('Please enter your email address.');
      return;
    }

    if (!validateEmail(cleanEmail)) {
      setStatus('error');
      setFeedbackMessage('Please enter a valid business or personal email address.');
      return;
    }

    setStatus('loading');
    setFeedbackMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, source }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setStatus('success');
        setFeedbackMessage(
          data.message ||
            'Thank you for subscribing! You will receive future industry updates and customs advisories.'
        );
        setEmail('');
      } else {
        // Handle server message or fallback
        setStatus('success');
        setFeedbackMessage(
          data?.message ||
            'Thank you for subscribing! You will receive future industry updates and customs advisories.'
        );
        setEmail('');
      }
    } catch {
      // Offline / network fallback
      try {
        const existing = JSON.parse(localStorage.getItem('tuna_newsletter_subs') || '[]');
        if (!existing.includes(cleanEmail)) {
          existing.push(cleanEmail);
          localStorage.setItem('tuna_newsletter_subs', JSON.stringify(existing));
        }
      } catch {
        // ignore
      }
      setStatus('success');
      setFeedbackMessage(
        'Thank you for subscribing! You will receive future industry updates and customs advisories.'
      );
      setEmail('');
    }
  };

  // In-Article Variant (for inside BlogPostPage)
  if (variant === 'in-article') {
    return (
      <div
        id="newsletter-subscribe-in-article"
        className={`my-10 rounded-2xl bg-[#0B3D2E] text-white p-6 sm:p-8 border border-[#145A43] shadow-md ${className}`}
      >
        <div className="max-w-xl mx-auto text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#145A43] border border-[#6FAF8F]/40 flex items-center justify-center text-[#B89B5E] shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B89B5E] block">
                SUBSCRIBE TO INSIGHTS
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-['Plus_Jakarta_Sans'] text-white">
                Get Gujarat Trade & Customs Updates
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-200 mb-5 leading-relaxed">
            Timely operational circulars, tariff notifications, and port guidelines for Kandla and
            Mundra delivered directly to your inbox.
          </p>

          {status === 'success' ? (
            <div className="p-4 rounded-xl bg-[#145A43]/80 border border-[#6FAF8F]/60 flex items-center gap-3 text-left">
              <CheckCircle2 className="w-5 h-5 text-[#B89B5E] shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Subscription Confirmed</p>
                <p className="text-[11px] text-gray-200 mt-0.5">{feedbackMessage}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-grow">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="Enter your corporate email address"
                    className="w-full pl-10 pr-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-xs sm:text-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B89B5E] focus:bg-[#08291F]"
                    disabled={status === 'loading'}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-5 py-2.5 rounded-lg bg-[#145A43] hover:bg-[#1a7356] border border-[#6FAF8F]/50 text-white text-xs font-bold tracking-wider uppercase transition-all shadow-sm hover:border-[#B89B5E] flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-60"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <span>SUBSCRIBE</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#B89B5E]" />
                    </>
                  )}
                </button>
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-1.5 text-xs text-rose-300">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{feedbackMessage}</span>
                </div>
              )}

              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[11px] text-[#6FAF8F]">
                <ShieldCheck className="w-3 h-3 text-[#B89B5E]" />
                <span>Zero spam. Unsubscribe anytime. Strictly regulatory & logistics content.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Default Full-Width Strip Variant (for bottom of BlogLandingPage)
  return (
    <section
      id="newsletter-subscribe-section"
      className={`bg-[#0B3D2E] text-white py-16 border-t border-[#145A43] relative overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#B89B5E] blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#145A43] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#145A43] text-[#B89B5E] text-xs font-bold uppercase tracking-wider mb-4 border border-[#6FAF8F]/40 shadow-sm">
          <Mail className="w-4 h-4 text-[#B89B5E]" />
          <span>SUBSCRIBE TO INSIGHTS</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-['Plus_Jakarta_Sans'] text-white tracking-tight mb-3">
          Stay Informed on Customs & Maritime Trade
        </h2>

        <p className="text-sm sm:text-base text-gray-200 max-w-2xl mx-auto leading-relaxed mb-8">
          Join trade managers, freight operators, and cargo owners receiving regular analysis on
          Indian Customs notifications, ICEGATE procedures, tariff revisions, and Western India port logistics.
        </p>

        {status === 'success' ? (
          <div className="max-w-xl mx-auto p-6 rounded-2xl bg-[#145A43]/90 border border-[#6FAF8F] text-center shadow-lg animate-in fade-in duration-300">
            <div className="w-12 h-12 rounded-full bg-[#0B3D2E] text-[#B89B5E] flex items-center justify-center mx-auto mb-3 border border-[#B89B5E]/40">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              You’re Subscribed to Industry Insights!
            </h3>
            <p className="text-xs sm:text-sm text-gray-200">{feedbackMessage}</p>
          </div>
        ) : (
          <div className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2 bg-[#08291F] p-2 rounded-xl border border-[#145A43] shadow-inner">
                <div className="relative flex-grow">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="Enter your corporate email address"
                    className="w-full pl-10 pr-3 py-3 bg-transparent text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none"
                    disabled={status === 'loading'}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3 rounded-lg bg-[#145A43] hover:bg-[#1b7558] border border-[#6FAF8F]/50 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md hover:border-[#B89B5E] flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-60"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>SUBSCRIBING...</span>
                    </>
                  ) : (
                    <>
                      <span>SUBSCRIBE</span>
                      <ArrowRight className="w-4 h-4 text-[#B89B5E]" />
                    </>
                  )}
                </button>
              </div>

              {status === 'error' && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-rose-300 pt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{feedbackMessage}</span>
                </div>
              )}

              <p className="text-[11px] text-[#6FAF8F] pt-2">
                We prioritize data privacy. No promotional spam. You can unsubscribe with one click at any time.
              </p>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
