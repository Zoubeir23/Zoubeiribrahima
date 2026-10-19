import { useEffect } from "react";
import { SITE_DOMAIN } from "@/lib/contact-config";

interface PageMetadata {
  title: string;
  description: string;
  path: string;
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

export const usePageMetadata = ({ title, description, path }: PageMetadata): void => {
  useEffect(() => {
    document.title = title;

    const descriptionTag = findOrCreateHeadElement<HTMLMetaElement>('meta[name="description"]', "meta", { name: "description" });
    descriptionTag.setAttribute("content", description);

    const canonicalLink = findOrCreateHeadElement<HTMLLinkElement>('link[rel="canonical"]', "link", { rel: "canonical" });
    canonicalLink.setAttribute("href", `https://${SITE_DOMAIN}${path}`);
  }, [title, description, path]);
};
