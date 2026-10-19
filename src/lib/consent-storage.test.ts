import { describe, expect, it } from "vitest";
import {
  ACCEPT_ALL_PREFERENCES,
  CONSENT_STORAGE_KEY,
  REFUSE_ALL_PREFERENCES,
  readConsentPreferences,
  writeConsentPreferences,
} from "@/lib/consent-storage";

const createMemoryStorage = (initialValue?: string) => {
  const values = new Map<string, string>();
  if (initialValue !== undefined) {
    values.set(CONSENT_STORAGE_KEY, initialValue);
  }
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value);
    },
  };
};

describe("readConsentPreferences", () => {
  it("returns null when nothing is stored", () => {
    expect(readConsentPreferences(createMemoryStorage())).toBeNull();
  });

  it("returns stored preferences", () => {
    const stored = JSON.stringify({ analytics: true, externalContent: false });
    expect(readConsentPreferences(createMemoryStorage(stored))).toEqual({ analytics: true, externalContent: false });
  });

  it("returns null when the stored value is not valid JSON", () => {
    expect(readConsentPreferences(createMemoryStorage("not json"))).toBeNull();
  });

  it("returns null when the stored shape is wrong", () => {
    expect(readConsentPreferences(createMemoryStorage(JSON.stringify({ analytics: "yes" })))).toBeNull();
  });

  it("returns null when storage throws", () => {
    const throwingStorage = {
      getItem: () => {
        throw new Error("storage blocked");
      },
    };
    expect(readConsentPreferences(throwingStorage)).toBeNull();
  });
});

describe("writeConsentPreferences", () => {
  it("persists preferences so they can be read back", () => {
    const storage = createMemoryStorage();
    writeConsentPreferences(storage, ACCEPT_ALL_PREFERENCES);
    expect(readConsentPreferences(storage)).toEqual(ACCEPT_ALL_PREFERENCES);
  });

  it("does not throw when storage is unavailable", () => {
    const throwingStorage = {
      setItem: () => {
        throw new Error("quota exceeded");
      },
    };
    expect(() => writeConsentPreferences(throwingStorage, REFUSE_ALL_PREFERENCES)).not.toThrow();
  });
});

describe("preset preferences", () => {
  it("accepts every category when accepting all", () => {
    expect(ACCEPT_ALL_PREFERENCES).toEqual({ analytics: true, externalContent: true });
  });

  it("refuses every category when refusing all", () => {
    expect(REFUSE_ALL_PREFERENCES).toEqual({ analytics: false, externalContent: false });
  });
});
