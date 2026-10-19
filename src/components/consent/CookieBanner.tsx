import Emoji from "@/components/Emoji";
import { useState } from "react";
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

const CookieBanner = () => {
  const { consent } = useLandingContent();
  const { preferences, isBannerVisible, acceptAll, refuseAll, savePreferences } = useConsent();
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [draftPreferences, setDraftPreferences] = useState<ConsentPreferences>(
    preferences ?? { analytics: false, externalContent: false },
  );

  if (!isBannerVisible) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-lg rounded-[var(--radius-medium)] border border-[var(--surface-border)] bg-[var(--surface-base)] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.7)] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:mx-0"
    >
      <div className="mb-3 flex items-center gap-3">
        <Emoji symbol="🍪" className="text-2xl" />
        <h2 id="cookie-banner-title" className="font-display text-base uppercase text-white">
          {consent.title}
        </h2>
      </div>
      <p id="cookie-banner-description" className="mb-4 text-sm text-[var(--text-secondary)]">
        {consent.description}
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

export default CookieBanner;
