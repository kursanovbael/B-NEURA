import { shortCitation, type Source } from "@/content/sources";

type CitationsProps = {
  citations: readonly Source[];
};

/**
 * Concise citations that link to each study's PubMed record. With no
 * citations the claim is a B-NEURA design goal, and the line says so.
 */
export function Citations({ citations }: CitationsProps) {
  if (citations.length === 0) {
    return (
      <p className="type-meta">
        A B-NEURA concept, so there is no study to cite.
      </p>
    );
  }
  return (
    <p className="type-meta">
      <span className="sr-only">Sources: </span>
      {citations.map((source, i) => (
        <span key={source.id}>
          {i > 0 ? "; " : null}
          <a
            href={source.url}
            target="_blank"
            rel="noreferrer"
            title={source.title}
            className="hover:text-foreground underline decoration-dotted underline-offset-2"
          >
            {shortCitation(source)}
          </a>
        </span>
      ))}
    </p>
  );
}
