import React, { useState, useEffect } from 'react';
import { PageRoute } from '../types';
import { Menu, X, ArrowRight, Anchor } from 'lucide-react';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute, hash?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems: { label: string; route: PageRoute }[] = [
    { label: 'HOME', route: 'home' },
    { label: 'ABOUT US', route: 'about' },
    { label: 'SERVICES', route: 'services' },
    { label: 'BLOG', route: 'blog' },
    { label: 'CONTACT US', route: 'contact' },
  ];

  const handleNavClick = (route: PageRoute) => {
    setMobileMenuOpen(false);
    onNavigate(route);
  };

  const isRouteActive = (route: PageRoute) => {
    if (route === 'blog') {
      return currentPage === 'blog' || currentPage === 'blog-post';
    }
    return currentPage === route;
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B3D2E]/95 backdrop-blur-md shadow-lg border-b border-[#145A43]/60 py-3.5'
          : 'bg-[#0B3D2E]/80 backdrop-blur-sm border-b border-[#145A43]/30 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo - Always links to Home */}
          <button
            id="nav-brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B89B5E] rounded-md px-1"
            aria-label="Tuna NP Portlink Logistics - Home"
          >
            <div className="w-10 h-10 rounded-lg bg-[#145A43] border border-[#6FAF8F]/40 flex items-center justify-center text-white shadow-inner group-hover:border-[#B89B5E] transition-colors">
              <Anchor className="w-5 h-5 text-[#6FAF8F] group-hover:text-[#B89B5E] transition-colors" />
            </div>
            <div>
              <span className="block text-base sm:text-lg font-extrabold tracking-wider text-white font-['Plus_Jakarta_Sans'] leading-tight">
                TUNA NP PORTLINK LOGISTICS
              </span>
              <span className="block text-[10px] sm:text-[11px] uppercase tracking-widest text-[#6FAF8F] font-medium">
                Customs Brokerage & Logistics Solutions
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = isRouteActive(item.route);
              return (
                <button
                  key={item.route}
                  id={`nav-link-${item.route}`}
                  onClick={() => handleNavClick(item.route)}
                  className={`px-3.5 py-2 rounded-md text-xs lg:text-sm font-semibold tracking-wider transition-all duration-200 cursor-pointer relative ${
                    isActive
                      ? 'text-[#B89B5E] bg-[#145A43]/40'
                      : 'text-gray-200 hover:text-white hover:bg-[#145A43]/25'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-3.5 right-3.5 h-0.5 bg-[#B89B5E] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Primary CTA button (Desktop) */}
          <div className="hidden md:flex items-center">
            <button
              id="nav-cta-get-in-touch"
              onClick={() => handleNavClick('contact')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-xs lg:text-sm font-bold tracking-wider text-white bg-[#145A43] hover:bg-[#1a7356] border border-[#6FAF8F]/50 shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer hover:border-[#B89B5E]"
            >
              <span>GET IN TOUCH</span>
              <ArrowRight className="w-4 h-4 text-[#B89B5E]" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-gray-200 hover:text-white hover:bg-[#145A43] focus:outline-none focus:ring-2 focus:ring-[#B89B5E] transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-backdrop"
          className="md:hidden fixed inset-0 top-[65px] bg-black/60 backdrop-blur-md z-40 transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            id="mobile-nav-panel"
            className="bg-[#0B3D2E] border-b border-[#145A43] px-6 pt-4 pb-8 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-[#145A43]/60 pb-2 mb-2">
              <span className="text-xs uppercase tracking-widest text-[#6FAF8F] font-semibold">
                Menu Navigation
              </span>
            </div>
            {navItems.map((item) => {
              const isActive = isRouteActive(item.route);
              return (
                <button
                  key={item.route}
                  id={`mobile-nav-${item.route}`}
                  onClick={() => handleNavClick(item.route)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-bold tracking-wider text-left transition-all ${
                    isActive
                      ? 'bg-[#145A43] text-[#B89B5E] border-l-4 border-[#B89B5E]'
                      : 'text-gray-200 hover:bg-[#145A43]/40 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#B89B5E]" />}
                </button>
              );
            })}
            <div className="pt-4 mt-2">
              <button
                id="mobile-nav-cta-btn"
                onClick={() => handleNavClick('contact')}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg text-sm font-bold tracking-wider text-white bg-[#145A43] hover:bg-[#1a7356] border border-[#6FAF8F]/50 shadow-md transition-colors"
              >
                <span>GET IN TOUCH</span>
                <ArrowRight className="w-4 h-4 text-[#B89B5E]" />
              </button>
            </div>
            <div className="text-center pt-2">
              <p className="text-[11px] text-[#6FAF8F]">
                Gandhidham, Kachchh, Gujarat – 370201
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
