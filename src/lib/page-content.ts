import type { LandingLanguage } from "@/lib/landing-content";

interface PageMeta {
  title: string;
  /** Keyword-rich <title> without the brand suffix; falls back to `title`. */
  metaTitle?: string;
  description: string;
}

interface TeaserContent {
  title: string;
  description: string;
  linkLabel: string;
}

export interface PageContent {
  home: PageMeta;
  services: PageMeta;
  skills: PageMeta;
  projects: PageMeta;
  experience: PageMeta;
  certifications: PageMeta;
  faq: PageMeta;
  contact: PageMeta;
  blog: PageMeta;
  teasers: {
    skills: TeaserContent;
    projects: TeaserContent;
    experience: TeaserContent;
    certifications: TeaserContent;
    faq: TeaserContent;
    blog: TeaserContent;
  };
}

export const pageContent: Record<LandingLanguage, PageContent> = {
  fr: {
    home: {
      title: "Zoubeir Ibrahima | Développeur freelance SaaS, web et mobile | Dakar",
      description:
        "Développeur freelance basé à Dakar : SaaS, applications web et mobiles, sites portfolio et services informatiques à distance. Fondateur de Snapfolioo.",
    },
    services: {
      title: "Services",
      metaTitle: "Services de développement SaaS, web et mobile",
      description:
        "Développement SaaS, applications web et mobiles, sites portfolio et services informatiques à distance : découvrez mes cinq offres et leur déroulement.",
    },
    skills: {
      title: "Compétences",
      metaTitle: "Compétences et stack technique du développeur",
      description:
        "Langages, frameworks, bases de données et outils que j'utilise au quotidien : Django, Laravel, React, Flutter, PostgreSQL, Supabase et plus encore.",
    },
    projects: {
      title: "Projets",
      metaTitle: "Projets SaaS, web et mobile réalisés",
      description:
        "Snapfolioo, Smart-HR, Tchokos SARL : les projets sur lesquels je travaille, avec leur stack technique, leur statut et leurs liens.",
    },
    experience: {
      title: "Parcours",
      metaTitle: "Parcours du développeur freelance à Dakar",
      description:
        "Expériences professionnelles, formation académique et langues de Zoubeir Ibrahima Amed, développeur freelance basé à Dakar.",
    },
    certifications: {
      title: "Certifications",
      metaTitle: "Certifications Harvard CS50, Microsoft, Cisco",
      description:
        "Plus de vingt certifications : Harvard CS50, Anthropic, Microsoft, Cisco, HackerRank, LinkedIn Learning et Udemy, avec liens vers les diplômes.",
    },
    faq: {
      title: "Questions fréquentes",
      metaTitle: "Questions fréquentes avant de lancer un projet",
      description:
        "Délais, tarifs, travail à distance, suivi après livraison : les réponses aux questions les plus courantes avant de démarrer un projet.",
    },
    contact: {
      title: "Contact",
      metaTitle: "Contacter un développeur freelance à Dakar",
      description:
        "Écrivez-moi, contactez-moi sur WhatsApp ou réservez un créneau de 30 minutes pour parler de votre projet de SaaS, d'application ou de site.",
    },
    blog: {
      title: "Blog",
      metaTitle: "Blog développement : Django, Python, Git, IA",
      description:
        "Articles et guides de développement : Django, Python, Git, Docker, HTML et CSS, et l'IA appliquée au code, pour apprendre et progresser.",
    },
    teasers: {
      skills: {
        title: "Ma stack",
        description: "Les langages, frameworks et outils avec lesquels je construis vos produits.",
        linkLabel: "Voir toutes les compétences",
      },
      projects: {
        title: "Projets récents",
        description: "Un aperçu de ce que je construis, de la plateforme SaaS à l'application sur mesure.",
        linkLabel: "Voir tous les projets",
      },
      experience: {
        title: "Parcours",
        description: "Mes expériences professionnelles et ma formation.",
        linkLabel: "Voir le parcours complet",
      },
      certifications: {
        title: "Certifications",
        description: "Une formation continue, attestée par des organismes reconnus.",
        linkLabel: "Voir toutes les certifications",
      },
      faq: {
        title: "Questions fréquentes",
        description: "Les réponses aux questions les plus courantes.",
        linkLabel: "Voir toutes les questions",
      },
      blog: {
        title: "Derniers articles",
        description: "Des guides pratiques sur le SaaS, Django, Python, Git et l'IA appliquée au code.",
        linkLabel: "Voir tous les articles",
      },
    },
  },
  en: {
    home: {
      title: "Zoubeir Ibrahima | Freelance SaaS, web and mobile developer | Dakar",
      description:
        "Freelance developer based in Dakar: SaaS, web and mobile applications, portfolio websites and remote IT services. Founder of Snapfolioo, Harvard CS50 certified.",
    },
    services: {
      title: "Services",
      metaTitle: "SaaS, web and mobile development services",
      description:
        "SaaS development, web and mobile applications, portfolio websites and remote IT services: discover my five offers and how a project unfolds.",
    },
    skills: {
      title: "Skills",
      metaTitle: "Skills and tech stack of a freelance developer",
      description:
        "Languages, frameworks, databases and tools I use every day: Django, Laravel, React, Flutter, PostgreSQL, Supabase and more.",
    },
    projects: {
      title: "Projects",
      metaTitle: "SaaS, web and mobile projects built",
      description:
        "Snapfolioo, Smart-HR, Tchokos SARL: the projects I am working on, with their tech stack, status and links.",
    },
    experience: {
      title: "Experience",
      metaTitle: "Freelance developer experience, Dakar",
      description:
        "Professional experience, education and languages of Zoubeir Ibrahima Amed, freelance developer based in Dakar.",
    },
    certifications: {
      title: "Certifications",
      metaTitle: "Harvard CS50, Microsoft, Cisco certifications",
      description:
        "More than twenty certifications: Harvard CS50, Anthropic, Microsoft, Cisco, HackerRank, LinkedIn Learning and Udemy, with links to the credentials.",
    },
    faq: {
      title: "Frequently asked questions",
      metaTitle: "FAQ before starting a software project",
      description:
        "Timelines, pricing, remote work, support after delivery: answers to the most common questions before starting a project.",
    },
    contact: {
      title: "Contact",
      metaTitle: "Contact a freelance developer in Dakar",
      description:
        "Write to me, reach me on WhatsApp or book a 30-minute slot to talk about your SaaS, application or website project.",
    },
    blog: {
      title: "Blog",
      metaTitle: "Development blog: Django, Python, Git, AI",
      description:
        "Development articles and guides: Django, Python, Git, Docker, HTML and CSS, and AI applied to code, to help you learn and improve.",
    },
    teasers: {
      skills: {
        title: "My stack",
        description: "The languages, frameworks and tools I use to build your products.",
        linkLabel: "See all skills",
      },
      projects: {
        title: "Recent projects",
        description: "A glimpse of what I build, from a SaaS platform to a custom application.",
        linkLabel: "See all projects",
      },
      experience: {
        title: "Experience",
        description: "My professional experience and education.",
        linkLabel: "See the full background",
      },
      certifications: {
        title: "Certifications",
        description: "Continuous learning backed by recognized organizations.",
        linkLabel: "See all certifications",
      },
      faq: {
        title: "Frequently asked questions",
        description: "Answers to the most common questions.",
        linkLabel: "See all questions",
      },
      blog: {
        title: "Latest articles",
        description: "Practical guides on SaaS, Django, Python, Git and AI applied to code (in French).",
        linkLabel: "See all articles",
      },
    },
  },
};
