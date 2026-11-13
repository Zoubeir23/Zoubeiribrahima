// Public resource library at /ressources. Titles and summaries are public and indexable; the guide text
// itself is loaded only once a visitor has left a first name and an email (see ResourceGuidePage).
// The text is never part of the prerendered HTML: it lives in src/data/resources/<slug>.md, loaded on demand by
// resourceGuideText.ts. This module stays free of Vite-only APIs: the serverless function imports it too.

import type { ResourceBrand } from "./resourceBrandLogos.js";

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
  /** Brands whose logos illustrate the guide (one or two). */
  brands: readonly ResourceBrand[];
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
    brands: ["claude", "github"],
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
    brands: ["claude", "cloudflare", "github"],
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
    brands: ["claude"],
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
    brands: ["claude"],
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
    brands: ["claude", "github"],
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
    brands: ["claude", "vercel", "github"],
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
    brands: ["claude", "github"],
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
    brands: ["claude", "nextjs", "github"],
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
    brands: ["claude", "github", "reddit", "youtube", "linkedin", "instagram", "facebook"],
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
    brands: ["claude", "github"],
    updatedIsoDate: "2026-11-10",
  },
  {
    slug: "brancher-google-search-console-a-claude-code",
    title: "Brancher Google Search Console à Claude Code",
    summary: "Un serveur MCP gratuit pour interroger tes clics, tes requêtes et l'indexation de tes pages en langage normal, et un skill qui l'installe pour toi.",
    category: "audit",
    toolAuthor: "Amin Foroutan (serveur) et Zoubeir Ibrahima (guide et skill)",
    toolLicense: "MIT",
    sourceUrl: "https://github.com/AminForou/mcp-gsc",
    brands: ["claude", "google", "github"],
    updatedIsoDate: "2026-11-10",
  },
  {
    slug: "equipe-seo-32-agents-claude-code",
    title: "Une équipe de 32 agents SEO pour Claude Code",
    summary: "Un directeur et sept pôles d'agents qui auditent, rédigent, relient tes pages et mesurent, à partir de tes vraies données Search Console.",
    category: "audit",
    toolAuthor: "Zoubeir Ibrahima",
    toolLicense: "MIT",
    sourceUrl: "https://github.com/Zoubeir23/claude-code-kit/tree/main/seo",
    brands: ["claude", "google", "github"],
    updatedIsoDate: "2026-11-10",
  },
  {
    slug: "orchestrer-claude-code-et-antigravity",
    title: "Orchestrer Claude Code et Antigravity",
    summary: "Délègue la relecture, l'exécution et le travail en parallèle à Antigravity CLI quand ton quota baisse, avec un protocole de validation.",
    category: "productivity",
    toolAuthor: "Zoubeir Ibrahima",
    toolLicense: "MIT",
    sourceUrl: "https://github.com/Zoubeir23/claude-code-kit/tree/main/orchestrator",
    brands: ["claude", "antigravity", "gemini", "bun", "github"],
    updatedIsoDate: "2026-11-10",
  },
  {
    slug: "socle-claude-code-claude-md-regles-agents-de-revue",
    title: "Le socle Claude Code : CLAUDE.md, règles et agents de revue",
    summary: "Un modèle de CLAUDE.md, des règles pour 11 langages et 18 agents qui relisent ton code, adaptés du projet ECC.",
    category: "productivity",
    toolAuthor: "Zoubeir Ibrahima (adapté d'ECC, Affaan Mustafa)",
    toolLicense: "MIT",
    sourceUrl: "https://github.com/Zoubeir23/claude-code-kit/tree/main/config",
    brands: ["claude", "python", "typescript", "github"],
    updatedIsoDate: "2026-11-10",
  },
  {
    slug: "crawl4ai-lire-le-web-pour-ton-agent",
    title: "Crawl4AI : transforme n'importe quelle page web en texte propre pour ton IA",
    summary: "Une bibliothèque libre qui lit les sites, même ceux en JavaScript, et rend du Markdown propre ou des données structurées. À brancher à Claude Code.",
    category: "research",
    toolAuthor: "UncleCode",
    toolLicense: "Apache-2.0",
    sourceUrl: "https://github.com/unclecode/crawl4ai",
    brands: ["claude", "python", "github"],
    updatedIsoDate: "2026-11-12",
  },
  {
    slug: "react-bits-composants-animes-react",
    title: "React Bits : plus de 215 composants animés prêts à copier",
    summary: "Une bibliothèque gratuite d'effets de texte, de fonds animés et de cartes pour React, qu'on installe en une commande ou qu'on demande à Claude Code.",
    category: "design",
    toolAuthor: "David Haz",
    toolLicense: "MIT + Commons Clause",
    sourceUrl: "https://github.com/DavidHDev/react-bits",
    brands: ["claude", "typescript", "github"],
  },
  {
    slug: "opengym-suivi-musculation-auto-heberge-claude",
    title: "openGym : un suivi de musculation à toi, que Claude peut interroger",
    summary: "Une application libre et sans abonnement, à héberger chez toi, avec un serveur MCP pour poser des questions à Claude sur tes séances et les lui dicter.",
    category: "productivity",
    toolAuthor: "Duarte Santos",
    toolLicense: "AGPL-3.0",
    sourceUrl: "https://github.com/DuarteSantos8/openGym",
    brands: ["claude", "github"],
    updatedIsoDate: "2026-11-13",
  },
  {
    slug: "moneyprinterturbo-generer-des-videos-courtes-ia",
    title: "MoneyPrinterTurbo : générer une vidéo courte à partir d'un sujet",
    summary: "Donne un sujet, l'outil écrit le script, choisit les images, ajoute voix, sous-titres et musique, puis exporte la vidéo. Libre et gratuit à installer.",
    category: "productivity",
    toolAuthor: "harry0703",
    toolLicense: "MIT",
    sourceUrl: "https://github.com/harry0703/MoneyPrinterTurbo",
    brands: ["claude", "python", "github"],
    updatedIsoDate: "2026-11-13",
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
