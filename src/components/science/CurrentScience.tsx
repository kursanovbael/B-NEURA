import { MaturityBadge } from "@/components/ui/MaturityBadge";
import { MATURITY_MEANINGS } from "@/content/maturity";
import { scienceColumns } from "@/content/science";
import { shortCitation } from "@/content/sources";

const COLUMNS = scienceColumns();

/**
 * Current Science: AVAILABLE TODAY, EXPERIMENTAL and FUTURE CONCEPT, built
 * from the claims register. Each item states its setting and scale and cites
 * the studies behind it; design goals carry no citation because they are
 * B-NEURA's own concepts, not results.
 */
export function CurrentScience() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-8 md:grid-cols-3 md:gap-6">
        {COLUMNS.map((column) => (
          <section
            key={column.level}
            aria-labelledby={`science-${column.level}`}
            className="flex flex-col gap-4"
          >
            <div className="border-border flex flex-col items-start gap-2 border-b pb-3">
              <h4 id={`science-${column.level}`}>
                <MaturityBadge classification={column.level} />
              </h4>
              <p className="type-meta">{MATURITY_MEANINGS[column.level]}</p>
            </div>
            <ul className="flex flex-col gap-5">
              {column.entries.map(({ item, wording, citations }) => (
                <li key={item.id} className="flex flex-col gap-1.5">
                  <p className="text-foreground font-semibold">{item.title}</p>
                  <p className="type-label text-muted">{item.setting}</p>
                  <p className="text-foreground text-sm">{wording}</p>
                  {citations.length > 0 ? (
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
                  ) : (
                    <p className="type-meta">
                      A B-NEURA concept, so there is no study to cite.
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="type-meta max-w-3xl">
        Citations link to each study&apos;s PubMed record. Experimental results
        come from a small number of research participants and are not treatments
        or products. Nothing in this prototype reads brain signals or produces
        sensations.
      </p>
    </div>
  );
}
