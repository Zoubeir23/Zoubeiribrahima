import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blogPosts";
import { serviceSlugs } from "@/lib/service-meta";

// The build prerenders exactly the sitemap routes, and unknown URLs get a real 404,
// so a page missing from the sitemap would become unreachable in production.
const sitemapXml = readFileSync(path.resolve(__dirname, "../../public/sitemap.xml"), "utf8");
const sitemapPaths = new Set(
  [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, location]) => new URL(location).pathname),
);
const sitemapEntries = [...sitemapXml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, entryXml]) => ({
  pathname: new URL(/<loc>([^<]+)<\/loc>/.exec(entryXml)![1]).pathname,
  lastModified: /<lastmod>([^<]+)<\/lastmod>/.exec(entryXml)?.[1],
  entryXml,
}));

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

describe("sitemap freshness signals", () => {
  it("gives every URL a full ISO lastmod date", () => {
    for (const entry of sitemapEntries) {
      expect(entry.lastModified, entry.pathname).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it.each(blogPosts.map((post) => [post.slug, post.modifiedIsoDate ?? post.publishedIsoDate]))(
    "dates the blog article %s with its own modification date",
    (slug, expectedDate) => {
      const entry = sitemapEntries.find((candidate) => candidate.pathname === `/blog/${slug}`);
      expect(entry?.lastModified).toBe(expectedDate);
    },
  );

  it("omits priority and changefreq, which Google ignores", () => {
    expect(sitemapXml).not.toMatch(/<priority>|<changefreq>/);
  });
});
