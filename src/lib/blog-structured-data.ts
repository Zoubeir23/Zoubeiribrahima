import type { BlogPost } from "@/data/blogPosts";
import { SITE_DOMAIN } from "@/lib/contact-config";

const SITE_ORIGIN = `https://${SITE_DOMAIN}`;
const AUTHOR_NAME = "Zoubeir Ibrahima";

const FRENCH_MONTH_NUMBERS: Readonly<Record<string, string>> = {
  janvier: "01",
  fevrier: "02",
  mars: "03",
  avril: "04",
  mai: "05",
  juin: "06",
  juillet: "07",
  aout: "08",
  septembre: "09",
  octobre: "10",
  novembre: "11",
  decembre: "12",
};

const removeAccents = (text: string): string => text.normalize("NFD").replace(/[̀-ͯ]/g, "");

export const parseFrenchMonthYearToIsoDate = (frenchDate: string): string | undefined => {
  const match = removeAccents(frenchDate.trim().toLowerCase()).match(/^([a-z]+)\s+(\d{4})$/);
  const monthNumber = match ? FRENCH_MONTH_NUMBERS[match[1]] : undefined;
  return match && monthNumber ? `${match[2]}-${monthNumber}-01` : undefined;
};

const toAbsoluteUrl = (path: string): string => (/^https?:\/\//.test(path) ? path : `${SITE_ORIGIN}${path}`);

export const buildBlogArticleStructuredData = (post: BlogPost) => {
  const datePublished = parseFrenchMonthYearToIsoDate(post.date);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: toAbsoluteUrl(post.coverImage),
    articleSection: post.category,
    inLanguage: "fr",
    mainEntityOfPage: `${SITE_ORIGIN}/blog/${post.slug}`,
    author: { "@type": "Person", name: AUTHOR_NAME, url: SITE_ORIGIN },
    publisher: { "@type": "Person", name: AUTHOR_NAME, url: SITE_ORIGIN },
    ...(datePublished ? { datePublished, dateModified: datePublished } : {}),
  };
};

export const buildBlogBreadcrumbStructuredData = (post: BlogPost) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_ORIGIN}/` },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_ORIGIN}/blog` },
    { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_ORIGIN}/blog/${post.slug}` },
  ],
});
