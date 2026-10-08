export type Source = {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  /** DOI, PubMed ID, or URL. */
  identifier: string;
  /** ISO date (YYYY-MM-DD) on which the source was checked. */
  accessed: string;
};

export const sources: readonly Source[] = [];
