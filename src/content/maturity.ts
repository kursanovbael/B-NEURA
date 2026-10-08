/** The only technology maturity taxonomy used across B-NEURA. */
export type MaturityLevel =
  "available-today" | "experimental" | "future-concept";

/**
 * Temporary verification state. NOT a fourth maturity level: it marks an item
 * whose classification has not yet been confirmed by a verified source.
 */
export type PendingVerification = "requires-source-verification";

export type Classification = MaturityLevel | PendingVerification;

export const MATURITY_LABELS: Record<Classification, string> = {
  "available-today": "AVAILABLE TODAY",
  experimental: "EXPERIMENTAL",
  "future-concept": "FUTURE CONCEPT",
  "requires-source-verification": "REQUIRES SOURCE VERIFICATION",
};
