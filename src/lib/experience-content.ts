import type { LandingLanguage } from "@/lib/landing-content";

interface ExperienceItemContent {
  company: string;
  role: string;
  period: string;
  location: string;
  isCurrent: boolean;
  description: string;
  tags: string[];
}

interface EducationItemContent {
  degree: string;
  school: string;
  period: string;
}

interface LanguageLevelContent {
  name: string;
  level: string;
  percentage: number;
}

export interface ExperienceContent {
  eyebrow: string;
  titleLead: string;
  titleHighlight: string;
  portraitAlt: string;
  professionalLabel: string;
  educationLabel: string;
  languagesLabel: string;
  experiences: ExperienceItemContent[];
  education: EducationItemContent[];
  languages: LanguageLevelContent[];
}

export const experienceContent: Record<LandingLanguage, ExperienceContent> = {
  fr: {
    eyebrow: "Parcours",
    titleLead: "Expériences et",
    titleHighlight: "formation",
    portraitAlt: "Portrait de Zoubeir",
    professionalLabel: "Expérience professionnelle",
    educationLabel: "Formation académique",
    languagesLabel: "Langues",
    experiences: [
      {
        company: "HooYia",
        role: "Stagiaire développeur backend (CDD)",
        period: "Févr. 2026 — Avr. 2026 · 3 mois",
        location: "Cameroun · À distance",
        isCurrent: false,
        description:
          "Participation au développement et à la maintenance des applications backend. Conception et optimisation d'API et de bases de données. Collaboration avec l'équipe technique pour la mise en œuvre de nouvelles fonctionnalités, dans le respect des bonnes pratiques de développement. Contribution à l'amélioration des performances et de la sécurité des systèmes.",
        tags: ["Architecture backend", "APIs REST", "Bases de données", "Optimisation", "Déploiement"],
      },
      {
        company: "Snapfolioo",
        role: "Fondateur et développeur principal",
        period: "Janv. 2026 — Présent",
        location: "Dakar, Sénégal",
        isCurrent: true,
        description:
          "Conception et développement d'une plateforme SaaS permettant de créer portfolios, CV et bannières LinkedIn. Développement de +18 templates professionnels responsive avec éditeur visuel en temps réel. Authentification sécurisée (Google OAuth, Row Level Security). Architecture scalable avec auto-sauvegarde, gestion multi-projets et export HTML, PDF et PNG.",
        tags: ["React 18", "TypeScript", "Vite", "Supabase", "TailwindCSS", "Vercel"],
      },
    ],
    education: [
      {
        degree: "Licence IAGE",
        school: "ISI — Institut Supérieur d'Informatique, Dakar",
        period: "2023 — 2026 (en cours)",
      },
      {
        degree: "BTS Informatique de Gestion",
        school: "ISI, Dakar, Sénégal",
        period: "2023 — 2025",
      },
      {
        degree: "Baccalauréat Série C",
        school: "École Communautaire Arabo-Islamique, Mitsoudjé, Comores",
        period: "2023",
      },
    ],
    languages: [
      { name: "Français", level: "Natif", percentage: 100 },
      { name: "Anglais", level: "Technique", percentage: 30 },
      { name: "Arabe", level: "Lecture et écriture", percentage: 50 },
    ],
  },
  en: {
    eyebrow: "Background",
    titleLead: "Experience and",
    titleHighlight: "education",
    portraitAlt: "Portrait of Zoubeir",
    professionalLabel: "Professional experience",
    educationLabel: "Education",
    languagesLabel: "Languages",
    experiences: [
      {
        company: "HooYia",
        role: "Backend developer intern (fixed-term)",
        period: "Feb 2026 — Apr 2026 · 3 months",
        location: "Cameroon · Remote",
        isCurrent: false,
        description:
          "Contributing to the development and maintenance of backend applications. Designing and optimizing APIs and databases. Working with the technical team to deliver new features while following development best practices. Helping improve system performance and security.",
        tags: ["Backend architecture", "REST APIs", "Databases", "Optimization", "Deployment"],
      },
      {
        company: "Snapfolioo",
        role: "Founder and lead developer",
        period: "Jan 2026 — Present",
        location: "Dakar, Senegal",
        isCurrent: true,
        description:
          "Designed and built a SaaS platform for creating portfolios, resumes and LinkedIn banners. Built 18+ responsive professional templates with a real-time visual editor. Secure authentication (Google OAuth, Row Level Security). Scalable architecture with auto-save, multi-project management and HTML, PDF and PNG export.",
        tags: ["React 18", "TypeScript", "Vite", "Supabase", "TailwindCSS", "Vercel"],
      },
    ],
    education: [
      {
        degree: "Licence IAGE",
        school: "ISI — Institut Supérieur d'Informatique, Dakar",
        period: "2023 — 2026 (ongoing)",
      },
      {
        degree: "BTS Informatique de Gestion",
        school: "ISI, Dakar, Senegal",
        period: "2023 — 2025",
      },
      {
        degree: "Baccalauréat Série C",
        school: "École Communautaire Arabo-Islamique, Mitsoudjé, Comoros",
        period: "2023",
      },
    ],
    languages: [
      { name: "French", level: "Native", percentage: 100 },
      { name: "English", level: "Technical", percentage: 30 },
      { name: "Arabic", level: "Reading and writing", percentage: 50 },
    ],
  },
};
