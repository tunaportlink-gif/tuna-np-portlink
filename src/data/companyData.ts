import { ServiceItem, LeadershipMember } from '../types';

export const COMPANY_INFO = {
  name: 'Tuna NP Portlink Logistics',
  tagline: 'Backed by 40+ Years of Industry Experience.',
  subTagline: 'Seamless Customs Clearance. Reliable Logistics.',
  primaryPositioning: 'Customs Brokerage & Logistics Solutions',
  shortAbout:
    'Tuna NP Portlink Logistics provides professional customs brokerage and logistics solutions for businesses involved in import, export and cargo movement.',
  fullAbout:
    'Tuna NP Portlink Logistics is a newly established customs brokerage and logistics company based in Gandhidham, Gujarat. While the company is newly formed, it is backed by more than four decades of practical industry experience. Our co-founding leadership brings extensive knowledge of customs procedures, import-export operations, shipping and logistics management. We aim to provide dependable, professional and responsive support to businesses navigating customs and logistics requirements.',
  mission:
    'To provide dependable customs brokerage and logistics solutions through practical industry expertise, professional coordination and responsive service.',
  vision:
    'To build a trusted customs and logistics company known for professionalism, transparency, operational expertise and long-term business relationships.',
  address: {
    line1: 'Office No. 12, First Floor, Hari Krupa Complex',
    line2: 'Plot 306, Sector 12B',
    city: 'Gandhidham',
    district: 'Kachchh',
    state: 'Gujarat',
    pin: '370201',
    country: 'India',
    formatted:
      'Office No. 12, First Floor, Hari Krupa Complex, Plot 306, Sector 12B, Gandhidham, Kachchh, Gujarat – 370201, India',
  },
  contacts: {
    phone: '[PHONE NUMBER]',
    email: '[EMAIL ADDRESS]',
    whatsapp: '[WHATSAPP NUMBER]',
    businessHours: '[BUSINESS HOURS]',
  },
};

export const CO_FOUNDER_1: LeadershipMember = {
  roleTitle: 'Co-Founder',
  name: 'PARTNER 1',
  bio: 'Extensive experience across customs, shipping, import-export and logistics operations with decades of practical industry engagement.',
  recentPositions: [
    {
      title: 'Senior Operations & Logistics Experience',
      location: 'Gandhidham, Gujarat',
      highlights: [
        'Complete logistics solutions & multi-modal routing',
        'Team leadership and operational coordination',
        'Container clearance and port terminal liaison',
      ],
    },
    {
      title: 'Extensive Customs & Import-Export Experience',
      location: 'Gandhidham, Gujarat',
      highlights: [
        'Customs regulations and statutory compliance management',
        'Import and export clearance procedures',
        'Port operations, documentation, and shipping coordination',
      ],
    },
  ],
  additionalNote:
    'Extensive background across maritime trade, shipping operations, and Indian customs procedures across Western India.',
};

export const CO_FOUNDER_2: LeadershipMember = {
  roleTitle: 'Co-Founder',
  name: 'PARTNER 2',
  bio: '[PARTNER 2 PROFILE TO BE ADDED]',
  isPlaceholder: true,
  additionalNote:
    'Partner 2 details and professional background are currently being finalized and will be updated shortly.',
};

// Aliases for backwards compatibility and clean array export
export const FOUNDER_INFO = CO_FOUNDER_1;
export const PARTNER_INFO = CO_FOUNDER_2;
export const CO_FOUNDERS: LeadershipMember[] = [CO_FOUNDER_1, CO_FOUNDER_2];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'import-customs-clearance',
    title: 'IMPORT CUSTOMS CLEARANCE',
    shortDesc:
      'Comprehensive customs clearance for incoming commercial cargo with meticulous documentation and regulatory compliance.',
    bulletPoints: [
      'Accurate Bill of Entry filing and HSN classification verification',
      'Customs assessment and duty coordination with regulatory authorities',
      'Port examination coordination, cargo clearance and delivery orders',
      'Dedicated handling for containerized, bulk, and project imports',
    ],
    iconName: 'FileCheck',
  },
  {
    id: 'export-customs-clearance',
    title: 'EXPORT CUSTOMS CLEARANCE',
    shortDesc:
      'Efficient outward customs clearance ensuring rapid cargo processing, documentation compliance, and timely vessel departure.',
    bulletPoints: [
      'Shipping Bill processing and statutory documentation verification',
      'Factory stuffing coordination and customs seal inspection support',
      'Port gate entry, carting clearance, and Let Export Order (LEO) handling',
      'Coordination with shipping lines, container terminals, and CFS',
    ],
    iconName: 'Send',
  },
  {
    id: 'customs-documentation',
    title: 'CUSTOMS DOCUMENTATION',
    shortDesc:
      'Structured preparation and verification of all statutory paperwork required under Indian customs and foreign trade regulations.',
    bulletPoints: [
      'Review of commercial invoices, packing lists, and transport documents',
      'Certificate of Origin, country-specific documentation, and trade pact filings',
      'Regulatory compliance checks and documentation discrepancy audits',
      'Filing support through ICEGATE and associated government portals',
    ],
    iconName: 'FileText',
  },
  {
    id: 'import-export-support',
    title: 'IMPORT & EXPORT SUPPORT',
    shortDesc:
      'Practical guidance and procedural advisory for manufacturers, traders, and businesses engaged in international commerce.',
    bulletPoints: [
      'Advisory on import-export customs procedures and procedural requirements',
      'Guidance on tariff classification, notifications, and duty structures',
      'Assistance with port procedures, bonded movements, and regulatory guidelines',
      'Support for new and established trading entities across Gujarat and India',
    ],
    iconName: 'HelpCircle',
  },
  {
    id: 'cargo-coordination',
    title: 'CARGO COORDINATION',
    shortDesc:
      'Systematic operational coordination between shippers, port terminals, freight handlers, and transport operators.',
    bulletPoints: [
      'Real-time coordination across container yards, warehouses, and transport',
      'Monitoring cargo readiness, container stuffing, and terminal gates',
      'Communication linkage between overseas partners, domestic buyers, and agents',
      'Coordination to minimize container detention, demurrage, and port dwell time',
    ],
    iconName: 'Layers',
  },
  {
    id: 'logistics-support',
    title: 'LOGISTICS SUPPORT',
    shortDesc:
      'Operational support services addressing ground transportation, container staging, and secondary freight movement.',
    bulletPoints: [
      'Coordination for container transport from port terminals to CFS / customer premises',
      'Inland transit documentation and statutory carrier handover coordination',
      'First-mile and last-mile dispatch support for industrial and commercial goods',
      'Proactive status updates throughout the cargo movement lifecycle',
    ],
    iconName: 'Truck',
  },
  {
    id: 'port-terminal-coordination',
    title: 'PORT & TERMINAL COORDINATION',
    shortDesc:
      'Direct on-ground operational coordination at major maritime gateways and Container Freight Stations (CFS).',
    bulletPoints: [
      'Liaison with container terminals, port operating teams, and CFS operators',
      'Gate passes, container movement permissions, and survey coordination',
      'Handling of terminal documentation, security permits, and berth schedules',
      'Experienced operational presence in the Gandhidham / Kandla / Mundra maritime belt',
    ],
    iconName: 'Anchor',
  },
  {
    id: 'end-to-end-logistics',
    title: 'END-TO-END LOGISTICS SOLUTIONS',
    shortDesc:
      'Integrated logistics management connecting customs clearance, port coordination, inland movement, and final delivery.',
    bulletPoints: [
      'Single-point operational management from cargo arrival to delivery',
      'Cohesive integration of customs brokerage with transport and documentation',
      'Transparent milestone tracking and proactive exception handling',
      'Tailored operational workflows aligned with your business supply chain',
    ],
    iconName: 'Compass',
  },
];

export const WHY_CHOOSE_US = [
  {
    number: '01',
    title: '40+ YEARS OF EXPERIENCE',
    description: 'Decades of practical experience across customs, shipping and logistics.',
  },
  {
    number: '02',
    title: 'INDUSTRY KNOWLEDGE',
    description: 'Deep practical understanding of customs and import-export operations.',
  },
  {
    number: '03',
    title: 'PROFESSIONAL COORDINATION',
    description: 'Focused coordination across customs and logistics processes.',
  },
  {
    number: '04',
    title: 'CLIENT-FOCUSED SERVICE',
    description: 'Responsive support built around the practical requirements of each client.',
  },
];

export const EXPERTISE_PILLARS = [
  { label: 'CUSTOMS', icon: 'ShieldCheck' },
  { label: 'IMPORT & EXPORT', icon: 'Globe' },
  { label: 'SHIPPING', icon: 'Ship' },
  { label: 'LOGISTICS', icon: 'Truck' },
  { label: 'DOCUMENTATION', icon: 'FileCheck2' },
  { label: 'CARGO COORDINATION', icon: 'GitMerge' },
];
