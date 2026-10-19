import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { LanguageProvider, useLanguage } from "@/hooks/useLanguage";
import { useLandingContent } from "@/hooks/useLandingContent";
import { landingContent } from "@/lib/landing-content";

const wrapper = ({ children }: { children: ReactNode }) => <LanguageProvider>{children}</LanguageProvider>;

describe("useLandingContent", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns French content by default", () => {
    const { result } = renderHook(() => useLandingContent(), { wrapper });
    expect(result.current).toBe(landingContent.fr);
  });

  it("switches to English when the language changes", () => {
    const { result } = renderHook(
      () => ({ content: useLandingContent(), language: useLanguage() }),
      { wrapper },
    );
    act(() => result.current.language.setLanguage("en"));
    expect(result.current.content).toBe(landingContent.en);
  });
});
