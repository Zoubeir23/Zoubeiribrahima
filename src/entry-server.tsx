import { Writable } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import ApplicationRoutes from "./ApplicationRoutes";
import { LanguageProvider } from "./hooks/useLanguage";
import ConsentProvider from "./components/consent/ConsentProvider";
import {
  PageMetadataCollectorContext,
  type CollectedPageMetadata,
} from "./lib/page-metadata-collector";
import { buildPageStructuredData, type StructuredDataNode } from "./lib/structured-data";
import { listLeadMagnetRoutes } from "./data/leadMagnetResources";

// Routes shared by link only (lead magnet resources): prerendered, but never listed in the sitemap.
export const listUnlistedRoutes = (): string[] => listLeadMagnetRoutes();

export interface PrerenderedPage {
  html: string;
  metadata: CollectedPageMetadata | null;
  structuredData: StructuredDataNode[];
}

// React 18 flushes its whole 2048-byte stream view when a multi-byte character does not
// fit at the end, leaving a zero padding byte in the HTML ("Sén\0égal"). HTML text never
// legitimately contains a null character, so removing them is lossless.
export const removeStreamPaddingNullCharacters = (html: string): string => html.replaceAll("\u0000", "");

export const renderRoute = (path: string): Promise<PrerenderedPage> =>
  new Promise((resolve, reject) => {
    let metadata: CollectedPageMetadata | null = null;
    const collector = {
      record: (collected: CollectedPageMetadata) => {
        metadata = collected;
      },
    };

    const chunks: Buffer[] = [];
    const sink = new Writable({
      write(chunk, _encoding, callback) {
        chunks.push(Buffer.from(chunk));
        callback();
      },
    });
    sink.on("finish", () =>
      resolve({
        html: removeStreamPaddingNullCharacters(Buffer.concat(chunks).toString("utf8")),
        metadata,
        structuredData: metadata ? buildPageStructuredData(metadata) : [],
      }),
    );

    const { pipe } = renderToPipeableStream(
      <PageMetadataCollectorContext.Provider value={collector}>
        <LanguageProvider>
          <ConsentProvider>
            <StaticRouter location={path}>
              <ApplicationRoutes />
            </StaticRouter>
          </ConsentProvider>
        </LanguageProvider>
      </PageMetadataCollectorContext.Provider>,
      {
        onAllReady: () => pipe(sink),
        onShellError: reject,
        onError: reject,
      },
    );
  });
