import { getClaim, isPublic, publicMaturity } from "./claims";
import type { Classification } from "./maturity";
import { getSource, type Source } from "./sources";

/** One public claim, ready to show: maturity, approved wording, citations. */
export type Evidence = {
  claimId: string;
  /** null for findings and definitions, which have no maturity. */
  maturity: Classification | null;
  wording: string;
  citations: readonly Source[];
};

/** The public view of a claim, or null while it is not approved for copy. */
export function evidenceFor(claimId: string): Evidence | null {
  const claim = getClaim(claimId);
  if (!isPublic(claim) || !claim.wording) return null;
  return {
    claimId,
    maturity: publicMaturity(claimId),
    wording: claim.wording,
    citations: claim.sourceRefs.map(getSource),
  };
}
