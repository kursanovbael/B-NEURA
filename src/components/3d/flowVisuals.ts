import type { FeedbackKindId } from "@/content/feedbackKinds";
import { clamp01, smoothstep } from "./experience";

/**
 * Pure mapping from the position in the simulated loop to what is drawn.
 *
 * `f` is a position along the loop states: 0 is idle, 1 is signal acquired,
 * and so on up to 6, feedback simulated. Each integer means that state has
 * been reached; values between are the signal travelling there. The same f
 * always gives the same visuals. Nothing here measures or decodes anything:
 * it all draws a simulation.
 */

export type FlowLabelId =
  | "intention"
  | "sensors"
  | "decoder"
  | "represented"
  | "hand"
  | "object"
  | "feedback"
  | "user"
  | "cue"
  | "kind"
  | "angle";

export const FLOW_LABEL_IDS: readonly FlowLabelId[] = [
  "intention",
  "sensors",
  "decoder",
  "represented",
  "hand",
  "object",
  "feedback",
  "user",
  "cue",
  "kind",
  "angle",
];

/** The five route segments, in order. */
export const FLOW_PATH_COUNT = 5;
/** The five story segments plus the visual cue used by "Seeing is not feeling". */
export const FLOW_ROUTE_COUNT = 6;

/**
 * Emphasis used by the chapters that explain what returns. Every value eases
 * between 0 and 1 and is zero in the flow chapter itself.
 */
export type FlowEmphasis = {
  /** The gray visual interaction cue from the object to the display band. */
  cue: number;
  touch: number;
  pressure: number;
  /** The arm-angle arc (position / proprioception, illustrative). */
  arc: number;
  /** The temperature selection: nothing is simulated, a pending marker shows. */
  temperature: number;
  /** Fades the labels of the earlier story steps. */
  focus: number;
};

export const NO_EMPHASIS: FlowEmphasis = {
  cue: 0,
  touch: 0,
  pressure: 0,
  arc: 0,
  temperature: 0,
  focus: 0,
};

export type FlowVisuals = {
  /** 0 to 1 progress along each of the five route segments. */
  paths: readonly [number, number, number, number, number];
  /** Segment currently travelled by the pulse, or -1 when none. */
  pulsePath: number;
  pulseAt: number;
  sensorGlow: number;
  decoderGlow: number;
  feedbackGlow: number;
  /** 0 (resting) to 1 (raised): the virtual hand movement. */
  handRaise: number;
  /** 0 to 1: the virtual target responds. */
  targetResponse: number;
  /** Visibility of the "represented intention" tag. */
  represented: number;
  /** Eased emphasis values, zero in the flow chapter. */
  emphasis: FlowEmphasis;
  /** Which label is the one in focus right now. */
  active: Record<FlowLabelId, boolean>;
};

const s = (x: number) => smoothstep(clamp01(x));

export function flowVisuals(
  f: number,
  emphasis: FlowEmphasis = NO_EMPHASIS,
): FlowVisuals {
  const paths = [
    s(f),
    s(f - 1),
    s(f - 3),
    s((f - 5) * 2),
    s((f - 5) * 2 - 1),
  ] as const;

  let pulsePath = -1;
  for (let i = 0; i < paths.length; i++) {
    if (paths[i] > 0.001 && paths[i] < 0.999) {
      pulsePath = i;
      break;
    }
  }

  const step = Math.round(f);
  return {
    paths,
    pulsePath,
    pulseAt: pulsePath >= 0 ? paths[pulsePath] : 0,
    sensorGlow: s(f) * (1 - s(f - 2)),
    decoderGlow: s(f - 1) * (1 - s(f - 4)),
    feedbackGlow: s(f - 5),
    handRaise: s(f - 3.5),
    targetResponse: s((f - 4.5) * 2),
    represented: s(f - 2),
    emphasis,
    active: {
      intention: step === 0,
      sensors: step === 1,
      decoder: step === 2 || step === 3,
      represented: step === 3,
      hand: step === 4,
      object: step === 5,
      feedback: step === 6,
      user: step === 6,
      cue: true,
      kind: true,
      angle: true,
    },
  };
}

/**
 * 0 to 1: how closely a tall screen frames the hand and the object. It is 1
 * while the hand moves and touches (states 4 and 5) and relaxes before the
 * feedback returns, so the whole route is in view again.
 */
export function contactFocus(f: number): number {
  return s(f - 3) * (1 - s(f - 5));
}

/** What the chapters that explain what returns ask the scene to show. */
export type FlowMode = {
  cue: boolean;
  kind: FeedbackKindId | null;
  /** Fades the labels of the earlier story steps. */
  focus: boolean;
};

export const FLOW_MODE_OFF: FlowMode = { cue: false, kind: null, focus: false };

/** State the frame loop keeps between frames. Plain object in a ref. */
export type FlowDriverState = {
  /** Index of the state the page is in. */
  target: number;
  /** Eased position the visuals are drawn at. */
  shown: number;
  mode: FlowMode;
  emphasis: FlowEmphasis;
};

/** States travelled per second. */
const TRAVEL_SPEED = 1.25;
/** Rate (1/s) at which the emphasis values ease. */
const EMPHASIS_RATE = 8;

export function createFlowDriverState(): FlowDriverState {
  return {
    target: 0,
    shown: 0,
    mode: FLOW_MODE_OFF,
    emphasis: { ...NO_EMPHASIS },
  };
}

export function setFlowTarget(state: FlowDriverState, index: number) {
  state.target = index;
}

export function setFlowMode(state: FlowDriverState, mode: FlowMode) {
  state.mode = mode;
}

function emphasisTargets(mode: FlowMode): FlowEmphasis {
  return {
    cue: mode.cue ? 1 : 0,
    touch: mode.kind === "touch" ? 1 : 0,
    pressure: mode.kind === "pressure" ? 1 : 0,
    arc: mode.kind === "proprioception" ? 1 : 0,
    temperature: mode.kind === "temperature" ? 1 : 0,
    focus: mode.focus ? 1 : 0,
  };
}

/**
 * Moves the drawn position toward the page state at a fixed speed. Going
 * backwards (reset, or run again) never replays the loop in reverse: it jumps
 * to just before the target. The emphasis values ease toward the mode.
 */
export function stepFlow(
  state: FlowDriverState,
  delta: number,
  instant: boolean,
) {
  if (instant) {
    state.shown = state.target;
  } else if (state.target < state.shown - 0.001) {
    state.shown = Math.max(0, state.target - 1);
  } else {
    state.shown = Math.min(state.target, state.shown + TRAVEL_SPEED * delta);
  }

  const targets = emphasisTargets(state.mode);
  const ease = instant ? 1 : 1 - Math.exp(-EMPHASIS_RATE * delta);
  for (const key of Object.keys(targets) as (keyof FlowEmphasis)[]) {
    const next =
      state.emphasis[key] + (targets[key] - state.emphasis[key]) * ease;
    state.emphasis[key] =
      Math.abs(targets[key] - next) < 1e-3 ? targets[key] : next;
  }
}
