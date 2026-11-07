import React from 'react';
import { PageRoute } from '../types';
import {
  COMPANY_INFO,
  CO_FOUNDER_1,
  SERVICES_LIST,
  WHY_CHOOSE_US,
  EXPERTISE_PILLARS,
} from '../data/companyData';
import { ServiceIcon } from '../components/ServiceIcon';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  MapPin,
  Anchor,
  Compass,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageRoute, targetServiceId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full">
      {/* 1. HERO SECTION (Dark Green Hero) */}
      <section
        id="hero-section"
        className="relative min-h-[90vh] flex items-center justify-center bg-[#0B3D2E] text-white pt-24 pb-20 overflow-hidden"
      >
        {/* Background Image with Dark Green Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2000&q=80"
            alt="Container terminal and maritime cargo port operations"
            className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105 transform transition-transform duration-1000"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B3D2E] via-[#0B3D2E]/90 to-[#0B3D2E]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(111,175,143,0.15),transparent_60%)]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#145A43]/80 border border-[#6FAF8F]/40 text-[#B89B5E] text-xs font-bold tracking-wider uppercase mb-6 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#B89B5E]" />
              <span>Built on 40+ Years of Industry Experience</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-['Plus_Jakarta_Sans'] mb-4">
              Built on 40+ Years of Industry Experience.
            </h1>

            {/* Supporting Headline */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#6FAF8F] mb-6 font-['Manrope']">
              Seamless Customs Clearance. Reliable Logistics.
            </h2>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-2xl mb-8 font-normal">
              Tuna NP Portlink Logistics provides professional customs brokerage and logistics
              solutions for businesses involved in import, export and cargo movement.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                id="hero-cta-explore-services"
                onClick={() => onNavigate('services')}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md bg-[#145A43] hover:bg-[#1a7356] border border-[#6FAF8F]/60 text-white font-bold text-sm tracking-wider shadow-lg hover:border-[#B89B5E] transition-all cursor-pointer"
              >
                <span>EXPLORE OUR SERVICES</span>
                <ArrowRight className="w-4 h-4 text-[#B89B5E]" />
              </button>

              <button
                id="hero-cta-contact-us"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md bg-transparent hover:bg-white/10 border border-white/30 text-white font-bold text-sm tracking-wider transition-all cursor-pointer"
              >
                <span>CONTACT US</span>
              </button>
            </div>

            {/* Trust highlights */}
            <div className="mt-12 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6FAF8F] shrink-0" />
                <span>Gandhidham, Gujarat Base</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6FAF8F] shrink-0" />
                <span>Customs House Agent (CHA) Focus</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-[#6FAF8F] shrink-0" />
                <span>Decades of Ground Knowledge</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXPERIENCE SECTION (Visual Trust Metric) */}
      <section
        id="experience-metric-section"
        className="relative bg-[#F7F7F2] py-16 sm:py-20 border-b border-[#145A43]/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Large Number Display */}
              <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-gray-200 pb-6 lg:pb-0 lg:pr-8 text-center lg:text-left">
                <div className="flex items-baseline justify-center lg:justify-start gap-1">
                  <span className="text-6xl sm:text-7xl lg:text-8xl font-black text-[#0B3D2E] tracking-tight font-['Plus_Jakarta_Sans']">
                    40+
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#145A43] mt-2">
                  YEARS OF INDUSTRY EXPERIENCE
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Co-Founding Leadership &amp; Ground Expertise
                </p>
              </div>

              {/* Supporting Text */}
              <div className="lg:col-span-8 lg:pl-4 space-y-3">
                <div className="inline-block px-3 py-1 rounded bg-[#F7F7F2] border border-gray-200 text-xs font-semibold text-[#145A43] uppercase tracking-wider mb-1">
                  PRACTICAL OPERATIONAL MASTERY
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#17221D] font-['Plus_Jakarta_Sans']">
                  “Backed by more than four decades of practical experience in customs, shipping,
                  import-export operations and logistics.”
                </h3>
                <p className="text-sm sm:text-base text-[#59635D] leading-relaxed">
                  Tuna NP Portlink Logistics is a newly established enterprise, led by an industry
                  veteran who has navigated decades of evolving Indian customs tariffs, port
                  regulations, container terminal workflows, and logistics corridors across
                  Gujarat and major commercial centers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION (Warm Off-White Introduction) */}
      <section id="home-about-section" className="bg-[#F7F7F2] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text description */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#145A43]">
                <span className="w-8 h-[2px] bg-[#145A43]" />
                <span>ABOUT TUNA NP PORTLINK LOGISTICS</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#17221D] tracking-tight font-['Plus_Jakarta_Sans']">
                Experience Behind Every Shipment.
              </h2>

              <div className="space-y-4 text-base text-[#59635D] leading-relaxed">
                <p>
                  Tuna NP Portlink Logistics is a newly established customs brokerage and logistics
                  company based in Gandhidham, Gujarat.
                </p>
                <p>
                  While the company is new, it is backed by more than four decades of practical
                  industry experience.
                </p>
                <p>
                  Our leadership brings extensive knowledge of customs procedures, import-export
                  operations, shipping and logistics management.
                </p>
                <p>
                  We aim to provide dependable, professional and responsive support to businesses
                  navigating customs and logistics requirements.
                </p>
              </div>

              <div className="pt-2">
                <button
                  id="home-about-learn-more-btn"
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-[#0B3D2E] hover:bg-[#145A43] text-white font-bold text-sm tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  <span>LEARN MORE ABOUT US</span>
                  <ArrowRight className="w-4 h-4 text-[#B89B5E]" />
                </button>
              </div>
            </div>

            {/* Visual Card / Highlights */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#145A43]/5 rounded-bl-full pointer-events-none" />
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <div className="p-3 bg-[#F7F7F2] rounded-lg text-[#0B3D2E]">
                    <Anchor className="w-6 h-6 text-[#145A43]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-[#17221D]">Strategic Port Location</h4>
                    <p className="text-xs text-gray-500">Gandhidham, Kachchh, Gujarat</p>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-[#59635D]">
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#145A43] mt-2 shrink-0" />
                    <p>
                      <strong className="text-[#17221D]">Maritime Hub Proximity:</strong> Direct
                      proximity to Deendayal Port (Kandla) and Mundra Port.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#145A43] mt-2 shrink-0" />
                    <p>
                      <strong className="text-[#17221D]">Regulatory Knowledge:</strong> Up-to-date
                      mastery of customs statutory notifications, HSN classifications, and ICEGATE.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#145A43] mt-2 shrink-0" />
                    <p>
                      <strong className="text-[#17221D]">B2B Reliability:</strong> Transparent
                      operational updates and dedicated coordination for cargo owners.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 bg-[#F7F7F2] -mx-8 -mb-8 p-6 text-xs text-[#59635D] flex items-center justify-between">
                  <span className="font-semibold text-[#17221D]">Office No. 12, Hari Krupa Complex</span>
                  <span className="text-[#145A43] font-mono">PIN: 370201</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES PREVIEW (White Services) */}
      <section id="home-services-section" className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#145A43] block mb-2">
              SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17221D] font-['Plus_Jakarta_Sans'] mb-3">
              Our Services
            </h2>
            <p className="text-base text-[#59635D]">
              Professional support across customs, trade and logistics.
            </p>
          </div>

          {/* 8 Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES_LIST.map((service) => (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className="group bg-[#F7F7F2] hover:bg-white rounded-xl p-6 border border-gray-200 hover:border-[#145A43] transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-white group-hover:bg-[#0B3D2E] border border-gray-200 group-hover:border-[#0B3D2E] flex items-center justify-center text-[#0B3D2E] group-hover:text-white transition-colors duration-200 mb-5 shadow-xs">
                    <ServiceIcon name={service.iconName} className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#17221D] group-hover:text-[#0B3D2E] transition-colors mb-2 font-['Plus_Jakarta_Sans']">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#59635D] leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>
                </div>

                <button
                  id={`home-service-enquire-${service.id}`}
                  onClick={() => onNavigate('services', service.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#145A43] group-hover:text-[#0B3D2E] pt-2 border-t border-gray-200/60 transition-colors cursor-pointer"
                >
                  <span>Learn details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              id="home-view-all-services-btn"
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-[#0B3D2E] hover:bg-[#145A43] text-white font-bold text-sm tracking-wider transition-all shadow-sm cursor-pointer"
            >
              <span>VIEW ALL SERVICES</span>
              <ArrowRight className="w-4 h-4 text-[#B89B5E]" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US (Off-White Feature Blocks) */}
      <section id="why-choose-us-section" className="bg-[#F7F7F2] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#145A43] block mb-2">
              FOUNDATIONAL STRENGTHS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17221D] font-['Plus_Jakarta_Sans']">
              Why Tuna NP Portlink Logistics?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_US.map((item) => (
              <div
                key={item.number}
                id={`why-card-${item.number}`}
                className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm relative hover:border-[#145A43] transition-colors"
              >
                <div className="text-3xl font-black text-[#145A43]/30 font-mono mb-4">
                  {item.number}
                </div>
                <h3 className="text-base font-bold text-[#17221D] mb-3 font-['Plus_Jakarta_Sans'] leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-[#59635D] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. EXPERTISE SECTION (Minimal Professional Icons) */}
      <section id="expertise-section" className="bg-white py-16 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
              CORE DOMAINS OF ENGAGEMENT
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {EXPERTISE_PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-5 rounded-lg bg-[#F7F7F2] border border-gray-200 hover:border-[#145A43] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#0B3D2E] mb-3 shadow-2xs">
                  <ServiceIcon name={pillar.icon} className="w-5 h-5 text-[#145A43]" />
                </div>
                <span className="text-xs font-extrabold text-[#17221D] tracking-wider font-['Plus_Jakarta_Sans']">
                  {pillar.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. INDUSTRY EXPERIENCE (Clean Timeline) */}
      <section id="founder-experience-section" className="bg-[#F7F7F2] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#145A43] block mb-2">
              PROVEN INDUSTRY FOUNDATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17221D] font-['Plus_Jakarta_Sans'] mb-4">
              Backed by 40+ Years of Industry Experience.
            </h2>
            <p className="text-base text-[#59635D] leading-relaxed">
              Tuna NP Portlink Logistics is backed by more than 40 years of continuous industry experience, bringing decades of practical knowledge to customs clearance, port operations, and logistics across Western India.
            </p>
          </div>

          {/* Clean Timeline Component */}
          <div className="max-w-3xl mx-auto">
            <div className="relative border-l-2 border-[#145A43]/40 pl-6 sm:pl-8 ml-4 sm:ml-6 space-y-10">
              {/* Timeline Item 1: 40+ Years Industry Experience */}
              <div className="relative group">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-[#0B3D2E] border-4 border-white shadow-sm flex items-center justify-center" />
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="px-3 py-1 rounded bg-[#0B3D2E] text-white text-xs font-bold tracking-wider uppercase font-mono">
                      40+ YEARS
                    </span>
                    <span className="text-xs text-[#145A43] font-semibold">Cumulative Track Record</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#17221D] font-['Plus_Jakarta_Sans']">
                    INDUSTRY EXPERIENCE
                  </h3>
                  <p className="text-sm text-[#59635D] mt-2 leading-relaxed">
                    Four decades of practical engagement encompassing customs regulations, port
                    procedures, container shipping, and import-export operations in Western India.
                  </p>
                </div>
              </div>

              {/* Timeline Item 2: Senior Operations & Logistics Experience */}
              <div className="relative group">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-[#145A43] border-4 border-white shadow-sm" />
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded bg-gray-100 text-[#17221D] text-xs font-bold font-mono">
                      Operations Management
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" /> Gandhidham, Gujarat
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#17221D] font-['Plus_Jakarta_Sans']">
                    Senior Operations &amp; Logistics Experience
                  </h3>
                  <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-[#59635D]">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#145A43]" />
                      Complete logistics solutions &amp; multi-modal freight movement
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#145A43]" />
                      Team leadership, carrier management, and operational coordination
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#145A43]" />
                      Container freight stations, transport routing, and terminal handling
                    </li>
                  </ul>
                </div>
              </div>

              {/* Timeline Item 3: Extensive Customs & Import-Export Experience */}
              <div className="relative group">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-[#B89B5E] border-4 border-white shadow-sm" />
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded bg-[#145A43]/10 text-[#0B3D2E] text-xs font-bold font-mono">
                      Customs &amp; Compliance
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" /> Gandhidham, Gujarat
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#17221D] font-['Plus_Jakarta_Sans']">
                    Extensive Customs &amp; Import-Export Experience
                  </h3>
                  <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-[#59635D]">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#145A43]" />
                      Customs regulations and statutory tariff compliance
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#145A43]" />
                      Import and export documentation and clearance coordination
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#145A43]" />
                      Port operations, cargo inspection, and shipping responsibilities
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Note regarding additional experience */}
            <div className="mt-10 p-5 rounded-lg bg-white border border-gray-200 text-center text-xs text-[#59635D]">
              <p>
                {CO_FOUNDER_1.additionalNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA (Dark Green CTA) */}
      <section id="home-final-cta" className="bg-[#0B3D2E] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80"
            alt="Logistics container transport"
            className="w-full h-full object-cover object-center mix-blend-overlay"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B89B5E] block mb-3">
            COMMENCE YOUR CONSULTATION
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-['Plus_Jakarta_Sans'] tracking-tight mb-4">
            Let’s Move Your Business Forward.
          </h2>
          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto mb-8 font-normal">
            Have a customs clearance or logistics requirement? Speak with Tuna NP Portlink Logistics
            about your requirements.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="final-cta-contact-btn"
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md bg-[#145A43] hover:bg-[#1a7356] border border-[#6FAF8F]/50 text-white font-bold text-sm tracking-wider shadow-lg hover:border-[#B89B5E] transition-all cursor-pointer"
            >
              <span>CONTACT US</span>
              <ArrowRight className="w-4 h-4 text-[#B89B5E]" />
            </button>

            <button
              id="final-cta-enquiry-btn"
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md bg-transparent hover:bg-white/10 border border-white/30 text-white font-bold text-sm tracking-wider transition-all cursor-pointer"
            >
              <span>SEND AN ENQUIRY</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
