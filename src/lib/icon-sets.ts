import type { ServiceSlug } from "@/lib/service-meta";

export const FAQ_EMOJIS = ["💬", "⏱️", "🌍", "🧾", "🛟"] as const;
export const PROCESS_EMOJIS = ["📝", "🧾", "🚀"] as const;
export const REASON_EMOJIS = ["⚡", "🎯", "🌍", "✅"] as const;
export const SKILL_CARD_EMOJIS = ["🏗️", "🤖", "☁️"] as const;
export const DOMAIN_EMOJIS = ["🧱", "🔌", "📊", "🎨", "⚙️", "🚀", "📐", "✅", "🔒", "📈"] as const;

// One list per offering, one emoji per chip, in the same order as the service content.
export const OFFERING_CHIP_EMOJIS: Record<ServiceSlug, readonly (readonly string[])[]> = {
  saas: [
    ["📝", "🔑", "👥", "🛡️"],
    ["🗂️", "🧾", "👥", "📈"],
    ["📊", "🔎", "📤", "✨"],
  ],
  "web-applications": [
    ["🔍", "🎨", "🗄️", "🔧"],
    ["🔌", "🧩", "🤖", "📚"],
    ["⚡", "🗃️", "♿", "✅"],
  ],
  "mobile-applications": [
    ["🧭", "📱", "👆", "🖼️"],
    ["👤", "🔔", "🔄", "🔌"],
    ["🧪", "🐛", "📦", "📡"],
  ],
  "portfolio-websites": [
    ["🧭", "🏅", "🎨", "✉️"],
    ["🛍️", "📞", "📲", "⚡"],
    ["🏷️", "⚡", "♿", "🧱"],
  ],
  "remote-it-services": [
    ["🩺", "🔧", "🌐", "💡"],
    ["⬆️", "✔️", "📈", "💾"],
    ["💬", "🧰", "🎓", "📈"],
  ],
};

export const TECHNOLOGY_FALLBACK_EMOJI = "🧩";

const TECHNOLOGY_EMOJIS: Record<string, string> = {
  react: "⚛️",
  "react 18": "⚛️",
  "react native": "📱",
  typescript: "🔷",
  django: "🎸",
  python: "🐍",
  postgresql: "🐘",
  supabase: "⚡",
  vercel: "▲",
  vite: "⚡",
  "tailwind css": "🌬️",
  tailwindcss: "🌬️",
  docker: "🐳",
  playwright: "🎭",
  flutter: "🦋",
  dart: "🎯",
  "api rest": "🔌",
  "rest api": "🔌",
  "apis rest": "🔌",
  "rest apis": "🔌",
  notifications: "🔔",
  seo: "🔎",
  diagnostic: "🩺",
  diagnosis: "🩺",
  maintenance: "🛠️",
  sécurité: "🔒",
  security: "🔒",
  sauvegardes: "💾",
  backups: "💾",
  "architecture backend": "🏗️",
  "backend architecture": "🏗️",
  "bases de données": "🗄️",
  databases: "🗄️",
  optimisation: "🚀",
  optimization: "🚀",
  déploiement: "📦",
  deployment: "📦",
};

export const getTechnologyEmoji = (technologyName: string): string =>
  TECHNOLOGY_EMOJIS[technologyName.trim().toLowerCase()] ?? TECHNOLOGY_FALLBACK_EMOJI;
