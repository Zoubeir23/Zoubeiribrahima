import { useEffect } from "react";

const SPOTLIGHT_SELECTOR = ".spotlight-card";

export const usePointerSpotlight = (): void => {
  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const card = target.closest<HTMLElement>(SPOTLIGHT_SELECTOR);
      if (!card) {
        return;
      }

      const bounds = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${event.clientX - bounds.left}px`);
      card.style.setProperty("--mouse-y", `${event.clientY - bounds.top}px`);
    };

    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => document.removeEventListener("pointermove", handlePointerMove);
  }, []);
};
