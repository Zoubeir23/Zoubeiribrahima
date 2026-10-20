import { fireEvent, render, screen } from "@testing-library/react";
import { findEmojiElement } from "@/test/emoji-query";
import { describe, expect, it } from "vitest";
import ServiceIllustration from "@/components/ServiceIllustration";
import { serviceMeta } from "@/lib/service-meta";

describe("ServiceIllustration", () => {
  it("renders the illustration image of the service", () => {
    const { container } = render(<ServiceIllustration slug="saas" />);
    const image = container.querySelector("img");
    expect(image).not.toBeNull();
    expect(image).toHaveAttribute("src", serviceMeta.saas.illustrationPath);
    expect(image).toHaveAttribute("alt", "");
  });

  it("falls back to the emoji when the image cannot be loaded", () => {
    const { container } = render(<ServiceIllustration slug="saas" />);
    fireEvent.error(container.querySelector("img") as HTMLImageElement);
    expect(container.querySelector("img")).toBeNull();
    expect(findEmojiElement(document, serviceMeta.saas.emoji)).toBeInTheDocument();
  });

  it("hides the decorative emoji from assistive technologies", () => {
    const { container } = render(<ServiceIllustration slug="saas" />);
    fireEvent.error(container.querySelector("img") as HTMLImageElement);
    expect(findEmojiElement(document, serviceMeta.saas.emoji)).toHaveAttribute("aria-hidden", "true");
  });
});
