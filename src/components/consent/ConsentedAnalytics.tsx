import { Analytics } from "@vercel/analytics/react";
import { useConsent } from "@/hooks/useConsent";

const ConsentedAnalytics = () => {
  const { canUseAnalytics } = useConsent();
  return canUseAnalytics ? <Analytics /> : null;
};

export default ConsentedAnalytics;
