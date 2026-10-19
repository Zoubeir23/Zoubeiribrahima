import type { ServiceDetails } from "@/lib/services-types";

export const serviceDetailsEnglish: ServiceDetails = {
  saas: {
    title: "SaaS development",
    summary: "Design and development of online software: accounts, subscriptions, dashboards.",
    badge: "Remote · Quote-based",
    offerings: [
      {
        tabLabel: "Accounts and access",
        headline: "ACCOUNTS",
        tagline: "Your users, safely.",
        description:
          "Sign-up, login, roles and access control: the foundation of any SaaS, built to be secure and easy to evolve.",
        chips: ["Sign-up", "Login", "Roles", "Security"],
        quoteMessage: "Hello, I would like a SaaS with account and access management: ",
      },
      {
        tabLabel: "Subscriptions",
        headline: "SUBSCRIPTIONS",
        tagline: "Turn your tool into a service.",
        description:
          "Plans, recurring billing and customer management: I shape your software's business model with you before building it.",
        chips: ["Plans", "Billing", "Customers", "Scalability"],
        quoteMessage: "Hello, I would like a SaaS with subscriptions and billing: ",
      },
      {
        tabLabel: "Dashboards",
        headline: "DASHBOARDS",
        tagline: "Your data, finally readable.",
        description:
          "Clear interfaces to follow your activity: metrics, lists, filters and exports, designed for the people who use them every day.",
        chips: ["Metrics", "Filters", "Exports", "Clear interface"],
        quoteMessage: "Hello, I would like a dashboard for my business: ",
      },
    ],
    technologies: ["React", "TypeScript", "Django", "Python", "PostgreSQL", "Supabase", "Vercel"],
  },
  "web-applications": {
    title: "Web applications",
    summary: "Custom applications that are fast, maintainable and fitted to your business.",
    badge: "Remote · Quote-based",
    offerings: [
      {
        tabLabel: "Custom built",
        headline: "CUSTOM",
        tagline: "The tool that fits your business.",
        description:
          "An application designed around your processes rather than a generic tool: I start by understanding your need, then build what is useful.",
        chips: ["Needs analysis", "Interface", "Back-office", "Maintenance"],
        quoteMessage: "Hello, I would like a custom web application: ",
      },
      {
        tabLabel: "APIs and integrations",
        headline: "API",
        tagline: "Your tools, finally connected.",
        description:
          "API design and third-party integrations to automate exchanges between your tools and make your data reliable.",
        chips: ["REST API", "Integrations", "Automation", "Documentation"],
        quoteMessage: "Hello, I would like to connect my tools through an API: ",
      },
      {
        tabLabel: "Performance",
        headline: "SPEED",
        tagline: "An application that feels good to use.",
        description:
          "Optimizing loading, queries and accessibility so your application stays fast and usable by everyone.",
        chips: ["Loading", "Database", "Accessibility", "Quality"],
        quoteMessage: "Hello, I would like to improve the performance of my web application: ",
      },
    ],
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Django", "PostgreSQL", "Docker"],
  },
  "mobile-applications": {
    title: "Mobile applications",
    summary: "Mobile apps built around your users, with a smooth experience.",
    badge: "Remote · Quote-based",
    offerings: [
      {
        tabLabel: "Design",
        headline: "DESIGN",
        tagline: "Built for the thumb.",
        description:
          "Journeys, screens and interactions adapted to mobile use: we validate the experience before building.",
        chips: ["Journeys", "Screens", "Usability", "Mockups"],
        quoteMessage: "Hello, I would like to design a mobile application: ",
      },
      {
        tabLabel: "Features",
        headline: "FEATURES",
        tagline: "What your users actually need.",
        description:
          "Accounts, notifications, server synchronization: together we define the essential features of the first version.",
        chips: ["Accounts", "Notifications", "Sync", "API"],
        quoteMessage: "Hello, I would like to develop the features of a mobile application: ",
      },
      {
        tabLabel: "Release",
        headline: "LAUNCH",
        tagline: "From test version to real users.",
        description:
          "Testing, fixes and preparation for release, with follow-up after delivery depending on the quote.",
        chips: ["Testing", "Fixes", "Delivery", "Follow-up"],
        quoteMessage: "Hello, I would like to launch my mobile application: ",
      },
    ],
    technologies: ["Android", "iOS", "REST API", "Notifications"],
  },
  "portfolio-websites": {
    title: "Portfolio websites",
    summary: "A clear, fast portfolio that showcases your work and helps you get found.",
    badge: "Remote · Quote-based",
    offerings: [
      {
        tabLabel: "Personal portfolio",
        headline: "PORTFOLIO",
        tagline: "Your work, well presented.",
        description:
          "A site that tells your story and puts your achievements forward, with careful design and structured content.",
        chips: ["Background", "Projects", "Design", "Contact"],
        quoteMessage: "Hello, I would like a personal portfolio: ",
      },
      {
        tabLabel: "Business website",
        headline: "SHOWCASE",
        tagline: "Your business online.",
        description:
          "A professional site to present your services, reassure visitors and make it easy to get in touch.",
        chips: ["Services", "Contact", "Responsive", "Fast"],
        quoteMessage: "Hello, I would like a showcase website for my business: ",
      },
      {
        tabLabel: "Search visibility",
        headline: "VISIBILITY",
        tagline: "Get found on Google.",
        description:
          "Structure, tags, speed and accessibility: the technical basics of search visibility are built in from the start.",
        chips: ["Tags", "Speed", "Accessibility", "Structure"],
        quoteMessage: "Hello, I would like to improve the visibility of my website: ",
      },
    ],
    technologies: ["React", "Vite", "Tailwind CSS", "Vercel", "SEO"],
  },
  "remote-it-services": {
    title: "Remote IT services",
    summary: "Troubleshooting, maintenance and technical support, wherever you are.",
    badge: "Remote · Anywhere",
    offerings: [
      {
        tabLabel: "Troubleshooting",
        headline: "FIXES",
        tagline: "A problem? We fix it remotely.",
        description:
          "Remote diagnosis and resolution of your IT problems: I explain what is happening and what I am doing.",
        chips: ["Diagnosis", "Resolution", "Remote", "Explanations"],
        quoteMessage: "Hello, I need remote IT troubleshooting: ",
      },
      {
        tabLabel: "Maintenance",
        headline: "MAINTENANCE",
        tagline: "So everything keeps working.",
        description:
          "Updates, checks and regular monitoring of your tools and websites to avoid unpleasant surprises.",
        chips: ["Updates", "Checks", "Monitoring", "Backups"],
        quoteMessage: "Hello, I would like regular maintenance for my tools: ",
      },
      {
        tabLabel: "Support",
        headline: "ADVICE",
        tagline: "A trusted technical person on your side.",
        description:
          "Advice, tool choices and guidance for your digital projects, with clear explanations.",
        chips: ["Advice", "Tool choices", "Training", "Follow-up"],
        quoteMessage: "Hello, I would like technical support: ",
      },
    ],
    technologies: ["Diagnosis", "Maintenance", "Security", "Backups"],
  },
};
