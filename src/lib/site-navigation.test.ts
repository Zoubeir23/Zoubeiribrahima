import { describe, expect, it } from "vitest";
import { NAV_ITEMS, isNavItemActive, resolveLegacyHashPath } from "@/lib/site-navigation";

const findItem = (path: string) => {
  const item = NAV_ITEMS.find((candidate) => candidate.path === path);
  if (!item) {
    throw new Error(`Missing navigation item ${path}`);
  }
  return item;
};

describe("NAV_ITEMS", () => {
  it("lists the home page, the dedicated pages, the about page and the blog in order", () => {
    expect(NAV_ITEMS.map((item) => item.path)).toEqual([
      "/",
      "/services",
      "/skills",
      "/projects",
      "/experience",
      "/certifications",
      "/a-propos",
      "/contact",
      "/blog",
    ]);
  });

  it("gives every item an emoji and a unique path", () => {
    expect(new Set(NAV_ITEMS.map((item) => item.path)).size).toBe(NAV_ITEMS.length);
    for (const item of NAV_ITEMS) {
      expect(item.emoji.length).toBeGreaterThan(0);
    }
  });
});

describe("isNavItemActive", () => {
  it("matches the home page only on the exact root path", () => {
    expect(isNavItemActive(findItem("/"), "/")).toBe(true);
    expect(isNavItemActive(findItem("/"), "/services")).toBe(false);
  });

  it("matches a page and its nested routes", () => {
    expect(isNavItemActive(findItem("/services"), "/services")).toBe(true);
    expect(isNavItemActive(findItem("/services"), "/services/saas")).toBe(true);
    expect(isNavItemActive(findItem("/blog"), "/blog/git-github-de-zero-a-heros-guide-complet")).toBe(true);
  });

  it("does not match unrelated pages or look-alike prefixes", () => {
    expect(isNavItemActive(findItem("/skills"), "/services")).toBe(false);
    expect(isNavItemActive(findItem("/projects"), "/projects-archive")).toBe(false);
  });

  it("matches nothing on the legal pages", () => {
    expect(NAV_ITEMS.some((item) => isNavItemActive(item, "/privacy"))).toBe(false);
  });
});

describe("resolveLegacyHashPath", () => {
  it.each([
    ["#services", "/services"],
    ["#skills", "/skills"],
    ["#projects", "/projects"],
    ["#experience", "/experience"],
    ["#certifications", "/certifications"],
    ["#contact", "/contact"],
    ["#faq", "/faq"],
    ["#process", "/services"],
    ["#why-me", "/services"],
  ])("sends %s to %s", (hash, expectedPath) => {
    expect(resolveLegacyHashPath(hash)).toBe(expectedPath);
  });

  it("keeps the home page for the hero anchor and unknown hashes", () => {
    expect(resolveLegacyHashPath("#hero")).toBeNull();
    expect(resolveLegacyHashPath("#unknown")).toBeNull();
    expect(resolveLegacyHashPath("")).toBeNull();
  });
});
