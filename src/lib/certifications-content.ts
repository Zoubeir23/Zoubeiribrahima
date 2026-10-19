import type { LandingLanguage } from "@/lib/landing-content";

interface CounterContent {
  value: string;
  label: string;
}

export interface CertificationsContent {
  eyebrow: string;
  titleLead: string;
  titleHighlight: string;
  viewCredentialLabel: string;
  categoryLabels: {
    program: string;
    certification: string;
  };
  obtainedLabel: string;
  issuersLabel: string;
  continuousLearning: CounterContent;
  listEyebrow: string;
  listTitle: string;
}

export const certificationsContent: Record<LandingLanguage, CertificationsContent> = {
  fr: {
    eyebrow: "Reconnaissances",
    titleLead: "Mes",
    titleHighlight: "certifications",
    viewCredentialLabel: "Voir le diplôme",
    categoryLabels: {
      program: "Programme",
      certification: "Certification",
    },
    obtainedLabel: "Certifications obtenues",
    issuersLabel: "Organismes reconnus",
    continuousLearning: { value: "2+", label: "Années de formation continue" },
    listEyebrow: "Liste complète",
    listTitle: "Toutes mes certifications",
  },
  en: {
    eyebrow: "Recognition",
    titleLead: "My",
    titleHighlight: "certifications",
    viewCredentialLabel: "View credential",
    categoryLabels: {
      program: "Program",
      certification: "Certification",
    },
    obtainedLabel: "Certifications earned",
    issuersLabel: "Recognized issuers",
    continuousLearning: { value: "2+", label: "Years of continuous learning" },
    listEyebrow: "Full list",
    listTitle: "All my certifications",
  },
};
