import { MaturityBadge } from "@/components/ui/MaturityBadge";
import {
  INGREDIENTS,
  INGREDIENTS_LINE,
  NOT_A_RECIPE_LINE,
  RESULTS_VARY_LINE,
  type IngredientId,
} from "@/content/embodiment";
import { cn } from "@/lib/cn";

export type IngredientSwitches = Record<IngredientId, boolean>;

export const INGREDIENTS_OFF: IngredientSwitches = {
  motor: false,
  visual: false,
  sensory: false,
};

type EmbodimentIngredientsProps = {
  switches: IngredientSwitches;
  onToggle: (id: IngredientId) => void;
};

/**
 * Factors that embodiment research has studied, each with its own switch.
 * A switch shows one pathway in the scene and its own evidence; nothing is
 * combined into a result. The counter-evidence stays visible.
 */
export function EmbodimentIngredients({
  switches,
  onToggle,
}: EmbodimentIngredientsProps) {
  const shown = INGREDIENTS.filter((entry) => switches[entry.id]);
  return (
    <div className="flex flex-col gap-3">
      <p className="text-foreground text-sm">{INGREDIENTS_LINE}</p>

      <div
        role="group"
        aria-label="Ingredients studied, each on its own"
        className="flex flex-col gap-2"
      >
        {INGREDIENTS.map((entry) => {
          const on = switches[entry.id];
          return (
            <button
              key={entry.id}
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(entry.id)}
              className={cn(
                "type-label transition-ui flex items-center justify-between gap-3 rounded-md border px-3 py-2 text-left",
                on
                  ? "border-accent text-foreground bg-surface-raised"
                  : "border-border text-muted hover:text-foreground",
              )}
            >
              <span>
                <span className="text-muted mr-2">{entry.number}</span>
                {entry.name}
              </span>
              <span aria-hidden="true">{on ? "ON" : "OFF"}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 text-sm" aria-live="polite">
        {shown.length === 0 ? (
          <p className="text-muted">
            All switches are off. Turn one on to see its pathway and what the
            research does and does not show.
          </p>
        ) : (
          shown.map((entry) => (
            <div key={entry.id} className="flex flex-col gap-2">
              <p className="type-label text-foreground">{entry.name}</p>
              {entry.badge ? (
                <MaturityBadge
                  classification={entry.badge}
                  className="self-start"
                />
              ) : null}
              {entry.evidence ? (
                <p>
                  <span className="type-label text-muted block">
                    RESEARCH EVIDENCE
                  </span>
                  {entry.evidence}
                </p>
              ) : null}
              <p>
                <span className="type-label text-muted block">
                  B-NEURA SIMULATION
                </span>
                {entry.simulation}
              </p>
            </div>
          ))
        )}
      </div>

      <p className="text-foreground border-border border-l-2 pl-3 text-sm">
        <span className="type-label text-muted block">RESULTS VARY</span>
        {RESULTS_VARY_LINE}
      </p>
      <p className="text-muted text-sm">{NOT_A_RECIPE_LINE}</p>
    </div>
  );
}
