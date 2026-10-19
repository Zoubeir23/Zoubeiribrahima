export const NAV_EMOJIS: Record<string, string> = {
  "#hero": "🏠",
  "#services": "🛠️",
  "#skills": "⚙️",
  "#projects": "🚀",
  "#experience": "🎓",
  "#certifications": "🏆",
  "#contact": "✉️",
};

export const BLOG_EMOJI = "📖";
export const HIRE_EMOJI = "🚀";

export const SOCIAL_PROFILES = {
  github: "https://github.com/Zoubeir23",
  linkedin: "https://linkedin.com/in/zoubeir-ibrahima",
} as const;

export type NavLabelKey =
  | "home"
  | "services"
  | "stack"
  | "projects"
  | "experience"
  | "certifications"
  | "contact"
  | "blog";

export interface NavItem {
  path: string;
  labelKey: NavLabelKey;
  emoji: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { path: "/", labelKey: "home", emoji: "🏠" },
  { path: "/services", labelKey: "services", emoji: "🛠️" },
  { path: "/skills", labelKey: "stack", emoji: "⚙️" },
  { path: "/projects", labelKey: "projects", emoji: "🚀" },
  { path: "/experience", labelKey: "experience", emoji: "🎓" },
  { path: "/certifications", labelKey: "certifications", emoji: "🏆" },
  { path: "/contact", labelKey: "contact", emoji: "✉️" },
  { path: "/blog", labelKey: "blog", emoji: "📖" },
];

export const isNavItemActive = (item: NavItem, pathname: string): boolean =>
  item.path === "/" ? pathname === "/" : pathname === item.path || pathname.startsWith(`${item.path}/`);

// Old single-page anchors, sent to the dedicated page that now hosts the section.
const LEGACY_HASH_PATHS: Record<string, string> = {
  "#services": "/services",
  "#skills": "/skills",
  "#projects": "/projects",
  "#experience": "/experience",
  "#certifications": "/certifications",
  "#contact": "/contact",
  "#faq": "/faq",
  "#process": "/services",
  "#why-me": "/services",
};

export const resolveLegacyHashPath = (hash: string): string | null => LEGACY_HASH_PATHS[hash] ?? null;
