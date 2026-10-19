import { useCallback, useMemo, useState, type ReactNode } from "react";
import { ConsentContext, type ConsentContextValue } from "@/hooks/consent-context";
import {
  ACCEPT_ALL_PREFERENCES,
  REFUSE_ALL_PREFERENCES,
  readConsentPreferences,
  writeConsentPreferences,
  type ConsentPreferences,
} from "@/lib/consent-storage";

interface ConsentProviderProps {
  children: ReactNode;
}

const ConsentProvider = ({ children }: ConsentProviderProps) => {
  const [preferences, setPreferences] = useState<ConsentPreferences | null>(() =>
    readConsentPreferences(window.localStorage),
  );
  const [isPanelRequested, setIsPanelRequested] = useState(false);

  const savePreferences = useCallback((nextPreferences: ConsentPreferences) => {
    writeConsentPreferences(window.localStorage, nextPreferences);
    setPreferences(nextPreferences);
    setIsPanelRequested(false);
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      preferences,
      hasDecided: preferences !== null,
      isBannerVisible: preferences === null || isPanelRequested,
      canUseAnalytics: preferences?.analytics === true,
      canLoadExternalContent: preferences?.externalContent === true,
      acceptAll: () => savePreferences(ACCEPT_ALL_PREFERENCES),
      refuseAll: () => savePreferences(REFUSE_ALL_PREFERENCES),
      savePreferences,
      allowExternalContent: () =>
        savePreferences({ analytics: preferences?.analytics ?? false, externalContent: true }),
      openPreferences: () => setIsPanelRequested(true),
    }),
    [preferences, isPanelRequested, savePreferences],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
};

export default ConsentProvider;
