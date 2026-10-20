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
  const canonicalUrl = metadata.path === "/" ? siteOrigin : `${siteOrigin}${metadata.path}`;
  let html = templateHtml;

  html = replaceTagContent(
    html,
    /<title>[^<]*<\/title>/,
    () => `<title>${escapeHtmlAttribute(metadata.title)}</title>`,
    "title",
  );
  html = replaceMetaContent(html, "name", "title", metadata.title);
  html = replaceMetaContent(html, "name", "description", metadata.description);
  html = replaceMetaContent(html, "property", "og:title", metadata.title);
  html = replaceMetaContent(html, "property", "og:description", metadata.description);
  html = replaceMetaContent(html, "property", "og:url", canonicalUrl);
  html = replaceMetaContent(html, "name", "twitter:title", metadata.title);
  html = replaceMetaContent(html, "name", "twitter:description", metadata.description);
  html = replaceMetaContent(html, "name", "twitter:url", canonicalUrl);
  html = replaceTagContent(
    html,
    /(<link rel="canonical" href=")[^"]*(")/,
    (_match, opening, closing) => `${opening}${escapeHtmlAttribute(canonicalUrl)}${closing}`,
    "canonical link",
  );

  if (metadata.noindex) {
    html = replaceMetaContent(html, "name", "robots", "noindex, follow");
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
