import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const readDescription = () => document.head.querySelector('meta[name="description"]')?.getAttribute("content");
const readCanonical = () => document.head.querySelector('link[rel="canonical"]')?.getAttribute("href");

describe("usePageMetadata", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
    document.title = "";
  });

  it("sets the document title", () => {
    renderHook(() => usePageMetadata({ title: "Projets | Zoubeir", description: "d", path: "/projects" }));
    expect(document.title).toBe("Projets | Zoubeir");
  });

  it("creates the description meta tag when it is missing", () => {
    renderHook(() => usePageMetadata({ title: "t", description: "Une description", path: "/" }));
    expect(readDescription()).toBe("Une description");
  });

  it("updates an existing description meta tag instead of duplicating it", () => {
    document.head.innerHTML = '<meta name="description" content="old">';
    renderHook(() => usePageMetadata({ title: "t", description: "new", path: "/" }));
    expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1);
    expect(readDescription()).toBe("new");
  });

  it("points the canonical link to the page url on the official domain", () => {
    renderHook(() => usePageMetadata({ title: "t", description: "d", path: "/projects" }));
    expect(readCanonical()).toBe("https://zoubeir.me/projects");
  });

  it("uses the bare domain for the home page", () => {
    renderHook(() => usePageMetadata({ title: "t", description: "d", path: "/" }));
    expect(readCanonical()).toBe("https://zoubeir.me/");
  });

  it("follows changes when the page or language changes", () => {
    const { rerender } = renderHook((props) => usePageMetadata(props), {
      initialProps: { title: "Projets", description: "fr", path: "/projects" },
    });
    rerender({ title: "Projects", description: "en", path: "/projects" });
    expect(document.title).toBe("Projects");
    expect(readDescription()).toBe("en");
  });
  describe("noindex", () => {
    const readRobots = () => document.head.querySelector('meta[name="robots"]')?.getAttribute("content");

    it("leaves the robots tag untouched by default", () => {
      document.head.innerHTML = '<meta name="robots" content="index, follow">';
      renderHook(() => usePageMetadata({ title: "t", description: "d", path: "/" }));
      expect(readRobots()).toBe("index, follow");
    });

    it("asks search engines not to index a page flagged as noindex", () => {
      document.head.innerHTML = '<meta name="robots" content="index, follow">';
      renderHook(() => usePageMetadata({ title: "t", description: "d", path: "/x", noindex: true }));
      expect(readRobots()).toBe("noindex, follow");
    });

    it("creates the robots tag when the document has none", () => {
      renderHook(() => usePageMetadata({ title: "t", description: "d", path: "/x", noindex: true }));
      expect(readRobots()).toBe("noindex, follow");
    });

    it("restores indexing when the user leaves the page", () => {
      document.head.innerHTML = '<meta name="robots" content="index, follow">';
      const { unmount } = renderHook(() => usePageMetadata({ title: "t", description: "d", path: "/x", noindex: true }));
      unmount();
      expect(readRobots()).toBe("index, follow");
    });
  });
});
