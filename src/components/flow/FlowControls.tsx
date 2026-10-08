import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CONTEXT_LABELS } from "@/content/contextLabels";
import type { FlowSnapshot } from "@/content/systemFlow";

type FlowControlsProps = {
  snapshot: FlowSnapshot;
  running: boolean;
  reducedMotion: boolean;
  onStart: () => void;
  onStep: () => void;
  onReset: () => void;
};

/** Buttons that have nothing to do stay focusable, so keyboard focus is never lost. */
const DIM = "aria-disabled:opacity-45";

function startLabel(snapshot: FlowSnapshot, running: boolean): string {
  if (running) return "RUNNING";
  if (snapshot.isComplete) return "RUN AGAIN";
  if (snapshot.isIdle) return "START SIMULATION";
  return "CONTINUE";
}

/** Native buttons: start (or run again), next, reset. */
export function FlowControls({
  snapshot,
  running,
  reducedMotion,
  onStart,
  onStep,
  onReset,
}: FlowControlsProps) {
  // With reduced motion nothing runs by itself, so NEXT is the only way to
  // move on once the first state is active.
  const showStart = !(
    reducedMotion &&
    !snapshot.isIdle &&
    !snapshot.isComplete
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        {showStart ? (
          <Button onClick={onStart} aria-disabled={running} className={DIM}>
            {startLabel(snapshot, running)}
          </Button>
        ) : null}
        <Button
          variant="secondary"
          onClick={onStep}
          aria-disabled={snapshot.isComplete}
          className={DIM}
        >
          NEXT
        </Button>
        <Button
          variant="ghost"
          onClick={onReset}
          aria-disabled={snapshot.isIdle}
          className={DIM}
        >
          RESET
        </Button>
        <Badge tone="violet">{CONTEXT_LABELS.simulation}</Badge>
      </div>
      {reducedMotion ? (
        <p className="type-meta">
          Reduced motion is on. Nothing runs by itself: use NEXT to move through
          the simulation.
        </p>
      ) : null}
    </div>
  );
}
