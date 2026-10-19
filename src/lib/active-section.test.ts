import { describe, expect, it } from "vitest";
import { findActiveSectionId } from "@/lib/active-section";

const sections = [
  { id: "hero", top: -900 },
  { id: "services", top: -100 },
  { id: "skills", top: 600 },
  { id: "projects", top: 1400 },
];

describe("findActiveSectionId", () => {
  it("returns the last section whose top has passed the offset line", () => {
    expect(findActiveSectionId(sections, 300)).toBe("services");
  });

  it("switches to the next section once its top crosses the offset", () => {
    const scrolled = sections.map((section) => ({ ...section, top: section.top - 400 }));
    expect(findActiveSectionId(scrolled, 300)).toBe("skills");
  });

  it("falls back to the first section when none has reached the offset", () => {
    const atTop = [
      { id: "hero", top: 400 },
      { id: "services", top: 1200 },
    ];
    expect(findActiveSectionId(atTop, 300)).toBe("hero");
  });

  it("returns an empty string when there are no sections", () => {
    expect(findActiveSectionId([], 300)).toBe("");
  });

  it("does not depend on the order of the input", () => {
    const shuffled = [sections[2], sections[0], sections[3], sections[1]];
    expect(findActiveSectionId(shuffled, 300)).toBe("services");
  });
});
