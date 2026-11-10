import { describe, expect, it } from "vitest";
import {
  LEGACY_REGISTERED_EMAIL_STORAGE_KEY,
  LEGACY_RESOURCE_ACCESS_STORAGE_KEY,
  forgetStoredResourceAccess,
} from "./resource-access-storage";

describe("anciennes mémorisations du navigateur pour les ressources", () => {
  it("supprime l'accès mémorisé par l'ancienne version du site", () => {
    const values = new Map([[LEGACY_RESOURCE_ACCESS_STORAGE_KEY, '{"firstName":"Awa"}']]);
    forgetStoredResourceAccess({ removeItem: (key: string) => void values.delete(key) });
    expect(values.has(LEGACY_RESOURCE_ACCESS_STORAGE_KEY)).toBe(false);
  });

  it("supprime aussi les empreintes d'e-mails que le navigateur retenait avant la base Neon", () => {
    const values = new Map([[LEGACY_REGISTERED_EMAIL_STORAGE_KEY, '["abc"]'], ["language", "fr"]]);
    forgetStoredResourceAccess({ removeItem: (key: string) => void values.delete(key) });
    expect(values.has(LEGACY_REGISTERED_EMAIL_STORAGE_KEY)).toBe(false);
    expect(values.get("language")).toBe("fr");
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
