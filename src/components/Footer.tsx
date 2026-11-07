import React from 'react';
import { PageRoute } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { Anchor, MapPin, Phone, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="main-footer" className="bg-[#0B3D2E] text-white border-t border-[#145A43]">
      {/* Upper Footer CTA Strip */}
      <div className="border-b border-[#145A43]/80 bg-[#08291F]/70 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-semibold tracking-widest text-[#B89B5E] uppercase block mb-1">
              READY TO COMMENCE YOUR SHIPMENT?
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-['Plus_Jakarta_Sans']">
              Professional customs clearance and logistics coordination from Gandhidham.
            </h3>
          </div>
          <button
            id="footer-strip-cta-btn"
            onClick={() => onNavigate('contact')}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#145A43] hover:bg-[#1b7558] border border-[#6FAF8F]/50 text-white font-bold text-sm tracking-wider shadow-md hover:border-[#B89B5E] transition-all cursor-pointer"
          >
            <span>GET IN TOUCH</span>
            <ArrowRight className="w-4 h-4 text-[#B89B5E]" />
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Company identity column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#145A43] border border-[#6FAF8F]/40 flex items-center justify-center text-white">
                <Anchor className="w-5 h-5 text-[#6FAF8F]" />
              </div>
              <div>
                <h4 className="text-lg font-extrabold tracking-wider text-white font-['Plus_Jakarta_Sans']">
                  {COMPANY_INFO.name}
                </h4>
                <p className="text-xs uppercase tracking-widest text-[#6FAF8F] font-medium">
                  {COMPANY_INFO.primaryPositioning}
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed max-w-md pt-2">
              “Built on 40+ Years of Industry Experience.” Providing professional customs brokerage,
              shipping liaison, and logistics coordination for businesses engaged in international
              trade across Gujarat and India.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-[#B89B5E]">
              <ShieldCheck className="w-4 h-4 text-[#B89B5E]" />
              <span>Gandhidham, Kachchh, Gujarat – Strategic Gateway to Kandla & Mundra Ports</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-widest text-[#6FAF8F] border-b border-[#145A43] pb-2">
              Quick Links
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  id="footer-link-home"
                  onClick={() => onNavigate('home')}
                  className="text-gray-300 hover:text-[#B89B5E] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span className="text-[#6FAF8F]">›</span> Home
                </button>
              </li>
              <li>
                <button
                  id="footer-link-about"
                  onClick={() => onNavigate('about')}
                  className="text-gray-300 hover:text-[#B89B5E] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span className="text-[#6FAF8F]">›</span> About Us
                </button>
              </li>
              <li>
                <button
                  id="footer-link-services"
                  onClick={() => onNavigate('services')}
                  className="text-gray-300 hover:text-[#B89B5E] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span className="text-[#6FAF8F]">›</span> Services
                </button>
              </li>
              <li>
                <button
                  id="footer-link-blog"
                  onClick={() => onNavigate('blog')}
                  className="text-gray-300 hover:text-[#B89B5E] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span className="text-[#6FAF8F]">›</span> Blog & Insights
                </button>
              </li>
              <li>
                <button
                  id="footer-link-contact"
                  onClick={() => onNavigate('contact')}
                  className="text-gray-300 hover:text-[#B89B5E] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span className="text-[#6FAF8F]">›</span> Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-widest text-[#6FAF8F] border-b border-[#145A43] pb-2">
              Office Location
            </h5>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#B89B5E] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Office No. 12, First Floor,</p>
                  <p>Hari Krupa Complex, Plot 306, Sector 12B,</p>
                  <p>Gandhidham, Kachchh, Gujarat – 370201</p>
                  <p className="text-xs text-gray-400">India (PIN: 370201)</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <Phone className="w-4 h-4 text-[#6FAF8F] shrink-0" />
                <span className="text-sm font-mono text-gray-300">{COMPANY_INFO.contacts.phone}</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#6FAF8F] shrink-0" />
                <span className="text-sm font-mono text-gray-300">{COMPANY_INFO.contacts.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#145A43] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 Tuna NP Portlink Logistics. All Rights Reserved.</p>
          <p className="text-gray-400">
            Customs Brokerage & Logistics Solutions • Gandhidham, Gujarat
          </p>
        </div>
      </div>
    </footer>
  );
};
