const escapeHtmlAttribute = (value) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const replaceTagContent = (html, pattern, replacement, tagDescription) => {
  if (!pattern.test(html)) {
    throw new Error(`Prerender template is missing ${tagDescription}`);
  }
  return html.replace(pattern, replacement);
};

const replaceMetaContent = (html, attributeName, attributeValue, content) =>
  replaceTagContent(
    html,
    new RegExp(`(<meta\\s+${attributeName}="${attributeValue}"\\s+content=")[^"]*(")`),
    (_match, opening, closing) => `${opening}${escapeHtmlAttribute(content)}${closing}`,
    `meta ${attributeName}="${attributeValue}"`,
  );

export const applyPageMetadataToTemplate = (templateHtml, metadata, siteOrigin) => {
  const canonicalUrl = `${siteOrigin}${metadata.path}`;
  let html = templateHtml;

  html = replaceTagContent(
    html,
    /<title>[^<]*<\/title>/,
    () => `<title>${escapeHtmlAttribute(metadata.title)}</title>`,
    "title",
  );
  html = replaceMetaContent(html, "name", "description", metadata.description);
  html = replaceMetaContent(html, "property", "og:title", metadata.title);
  html = replaceMetaContent(html, "property", "og:description", metadata.description);
  html = replaceMetaContent(html, "property", "og:url", canonicalUrl);
  html = replaceMetaContent(html, "name", "twitter:title", metadata.title);
  html = replaceMetaContent(html, "name", "twitter:description", metadata.description);
  html = replaceMetaContent(html, "name", "twitter:url", canonicalUrl);

  if (metadata.articlePublishedTime) {
    html = replaceMetaContent(html, "property", "og:type", "article");
    html = html.replace(
      /(<meta property="og:type" content="article" \/>)/,
      (openingTag) =>
        [
          openingTag,
          `<meta property="article:published_time" content="${escapeHtmlAttribute(metadata.articlePublishedTime)}" />`,
          `<meta property="article:modified_time" content="${escapeHtmlAttribute(metadata.articleModifiedTime ?? metadata.articlePublishedTime)}" />`,
        ].join("\n    "),
    );
  }

  if (metadata.noindex) {
    html = replaceTagContent(html, /\s*<link rel="canonical" href="[^"]*" \/>/, () => "", "canonical link");
    html = replaceMetaContent(html, "name", "robots", "noindex, follow");
  } else {
    html = replaceTagContent(
      html,
      /(<link rel="canonical" href=")[^"]*(")/,
      (_match, opening, closing) => `${opening}${escapeHtmlAttribute(canonicalUrl)}${closing}`,
      "canonical link",
    );
  }

  return html;
};

export const injectRenderedBody = (templateHtml, renderedBody) =>
  replaceTagContent(
    templateHtml,
    /<div id="root"><\/div>/,
    () => `<div id="root">${renderedBody}</div>`,
    'empty <div id="root">',
  );

const serializeJsonLd = (node) => JSON.stringify(node).replace(/</g, "\\u003c");

export const injectStructuredData = (templateHtml, structuredDataNodes) =>
  replaceTagContent(
    templateHtml,
    /<\/head>/,
    () =>
      `${structuredDataNodes
        .map((node) => `    <script type="application/ld+json">${serializeJsonLd(node)}</script>\n`)
        .join("")}  </head>`,
    "closing head tag",
  );
