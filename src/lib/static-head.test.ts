import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { pageContent } from "@/lib/page-content";

const indexHtml = readFileSync(join(process.cwd(), "index.html"), "utf-8");
const homeMeta = pageContent.fr.home;

const readTag = (pattern: RegExp) => pattern.exec(indexHtml)?.[1];

describe("static head of index.html", () => {
  it("uses the same title as the home page", () => {
    expect(readTag(/<title>([^<]*)<\/title>/)).toBe(homeMeta.title);
  });

  it("uses the same description as the home page", () => {
    expect(readTag(/<meta name="description" content="([^"]*)"/)).toBe(homeMeta.description);
  });

  it("shares the title and description with social previews", () => {
    expect(readTag(/<meta property="og:title" content="([^"]*)"/)).toBe(homeMeta.title);
    expect(readTag(/<meta property="og:description" content="([^"]*)"/)).toBe(homeMeta.description);
    expect(readTag(/<meta name="twitter:title" content="([^"]*)"/)).toBe(homeMeta.title);
    expect(readTag(/<meta name="twitter:description" content="([^"]*)"/)).toBe(homeMeta.description);
  });

  it("points the canonical link to the official domain", () => {
    expect(readTag(/<link rel="canonical" href="([^"]*)"/)).toBe("https://zoubeir.me");
  });
});
