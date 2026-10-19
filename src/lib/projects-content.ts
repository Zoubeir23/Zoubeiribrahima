import type { LandingLanguage } from "@/lib/landing-content";

interface ProjectContent {
  title: string;
  status: string;
  description: string;
  tags: string[];
  linkLabel: string;
}

interface ProjectStatContent {
  value: string;
  label: string;
}

export interface ProjectsContent {
  eyebrow: string;
  titleLead: string;
  titleHighlight: string;
  featuredBadge: string;
  featuredStats: ProjectStatContent[];
  architectureLabel: string;
  architectureText: string;
  featured: ProjectContent;
  others: ProjectContent[];
  githubAllProjects: string;
}

export const projectsContent: Record<LandingLanguage, ProjectsContent> = {
  fr: {
    eyebrow: "Portfolio",
    titleLead: "Mes",
    titleHighlight: "projets",
    featuredBadge: "Projet vedette",
    featuredStats: [
      { value: "SaaS", label: "Produit lancé" },
      { value: "18+", label: "Templates" },
      { value: "Jan 2026", label: "Depuis" },
      { value: "Vercel", label: "Déploiement" },
    ],
    architectureLabel: "Architecture",
    architectureText:
      "Frontend React 18 + TypeScript + Vite · Styling Tailwind CSS · Backend Supabase (PostgreSQL + Auth) · Tests Playwright · Déployé sur Vercel",
    featured: {
      title: "Snapfolioo",
      status: "En production",
      description:
        "Plateforme SaaS no-code permettant aux professionnels de créer des portfolios, CV et bannières LinkedIn en quelques minutes. Éditeur visuel en temps réel, +18 templates, sauvegarde cloud Supabase et publication instantanée.",
      tags: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "Vercel", "Playwright"],
      linkLabel: "Explorer le projet",
    },
    others: [
      {
        title: "Smart-HR",
        status: "Bientôt disponible",
        description:
          "Système de gestion RH intelligent avec IA intégrée : recrutement automatisé, gestion des congés, paie et analytics avancés.",
        tags: ["Django", "React", "TypeScript", "PostgreSQL", "Docker"],
        linkLabel: "Voir le profil",
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
    featuredBadge: "Featured project",
    featuredStats: [
      { value: "SaaS", label: "Product launched" },
      { value: "18+", label: "Templates" },
      { value: "Jan 2026", label: "Since" },
      { value: "Vercel", label: "Deployment" },
    ],
    architectureLabel: "Architecture",
    architectureText:
      "Frontend React 18 + TypeScript + Vite · Styling Tailwind CSS · Backend Supabase (PostgreSQL + Auth) · Playwright tests · Deployed on Vercel",
    featured: {
      title: "Snapfolioo",
      status: "In production",
      description:
        "No-code SaaS platform that lets professionals create portfolios, resumes and LinkedIn banners in minutes. Real-time visual editor, 18+ templates, Supabase cloud saving and instant publishing.",
      tags: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "Vercel", "Playwright"],
      linkLabel: "Explore the project",
    },
    others: [
      {
        title: "Smart-HR",
        status: "Coming soon",
        description:
          "Intelligent HR management system with built-in AI: automated recruitment, leave management, payroll and advanced analytics.",
        tags: ["Django", "React", "TypeScript", "PostgreSQL", "Docker"],
        linkLabel: "View profile",
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
