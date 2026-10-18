export const CONSENT_STORAGE_KEY = "externalContentConsent";

export type ConsentChoice = "accepted" | "refused" | "unset";
export type StoredConsentChoice = Exclude<ConsentChoice, "unset">;

const isStoredConsentChoice = (value: string | null): value is StoredConsentChoice =>
  value === "accepted" || value === "refused";

export const readConsentChoice = (storage: Pick<Storage, "getItem">): ConsentChoice => {
  try {
    const storedValue = storage.getItem(CONSENT_STORAGE_KEY);
    return isStoredConsentChoice(storedValue) ? storedValue : "unset";
  } catch {
    return "unset";
  }
};

export const writeConsentChoice = (
  storage: Pick<Storage, "setItem">,
  choice: StoredConsentChoice,
): void => {
  try {
    storage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Storage can be blocked (private mode); the choice then lasts for the session only.
  }
};
