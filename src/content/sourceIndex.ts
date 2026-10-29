import { claims, isPublic, publicMaturity } from "./claims";
import type { Classification } from "./maturity";
import { sources, type Source } from "./sources";
import { TOPICS, type TopicId } from "./topics";

/**
 * The Sources section, derived from the two registers. Nothing here is new
 * content: a source supports exactly the public claims that cite it, and its
 * topics are those claims' topics. Sources that no public claim cites are not
 * listed, so no source appears to validate something the site does not say.
 */
export type SupportedClaim = {
  id: string;
  wording: string;
  maturity: Classification | null;
};

export type SourceEntry = {
  source: Source;
  supports: readonly SupportedClaim[];
  topics: readonly TopicId[];
};

/** First author's surname, for sorting. */
const firstAuthor = (source: Source) => source.authors.split(",")[0];

export const SOURCE_ENTRIES: readonly SourceEntry[] = sources
  .map((source) => {
    const citing = claims.filter(
      (claim) =>
        isPublic(claim) &&
        claim.wording &&
        claim.sourceRefs.includes(source.id),
    );
    const topics = new Set(citing.flatMap((claim) => claim.topics));
    return {
      source,
      supports: citing.map((claim) => ({
        id: claim.id,
        wording: claim.wording!,
        maturity: publicMaturity(claim.id),
      })),
      // Keep the plan's topic order.
      topics: TOPICS.map((topic) => topic.id).filter((id) => topics.has(id)),
    };
  })
  .filter((entry) => entry.supports.length > 0)
  .sort(
    (a, b) =>
      firstAuthor(a.source).localeCompare(firstAuthor(b.source)) ||
      a.source.year - b.source.year,
  );
