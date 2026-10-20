// jsdom's selector engine mishandles astral characters in attribute selectors, so match by attribute value instead.
export const findEmojiElement = (root: ParentNode, symbol: string): Element | null =>
  Array.from(root.querySelectorAll("[data-emoji]")).find((element) => element.getAttribute("data-emoji") === symbol) ?? null;
