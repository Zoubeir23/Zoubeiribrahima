import type { LandingLanguage } from "@/lib/landing-content";
import { privacyPolicyEnglish, termsOfUseEnglish } from "@/lib/legal-content-en";
import { privacyPolicyFrench, termsOfUseFrench } from "@/lib/legal-content-fr";
import type { LegalDocument, LegalPageLabels } from "@/lib/legal-types";

export interface LegalContent extends LegalPageLabels {
  privacy: LegalDocument;
  terms: LegalDocument;
}

export const legalContent: Record<LandingLanguage, LegalContent> = {
  fr: {
    backHome: "Retour à l'accueil",
    otherDocumentLabel: "Voir aussi",
    privacy: privacyPolicyFrench,
    terms: termsOfUseFrench,
  },
  en: {
    backHome: "Back to home",
    otherDocumentLabel: "See also",
    privacy: privacyPolicyEnglish,
    terms: termsOfUseEnglish,
  },
};
