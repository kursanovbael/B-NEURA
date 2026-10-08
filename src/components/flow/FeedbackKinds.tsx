import { MaturityBadge } from "@/components/ui/MaturityBadge";
import {
  FEEDBACK_KINDS,
  FUTURE_CONCEPT_LINE,
  type FeedbackKindId,
} from "@/content/feedbackKinds";
import { cn } from "@/lib/cn";

type FeedbackKindsProps = {
  selected: FeedbackKindId | null;
  onSelect: (id: FeedbackKindId | null) => void;
};

/**
 * The four kinds of information that have been studied. Selecting one changes
 * the scene and shows three separate layers: research evidence, this
 * simulation, and future concept. Every maturity badge stays pending.
 */
export function FeedbackKinds({ selected, onSelect }: FeedbackKindsProps) {
  const kind = FEEDBACK_KINDS.find((entry) => entry.id === selected) ?? null;
  return (
    <div className="flex flex-col gap-3">
      <div
        role="group"
        aria-label="Kinds of returning information"
        className="grid grid-cols-2 gap-2"
      >
        {FEEDBACK_KINDS.map((entry) => {
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

      {kind ? (
        <div className="flex flex-col gap-2.5 text-sm" aria-live="polite">
          <MaturityBadge classification={kind.badge} className="self-start" />
          <p>
            <span className="type-label text-muted block">
              RESEARCH EVIDENCE
            </span>
            {kind.evidence ??
              "No approved research wording yet. This stays pending."}
          </p>
          <p>
            <span className="type-label text-muted block">
              B-NEURA SIMULATION
            </span>
            {kind.simulation}
          </p>
          <p>
            <span className="type-label text-muted block">FUTURE CONCEPT</span>
            {FUTURE_CONCEPT_LINE}
          </p>
        </div>
      ) : (
        <p className="text-muted text-sm">
          Nothing selected yet. Every badge here stays pending until its claim
          is verified.
        </p>
      )}
    </div>
  );
}
