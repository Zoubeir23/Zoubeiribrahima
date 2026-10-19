import type { LandingLanguage } from "@/lib/landing-content";
import { serviceDetailsEnglish } from "@/lib/services-details-en";
import { serviceDetailsFrench } from "@/lib/services-details-fr";
import type { ServiceDetails } from "@/lib/services-types";

export interface ServicesContent {
  learnMoreLabel: string;
  backToServices: string;
  anchors: {
    offerings: string;
    included: string;
    technologies: string;
    process: string;
  };
  offeringsEyebrow: string;
  offeringsTitle: string;
  includedEyebrow: string;
  includedTitle: string;
  includedItems: string[];
  technologiesEyebrow: string;
  technologiesTitle: string;
  requestQuoteLabel: string;
  bookCallLabel: string;
  contactLabel: string;
  notFoundTitle: string;
  notFoundBody: string;
  pageTitleSuffix: string;
  services: ServiceDetails;
}

export const servicesContent: Record<LandingLanguage, ServicesContent> = {
  fr: {
    learnMoreLabel: "Voir le service",
    backToServices: "Retour aux services",
    anchors: {
      offerings: "Offres",
      included: "Inclus",
      technologies: "Technologies",
      process: "Processus",
    },
    offeringsEyebrow: "Chapitre I",
    offeringsTitle: "Ce que je fais",
    includedEyebrow: "Inclus dans chaque projet",
    includedTitle: "Livré",
    includedItems: [
      "Brief clair avant de démarrer",
      "Devis détaillé",
      "Validation par étapes",
      "Suivi après livraison selon le devis",
    ],
    technologiesEyebrow: "Chapitre II",
    technologiesTitle: "Technologies",
    requestQuoteLabel: "Demander un devis",
    bookCallLabel: "Prendre rendez-vous",
    contactLabel: "Me contacter",
    notFoundTitle: "Service introuvable",
    notFoundBody: "Ce service n'existe pas ou n'est plus proposé.",
    pageTitleSuffix: "Zoubeir Ibrahima",
    services: serviceDetailsFrench,
  },
  en: {
    learnMoreLabel: "View service",
    backToServices: "Back to services",
    anchors: {
      offerings: "Offers",
      included: "Included",
      technologies: "Technologies",
      process: "Process",
    },
    offeringsEyebrow: "Chapter I",
    offeringsTitle: "What I do",
    includedEyebrow: "Included in every project",
    includedTitle: "Delivered",
    includedItems: [
      "A clear brief before starting",
      "A detailed quote",
      "Step-by-step validation",
      "Follow-up after delivery depending on the quote",
    ],
    technologiesEyebrow: "Chapter II",
    technologiesTitle: "Technologies",
    requestQuoteLabel: "Request a quote",
    bookCallLabel: "Book a call",
    contactLabel: "Contact me",
    notFoundTitle: "Service not found",
    notFoundBody: "This service does not exist or is no longer offered.",
    pageTitleSuffix: "Zoubeir Ibrahima",
    services: serviceDetailsEnglish,
  },
};
