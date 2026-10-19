import type { LegalDocument } from "@/lib/legal-types";

export const privacyPolicyEnglish: LegalDocument = {
  title: "Privacy policy",
  eyebrow: "Your data",
  lastUpdatedLabel: "Last updated",
  lastUpdated: "October 19, 2026",
  intro:
    "This page explains what data this site (zoubeir.me) collects, why, which third-party services are involved, and how to exercise your rights. It describes what the site actually does today.",
  sections: [
    {
      title: "Who is responsible for this site",
      paragraphs: [
        "The site is published by Zoubeir Ibrahima Amed, a freelance developer based in Senegal. For any question about your data, write to Zoubeiribrahima@gmail.com.",
      ],
    },
    {
      title: "The data I receive",
      paragraphs: ["I only receive what you choose to send me:"],
      items: [
        "Contact form: your name, email address and message. They are sent through the Formspree service and reach me by email.",
        "Email, WhatsApp or phone: the information you share when you write or call me.",
        "Booking: the information (name, email, time slot) you enter in Calendly.",
      ],
    },
    {
      title: "Audience measurement",
      paragraphs: [
        "If you accept it in the cookie banner, the site uses Vercel Web Analytics to count visits (page views, country, device type). Vercel designed this service to work without cookies and without identifying individual visitors.",
        "If you refuse, this service is not loaded. If you withdraw your consent later, measurement stops immediately.",
      ],
    },
    {
      title: "What is stored in your browser",
      paragraphs: [
        "The site stores two items locally: your chosen language and your consent choice. They stay in your browser and are not sent to a server. They are needed for the site to work and do not require consent.",
      ],
    },
    {
      title: "External content",
      paragraphs: [
        "The booking calendar is provided by Calendly. It may set its own cookies, so it only loads after you agree. Links to GitHub, LinkedIn and WhatsApp open third-party services governed by their own rules.",
      ],
    },
    {
      title: "Why I use this data",
      paragraphs: [
        "To answer your requests and prepare a quote (pre-contract exchanges), to follow up on a project and, with your consent, to understand how the site is used and improve it.",
      ],
    },
    {
      title: "Who it passes through",
      paragraphs: [
        "This site relies on technical providers: Vercel (hosting and audience measurement), Formspree (contact form), Calendly (booking) and, if you write to me there, WhatsApp. These services may process data outside your country. I do not sell your data.",
      ],
    },
    {
      title: "How long I keep it",
      paragraphs: [
        "I keep your messages for as long as needed to answer and follow up on your request or project, then delete them when they are no longer useful.",
      ],
    },
    {
      title: "Your rights",
      paragraphs: [
        "You can ask for access to your data, correction or deletion, object to its use, and withdraw your consent at any time. Write to Zoubeiribrahima@gmail.com and I will answer as soon as possible.",
        "To change your cookie choices, use the \"Manage my cookies\" button at the bottom of the site.",
      ],
    },
    {
      title: "Changes",
      paragraphs: [
        "This policy may change along with the site. The last update date is shown at the top of the page.",
      ],
    },
  ],
};

export const termsOfUseEnglish: LegalDocument = {
  title: "Terms of use",
  eyebrow: "Site rules",
  lastUpdatedLabel: "Last updated",
  lastUpdated: "October 19, 2026",
  intro:
    "By using this site (zoubeir.me) you accept the terms below. They govern use of the site, not the services themselves, which are covered by a separate quote or contract.",
  sections: [
    {
      title: "Publisher and hosting",
      paragraphs: [
        "Site published by Zoubeir Ibrahima Amed, freelance developer. Contact: Zoubeiribrahima@gmail.com. The site is hosted by Vercel Inc.",
      ],
    },
    {
      title: "Purpose of the site",
      paragraphs: [
        "This site presents my freelance activity: SaaS development, web and mobile applications, portfolio websites and remote IT services, along with my projects, certifications and articles.",
      ],
    },
    {
      title: "Services and quotes",
      paragraphs: [
        "Information on the site is not a binding offer. Each service is specified in a quote prepared after a brief. A project only starts once both parties have accepted that quote in writing.",
      ],
    },
    {
      title: "Intellectual property",
      paragraphs: [
        "The texts, illustrations, logo and graphic elements of the site are protected. Any reproduction or reuse without written permission is prohibited, except for a short quotation crediting the source. Third-party brands and logos belong to their respective owners.",
      ],
    },
    {
      title: "Acceptable use",
      paragraphs: ["You agree not to:"],
      items: [
        "disrupt the operation of the site or attempt unauthorized access;",
        "use the contact form to send spam or unlawful content;",
        "scrape the site's content in an abusive way.",
      ],
    },
    {
      title: "External links and services",
      paragraphs: [
        "The site contains links to third-party services (GitHub, LinkedIn, WhatsApp, Calendly, etc.). I do not control these services and I am not responsible for their content or practices.",
      ],
    },
    {
      title: "Availability and liability",
      paragraphs: [
        "I try to keep information accurate and the site available, without guaranteeing continuous availability or the absence of errors. To the extent permitted by law, I am not liable for damages arising from use of the site.",
      ],
    },
    {
      title: "Personal data",
      paragraphs: [
        "How your data is processed is described in the privacy policy, available from the footer.",
      ],
    },
    {
      title: "Governing law",
      paragraphs: [
        "These terms are governed by the law applicable where the publisher is established, without prejudice to the mandatory rights that the law grants to consumers in their own country.",
      ],
    },
    {
      title: "Changes",
      paragraphs: [
        "These terms may be updated. The last update date is shown at the top of the page.",
      ],
    },
  ],
};
