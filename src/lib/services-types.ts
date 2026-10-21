import type { ServiceSlug } from "@/lib/service-meta";

export interface ServiceOffering {
  emoji: string;
  tabLabel: string;
  headline: string;
  tagline: string;
  description: string;
  chips: string[];
  quoteMessage: string;
}

export interface ServiceDetail {
  title: string;
  /** Full <title> of the service page, naming the offer and its location. */
  metaTitle: string;
  /** Meta description of the service page, 110 to 160 characters. */
  metaDescription: string;
  summary: string;
  badge: string;
  offerings: ServiceOffering[];
  technologies: string[];
}

export type ServiceDetails = Record<ServiceSlug, ServiceDetail>;
