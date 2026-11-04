import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import BlogArticleCallToAction from "@/components/BlogArticleCallToAction";

const renderCallToAction = (category?: string) =>
  render(
    <MemoryRouter>
      <BlogArticleCallToAction category={category} />
    </MemoryRouter>,
  );

describe("BlogArticleCallToAction", () => {
  it.each([
    ["saas", "/services/saas"],
    ["python", "/services/web-applications"],
    ["devops", "/services/web-applications"],
    ["frontend", "/services/portfolio-websites"],
  ])("links a %s article to the matching service page", (category, servicePath) => {
    renderCallToAction(category);
    const serviceLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.startsWith("/services/"));
    expect(serviceLinks.map((link) => link.getAttribute("href"))).toEqual([servicePath]);
  });

  it("links only to the contact page when the category has no matching service", () => {
    renderCallToAction("ai");
    expect(screen.getAllByRole("link").map((link) => link.getAttribute("href"))).toEqual(["/contact"]);
  });
});
