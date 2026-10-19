import { describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blogPosts";
import { landingContent } from "@/lib/landing-content";

const saasPosts = blogPosts.filter((post) => post.category === "saas");

describe("saas blog category", () => {
  it("has at least three example articles", () => {
    expect(saasPosts.length).toBeGreaterThanOrEqual(3);
  });

  it("gives every article a unique slug", () => {
    const slugs = blogPosts.map((post) => post.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("writes each saas article in markdown with at least three sections", () => {
    for (const post of saasPosts) {
      const sectionCount = (post.contentMarkdown?.match(/^## /gm) ?? []).length;
      expect(sectionCount, post.slug).toBeGreaterThanOrEqual(3);
    }
  });
});

describe("founded SaaS statistic", () => {
  it("announces three or more SaaS in both languages", () => {
    expect(landingContent.fr.hero.stats.at(-1)).toEqual({ value: "3+", label: "SaaS fondés" });
    expect(landingContent.en.hero.stats.at(-1)).toEqual({ value: "3+", label: "SaaS founded" });
  });
});
