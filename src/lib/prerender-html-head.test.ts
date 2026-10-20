import { describe, expect, it } from "vitest";
// @ts-expect-error Plain ES module without type declarations, shared with the build script.
import { applyPageMetadataToTemplate, injectRenderedBody, injectStructuredData } from "../../scripts/prerender-html-head.mjs";

const SITE_ORIGIN = "https://zoubeir.me";

const templateHtml = `<!doctype html><html><head>
<title>Default title</title>
<meta name="title" content="Default title" />
<meta name="description" content="Default description" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="https://zoubeir.me" />
<meta property="og:title" content="Default title" />
<meta property="og:description" content="Default description" />
<meta property="og:url" content="https://zoubeir.me" />
<meta name="twitter:title" content="Default title" />
<meta name="twitter:description" content="Default description" />
<meta name="twitter:url" content="https://zoubeir.me" />
</head><body><div id="root"></div></body></html>`;

describe("applyPageMetadataToTemplate", () => {
  const metadata = {
    title: 'Services "SaaS" | Zoubeir',
    description: "Logiciels <en ligne> & plus",
    path: "/services/saas",
    noindex: false,
  };

  it("writes the page title, description and canonical url", () => {
    const html = applyPageMetadataToTemplate(templateHtml, metadata, SITE_ORIGIN);
    expect(html).toContain("<title>Services &quot;SaaS&quot; | Zoubeir</title>");
    expect(html).toContain('<link rel="canonical" href="https://zoubeir.me/services/saas" />');
    expect(html).toContain('<meta property="og:url" content="https://zoubeir.me/services/saas" />');
    expect(html).toContain('<meta name="twitter:url" content="https://zoubeir.me/services/saas" />');
  });

  it("escapes characters that would break attributes", () => {
    const html = applyPageMetadataToTemplate(templateHtml, metadata, SITE_ORIGIN);
    expect(html).toContain('content="Logiciels &lt;en ligne&gt; &amp; plus"');
  });

  it("keeps the bare origin as canonical url for the home page", () => {
    const html = applyPageMetadataToTemplate(templateHtml, { ...metadata, path: "/" }, SITE_ORIGIN);
    expect(html).toContain('<link rel="canonical" href="https://zoubeir.me" />');
  });

  it("leaves indexing untouched for indexable pages", () => {
    const html = applyPageMetadataToTemplate(templateHtml, metadata, SITE_ORIGIN);
    expect(html).toContain('<meta name="robots" content="index, follow" />');
  });

  it("marks noindex pages as noindex", () => {
    const html = applyPageMetadataToTemplate(templateHtml, { ...metadata, noindex: true }, SITE_ORIGIN);
    expect(html).toContain('<meta name="robots" content="noindex, follow" />');
  });

  it("fails loudly when the template lacks a tag to rewrite", () => {
    expect(() => applyPageMetadataToTemplate("<html></html>", metadata, SITE_ORIGIN)).toThrow(/missing title/);
  });
});

describe("injectRenderedBody", () => {
  it("fills the empty root element", () => {
    expect(injectRenderedBody(templateHtml, "<main>Hello $1</main>")).toContain(
      '<div id="root"><main>Hello $1</main></div>',
    );
  });

  it("fails when the root element is not empty", () => {
    expect(() => injectRenderedBody('<div id="root"><p>x</p></div>', "<main></main>")).toThrow(/empty/);
  });
});

describe("injectStructuredData", () => {
  it("adds one JSON-LD script per node before the closing head tag", () => {
    const html = injectStructuredData(templateHtml, [{ "@type": "WebPage" }, { "@type": "BreadcrumbList" }]);
    expect(html.match(/<script type="application\/ld\+json">/g)).toHaveLength(2);
    expect(html.indexOf("BreadcrumbList")).toBeLessThan(html.indexOf("</head>"));
  });

  it("escapes angle brackets so content cannot close the script tag", () => {
    const html = injectStructuredData(templateHtml, [{ name: "</script><b>" }]);
    expect(html).not.toContain("</script><b>");
    expect(html).toContain("\\u003c/script>");
  });

  it("leaves the page untouched when there is nothing to add", () => {
    expect(injectStructuredData(templateHtml, [])).toContain("</head>");
  });
});
