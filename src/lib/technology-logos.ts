const LOGO_DIRECTORY = "/logos/technologies";

const logoPath = (fileName: string) => `${LOGO_DIRECTORY}/${fileName}.svg`;

// Keys are lowercase display names (and common variants) as written in the site content.
export const TECHNOLOGY_LOGO_PATHS: Record<string, string> = {
  react: logoPath("react"),
  "react 18": logoPath("react"),
  "react.js": logoPath("react"),
  "react native": logoPath("react"),
  typescript: logoPath("typescript"),
  javascript: logoPath("javascript"),
  vite: logoPath("vite"),
  "tailwind css": logoPath("tailwind-css"),
  tailwindcss: logoPath("tailwind-css"),
  playwright: logoPath("playwright"),
  django: logoPath("django"),
  python: logoPath("python"),
  laravel: logoPath("laravel"),
  php: logoPath("php"),
  java: logoPath("java"),
  "node.js": logoPath("nodejs"),
  postgresql: logoPath("postgresql"),
  mysql: logoPath("mysql"),
  supabase: logoPath("supabase"),
  vercel: logoPath("vercel"),
  docker: logoPath("docker"),
  flutter: logoPath("flutter"),
  dart: logoPath("dart"),
  git: logoPath("git"),
  github: logoPath("github"),
  "claude code": logoPath("claude"),
  "vs code": logoPath("visual-studio-code"),
  "visual studio code": logoPath("visual-studio-code"),
  warp: logoPath("warp"),
};

export const getTechnologyLogo = (technologyName: string): string | null =>
  TECHNOLOGY_LOGO_PATHS[technologyName.trim().toLowerCase()] ?? null;
