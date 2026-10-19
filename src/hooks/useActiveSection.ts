import { useEffect, useState } from "react";
import { findActiveSectionId, type SectionPosition } from "@/lib/active-section";

const OFFSET_LINE_VIEWPORT_RATIO = 0.35;

export const useActiveSection = (sectionIds: readonly string[], isEnabled: boolean): string => {
  const [activeSectionId, setActiveSectionId] = useState("");

  useEffect(() => {
    if (!isEnabled) {
      setActiveSectionId("");
      return;
    }

    let pendingFrame = 0;

    const measure = () => {
      pendingFrame = 0;
      const positions: SectionPosition[] = [];
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          positions.push({ id, top: element.getBoundingClientRect().top });
        }
      }
      setActiveSectionId(findActiveSectionId(positions, window.innerHeight * OFFSET_LINE_VIEWPORT_RATIO));
    };

    const scheduleMeasure = () => {
      if (pendingFrame === 0) {
        pendingFrame = window.requestAnimationFrame(measure);
      }
    };

    measure();
    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", scheduleMeasure);

    // Deferred sections mount after the first paint, so re-measure when the DOM grows.
    const observer = new MutationObserver(scheduleMeasure);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);
      observer.disconnect();
      if (pendingFrame !== 0) {
        window.cancelAnimationFrame(pendingFrame);
      }
    };
  }, [sectionIds, isEnabled]);

  return activeSectionId;
};
