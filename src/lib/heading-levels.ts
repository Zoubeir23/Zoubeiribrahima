import type { SectionHeadingLevel } from "@/components/SectionHeading";

type SubheadingTag = "h2" | "h3" | "h4";

// A page title is an h1 and a home block title an h2: sub-headings go one or two levels deeper
// without ever skipping a level, which keeps the outline valid for assistive technologies.
export const getSubheadingTag = (headingAs: SectionHeadingLevel = "h2", depth: 1 | 2 = 1): SubheadingTag => {
  const sectionLevel = headingAs === "h1" ? 1 : 2;
  return `h${sectionLevel + depth}` as SubheadingTag;
};
