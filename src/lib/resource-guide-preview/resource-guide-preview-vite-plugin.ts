import { readFile } from "node:fs/promises";
import type { Plugin } from "vite";
import { splitResourceGuidePreview } from "./split-resource-guide-preview";

// Importing a guide with "?resource-guide-preview" gives only its public preview and the titles of the locked
// sections, never the locked text. The page can then show the preview in the prerendered HTML without shipping the
// whole guide with it. The full text still loads on demand ("?raw") once the visitor has unlocked the guide.

export const RESOURCE_GUIDE_PREVIEW_QUERY = "resource-guide-preview";

export function resourceGuidePreviewPlugin(): Plugin {
  return {
    name: "resource-guide-preview",
    enforce: "pre",
    async load(moduleIdentifier) {
      const [filePath, query] = moduleIdentifier.split("?");
      if (query !== RESOURCE_GUIDE_PREVIEW_QUERY || !filePath.endsWith(".md")) return null;

      this.addWatchFile(filePath);
      const { previewMarkdown, lockedSectionTitles } = splitResourceGuidePreview(await readFile(filePath, "utf8"));
      return `export default ${JSON.stringify({ previewMarkdown, lockedSectionTitles })};`;
    },
  };
}
