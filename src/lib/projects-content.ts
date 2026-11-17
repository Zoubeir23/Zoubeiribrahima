import type { LandingLanguage } from "@/lib/landing-content";

interface ProjectContent {
  title: string;
  status: string;
  description: string;
  tags: string[];
  linkLabel: string;
  /** Repository the card links to. Without it, the card links to the GitHub profile. */
  repositoryUrl?: string;
}

export interface ProjectsContent {
  eyebrow: string;
  titleLead: string;
  titleHighlight: string;
  projects: ProjectContent[];
  githubAllProjects: string;
}

export const projectsContent: Record<LandingLanguage, ProjectsContent> = {
  fr: {
    eyebrow: "Portfolio",
    titleLead: "Mes",
    titleHighlight: "projets",
    projects: [
      {
        title: "Snapfolioo",
        status: "Open source",
        description:
          "Application SaaS open source pour créer et gérer des portfolios professionnels : éditeur visuel avec prévisualisation en temps réel, authentification sécurisée (e-mail et Google) et sauvegarde avec Supabase.",
        tags: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "Playwright"],
        linkLabel: "Voir le code sur GitHub",
        repositoryUrl: "https://github.com/Zoubeir23/SnapFolioo",
      },
      {
        title: "Smart-HR",
        status: "Bientôt disponible",
        description:
          "Système de gestion RH intelligent avec IA intégrée : recrutement automatisé, gestion des congés, paie et analytics avancés.",
        tags: ["Django", "React", "TypeScript", "PostgreSQL", "Docker"],
        linkLabel: "Voir le code sur GitHub",
        repositoryUrl: "https://github.com/Zoubeir23/Smart-HR",
      },
      {
        title: "Tchokos SARL — B2B",
        status: "En cours",
        description:
          "Plateforme e-commerce B2B sur mesure pour un grossiste mode à Douala. Catalogue centralisé, portail revendeurs, gestion des demandes d'importation et back-office admin.",
        tags: ["Django", "Python", "PostgreSQL", "TailwindCSS"],
        linkLabel: "Voir le profil",
      },
    ],
    githubAllProjects: "Voir tous mes projets sur GitHub",
  },
  en: {
    eyebrow: "Portfolio",
    titleLead: "My",
    titleHighlight: "projects",
    projects: [
      {
        title: "Snapfolioo",
        status: "Open source",
        description:
          "Open source SaaS application to create and manage professional portfolios: visual editor with real-time preview, secure sign-in (email and Google) and Supabase saving.",
        tags: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "Playwright"],
        linkLabel: "View the code on GitHub",
        repositoryUrl: "https://github.com/Zoubeir23/SnapFolioo",
      },
      {
        title: "Smart-HR",
        status: "Coming soon",
        description:
          "Intelligent HR management system with built-in AI: automated recruitment, leave management, payroll and advanced analytics.",
        tags: ["Django", "React", "TypeScript", "PostgreSQL", "Docker"],
        linkLabel: "View the code on GitHub",
        repositoryUrl: "https://github.com/Zoubeir23/Smart-HR",
      },
      {
        title: "Tchokos SARL — B2B",
        status: "In progress",
        description:
          "Custom B2B e-commerce platform for a fashion wholesaler in Douala. Central catalog, reseller portal, import request handling and admin back-office.",
        tags: ["Django", "Python", "PostgreSQL", "TailwindCSS"],
        linkLabel: "View profile",
      },
    ],
    githubAllProjects: "See all my projects on GitHub",
  },
};
