import { createContext } from "react";
import type { ConsentPreferences } from "@/lib/consent-storage";

export interface ConsentContextValue {
  preferences: ConsentPreferences | null;
  hasDecided: boolean;
  isBannerVisible: boolean;
  canUseAnalytics: boolean;
  canLoadExternalContent: boolean;
  acceptAll: () => void;
  refuseAll: () => void;
  savePreferences: (preferences: ConsentPreferences) => void;
  allowExternalContent: () => void;
  openPreferences: () => void;
  closePreferences: () => void;
}

export const ConsentContext = createContext<ConsentContextValue | undefined>(undefined);
