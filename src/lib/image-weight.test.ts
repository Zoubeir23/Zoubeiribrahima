import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = path.resolve(__dirname, "../..");
const MAXIMUM_DISPLAYED_IMAGE_BYTES = 60 * 1024;

const listSourceFiles = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return listSourceFiles(entryPath);
    }
    return /\.tsx$/.test(entry.name) && !/\.test\./.test(entry.name) ? [entryPath] : [];
  });

const referencedPublicImages = listSourceFiles(path.join(projectRoot, "src")).flatMap((file) =>
  [...readFileSync(file, "utf8").matchAll(/src="(\/[^"]+\.(?:png|jpe?g|webp))"/g)].map(([, imagePath]) => ({
    file: path.relative(projectRoot, file),
    imagePath,
  })),
);

describe("images displayed by components", () => {
  it("finds the images the components display", () => {
    expect(referencedPublicImages.length).toBeGreaterThan(0);
  });

  it.each(referencedPublicImages.map(({ file, imagePath }) => [file, imagePath]))(
    "%s displays %s as a light file",
    (_file, imagePath) => {
      const { size } = statSync(path.join(projectRoot, "public", imagePath));
      expect(size).toBeLessThanOrEqual(MAXIMUM_DISPLAYED_IMAGE_BYTES);
    },
  );
});

describe("critical resources of index.html", () => {
  const indexHtml = readFileSync(path.join(projectRoot, "index.html"), "utf8");

  it("preloads only fonts, so images do not compete with the first render", () => {
    const preloadedTypes = [...indexHtml.matchAll(/<link rel="preload" as="([^"]+)"/g)].map(([, type]) => type);
    expect(preloadedTypes.length).toBeGreaterThan(0);
    expect(new Set(preloadedTypes)).toEqual(new Set(["font"]));
  });

  it("uses the vector favicon and a compact touch icon", () => {
    expect(indexHtml).toContain('<link rel="icon" type="image/svg+xml" href="/favicon.svg" />');
    const touchIcon = /<link rel="apple-touch-icon"[^>]*href="([^"]+)"/.exec(indexHtml)?.[1];
    expect(touchIcon).toBeDefined();
    expect(statSync(path.join(projectRoot, "public", touchIcon!)).size).toBeLessThanOrEqual(MAXIMUM_DISPLAYED_IMAGE_BYTES);
  });
});
