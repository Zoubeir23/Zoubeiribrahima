import { describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blogPosts";
import { buildPageStructuredData, convertFrenchMonthYearToIsoDate } from "@/lib/structured-data";

const baseInput = {
  title: "Titre de page | Zoubeir Ibrahima",
  description: "Description de page.",
};

describe("convertFrenchMonthYearToIsoDate", () => {
  it.each([
    ["Octobre 2026", "2026-10"],
    ["Avril 2026", "2026-04"],
    ["Février 2025", "2025-02"],
    ["août 2024", "2024-08"],
  ])("converts %s to %s", (frenchDate, isoDate) => {
    expect(convertFrenchMonthYearToIsoDate(frenchDate)).toBe(isoDate);
  });

  it("returns null for an unknown format", () => {
    expect(convertFrenchMonthYearToIsoDate("bientôt")).toBeNull();
  });
});

describe("buildPageStructuredData", () => {
  it("describes the home page as a website owned by the person", () => {
    const [website] = buildPageStructuredData({ ...baseInput, path: "/" });
    expect(website).toMatchObject({ "@type": "WebSite", url: "https://zoubeir.me", publisher: { "@id": "https://zoubeir.me/#person" } });
  });

  it("describes a service page as a service provided by the person, with breadcrumbs", () => {
    const [service, breadcrumbs] = buildPageStructuredData({
      title: "Développement SaaS | Zoubeir Ibrahima",
      description: "Logiciels en ligne.",
      path: "/services/saas",
    });
    expect(service).toMatchObject({
      "@type": "Service",
      name: "Développement SaaS",
      url: "https://zoubeir.me/services/saas",
      provider: { "@id": "https://zoubeir.me/#person" },
    });
    expect(breadcrumbs).toMatchObject({
      "@type": "BreadcrumbList",
      itemListElement: [
        { position: 1, name: "Accueil", item: "https://zoubeir.me" },
        { position: 2, name: "Services", item: "https://zoubeir.me/services" },
        { position: 3, name: "Développement SaaS", item: "https://zoubeir.me/services/saas" },
      ],
    });
  });

  it("describes every blog article as a dated blog posting authored by the person", () => {
    for (const post of blogPosts) {
      const [posting, breadcrumbs] = buildPageStructuredData({
        title: `${post.title} | Zoubeir Ibrahima`,
        description: post.excerpt,
        path: `/blog/${post.slug}`,
      });
      expect(posting).toMatchObject({
        "@type": "BlogPosting",
        headline: post.title,
        mainEntityOfPage: `https://zoubeir.me/blog/${post.slug}`,
        author: { "@id": "https://zoubeir.me/#person" },
      });
      expect((posting as { datePublished: string }).datePublished).toMatch(/^\d{4}-\d{2}$/);
      expect(breadcrumbs).toMatchObject({ "@type": "BreadcrumbList" });
    }
  });

  it("omits the publication date when the article is unknown", () => {
    const [posting] = buildPageStructuredData({ ...baseInput, path: "/blog/article-inconnu" });
    expect(posting).not.toHaveProperty("datePublished");
  });

  it("describes the about page as a profile of the person", () => {
    const [profile] = buildPageStructuredData({ ...baseInput, path: "/a-propos" });
    expect(profile).toMatchObject({ "@type": "ProfilePage", mainEntity: { "@id": "https://zoubeir.me/#person" } });
  });

  it("falls back to a web page with breadcrumbs for other pages", () => {
    const [webPage, breadcrumbs] = buildPageStructuredData({ ...baseInput, path: "/skills" });
    expect(webPage).toMatchObject({ "@type": "WebPage", url: "https://zoubeir.me/skills", name: "Titre de page" });
    expect(breadcrumbs).toMatchObject({
      itemListElement: [{ name: "Accueil" }, { position: 2, name: "Titre de page", item: "https://zoubeir.me/skills" }],
    });
  });
});
