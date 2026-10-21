import { describe, expect, it } from "vitest";
import { serviceSlugs } from "@/lib/service-meta";
import { serviceDetailsEnglish } from "@/lib/services-details-en";
import { serviceDetailsFrench } from "@/lib/services-details-fr";

const languages = [
  { language: "fr", details: serviceDetailsFrench, locationPattern: /Dakar|Sénégal/ },
  { language: "en", details: serviceDetailsEnglish, locationPattern: /Dakar|Senegal/ },
] as const;

describe.each(languages)("service search metadata ($language)", ({ details, locationPattern }) => {
  it.each(serviceSlugs)("gives %s a title that names its location and fits a search result", (slug) => {
    const { metaTitle } = details[slug];
    expect(metaTitle).toMatch(locationPattern);
    expect(metaTitle.length).toBeGreaterThanOrEqual(40);
    expect(metaTitle.length).toBeLessThanOrEqual(65);
  });

  it.each(serviceSlugs)("gives %s a description of a useful length", (slug) => {
    const { metaDescription } = details[slug];
    expect(metaDescription.length).toBeGreaterThanOrEqual(110);
    expect(metaDescription.length).toBeLessThanOrEqual(160);
  });

  it("uses a different title and description for every service", () => {
    const titles = serviceSlugs.map((slug) => details[slug].metaTitle);
    const descriptions = serviceSlugs.map((slug) => details[slug].metaDescription);
    expect(new Set(titles).size).toBe(serviceSlugs.length);
    expect(new Set(descriptions).size).toBe(serviceSlugs.length);
  });
});
