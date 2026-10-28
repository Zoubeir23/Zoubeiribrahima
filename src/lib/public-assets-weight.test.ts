import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blogPosts";

const publicDirectory = path.resolve(__dirname, "../../public");
const MAXIMUM_PUBLIC_FILE_BYTES = 500 * 1024;

const listFiles = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? listFiles(path.join(directory, entry.name)) : [path.join(directory, entry.name)],
  );

// Everything in public/ is deployed and crawlable: source artwork belongs elsewhere.
describe("public assets", () => {
  it("ships no file heavier than 500 KB", () => {
    const heavyFiles = listFiles(publicDirectory)
      .filter((file) => statSync(file).size > MAXIMUM_PUBLIC_FILE_BYTES)
      .map((file) => path.relative(publicDirectory, file));
    expect(heavyFiles).toEqual([]);
  });

  it("ships no design notes or other markdown", () => {
    const markdownFiles = listFiles(publicDirectory).filter((file) => file.endsWith(".md"));
    expect(markdownFiles).toEqual([]);
  });

  it.each([...new Set(blogPosts.map((post) => post.coverImage))])("keeps the cover image %s available", (coverImage) => {
    expect(() => statSync(path.join(publicDirectory, coverImage))).not.toThrow();
  });
});
