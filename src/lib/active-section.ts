export interface SectionPosition {
  id: string;
  top: number;
}

export const findActiveSectionId = (sections: readonly SectionPosition[], offsetLine: number): string => {
  if (sections.length === 0) {
    return "";
  }

  const sortedSections = [...sections].sort((first, second) => first.top - second.top);
  const passedSections = sortedSections.filter((section) => section.top <= offsetLine);

  return (passedSections.length > 0 ? passedSections[passedSections.length - 1] : sortedSections[0]).id;
};
