import React, { useState, useEffect } from 'react';
import { PageRoute, ContactFormData } from '../types';
import { COMPANY_INFO, SERVICES_LIST } from '../data/companyData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Send,
  AlertCircle,
  Copy,
  ExternalLink,
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageRoute) => void;
  preselectedServiceId?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  preselectedServiceId,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    companyName: '',
    phoneNumber: '',
    emailAddress: '',
    serviceRequired: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [enquiryId, setEnquiryId] = useState('');
  const [copiedId, setCopiedId] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle preselected service from Service cards
  useEffect(() => {
    if (preselectedServiceId) {
      const match = SERVICES_LIST.find((s) => s.id === preselectedServiceId);
      if (match) {
        setFormData((prev) => ({
          ...prev,
          serviceRequired: match.title,
        }));
      }
    }
  }, [preselectedServiceId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.emailAddress.trim() || !formData.phoneNumber.trim()) {
      setErrorMessage('Please fill in your Full Name, Email Address, and Phone Number.');
      return;
    }

    setSubmitting(true);
    // Simulate professional corporate submission
    setTimeout(() => {
      const generatedRef = `TNPL-${Math.floor(100000 + Math.random() * 900000)}`;
      setEnquiryId(generatedRef);
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const handleCopyRef = () => {
    if (enquiryId) {
      navigator.clipboard.writeText(enquiryId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      companyName: '',
      phoneNumber: '',
      emailAddress: '',
      serviceRequired: '',
      message: '',
    });
  };

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section
        id="contact-hero"
        className="relative bg-[#0B3D2E] text-white pt-32 pb-20 overflow-hidden"
      >
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80"
            alt="Logistics terminal operations"
            className="w-full h-full object-cover object-center mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B3D2E]/85 via-[#0B3D2E] to-[#0B3D2E]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#145A43]/80 border border-[#6FAF8F]/40 text-[#B89B5E] text-xs font-bold tracking-wider uppercase mb-4">
              <ShieldCheck className="w-4 h-4 text-[#B89B5E]" />
              <span>DIRECT ENQUIRIES</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-['Plus_Jakarta_Sans'] tracking-tight mb-4">
              Let’s Talk About Your Logistics Requirements.
            </h1>
            <p className="text-lg text-[#6FAF8F] font-medium leading-relaxed font-['Manrope']">
              Get in touch with Tuna NP Portlink Logistics for customs clearance and logistics enquiries.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTACT DETAILS & FORM GRID */}
      <section id="contact-content-section" className="bg-[#F7F7F2] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Confirmed Business Information */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#145A43] block mb-1">
                    OFFICIAL HEADQUARTERS
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#17221D] font-['Plus_Jakarta_Sans']">
                    {COMPANY_INFO.name}
                  </h2>
                  <p className="text-xs uppercase tracking-wider text-[#145A43] font-semibold mt-0.5">
                    {COMPANY_INFO.primaryPositioning}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-5 space-y-5">
                  {/* Address */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-[#0B3D2E] text-white shrink-0 mt-0.5 shadow-xs">
                      <MapPin className="w-5 h-5 text-[#6FAF8F]" />
                    </div>
                    <div className="text-sm text-[#59635D] leading-relaxed">
                      <p className="font-bold text-[#17221D]">
                        {COMPANY_INFO.address.line1}
                      </p>
                      <p>{COMPANY_INFO.address.line2}</p>
                      <p>
                        {COMPANY_INFO.address.city}, {COMPANY_INFO.address.district}, {COMPANY_INFO.address.state} –{' '}
                        {COMPANY_INFO.address.pin}
                      </p>
                      <p className="text-xs text-[#145A43] font-semibold mt-1">
                        Country: {COMPANY_INFO.address.country} (PIN: {COMPANY_INFO.address.pin})
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-[#F7F7F2] text-[#0B3D2E] border border-gray-200 shrink-0 mt-0.5">
                      <Phone className="w-5 h-5 text-[#145A43]" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold uppercase text-gray-500">
                        Phone Number
                      </span>
                      <span className="text-sm font-mono text-[#17221D]">
                        {COMPANY_INFO.contacts.phone}
                      </span>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Official telecommunications line
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-[#F7F7F2] text-[#0B3D2E] border border-gray-200 shrink-0 mt-0.5">
                      <Mail className="w-5 h-5 text-[#145A43]" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold uppercase text-gray-500">
                        Email Address
                      </span>
                      <span className="text-sm font-mono text-[#17221D]">
                        {COMPANY_INFO.contacts.email}
                      </span>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Commercial correspondence & document submissions
                      </p>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-[#F7F7F2] text-[#0B3D2E] border border-gray-200 shrink-0 mt-0.5">
                      <MessageSquare className="w-5 h-5 text-[#145A43]" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold uppercase text-gray-500">
                        WhatsApp Enquiries
                      </span>
                      <span className="text-sm font-mono text-[#17221D]">
                        {COMPANY_INFO.contacts.whatsapp}
                      </span>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Direct messaging for rapid shipment queries
                      </p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-[#F7F7F2] text-[#0B3D2E] border border-gray-200 shrink-0 mt-0.5">
                      <Clock className="w-5 h-5 text-[#145A43]" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold uppercase text-gray-500">
                        Business Hours
                      </span>
                      <span className="text-sm font-mono text-[#17221D]">
                        {COMPANY_INFO.contacts.businessHours}
                      </span>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Port operations active according to shipping line and terminal windows
                      </p>
                    </div>
                  </div>
                </div>

                {/* Important notice on data confirmation */}
                <div className="p-4 rounded-lg bg-[#F7F7F2] border border-gray-200 text-xs text-[#59635D]">
                  <p className="font-semibold text-[#17221D] mb-1">
                    Authentic Verified Contact Desk
                  </p>
                  <p>
                    All official records for Tuna NP Portlink Logistics originate from our Gandhidham
                    office. For active shipments, please state your container or Bill of Lading
                    reference.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-xl p-8 sm:p-10 border border-gray-200 shadow-sm">
                <div className="border-b border-gray-100 pb-5 mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#145A43] block mb-1">
                    ENQUIRY FORM
                  </span>
                  <h2 className="text-2xl font-bold text-[#17221D] font-['Plus_Jakarta_Sans']">
                    Send Us an Enquiry
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Fill in your shipment or service requirements below for prompt review.
                  </p>
                </div>

                {submitted ? (
                  <div
                    id="enquiry-success-message"
                    className="p-8 rounded-xl bg-[#0B3D2E]/5 border border-[#145A43]/30 text-center space-y-4 animate-in fade-in duration-300"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#0B3D2E] text-white flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-8 h-8 text-[#6FAF8F]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#17221D] font-['Plus_Jakarta_Sans']">
                      Enquiry Received
                    </h3>
                    <p className="text-sm text-[#59635D] max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-[#17221D]">{formData.fullName}</strong>.
                      Your logistics enquiry has been recorded under reference number:
                    </p>

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-300 font-mono text-base font-bold text-[#0B3D2E] shadow-2xs">
                      <span>{enquiryId}</span>
                      <button
                        onClick={handleCopyRef}
                        title="Copy Enquiry Reference"
                        className="text-gray-400 hover:text-[#0B3D2E] p-1 rounded"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>

                    {copiedId && (
                      <p className="text-xs text-[#145A43] font-semibold">
                        Reference number copied to clipboard!
                      </p>
                    )}

                    <div className="text-xs text-[#59635D] pt-2">
                      Our Gandhidham operations team will review your specifications regarding{' '}
                      <strong>{formData.serviceRequired || 'customs & logistics'}</strong> and respond
                      promptly.
                    </div>

                    <div className="pt-4">
                      <button
                        id="submit-another-enquiry-btn"
                        onClick={resetForm}
                        className="px-6 py-2.5 rounded-md bg-[#0B3D2E] hover:bg-[#145A43] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Submit Another Enquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" id="logistics-enquiry-form">
                    {errorMessage && (
                      <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Full Name */}
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-xs font-bold uppercase tracking-wider text-[#17221D] mb-1.5"
                        >
                          Full Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Ramesh Patel"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-[#145A43] focus:ring-1 focus:ring-[#145A43] text-sm text-[#17221D] bg-white transition-colors outline-none"
                        />
                      </div>

                      {/* Company Name */}
                      <div>
                        <label
                          htmlFor="companyName"
                          className="block text-xs font-bold uppercase tracking-wider text-[#17221D] mb-1.5"
                        >
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder="e.g. Gujarat Trading Corp"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-[#145A43] focus:ring-1 focus:ring-[#145A43] text-sm text-[#17221D] bg-white transition-colors outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Phone Number */}
                      <div>
                        <label
                          htmlFor="phoneNumber"
                          className="block text-xs font-bold uppercase tracking-wider text-[#17221D] mb-1.5"
                        >
                          Phone Number <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          required
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-[#145A43] focus:ring-1 focus:ring-[#145A43] text-sm text-[#17221D] bg-white transition-colors outline-none"
                        />
                      </div>

                      {/* Email Address */}
                      <div>
                        <label
                          htmlFor="emailAddress"
                          className="block text-xs font-bold uppercase tracking-wider text-[#17221D] mb-1.5"
                        >
                          Email Address <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="email"
                          id="emailAddress"
                          name="emailAddress"
                          required
                          value={formData.emailAddress}
                          onChange={handleChange}
                          placeholder="name@company.com"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-[#145A43] focus:ring-1 focus:ring-[#145A43] text-sm text-[#17221D] bg-white transition-colors outline-none"
                        />
                      </div>
                    </div>

                    {/* Service Required */}
                    <div>
                      <label
                        htmlFor="serviceRequired"
                        className="block text-xs font-bold uppercase tracking-wider text-[#17221D] mb-1.5"
                      >
                        Service Required
                      </label>
                      <select
                        id="serviceRequired"
                        name="serviceRequired"
                        value={formData.serviceRequired}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-[#145A43] focus:ring-1 focus:ring-[#145A43] text-sm text-[#17221D] bg-white transition-colors outline-none"
                      >
                        <option value="">-- Select Required Service --</option>
                        {SERVICES_LIST.map((svc) => (
                          <option key={svc.id} value={svc.title}>
                            {svc.title}
                          </option>
                        ))}
                        <option value="General Customs & Logistics Enquiry">
                          General Customs & Logistics Enquiry
                        </option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-bold uppercase tracking-wider text-[#17221D] mb-1.5"
                      >
                        Message / Cargo Specifications
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please describe your cargo type, port of arrival/departure (Kandla / Mundra), container details, or specific customs clearance questions."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-[#145A43] focus:ring-1 focus:ring-[#145A43] text-sm text-[#17221D] bg-white transition-colors outline-none resize-y"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        id="submit-enquiry-button"
                        disabled={submitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md bg-[#0B3D2E] hover:bg-[#145A43] text-white font-bold text-sm tracking-wider shadow-sm transition-all duration-200 cursor-pointer disabled:opacity-70"
                      >
                        {submitting ? (
                          <span>PROCESSING ENQUIRY...</span>
                        ) : (
                          <>
                            <span>SUBMIT ENQUIRY</span>
                            <Send className="w-4 h-4 text-[#B89B5E]" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* 3. GOOGLE MAPS & LOCATION CARD */}
          <div className="mt-16 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-6 bg-[#0B3D2E] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#B89B5E] block mb-1">
                  OFFICE LOCATION MAP
                </span>
                <h3 className="text-lg font-bold font-['Plus_Jakarta_Sans']">
                  Hari Krupa Complex, Sector 12B, Gandhidham, Gujarat
                </h3>
              </div>
              <div className="text-xs font-mono text-[#6FAF8F]">
                PIN: 370201 • Kachchh, India
              </div>
            </div>

            {/* Embedded Google Maps View for Gandhidham Gujarat */}
            <div className="w-full h-80 sm:h-96 relative bg-gray-100">
              <iframe
                title="Tuna NP Portlink Logistics Location - Gandhidham, Gujarat"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14693.315053748506!2d70.1264871!3d23.0763953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3950b73df016ec3f%3A0x6b63d76b1f24d31!2sSector%2012B%2C%20Gandhidham%2C%20Gujarat%20370201!5e0!3m2!1sen!2sin!4v1710672000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale contrast-125 opacity-90"
              />
            </div>

            <div className="p-4 bg-[#F7F7F2] border-t border-gray-200 text-xs text-[#59635D] flex flex-col sm:flex-row items-center justify-between gap-2">
              <span>
                <strong>Physical Coordinates:</strong> Office No. 12, First Floor, Hari Krupa Complex, Plot 306, Sector 12B, Gandhidham, Gujarat 370201
              </span>
              <span className="text-[#145A43] font-semibold">
                Proximity: 12 km to Kandla Port • 65 km to Mundra Port
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
