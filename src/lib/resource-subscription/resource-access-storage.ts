// An earlier version of the site remembered in the browser that a visitor had unlocked the library. The access is
// no longer kept: the form is asked again each time a visitor comes back to a guide. This only removes the old
// entry, so people who unlocked before are asked again too. Blocked storage (private window) is ignored.

export const LEGACY_RESOURCE_ACCESS_STORAGE_KEY = "resourceLibraryAccess";

export const forgetStoredResourceAccess = (storage: Pick<Storage, "removeItem">): void => {
  try {
    storage.removeItem(LEGACY_RESOURCE_ACCESS_STORAGE_KEY);
  } catch {
    // Nothing to forget when the storage cannot be reached.
  }
};
