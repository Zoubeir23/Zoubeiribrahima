import { useCallback, useEffect, useState } from "react";
import { readResourceAccess, rememberResourceAccess } from "@/lib/resource-subscription/resource-access-storage";

// Whether the visitor may read the resource guides. Read after mount: the prerendered HTML always shows the form,
// and never the guide text. In local development (npm run dev) the library is open, so the owner can proofread.

export type ResourceAccessState = "checking" | "locked" | "unlocked";

export const useResourceAccess = (isDevelopment: boolean = import.meta.env.DEV) => {
  const [state, setState] = useState<ResourceAccessState>("checking");

  useEffect(() => {
    setState(isDevelopment || readResourceAccess(window.localStorage) !== null ? "unlocked" : "locked");
  }, [isDevelopment]);

  const unlock = useCallback((firstName: string) => {
    rememberResourceAccess(window.localStorage, { firstName, unlockedIsoDate: new Date().toISOString() });
    setState("unlocked");
  }, []);

  return { state, unlock };
};
