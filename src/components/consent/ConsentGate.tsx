import type { ReactNode } from "react";
import { useConsent } from "@/hooks/useConsent";

interface ConsentGateProps {
  providerName: string;
  description: string;
  loadButtonLabel: string;
  children: ReactNode;
}

const ConsentGate = ({ providerName, description, loadButtonLabel, children }: ConsentGateProps) => {
  const { canLoadExternalContent, allowExternalContent } = useConsent();

  if (canLoadExternalContent) {
    return <>{children}</>;
  }

  return (
    <div
      role="group"
      aria-label={providerName}
      className="flex flex-col items-center gap-4 rounded-md border border-[var(--surface-border)] bg-[var(--surface-base)] p-6 text-center"
    >
      <p className="max-w-md text-sm text-[var(--text-secondary)]">{description}</p>
      <button
        type="button"
        onClick={allowExternalContent}
        className="min-h-11 rounded-full bg-white px-6 font-body text-sm font-semibold text-[var(--surface-deepest)] transition-colors duration-300 hover:bg-[var(--text-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-violet)]"
      >
        {loadButtonLabel}
      </button>
    </div>
  );
};

export default ConsentGate;
