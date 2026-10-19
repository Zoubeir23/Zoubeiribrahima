import { describe, expect, it } from "vitest";
import {
  DOMAIN_EMOJIS,
  FAQ_EMOJIS,
  OFFERING_CHIP_EMOJIS,
  PROCESS_EMOJIS,
  REASON_EMOJIS,
  SKILL_CARD_EMOJIS,
  TECHNOLOGY_FALLBACK_EMOJI,
  getTechnologyEmoji,
} from "@/lib/icon-sets";
import { experienceContent } from "@/lib/experience-content";
import { landingContent } from "@/lib/landing-content";
import { projectsContent } from "@/lib/projects-content";
import { serviceSlugs } from "@/lib/service-meta";
import { servicesContent } from "@/lib/services-content";
import { skillsContent } from "@/lib/skills-content";

const languages = ["fr", "en"] as const;

describe("icon sets stay aligned with the content", () => {
  it("has one emoji per FAQ question", () => {
    for (const language of languages) {
      expect(FAQ_EMOJIS).toHaveLength(landingContent[language].faq.items.length);
    }
  });

  it("has one emoji per process step and per reason", () => {
    for (const language of languages) {
      expect(PROCESS_EMOJIS).toHaveLength(landingContent[language].process.steps.length);
      expect(REASON_EMOJIS).toHaveLength(landingContent[language].reasons.items.length);
    }
  });

  it("has one emoji per skill card and per domain", () => {
    for (const language of languages) {
      expect(SKILL_CARD_EMOJIS).toHaveLength(skillsContent[language].cards.length);
      expect(DOMAIN_EMOJIS).toHaveLength(skillsContent[language].domains.length);
    }
  });

  it("has one emoji per chip of every service offering", () => {
    for (const language of languages) {
      for (const slug of serviceSlugs) {
        const offerings = servicesContent[language].services[slug].offerings;
        expect(OFFERING_CHIP_EMOJIS[slug]).toHaveLength(offerings.length);
        offerings.forEach((offering, offeringIndex) => {
          expect(OFFERING_CHIP_EMOJIS[slug][offeringIndex]).toHaveLength(offering.chips.length);
        });
      }
    }
  });
});

describe("getTechnologyEmoji", () => {
  it("knows an emoji for every technology shown on the site", () => {
    const names = new Set<string>();
    for (const language of languages) {
      for (const slug of serviceSlugs) {
        servicesContent[language].services[slug].technologies.forEach((name) => names.add(name));
      }
      const projects = projectsContent[language];
      [projects.featured, ...projects.others].forEach((project) => project.tags.forEach((name) => names.add(name)));
      experienceContent[language].experiences.forEach((item) => item.tags.forEach((name) => names.add(name)));
    }
    const missing = [...names].filter((name) => getTechnologyEmoji(name) === TECHNOLOGY_FALLBACK_EMOJI);
    expect(missing).toEqual([]);
  });

  it("ignores letter case and falls back for unknown names", () => {
    expect(getTechnologyEmoji("REACT")).toBe(getTechnologyEmoji("React"));
    expect(getTechnologyEmoji("Something unknown")).toBe(TECHNOLOGY_FALLBACK_EMOJI);
  });
});
