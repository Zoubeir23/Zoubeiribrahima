import { describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blogPosts";
import { buildPageStructuredData } from "@/lib/structured-data";

const baseInput = {
  title: "Titre de page | Zoubeir Ibrahima",
  description: "Description de page.",
};

describe("buildPageStructuredData", () => {
  it("describes the home page as a website owned by the person", () => {
    const [website] = buildPageStructuredData({ ...baseInput, path: "/" });
    expect(website).toMatchObject({
      "@type": "WebSite",
      "@id": "https://zoubeir.me/#website",
      url: "https://zoubeir.me",
      publisher: { "@id": "https://zoubeir.me/#person" },
    });
  });

  it("describes the freelance activity as a professional service founded by the person", () => {
    const [, business] = buildPageStructuredData({ ...baseInput, path: "/" });
    expect(business).toMatchObject({
      "@type": "ProfessionalService",
      "@id": "https://zoubeir.me/#business",
      url: "https://zoubeir.me",
      founder: { "@id": "https://zoubeir.me/#person" },
      address: { "@type": "PostalAddress", addressLocality: "Dakar", addressCountry: "SN" },
    });
    expect(business).not.toHaveProperty("aggregateRating");
    expect(business).not.toHaveProperty("review");
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
      provider: { "@id": "https://zoubeir.me/#business" },
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
      expect(posting).toMatchObject({
        datePublished: post.publishedIsoDate,
        dateModified: post.modifiedIsoDate ?? post.publishedIsoDate,
      });
      expect((posting as { image: string }).image).toMatch(/^https:\/\/zoubeir\.me\//);
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
    expect(webPage).toMatchObject({
      "@type": "WebPage",
      url: "https://zoubeir.me/skills",
      name: "Titre de page",
      isPartOf: { "@id": "https://zoubeir.me/#website" },
    });
    expect(breadcrumbs).toMatchObject({
      itemListElement: [{ name: "Accueil" }, { position: 2, name: "Titre de page", item: "https://zoubeir.me/skills" }],
    });
  });
});
