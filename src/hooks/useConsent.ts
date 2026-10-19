import { useContext } from "react";
import { ConsentContext, type ConsentContextValue } from "@/hooks/consent-context";

export const useConsent = (): ConsentContextValue => {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error("useConsent must be used within a ConsentProvider");
  }
  return context;
};
