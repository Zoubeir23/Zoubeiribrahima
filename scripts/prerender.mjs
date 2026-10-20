import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { applyPageMetadataToTemplate, injectRenderedBody, injectStructuredData } from "./prerender-html-head.mjs";

const SITE_ORIGIN = "https://zoubeir.me";
const NOT_FOUND_PROBE_PATH = "/page-introuvable";

const projectRoot = process.cwd();
const clientDirectory = path.join(projectRoot, "dist");
const serverEntryPath = path.join(projectRoot, "dist-ssr", "entry-server.js");

const readRoutesFromSitemap = async () => {
  const sitemapXml = await readFile(path.join(projectRoot, "public", "sitemap.xml"), "utf8");
  return [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, location]) => new URL(location).pathname);
};

const outputPathForRoute = (route) =>
  route === "/" ? path.join(clientDirectory, "index.html") : path.join(clientDirectory, route, "index.html");

const writePrerenderedPage = async (outputPath, html) => {
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, "utf8");
};

const main = async () => {
  const templateHtml = await readFile(path.join(clientDirectory, "index.html"), "utf8");
  const { renderRoute } = await import(pathToFileURL(serverEntryPath).href);
  const routes = await readRoutesFromSitemap();

  for (const route of routes) {
    const { html, metadata, structuredData } = await renderRoute(route);
    if (!metadata) {
      throw new Error(`No page metadata was recorded while prerendering ${route}`);
    }
    if (metadata.noindex) {
      throw new Error(`Sitemap route ${route} rendered as noindex; it is probably not a real page`);
    }
    const page = injectStructuredData(
      applyPageMetadataToTemplate(injectRenderedBody(templateHtml, html), metadata, SITE_ORIGIN),
      structuredData,
    );
    await writePrerenderedPage(outputPathForRoute(route), page);
    console.log(`prerendered ${route}`);
  }

  // Served by the host for every unknown URL, with a real 404 status.
  const notFound = await renderRoute(NOT_FOUND_PROBE_PATH);
  if (!notFound.metadata?.noindex) {
    throw new Error("The not-found page must be rendered as noindex");
  }
  const notFoundPage = applyPageMetadataToTemplate(
    injectRenderedBody(templateHtml, notFound.html),
    { ...notFound.metadata, path: "/" },
    SITE_ORIGIN,
  );
  await writePrerenderedPage(path.join(clientDirectory, "404.html"), notFoundPage);
  console.log("prerendered 404.html");
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
