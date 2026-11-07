import React, { useEffect } from 'react';
import { PageRoute } from '../types';
import { SERVICES_LIST } from '../data/companyData';
import { ServiceIcon } from '../components/ServiceIcon';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  FileText,
  FileCheck,
  Send,
  HelpCircle,
  Truck,
  Anchor,
  Compass,
  Layers,
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageRoute, targetServiceId?: string) => void;
  initialServiceId?: string;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, initialServiceId }) => {
  useEffect(() => {
    if (initialServiceId) {
      const el = document.getElementById(`service-section-${initialServiceId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [initialServiceId]);

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section
        id="services-hero"
        className="relative bg-[#0B3D2E] text-white pt-32 pb-20 overflow-hidden"
      >
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=80"
            alt="Commercial cargo vessel and container stacking"
            className="w-full h-full object-cover object-center mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B3D2E]/80 via-[#0B3D2E] to-[#0B3D2E]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#145A43]/80 border border-[#6FAF8F]/40 text-[#B89B5E] text-xs font-bold tracking-wider uppercase mb-4">
              <ShieldCheck className="w-4 h-4 text-[#B89B5E]" />
              <span>CUSTOMS & LOGISTICS EXPERTISE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-['Plus_Jakarta_Sans'] tracking-tight mb-4">
              Customs & Logistics Solutions
            </h1>
            <p className="text-lg sm:text-xl text-[#6FAF8F] font-medium leading-relaxed font-['Manrope']">
              Practical expertise. Professional coordination. Reliable support.
            </p>
          </div>
        </div>
      </section>

      {/* 2. SERVICES QUICK ANCHOR STRIP */}
      <section className="bg-white border-b border-gray-200 sticky top-[65px] z-30 shadow-xs hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto py-3">
          <div className="flex items-center space-x-2 whitespace-nowrap text-xs">
            <span className="font-bold text-gray-400 uppercase mr-2">Jump to:</span>
            {SERVICES_LIST.map((svc) => (
              <a
                key={svc.id}
                href={`#service-section-${svc.id}`}
                className="px-3 py-1.5 rounded bg-[#F7F7F2] hover:bg-[#145A43] hover:text-white text-[#17221D] font-semibold transition-colors"
              >
                {svc.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DETAILED SERVICES SECTIONS (White & Off-White rhythmic grid) */}
      <section id="services-grid-detailed" className="bg-[#F7F7F2] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {SERVICES_LIST.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={service.id}
                id={`service-section-${service.id}`}
                className="scroll-mt-32 bg-white rounded-xl p-8 sm:p-12 border border-gray-200 shadow-sm transition-all hover:border-[#145A43]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Title & Overview */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-[#0B3D2E] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <ServiceIcon name={service.iconName} className="w-6 h-6 text-[#6FAF8F]" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono font-bold text-[#145A43] uppercase tracking-wider block">
                          SERVICE 0{index + 1}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold text-[#17221D] font-['Plus_Jakarta_Sans'] leading-tight">
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-[#59635D] leading-relaxed pt-2">
                      {service.shortDesc}
                    </p>

                    <div className="pt-3">
                      <button
                        id={`service-btn-enquire-${service.id}`}
                        onClick={() => onNavigate('contact', service.id)}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#0B3D2E] hover:bg-[#145A43] text-white font-bold text-xs sm:text-sm tracking-wider shadow-sm transition-all cursor-pointer"
                      >
                        <span>ENQUIRE NOW</span>
                        <ArrowRight className="w-4 h-4 text-[#B89B5E]" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Key Operational Deliverables / Bullet Points */}
                  <div className="lg:col-span-7 bg-[#F7F7F2] p-6 sm:p-8 rounded-lg border border-gray-200/80 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#145A43] mb-4">
                      Operational Focus & Scope of Coordination:
                    </h3>
                    <div className="space-y-3">
                      {service.bulletPoints.map((bullet, bi) => (
                        <div key={bi} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[#145A43] shrink-0 mt-0.5" />
                          <span className="text-sm text-[#17221D] font-medium leading-relaxed">
                            {bullet}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200/60 flex items-center justify-between text-xs text-gray-500">
                      <span>Standard compliance under Indian customs regulations</span>
                      <span className="font-mono text-[#145A43]">Gandhidham Hub</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. PRACTICAL CUSTOMS DOCUMENTATION CHECKLIST FOR TRADE */}
      <section id="customs-checklist-section" className="bg-white py-20 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#145A43] block mb-2">
              PRACTICAL TRADE GUIDE
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#17221D] font-['Plus_Jakarta_Sans'] mb-4">
              Standard Documentation Prepared & Handled
            </h2>
            <p className="text-sm sm:text-base text-[#59635D]">
              Clear and thorough documentation is essential for seamless customs clearance through
              ICEGATE and terminal operators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Import Documentation */}
            <div className="p-8 rounded-xl bg-[#F7F7F2] border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <FileCheck className="w-6 h-6 text-[#0B3D2E]" />
                <h3 className="text-lg font-bold text-[#17221D] font-['Plus_Jakarta_Sans']">
                  Core Import Documents
                </h3>
              </div>
              <ul className="space-y-2.5 text-sm text-[#59635D]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#145A43]" />
                  Bill of Entry (Home Consumption / Warehousing)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#145A43]" />
                  Original Bill of Lading (B/L) or Sea Waybill
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#145A43]" />
                  Commercial Invoice & Itemized Packing List
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#145A43]" />
                  Certificate of Origin (Preferential / Non-preferential)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#145A43]" />
                  Import-Export Code (IEC) & GSTIN registration data
                </li>
              </ul>
            </div>

            {/* Export Documentation */}
            <div className="p-8 rounded-xl bg-[#F7F7F2] border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Send className="w-6 h-6 text-[#145A43]" />
                <h3 className="text-lg font-bold text-[#17221D] font-['Plus_Jakarta_Sans']">
                  Core Export Documents
                </h3>
              </div>
              <ul className="space-y-2.5 text-sm text-[#59635D]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#145A43]" />
                  Shipping Bill (Duty Drawback, Advance Authorisation, Free)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#145A43]" />
                  Export Commercial Invoice and Detailed Packing List
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#145A43]" />
                  Self-Sealing Permission / Factory Stuffing Reports
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#145A43]" />
                  Letter of Undertaking (LUT) / E-Way Bill filings
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#145A43]" />
                  Inspection certificates and regulatory test reports (as applicable)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA */}
      <section id="services-bottom-cta" className="bg-[#0B3D2E] text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 font-['Plus_Jakarta_Sans']">
            Require Customs Brokerage or Logistics Support?
          </h3>
          <p className="text-sm sm:text-base text-gray-200 mb-8 max-w-xl mx-auto">
            Contact Tuna NP Portlink Logistics to discuss your cargo clearance and logistics
            specifications.
          </p>
          <button
            id="services-cta-contact-btn"
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-md bg-[#145A43] hover:bg-[#1a7356] border border-[#6FAF8F]/50 text-white font-bold text-sm tracking-wider shadow-lg hover:border-[#B89B5E] transition-all cursor-pointer"
          >
            <span>SUBMIT AN ENQUIRY</span>
            <ArrowRight className="w-4 h-4 text-[#B89B5E]" />
          </button>
        </div>
      </section>
    </div>
  );
};
