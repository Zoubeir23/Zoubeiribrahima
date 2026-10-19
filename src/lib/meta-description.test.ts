import { describe, expect, it } from "vitest";
import { toMetaDescription } from "@/lib/meta-description";

describe("toMetaDescription", () => {
  it("keeps a short text unchanged", () => {
    expect(toMetaDescription("Une phrase courte.")).toBe("Une phrase courte.");
  });

  it("collapses repeated whitespace and line breaks", () => {
    expect(toMetaDescription("Une   phrase\n\nsur  plusieurs lignes.")).toBe("Une phrase sur plusieurs lignes.");
  });

  it("cuts a long text at a word boundary and adds an ellipsis", () => {
    const longText = "mot ".repeat(80).trim();
    const result = toMetaDescription(longText);
    expect(result.length).toBeLessThanOrEqual(160);
    expect(result.endsWith("…")).toBe(true);
    expect(result.slice(0, -1).endsWith(" ")).toBe(false);
    expect(result.slice(0, -1).split(" ").every((word) => word === "mot")).toBe(true);
  });

  it("never exceeds the requested length", () => {
    expect(toMetaDescription("x".repeat(400), 120).length).toBeLessThanOrEqual(120);
  });

  it("does not leave a trailing comma before the ellipsis", () => {
    const text = `${"abcdefgh ".repeat(18)}fin, suite du texte qui continue encore longtemps`;
    expect(toMetaDescription(text).endsWith(",…")).toBe(false);
  });

  it("returns an empty string for blank input", () => {
    expect(toMetaDescription("   \n  ")).toBe("");
  });
});
