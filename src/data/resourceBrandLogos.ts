// Brand logos shown on the resource cards and guide pages, to tell at a glance which tool a guide is about.
// SVG files come from the open svgl.app library (public/logos/brands). The logos belong to their owners and
// only identify the tool a guide describes. This module stays free of Vite-only APIs: the catalog imports it.

export type ResourceBrand =
  | "claude"
  | "antigravity"
  | "gemini"
  | "google"
  | "cloudflare"
  | "vercel"
  | "nextjs"
  | "github"
  | "bun"
  | "python"
  | "typescript"
  | "reddit"
  | "youtube"
  | "linkedin"
  | "instagram"
  | "facebook";

export interface ResourceBrandLogo {
  label: string;
  path: string;
}

export const resourceBrandLogos: Readonly<Record<ResourceBrand, ResourceBrandLogo>> = {
  claude: { label: "Claude", path: "/logos/brands/claude.svg" },
  antigravity: { label: "Google Antigravity", path: "/logos/brands/antigravity.svg" },
  gemini: { label: "Gemini", path: "/logos/brands/gemini.svg" },
  google: { label: "Google", path: "/logos/brands/google.svg" },
  cloudflare: { label: "Cloudflare", path: "/logos/brands/cloudflare.svg" },
  vercel: { label: "Vercel", path: "/logos/brands/vercel.svg" },
  nextjs: { label: "Next.js", path: "/logos/brands/nextjs.svg" },
  github: { label: "GitHub", path: "/logos/brands/github.svg" },
  bun: { label: "Bun", path: "/logos/brands/bun.svg" },
  python: { label: "Python", path: "/logos/brands/python.svg" },
  typescript: { label: "TypeScript", path: "/logos/brands/typescript.svg" },
  reddit: { label: "Reddit", path: "/logos/brands/reddit.svg" },
  youtube: { label: "YouTube", path: "/logos/brands/youtube.svg" },
  linkedin: { label: "LinkedIn", path: "/logos/brands/linkedin.svg" },
  instagram: { label: "Instagram", path: "/logos/brands/instagram.svg" },
  facebook: { label: "Facebook", path: "/logos/brands/facebook.svg" },
};
