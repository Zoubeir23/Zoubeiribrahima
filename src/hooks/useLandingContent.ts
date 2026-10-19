import { useLanguage } from "@/hooks/useLanguage";
import { landingContent, type LandingContent } from "@/lib/landing-content";

export const useLandingContent = (): LandingContent => {
  const { language } = useLanguage();
  return landingContent[language];
};
