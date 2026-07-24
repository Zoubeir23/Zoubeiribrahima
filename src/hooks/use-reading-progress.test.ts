import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useReadingProgress } from "@/hooks/use-reading-progress";

function setScroll(scrollY: number, scrollHeight: number, innerHeight: number) {
  Object.defineProperty(window, "scrollY", { value: scrollY, configurable: true });
  Object.defineProperty(document.documentElement, "scrollHeight", { value: scrollHeight, configurable: true });
  Object.defineProperty(window, "innerHeight", { value: innerHeight, configurable: true });
}

describe("useReadingProgress", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("tracks the maximum scroll position reached", () => {
    setScroll(0, 2000, 1000);
    const { result } = renderHook(({ key }) => useReadingProgress(key), { initialProps: { key: "article-a" } });

    act(() => {
      setScroll(500, 2000, 1000);
      window.dispatchEvent(new Event("scroll"));
    });
    expect(result.current).toBe(50);

    act(() => {
      setScroll(100, 2000, 1000);
      window.dispatchEvent(new Event("scroll"));
    });
    expect(result.current).toBe(50);
  });

  it("resets to 0 when the reset key (article slug) changes", () => {
    setScroll(1000, 2000, 1000);
    const { result, rerender } = renderHook(({ key }) => useReadingProgress(key), {
      initialProps: { key: "article-a" },
    });
    expect(result.current).toBe(100);

    setScroll(0, 2000, 1000);
    rerender({ key: "article-b" });
    expect(result.current).toBe(0);
  });
});
