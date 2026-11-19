import type { ResourceGuidePreview } from "@/lib/resource-guide-preview/split-resource-guide-preview";

// Public preview of each resource guide, built at compile time by the Vite plugin resource-guide-preview. Loaded
// eagerly so the prerendered HTML contains it: search engines can read and index the beginning of every guide.

export type PublicResourceGuidePreview = Pick<ResourceGuidePreview, "previewMarkdown" | "lockedSectionTitles">;

const resourceGuidePreviews = import.meta.glob<PublicResourceGuidePreview>("./resources/*.md", {
  query: "?resource-guide-preview",
  import: "default",
  eager: true,
});

export function findResourceGuidePreview(slug: string): PublicResourceGuidePreview | undefined {
  return resourceGuidePreviews[`./resources/${slug}.md`];
}
