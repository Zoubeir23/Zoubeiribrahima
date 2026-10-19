import { Navigate, useLocation } from "react-router-dom";
import { resolveLegacyHashPath } from "@/lib/site-navigation";

const LegacyHashRedirect = () => {
  const { hash } = useLocation();
  const dedicatedPagePath = resolveLegacyHashPath(hash);

  return dedicatedPagePath ? <Navigate to={dedicatedPagePath} replace /> : null;
};

export default LegacyHashRedirect;
