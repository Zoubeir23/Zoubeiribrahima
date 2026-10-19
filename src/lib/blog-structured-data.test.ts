import { describe, expect, it } from "vitest";
import {
  buildBlogArticleStructuredData,
  buildBlogBreadcrumbStructuredData,
  parseFrenchMonthYearToIsoDate,
} from "@/lib/blog-structured-data";
import type { BlogPost } from "@/data/blogPosts";

const examplePost: BlogPost = {
  slug: "fixer-le-prix-de-son-saas",
  title: "Fixer le prix de son SaaS",
  coverImage: "/logo_profile/avatar.png",
  coverAlt: "Avatar",
  category: "saas",
  readingTime: "9 minutes",
  date: "Octobre 2026",
  excerpt: "Abonnement, usage ou licence.",
  intro: "Le prix est une fonctionnalité.",
  sections: [],
};

describe("parseFrenchMonthYearToIsoDate", () => {
  it("converts a French month and year to the first day of that month", () => {
    expect(parseFrenchMonthYearToIsoDate("Octobre 2026")).toBe("2026-10-01");
    expect(parseFrenchMonthYearToIsoDate("Avril 2026")).toBe("2026-04-01");
  });

  it("understands accented month names", () => {
    expect(parseFrenchMonthYearToIsoDate("Février 2026")).toBe("2026-02-01");
    expect(parseFrenchMonthYearToIsoDate("Décembre 2025")).toBe("2025-12-01");
  });

  it("returns undefined when the text is not a French month and year", () => {
    expect(parseFrenchMonthYearToIsoDate("bientôt")).toBeUndefined();
  });
});

describe("buildBlogArticleStructuredData", () => {
  const structuredData = buildBlogArticleStructuredData(examplePost);

  it("describes a schema.org Article", () => {
    expect(structuredData["@context"]).toBe("https://schema.org");
    expect(structuredData["@type"]).toBe("Article");
    expect(structuredData.headline).toBe("Fixer le prix de son SaaS");
  });

  it("points to the canonical article URL", () => {
    expect(structuredData.mainEntityOfPage).toBe("https://zoubeir.me/blog/fixer-le-prix-de-son-saas");
  });

  it("includes the publication date, author and language", () => {
    expect(structuredData.datePublished).toBe("2026-10-01");
    expect(structuredData.author).toEqual({ "@type": "Person", name: "Zoubeir Ibrahima", url: "https://zoubeir.me" });
    expect(structuredData.inLanguage).toBe("fr");
  });

  it("uses the absolute cover image URL", () => {
    expect(structuredData.image).toBe("https://zoubeir.me/logo_profile/avatar.png");
  });

  it("omits the publication date when it cannot be parsed", () => {
    const withoutDate = buildBlogArticleStructuredData({ ...examplePost, date: "bientôt" });
    expect("datePublished" in withoutDate).toBe(false);
  });
});

describe("buildBlogBreadcrumbStructuredData", () => {
  it("lists home, blog and the article in order", () => {
    const structuredData = buildBlogBreadcrumbStructuredData(examplePost);
    expect(structuredData["@type"]).toBe("BreadcrumbList");
    expect(structuredData.itemListElement.map((item) => item.position)).toEqual([1, 2, 3]);
    expect(structuredData.itemListElement.map((item) => item.item)).toEqual([
      "https://zoubeir.me/",
      "https://zoubeir.me/blog",
      "https://zoubeir.me/blog/fixer-le-prix-de-son-saas",
    ]);
  });
});
