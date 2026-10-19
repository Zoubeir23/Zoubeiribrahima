import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useStructuredData } from "@/hooks/useStructuredData";

const findScripts = (): HTMLScriptElement[] =>
  Array.from(document.head.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'));

describe("useStructuredData", () => {
  it("adds a JSON-LD script to the document head", () => {
    renderHook(() => useStructuredData("article", { "@type": "Article", headline: "Titre" }));

    const scripts = findScripts();
    expect(scripts).toHaveLength(1);
    expect(JSON.parse(scripts[0].textContent ?? "")).toEqual({ "@type": "Article", headline: "Titre" });
  });

  it("removes the script when the component unmounts", () => {
    const { unmount } = renderHook(() => useStructuredData("article", { "@type": "Article" }));
    unmount();

    expect(findScripts()).toHaveLength(0);
  });

  it("replaces the content instead of duplicating the script", () => {
    const { rerender } = renderHook(({ headline }) => useStructuredData("article", { headline }), {
      initialProps: { headline: "Premier" },
    });
    rerender({ headline: "Second" });

    const scripts = findScripts();
    expect(scripts).toHaveLength(1);
    expect(JSON.parse(scripts[0].textContent ?? "")).toEqual({ headline: "Second" });
  });

  it("keeps independent scripts for different identifiers", () => {
    renderHook(() => {
      useStructuredData("article", { "@type": "Article" });
      useStructuredData("breadcrumb", { "@type": "BreadcrumbList" });
    });

    expect(findScripts()).toHaveLength(2);
  });

  it("adds nothing when there is no data", () => {
    renderHook(() => useStructuredData("article", null));

    expect(findScripts()).toHaveLength(0);
  });
});
