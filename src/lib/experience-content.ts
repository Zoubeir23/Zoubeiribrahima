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
        company: "Smart Group Sénégal",
        role: "Développeur web (stage)",
        period: "Oct. 2026 — Présent",
        location: "Dakar, Sénégal · Hybride",
        isCurrent: true,
        description: "Conception et réalisation de plateformes SaaS.",
        tags: [],
      },
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
        company: "Smart Group Sénégal",
        role: "Web developer (internship)",
        period: "Oct 2026 — Present",
        location: "Dakar, Senegal · Hybrid",
        isCurrent: true,
        description: "Designing and building SaaS platforms.",
        tags: [],
      },
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
