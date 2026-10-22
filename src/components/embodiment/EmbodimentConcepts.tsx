import {
  EMBODIMENT_CONCEPTS,
  NOT_MEASURED_LINE,
  type EmbodimentConceptId,
} from "@/content/embodiment";
import { cn } from "@/lib/cn";

type EmbodimentConceptsProps = {
  selected: EmbodimentConceptId | null;
  onSelect: (id: EmbodimentConceptId | null) => void;
};

/**
 * Three ideas from embodiment research, one at a time. Each shows its
 * definition and the reminder that this page explains, never measures. They
 * are concepts, not technologies, so they carry no maturity badge.
 */
export function EmbodimentConcepts({
  selected,
  onSelect,
}: EmbodimentConceptsProps) {
  const concept =
    EMBODIMENT_CONCEPTS.find((entry) => entry.id === selected) ?? null;
  return (
    <div className="flex flex-col gap-3">
      <div
        role="group"
        aria-label="Ideas from embodiment research"
        className="flex flex-col gap-2"
      >
        {EMBODIMENT_CONCEPTS.map((entry) => {
          const on = entry.id === selected;
          return (
            <button
              key={entry.id}
              type="button"
              aria-pressed={on}
              onClick={() => onSelect(on ? null : entry.id)}
              className={cn(
                "type-label transition-ui rounded-md border px-3 py-2 text-left",
                on
                  ? "border-accent text-foreground bg-surface-raised"
                  : "border-border text-muted hover:text-foreground",
              )}
            >
              <span className="text-muted mr-2">{entry.number}</span>
              {entry.name}
            </button>
          );
        })}
      </div>

      {concept ? (
        <div className="flex flex-col gap-2.5 text-sm" aria-live="polite">
          <p>
            <span className="type-label text-muted block">DEFINITION</span>
            {concept.definition}
          </p>
        </div>
      ) : (
        <p className="text-muted text-sm">
          Nothing selected yet. Select an idea to read a short definition.
        </p>
      )}

      <p className="text-foreground border-border border-l-2 pl-3 text-sm">
        {NOT_MEASURED_LINE}
      </p>
    </div>
  );
}
