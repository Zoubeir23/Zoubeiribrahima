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
});
