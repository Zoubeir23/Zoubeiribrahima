import { describe, expect, it } from "vitest";
import { blogPosts, type BlogPost } from "@/data/blogPosts";

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

const WORDS_PER_MINUTE = 200;

const countWords = (text: string) => text.split(/\s+/).filter(Boolean).length;

const readFullText = (post: BlogPost): string =>
  [
    post.intro,
    post.contentMarkdown ?? "",
    ...post.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.bullets ?? []),
      ...(section.codeBlocks ?? []),
    ]),
  ].join(" ");

/** Markdown headings outside fenced code blocks, as [level, text]. */
const readMarkdownHeadings = (markdown: string): Array<[number, string]> => {
  let insideCodeFence = false;
  const headings: Array<[number, string]> = [];
  for (const line of markdown.split("\n")) {
    if (line.trimStart().startsWith("```")) {
      insideCodeFence = !insideCodeFence;
    } else if (!insideCodeFence) {
      const match = /^(#{1,6})\s+(.+)$/.exec(line);
      if (match) {
        headings.push([match[1].length, match[2].trim()]);
      }
    }
  }
  return headings;
};

const markdownPosts = blogPosts.filter((post) => post.contentMarkdown);

describe("blog article heading structure", () => {
  it.each(markdownPosts.map((post) => [post.slug, post]))("%s has no H1 inside its body, the page title is the only H1", (_slug, post) => {
    const levelOneHeadings = readMarkdownHeadings(post.contentMarkdown!).filter(([level]) => level === 1);
    expect(levelOneHeadings).toEqual([]);
  });

  it.each(markdownPosts.map((post) => [post.slug, post]))("%s does not repeat its title as the first heading", (_slug, post) => {
    const [firstHeading] = readMarkdownHeadings(post.contentMarkdown!);
    expect(firstHeading?.[1].toLowerCase()).not.toBe(post.title.toLowerCase());
  });

  it.each(markdownPosts.map((post) => [post.slug, post]))("%s uses descriptive headings without a Section N prefix", (_slug, post) => {
    const numberedHeadings = readMarkdownHeadings(post.contentMarkdown!).filter(([, text]) => /^Section \d+\s*:/.test(text));
    expect(numberedHeadings).toEqual([]);
  });
});

describe("blog article presentation text", () => {
  const unaccentedWords = /\b(Developpeur|Zero|Heros|maitriser|equipe|securite|avances|accessibilite|deploiement|structure de A a Z)\b/i;

  it.each(blogPosts.map((post) => [post.slug, post]))("%s has accented French in its title, excerpt and intro", (_slug, post) => {
    expect(`${post.title} ${post.excerpt} ${post.intro}`).not.toMatch(unaccentedWords);
  });

  it.each(blogPosts.map((post) => [post.slug, post]))("%s does not stutter a word in its title", (_slug, post) => {
    const words = post.title.toLowerCase().match(/[\p{L}]{5,}/gu) ?? [];
    expect(new Set(words).size).toBe(words.length);
  });

  it.each(blogPosts.map((post) => [post.slug, post]))("%s announces a reading time close to its real length", (_slug, post) => {
    const estimatedMinutes = Math.ceil(countWords(readFullText(post)) / WORDS_PER_MINUTE);
    const announcedMinutes = Number.parseInt(post.readingTime, 10);
    expect(Math.abs(announcedMinutes - estimatedMinutes)).toBeLessThanOrEqual(1);
  });
});
