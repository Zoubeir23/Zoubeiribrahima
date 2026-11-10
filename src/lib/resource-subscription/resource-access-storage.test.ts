import { describe, expect, it } from "vitest";
import { LEGACY_RESOURCE_ACCESS_STORAGE_KEY, forgetStoredResourceAccess } from "./resource-access-storage";

describe("ancienne mémorisation de l'accès aux ressources", () => {
  it("supprime l'accès que l'ancienne version du site avait mémorisé", () => {
    const values = new Map([[LEGACY_RESOURCE_ACCESS_STORAGE_KEY, '{"firstName":"Awa"}']]);
    forgetStoredResourceAccess({ removeItem: (key: string) => void values.delete(key) });
    expect(values.has(LEGACY_RESOURCE_ACCESS_STORAGE_KEY)).toBe(false);
  });

  it("ne lève pas d'erreur quand le stockage est bloqué", () => {
    const blocked = {
      removeItem: () => {
        throw new Error("bloqué");
      },
    };
    expect(() => forgetStoredResourceAccess(blocked)).not.toThrow();
  });
});
