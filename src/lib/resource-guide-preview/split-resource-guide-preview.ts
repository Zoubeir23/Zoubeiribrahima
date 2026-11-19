// Splits the text of a resource guide into a public preview, readable by everyone and by search engines, and the
// rest, shown once the visitor gives a first name and an e-mail. The preview is the first section, followed by the
// next ones while it stays shorter than MINIMUM_PREVIEW_WORD_COUNT. A section that would push the preview past
// MAXIMUM_PREVIEW_WORD_COUNT stays locked (often the core of the guide, such as a full prompt), and the preview never
// holds more than half of the sections, so the form still unlocks most of the guide. Sections start at level-two
// headings ("## "), outside code blocks.
// This file is also used by the Vite plugin (vite.config.ts): keep it free of browser and Vite APIs.

export const MINIMUM_PREVIEW_WORD_COUNT = 150;
export const MAXIMUM_PREVIEW_WORD_COUNT = 300;

export interface ResourceGuidePreview {
  previewMarkdown: string;
  lockedMarkdown: string;
  lockedSectionTitles: string[];
}

interface GuideSection {
  title: string;
  lines: string[];
}

const SECTION_HEADING_PATTERN = /^## +(.+?)\s*$/;
const CODE_FENCE_PATTERN = /^\s*(```|~~~)/;

// Text written before the first heading belongs to the first section.
function splitIntoSections(markdown: string): GuideSection[] {
  const completedSections: GuideSection[] = [];
  let currentSection: GuideSection = { title: "", lines: [] };
  let isInsideCodeBlock = false;

  for (const line of markdown.split("\n")) {
    if (CODE_FENCE_PATTERN.test(line)) isInsideCodeBlock = !isInsideCodeBlock;
    const headingTitle = isInsideCodeBlock ? undefined : SECTION_HEADING_PATTERN.exec(line)?.[1];

    if (headingTitle !== undefined && currentSection.title !== "") {
      completedSections.push(currentSection);
      currentSection = { title: headingTitle, lines: [line] };
    } else {
      currentSection = { title: currentSection.title || (headingTitle ?? ""), lines: [...currentSection.lines, line] };
    }
  }
  return [...completedSections, currentSection];
}

const countWords = (lines: string[]): number => lines.join(" ").split(/\s+/).filter(Boolean).length;

function countPreviewSections(sections: GuideSection[]): number {
  const maximumPreviewSectionCount = Math.max(1, Math.floor(sections.length / 2));
  let previewSectionCount = 1;
  let previewWordCount = countWords(sections[0].lines);

  while (previewWordCount < MINIMUM_PREVIEW_WORD_COUNT && previewSectionCount < maximumPreviewSectionCount) {
    const nextSectionWordCount = countWords(sections[previewSectionCount].lines);
    if (previewWordCount + nextSectionWordCount > MAXIMUM_PREVIEW_WORD_COUNT) break;
    previewWordCount += nextSectionWordCount;
    previewSectionCount += 1;
  }
  return previewSectionCount;
}

export function splitResourceGuidePreview(markdown: string): ResourceGuidePreview {
  const sections = splitIntoSections(markdown);
  if (sections.length <= 1) {
    return { previewMarkdown: markdown, lockedMarkdown: "", lockedSectionTitles: [] };
  }

  const previewSectionCount = countPreviewSections(sections);
  const previewSections = sections.slice(0, previewSectionCount);
  const lockedSections = sections.slice(previewSectionCount);

  return {
    previewMarkdown: previewSections.flatMap((section) => section.lines).join("\n"),
    lockedMarkdown: lockedSections.flatMap((section) => section.lines).join("\n"),
    lockedSectionTitles: lockedSections.map((section) => section.title),
  };
}
