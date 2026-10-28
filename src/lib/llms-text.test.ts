import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blogPosts";
import { SITE_DOMAIN } from "@/lib/contact-config";
import { serviceSlugs } from "@/lib/service-meta";

const siteOrigin = `https://${SITE_DOMAIN}`;

const llmsText = readFileSync(path.resolve(__dirname, "../../public/llms.txt"), "utf8");

describe("llms.txt", () => {
  it("starts with the site name as a level one heading and a summary quote", () => {
    expect(llmsText.startsWith("# Zoubeir Ibrahima")).toBe(true);
    expect(llmsText).toMatch(/^> .+/m);
  });

  it.each(serviceSlugs)("links the service page %s", (slug) => {
    expect(llmsText).toContain(`${siteOrigin}/services/${slug}`);
  });

  it.each(blogPosts.map((post) => post.slug))("links the blog article %s", (slug) => {
    expect(llmsText).toContain(`${siteOrigin}/blog/${slug}`);
  });

  it("links the contact page", () => {
    expect(llmsText).toContain(`${siteOrigin}/contact`);
  });
});
