import { describe, expect, it } from "vitest";
import { RESOURCE_ACCESS_STORAGE_KEY, readResourceAccess, rememberResourceAccess } from "./resource-access-storage";

function createMemoryStorage(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => void values.set(key, value),
  };
}

describe("mémorisation de l'accès aux ressources", () => {
  it("relit l'accès mémorisé", () => {
    const storage = createMemoryStorage();
    rememberResourceAccess(storage, { firstName: "Awa", unlockedIsoDate: "2026-11-10" });
    expect(readResourceAccess(storage)).toEqual({ firstName: "Awa", unlockedIsoDate: "2026-11-10" });
  });

  it.each(["pas du json", "{}", '{"firstName": 3}'])("ignore une valeur illisible (%s)", (storedValue) => {
    expect(readResourceAccess(createMemoryStorage({ [RESOURCE_ACCESS_STORAGE_KEY]: storedValue }))).toBeNull();
  });

  it("ne lève pas d'erreur quand le stockage est bloqué", () => {
    const blocked = {
      getItem: () => {
        throw new Error("bloqué");
      },
      setItem: () => {
        throw new Error("bloqué");
      },
    };
    expect(readResourceAccess(blocked)).toBeNull();
    expect(() => rememberResourceAccess(blocked, { firstName: "Awa", unlockedIsoDate: "2026-11-10" })).not.toThrow();
  });
});
