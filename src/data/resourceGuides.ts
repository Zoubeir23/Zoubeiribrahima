// Public resource library at /ressources. Titles and summaries are public and indexable; the guide text
// itself is loaded only once a visitor has left a first name and an email (see ResourceGuidePage).
// The text is never part of the prerendered HTML: it lives in src/data/resources/<slug>.md, loaded on demand by
// resourceGuideText.ts. This module stays free of Vite-only APIs: the serverless function imports it too.

export type ResourceGuideCategory = "audit" | "productivity" | "design" | "research";

export interface ResourceGuide {
  slug: string;
  title: string;
  summary: string;
  category: ResourceGuideCategory;
  /** Who publishes the tool the guide is about. */
  toolAuthor: string;
  /** SPDX identifier of the tool's license, or null when its repository states none. */
  toolLicense: string | null;
  sourceUrl: string;
  updatedIsoDate: string;
}

export const resourceGuideCategoryLabels: Record<ResourceGuideCategory, string> = {
  audit: "Audit",
  productivity: "Productivité",
  design: "Design",
  research: "Recherche",
};

export const resourceGuides: readonly ResourceGuide[] = [
  {
    slug: "claude-seo-audit-de-site",
    title: "Claude SEO : auditer le référencement de ton site",
    summary: "Un plugin libre qui passe ton site au crible et te rend une liste d'actions SEO classées par priorité.",
    category: "audit",
    toolAuthor: "Agrici Daniel",
    toolLicense: "MIT",
    sourceUrl: "https://github.com/AgriciDaniel/claude-seo",
    updatedIsoDate: "2026-11-10",
  },
  {
    slug: "audit-de-securite-cloudflare",
    title: "Audit de sécurité : le skill de Cloudflare",
    summary: "Fais chercher les failles de ton application par des agents qui se contre-vérifient, avec un rapport clair.",
    category: "audit",
    toolAuthor: "Cloudflare",
    toolLicense: "MIT",
    sourceUrl: "https://github.com/cloudflare/security-audit-skill",
    updatedIsoDate: "2026-11-10",
  },
  {
    slug: "prompt-performance-application-web",
    title: "Le prompt qui accélère une application codée avec l'IA",
    summary: "Une liste de contrôle de 30 points que Claude Code vérifie sur ton projet avant de corriger ce que tu valides.",
    category: "audit",
    toolAuthor: "Zoubeir Ibrahima",
    toolLicense: null,
    sourceUrl: "https://web.dev/learn/performance",
    updatedIsoDate: "2026-11-10",
  },
  {
    slug: "sous-agents-claude-code-economiser-sa-limite",
    title: "Sous-agents Claude Code : trois réglages pour économiser ta limite",
    summary: "Les réglages de la documentation officielle, et un prompt qui les applique à tes sous-agents après ta validation.",
    category: "productivity",
    toolAuthor: "Anthropic (documentation)",
    toolLicense: null,
    sourceUrl: "https://code.claude.com/docs/en/sub-agents",
    updatedIsoDate: "2026-11-10",
  },
  {
    slug: "limite-skill-haiku",
    title: "Limite : confier le travail facile à Haiku",
    summary: "Un skill qui installe deux sous-agents légers et garde ton modèle principal pour ce qui compte.",
    category: "productivity",
    toolAuthor: "Melvynx",
    toolLicense: null,
    sourceUrl: "https://github.com/Melvynx/shared-skills/tree/main/skills/limite",
    updatedIsoDate: "2026-11-10",
  },
  {
    slug: "find-skills-trouver-des-skills",
    title: "Find Skills : laisse Claude trouver les bons skills",
    summary: "Décris ton besoin, Claude cherche dans les skills publics et t'aide à vérifier avant d'installer.",
    category: "productivity",
    toolAuthor: "Vercel Labs",
    toolLicense: "MIT",
    sourceUrl: "https://github.com/vercel-labs/skills",
    updatedIsoDate: "2026-11-10",
  },
  {
    slug: "anti-vibecode-signes-d-un-site-genere",
    title: "Anti-vibecode : les signes d'un site fait par l'IA",
    summary: "Un skill qui repère les réflexes visuels des sites générés et t'aide à les remplacer par de vrais choix.",
    category: "design",
    toolAuthor: "Melvynx",
    toolLicense: null,
    sourceUrl: "https://github.com/Melvynx/shared-skills/tree/main/skills/anti-vibecode",
    updatedIsoDate: "2026-11-10",
  },
  {
    slug: "cloner-un-site-avec-claude-code",
    title: "Reconstruire un site en Next.js avec Claude Code",
    summary: "Un gabarit qui recrée un site en composants modifiables, pour migrer le tien ou comprendre une mise en page.",
    category: "design",
    toolAuthor: "JCodesMore",
    toolLicense: "MIT",
    sourceUrl: "https://github.com/JCodesMore/ai-website-cloner-template",
    updatedIsoDate: "2026-11-10",
  },
  {
    slug: "agent-reach-lecture-multi-plateformes",
    title: "Agent Reach : ton agent lit 14 plateformes",
    summary: "Une commande pour que ton agent cherche et lise GitHub, le web, Reddit, YouTube et d'autres.",
    category: "research",
    toolAuthor: "Panniantong",
    toolLicense: "MIT",
    sourceUrl: "https://github.com/Panniantong/Agent-Reach",
    updatedIsoDate: "2026-11-10",
  },
  {
    slug: "rea-retro-ingenierie",
    title: "REA : comprendre comment une application est construite",
    summary: "Un serveur MCP de rétro-ingénierie qui apporte les preuves pour que tu codes ta propre version.",
    category: "research",
    toolAuthor: "morluto",
    toolLicense: "MIT",
    sourceUrl: "https://github.com/morluto/rea",
    updatedIsoDate: "2026-11-10",
  },
];

export function findResourceGuide(slug: string | undefined): ResourceGuide | undefined {
  return resourceGuides.find((guide) => guide.slug === slug);
}

export function listResourceGuideRoutes(): string[] {
  return resourceGuides.map((guide) => `/ressources/${guide.slug}`);
}

export function listResourceGuideSlugs(): ReadonlySet<string> {
  return new Set(resourceGuides.map((guide) => guide.slug));
}
