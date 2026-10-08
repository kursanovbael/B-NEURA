import { Badge } from "@/components/ui/Badge";
import {
  COMPARE_MODES,
  FEEDBACK_ANSWER,
  type CompareModeId,
} from "@/content/feedbackKinds";
import { cn } from "@/lib/cn";

type FeedbackCompareProps = {
  mode: CompareModeId;
  onChange: (mode: CompareModeId) => void;
};

/**
 * Two native buttons switch what happens at contact in the scene: the current
 * VR interaction (a visual cue) or the B-NEURA concept (a simulated feedback
 * pathway). The descriptions stay narrow and hedged.
 */
export function FeedbackCompare({ mode, onChange }: FeedbackCompareProps) {
  const selected = COMPARE_MODES.find((entry) => entry.id === mode)!;
  return (
    <div className="flex flex-col gap-3">
      <div
        role="group"
        aria-label="What happens at contact"
        className="flex flex-col gap-2 sm:flex-row"
      >
        {COMPARE_MODES.map((entry) => {
          const on = entry.id === mode;
          return (
            <button
              key={entry.id}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(entry.id)}
              className={cn(
                "type-label transition-ui rounded-md border px-3 py-2.5 text-left",
                on
                  ? "border-accent text-foreground bg-surface-raised"
                  : "border-border text-muted hover:text-foreground",
              )}
            >
              {entry.label}
            </button>
          );
        })}
      </div>

      <p className="text-foreground text-sm">{selected.description}</p>
      <p className="text-muted text-sm">
        <span className="type-label block">AT CONTACT</span>
        {selected.contact}
      </p>
      <div className="flex flex-wrap gap-2">
        {selected.tags.map((tag) => (
          <Badge key={tag} tone={tag === "SIMULATION" ? "violet" : "neutral"}>
            {tag}
          </Badge>
        ))}
      </div>
      <p className="text-foreground border-border border-l-2 pl-3 text-sm">
        <span className="type-label text-muted block">
          WHAT COMES BACK TO THE USER?
        </span>
        {FEEDBACK_ANSWER}
      </p>
    </div>
  );
}
