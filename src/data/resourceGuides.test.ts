import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  findResourceGuide,
  listResourceGuideRoutes,
  listResourceGuideSlugs,
  resourceGuides,
} from "@/data/resourceGuides";
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
});
