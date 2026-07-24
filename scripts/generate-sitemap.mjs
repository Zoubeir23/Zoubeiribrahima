import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

function readSiteUrl() {
  const siteConfigSource = readFileSync(path.join(rootDir, "src/lib/site-config.ts"), "utf-8");
  const match = siteConfigSource.match(/SITE_URL = "([^"]+)"/);
  if (!match) {
    throw new Error("Could not find SITE_URL in src/lib/site-config.ts");
  }
  return match[1];
}

function readBlogSlugs() {
  const blogPostsSource = readFileSync(path.join(rootDir, "src/data/blogPosts.ts"), "utf-8");
  const matches = [...blogPostsSource.matchAll(/slug:\s*"([^"]+)"/g)];
  return matches.map((m) => m[1]);
}

function buildSitemap(siteUrl, slugs) {
  const staticUrls = [
    { loc: `${siteUrl}/`, changefreq: "weekly", priority: "1.0" },
    { loc: `${siteUrl}/blog`, changefreq: "weekly", priority: "0.8" },
  ];
  const blogUrls = slugs.map((slug) => ({
    loc: `${siteUrl}/blog/${slug}`,
    changefreq: "monthly",
    priority: "0.6",
  }));

  const urlEntries = [...staticUrls, ...blogUrls]
    .map(
      (url) =>
        `  <url>\n    <loc>${url.loc}</loc>\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;
}

const siteUrl = readSiteUrl();
const slugs = readBlogSlugs();
const sitemap = buildSitemap(siteUrl, slugs);

writeFileSync(path.join(rootDir, "public/sitemap.xml"), sitemap);
console.log(`sitemap.xml generated with ${slugs.length} blog article(s).`);
