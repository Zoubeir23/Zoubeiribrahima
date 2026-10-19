import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useLandingContent } from "@/hooks/useLandingContent";

const SCROLL_THRESHOLD_PIXELS = 500;

const ScrollToTopButton = () => {
  const { footer } = useLandingContent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > SCROLL_THRESHOLD_PIXELS);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={footer.scrollToTop}
      className={`fixed bottom-[max(env(safe-area-inset-bottom),1rem)] right-4 z-50 flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--surface-border)] bg-[var(--surface-raised)] text-white transition-all duration-300 hover:border-white sm:bottom-6 sm:right-6 ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      tabIndex={isVisible ? 0 : -1}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
};

export default ScrollToTopButton;
