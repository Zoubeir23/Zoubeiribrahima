import { describe, expect, it } from "vitest";
import { MAXIMUM_PREVIEW_WORD_COUNT, MINIMUM_PREVIEW_WORD_COUNT, splitResourceGuidePreview } from "./split-resource-guide-preview";

const words = (count: number): string => Array.from({ length: count }, (_, index) => `mot${index}`).join(" ");

const guideWithSections = (sectionWordCounts: number[]): string =>
  sectionWordCounts.map((wordCount, index) => `## Section ${index + 1}\n\n${words(wordCount)}\n`).join("\n");

describe("splitResourceGuidePreview", () => {
  it("rend publique la première section quand elle est assez longue", () => {
    const preview = splitResourceGuidePreview(guideWithSections([MINIMUM_PREVIEW_WORD_COUNT, 50, 50, 50]));

    expect(preview.previewMarkdown).toContain("## Section 1");
    expect(preview.previewMarkdown).not.toContain("## Section 2");
    expect(preview.lockedSectionTitles).toEqual(["Section 2", "Section 3", "Section 4"]);
  });

  it("ajoute la section suivante quand la première est trop courte", () => {
    const preview = splitResourceGuidePreview(guideWithSections([20, 200, 50, 50]));

    expect(preview.previewMarkdown).toContain("## Section 2");
    expect(preview.lockedSectionTitles).toEqual(["Section 3", "Section 4"]);
  });

  it("n'ajoute pas une section qui rendrait l'extrait trop long", () => {
    const preview = splitResourceGuidePreview(guideWithSections([20, MAXIMUM_PREVIEW_WORD_COUNT, 50, 50]));

    expect(preview.previewMarkdown).not.toContain("## Section 2");
    expect(preview.lockedSectionTitles).toEqual(["Section 2", "Section 3", "Section 4"]);
  });

  it("ne rend jamais publique plus de la moitié des sections", () => {
    const preview = splitResourceGuidePreview(guideWithSections([5, 5, 5, 5, 5]));

    expect(preview.lockedSectionTitles).toEqual(["Section 3", "Section 4", "Section 5"]);
  });

  it("garde toujours au moins une section verrouillée", () => {
    const preview = splitResourceGuidePreview(guideWithSections([5, 5]));

    expect(preview.lockedSectionTitles).toEqual(["Section 2"]);
  });

  it("recompose le guide complet à partir de l'extrait et de la suite", () => {
    const markdown = guideWithSections([30, 40, 50]);
    const preview = splitResourceGuidePreview(markdown);

    expect(`${preview.previewMarkdown}\n${preview.lockedMarkdown}`.trim()).toBe(markdown.trim());
  });

  it("ignore les titres écrits dans un bloc de code", () => {
    const markdown = `## Installer\n\n\`\`\`bash\n## pas un titre\nnpx exemple\n\`\`\`\n\n## Utiliser\n\n${words(10)}\n`;
    const preview = splitResourceGuidePreview(markdown);

    expect(preview.previewMarkdown).toContain("## pas un titre");
    expect(preview.lockedSectionTitles).toEqual(["Utiliser"]);
  });

  it("rattache le texte placé avant le premier titre à la première section", () => {
    const preview = splitResourceGuidePreview(`Introduction libre.\n\n## Début\n\n${words(10)}\n\n## Suite\n\n${words(10)}\n`);

    expect(preview.previewMarkdown).toContain("Introduction libre.");
    expect(preview.previewMarkdown).toContain("## Début");
    expect(preview.lockedSectionTitles).toEqual(["Suite"]);
  });

  it("ne verrouille rien pour un guide sans section", () => {
    const preview = splitResourceGuidePreview(words(30));

    expect(preview.previewMarkdown).toBe(words(30));
    expect(preview.lockedMarkdown).toBe("");
    expect(preview.lockedSectionTitles).toEqual([]);
  });
});
