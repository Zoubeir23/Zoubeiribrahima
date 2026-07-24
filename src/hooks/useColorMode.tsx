import { useEffect, useState } from "react";

const COLOR_MODE_KEY = "colorMode";

export type ColorMode = "warm" | "blue";

export const useColorMode = () => {
  const [colorMode, setColorMode] = useState<ColorMode>(() => {
    const savedMode = localStorage.getItem(COLOR_MODE_KEY);
    if (savedMode === "warm" || savedMode === "blue") {
      return savedMode;
    }

    // Legacy migration: old "default" value now maps to warm.
    if (savedMode === "default") {
      return "warm";
    }

    return "warm";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("theme-warm", colorMode === "warm");
    localStorage.setItem(COLOR_MODE_KEY, colorMode);
  }, [colorMode]);

  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === "warm" ? "blue" : "warm"));
  };

  return {
    colorMode,
    isWarmMode: colorMode === "warm",
    toggleColorMode,
  };
};
