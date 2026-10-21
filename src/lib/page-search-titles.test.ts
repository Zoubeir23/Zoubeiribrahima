import { describe, expect, it } from "vitest";
import { pageContent } from "@/lib/page-content";

const BRAND_SUFFIX = " | Zoubeir Ibrahima";
const secondaryPageKeys = ["services", "skills", "projects", "experience", "certifications", "faq", "contact", "blog"] as const;

describe.each(["fr", "en"] as const)("search titles of secondary pages (%s)", (language) => {
  it.each(secondaryPageKeys)("gives %s a descriptive title that fits a search result", (pageKey) => {
    const { metaTitle } = pageContent[language][pageKey];
    expect(metaTitle).toBeDefined();
    const fullTitle = `${metaTitle}${BRAND_SUFFIX}`;
    expect(fullTitle.length).toBeGreaterThanOrEqual(40);
    expect(fullTitle.length).toBeLessThanOrEqual(65);
  });

  it("uses a different title for every page", () => {
    const titles = secondaryPageKeys.map((pageKey) => pageContent[language][pageKey].metaTitle);
    expect(new Set(titles).size).toBe(secondaryPageKeys.length);
  });
});
