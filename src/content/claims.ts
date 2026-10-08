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

const DRAFT_NOTE =
  "Draft. Classify as AVAILABLE TODAY, EXPERIMENTAL or FUTURE CONCEPT only after sources are found and verified. Until then the page shows the pending marker.";

export const claims: readonly Claim[] = [
  {
    id: "helmet-neural-signal-acquisition-maturity",
    text: "Maturity classification of the technology area represented by the conceptual neural signal acquisition layer.",
    maturity: "requires-source-verification",
    sourceStatus: "UNVERIFIED",
    sourceRef: null,
    notes: DRAFT_NOTE,
  },
  {
    id: "helmet-conceptual-ai-decoder-maturity",
    text: "Maturity classification of the technology area represented by the conceptual AI decoder.",
    maturity: "requires-source-verification",
    sourceStatus: "UNVERIFIED",
    sourceRef: null,
    notes: DRAFT_NOTE,
  },
  {
    id: "helmet-feedback-interface-maturity",
    text: "Maturity classification of the technology area represented by the conceptual feedback interface.",
    maturity: "requires-source-verification",
    sourceStatus: "UNVERIFIED",
    sourceRef: null,
    notes: DRAFT_NOTE,
  },
  {
    id: "helmet-outer-shell-maturity",
    text: "Maturity classification of the VR display technology represented by the front band of the outer shell.",
    maturity: "requires-source-verification",
    sourceStatus: "UNVERIFIED",
    sourceRef: null,
    notes: DRAFT_NOTE,
  },
  {
    id: "gap-intention-persists",
    text: "People with severe paralysis can retain the intention to move.",
    maturity: "requires-source-verification",
    sourceStatus: "UNVERIFIED",
    sourceRef: null,
    notes:
      "Premise of chapter 2 (plan section 02). The page hedges it ('may not stop intending') until this is verified.",
  },
];
