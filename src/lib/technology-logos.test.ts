import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getTechnologyEmoji, TECHNOLOGY_FALLBACK_EMOJI } from "@/lib/icon-sets";
import { experienceContent } from "@/lib/experience-content";
import { projectsContent } from "@/lib/projects-content";
import { serviceSlugs } from "@/lib/service-meta";
import { servicesContent } from "@/lib/services-content";
import { TECHNOLOGY_LOGO_PATHS, getTechnologyLogo } from "@/lib/technology-logos";

const publicFile = (relativePath: string) => join(process.cwd(), "public", relativePath);

describe("getTechnologyLogo", () => {
  it("returns a logo for the technologies of the offer", () => {
    for (const name of ["Django", "Flutter", "Dart", "React", "TypeScript", "Python", "PostgreSQL", "Supabase", "Vercel"]) {
      expect(getTechnologyLogo(name), name).not.toBeNull();
    }
  });

  it("ignores letter case and spacing", () => {
    expect(getTechnologyLogo("  DJANGO ")).toBe(getTechnologyLogo("Django"));
  });

  it("maps close variants to the same logo", () => {
    expect(getTechnologyLogo("React 18")).toBe(getTechnologyLogo("React"));
    expect(getTechnologyLogo("React Native")).toBe(getTechnologyLogo("React"));
    expect(getTechnologyLogo("TailwindCSS")).toBe(getTechnologyLogo("Tailwind CSS"));
    expect(getTechnologyLogo("Claude Code")).not.toBeNull();
    expect(getTechnologyLogo("VS Code")).toBe(getTechnologyLogo("Visual Studio Code"));
  });

  it("returns null when no logo exists", () => {
    expect(getTechnologyLogo("Clean Code")).toBeNull();
    expect(getTechnologyLogo("Something unknown")).toBeNull();
  });
});

describe("technology logo files", () => {
  it("exist in the public folder for every mapped path", () => {
    const missing = Object.values(TECHNOLOGY_LOGO_PATHS).filter((path) => !existsSync(publicFile(path)));
    expect(missing).toEqual([]);
  });

  it("are plain SVG images without scripts", () => {
    for (const path of new Set(Object.values(TECHNOLOGY_LOGO_PATHS))) {
      const content = readFileSync(publicFile(path), "utf-8").toLowerCase();
      expect(content.includes("<svg"), path).toBe(true);
      expect(content.includes("<script"), path).toBe(false);
    }
  });
});

describe("technology coverage", () => {
  it("gives every technology shown on the site a logo or a specific emoji", () => {
    const names = new Set<string>();
    for (const language of ["fr", "en"] as const) {
      for (const slug of serviceSlugs) {
        servicesContent[language].services[slug].technologies.forEach((name) => names.add(name));
      }
      const projects = projectsContent[language];
      [projects.featured, ...projects.others].forEach((project) => project.tags.forEach((name) => names.add(name)));
      experienceContent[language].experiences.forEach((item) => item.tags.forEach((name) => names.add(name)));
    }
    const uncovered = [...names].filter(
      (name) => getTechnologyLogo(name) === null && getTechnologyEmoji(name) === TECHNOLOGY_FALLBACK_EMOJI,
    );
    expect(uncovered).toEqual([]);
  });
});
