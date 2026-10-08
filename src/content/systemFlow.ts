/**
 * Shared model of the simulated closed loop. Pure content and pure functions:
 * no React, no DOM, no timers. The How it works chapter reads it today; the
 * VR Demo and Embodiment chapters will read the same definitions later.
 *
 * Vocabulary: the flow has "states". "Stages" belonged to the earlier helmet
 * experience. Everything here is a simulated representation; nothing measures
 * or decodes real neural data.
 */

export type FlowStateId =
  | "idle"
  | "signal-acquired"
  | "signal-processed"
  | "intention-represented"
  | "body-updated"
  | "environment-response"
  | "feedback-simulated";

export type FlowStationId =
  | "brain"
  | "signal-acquisition"
  | "ai-decoder"
  | "intention"
  | "virtual-body"
  | "environment"
  | "feedback";

export type FlowState = {
  id: FlowStateId;
  /** Short uppercase label shown in the interface. */
  label: string;
  /** Plain-language, explicitly simulated description. */
  description: string;
  /** Station that is active in this state. */
  station: FlowStationId;
};

/** What a visitor needs at each state: what they see, and what comes next. */
export type FlowNarration = {
  /** The part of the system in focus. */
  part: string;
  /** What is visible on screen at this moment. */
  seeing: string;
  /** One short, explicitly simulated sentence about it. */
  line: string;
  /** The part that follows, or null at the end of the loop. */
  next: string | null;
};

export type SimulatedIntention = {
  id: string;
  label: string;
};

/** Default time each state is shown during an automatic run. Tunable. */
export const FLOW_STEP_MS = 1600;

export const FLOW_STATES: readonly FlowState[] = [
  {
    id: "idle",
    label: "IDLE",
    description:
      "The simulated loop is at rest. Start the simulation to follow one intention. No real signal is used.",
    station: "brain",
  },
  {
    id: "signal-acquired",
    label: "SIGNAL ACQUIRED",
    description:
      "Simulated signal acquisition. A simulated representation of the signal-acquisition stage.",
    station: "signal-acquisition",
  },
  {
    id: "signal-processed",
    label: "SIGNAL PROCESSED",
    description:
      "Conceptual AI decoder. A simulated representation of signal processing.",
    station: "ai-decoder",
  },
  {
    id: "intention-represented",
    label: "INTENTION REPRESENTED",
    description:
      "Intention representation. A simulated representation of an intended action.",
    station: "intention",
  },
  {
    id: "body-updated",
    label: "VIRTUAL BODY UPDATED",
    description:
      "Virtual control. A simulated representation of the represented intention moving a virtual arm and hand toward a virtual object.",
    station: "virtual-body",
  },
  {
    id: "environment-response",
    label: "ENVIRONMENT RESPONSE",
    description:
      "CONTACT DETECTED. A simulated representation of the virtual hand touching the virtual object, which responds.",
    station: "environment",
  },
  {
    id: "feedback-simulated",
    label: "FEEDBACK SIMULATED",
    description:
      "SIMULATED FEEDBACK EVENT. A simulated representation of a feedback pathway returning from the virtual object, through the feedback interface, toward the user. It does not produce natural sensation.",
    station: "feedback",
  },
];

export const FLOW_NARRATION: Record<FlowStateId, FlowNarration> = {
  idle: {
    seeing:
      "The helmet at rest, a virtual arm and hand lowered, a virtual object beside them, and a thin route through all of it.",
    part: "Intention",
    line: "One simulated intention: MOVE HAND. Nothing has been sent yet.",
    next: "Sensor layer",
  },
  "signal-acquired": {
    seeing:
      "A cyan line runs from the head to the sensor layer, which lights up.",
    part: "Sensor layer",
    line: "Acquires the simulated neural signal.",
    next: "AI decoder",
  },
  "signal-processed": {
    seeing:
      "The cyan line crosses the helmet to the AI decoder, which turns violet-bright.",
    part: "AI decoder",
    line: "Transforms the simulated signal into a represented intention.",
    next: "Represented intention",
  },
  "intention-represented": {
    seeing:
      "A warm white line leaves the decoder carrying the label MOVE HAND.",
    part: "Represented intention",
    line: "MOVE HAND is now represented. Status: VIRTUAL CONTROL ACTIVE. SIMULATION.",
    next: "Virtual body",
  },
  "body-updated": {
    seeing: "The virtual forearm and hand lift toward a virtual object.",
    part: "Virtual body",
    line: "The virtual body is a representation used to show the control idea. The represented intention moves its arm and hand: VIRTUAL CONTROL.",
    next: "Virtual object",
  },
  "environment-response": {
    seeing:
      "The fingers touch the object. A thin ring appears around it, marked CONTACT DETECTED.",
    part: "Virtual environment",
    line: "CONTACT DETECTED. The virtual environment registers the touch. This is information inside the simulation, not a sensation.",
    next: "Simulated feedback event",
  },
  "feedback-simulated": {
    seeing:
      "A pale cyan-white line leaves the object, reaches the feedback band of the helmet and returns toward the user.",
    part: "Feedback interface",
    line: "SIMULATED FEEDBACK EVENT. The prototype represents a possible feedback pathway. It does not currently produce natural sensation.",
    next: null,
  },
};

/** Event labels shown in the flow. Only meaningful inside the SIMULATION. */
export const FLOW_EVENT_LABELS = {
  contact: "CONTACT DETECTED",
  feedbackEvent: "SIMULATED FEEDBACK EVENT",
} as const;

/** The idea of the chapter, shown when the loop closes. */
export const FLOW_LOOP_NOTE =
  "Control is not the end of the loop. Interaction creates information that could return toward the user.";

export const DEFAULT_INTENTION: SimulatedIntention = {
  id: "move-hand",
  label: "MOVE HAND",
};

const FIRST_ACTIVE_INDEX = 1;
const LAST_INDEX = FLOW_STATES.length - 1;
const INTENTION_INDEX = FLOW_STATES.findIndex(
  (state) => state.id === "intention-represented",
);

export const FIRST_ACTIVE_STATE: FlowStateId =
  FLOW_STATES[FIRST_ACTIVE_INDEX].id;
export const LAST_STATE: FlowStateId = FLOW_STATES[LAST_INDEX].id;

/** Everything a section needs to draw or react to one state of the loop. */
export type FlowSnapshot = {
  state: FlowState;
  index: number;
  isIdle: boolean;
  /** True in the last state, when the loop has closed. */
  isComplete: boolean;
  activeStation: FlowStationId;
  /** The simulated intention, once it has been represented. */
  intention: SimulatedIntention | null;
  /** True from the moment the intention is represented. */
  virtualControl: boolean;
  /** True in the feedback state. */
  feedbackActive: boolean;
};

export function flowStateIndex(id: FlowStateId): number {
  return FLOW_STATES.findIndex((state) => state.id === id);
}

export function getFlowSnapshot(
  id: FlowStateId,
  intention: SimulatedIntention = DEFAULT_INTENTION,
): FlowSnapshot {
  const index = flowStateIndex(id);
  return {
    state: FLOW_STATES[index],
    index,
    isIdle: index === 0,
    isComplete: index === LAST_INDEX,
    activeStation: FLOW_STATES[index].station,
    intention: index >= INTENTION_INDEX ? intention : null,
    virtualControl: index >= INTENTION_INDEX,
    feedbackActive: index === LAST_INDEX,
  };
}

export function nextFlowState(id: FlowStateId): FlowStateId | null {
  const index = flowStateIndex(id);
  return index < LAST_INDEX ? FLOW_STATES[index + 1].id : null;
}

export function previousFlowState(id: FlowStateId): FlowStateId | null {
  const index = flowStateIndex(id);
  return index > 0 ? FLOW_STATES[index - 1].id : null;
}
