import { describe, expect, it } from "vitest";
import { extractHeadingsFromMarkdown, nodeToText, slugifyHeading } from "@/lib/blog-markdown-utils";

describe("slugifyHeading", () => {
  it("lowercases and strips accents", () => {
    expect(slugifyHeading("Préface")).toBe("preface");
  });

  it("replaces spaces with dashes and removes punctuation", () => {
    expect(slugifyHeading("Étape 1 : Installation !")).toBe("etape-1-installation");
  });

  it("collapses repeated dashes", () => {
    expect(slugifyHeading("A -- B")).toBe("a-b");
  });
});

describe("nodeToText", () => {
  it("returns plain strings and numbers as-is", () => {
    expect(nodeToText("hello")).toBe("hello");
    expect(nodeToText(42)).toBe("42");
  });

  it("joins array children", () => {
    expect(nodeToText(["a", "b", "c"])).toBe("abc");
  });

  it("recurses into react-element-shaped nodes", () => {
    const fakeElement = { props: { children: ["nested", " text"] } };
    expect(nodeToText(fakeElement)).toBe("nested text");
  });

  it("returns empty string for unsupported node shapes", () => {
    expect(nodeToText(null)).toBe("");
    expect(nodeToText(undefined)).toBe("");
  });
});

describe("extractHeadingsFromMarkdown", () => {
  it("ignores headings before the 'Préface' section", () => {
    const markdown = ["## Sommaire", "## Preface", "## Premiere section"].join("\n");
    const headings = extractHeadingsFromMarkdown(markdown);
    expect(headings.map((h) => h.heading)).toEqual(["Preface", "Premiere section"]);
  });

  it("ignores headings inside code fences", () => {
    const markdown = ["## Preface", "```", "## Not a heading", "```", "## Vraie section"].join("\n");
    const headings = extractHeadingsFromMarkdown(markdown);
    expect(headings.map((h) => h.heading)).toEqual(["Preface", "Vraie section"]);
  });

  it("deduplicates generated ids for repeated headings", () => {
    const markdown = ["## Preface", "## Exemple", "## Exemple"].join("\n");
    const headings = extractHeadingsFromMarkdown(markdown);
    expect(headings.map((h) => h.id)).toEqual(["md-preface", "md-exemple", "md-exemple-2"]);
  });

  it("skips table-of-contents style headings but keeps the preface heading", () => {
    const markdown = ["## Preface", "## Table des matieres", "## Sommaire", "## Contenu"].join("\n");
    const headings = extractHeadingsFromMarkdown(markdown);
    expect(headings.map((h) => h.heading)).toEqual(["Preface", "Contenu"]);
  });
});
