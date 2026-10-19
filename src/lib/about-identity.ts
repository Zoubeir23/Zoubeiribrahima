export interface IdentityLabels {
  tradeName: string;
  location: string;
  status: string;
  legalStatus: string;
  registrationNumber: string;
  email: string;
  phone: string;
}

export interface IdentityRow {
  label: string;
  value: string;
}

interface IdentityInput {
  labels: IdentityLabels;
  tradeName: string;
  location: string;
  status: string;
  legalStatus: string;
  registrationNumber: string;
  email: string;
  phoneDisplay: string;
}

// Optional facts (legal status, registration number) only appear once they are filled in.
export const buildIdentityRows = (input: IdentityInput): IdentityRow[] => {
  const { labels } = input;
  const candidateRows: IdentityRow[] = [
    { label: labels.tradeName, value: input.tradeName },
    { label: labels.location, value: input.location },
    { label: labels.status, value: input.status },
    { label: labels.legalStatus, value: input.legalStatus },
    { label: labels.registrationNumber, value: input.registrationNumber },
    { label: labels.email, value: input.email },
    { label: labels.phone, value: input.phoneDisplay },
  ];

  return candidateRows
    .map((row) => ({ ...row, value: row.value.trim() }))
    .filter((row) => row.value.length > 0);
};
