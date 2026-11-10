import { useCallback, useEffect, useState } from "react";
import { forgetStoredResourceAccess } from "@/lib/resource-subscription/resource-access-storage";

// Whether the visitor may read a resource guide. The form is asked again each time the visitor comes back: the
// unlock lives only in this page's memory, for the guide it was given for, and is never written to the browser.
// The prerendered HTML always shows the form and never the guide text. In local development (npm run dev) the
// library is open, so the owner can proofread.

export type ResourceAccessState = "locked" | "unlocked";

export const useResourceAccess = (resourceSlug: string | undefined, isDevelopment: boolean = import.meta.env.DEV) => {
  const [unlockedResourceSlug, setUnlockedResourceSlug] = useState<string | null>(null);

  useEffect(() => forgetStoredResourceAccess(window.localStorage), []);

  const unlock = useCallback(() => setUnlockedResourceSlug(resourceSlug ?? null), [resourceSlug]);

  const isUnlocked = isDevelopment || (resourceSlug !== undefined && unlockedResourceSlug === resourceSlug);
  const state: ResourceAccessState = isUnlocked ? "unlocked" : "locked";

  return { state, unlock };
};
