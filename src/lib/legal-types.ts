export interface LegalSection {
  title: string;
  paragraphs: string[];
  items?: string[];
}

export interface LegalDocument {
  title: string;
  eyebrow: string;
  lastUpdatedLabel: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

export interface LegalPageLabels {
  backHome: string;
  otherDocumentLabel: string;
}
