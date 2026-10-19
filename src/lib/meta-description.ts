const DEFAULT_MAXIMUM_LENGTH = 160;
const ELLIPSIS = "…";

export const toMetaDescription = (text: string, maximumLength: number = DEFAULT_MAXIMUM_LENGTH): string => {
  const normalizedText = text.replace(/\s+/g, " ").trim();
  if (normalizedText.length <= maximumLength) {
    return normalizedText;
  }

  const budget = maximumLength - ELLIPSIS.length;
  const cutAtBudget = normalizedText.slice(0, budget + 1);
  const lastSpaceIndex = cutAtBudget.lastIndexOf(" ");
  const cutAtWord = lastSpaceIndex > 0 ? cutAtBudget.slice(0, lastSpaceIndex) : normalizedText.slice(0, budget);

  return `${cutAtWord.replace(/[\s,;:.\-–—]+$/, "")}${ELLIPSIS}`;
};
