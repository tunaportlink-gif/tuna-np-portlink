export type PageRoute = 'home' | 'about' | 'services' | 'blog' | 'blog-post' | 'contact';

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  bulletPoints: string[];
  iconName: string;
}

export interface LeadershipMember {
  roleTitle: string;
  name: string;
  experienceBadge?: string;
  bio: string;
  recentPositions?: {
    title: string;
    company?: string;
    period?: string;
    location?: string;
    highlights: string[];
  }[];
  additionalNote?: string;
  isPlaceholder?: boolean;
}

export interface ContactFormData {
  fullName: string;
  companyName: string;
  phoneNumber: string;
  emailAddress: string;
  serviceRequired: string;
  message: string;
}

export type PostStatus = 'published' | 'draft' | 'scheduled' | 'unpublished';

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  source?: string;
  status: 'active' | 'unsubscribed';
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

export interface BlogPostSEO {
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  authorName: string;
  authorRole: string;
  coverImage: string;
  coverImageAlt?: string;
  publishedAt: string;
  updatedAt?: string;
  readTimeMinutes: number;
  status: PostStatus;
  scheduledDate?: string;
  featured?: boolean;
  seo: BlogPostSEO;
}

