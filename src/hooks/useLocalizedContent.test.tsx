import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { LanguageProvider, useLanguage } from "@/hooks/useLanguage";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

const wrapper = ({ children }: { children: ReactNode }) => <LanguageProvider>{children}</LanguageProvider>;

const sampleContent = {
  fr: { greeting: "Bonjour" },
  en: { greeting: "Hello" },
};

describe("useLocalizedContent", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns the French entry by default", () => {
    const { result } = renderHook(() => useLocalizedContent(sampleContent), { wrapper });
    expect(result.current).toBe(sampleContent.fr);
  });

  it("returns the English entry after switching language", () => {
    const { result } = renderHook(
      () => ({ content: useLocalizedContent(sampleContent), language: useLanguage() }),
      { wrapper },
    );
    act(() => result.current.language.setLanguage("en"));
    expect(result.current.content).toBe(sampleContent.en);
  });
});
