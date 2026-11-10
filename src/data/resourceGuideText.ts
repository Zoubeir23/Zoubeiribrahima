// Loads the text of a resource guide on demand, in its own chunk, once the visitor has unlocked the library.
const resourceGuideTextLoaders = import.meta.glob<string>("./resources/*.md", { query: "?raw", import: "default" });

export async function loadResourceGuideText(slug: string): Promise<string> {
  const loadText = resourceGuideTextLoaders[`./resources/${slug}.md`];
  if (!loadText) {
    throw new Error(`No text file for the resource guide "${slug}"`);
  }
  return loadText();
}
