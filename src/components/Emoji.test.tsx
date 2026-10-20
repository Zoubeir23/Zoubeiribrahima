import { render, screen } from "@testing-library/react";
import { findEmojiElement } from "@/test/emoji-query";
import { describe, expect, it } from "vitest";
import Emoji from "@/components/Emoji";
import SectionHeading from "@/components/SectionHeading";

describe("Emoji", () => {
  it("renders the symbol hidden from assistive technologies", () => {
    render(<Emoji symbol="🚀" />);
    const icon = findEmojiElement(document, "🚀");
    expect(icon).toHaveAttribute("aria-hidden", "true");
    expect(icon?.tagName.toLowerCase()).toBe("svg");
  });

  it("keeps the accessible name of a labelled link free of the emoji", () => {
    render(
      <a href="#hero">
        <Emoji symbol="🏠" />
        Accueil
      </a>,
    );
    expect(screen.getByRole("link", { name: "Accueil" })).toBeInTheDocument();
  });
});

describe("SectionHeading emoji", () => {
  it("shows a decorative emoji before the title without changing the heading name", () => {
    render(<SectionHeading title="Mes services" emoji="🛠️" />);
    expect(findEmojiElement(document, "🛠️")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByRole("heading", { name: "Mes services" })).toBeInTheDocument();
  });

  it("renders no emoji when none is provided", () => {
    const { container } = render(<SectionHeading title="Mes services" />);
    expect(container.querySelector("[aria-hidden=true]")).toBeNull();
  });

  it("renders a level two heading by default", () => {
    render(<SectionHeading title="Mes services" />);
    expect(screen.getByRole("heading", { level: 2, name: "Mes services" })).toBeInTheDocument();
  });

  it("renders a level one heading on dedicated pages", () => {
    render(<SectionHeading title="Mes services" headingAs="h1" />);
    expect(screen.getByRole("heading", { level: 1, name: "Mes services" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
  });
});

