import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  findResourceGuide,
  listResourceGuideRoutes,
  listResourceGuideSlugs,
  resourceGuides,
} from "@/data/resourceGuides";
import { resourceBrandLogos } from "@/data/resourceBrandLogos";
import { loadResourceGuideText } from "@/data/resourceGuideText";

const resourcesDirectory = path.join(process.cwd(), "src", "data", "resources");

describe("bibliothèque de ressources", () => {
  it("a des identifiants uniques, en minuscules et tirets", () => {
    const slugs = resourceGuides.map((guide) => guide.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/));
  });

  it.each(resourceGuides.map((guide) => guide.slug))("a un texte pour %s, sans tiret cadratin", (slug) => {
    const filePath = path.join(resourcesDirectory, `${slug}.md`);
    expect(existsSync(filePath)).toBe(true);
    expect(readFileSync(filePath, "utf8")).not.toContain("—");
  });

  it("n'a aucun texte orphelin", () => {
    const slugs = new Set(resourceGuides.map((guide) => guide.slug));
    readdirSync(resourcesDirectory).forEach((fileName) => expect(slugs.has(fileName.replace(/\.md$/, ""))).toBe(true));
  });

  it("cite une source en https pour chaque ressource", () => {
    resourceGuides.forEach((guide) => expect(guide.sourceUrl).toMatch(/^https:\/\//));
  });

  it("met chaque commande et chaque prompt dans un bloc de code", async () => {
    for (const guide of resourceGuides) {
      const text = await loadResourceGuideText(guide.slug);
      const outsideCodeBlocks = text.replace(/```[\s\S]*?```/g, "");
      expect(outsideCodeBlocks).not.toMatch(/^\s*(npx|\/[a-z-]+ )/m);
      expect(text).toContain("```");
    }
  });

  it("retrouve une ressource par son identifiant, et rien pour un identifiant inconnu", () => {
    expect(findResourceGuide("inconnue")).toBeUndefined();
    resourceGuides.forEach((guide) => expect(findResourceGuide(guide.slug)).toBe(guide));
  });

  it("liste une adresse par ressource sous /ressources", () => {
    expect(listResourceGuideRoutes()).toEqual(resourceGuides.map((guide) => `/ressources/${guide.slug}`));
  });

  it("donne l'ensemble des identifiants connus, pour la fonction serveur", () => {
    expect([...listResourceGuideSlugs()]).toEqual(resourceGuides.map((guide) => guide.slug));
  });

  it("refuse de charger le texte d'une ressource inconnue", async () => {
    await expect(loadResourceGuideText("inconnue")).rejects.toThrow();
  });

  it("associe chaque ressource à une à sept marques connues, sans doublon", () => {
    resourceGuides.forEach((guide) => {
      expect(guide.brands.length, guide.slug).toBeGreaterThanOrEqual(1);
      expect(guide.brands.length, guide.slug).toBeLessThanOrEqual(7);
      expect(new Set(guide.brands).size, guide.slug).toBe(guide.brands.length);
      guide.brands.forEach((brand) => expect(resourceBrandLogos[brand], `${guide.slug}: ${brand}`).toBeDefined());
    });
  });

  it("montre le logo GitHub sur chaque ressource qui cite GitHub", async () => {
    for (const guide of resourceGuides) {
      const text = await loadResourceGuideText(guide.slug);
      if (/github/i.test(text)) {
        expect(guide.brands, guide.slug).toContain("github");
      }
    }
  });

  it("a un fichier de logo léger et sans script pour chaque marque", () => {
    Object.entries(resourceBrandLogos).forEach(([brand, logo]) => {
      const filePath = path.join(process.cwd(), "public", logo.path);
      expect(existsSync(filePath), brand).toBe(true);
      const svg = readFileSync(filePath, "utf8");
      expect(svg.length, brand).toBeLessThanOrEqual(12 * 1024);
      expect(svg, brand).not.toMatch(/<script|onload=|href="https?:/i);
    });
  });
});
