// Remembers in the browser which emails were already registered, so a visitor who types the same email again for
// another guide is not sent to Resend a second time. Only a SHA-256 fingerprint is kept, never the address: the
// list can be compared against a typed email but cannot be read back. It unlocks nothing: the form is still asked
// for every visit. Storage can be missing or blocked (private window): the email is then simply sent again.

export const REGISTERED_EMAIL_STORAGE_KEY = "registeredResourceEmails";
const MAXIMUM_REMEMBERED_EMAILS = 50;

export async function hashEmail(email: string): Promise<string | null> {
  if (typeof crypto === "undefined" || !crypto.subtle) return null;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(email));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

const readFingerprints = (storage: Pick<Storage, "getItem">): readonly string[] => {
  try {
    const storedValue = storage.getItem(REGISTERED_EMAIL_STORAGE_KEY);
    const parsedValue: unknown = storedValue === null ? [] : JSON.parse(storedValue);
    return Array.isArray(parsedValue) && parsedValue.every((item) => typeof item === "string") ? parsedValue : [];
  } catch {
    return [];
  }
};

export const hasRememberedEmail = (storage: Pick<Storage, "getItem">, emailHash: string): boolean =>
  readFingerprints(storage).includes(emailHash);

export const rememberEmail = (storage: Pick<Storage, "getItem" | "setItem">, emailHash: string): void => {
  try {
    const keptFingerprints = readFingerprints(storage).filter((fingerprint) => fingerprint !== emailHash);
    const updatedFingerprints = [...keptFingerprints, emailHash].slice(-MAXIMUM_REMEMBERED_EMAILS);
    storage.setItem(REGISTERED_EMAIL_STORAGE_KEY, JSON.stringify(updatedFingerprints));
  } catch {
    // Blocked storage only means the email is sent again next time.
  }
};
