import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import ConsentProvider from "@/components/consent/ConsentProvider";
import { blogReadingPaths } from "@/data/blogReadingPaths";
import { LanguageProvider } from "@/hooks/useLanguage";
import Blog from "@/pages/Blog";

const renderHub = () =>
  render(
    <LanguageProvider>
      <ConsentProvider>
        <MemoryRouter initialEntries={["/blog"]}>
          <Blog />
        </MemoryRouter>
      </ConsentProvider>
    </LanguageProvider>,
  );

describe("blog hub", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("shows the reading paths", () => {
    renderHub();
    expect(screen.getByRole("heading", { level: 2, name: /suivez un parcours/i })).toBeInTheDocument();
  });

  it("counts the real number of reading paths in the statistics", () => {
    renderHub();
    const label = screen.getByText("Parcours de lecture", { selector: "p.uppercase" });
    expect(label.previousElementSibling).toHaveTextContent(String(blogReadingPaths.length));
  });

  it("lists the SaaS category filter", () => {
    renderHub();
    expect(screen.getByRole("button", { name: /^SaaS/ })).toBeInTheDocument();
  });
});
