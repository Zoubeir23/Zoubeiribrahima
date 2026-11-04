// Resources handed out through LinkedIn lead magnets. Each one lives at /lead-magnet/<slug> and is
// reachable only through its shared link: never in the sitemap or llms.txt, always noindex.
//
// To publish a resource (see docs/lead-magnet.md):
// 1. Write its text in src/data/lead-magnets/<slug>.md and import it here with "?raw".
// 2. Put small files (under 10 MB) in public/lead-magnet/<slug>/; link large ones with an https URL.
// 3. Add an entry to leadMagnetResources below, then share https://<domain>/lead-magnet/<slug>.

export type LeadMagnetDownloadKind = "pdf" | "zip" | "other";

export type LeadMagnetLinkKind = "agent" | "skill" | "mcp" | "repository" | "other";

export interface LeadMagnetDownload {
  label: string;
  kind: LeadMagnetDownloadKind;
  /** /lead-magnet/<slug>/<file> for a file in public/, or an https URL for an external file. */
  href: string;
  sizeLabel?: string;
}

export interface LeadMagnetLink {
  label: string;
  kind: LeadMagnetLinkKind;
  href: string;
  description?: string;
}

export interface LeadMagnetResource {
  slug: string;
  title: string;
  summary: string;
  publishedIsoDate: string;
  contentMarkdown?: string;
  downloads: LeadMagnetDownload[];
  links: LeadMagnetLink[];
}

export const leadMagnetResources: readonly LeadMagnetResource[] = [];

export function findLeadMagnetResource(slug: string | undefined): LeadMagnetResource | undefined {
  return leadMagnetResources.find((resource) => resource.slug === slug);
}

export function listLeadMagnetRoutes(): string[] {
  return leadMagnetResources.map((resource) => `/lead-magnet/${resource.slug}`);
}
