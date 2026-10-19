import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Reveal from "@/components/Reveal";

type ObserverCallback = (entries: Array<Pick<IntersectionObserverEntry, "isIntersecting" | "target">>) => void;

let observerCallback: ObserverCallback | null = null;
const observe = vi.fn();
const unobserve = vi.fn();
const disconnect = vi.fn();

class FakeIntersectionObserver {
  constructor(callback: ObserverCallback) {
    observerCallback = callback;
  }
  observe = observe;
  unobserve = unobserve;
  disconnect = disconnect;
}

const originalMatchMedia = window.matchMedia;

describe("Reveal", () => {
  beforeEach(() => {
    observerCallback = null;
    observe.mockClear();
    unobserve.mockClear();
    disconnect.mockClear();
    vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    window.matchMedia = originalMatchMedia;
  });

  it("starts hidden and waits for the element to enter the viewport", () => {
    render(<Reveal>content</Reveal>);
    expect(screen.getByText("content")).toHaveClass("reveal");
    expect(screen.getByText("content")).not.toHaveClass("is-visible");
    expect(observe).toHaveBeenCalledTimes(1);
  });

  it("becomes visible once and stops observing when it intersects", () => {
    render(<Reveal>content</Reveal>);
    const element = screen.getByText("content");
    act(() => observerCallback?.([{ isIntersecting: true, target: element }]));
    expect(element).toHaveClass("is-visible");
    expect(unobserve).toHaveBeenCalledWith(element);
  });

  it("stays hidden while the element is outside the viewport", () => {
    render(<Reveal>content</Reveal>);
    const element = screen.getByText("content");
    act(() => observerCallback?.([{ isIntersecting: false, target: element }]));
    expect(element).not.toHaveClass("is-visible");
  });

  it("shows content immediately when IntersectionObserver is unavailable", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    render(<Reveal>content</Reveal>);
    expect(screen.getByText("content")).toHaveClass("is-visible");
  });

  it("shows content immediately for visitors who prefer reduced motion", () => {
    window.matchMedia = ((query: string) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    })) as unknown as typeof window.matchMedia;
    render(<Reveal>content</Reveal>);
    expect(screen.getByText("content")).toHaveClass("is-visible");
    expect(observe).not.toHaveBeenCalled();
  });

  it("applies the stagger delay as a css variable", () => {
    render(<Reveal delaySeconds={0.2}>content</Reveal>);
    expect(screen.getByText("content").style.getPropertyValue("--reveal-delay")).toBe("0.2s");
  });

  it("renders the requested element type and class names", () => {
    render(
      <Reveal as="li" className="extra">
        content
      </Reveal>,
    );
    const element = screen.getByText("content");
    expect(element.tagName).toBe("LI");
    expect(element).toHaveClass("extra", "reveal");
  });
});
