// Brand logos shown on the resource cards and guide pages, to tell at a glance which tool a guide is about.
// SVG files come from the open svgl.app library (public/logos/brands). The logos belong to their owners and
// only identify the tool a guide describes. This module stays free of Vite-only APIs: the catalog imports it.

export type ResourceBrand = "claude" | "antigravity" | "google" | "cloudflare" | "vercel" | "nextjs";

export interface ResourceBrandLogo {
  label: string;
  path: string;
}

export const resourceBrandLogos: Readonly<Record<ResourceBrand, ResourceBrandLogo>> = {
  claude: { label: "Claude", path: "/logos/brands/claude.svg" },
  antigravity: { label: "Google Antigravity", path: "/logos/brands/antigravity.svg" },
  google: { label: "Google", path: "/logos/brands/google.svg" },
  cloudflare: { label: "Cloudflare", path: "/logos/brands/cloudflare.svg" },
  vercel: { label: "Vercel", path: "/logos/brands/vercel.svg" },
  nextjs: { label: "Next.js", path: "/logos/brands/nextjs.svg" },
};
