import type { Classification } from "./maturity";

/** UNVERIFIED -> SOURCE_FOUND -> VERIFIED. Only VERIFIED claims may be published as fact. */
export type ClaimSourceStatus = "UNVERIFIED" | "SOURCE_FOUND" | "VERIFIED";

export type Claim = {
  id: string;
  text: string;
  maturity: Classification;
  sourceStatus: ClaimSourceStatus;
  /** Id of a record in `sources`; null until a source is found. */
  sourceRef: string | null;
  notes: string;
};

export const claims: readonly Claim[] = [];
