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
  saas: { emoji: "🚀", illustrationPath: "/services/saas.png" },
  "web-applications": { emoji: "🌐", illustrationPath: "/services/web-applications.png" },
  "mobile-applications": { emoji: "📱", illustrationPath: "/services/mobile-applications.png" },
  "portfolio-websites": { emoji: "🎨", illustrationPath: "/services/portfolio-websites.png" },
  "remote-it-services": { emoji: "🛠️", illustrationPath: "/services/remote-it-services.png" },
};

export const isServiceSlug = (candidate: string | undefined): candidate is ServiceSlug =>
  serviceSlugs.some((slug) => slug === candidate);
