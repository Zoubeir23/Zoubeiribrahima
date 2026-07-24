import { describe, expect, it } from "vitest";
import { calculateReadingTime } from "@/lib/reading-time";

describe("calculateReadingTime", () => {
  it("returns at least 1 minute for very short content", () => {
    const result = calculateReadingTime({ sections: [{ heading: "Intro", paragraphs: ["Un court paragraphe."] }] });
    expect(result).toBe("1 minute");
  });

  it("uses plural minutes when the total exceeds 1 minute", () => {
    const words = Array.from({ length: 600 }, (_, i) => `mot${i}`).join(" ");
    const result = calculateReadingTime({ sections: [{ heading: "Long", paragraphs: [words] }] });
    expect(result).toBe("3 minutes");
  });

  it("combines contentMarkdown and sections word counts", () => {
    const markdownWords = Array.from({ length: 100 }, (_, i) => `md${i}`).join(" ");
    const sectionWords = Array.from({ length: 100 }, (_, i) => `sec${i}`).join(" ");
    const result = calculateReadingTime({
      contentMarkdown: markdownWords,
      sections: [{ heading: "Section", paragraphs: [sectionWords] }],
    });
    expect(result).toBe("1 minute");
  });

  it("counts bullets and code blocks toward the total", () => {
    const bullets = Array.from({ length: 200 }, (_, i) => `puce${i}`);
    const result = calculateReadingTime({
      sections: [{ heading: "Section", paragraphs: [], bullets, codeBlocks: ["ligne de code"] }],
    });
    expect(result).toBe("1 minute");
  });
});
