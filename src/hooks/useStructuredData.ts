import { useEffect } from "react";

const STRUCTURED_DATA_ATTRIBUTE = "data-structured-data";

// Injects one JSON-LD script per identifier and removes it when the page unmounts.
export const useStructuredData = (identifier: string, structuredData: object | null): void => {
  const serializedData = structuredData ? JSON.stringify(structuredData) : null;

  useEffect(() => {
    if (!serializedData) {
      return undefined;
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute(STRUCTURED_DATA_ATTRIBUTE, identifier);
    script.textContent = serializedData;
    document.head.appendChild(script);

    return () => script.remove();
  }, [identifier, serializedData]);
};
