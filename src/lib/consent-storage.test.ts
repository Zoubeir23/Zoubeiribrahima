import { describe, expect, it } from "vitest";
import {
  CONSENT_STORAGE_KEY,
  readConsentChoice,
  writeConsentChoice,
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

describe("readConsentChoice", () => {
  it("returns unset when nothing is stored", () => {
    expect(readConsentChoice(createMemoryStorage())).toBe("unset");
  });

  it("returns the stored accepted choice", () => {
    expect(readConsentChoice(createMemoryStorage("accepted"))).toBe("accepted");
  });

  it("returns the stored refused choice", () => {
    expect(readConsentChoice(createMemoryStorage("refused"))).toBe("refused");
  });

  it("falls back to unset when the stored value is unknown", () => {
    expect(readConsentChoice(createMemoryStorage("maybe"))).toBe("unset");
  });

  it("falls back to unset when storage throws", () => {
    const throwingStorage = {
      getItem: () => {
        throw new Error("storage blocked");
      },
    };
    expect(readConsentChoice(throwingStorage)).toBe("unset");
  });
});

describe("writeConsentChoice", () => {
  it("persists the choice so it can be read back", () => {
    const storage = createMemoryStorage();
    writeConsentChoice(storage, "accepted");
    expect(readConsentChoice(storage)).toBe("accepted");
  });

  it("does not throw when storage is unavailable", () => {
    const throwingStorage = {
      setItem: () => {
        throw new Error("quota exceeded");
      },
    };
    expect(() => writeConsentChoice(throwingStorage, "refused")).not.toThrow();
  });
});
