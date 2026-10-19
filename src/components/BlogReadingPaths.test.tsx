import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import BlogReadingPaths from "@/components/BlogReadingPaths";
import { blogReadingPaths } from "@/data/blogReadingPaths";

const renderPaths = () =>
  render(
    <MemoryRouter>
      <BlogReadingPaths />
    </MemoryRouter>,
  );

describe("BlogReadingPaths", () => {
  it("introduces the section with a level two heading", () => {
    renderPaths();
    expect(screen.getByRole("heading", { level: 2, name: /parcours/i })).toBeInTheDocument();
  });

  it("shows one level three heading per path", () => {
    renderPaths();
    for (const readingPath of blogReadingPaths) {
      expect(screen.getByRole("heading", { level: 3, name: readingPath.title })).toBeInTheDocument();
    }
  });

  it("numbers the articles of a path in reading order", () => {
    renderPaths();
    const launchPath = screen.getByRole("heading", { level: 3, name: "Lancer un SaaS" }).closest("article") as HTMLElement;
    const items = within(launchPath).getAllByRole("listitem");
    expect(items).toHaveLength(4);
    expect(items[0]).toHaveTextContent(/^1/);
    expect(within(items[0]).getByRole("link")).toHaveAttribute("href", "/blog/valider-une-idee-saas-en-30-jours");
  });

  it("starts each path on its first article", () => {
    renderPaths();
    const startLinks = screen.getAllByRole("link", { name: /commencer le parcours/i });
    expect(startLinks).toHaveLength(blogReadingPaths.length);
    expect(startLinks[0]).toHaveAttribute("href", "/blog/valider-une-idee-saas-en-30-jours");
  });
});
