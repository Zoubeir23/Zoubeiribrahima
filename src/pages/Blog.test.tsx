import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Blog from "@/pages/Blog";

function renderBlog() {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        <Blog />
      </MemoryRouter>
    </HelmetProvider>
  );
}

describe("Blog page", () => {
  it("has an accessible search input", () => {
    renderBlog();
    expect(screen.getByRole("textbox", { name: /rechercher un article/i })).toBeInTheDocument();
  });

  it("filters articles by search term", async () => {
    const user = userEvent.setup();
    renderBlog();

    const search = screen.getByRole("textbox", { name: /rechercher un article/i });
    await user.type(search, "django");

    expect(screen.getByText(/1 article trouvé/i)).toBeInTheDocument();
  });

  it("shows an empty state and can reset filters", async () => {
    const user = userEvent.setup();
    renderBlog();

    const search = screen.getByRole("textbox", { name: /rechercher un article/i });
    await user.type(search, "cette-recherche-ne-matche-rien");

    expect(screen.getByText(/aucun résultat/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /réinitialiser les filtres/i }));
    expect(search).toHaveValue("");
  });
});
