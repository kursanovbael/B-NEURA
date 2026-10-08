import {
  FLOW_NARRATION,
  FLOW_STATES,
  type FlowSnapshot,
} from "@/content/systemFlow";
import { cn } from "@/lib/cn";

type FlowReadoutProps = {
  snapshot: FlowSnapshot;
  className?: string;
};

const LAST_STEP = FLOW_STATES.length - 1;

/**
 * The caption for the current state: what is on screen, what the system is
 * doing, and what comes next. Always simulated wording. On small screens a
 * one-line summary (current part, next part) leads, so the stage and the next
 * action stay obvious without reading everything.
 */
export function FlowReadout({ snapshot, className }: FlowReadoutProps) {
  const { state, index, isComplete } = snapshot;
  const narration = FLOW_NARRATION[state.id];
  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <p className="type-label text-accent">
        {index} / {LAST_STEP} · {state.label}
      </p>
      <p className="text-foreground flex flex-wrap items-baseline gap-x-2 text-base font-semibold md:hidden">
        <span>{narration.part}</span>
        {narration.next ? (
          <span className="text-muted text-sm font-normal">
            → next: {narration.next}
          </span>
        ) : null}
      </p>
      <dl className="flex flex-col gap-2 text-sm">
        <div>
          <dt className="type-label text-muted">WHAT I AM SEEING</dt>
          <dd className="text-foreground">{narration.seeing}</dd>
        </div>
        <div>
          <dt className="type-label text-muted">WHAT THE SYSTEM IS DOING</dt>
          <dd className="text-foreground">{narration.line}</dd>
        </div>
        <div>
          <dt className="type-label text-muted">NEXT</dt>
          <dd className="text-foreground">
            {narration.next ?? "The loop is closed. Run it again or reset."}
          </dd>
        </div>
      </dl>
      {isComplete ? (
        <p className="type-label text-muted">LOOP COMPLETE</p>
      ) : null}
    </div>
  );
}
