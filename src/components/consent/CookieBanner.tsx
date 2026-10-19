import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Emoji from "@/components/Emoji";
import { useConsent } from "@/hooks/useConsent";
import { useLandingContent } from "@/hooks/useLandingContent";
import { type ConsentPreferences } from "@/lib/consent-storage";

interface CategoryToggleProps {
  title: string;
  description: string;
  isChecked: boolean;
  onToggle: () => void;
}

const CategoryToggle = ({ title, description, isChecked, onToggle }: CategoryToggleProps) => (
  <div className="flex items-start justify-between gap-4 rounded-md border border-[var(--surface-border)] p-3">
    <div>
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{description}</p>
    </div>
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      aria-label={title}
      onClick={onToggle}
      className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-violet)] ${
        isChecked ? "bg-[var(--accent-violet)]" : "bg-[var(--surface-border)]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-300 ${
          isChecked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  </div>
);

const actionClassName =
  "inline-flex min-h-11 flex-1 items-center justify-center rounded-full px-5 py-2.5 font-body text-sm font-semibold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-violet)]";

// Mounted fresh on every opening so the draft choices and the summary view always start clean.
const CookieBannerPanel = () => {
  const { consent } = useLandingContent();
  const { preferences, acceptAll, refuseAll, savePreferences, closePreferences } = useConsent();
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [draftPreferences, setDraftPreferences] = useState<ConsentPreferences>(
    preferences ?? { analytics: false, externalContent: false },
  );
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const hasPreviousDecision = preferences !== null;

  useEffect(() => {
    if (!hasPreviousDecision) {
      return;
    }

    // Reopened on purpose by the visitor: move focus into the dialog and allow Escape to dismiss it.
    dialogRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePreferences();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [hasPreviousDecision, closePreferences]);

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-h-[calc(100svh-1.5rem)] max-w-lg overflow-y-auto rounded-[var(--radius-medium)] border border-[var(--surface-border)] bg-[var(--surface-base)] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.7)] focus:outline-none sm:inset-x-auto sm:bottom-6 sm:left-6 sm:mx-0"
    >
      {hasPreviousDecision ? (
        <button
          type="button"
          onClick={closePreferences}
          aria-label={consent.close}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--surface-border)] text-white transition-colors duration-300 hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-violet)]"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      ) : null}
      <div className="mb-3 flex items-center gap-3 pr-10">
        <Emoji symbol="🍪" className="text-2xl" />
        <h2 id="cookie-banner-title" className="font-display text-base uppercase text-white">
          {consent.title}
        </h2>
      </div>
      <p id="cookie-banner-description" className="mb-4 text-sm text-[var(--text-secondary)]">
        {consent.description}{" "}
        {/* A plain anchor: the banner sits outside the router, so a full page load is expected here. */}
        <a
          href="/privacy"
          className="font-semibold text-white underline underline-offset-4 hover:text-[var(--text-secondary)]"
        >
          {consent.learnMore}
        </a>
      </p>

      {isCustomizing ? (
        <div className="mb-4 space-y-3">
          <CategoryToggle
            title={consent.analyticsTitle}
            description={consent.analyticsDescription}
            isChecked={draftPreferences.analytics}
            onToggle={() => setDraftPreferences((current) => ({ ...current, analytics: !current.analytics }))}
          />
          <CategoryToggle
            title={consent.externalContentTitle}
            description={consent.externalContentDescription}
            isChecked={draftPreferences.externalContent}
            onToggle={() =>
              setDraftPreferences((current) => ({ ...current, externalContent: !current.externalContent }))
            }
          />
          <p className="text-xs text-[var(--text-muted)]">{consent.languageNote}</p>
          <button
            type="button"
            onClick={() => savePreferences(draftPreferences)}
            className={`${actionClassName} w-full bg-white text-[var(--surface-deepest)] hover:bg-[var(--text-secondary)]`}
          >
            {consent.savePreferences}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={acceptAll}
              className={`${actionClassName} bg-white text-[var(--surface-deepest)] hover:bg-[var(--text-secondary)]`}
            >
              {consent.acceptAll}
            </button>
            <button
              type="button"
              onClick={refuseAll}
              className={`${actionClassName} border border-[var(--surface-border)] text-white hover:border-white`}
            >
              {consent.refuseAll}
            </button>
          </div>
          <button
            type="button"
            onClick={() => setIsCustomizing(true)}
            className="w-full rounded-full border border-[var(--surface-border)] py-2.5 text-sm text-[var(--text-secondary)] transition-colors duration-300 hover:border-white hover:text-white"
          >
            {consent.customize}
          </button>
        </div>
      )}
    </div>
  );
};

const CookieBanner = () => {
  const { isBannerVisible } = useConsent();
  return isBannerVisible ? <CookieBannerPanel /> : null;
};

export default CookieBanner;
