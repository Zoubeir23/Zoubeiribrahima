import { Cookie } from "lucide-react";
import { useConsent } from "@/hooks/useConsent";
import { useLandingContent } from "@/hooks/useLandingContent";

const CookieSettingsButton = () => {
  const { consent } = useLandingContent();
  const { hasDecided, isBannerVisible, openPreferences } = useConsent();

  if (!hasDecided || isBannerVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={openPreferences}
      aria-label={consent.settingsButtonLabel}
      className="fixed bottom-[max(env(safe-area-inset-bottom),1rem)] left-4 z-50 flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--surface-border)] bg-[var(--surface-raised)] text-[var(--accent-orange)] transition-colors duration-300 hover:border-white sm:bottom-6 sm:left-6"
    >
      <Cookie className="h-5 w-5" aria-hidden="true" />
    </button>
  );
};

export default CookieSettingsButton;
