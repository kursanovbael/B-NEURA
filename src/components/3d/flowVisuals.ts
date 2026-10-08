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
  "intention" | "sensors" | "decoder" | "represented" | "hand" | "feedback";

export const FLOW_LABEL_IDS: readonly FlowLabelId[] = [
  "intention",
  "sensors",
  "decoder",
  "represented",
  "hand",
  "feedback",
];

/** The five route segments, in order. */
export const FLOW_PATH_COUNT = 5;

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
  /** Which label is the one in focus right now. */
  active: Record<FlowLabelId, boolean>;
};

const s = (x: number) => smoothstep(clamp01(x));

export function flowVisuals(f: number): FlowVisuals {
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
    active: {
      intention: step === 0,
      sensors: step === 1,
      decoder: step === 2 || step === 3,
      represented: step === 3,
      hand: step === 4 || step === 5,
      feedback: step === 6,
    },
  };
}

/** State the frame loop keeps between frames. Plain object in a ref. */
export type FlowDriverState = {
  /** Index of the state the page is in. */
  target: number;
  /** Eased position the visuals are drawn at. */
  shown: number;
};

/** States travelled per second. */
const TRAVEL_SPEED = 1.25;

export function createFlowDriverState(): FlowDriverState {
  return { target: 0, shown: 0 };
}

export function setFlowTarget(state: FlowDriverState, index: number) {
  state.target = index;
}

/**
 * Moves the drawn position toward the page state at a fixed speed. Going
 * backwards (reset, or run again) never replays the loop in reverse: it jumps
 * to just before the target.
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
}
