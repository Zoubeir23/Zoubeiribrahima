// Earlier versions of the site kept two things in the browser: that a visitor had unlocked the library, and a
// fingerprint of the emails already sent to Resend. Neither is kept any more: the form is asked again each time a
// visitor comes back to a guide, and a database remembers the emails. This only removes the old entries, so people
// who visited before are asked again too. Blocked storage (private window) is ignored.

export const LEGACY_RESOURCE_ACCESS_STORAGE_KEY = "resourceLibraryAccess";
export const LEGACY_REGISTERED_EMAIL_STORAGE_KEY = "registeredResourceEmails";

export const forgetStoredResourceAccess = (storage: Pick<Storage, "removeItem">): void => {
  for (const legacyKey of [LEGACY_RESOURCE_ACCESS_STORAGE_KEY, LEGACY_REGISTERED_EMAIL_STORAGE_KEY]) {
    try {
      storage.removeItem(legacyKey);
    } catch {
      // Nothing to forget when the storage cannot be reached.
    }
  }
};
