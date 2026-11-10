import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useResourceAccess } from "@/hooks/useResourceAccess";
import { RESOURCE_ACCESS_STORAGE_KEY } from "@/lib/resource-subscription/resource-access-storage";

describe("useResourceAccess", () => {
  beforeEach(() => window.localStorage.clear());

  it("verrouille tant que rien n'est mémorisé, puis déverrouille et s'en souvient", () => {
    const { result } = renderHook(() => useResourceAccess(false));
    expect(result.current.state).toBe("locked");
    act(() => result.current.unlock("Awa"));
    expect(result.current.state).toBe("unlocked");
    expect(window.localStorage.getItem(RESOURCE_ACCESS_STORAGE_KEY)).toContain("Awa");
    expect(renderHook(() => useResourceAccess(false)).result.current.state).toBe("unlocked");
  });

  it("ouvre tout en développement local", () => {
    expect(renderHook(() => useResourceAccess(true)).result.current.state).toBe("unlocked");
  });
});
