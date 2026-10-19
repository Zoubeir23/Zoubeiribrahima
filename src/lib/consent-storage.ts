export const CONSENT_STORAGE_KEY = "cookieConsentPreferences";

export interface ConsentPreferences {
  analytics: boolean;
  externalContent: boolean;
}

export const ACCEPT_ALL_PREFERENCES: ConsentPreferences = { analytics: true, externalContent: true };
export const REFUSE_ALL_PREFERENCES: ConsentPreferences = { analytics: false, externalContent: false };

const isConsentPreferences = (value: unknown): value is ConsentPreferences =>
  typeof value === "object" &&
  value !== null &&
  typeof (value as ConsentPreferences).analytics === "boolean" &&
  typeof (value as ConsentPreferences).externalContent === "boolean";

export const readConsentPreferences = (storage: Pick<Storage, "getItem">): ConsentPreferences | null => {
  try {
    const storedValue = storage.getItem(CONSENT_STORAGE_KEY);
    if (storedValue === null) {
      return null;
    }
    const parsedValue: unknown = JSON.parse(storedValue);
    return isConsentPreferences(parsedValue)
      ? { analytics: parsedValue.analytics, externalContent: parsedValue.externalContent }
      : null;
  } catch {
    return null;
  }
};

export const writeConsentPreferences = (
  storage: Pick<Storage, "setItem">,
  preferences: ConsentPreferences,
): void => {
  try {
    storage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
  } catch {
    // Storage can be blocked (private mode); the choice then lasts for the session only.
  }
};
