import { createRoot } from "react-dom/client";
import ConsentProvider from "./components/consent/ConsentProvider";
import ConsentedAnalytics from "./components/consent/ConsentedAnalytics";
import CookieBanner from "./components/consent/CookieBanner";
import CookieSettingsButton from "./components/consent/CookieSettingsButton";
import { LanguageProvider } from "./hooks/useLanguage";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <ConsentProvider>
      <App />
      <CookieBanner />
      <CookieSettingsButton />
      <ConsentedAnalytics />
    </ConsentProvider>
  </LanguageProvider>,
);
