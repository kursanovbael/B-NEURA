import {
  FIRST_ACTIVE_STATE,
  LAST_STATE,
  nextFlowState,
  type FlowStateId,
} from "@/content/systemFlow";

/**
 * Pure transition logic for the simulated loop. No React, no timers: the same
 * state and action always give the same result.
 */
export type FlowSequenceState = {
  stateId: FlowStateId;
  /** True while states advance automatically. */
  running: boolean;
};

export type FlowAction =
  /** Start, run again, or continue. `auto` is false under reduced motion. */
  | { type: "start"; auto: boolean }
  /** Move to the next state by hand. Pauses automatic progression. */
  | { type: "step" }
  /** One automatic advance, dispatched by the timer. */
  | { type: "tick" }
  | { type: "goTo"; id: FlowStateId }
  | { type: "reset" };

export const INITIAL_FLOW_SEQUENCE: FlowSequenceState = {
  stateId: "idle",
  running: false,
};

export function flowReducer(
  state: FlowSequenceState,
  action: FlowAction,
): FlowSequenceState {
  switch (action.type) {
    case "start": {
      if (state.running) return state;
      // From idle or after completion, begin at the first active state.
      if (state.stateId === "idle" || state.stateId === LAST_STATE) {
        return {
          stateId: FIRST_ACTIVE_STATE,
          running: action.auto,
        };
      }
      // Paused part-way: continue from here.
      return { ...state, running: action.auto };
    }
    case "step": {
      const next = nextFlowState(state.stateId);
      return next === null ? state : { stateId: next, running: false };
    }
    case "tick": {
      if (!state.running) return state;
      const next = nextFlowState(state.stateId);
      if (next === null) return { ...state, running: false };
      return { stateId: next, running: next !== LAST_STATE };
    }
    case "goTo":
      return { stateId: action.id, running: false };
    case "reset":
      return INITIAL_FLOW_SEQUENCE;
  }
}
