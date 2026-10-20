import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blogPosts";
import { serviceSlugs } from "@/lib/service-meta";

// The build prerenders exactly the sitemap routes, and unknown URLs get a real 404,
// so a page missing from the sitemap would become unreachable in production.
const sitemapPaths = new Set(
  [...readFileSync(path.resolve(__dirname, "../../public/sitemap.xml"), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    ([, location]) => new URL(location).pathname,
  ),
);

const staticPagePaths = [
  "/",
  "/a-propos",
  "/services",
  "/skills",
  "/projects",
  "/experience",
  "/certifications",
  "/faq",
  "/contact",
  "/blog",
  "/privacy",
  "/terms",
];

describe("sitemap coverage of prerendered routes", () => {
  it.each(staticPagePaths)("lists the static page %s", (pagePath) => {
    expect(sitemapPaths.has(pagePath)).toBe(true);
  });

  it.each(serviceSlugs)("lists the service page %s", (slug) => {
    expect(sitemapPaths.has(`/services/${slug}`)).toBe(true);
  });

  it.each(blogPosts.map((post) => post.slug))("lists the blog article %s", (slug) => {
    expect(sitemapPaths.has(`/blog/${slug}`)).toBe(true);
  });
});
