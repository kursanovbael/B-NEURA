"use client";

import { useId, useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MaturityBadge } from "@/components/ui/MaturityBadge";
import { SOURCE_ENTRIES, type SourceEntry } from "@/content/sourceIndex";
import {
  READ_LABELS,
  SOURCE_TYPE_LABELS,
  type SourceType,
} from "@/content/sources";
import { TOPICS, topicLabel, type TopicId } from "@/content/topics";

const ALL = "all";

/** Types and topics that occur, with how many sources each has. */
const TYPE_OPTIONS = (Object.keys(SOURCE_TYPE_LABELS) as SourceType[])
  .map((type) => ({
    type,
    count: SOURCE_ENTRIES.filter((e) => e.source.type === type).length,
  }))
  .filter((option) => option.count > 0);
const TOPIC_OPTIONS = TOPICS.map((topic) => ({
  ...topic,
  count: SOURCE_ENTRIES.filter((e) => e.topics.includes(topic.id)).length,
})).filter((option) => option.count > 0);

const FIELD =
  "bg-background border-border-strong text-foreground transition-ui hover:border-muted w-full rounded-md border px-3 py-2 text-sm";

function matches(entry: SourceEntry, query: string): boolean {
  if (!query) return true;
  const { title, authors, venue, year } = entry.source;
  return `${title} ${authors} ${venue} ${year}`.toLowerCase().includes(query);
}

/**
 * The research archive: every source that a public claim cites, with what
 * the project read, its type in PubMed, and exactly which statements on this
 * site it supports. Search and filters are plain client-side state.
 */
export function Sources() {
  const ids = useId();
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<TopicId | typeof ALL>(ALL);
  const [type, setType] = useState<SourceType | typeof ALL>(ALL);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SOURCE_ENTRIES.filter(
      (entry) =>
        matches(entry, q) &&
        (topic === ALL || entry.topics.includes(topic)) &&
        (type === ALL || entry.source.type === type),
    );
  }, [query, topic, type]);

  const filtered = query !== "" || topic !== ALL || type !== ALL;
  const reset = () => {
    setQuery("");
    setTopic(ALL);
    setType(ALL);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-foreground flex max-w-3xl flex-col gap-2 text-sm">
        <p>
          Every scientific statement on this site traces back to the studies
          below. Each entry shows what the project actually read and exactly
          which statements it supports, with their limits.
        </p>
        <p className="text-muted">
          A study supports only the statements listed with it, never the B-NEURA
          concept as a whole. Design goals cite no study: they are concepts.
        </p>
      </div>

      <div
        role="search"
        aria-label="Search and filter sources"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-end"
      >
        <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-1">
          <label htmlFor={`${ids}-q`} className="type-label text-muted">
            SEARCH
          </label>
          <input
            id={`${ids}-q`}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Title, author, journal or year"
            className={FIELD}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor={`${ids}-topic`} className="type-label text-muted">
            TOPIC
          </label>
          <select
            id={`${ids}-topic`}
            value={topic}
            onChange={(event) =>
              setTopic(event.target.value as TopicId | typeof ALL)
            }
            className={FIELD}
          >
            <option value={ALL}>All topics</option>
            {TOPIC_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label} ({option.count})
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor={`${ids}-type`} className="type-label text-muted">
            SOURCE TYPE
          </label>
          <select
            id={`${ids}-type`}
            value={type}
            onChange={(event) =>
              setType(event.target.value as SourceType | typeof ALL)
            }
            className={FIELD}
          >
            <option value={ALL}>All types</option>
            {TYPE_OPTIONS.map((option) => (
              <option key={option.type} value={option.type}>
                {SOURCE_TYPE_LABELS[option.type]} ({option.count})
              </option>
            ))}
          </select>
        </div>
        <Button
          variant="ghost"
          onClick={reset}
          aria-disabled={!filtered}
          className="aria-disabled:opacity-45 sm:col-span-2 sm:justify-self-start lg:col-span-1"
        >
          Reset
        </Button>
      </div>

      <p className="type-meta" aria-live="polite">
        Showing {shown.length} of {SOURCE_ENTRIES.length} sources.
      </p>

      {shown.length === 0 ? (
        <p className="text-muted text-sm">
          No source matches. Try another word or reset the filters.
        </p>
      ) : (
        <ol className="grid gap-x-10 gap-y-8 lg:grid-cols-2">
          {shown.map((entry) => (
            <SourceItem key={entry.source.id} entry={entry} />
          ))}
        </ol>
      )}

      <p className="type-meta border-border max-w-3xl border-t pt-4">
        Source types follow the publication-type tags of each PubMed record.
        &ldquo;Full text reviewed&rdquo; means the project read the complete
        paper; &ldquo;Abstract only&rdquo; means only its abstract was read.
        Links open the PubMed record or the publisher (DOI) in a new tab.
      </p>
    </div>
  );
}

function SourceItem({ entry }: { entry: SourceEntry }) {
  const { source, supports, topics } = entry;
  const headingId = `source-${source.id}`;
  const count = supports.length;
  return (
    <li>
      <article aria-labelledby={headingId} className="flex flex-col gap-2">
        <h4 id={headingId} className="leading-snug font-semibold">
          <a
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent transition-ui decoration-border-strong underline underline-offset-4"
          >
            {source.title}
            <span className="sr-only">
              {" "}
              (PubMed record, opens in a new tab)
            </span>
          </a>
        </h4>
        <p className="text-muted text-sm">
          {source.authors} · <span className="italic">{source.venue}</span> ·{" "}
          {source.year}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{SOURCE_TYPE_LABELS[source.type]}</Badge>
          <Badge
            tone={source.read === "full-text" ? "accent" : "neutral"}
            dashed={source.read !== "full-text"}
          >
            {READ_LABELS[source.read]}
          </Badge>
          <a
            href={`https://doi.org/${source.doi}`}
            target="_blank"
            rel="noreferrer"
            className="type-meta hover:text-foreground underline decoration-dotted underline-offset-2"
          >
            DOI {source.doi}
            <span className="sr-only"> (publisher, opens in a new tab)</span>
          </a>
        </div>
        <p className="type-label text-muted">
          <span className="sr-only">Topics: </span>
          {topics.map(topicLabel).join(" · ")}
        </p>
        <details className="group">
          <summary className="type-label text-foreground hover:text-accent cursor-pointer rounded-sm py-1">
            Supports {count} {count === 1 ? "statement" : "statements"} on this
            site
          </summary>
          <ul className="border-border mt-2 flex flex-col gap-3 border-l-2 pl-3">
            {supports.map((claim) => (
              <li key={claim.id} className="flex flex-col gap-1.5 text-sm">
                {claim.maturity ? (
                  <MaturityBadge
                    classification={claim.maturity}
                    className="self-start"
                  />
                ) : null}
                <p>{claim.wording}</p>
              </li>
            ))}
          </ul>
        </details>
      </article>
    </li>
  );
}
