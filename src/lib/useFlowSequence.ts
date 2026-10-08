"use client";

import { useCallback, useEffect, useMemo, useReducer } from "react";
import {
  FLOW_STEP_MS,
  getFlowSnapshot,
  type FlowSnapshot,
  type FlowStateId,
} from "@/content/systemFlow";
import { flowReducer, INITIAL_FLOW_SEQUENCE } from "./flowReducer";

type UseFlowSequenceOptions = {
  /** With reduced motion nothing advances automatically. */
  reducedMotion?: boolean;
  /** Pauses automatic progression (for example while off-screen). */
  paused?: boolean;
  /** Time each state is shown during an automatic run. */
  stepMs?: number;
};

export type FlowSequence = {
  snapshot: FlowSnapshot;
  running: boolean;
  start: () => void;
  step: () => void;
  goTo: (id: FlowStateId) => void;
  reset: () => void;
};

/**
 * Drives the shared flow model. State changes only on discrete transitions
 * (one timer per state), never per frame. Each section that needs the
 * sequence owns its own instance; there is no shared provider yet.
 */
export function useFlowSequence({
  reducedMotion = false,
  paused = false,
  stepMs = FLOW_STEP_MS,
}: UseFlowSequenceOptions = {}): FlowSequence {
  const [sequence, dispatch] = useReducer(flowReducer, INITIAL_FLOW_SEQUENCE);

  const autoAdvance = sequence.running && !paused && !reducedMotion;
  useEffect(() => {
    if (!autoAdvance) return;
    const timer = window.setTimeout(() => dispatch({ type: "tick" }), stepMs);
    return () => window.clearTimeout(timer);
  }, [autoAdvance, sequence.stateId, stepMs]);

  const snapshot = useMemo(
    () => getFlowSnapshot(sequence.stateId),
    [sequence.stateId],
  );

  const start = useCallback(
    () => dispatch({ type: "start", auto: !reducedMotion }),
    [reducedMotion],
  );
  const step = useCallback(() => dispatch({ type: "step" }), []);
  const goTo = useCallback(
    (id: FlowStateId) => dispatch({ type: "goTo", id }),
    [],
  );
  const reset = useCallback(() => dispatch({ type: "reset" }), []);

  return {
    snapshot,
    running: sequence.running && !reducedMotion,
    start,
    step,
    goTo,
    reset,
  };
}
