import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Page changes start at the top; in-page anchors keep the browser's own scrolling.
const RouteScrollReset = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return null;
};

export default RouteScrollReset;
