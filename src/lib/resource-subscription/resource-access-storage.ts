// Remembers in the browser that the visitor already left a first name and an email: one form unlocks the whole
// library, once per browser. Storage can be missing or blocked (private window): the form is then shown again.

export const RESOURCE_ACCESS_STORAGE_KEY = "resourceLibraryAccess";

export interface ResourceAccess {
  firstName: string;
  unlockedIsoDate: string;
}

const isResourceAccess = (value: unknown): value is ResourceAccess =>
  typeof value === "object" &&
  value !== null &&
  typeof (value as ResourceAccess).firstName === "string" &&
  typeof (value as ResourceAccess).unlockedIsoDate === "string";

export const readResourceAccess = (storage: Pick<Storage, "getItem">): ResourceAccess | null => {
  try {
    const storedValue = storage.getItem(RESOURCE_ACCESS_STORAGE_KEY);
    if (storedValue === null) return null;
    const parsedValue: unknown = JSON.parse(storedValue);
    return isResourceAccess(parsedValue) ? { firstName: parsedValue.firstName, unlockedIsoDate: parsedValue.unlockedIsoDate } : null;
  } catch {
    return null;
  }
};

export const rememberResourceAccess = (storage: Pick<Storage, "setItem">, access: ResourceAccess): void => {
  try {
    storage.setItem(RESOURCE_ACCESS_STORAGE_KEY, JSON.stringify(access));
  } catch {
    // Blocked storage only means the form will be asked again next visit.
  }
};
