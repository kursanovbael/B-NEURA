import { FLOW_STATES, type FlowSnapshot } from "@/content/systemFlow";
import { cn } from "@/lib/cn";

type FlowStateListProps = {
  snapshot: FlowSnapshot;
};

/**
 * Text equivalent of the animation: every state in order. The current state
 * carries aria-current and visible text, not only color.
 */
export function FlowStateList({ snapshot }: FlowStateListProps) {
  return (
    <details>
      <summary className="type-label text-muted hover:text-foreground cursor-pointer">
        The simulation, state by state
      </summary>
      <ol className="mt-3 flex flex-col gap-3">
        {FLOW_STATES.map((state) => {
          const current = state.id === snapshot.state.id;
          return (
            <li
              key={state.id}
              aria-current={current ? "step" : undefined}
              className={cn(
                "type-meta border-l-2 pl-3",
                current ? "border-accent" : "border-border",
              )}
            >
              <span
                className={cn(
                  "type-label block",
                  current ? "text-accent" : "text-foreground",
                )}
              >
                {state.label}
                {current ? " (current)" : ""}
              </span>
              {state.description}
            </li>
          );
        })}
      </ol>
    </details>
  );
}
