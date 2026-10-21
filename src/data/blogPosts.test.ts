import { describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blogPosts";

const FRENCH_MONTH_NAMES = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

describe("blog post dates", () => {
  it("gives every post a full ISO publication date", () => {
    for (const post of blogPosts) {
      expect(post.publishedIsoDate, post.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("keeps the displayed month label consistent with the ISO publication date", () => {
    for (const post of blogPosts) {
      const [year, month] = post.publishedIsoDate.split("-");
      const expectedLabel = `${FRENCH_MONTH_NAMES[Number(month) - 1]} ${year}`;
      expect(post.date.toLowerCase(), post.slug).toBe(expectedLabel);
    }
  });
});
