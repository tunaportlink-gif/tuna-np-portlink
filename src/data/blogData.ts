import { BlogPost } from '../types';

export const BLOG_STORAGE_KEY = 'tuna_portlink_blog_posts_v1';

export const BLOG_CATEGORIES = [
  'Customs Clearance',
  'Logistics & Shipping',
  'Import & Export',
  'Port & Terminal',
  'Trade Regulations',
];

export const PRESET_IMAGES = [
  {
    label: 'Container Terminal & Gantry Cranes',
    url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=80',
  },
  {
    label: 'Maritime Cargo Ship at Sea',
    url: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1600&q=80',
  },
  {
    label: 'Customs Documents & Bill of Lading',
    url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1600&q=80',
  },
  {
    label: 'Inland Freight Transport & Trucks',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80',
  },
  {
    label: 'Industrial Port Warehouse & Logistics Yard',
    url: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1600&q=80',
  },
];

export const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'import-customs-clearance-kandla-mundra-icegate-documentation',
    title: 'Understanding Import Customs Clearance at Kandla & Mundra: Key Documentation & ICEGATE Protocols',
    excerpt:
      'A practical procedural guide for commercial importers navigating Bill of Entry filing, HSN tariff classification, faceless assessment, and physical examination at Gujarat maritime gateways.',
    content: `Import customs clearance through major maritime gateways such as Deendayal Port (Kandla) and Mundra Port requires systematic documentation and procedural discipline. With the implementation of the Indian Customs Electronic Gateway (ICEGATE) and Turant Customs (faceless assessment), commercial consignments are assessed digitally across national assessment centers.

### 1. The Core Documentation Lifecycle
Every commercial import starts with accurate documentation preparation well prior to vessel arrival:
* **Commercial Invoice & Packing List:** Must accurately detail unit values, foreign currency terms (CIF, FOB, CFR), gross/net weight, and country of origin.
* **Bill of Lading (BL):** Original or Sea Waybill issued by the shipping line, verifying consignee ownership and container seals.
* **Import General Manifest (IGM):** Filed by the shipping line prior to vessel berthing. Without a valid IGM number and inward date, electronic Bill of Entry submission cannot proceed.
* **Statutory Declarations:** GATT valuation declaration under Section 14 of the Customs Act, 1962.

### 2. Advance Electronic Filing & HSN Classification
Importers are encouraged to utilize advance filing of the Bill of Entry (prior to or upon vessel arrival). Accurate 8-digit HSN (Harmonized System of Nomenclature) classification is critical:
* **Duty Calculation:** Ensures proper application of Basic Customs Duty (BCD), Social Welfare Surcharge (SWS), and Integrated Goods and Services Tax (IGST).
* **Anti-Dumping & Safeguard Duties:** Incorrect classification can expose the importer to heavy back-dated reassessments and demurrage penalties.
* **Exemption Notifications:** Meticulous citation of relevant customs notifications to avail statutory concessions.

### 3. Faceless Assessment & First Check vs. Second Check Examination
Under modern faceless assessment protocols, documents are routed algorithmically to customs officers across India:
1. **Faceless Query Management:** Timely response to online assessment queries is essential to prevent assessment holds.
2. **Duty Payment (e-Payment):** Executed securely via ICEGATE ECL (Electronic Cash Ledger).
3. **Port Examination Orders:** Depending on the Risk Management System (RMS), consignments are either routed through the Green Channel (facilitated without examination) or designated for first/second check examination at container freight stations (CFS).

### 4. Strategic Advantages of Regional Presence in Gandhidham
Operating directly in the Gandhidham corridor allows customs brokers to liaise in real-time between port container terminals, CFS operators, customs superintendents, and transport fleet operators. Immediate physical coordination resolves query bottlenecks quickly, eliminating unnecessary port dwell time.`,
    category: 'Customs Clearance',
    tags: ['Customs Clearance', 'ICEGATE', 'Kandla Port', 'Mundra Port', 'Import Documentation'],
    authorName: 'PARTNER 1',
    authorRole: 'Co-Founder',
    coverImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=80',
    coverImageAlt: 'Container ship and port operations at terminal',
    publishedAt: '2026-03-10',
    readTimeMinutes: 6,
    status: 'published',
    featured: true,
    seo: {
      metaTitle: 'Import Customs Clearance Kandla & Mundra | Documentation Guide',
      metaDescription:
        'Practical guide to import customs clearance at Kandla & Mundra ports. Learn Bill of Entry filing, ICEGATE faceless assessment, and documentation protocols.',
      focusKeyword: 'Import Customs Clearance Kandla Mundra',
      canonicalUrl: 'https://tunaportlink.com/#blog/import-customs-clearance-kandla-mundra-icegate-documentation',
    },
  },
  {
    id: 'post-2',
    slug: 'mitigating-container-detention-demurrage-cargo-strategies',
    title: 'Mitigating Container Detention and Demurrage: Practical Strategies for Cargo Owners',
    excerpt:
      'How structured port coordination, advance electronic filing, and rapid CFS carting protect commercial margins from compounding shipping line penalties.',
    content: `Container detention and demurrage represent two of the most preventable yet frequent drains on an importer's or exporter's operational profitability. In high-volume maritime corridors like Kandla, Mundra, and Pipavav, delays of even a few days can quickly compound into charges that exceed the total freight cost.

### Understanding the Crucial Difference
* **Demurrage:** Charged by the shipping line or port terminal when full containers remain inside the port terminal or terminal container yard beyond the permitted free period.
* **Detention:** Charged when the consignee picks up the container for destuffing at their factory or warehouse and fails to return the empty container to the shipping line’s designated container yard within the agreed free days.

### Root Causes of Unplanned Charges
From four decades of ground operations, the most prevalent causes include:
1. Discrepancies between commercial invoices and packing lists causing customs assessment delays.
2. Delays in obtaining Delivery Orders (DO) from freight forwarders or shipping lines due to payment settlement lags.
3. Bureaucratic bottlenecks in statutory clearance agencies (FSSAI, Plant Quarantine, BIS, Wildlife).
4. Shortages of trailers or transit transport coordination during peak port discharge cycles.

### 5 Proactive Strategies to Protect Your Bottom Line
1. **Negotiate Extended Free Days Upfront:** Ensure your freight terms explicitly stipulate 14 or 21 free detention days at destination ports rather than accepting the baseline 5 to 7 days.
2. **Pre-Alert Filing and Advance Bill of Entry:** Lodge the Bill of Entry prior to vessel berthing using advance manifest data to initiate faceless assessment early.
3. **Select High-Efficiency CFS Facilities:** Choose Container Freight Stations with dedicated yard equipment and prompt destuffing capabilities.
4. **Active Transport Fleet Alignment:** Pre-book trailers and transit permits 48 hours prior to expected out-of-charge (OOC).
5. **Single-Window Logistics Coordination:** Consolidating customs clearance and inland transportation with a unified partner eliminates finger-pointing between separate handling agents.`,
    category: 'Logistics & Shipping',
    tags: ['Demurrage', 'Detention', 'Port Coordination', 'CFS Operations', 'Supply Chain'],
    authorName: 'PARTNER 1',
    authorRole: 'Co-Founder',
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80',
    coverImageAlt: 'Container trucks on highway logistics corridor',
    publishedAt: '2026-03-02',
    readTimeMinutes: 5,
    status: 'published',
    featured: false,
    seo: {
      metaTitle: 'Mitigating Container Detention and Demurrage | Logistics Strategy',
      metaDescription:
        'Protect your business from costly shipping line detention and demurrage charges. Practical operational guidance from Gandhidham logistics experts.',
      focusKeyword: 'Container Detention Demurrage',
      canonicalUrl: 'https://tunaportlink.com/#blog/mitigating-container-detention-demurrage-cargo-strategies',
    },
  },
  {
    id: 'post-3',
    slug: 'export-clearance-lut-gst-compliances-indian-trade',
    title: 'Export Clearance Under Letter of Undertaking (LUT) & GST Compliances in Indian Foreign Trade',
    excerpt:
      'Essential regulatory requirements for zero-rated exports from Indian ports, covering Shipping Bill generation, seal inspection, and Let Export Order (LEO) clearance.',
    content: `Under India’s GST architecture, goods exported out of India qualify as "zero-rated supplies." Exporters have two statutory options: export under payment of Integrated GST with subsequent refund, or export under a Letter of Undertaking (LUT) without paying integrated tax upfront.

### Why Most Exporters Prefer the LUT Route
Exporting under an LUT (Form GST RFD-11) submitted electronically through the GST portal preserves working capital by eliminating the cash outflow of tax payment and the administrative overhead of waiting for refund clearances.

### Key Operational Steps for Seamless Export Clearance
1. **Validity of Annual LUT:** An LUT remains valid for one financial year (April 1 to March 31). Exporters must ensure their LUT is renewed prior to the commencement of each new fiscal period.
2. **Shipping Bill Filing:** Prepared and filed on ICEGATE citing the LUT ARN (Application Reference Number). The invoice must state clearly: *"Supply meant for export under bond or letter of undertaking without payment of integrated tax."*
3. **Electronic Seal (e-Seal) / Customs Seal Inspection:** For factory-stuffed containers, RFID e-seals verified through approved vendor platforms streamline port gate-in procedures. For dock-stuffed consignments, physical verification by customs examination officers is conducted at the CFS.
4. **Carting & Gate-In Permission:** Moving cargo into the terminal within the vessel's cut-off window.
5. **Let Export Order (LEO):** The statutory clearance granted by customs authorizing the shipping line to load the container aboard the outbound vessel.

### Avoiding Common Regulatory Pitfalls
* **FEMA / BRC / e-BRC Reconciliation:** Ensure export realization occurs within the period stipulated by Reserve Bank of India guidelines (typically 9 months).
* **HSN & Description Exactness:** Inaccurate item descriptions can trigger scrutiny by customs intelligence units, risking clearance delays.
* **Liaison with Port Terminals:** Real-time tracking of gate cut-off dates prevents missing the scheduled vessel departure.`,
    category: 'Import & Export',
    tags: ['Export Clearance', 'GST LUT', 'Shipping Bill', 'Foreign Trade Policy', 'Customs Brokerage'],
    authorName: 'PARTNER 1',
    authorRole: 'Co-Founder',
    coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1600&q=80',
    coverImageAlt: 'Customs documents, shipping orders and commercial contracts',
    publishedAt: '2026-02-24',
    readTimeMinutes: 5,
    status: 'published',
    featured: false,
    seo: {
      metaTitle: 'Export Clearance Under LUT & GST Compliances | Indian Trade',
      metaDescription:
        'Comprehensive guide to export clearance under LUT and GST in India. Understand Shipping Bill filings, e-seals, and Let Export Order (LEO) processes.',
      focusKeyword: 'Export Clearance LUT GST',
      canonicalUrl: 'https://tunaportlink.com/#blog/export-clearance-lut-gst-compliances-indian-trade',
    },
  },
];

export function getStoredBlogPosts(): BlogPost[] {
  if (typeof window === 'undefined') return DEFAULT_BLOG_POSTS;

  try {
    const raw = localStorage.getItem(BLOG_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(DEFAULT_BLOG_POSTS));
      return DEFAULT_BLOG_POSTS;
    }

    const posts: BlogPost[] = JSON.parse(raw);
    const now = new Date();
    let hasModifications = false;

    // Auto-promote scheduled posts that have reached their scheduled date
    const updatedPosts = posts.map((post) => {
      if (post.status === 'scheduled' && post.scheduledDate) {
        const scheduledTime = new Date(post.scheduledDate);
        if (scheduledTime <= now) {
          hasModifications = true;
          return {
            ...post,
            status: 'published' as const,
            publishedAt: post.scheduledDate.split('T')[0] || new Date().toISOString().split('T')[0],
          };
        }
      }
      return post;
    });

    if (hasModifications) {
      localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(updatedPosts));
    }

    return updatedPosts;
  } catch (err) {
    console.error('Failed reading blog posts from storage:', err);
    return DEFAULT_BLOG_POSTS;
  }
}

export function saveBlogPosts(posts: BlogPost[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
    window.dispatchEvent(new CustomEvent('tuna_blog_updated'));
  } catch (err) {
    console.error('Failed saving blog posts to storage:', err);
  }
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const posts = getStoredBlogPosts();
  return posts.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}

export function getBlogPostById(id: string): BlogPost | undefined {
  const posts = getStoredBlogPosts();
  return posts.find((p) => p.id === id);
}

export function saveOrUpdateBlogPost(post: BlogPost): void {
  const posts = getStoredBlogPosts();
  const existingIndex = posts.findIndex((p) => p.id === post.id);

  if (existingIndex >= 0) {
    posts[existingIndex] = {
      ...post,
      updatedAt: new Date().toISOString().split('T')[0],
    };
  } else {
    posts.unshift(post);
  }

  saveBlogPosts(posts);
}

export function deleteBlogPost(id: string): void {
  const posts = getStoredBlogPosts();
  const filtered = posts.filter((p) => p.id !== id);
  saveBlogPosts(filtered);
}

export const getBlogPosts = getStoredBlogPosts;
export const saveBlogPost = saveOrUpdateBlogPost;

export function resetToDefaultBlogPosts(): BlogPost[] {
  if (typeof window !== 'undefined') {
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(DEFAULT_BLOG_POSTS));
    window.dispatchEvent(new CustomEvent('tuna_blog_updated'));
  }
  return DEFAULT_BLOG_POSTS;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}
