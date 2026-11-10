import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blogPosts";

// Thin duplicates merged into their complete guide: the old URL must send a permanent
// redirect to the guide, and the old article must be gone from the site.
const mergedArticleTargets = [
  ["git-github-workflow-propre-2026", "git-github-de-zero-a-heros-guide-complet"],
  ["python-bonnes-pratiques-code-maintenable-2026", "python-de-zero-a-heros-guide-complet"],
  ["agents-ia-claude-code-openclaw-tendances-2026", "vibe-coding-et-claude-code-en-2026"],
] as const;

interface VercelRedirect {
  source: string;
  destination: string;
  statusCode?: number;
}

const projectRoot = process.cwd();
const vercelConfiguration = JSON.parse(readFileSync(path.join(projectRoot, "vercel.json"), "utf8")) as {
  redirects?: VercelRedirect[];
};
const publishedSlugs = new Set(blogPosts.map((post) => post.slug));

describe("merged blog articles", () => {
  it.each(mergedArticleTargets)("redirects %s permanently to %s", (mergedSlug, targetSlug) => {
    expect(vercelConfiguration.redirects).toContainEqual({
      source: `/blog/${mergedSlug}`,
      destination: `/blog/${targetSlug}`,
      statusCode: 301,
    });
  });

  it.each(mergedArticleTargets)("points %s to a published guide", (_mergedSlug, targetSlug) => {
    expect(publishedSlugs.has(targetSlug)).toBe(true);
  });
});
