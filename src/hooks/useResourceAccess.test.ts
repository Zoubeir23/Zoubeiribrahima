import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useResourceAccess } from "@/hooks/useResourceAccess";
import {
  LEGACY_REGISTERED_EMAIL_STORAGE_KEY,
  LEGACY_RESOURCE_ACCESS_STORAGE_KEY,
} from "@/lib/resource-subscription/resource-access-storage";

describe("useResourceAccess", () => {
  beforeEach(() => window.localStorage.clear());

  it("verrouille un guide tant que le formulaire n'est pas rempli, puis le déverrouille", () => {
    const { result } = renderHook(() => useResourceAccess("guide-a", false));
    expect(result.current.state).toBe("locked");
    act(() => result.current.unlock());
    expect(result.current.state).toBe("unlocked");
  });

  it("redemande le formulaire quand le visiteur quitte la page puis revient", () => {
    const firstVisit = renderHook(() => useResourceAccess("guide-a", false));
    act(() => firstVisit.result.current.unlock());
    firstVisit.unmount();

    expect(renderHook(() => useResourceAccess("guide-a", false)).result.current.state).toBe("locked");
  });

  it("n'écrit rien dans le navigateur", () => {
    const { result } = renderHook(() => useResourceAccess("guide-a", false));
    act(() => result.current.unlock());
    expect(window.localStorage.length).toBe(0);
  });

  it("ne garde pas l'accès quand le visiteur passe à un autre guide", () => {
    const { result, rerender } = renderHook(({ slug }) => useResourceAccess(slug, false), {
      initialProps: { slug: "guide-a" },
    });
    act(() => result.current.unlock());
    expect(result.current.state).toBe("unlocked");
    rerender({ slug: "guide-b" });
    expect(result.current.state).toBe("locked");
  });

  it("oublie l'accès mémorisé par l'ancienne version du site", () => {
    window.localStorage.setItem(LEGACY_RESOURCE_ACCESS_STORAGE_KEY, JSON.stringify({ firstName: "Awa" }));
    const { result } = renderHook(() => useResourceAccess("guide-a", false));
    expect(result.current.state).toBe("locked");
    expect(window.localStorage.getItem(LEGACY_RESOURCE_ACCESS_STORAGE_KEY)).toBeNull();
  });

  it("oublie les empreintes d'e-mails que le navigateur retenait avant la base Neon", () => {
    window.localStorage.setItem(LEGACY_REGISTERED_EMAIL_STORAGE_KEY, '["abc"]');
    renderHook(() => useResourceAccess("guide-a", false));
    expect(window.localStorage.getItem(LEGACY_REGISTERED_EMAIL_STORAGE_KEY)).toBeNull();
  });

  it("ouvre tout en développement local", () => {
    expect(renderHook(() => useResourceAccess("guide-a", true)).result.current.state).toBe("unlocked");
  });
});
