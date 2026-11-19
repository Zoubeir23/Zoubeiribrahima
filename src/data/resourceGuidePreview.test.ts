import { describe, expect, it } from "vitest";
import { findResourceGuidePreview } from "./resourceGuidePreview";
import { resourceGuides } from "./resourceGuides";

const MINIMUM_INDEXABLE_PREVIEW_WORD_COUNT = 40;

describe("extrait public des guides", () => {
  it.each(resourceGuides.map((guide) => [guide.slug]))("%s a un extrait lisible et une suite verrouillée", (slug) => {
    const preview = findResourceGuidePreview(slug);

    expect(preview).toBeDefined();
    expect(preview!.previewMarkdown.split(/\s+/).filter(Boolean).length).toBeGreaterThanOrEqual(MINIMUM_INDEXABLE_PREVIEW_WORD_COUNT);
    expect(preview!.lockedSectionTitles.length).toBeGreaterThan(0);
  });

  it("ne livre jamais le texte verrouillé avec l'extrait", () => {
    resourceGuides.forEach((guide) => {
      expect(Object.keys(findResourceGuidePreview(guide.slug)!).sort()).toEqual(["lockedSectionTitles", "previewMarkdown"]);
    });
  });

  it("ne trouve aucun extrait pour un guide inconnu", () => {
    expect(findResourceGuidePreview("inconnu")).toBeUndefined();
  });
});
