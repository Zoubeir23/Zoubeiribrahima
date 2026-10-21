import { blogPosts } from "@/data/blogPosts";
import { SITE_DOMAIN } from "@/lib/contact-config";
import { landingContent } from "@/lib/landing-content";

export type StructuredDataNode = Record<string, unknown>;

interface PageStructuredDataInput {
  title: string;
  description: string;
  path: string;
}

const SITE_ORIGIN = `https://${SITE_DOMAIN}`;
const PERSON_REFERENCE = { "@id": `${SITE_ORIGIN}/#person` };
const WEBSITE_REFERENCE = { "@id": `${SITE_ORIGIN}/#website` };
const BUSINESS_REFERENCE = { "@id": `${SITE_ORIGIN}/#business` };
const PROFILE_URLS = ["https://www.linkedin.com/in/zoubeir-ibrahima/", "https://github.com/Zoubeir23"];
const TITLE_SUFFIX_SEPARATOR = " | ";

const removeTitleSuffix = (title: string): string => {
  const separatorIndex = title.lastIndexOf(TITLE_SUFFIX_SEPARATOR);
  return separatorIndex === -1 ? title : title.slice(0, separatorIndex);
};

const toAbsoluteUrl = (path: string): string => {
  if (/^https?:\/\//.test(path)) {
    return path;
  }
  return path === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${path}`;
};

const buildBreadcrumbList = (trail: ReadonlyArray<{ name: string; path: string }>): StructuredDataNode => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((step, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: step.name,
    item: toAbsoluteUrl(step.path),
  })),
});

const HOME_STEP = { name: "Accueil", path: "/" };

const buildHomeStructuredData = (): StructuredDataNode[] => [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_REFERENCE["@id"],
    name: "Portfolio Zoubeir Ibrahima",
    url: SITE_ORIGIN,
    inLanguage: "fr",
    publisher: PERSON_REFERENCE,
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": BUSINESS_REFERENCE["@id"],
    name: "Zoubeir Ibrahima, développeur freelance",
    description: "Conception et développement de SaaS, d'applications web et mobiles, et de sites portfolio, à distance depuis Dakar.",
    url: SITE_ORIGIN,
    image: `${SITE_ORIGIN}/Gemini_Generated_Image_5omzhk5omzhk5omz-removebg-preview.png`,
    founder: PERSON_REFERENCE,
    areaServed: ["Sénégal", "Worldwide"],
    address: { "@type": "PostalAddress", addressLocality: "Dakar", addressCountry: "SN" },
    sameAs: PROFILE_URLS,
  },
];

const buildServiceStructuredData = ({ title, description, path }: PageStructuredDataInput): StructuredDataNode[] => {
  const name = removeTitleSuffix(title);
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name,
      description,
      url: toAbsoluteUrl(path),
      provider: BUSINESS_REFERENCE,
      areaServed: ["Sénégal", "Worldwide"],
    },
    buildBreadcrumbList([HOME_STEP, { name: "Services", path: "/services" }, { name, path }]),
  ];
};

const buildBlogPostingStructuredData = ({ title, description, path }: PageStructuredDataInput): StructuredDataNode[] => {
  const slug = path.replace(/^\/blog\//, "");
  const post = blogPosts.find((candidate) => candidate.slug === slug);
  const headline = removeTitleSuffix(title);
  return [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline,
      description,
      inLanguage: "fr",
      mainEntityOfPage: toAbsoluteUrl(path),
      author: PERSON_REFERENCE,
      publisher: PERSON_REFERENCE,
      ...(post
        ? {
            image: toAbsoluteUrl(post.coverImage),
            datePublished: post.publishedIsoDate,
            dateModified: post.modifiedIsoDate ?? post.publishedIsoDate,
          }
        : {}),
    },
    buildBreadcrumbList([HOME_STEP, { name: "Blog", path: "/blog" }, { name: headline, path }]),
  ];
};

const buildAboutStructuredData = ({ title, description, path }: PageStructuredDataInput): StructuredDataNode[] => [
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: removeTitleSuffix(title),
    description,
    url: toAbsoluteUrl(path),
    mainEntity: PERSON_REFERENCE,
  },
  buildBreadcrumbList([HOME_STEP, { name: removeTitleSuffix(title), path }]),
];

const buildFaqStructuredData = ({ title, path }: PageStructuredDataInput): StructuredDataNode[] => [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: toAbsoluteUrl(path),
    inLanguage: "fr",
    isPartOf: WEBSITE_REFERENCE,
    mainEntity: landingContent.fr.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  },
  buildBreadcrumbList([HOME_STEP, { name: removeTitleSuffix(title), path }]),
];

const buildGenericStructuredData = ({ title, description, path }: PageStructuredDataInput): StructuredDataNode[] => {
  const name = removeTitleSuffix(title);
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name,
      description,
      url: toAbsoluteUrl(path),
      inLanguage: "fr",
      isPartOf: WEBSITE_REFERENCE,
      about: PERSON_REFERENCE,
    },
    buildBreadcrumbList([HOME_STEP, { name, path }]),
  ];
};

export const buildPageStructuredData = (input: PageStructuredDataInput): StructuredDataNode[] => {
  if (input.path === "/") {
    return buildHomeStructuredData();
  }
  if (input.path === "/a-propos") {
    return buildAboutStructuredData(input);
  }
  if (input.path === "/faq") {
    return buildFaqStructuredData(input);
  }
  if (input.path.startsWith("/services/")) {
    return buildServiceStructuredData(input);
  }
  if (input.path.startsWith("/blog/")) {
    return buildBlogPostingStructuredData(input);
  }
  return buildGenericStructuredData(input);
};
