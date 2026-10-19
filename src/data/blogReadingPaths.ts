import type { BlogPost } from "@/data/blogPosts";

export interface BlogReadingPath {
  identifier: string;
  title: string;
  description: string;
  articleSlugs: readonly string[];
}

export const blogReadingPaths: readonly BlogReadingPath[] = [
  {
    identifier: "launch-a-saas",
    title: "Lancer un SaaS",
    description: "De la validation de l'idée au premier lancement : les quatre étapes dans l'ordre.",
    articleSlugs: [
      "valider-une-idee-saas-en-30-jours",
      "choisir-la-stack-technique-d-un-saas",
      "fixer-le-prix-de-son-saas",
      "lancer-le-mvp-d-un-saas-checklist",
    ],
  },
  {
    identifier: "developer-foundations",
    title: "Bases du développeur",
    description: "Versionner, structurer une page et écrire du Python propre avant de construire un produit.",
    articleSlugs: [
      "git-github-de-zero-a-heros-guide-complet",
      "html-css-de-zero-a-heros-guide-complet",
      "python-de-zero-a-heros-guide-complet",
      "apprendre-django-guide-complet-developpeur",
    ],
  },
  {
    identifier: "work-with-ai-agents",
    title: "Travailler avec des agents IA",
    description: "Comprendre le paysage, installer Claude Code et garder la main sur le code produit.",
    articleSlugs: [
      "agents-ia-claude-code-openclaw-tendances-2026",
      "installer-claude-code-guide-2026",
      "vibe-coding-et-claude-code-en-2026",
    ],
  },
];

export const resolveReadingPathPosts = (readingPath: BlogReadingPath, posts: readonly BlogPost[]): BlogPost[] =>
  readingPath.articleSlugs.flatMap((slug) => {
    const matchingPost = posts.find((post) => post.slug === slug);
    return matchingPost ? [matchingPost] : [];
  });
