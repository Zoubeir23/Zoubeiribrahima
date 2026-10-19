import type { LandingLanguage } from "@/lib/landing-content";

interface SkillCardContent {
  title: string;
  techs: string[];
}

export interface SkillsContent {
  eyebrow: string;
  titleLead: string;
  titleHighlight: string;
  cards: SkillCardContent[];
  domainsLabel: string;
  domains: string[];
}

export const skillsContent: Record<LandingLanguage, SkillsContent> = {
  fr: {
    eyebrow: "Technologies",
    titleLead: "Ma stack",
    titleHighlight: "technique",
    cards: [
      {
        title: "Architecture backend",
        techs: ["Architecture backend", "API REST", "Modélisation de données", "Intégration de services"],
      },
      {
        title: "IA et automatisation",
        techs: ["Automatisation intelligente", "Conception de prompts", "Intégration IA", "Analyse de données"],
      },
      {
        title: "DevOps et cloud",
        techs: ["Conteneurisation", "Déploiement continu", "Versioning", "Supervision"],
      },
    ],
    domainsLabel: "Domaines maîtrisés",
    domains: ["Backend", "APIs", "Data", "Frontend", "Automatisation", "DevOps", "Architecture", "Qualité", "Sécurité", "Scalabilité"],
  },
  en: {
    eyebrow: "Technologies",
    titleLead: "My tech",
    titleHighlight: "stack",
    cards: [
      {
        title: "Backend architecture",
        techs: ["Backend architecture", "REST APIs", "Data modeling", "Service integration"],
      },
      {
        title: "AI and automation",
        techs: ["Intelligent automation", "Prompt design", "AI integration", "Data analysis"],
      },
      {
        title: "DevOps and cloud",
        techs: ["Containerization", "Continuous deployment", "Version control", "Monitoring"],
      },
    ],
    domainsLabel: "Areas of expertise",
    domains: ["Backend", "APIs", "Data", "Frontend", "Automation", "DevOps", "Architecture", "Quality", "Security", "Scalability"],
  },
};
