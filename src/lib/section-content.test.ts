import { describe, expect, it } from "vitest";
import { certificationsContent } from "@/lib/certifications-content";
import { contactContent } from "@/lib/contact-content";
import { experienceContent } from "@/lib/experience-content";
import { projectsContent } from "@/lib/projects-content";
import { servicesContent } from "@/lib/services-content";
import { skillsContent } from "@/lib/skills-content";
import { collectKeyPaths, collectTexts } from "@/test/content-parity";

const contentModules = {
  skills: skillsContent,
  projects: projectsContent,
  experience: experienceContent,
  certifications: certificationsContent,
  contact: contactContent,
  services: servicesContent,
};

describe.each(Object.entries(contentModules))("%s content", (_name, content) => {
  it("exposes the same structure in French and English", () => {
    expect(collectKeyPaths(content.en)).toEqual(collectKeyPaths(content.fr));
  });

  it("never leaves an empty string", () => {
    for (const language of ["fr", "en"] as const) {
      expect(collectTexts(content[language]).filter((text) => text.trim() === "")).toEqual([]);
    }
  });
});

describe("services content", () => {
  it("covers every service slug with at least three offerings and a quote message", async () => {
    const { serviceSlugs } = await import("@/lib/service-meta");
    for (const language of ["fr", "en"] as const) {
      for (const slug of serviceSlugs) {
        const service = servicesContent[language].services[slug];
        expect(service.offerings.length).toBeGreaterThanOrEqual(3);
        for (const offering of service.offerings) {
          expect(offering.quoteMessage.trim()).not.toBe("");
          expect(offering.chips.length).toBeGreaterThan(0);
        }
      }
    }
  });
});
