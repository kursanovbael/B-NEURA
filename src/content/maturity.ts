/** The only technology maturity taxonomy used across B-NEURA. */
export type MaturityLevel =
  "available-today" | "experimental" | "future-concept";

/**
 * Temporary verification state. NOT a fourth maturity level: it marks an item
 * whose classification has not yet been confirmed by a verified source.
 */
export type PendingVerification = "requires-source-verification";

export type Classification = MaturityLevel | PendingVerification;

/** What each maturity level means (MASTER_PLAN section 8.1). */
export const MATURITY_MEANINGS: Record<MaturityLevel, string> = {
  "available-today": "Exists and is in real use.",
  experimental:
    "Demonstrated in research settings; not a mature or widely available capability.",
  "future-concept":
    "B-NEURA design goals. Not demonstrated in the form described.",
};

export const MATURITY_LABELS: Record<Classification, string> = {
  "available-today": "AVAILABLE TODAY",
  experimental: "EXPERIMENTAL",
  "future-concept": "FUTURE CONCEPT",
  "requires-source-verification": "REQUIRES SOURCE VERIFICATION",
};
