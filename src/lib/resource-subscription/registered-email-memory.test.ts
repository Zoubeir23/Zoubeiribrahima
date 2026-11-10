import { describe, expect, it } from "vitest";
import {
  REGISTERED_EMAIL_STORAGE_KEY,
  hashEmail,
  hasRememberedEmail,
  rememberEmail,
} from "./registered-email-memory";

function createMemoryStorage(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => void values.set(key, value),
  };
}

describe("empreinte des e-mails déjà enregistrés", () => {
  it("calcule une empreinte stable de 64 caractères qui ne contient pas l'adresse", async () => {
    const emailHash = await hashEmail("awa@gmail.com");
    expect(emailHash).toMatch(/^[0-9a-f]{64}$/);
    expect(emailHash).toBe(await hashEmail("awa@gmail.com"));
    expect(emailHash).not.toContain("awa");
  });

  it("donne une empreinte différente pour une autre adresse", async () => {
    expect(await hashEmail("awa@gmail.com")).not.toBe(await hashEmail("moussa@gmail.com"));
  });

  it("retient une empreinte, puis la reconnaît", () => {
    const storage = createMemoryStorage();
    expect(hasRememberedEmail(storage, "a".repeat(64))).toBe(false);
    rememberEmail(storage, "a".repeat(64));
    expect(hasRememberedEmail(storage, "a".repeat(64))).toBe(true);
    expect(hasRememberedEmail(storage, "b".repeat(64))).toBe(false);
  });

  it("ne garde pas deux fois la même empreinte et n'en conserve que 50, les plus récentes", () => {
    const storage = createMemoryStorage();
    rememberEmail(storage, "0".repeat(64));
    rememberEmail(storage, "0".repeat(64));
    expect(JSON.parse(storage.getItem(REGISTERED_EMAIL_STORAGE_KEY) ?? "[]")).toHaveLength(1);
    for (let index = 1; index <= 60; index += 1) rememberEmail(storage, String(index).padStart(64, "0"));
    const kept = JSON.parse(storage.getItem(REGISTERED_EMAIL_STORAGE_KEY) ?? "[]") as string[];
    expect(kept).toHaveLength(50);
    expect(kept).toContain("60".padStart(64, "0"));
    expect(kept).not.toContain("0".repeat(64));
  });

  it.each(["pas du json", "{}", '[1, 2]'])("ignore une valeur illisible (%s)", (storedValue) => {
    expect(hasRememberedEmail(createMemoryStorage({ [REGISTERED_EMAIL_STORAGE_KEY]: storedValue }), "a".repeat(64))).toBe(false);
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
    expect(hasRememberedEmail(blocked, "a".repeat(64))).toBe(false);
    expect(() => rememberEmail(blocked, "a".repeat(64))).not.toThrow();
  });
});
