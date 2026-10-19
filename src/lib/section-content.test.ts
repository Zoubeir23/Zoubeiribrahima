import { describe, expect, it } from "vitest";
import { certificationsContent } from "@/lib/certifications-content";
import { contactContent } from "@/lib/contact-content";
import { experienceContent } from "@/lib/experience-content";
import { legalContent } from "@/lib/legal-content";
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
  legal: legalContent,
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
          expect(offering.emoji.trim()).not.toBe("");
          expect(offering.chips.length).toBeGreaterThan(0);
        }
      }
    }
  });
});

describe("legal content", () => {
  it("documents what the site really uses in both languages", () => {
    for (const language of ["fr", "en"] as const) {
      const privacyText = collectTexts(legalContent[language].privacy).join(" ");
      for (const provider of ["Vercel", "Formspree", "Calendly", "WhatsApp"]) {
        expect(privacyText).toContain(provider);
      }
      expect(privacyText).toContain("Zoubeiribrahima@gmail.com");
    }
  });

  it("gives every section a title and at least one paragraph", () => {
    for (const language of ["fr", "en"] as const) {
      for (const document of [legalContent[language].privacy, legalContent[language].terms]) {
        expect(document.sections.length).toBeGreaterThanOrEqual(6);
        for (const section of document.sections) {
          expect(section.title.trim()).not.toBe("");
          expect(section.paragraphs.length).toBeGreaterThan(0);
        }
      }
    }
  });
});

describe("skills stack from the CV", () => {
  const expectedStackItems = [
    "JavaScript", "Python", "PHP", "Java", "SQL",
    "React", "Tailwind CSS",
    "Node.js", "Django", "Laravel",
    "PostgreSQL", "Supabase", "MySQL",
    "Git", "GitHub", "Claude Code", "VS Code", "Warp",
  ];

  it("lists every language, framework, database and tool of the CV in both languages", () => {
    for (const language of ["fr", "en"] as const) {
      const items = skillsContent[language].stack.groups.flatMap((group) => group.items);
      for (const expected of expectedStackItems) {
        expect(items, `${language}: ${expected}`).toContain(expected);
      }
    }
  });

  it("groups the stack into languages, frontend, backend, databases, tools and methodologies", () => {
    for (const language of ["fr", "en"] as const) {
      expect(skillsContent[language].stack.groups).toHaveLength(6);
    }
  });
});

describe("experience content follows the CV", () => {
  const findExperience = (language: "fr" | "en", company: string) =>
    experienceContent[language].experiences.find((item) => item.company === company);

  it("marks the HooYia internship as finished and Snapfolioo as ongoing", () => {
    for (const language of ["fr", "en"] as const) {
      expect(findExperience(language, "HooYia")?.isCurrent, `${language} HooYia`).toBe(false);
      expect(findExperience(language, "Snapfolioo")?.isCurrent, `${language} Snapfolioo`).toBe(true);
    }
  });

  it("states the three month duration of the HooYia internship", () => {
    for (const language of ["fr", "en"] as const) {
      const period = findExperience(language, "HooYia")?.period ?? "";
      expect(period).toMatch(/3/);
      expect(period).not.toMatch(/présent|present/i);
    }
  });

  it("mentions the authentication and export details of Snapfolioo", () => {
    for (const language of ["fr", "en"] as const) {
      const description = findExperience(language, "Snapfolioo")?.description ?? "";
      expect(description).toContain("Google OAuth");
      expect(description).toContain("PDF");
    }
  });
});

