import { useCallback, useState } from "react";
import {
  readConsentChoice,
  writeConsentChoice,
  type ConsentChoice,
  type StoredConsentChoice,
} from "@/lib/consent-storage";

interface UseConsentResult {
  choice: ConsentChoice;
  hasDecided: boolean;
  canLoadExternalContent: boolean;
  accept: () => void;
  refuse: () => void;
}

export const useConsent = (): UseConsentResult => {
  const [choice, setChoice] = useState<ConsentChoice>(() => readConsentChoice(window.localStorage));

  const applyChoice = useCallback((nextChoice: StoredConsentChoice) => {
    writeConsentChoice(window.localStorage, nextChoice);
    setChoice(nextChoice);
  }, []);

  const accept = useCallback(() => applyChoice("accepted"), [applyChoice]);
  const refuse = useCallback(() => applyChoice("refused"), [applyChoice]);

  return {
    choice,
    hasDecided: choice !== "unset",
    canLoadExternalContent: choice === "accepted",
    accept,
    refuse,
  };
};
