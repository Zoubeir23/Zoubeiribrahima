import { useEffect, useState } from "react";

export function useReadingProgress(resetKey: string): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);

    const update = () => {
      const scrollTop = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setProgress(100);
        return;
      }
      const current = (scrollTop / totalHeight) * 100;
      setProgress((prev) => Math.max(prev, current));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [resetKey]);

  return progress;
}
