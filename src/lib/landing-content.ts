export type LandingLanguage = "fr" | "en";

interface TitledItem {
  title: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

export interface LandingContent {
  nav: {
    home: string;
    services: string;
    stack: string;
    projects: string;
    experience: string;
    certifications: string;
    contact: string;
    blog: string;
    hire: string;
    toggleMenu: string;
    switchLanguage: string;
  };
  hero: {
    availability: string;
    headlineLead: string;
    headlineHighlight: string;
    subtitle: string;
    primaryAction: string;
    secondaryAction: string;
    tickerLabel: string;
    tickerItems: string[];
    trustBadges: string[];
    stats: { value: string; label: string }[];
  };
  services: {
    title: string;
    subtitle: string;
    items: TitledItem[];
  };
  process: {
    title: string;
    subtitle: string;
    steps: TitledItem[];
  };
  reasons: {
    title: string;
    items: TitledItem[];
  };
  faq: {
    title: string;
    items: FaqItem[];
  };
  booking: {
    providerName: string;
    description: string;
    loadButtonLabel: string;
  };
}

const frenchContent: LandingContent = {
  nav: {
    home: "Accueil",
    services: "Services",
    stack: "Stack",
    projects: "Projets",
    experience: "Expérience",
    certifications: "Certifications",
    contact: "Contact",
    blog: "Blog",
    hire: "Démarrer un projet",
    toggleMenu: "Ouvrir ou fermer le menu",
    switchLanguage: "Passer en anglais",
  },
  hero: {
    availability: "Disponible en freelance",
    headlineLead: "Je conçois et livre votre",
    headlineHighlight: "produit digital",
    subtitle:
      "Développeur freelance : SaaS, applications web et mobiles, sites portfolio et services informatiques à distance, pour des clients en France comme à l'international.",
    primaryAction: "Démarrer un projet",
    secondaryAction: "Voir mes projets",
    tickerLabel: "Domaines d'intervention",
    tickerItems: ["SaaS", "Applications web", "Applications mobiles", "Sites portfolio", "Support à distance"],
    trustBadges: ["Freelance", "100 % à distance", "Clients nationaux et internationaux"],
    stats: [
      { value: "2+", label: "Ans d'expérience" },
      { value: "10+", label: "Certifications" },
      { value: "1", label: "SaaS fondé" },
    ],
  },
  services: {
    title: "Mes services",
    subtitle: "Un seul interlocuteur, de l'idée à la mise en ligne.",
    items: [
      {
        title: "Développement SaaS",
        description: "Conception et développement de logiciels en ligne : authentification, abonnements, tableaux de bord.",
      },
      {
        title: "Applications web",
        description: "Applications sur mesure, rapides et maintenables, adaptées à votre activité.",
      },
      {
        title: "Applications mobiles",
        description: "Applications mobiles pensées pour vos utilisateurs, avec une expérience fluide.",
      },
      {
        title: "Sites portfolio",
        description: "Un portfolio clair et performant qui met en valeur votre travail et vous fait trouver.",
      },
      {
        title: "Services informatiques à distance",
        description: "Dépannage, maintenance et accompagnement technique, où que vous soyez.",
      },
    ],
  },
  process: {
    title: "Comment ça marche",
    subtitle: "Simple et transparent, en 3 étapes.",
    steps: [
      {
        title: "Brief",
        description: "Vous me décrivez votre besoin. Nous clarifions les objectifs et le périmètre ensemble.",
      },
      {
        title: "Devis",
        description: "Je vous propose un devis clair avec le périmètre, le calendrier et les modalités.",
      },
      {
        title: "Livraison",
        description: "Je développe, vous validez par étapes, puis je livre et reste disponible pour la suite.",
      },
    ],
  },
  reasons: {
    title: "Pourquoi travailler avec moi",
    items: [
      {
        title: "Réactivité",
        description: "Des échanges clairs et des réponses rapides, quel que soit votre fuseau horaire.",
      },
      {
        title: "Un seul interlocuteur",
        description: "De la conception à la mise en ligne, vous parlez toujours à la même personne.",
      },
      {
        title: "Travail à distance",
        description: "Un fonctionnement 100 % à distance, pensé pour les clients nationaux et internationaux.",
      },
      {
        title: "Qualité du code",
        description: "Un code lisible, testé et documenté pour que votre produit reste évolutif.",
      },
    ],
  },
  faq: {
    title: "Questions fréquentes",
    items: [
      {
        question: "Comment se passe un premier échange ?",
        answer: "Vous me décrivez votre besoin via le formulaire ou par message. Je reviens vers vous avec des questions et une première estimation.",
      },
      {
        question: "Combien de temps pour réaliser mon projet ?",
        answer: "Cela dépend du périmètre. Le délai est estimé après le brief et précisé dans le devis.",
      },
      {
        question: "Travaillez-vous avec des clients à l'étranger ?",
        answer: "Oui. Je travaille à distance avec des clients nationaux et internationaux, en français et en anglais.",
      },
      {
        question: "Comment sont fixés les tarifs ?",
        answer: "Chaque projet fait l'objet d'un devis sur mesure, établi après le brief.",
      },
      {
        question: "Proposez-vous un suivi après la livraison ?",
        answer: "Oui, la maintenance et le support peuvent être convenus dans le devis selon vos besoins.",
      },
    ],
  },
  booking: {
    providerName: "Prise de rendez-vous",
    description: "Ce calendrier est hébergé par un service tiers qui peut déposer des cookies. Il ne se charge qu'avec votre accord.",
    loadButtonLabel: "Afficher le calendrier",
  },
};

const englishContent: LandingContent = {
  nav: {
    home: "Home",
    services: "Services",
    stack: "Stack",
    projects: "Projects",
    experience: "Experience",
    certifications: "Certifications",
    contact: "Contact",
    blog: "Blog",
    hire: "Start a project",
    toggleMenu: "Open or close the menu",
    switchLanguage: "Switch to French",
  },
  hero: {
    availability: "Available for freelance work",
    headlineLead: "I design and ship your",
    headlineHighlight: "digital product",
    subtitle:
      "Freelance developer: SaaS, web and mobile applications, portfolio websites and remote IT services, for clients in France and worldwide.",
    primaryAction: "Start a project",
    secondaryAction: "See my work",
    tickerLabel: "Areas of work",
    tickerItems: ["SaaS", "Web applications", "Mobile applications", "Portfolio websites", "Remote support"],
    trustBadges: ["Freelance", "100% remote", "National and international clients"],
    stats: [
      { value: "2+", label: "Years of experience" },
      { value: "10+", label: "Certifications" },
      { value: "1", label: "SaaS founded" },
    ],
  },
  services: {
    title: "My services",
    subtitle: "One point of contact, from idea to launch.",
    items: [
      {
        title: "SaaS development",
        description: "Design and development of online software: authentication, subscriptions, dashboards.",
      },
      {
        title: "Web applications",
        description: "Custom applications that are fast, maintainable and fitted to your business.",
      },
      {
        title: "Mobile applications",
        description: "Mobile apps built around your users, with a smooth experience.",
      },
      {
        title: "Portfolio websites",
        description: "A clear, fast portfolio that showcases your work and helps you get found.",
      },
      {
        title: "Remote IT services",
        description: "Troubleshooting, maintenance and technical support, wherever you are.",
      },
    ],
  },
  process: {
    title: "How it works",
    subtitle: "Simple and transparent, in 3 steps.",
    steps: [
      {
        title: "Brief",
        description: "You describe your need. Together we clarify the goals and the scope.",
      },
      {
        title: "Quote",
        description: "I send a clear quote covering scope, timeline and terms.",
      },
      {
        title: "Delivery",
        description: "I build, you validate step by step, then I deliver and stay available afterwards.",
      },
    ],
  },
  reasons: {
    title: "Why work with me",
    items: [
      {
        title: "Responsiveness",
        description: "Clear communication and quick answers, whatever your time zone.",
      },
      {
        title: "One point of contact",
        description: "From design to launch, you always talk to the same person.",
      },
      {
        title: "Remote by design",
        description: "A fully remote way of working, built for national and international clients.",
      },
      {
        title: "Code quality",
        description: "Readable, tested and documented code so your product stays easy to evolve.",
      },
    ],
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        question: "How does a first conversation work?",
        answer: "You describe your need through the form or by message. I come back with questions and a first estimate.",
      },
      {
        question: "How long will my project take?",
        answer: "It depends on the scope. The timeline is estimated after the brief and stated in the quote.",
      },
      {
        question: "Do you work with clients abroad?",
        answer: "Yes. I work remotely with national and international clients, in French and English.",
      },
      {
        question: "How is pricing set?",
        answer: "Each project gets a tailored quote, prepared after the brief.",
      },
      {
        question: "Do you offer support after delivery?",
        answer: "Yes, maintenance and support can be agreed in the quote according to your needs.",
      },
    ],
  },
  booking: {
    providerName: "Book a call",
    description: "This calendar is hosted by a third-party service that may set cookies. It only loads with your consent.",
    loadButtonLabel: "Show the calendar",
  },
};

export const landingContent: Record<LandingLanguage, LandingContent> = {
  fr: frenchContent,
  en: englishContent,
};
