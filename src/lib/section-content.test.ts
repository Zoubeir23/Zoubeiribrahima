import { describe, expect, it } from "vitest";
import { certificationsContent } from "@/lib/certifications-content";
import { contactContent } from "@/lib/contact-content";
import { experienceContent } from "@/lib/experience-content";
import { projectsContent } from "@/lib/projects-content";
import { skillsContent } from "@/lib/skills-content";
import { collectKeyPaths, collectTexts } from "@/test/content-parity";

const contentModules = {
  skills: skillsContent,
  projects: projectsContent,
  experience: experienceContent,
  certifications: certificationsContent,
  contact: contactContent,
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
