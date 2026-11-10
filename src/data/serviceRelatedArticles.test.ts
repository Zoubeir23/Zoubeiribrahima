import { describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blogPosts";
import { selectServiceRelatedArticles } from "@/data/serviceRelatedArticles";
import { serviceSlugs } from "@/lib/service-meta";

describe("service related articles", () => {
  it("links the SaaS service to the SaaS articles", () => {
    const relatedArticles = selectServiceRelatedArticles("saas", blogPosts);
    expect(relatedArticles.length).toBeGreaterThan(0);
    expect(relatedArticles.every((post) => post.category === "saas")).toBe(true);
  });

  it("links the web applications service to the Python and DevOps articles", () => {
    const relatedArticles = selectServiceRelatedArticles("web-applications", blogPosts);
    expect(relatedArticles.length).toBeGreaterThan(0);
    expect(relatedArticles.every((post) => ["python", "devops"].includes(post.category))).toBe(true);
  });

  it.each(serviceSlugs)("never lists more than three articles for %s", (slug) => {
    expect(selectServiceRelatedArticles(slug, blogPosts).length).toBeLessThanOrEqual(3);
  });

  it("lists nothing for a service without a matching topic", () => {
    expect(selectServiceRelatedArticles("mobile-applications", blogPosts)).toEqual([]);
  });
});
