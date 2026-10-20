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

export interface PrerenderedPage {
  html: string;
  metadata: CollectedPageMetadata | null;
}

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
    sink.on("finish", () => resolve({ html: Buffer.concat(chunks).toString("utf8"), metadata }));

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
