import React from 'react';
import { PageRoute } from '../types';
import { COMPANY_INFO, CO_FOUNDER_1, CO_FOUNDER_2 } from '../data/companyData';
import {
  ShieldCheck,
  Target,
  Eye,
  Building2,
  MapPin,
  Calendar,
  Briefcase,
  ArrowRight,
  Anchor,
  CheckCircle2,
  Award,
  Users,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section
        id="about-hero"
        className="relative bg-[#0B3D2E] text-white pt-32 pb-20 overflow-hidden"
      >
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=2000&q=80"
            alt="Port cranes and maritime harbor in Gujarat"
            className="w-full h-full object-cover object-center mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B3D2E]/80 via-[#0B3D2E] to-[#0B3D2E]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#145A43]/80 border border-[#6FAF8F]/40 text-[#B89B5E] text-xs font-bold tracking-wider uppercase mb-4">
              <ShieldCheck className="w-4 h-4 text-[#B89B5E]" />
              <span>ABOUT OUR COMPANY</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-['Plus_Jakarta_Sans'] tracking-tight mb-4">
              Built on Experience. Driven by Service.
            </h1>
            <p className="text-lg text-[#6FAF8F] font-medium leading-relaxed font-['Manrope']">
              Professional customs and logistics solutions backed by decades of practical industry experience.
            </p>
          </div>
        </div>
      </section>

      {/* 2. COMPANY STORY (Warm Off-White) */}
      <section id="company-story-section" className="bg-[#F7F7F2] py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#145A43]">
                <span className="w-8 h-[2px] bg-[#145A43]" />
                <span>COMPANY BACKGROUND</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17221D] font-['Plus_Jakarta_Sans']">
                About Tuna NP Portlink Logistics
              </h2>

              <div className="space-y-4 text-base text-[#59635D] leading-relaxed">
                <p>
                  <strong>Tuna NP Portlink Logistics</strong> is a newly established customs
                  brokerage and logistics company based in Gandhidham, Gujarat.
                </p>
                <p>
                  While the company itself is a new corporate entity, it is founded and backed by
                  more than four decades of continuous, hands-on industry experience.
                </p>
                <p>
                  Operating in customs brokerage, Customs House Agent (CHA) workflows, shipping line
                  liaison, and inland logistics, our leadership brings deep procedural knowledge of
                  Indian customs regulations, statutory documentation, ICEGATE processes, and port
                  operations.
                </p>
                <p>
                  Our primary objective is to deliver dependable, transparent, and responsive
                  support to importers, exporters, manufacturers, and cargo owners. Rather than
                  one-off transactions, we focus on establishing enduring, long-term business
                  relationships built on operational precision and trust.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[#17221D]">
                <div className="px-3.5 py-2 rounded bg-white border border-gray-200 shadow-2xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#145A43]" />
                  <span>Newly Established Entity</span>
                </div>
                <div className="px-3.5 py-2 rounded bg-white border border-gray-200 shadow-2xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#145A43]" />
                  <span>Backed by 40+ Years Industry Experience</span>
                </div>
                <div className="px-3.5 py-2 rounded bg-white border border-gray-200 shadow-2xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#145A43]" />
                  <span>Gandhidham, Gujarat Headquarters</span>
                </div>
              </div>
            </div>

            {/* Strategic Location & Regional Relevance */}
            <div className="lg:col-span-5 bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="w-10 h-10 rounded-lg bg-[#0B3D2E] text-white flex items-center justify-center">
                  <Anchor className="w-5 h-5 text-[#6FAF8F]" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#17221D]">Strategic Gateway: Gandhidham</h3>
                  <p className="text-xs text-gray-500">Kachchh, Gujarat – 370201</p>
                </div>
              </div>

              <p className="text-sm text-[#59635D] leading-relaxed">
                Gandhidham serves as the foremost maritime commercial corridor of Western India,
                positioned between two of the country's most critical deep-water ports:
              </p>

              <div className="space-y-3">
                <div className="p-3.5 rounded-lg bg-[#F7F7F2] border border-gray-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B3D2E] mb-1">
                    Deendayal Port (Kandla)
                  </h4>
                  <p className="text-xs text-[#59635D]">
                    Major national hub for bulk cargo, liquid consignments, agricultural produce, and
                    industrial raw materials.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#F7F7F2] border border-gray-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B3D2E] mb-1">
                    Mundra Port
                  </h4>
                  <p className="text-xs text-[#59635D]">
                    India’s largest commercial container hub handling high-frequency direct liner
                    services and multi-modal CFS networks.
                  </p>
                </div>
              </div>

              <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
                Direct on-the-ground operational capability enables swift documentation verification,
                physical container inspection, and timely terminal permissions.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION (White Background) */}
      <section id="mission-vision-section" className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-[#F7F7F2] rounded-xl p-8 sm:p-10 border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#0B3D2E] text-white flex items-center justify-center mb-6 shadow-xs">
                  <Target className="w-6 h-6 text-[#6FAF8F]" />
                </div>
                <h3 className="text-xl font-bold text-[#17221D] font-['Plus_Jakarta_Sans'] mb-4">
                  Our Mission
                </h3>
                <p className="text-base text-[#59635D] leading-relaxed">
                  “{COMPANY_INFO.mission}”
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-gray-200/60 text-xs font-semibold text-[#145A43] uppercase tracking-wider">
                Excellence in Execution • Transparent Coordination
              </div>
            </div>

            {/* Vision */}
            <div className="bg-[#F7F7F2] rounded-xl p-8 sm:p-10 border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#145A43] text-white flex items-center justify-center mb-6 shadow-xs">
                  <Eye className="w-6 h-6 text-[#B89B5E]" />
                </div>
                <h3 className="text-xl font-bold text-[#17221D] font-['Plus_Jakarta_Sans'] mb-4">
                  Our Vision
                </h3>
                <p className="text-base text-[#59635D] leading-relaxed">
                  “{COMPANY_INFO.vision}”
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-gray-200/60 text-xs font-semibold text-[#145A43] uppercase tracking-wider">
                Trust • Professionalism • Enduring Partnerships
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LEADERSHIP SECTION */}
      <section id="leadership-section" className="bg-[#F7F7F2] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#145A43] block mb-2">
              CO-FOUNDING LEADERSHIP
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17221D] font-['Plus_Jakarta_Sans'] mb-4">
              Company Leadership
            </h2>
            <p className="text-base text-[#59635D]">
              Two co-founders bringing complementary management, ground operations, and deep maritime trade knowledge to Western India.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* CO-FOUNDER — PARTNER 1 CARD */}
            <div
              id="leader-card-partner-1"
              className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#17221D] font-['Plus_Jakarta_Sans']">
                    {CO_FOUNDER_1.name}
                  </h3>
                  <p className="text-sm font-semibold text-[#145A43] mt-1">
                    {CO_FOUNDER_1.roleTitle}
                  </p>
                </div>

                <p className="text-sm text-[#59635D] leading-relaxed mb-6">
                  {CO_FOUNDER_1.bio}
                </p>

                <div className="border-t border-gray-100 pt-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#145A43]">
                      Professional Experience:
                    </h4>
                    <span className="text-[10px] text-gray-400 italic">
                      Operational Background
                    </span>
                  </div>

                  {CO_FOUNDER_1.recentPositions?.map((pos, i) => (
                    <div key={i} className="p-3.5 rounded-lg bg-[#F7F7F2] border border-gray-200/80">
                      <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-bold text-[#17221D]">{pos.title}</span>
                        {pos.location && (
                          <span className="text-[11px] font-mono text-gray-500">{pos.location}</span>
                        )}
                      </div>
                      <ul className="space-y-1 text-xs text-[#59635D] mt-2">
                        {pos.highlights.map((h, hi) => (
                          <li key={hi} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-[#145A43]" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500">
                <p>{CO_FOUNDER_1.additionalNote}</p>
              </div>
            </div>

            {/* CO-FOUNDER — PARTNER 2 CARD */}
            <div
              id="leader-card-partner-2"
              className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#17221D] font-['Plus_Jakarta_Sans']">
                    {CO_FOUNDER_2.name}
                  </h3>
                  <p className="text-sm font-semibold text-[#145A43] mt-1">
                    {CO_FOUNDER_2.roleTitle}
                  </p>
                </div>

                <div className="p-6 rounded-lg bg-[#F7F7F2] border border-dashed border-gray-300 text-center my-6 space-y-3">
                  <Briefcase className="w-8 h-8 text-[#145A43] mx-auto" />
                  <p className="text-sm text-gray-700 font-medium">
                    {CO_FOUNDER_2.bio}
                  </p>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    Partner profile and operational credentials will be updated as finalized.
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-5 space-y-4">
                  <div className="p-4 rounded-lg bg-[#F7F7F2] border border-gray-200/80 space-y-2">
                    <span className="text-xs font-bold text-[#17221D] block">Operational Scope</span>
                    <p className="text-xs text-[#59635D] leading-relaxed">
                      Leading commercial relationships, client communication, strategic vendor partnerships, and end-to-end transport coordination.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500">
                <p>{CO_FOUNDER_2.additionalNote}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION STRIP */}
      <section id="about-cta-strip" className="bg-[#0B3D2E] py-16 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 font-['Plus_Jakarta_Sans']">
            Partner with Experienced Logistics Professionals
          </h3>
          <p className="text-sm sm:text-base text-gray-200 mb-8 max-w-xl mx-auto">
            Discuss your import-export cargo movement, clearance requirements, or port coordination
            needs directly with our team.
          </p>
          <button
            id="about-cta-get-in-touch"
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-md bg-[#145A43] hover:bg-[#1a7356] border border-[#6FAF8F]/50 text-white font-bold text-sm tracking-wider shadow-lg hover:border-[#B89B5E] transition-all cursor-pointer"
          >
            <span>GET IN TOUCH WITH US</span>
            <ArrowRight className="w-4 h-4 text-[#B89B5E]" />
          </button>
        </div>
      </section>
    </div>
  );
};
