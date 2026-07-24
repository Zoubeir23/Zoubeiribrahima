const WORDS_PER_MINUTE = 200;

export interface ReadingTimeSource {
  contentMarkdown?: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
    codeBlocks?: string[];
  }>;
}

function countWords(text: string): number {
  const matches = text.trim().match(/\S+/g);
  return matches ? matches.length : 0;
}

export function calculateReadingTime(post: ReadingTimeSource): string {
  const sectionsText = post.sections
    .flatMap((section) => [section.heading, ...section.paragraphs, ...(section.bullets ?? []), ...(section.codeBlocks ?? [])])
    .join(" ");

  const totalWords = countWords(post.contentMarkdown ?? "") + countWords(sectionsText);
  const minutes = Math.max(1, Math.round(totalWords / WORDS_PER_MINUTE));

  return `${minutes} minute${minutes > 1 ? "s" : ""}`;
}
