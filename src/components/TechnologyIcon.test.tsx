import { fireEvent, render, screen } from "@testing-library/react";
import { findEmojiElement } from "@/test/emoji-query";
import { describe, expect, it } from "vitest";
import TechnologyIcon from "@/components/TechnologyIcon";
import { getTechnologyLogo } from "@/lib/technology-logos";

describe("TechnologyIcon", () => {
  it("shows the brand logo for a known technology", () => {
    const { container } = render(<TechnologyIcon name="Django" />);
    const image = container.querySelector("img");
    expect(image).not.toBeNull();
    expect(image).toHaveAttribute("src", getTechnologyLogo("Django"));
  });

  it("keeps the logo decorative so the label is not announced twice", () => {
    const { container } = render(<TechnologyIcon name="Flutter" />);
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
  });

  it("reserves the image size to avoid layout shifts", () => {
    const { container } = render(<TechnologyIcon name="Dart" />);
    const image = container.querySelector("img");
    expect(image).toHaveAttribute("width");
    expect(image).toHaveAttribute("height");
  });

  it("falls back to a hidden emoji when there is no logo", () => {
    const { container } = render(<TechnologyIcon name="Clean Code" />);
    expect(container.querySelector("img")).toBeNull();
    expect(findEmojiElement(container, "✨")).toHaveAttribute("aria-hidden", "true");
  });

  it("falls back to the generic emoji for an unknown technology", () => {
    const { container } = render(<TechnologyIcon name="Something unknown" />);
    expect(findEmojiElement(container, "🧩")).toBeInTheDocument();
  });

  it("falls back to the emoji when the logo file fails to load", () => {
    const { container } = render(<TechnologyIcon name="Django" />);
    fireEvent.error(container.querySelector("img") as HTMLImageElement);
    expect(container.querySelector("img")).toBeNull();
    expect(findEmojiElement(container, "🎸")).toBeInTheDocument();
  });
});
