import { useContext, useEffect } from "react";
import { PageMetadataCollectorContext } from "@/lib/page-metadata-collector";
import { SITE_DOMAIN } from "@/lib/contact-config";

interface PageMetadata {
  title: string;
  description: string;
  path: string;
  /** Marks pages that must stay out of search results, such as a missing page. */
  noindex?: boolean;
}

const findOrCreateHeadElement = <ElementType extends HTMLElement>(selector: string, tagName: string, attributes: Record<string, string>): ElementType => {
  const existing = document.head.querySelector<ElementType>(selector);
  if (existing) {
    return existing;
  }
  const created = document.createElement(tagName) as ElementType;
  for (const [name, value] of Object.entries(attributes)) {
    created.setAttribute(name, value);
  }
  document.head.appendChild(created);
  return created;
};

export const usePageMetadata = ({ title, description, path, noindex = false }: PageMetadata): void => {
  const collector = useContext(PageMetadataCollectorContext);
  collector?.record({ title, description, path, noindex });

  useEffect(() => {
    document.title = title;

    const descriptionTag = findOrCreateHeadElement<HTMLMetaElement>('meta[name="description"]', "meta", { name: "description" });
    descriptionTag.setAttribute("content", description);

    const canonicalLink = findOrCreateHeadElement<HTMLLinkElement>('link[rel="canonical"]', "link", { rel: "canonical" });
    canonicalLink.setAttribute("href", `https://${SITE_DOMAIN}${path}`);
  }, [title, description, path]);

  useEffect(() => {
    if (!noindex) {
      return undefined;
    }

    const robotsTag = findOrCreateHeadElement<HTMLMetaElement>('meta[name="robots"]', "meta", { name: "robots" });
    const previousContent = robotsTag.getAttribute("content");
    robotsTag.setAttribute("content", "noindex, follow");

    return () => {
      if (previousContent === null) {
        robotsTag.remove();
      } else {
        robotsTag.setAttribute("content", previousContent);
      }
    };
  }, [noindex]);
};
