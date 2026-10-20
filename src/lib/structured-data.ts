import { blogPosts } from "@/data/blogPosts";
import { SITE_DOMAIN } from "@/lib/contact-config";

export type StructuredDataNode = Record<string, unknown>;

interface PageStructuredDataInput {
  title: string;
  description: string;
  path: string;
}

const SITE_ORIGIN = `https://${SITE_DOMAIN}`;
const PERSON_REFERENCE = { "@id": `${SITE_ORIGIN}/#person` };
const TITLE_SUFFIX_SEPARATOR = " | ";

const FRENCH_MONTH_NUMBERS: Record<string, string> = {
  janvier: "01",
  février: "02",
  mars: "03",
  avril: "04",
  mai: "05",
  juin: "06",
  juillet: "07",
  août: "08",
  septembre: "09",
  octobre: "10",
  novembre: "11",
  décembre: "12",
};

/** Blog dates are written "Octobre 2026"; schema.org accepts the partial ISO date "2026-10". */
export const convertFrenchMonthYearToIsoDate = (frenchDate: string): string | null => {
  const [monthName, year] = frenchDate.trim().toLowerCase().split(/\s+/);
  const monthNumber = FRENCH_MONTH_NUMBERS[monthName];
  return monthNumber && /^\d{4}$/.test(year ?? "") ? `${year}-${monthNumber}` : null;
};

const removeTitleSuffix = (title: string): string => {
  const separatorIndex = title.lastIndexOf(TITLE_SUFFIX_SEPARATOR);
  return separatorIndex === -1 ? title : title.slice(0, separatorIndex);
};

const toAbsoluteUrl = (path: string): string => (path === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${path}`);

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
    name: "Portfolio Zoubeir Ibrahima",
    url: SITE_ORIGIN,
    inLanguage: "fr",
    publisher: PERSON_REFERENCE,
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
      provider: PERSON_REFERENCE,
      areaServed: "Worldwide",
    },
    buildBreadcrumbList([HOME_STEP, { name: "Services", path: "/services" }, { name, path }]),
  ];
};

const buildBlogPostingStructuredData = ({ title, description, path }: PageStructuredDataInput): StructuredDataNode[] => {
  const slug = path.replace(/^\/blog\//, "");
  const publishedDate = convertFrenchMonthYearToIsoDate(blogPosts.find((post) => post.slug === slug)?.date ?? "");
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
      ...(publishedDate ? { datePublished: publishedDate, dateModified: publishedDate } : {}),
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
      isPartOf: { "@type": "WebSite", url: SITE_ORIGIN },
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
  if (input.path.startsWith("/services/")) {
    return buildServiceStructuredData(input);
  }
  if (input.path.startsWith("/blog/")) {
    return buildBlogPostingStructuredData(input);
  }
  return buildGenericStructuredData(input);
};
