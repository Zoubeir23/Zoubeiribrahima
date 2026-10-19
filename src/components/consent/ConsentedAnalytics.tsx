import { Analytics, type BeforeSend } from "@vercel/analytics/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useConsent } from "@/hooks/useConsent";

const ConsentedAnalytics = () => {
  const { canUseAnalytics } = useConsent();
  const isConsentGivenRef = useRef(canUseAnalytics);
  const [hasBeenLoaded, setHasBeenLoaded] = useState(canUseAnalytics);

  isConsentGivenRef.current = canUseAnalytics;

  useEffect(() => {
    if (canUseAnalytics) {
      setHasBeenLoaded(true);
    }
  }, [canUseAnalytics]);

  // The analytics script cannot be unloaded once injected, so after a withdrawal
  // every event is cancelled here instead of waiting for the next page load.
  const cancelEventsWithoutConsent = useCallback<BeforeSend>(
    (event) => (isConsentGivenRef.current ? event : null),
    [],
  );

  return hasBeenLoaded ? <Analytics beforeSend={cancelEventsWithoutConsent} /> : null;
};

export default ConsentedAnalytics;
