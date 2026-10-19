export const serviceSlugs = [
  "saas",
  "web-applications",
  "mobile-applications",
  "portfolio-websites",
  "remote-it-services",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

interface ServiceMeta {
  emoji: string;
  illustrationPath: string;
}

export const serviceMeta: Record<ServiceSlug, ServiceMeta> = {
  saas: { emoji: "🚀", illustrationPath: "/services/saas.webp" },
  "web-applications": { emoji: "🌐", illustrationPath: "/services/web-applications.webp" },
  "mobile-applications": { emoji: "📱", illustrationPath: "/services/mobile-applications.webp" },
  "portfolio-websites": { emoji: "🎨", illustrationPath: "/services/portfolio-websites.webp" },
  "remote-it-services": { emoji: "🛠️", illustrationPath: "/services/remote-it-services.webp" },
};

export const isServiceSlug = (candidate: string | undefined): candidate is ServiceSlug =>
  serviceSlugs.some((slug) => slug === candidate);
