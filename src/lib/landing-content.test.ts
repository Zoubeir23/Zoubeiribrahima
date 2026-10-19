import { describe, expect, it } from "vitest";
import { landingContent } from "@/lib/landing-content";

const collectKeyPaths = (value: unknown, prefix = ""): string[] => {
  if (Array.isArray(value)) {
    return [`${prefix}[${value.length}]`, ...value.flatMap((item) => collectKeyPaths(item, `${prefix}[]`))];
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) => collectKeyPaths(child, `${prefix}.${key}`));
  }
  return [prefix];
};

describe("landingContent", () => {
  it("exposes the same structure in French and English", () => {
    expect(collectKeyPaths(landingContent.en)).toEqual(collectKeyPaths(landingContent.fr));
  });

  it("covers the five offered services", () => {
    expect(landingContent.fr.services.items).toHaveLength(5);
    expect(landingContent.en.services.items).toHaveLength(5);
  });

  it("never leaves an empty string", () => {
    const allTexts = (value: unknown): string[] =>
      typeof value === "string"
        ? [value]
        : value && typeof value === "object"
          ? Object.values(value).flatMap(allTexts)
          : [];
    for (const language of ["fr", "en"] as const) {
      expect(allTexts(landingContent[language]).filter((text) => text.trim() === "")).toEqual([]);
    }
  });

  it("describes a three step process", () => {
    expect(landingContent.fr.process.steps).toHaveLength(3);
  });

  it("provides at least four frequently asked questions", () => {
    expect(landingContent.fr.faq.items.length).toBeGreaterThanOrEqual(4);
  });
});
