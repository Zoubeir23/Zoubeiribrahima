export const collectKeyPaths = (value: unknown, prefix = ""): string[] => {
  if (Array.isArray(value)) {
    return [`${prefix}[${value.length}]`, ...value.flatMap((item) => collectKeyPaths(item, `${prefix}[]`))];
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) => collectKeyPaths(child, `${prefix}.${key}`));
  }
  return [prefix];
};

export const collectTexts = (value: unknown): string[] =>
  typeof value === "string"
    ? [value]
    : value && typeof value === "object"
      ? Object.values(value).flatMap(collectTexts)
      : [];
