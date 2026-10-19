import { useLanguage } from "@/hooks/useLanguage";
import type { LandingLanguage } from "@/lib/landing-content";

export const useLocalizedContent = <Content>(content: Record<LandingLanguage, Content>): Content => {
  const { language } = useLanguage();
  return content[language];
};
