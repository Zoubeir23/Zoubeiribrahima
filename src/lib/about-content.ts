import type { IdentityLabels } from "@/lib/about-identity";
import type { LandingLanguage } from "@/lib/landing-content";

interface AboutTab {
  label: string;
  title: string;
  paragraphs: string[];
  linkLabel?: string;
}

export interface AboutContent {
  meta: { title: string; description: string };
  eyebrow: string;
  titleLead: string;
  titleHighlight: string;
  summary: string;
  portraitAlt: string;
  identityTitle: string;
  identityLabels: IdentityLabels;
  identityValues: { tradeName: string; location: string; status: string };
  tabListLabel: string;
  tabs: {
    who: AboutTab;
    journey: AboutTab;
    method: AboutTab;
    payment: AboutTab & { methodsLabel: string };
    contact: AboutTab & { emailLabel: string; whatsappLabel: string; bookingLabel: string };
  };
  legalLinks: { privacy: string; terms: string; title: string };
}

export const aboutContent: Record<LandingLanguage, AboutContent> = {
  fr: {
    meta: {
      title: "À propos",
      description:
        "Zoubeir Ibrahima, développeur freelance à Dakar : SaaS, applications web et mobiles, sites portfolio et services informatiques à distance. Qui je suis et comment je travaille.",
    },
    eyebrow: "À propos",
    titleLead: "Un développeur,",
    titleHighlight: "un seul interlocuteur",
    summary:
      "Développeur freelance basé à Dakar, je conçois des SaaS, des applications web et mobiles et des sites portfolio pour des clients au Sénégal et à l'international.",
    portraitAlt: "Portrait illustré de Zoubeir Ibrahima",
    identityTitle: "Carte d'identité",
    identityLabels: {
      tradeName: "Nom",
      location: "Localisation",
      status: "Statut",
      legalStatus: "Forme juridique",
      registrationNumber: "Numéro d'immatriculation",
      email: "Email",
      phone: "Téléphone",
    },
    identityValues: {
      tradeName: "Zoubeir Ibrahima",
      location: "Dakar, Sénégal",
      status: "Développeur freelance, 100 % à distance",
    },
    tabListLabel: "Rubriques de la page À propos",
    tabs: {
      who: {
        label: "Qui je suis",
        title: "Qui je suis",
        paragraphs: [
          "Je m'appelle Zoubeir Ibrahima, développeur freelance basé à Dakar. Je travaille depuis plus de deux ans sur des produits web et mobiles, avec Django, Laravel, React et Flutter.",
          "Je suis le fondateur de Snapfolioo et je travaille sur d'autres produits SaaS. Cette expérience de produit me sert chez mes clients : je pense usage, maintenance et évolution, pas seulement livraison.",
          "Mon objectif est simple : vous donner un seul interlocuteur, de l'idée à la mise en ligne, avec des échanges clairs et un code que vous pourrez faire évoluer.",
        ],
      },
      journey: {
        label: "Parcours",
        title: "Parcours",
        paragraphs: [
          "Expériences professionnelles, formation et langues sont détaillées sur la page dédiée.",
        ],
        linkLabel: "Voir le parcours complet",
      },
      method: {
        label: "Façon de travailler",
        title: "Façon de travailler",
        paragraphs: [
          "Travail 100 % à distance, réponses rapides quel que soit votre fuseau horaire, et un déroulement en étapes pour que vous sachiez toujours où en est votre projet.",
        ],
        linkLabel: "Voir mes services et mon processus",
      },
      payment: {
        label: "Paiement",
        title: "Paiement et conditions",
        paragraphs: [
          "Les modalités de paiement sont précisées avant tout engagement. Les conditions complètes figurent dans les conditions d'utilisation.",
        ],
        methodsLabel: "Moyens de paiement acceptés",
        linkLabel: "Lire les conditions",
      },
      contact: {
        label: "Contact",
        title: "Me contacter",
        paragraphs: ["Décrivez votre projet : je réponds en général sous un jour ouvré."],
        linkLabel: "Ouvrir le formulaire de contact",
        emailLabel: "Écrire un email",
        whatsappLabel: "Écrire sur WhatsApp",
        bookingLabel: "Réserver un échange",
      },
    },
    legalLinks: { title: "Documents", privacy: "Politique de confidentialité", terms: "Conditions d'utilisation" },
  },
  en: {
    meta: {
      title: "About",
      description:
        "Zoubeir Ibrahima, freelance developer in Dakar: SaaS, web and mobile applications, portfolio sites and remote IT services. Who I am and how I work.",
    },
    eyebrow: "About",
    titleLead: "One developer,",
    titleHighlight: "one point of contact",
    summary:
      "I am a freelance developer based in Dakar, building SaaS products, web and mobile applications and portfolio sites for clients in Senegal and abroad.",
    portraitAlt: "Illustrated portrait of Zoubeir Ibrahima",
    identityTitle: "Identity card",
    identityLabels: {
      tradeName: "Name",
      location: "Location",
      status: "Status",
      legalStatus: "Legal form",
      registrationNumber: "Registration number",
      email: "Email",
      phone: "Phone",
    },
    identityValues: {
      tradeName: "Zoubeir Ibrahima",
      location: "Dakar, Senegal",
      status: "Freelance developer, 100% remote",
    },
    tabListLabel: "About page sections",
    tabs: {
      who: {
        label: "Who I am",
        title: "Who I am",
        paragraphs: [
          "I am Zoubeir Ibrahima, a freelance developer based in Dakar. I have spent more than two years building web and mobile products with Django, Laravel, React and Flutter.",
          "I am the founder of Snapfolioo and I work on other SaaS products. That product experience benefits my clients: I think about usage, maintenance and evolution, not only delivery.",
          "My goal is simple: give you a single point of contact, from the idea to going live, with clear communication and code you can keep evolving.",
        ],
      },
      journey: {
        label: "Background",
        title: "Background",
        paragraphs: ["Professional experience, education and languages are detailed on the dedicated page."],
        linkLabel: "See the full background",
      },
      method: {
        label: "How I work",
        title: "How I work",
        paragraphs: [
          "100% remote work, fast replies whatever your time zone, and a step-by-step process so you always know where your project stands.",
        ],
        linkLabel: "See my services and process",
      },
      payment: {
        label: "Payment",
        title: "Payment and terms",
        paragraphs: [
          "Payment terms are agreed before any commitment. The full terms are available in the terms of use.",
        ],
        methodsLabel: "Accepted payment methods",
        linkLabel: "Read the terms",
      },
      contact: {
        label: "Contact",
        title: "Get in touch",
        paragraphs: ["Describe your project: I usually reply within one business day."],
        linkLabel: "Open the contact form",
        emailLabel: "Send an email",
        whatsappLabel: "Message on WhatsApp",
        bookingLabel: "Book a call",
      },
    },
    legalLinks: { title: "Documents", privacy: "Privacy policy", terms: "Terms of use" },
  },
};
