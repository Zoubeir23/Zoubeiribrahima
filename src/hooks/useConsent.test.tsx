import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { CONSENT_STORAGE_KEY } from "@/lib/consent-storage";
import { useConsent } from "@/hooks/useConsent";

describe("useConsent", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("starts unset and reports that a decision is needed", () => {
    const { result } = renderHook(() => useConsent());
    expect(result.current.choice).toBe("unset");
    expect(result.current.hasDecided).toBe(false);
    expect(result.current.canLoadExternalContent).toBe(false);
  });

  it("allows external content after acceptance and persists it", () => {
    const { result } = renderHook(() => useConsent());
    act(() => result.current.accept());
    expect(result.current.choice).toBe("accepted");
    expect(result.current.canLoadExternalContent).toBe(true);
    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBe("accepted");
  });

  it("blocks external content after refusal but marks the decision as made", () => {
    const { result } = renderHook(() => useConsent());
    act(() => result.current.refuse());
    expect(result.current.hasDecided).toBe(true);
    expect(result.current.canLoadExternalContent).toBe(false);
  });

  it("restores a previous choice on mount", () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "accepted");
    const { result } = renderHook(() => useConsent());
    expect(result.current.canLoadExternalContent).toBe(true);
  });
});
