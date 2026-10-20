import { createContext } from "react";

export interface CollectedPageMetadata {
  title: string;
  description: string;
  path: string;
  noindex: boolean;
}

export interface PageMetadataCollector {
  record: (metadata: CollectedPageMetadata) => void;
}

/** Provided only while prerendering, so page metadata can be written into static HTML. */
export const PageMetadataCollectorContext = createContext<PageMetadataCollector | null>(null);
