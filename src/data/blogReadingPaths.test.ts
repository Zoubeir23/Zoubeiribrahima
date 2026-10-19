import { describe, expect, it } from "vitest";
import { blogPosts, type BlogPost } from "@/data/blogPosts";
import { blogReadingPaths, resolveReadingPathPosts } from "@/data/blogReadingPaths";

describe("blog reading paths", () => {
  it("offers at least three paths with a title and a description", () => {
    expect(blogReadingPaths.length).toBeGreaterThanOrEqual(3);
    for (const readingPath of blogReadingPaths) {
      expect(readingPath.title.length, readingPath.identifier).toBeGreaterThan(0);
      expect(readingPath.description.length, readingPath.identifier).toBeGreaterThan(0);
    }
  });

  it("only references articles that exist", () => {
    const existingSlugs = new Set(blogPosts.map((post) => post.slug));
    for (const readingPath of blogReadingPaths) {
      for (const slug of readingPath.articleSlugs) {
        expect(existingSlugs.has(slug), `${readingPath.identifier}: ${slug}`).toBe(true);
      }
    }
  });

  it("chains at least three articles per path without repeating one", () => {
    for (const readingPath of blogReadingPaths) {
      expect(readingPath.articleSlugs.length, readingPath.identifier).toBeGreaterThanOrEqual(3);
      expect(new Set(readingPath.articleSlugs).size, readingPath.identifier).toBe(readingPath.articleSlugs.length);
    }
  });

  it("uses unique identifiers", () => {
    const identifiers = blogReadingPaths.map((readingPath) => readingPath.identifier);
    expect(new Set(identifiers).size).toBe(identifiers.length);
  });
});

describe("resolveReadingPathPosts", () => {
  const buildPost = (slug: string): BlogPost => ({
    slug,
    title: slug,
    coverImage: "",
    coverAlt: "",
    category: "saas",
    readingTime: "1 minute",
    date: "Octobre 2026",
    excerpt: "",
    intro: "",
    sections: [],
  });

  it("returns the articles in the order of the path", () => {
    const posts = [buildPost("b"), buildPost("a"), buildPost("c")];
    const resolved = resolveReadingPathPosts({ identifier: "x", title: "", description: "", articleSlugs: ["a", "b", "c"] }, posts);
    expect(resolved.map((post) => post.slug)).toEqual(["a", "b", "c"]);
  });

  it("skips slugs that match no article", () => {
    const resolved = resolveReadingPathPosts({ identifier: "x", title: "", description: "", articleSlugs: ["a", "missing"] }, [buildPost("a")]);
    expect(resolved.map((post) => post.slug)).toEqual(["a"]);
  });
});
