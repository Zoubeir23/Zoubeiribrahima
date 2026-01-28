import { createRoot } from "react-dom/client";
import { LanguageProvider } from "./hooks/useLanguage";
import App from "./App.tsx";
import "./index.css";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <App />
    <Analytics />
  </LanguageProvider>,
);
