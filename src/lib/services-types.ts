import type { ServiceSlug } from "@/lib/service-meta";

export interface ServiceOffering {
  tabLabel: string;
  headline: string;
  tagline: string;
  description: string;
  chips: string[];
  quoteMessage: string;
}

export interface ServiceDetail {
  title: string;
  summary: string;
  badge: string;
  offerings: ServiceOffering[];
  technologies: string[];
}

export type ServiceDetails = Record<ServiceSlug, ServiceDetail>;
