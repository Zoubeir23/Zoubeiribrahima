import type { ServiceDetails } from "@/lib/services-types";

export const serviceDetailsFrench: ServiceDetails = {
  saas: {
    title: "Développement SaaS",
    summary: "Conception et développement de logiciels en ligne : comptes, abonnements, tableaux de bord.",
    badge: "À distance · Sur devis",
    offerings: [
      {
        tabLabel: "Comptes et accès",
        headline: "COMPTES",
        tagline: "Vos utilisateurs, en toute sécurité.",
        description:
          "Inscription, connexion, rôles et gestion des accès : la base de tout SaaS, pensée pour être sûre et simple à faire évoluer.",
        chips: ["Inscription", "Connexion", "Rôles", "Sécurité"],
        quoteMessage: "Bonjour, je souhaite un SaaS avec gestion des comptes et des accès : ",
      },
      {
        tabLabel: "Abonnements",
        headline: "ABONNEMENTS",
        tagline: "Transformez votre outil en service.",
        description:
          "Formules, facturation récurrente et gestion des clients : je structure le modèle économique de votre logiciel avec vous avant de le développer.",
        chips: ["Formules", "Facturation", "Clients", "Évolutivité"],
        quoteMessage: "Bonjour, je souhaite un SaaS avec abonnements et facturation : ",
      },
      {
        tabLabel: "Tableaux de bord",
        headline: "DASHBOARDS",
        tagline: "Vos données, enfin lisibles.",
        description:
          "Interfaces claires pour suivre l'activité : indicateurs, listes, filtres et exports, conçus pour les personnes qui les utilisent chaque jour.",
        chips: ["Indicateurs", "Filtres", "Exports", "Interface claire"],
        quoteMessage: "Bonjour, je souhaite un tableau de bord pour mon activité : ",
      },
    ],
    technologies: ["React", "TypeScript", "Django", "Python", "PostgreSQL", "Supabase", "Vercel"],
  },
  "web-applications": {
    title: "Applications web",
    summary: "Applications sur mesure, rapides et maintenables, adaptées à votre activité.",
    badge: "À distance · Sur devis",
    offerings: [
      {
        tabLabel: "Sur mesure",
        headline: "SUR MESURE",
        tagline: "L'outil qui colle à votre activité.",
        description:
          "Une application pensée pour vos processus plutôt qu'un outil générique : je commence par comprendre votre besoin, puis je construis ce qui est utile.",
        chips: ["Analyse du besoin", "Interface", "Back-office", "Maintenance"],
        quoteMessage: "Bonjour, je souhaite une application web sur mesure : ",
      },
      {
        tabLabel: "API et intégrations",
        headline: "API",
        tagline: "Vos outils, enfin connectés.",
        description:
          "Conception d'API et intégration de services tiers pour automatiser les échanges entre vos outils et fiabiliser vos données.",
        chips: ["API REST", "Intégrations", "Automatisation", "Documentation"],
        quoteMessage: "Bonjour, je souhaite connecter mes outils avec une API : ",
      },
      {
        tabLabel: "Performance",
        headline: "RAPIDITÉ",
        tagline: "Une application agréable à utiliser.",
        description:
          "Optimisation du chargement, des requêtes et de l'accessibilité pour que votre application reste rapide et utilisable par tous.",
        chips: ["Chargement", "Base de données", "Accessibilité", "Qualité"],
        quoteMessage: "Bonjour, je souhaite améliorer la performance de mon application web : ",
      },
    ],
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Django", "PostgreSQL", "Docker"],
  },
  "mobile-applications": {
    title: "Applications mobiles",
    summary: "Applications mobiles pensées pour vos utilisateurs, avec une expérience fluide.",
    badge: "À distance · Sur devis",
    offerings: [
      {
        tabLabel: "Conception",
        headline: "CONCEPTION",
        tagline: "Pensée pour le pouce.",
        description:
          "Parcours, écrans et interactions adaptés à l'usage mobile : on valide l'expérience avant de développer.",
        chips: ["Parcours", "Écrans", "Ergonomie", "Maquettes"],
        quoteMessage: "Bonjour, je souhaite concevoir une application mobile : ",
      },
      {
        tabLabel: "Fonctionnalités",
        headline: "FONCTIONS",
        tagline: "Ce dont vos utilisateurs ont besoin.",
        description:
          "Comptes, notifications, synchronisation avec un serveur : je définis avec vous les fonctionnalités essentielles de la première version.",
        chips: ["Comptes", "Notifications", "Synchronisation", "API"],
        quoteMessage: "Bonjour, je souhaite développer les fonctionnalités d'une application mobile : ",
      },
      {
        tabLabel: "Mise à disposition",
        headline: "LANCEMENT",
        tagline: "De la version de test aux utilisateurs.",
        description:
          "Tests, corrections et préparation de la mise à disposition de l'application, avec un suivi après la livraison selon le devis.",
        chips: ["Tests", "Corrections", "Livraison", "Suivi"],
        quoteMessage: "Bonjour, je souhaite lancer mon application mobile : ",
      },
    ],
    technologies: ["Android", "iOS", "API REST", "Notifications"],
  },
  "portfolio-websites": {
    title: "Sites portfolio",
    summary: "Un portfolio clair et performant qui met en valeur votre travail et vous fait trouver.",
    badge: "À distance · Sur devis",
    offerings: [
      {
        tabLabel: "Portfolio personnel",
        headline: "PORTFOLIO",
        tagline: "Votre travail, bien présenté.",
        description:
          "Un site qui raconte votre parcours et met vos réalisations en avant, avec un design soigné et un contenu structuré.",
        chips: ["Parcours", "Réalisations", "Design", "Contact"],
        quoteMessage: "Bonjour, je souhaite un portfolio personnel : ",
      },
      {
        tabLabel: "Site vitrine",
        headline: "VITRINE",
        tagline: "Votre activité en ligne.",
        description:
          "Un site professionnel pour présenter vos services, rassurer vos visiteurs et faciliter la prise de contact.",
        chips: ["Services", "Contact", "Responsive", "Rapide"],
        quoteMessage: "Bonjour, je souhaite un site vitrine pour mon activité : ",
      },
      {
        tabLabel: "Référencement",
        headline: "VISIBILITÉ",
        tagline: "Être trouvé sur Google.",
        description:
          "Structure, balises, vitesse et accessibilité : les bases techniques du référencement sont intégrées dès la conception.",
        chips: ["Balises", "Vitesse", "Accessibilité", "Structure"],
        quoteMessage: "Bonjour, je souhaite améliorer la visibilité de mon site : ",
      },
    ],
    technologies: ["React", "Vite", "Tailwind CSS", "Vercel", "SEO"],
  },
  "remote-it-services": {
    title: "Services informatiques à distance",
    summary: "Dépannage, maintenance et accompagnement technique, où que vous soyez.",
    badge: "À distance · Partout",
    offerings: [
      {
        tabLabel: "Dépannage",
        headline: "DÉPANNAGE",
        tagline: "Un problème ? On le règle à distance.",
        description:
          "Diagnostic et résolution à distance de vos problèmes informatiques : je vous explique ce qui se passe et ce que je fais.",
        chips: ["Diagnostic", "Résolution", "À distance", "Explications"],
        quoteMessage: "Bonjour, j'ai besoin d'un dépannage informatique à distance : ",
      },
      {
        tabLabel: "Maintenance",
        headline: "MAINTENANCE",
        tagline: "Pour que tout continue de fonctionner.",
        description:
          "Mises à jour, vérifications et suivi régulier de vos outils et de vos sites pour éviter les mauvaises surprises.",
        chips: ["Mises à jour", "Vérifications", "Suivi", "Sauvegardes"],
        quoteMessage: "Bonjour, je souhaite une maintenance régulière de mes outils : ",
      },
      {
        tabLabel: "Accompagnement",
        headline: "CONSEIL",
        tagline: "Une personne de confiance côté technique.",
        description:
          "Conseils, choix d'outils et accompagnement pour vos projets numériques, avec des explications claires.",
        chips: ["Conseil", "Choix d'outils", "Formation", "Suivi"],
        quoteMessage: "Bonjour, je souhaite un accompagnement technique : ",
      },
    ],
    technologies: ["Diagnostic", "Maintenance", "Sécurité", "Sauvegardes"],
  },
};
