import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { findLeadMagnetResource, leadMagnetResources, listLeadMagnetRoutes } from "@/data/leadMagnetResources";

const MAXIMUM_LOCAL_FILE_SIZE_IN_BYTES = 10 * 1024 * 1024;
const projectRoot = process.cwd();

describe("ressources de lead magnet", () => {
  it("ont chacune un identifiant d'adresse unique, en minuscules et tirets", () => {
    const slugs = leadMagnetResources.map((resource) => resource.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/));
  });

  it("ne référencent que des fichiers du site existants et de moins de 10 Mo, ou des liens https", () => {
    for (const resource of leadMagnetResources) {
      for (const download of resource.downloads) {
        if (download.href.startsWith("/")) {
          const filePath = path.join(projectRoot, "public", download.href);
          expect(download.href.startsWith(`/lead-magnet/${resource.slug}/`)).toBe(true);
          expect(existsSync(filePath)).toBe(true);
          expect(statSync(filePath).size).toBeLessThan(MAXIMUM_LOCAL_FILE_SIZE_IN_BYTES);
        } else {
          expect(download.href).toMatch(/^https:\/\//);
        }
      }
      resource.links.forEach((link) => expect(link.href).toMatch(/^https:\/\//));
    }
  });

  it("retrouve une ressource par son identifiant, et rien pour un identifiant inconnu", () => {
    expect(findLeadMagnetResource("ressource-qui-n-existe-pas")).toBeUndefined();
    for (const resource of leadMagnetResources) {
      expect(findLeadMagnetResource(resource.slug)).toBe(resource);
    }
  });

  it("liste les adresses à pré-rendre hors du sitemap", () => {
    expect(listLeadMagnetRoutes()).toEqual(leadMagnetResources.map((resource) => `/lead-magnet/${resource.slug}`));
  });
});

describe("visibilité par lien seulement", () => {
  it("n'apparaît jamais dans le sitemap", () => {
    expect(readFileSync(path.join(projectRoot, "public", "sitemap.xml"), "utf8")).not.toContain("/lead-magnet");
  });

  it("n'apparaît jamais dans llms.txt", () => {
    expect(readFileSync(path.join(projectRoot, "public", "llms.txt"), "utf8")).not.toContain("/lead-magnet");
  });

  it("demande aux moteurs de ne pas indexer les pages ni les fichiers des ressources", () => {
    const vercelConfiguration = JSON.parse(readFileSync(path.join(projectRoot, "vercel.json"), "utf8")) as {
      headers: Array<{ source: string; headers: Array<{ key: string; value: string }> }>;
    };
    const leadMagnetRule = vercelConfiguration.headers.find((rule) => rule.source === "/lead-magnet/(.*)");

    expect(leadMagnetRule?.headers).toContainEqual({ key: "X-Robots-Tag", value: "noindex, nofollow" });
  });
});
