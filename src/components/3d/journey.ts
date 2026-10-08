import { STOPS, type StopId } from "@/content/chapters";
import { evaluate, makeCurve, type Curve } from "./curves";
import type { CameraPose, HelmetLayerId, Vec3 } from "./types";

/**
 * Deterministic journey through the NeuroHelmet story.
 *
 * Each stop (a block of text, see content/chapters) has one state of the
 * helmet. `sampleJourney(j, aspect)` is pure: j is a position between stops
 * (0 is the first stop, 1 the second, and so on), and the same j and aspect
 * always give the same state. Values are interpolated with a monotone cubic,
 * so there is no overshoot. Numbers are tunable after visual review.
 */

export const LAYER_IDS: readonly HelmetLayerId[] = [
  "outer-shell",
  "neural-signal-acquisition",
  "conceptual-ai-decoder",
  "feedback-interface",
  "internal-support",
  "user-head-position",
];

type StopState = {
  position: Vec3;
  target: Vec3;
  yaw: number;
  /** Outer shell opacity. */
  shell: number;
  /** Layer shown at full strength; others are dimmed. "all" or "none" dim none or all. */
  focus: HelmetLayerId | "all" | "none";
  /** Layer whose callout is shown (assembled stops). */
  narrated?: HelmetLayerId;
  separation?: number;
  /** Axis, ticks and plinth of the exploded view. */
  guides?: number;
  /** Every callout, as hotspots (exploded view). */
  allCallouts?: number;
  /** Path from the head toward a virtual body (0 hidden, 1 shown). */
  path?: number;
  /** 0: the path stops short. 1: it reaches the virtual body. */
  bridge?: number;
  /** 1 while the simulated flow is shown (hand, route and labels). */
  flow?: number;
  /** Horizontal shift of the helmet on wide screens (fraction of the width). */
  frameX?: number;
};

/** Yaw at which the flow chapter is drawn: the decoder faces the virtual hand. */
export const FLOW_YAW = -Math.PI / 2;
const DEFAULT_FRAME_X = 0.17;
const FRAME_Y = 0.17;

const HERO_POSITION: Vec3 = [1.75, 0.63, 2.97];
const HERO_TARGET: Vec3 = [0, 0.02, 0];

const STOP_STATES: Record<StopId, StopState> = {
  hero: {
    position: HERO_POSITION,
    target: HERO_TARGET,
    yaw: 0,
    shell: 1,
    focus: "all",
  },
  gap: {
    position: [1.7, 0.5, 3.2],
    target: [0.2, -0.05, 0],
    yaw: -0.35,
    shell: 0.5,
    focus: "user-head-position",
    path: 1,
    bridge: 0,
  },
  "idea-interface": {
    position: [1.5, 0.85, 2.7],
    target: [0, 0.45, 0],
    yaw: -0.7,
    shell: 0.3,
    focus: "neural-signal-acquisition",
    narrated: "neural-signal-acquisition",
  },
  "idea-decoder": {
    position: [1.5, 0.7, 2.8],
    target: [0, 0.2, -0.2],
    yaw: -2.2,
    shell: 0.3,
    focus: "conceptual-ai-decoder",
    narrated: "conceptual-ai-decoder",
  },
  "idea-body": {
    position: [2.6, 0.8, 4.6],
    target: [0.5, -0.1, 0.2],
    yaw: -1.2,
    shell: 0.3,
    focus: "none",
    path: 1,
    bridge: 1,
  },
  "idea-feedback": {
    position: [1.5, 0.35, 2.7],
    target: [0, -0.2, 0],
    yaw: -0.9,
    shell: 0.3,
    focus: "feedback-interface",
    narrated: "feedback-interface",
  },
  "part-user-head-position": {
    position: [1.5, 0.5, 2.7],
    target: [0, 0, 0],
    yaw: -0.5,
    shell: 0.28,
    focus: "user-head-position",
    narrated: "user-head-position",
  },
  "part-neural-signal-acquisition": {
    position: [1.45, 0.95, 2.55],
    target: [0, 0.5, 0],
    yaw: -0.9,
    shell: 0.28,
    focus: "neural-signal-acquisition",
    narrated: "neural-signal-acquisition",
  },
  "part-conceptual-ai-decoder": {
    position: [1.5, 0.7, 2.8],
    target: [0, 0.2, -0.2],
    yaw: -2.3,
    shell: 0.28,
    focus: "conceptual-ai-decoder",
    narrated: "conceptual-ai-decoder",
  },
  "part-feedback-interface": {
    position: [1.5, 0.3, 2.7],
    target: [0, -0.25, 0],
    yaw: -1.1,
    shell: 0.28,
    focus: "feedback-interface",
    narrated: "feedback-interface",
  },
  "part-internal-support": {
    position: [1.8, 0.4, 3.1],
    target: [0, 0.1, 0],
    yaw: -1.6,
    shell: 0.28,
    focus: "internal-support",
    narrated: "internal-support",
  },
  "part-outer-shell": {
    position: [2.1, 0.8, 3.5],
    target: [0, 0.2, 0],
    yaw: -0.6,
    shell: 0.75,
    focus: "outer-shell",
    narrated: "outer-shell",
  },
  flow: {
    position: [2.5, 0.9, 4.8],
    target: [1.0, 0.05, 0.15],
    yaw: FLOW_YAW,
    shell: 0.14,
    focus: "all",
    flow: 1,
    frameX: 0.27,
  },
  exploded: {
    position: [3.5, 1.1, 6.9],
    target: [0, 0.55, 0],
    yaw: -0.5,
    shell: 0.36,
    focus: "all",
    separation: 1,
    guides: 1,
    allCallouts: 1,
  },
};

const STOP_ORDER: readonly StopState[] = STOPS.map(
  (stop) => STOP_STATES[stop.id],
);

/** Opacity factor of a layer that is not in focus. */
export const DIMMED_FACTOR = 0.18;
const DIMMED_FOCUS = 0.35;

/** Narrow screens pull the camera back so the helmet stays in frame. */
const REFERENCE_ASPECT = 1.3;
const MAX_ASPECT_PULLBACK = 2.2;
const FOV = 32;
/** Pulls every stop back a little so the helmet never fills the frame. */
/** Extra pullback, on tall screens, while the flow stop is on screen. */
const FLOW_PORTRAIT_EXTRA = 0.15;
/** On tall screens the flow scene sits a little right of and above its usual frame. */
const PORTRAIT_FLOW_SHIFT = { x: 0.07, y: 0.07 };
const DISTANCE_SCALE = 1.3;

function curveOf(pick: (state: StopState, index: number) => number): Curve {
  return makeCurve(STOP_ORDER.map((state, i) => [i, pick(state, i)] as const));
}

function vecCurves(pick: (state: StopState) => Vec3): Curve[] {
  return [0, 1, 2].map((axis) => curveOf((state) => pick(state)[axis]));
}

function focusValue(state: StopState, layer: HelmetLayerId): number {
  if (state.focus === "all") return 1;
  if (state.focus === "none") return DIMMED_FOCUS;
  return state.focus === layer ? 1 : 0;
}

const POSITION = vecCurves((s) => s.position);
const TARGET = vecCurves((s) => s.target);
const YAW = curveOf((s) => s.yaw);
const SHELL = curveOf((s) => s.shell);
const SEPARATION = curveOf((s) => s.separation ?? 0);
const GUIDES = curveOf((s) => s.guides ?? 0);
const ALL_CALLOUTS = curveOf((s) => s.allCallouts ?? 0);
const PATH = curveOf((s) => s.path ?? 0);
const BRIDGE = curveOf((s) => s.bridge ?? 0);
const FLOW = curveOf((s) => s.flow ?? 0);
const FRAME_X = curveOf((s) => s.frameX ?? DEFAULT_FRAME_X);
const FOCUS = Object.fromEntries(
  LAYER_IDS.map((id) => [id, curveOf((s) => focusValue(s, id))]),
) as Record<HelmetLayerId, Curve>;
const NARRATED = Object.fromEntries(
  LAYER_IDS.map((id) => [id, curveOf((s) => (s.narrated === id ? 1 : 0))]),
) as Record<HelmetLayerId, Curve>;

export type JourneyState = {
  camera: CameraPose;
  yaw: number;
  shellOpacity: number;
  /** 0 (dimmed) to 1 (full) per layer. */
  focus: Record<HelmetLayerId, number>;
  /** 0 to 1 visibility of each layer's callout. */
  callouts: Record<HelmetLayerId, number>;
  separation: number;
  guides: number;
  /** 0 to 1: callouts are interactive hotspots. */
  hotspots: number;
  path: number;
  bridge: number;
  /** 0 to 1: the simulated flow is on screen. */
  flowWeight: number;
  /** Where the helmet sits in the frame (fractions of width and height). */
  shift: { x: number; y: number };
};

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function sampleVec(curves: readonly Curve[], j: number): Vec3 {
  return [
    evaluate(curves[0], j),
    evaluate(curves[1], j),
    evaluate(curves[2], j),
  ];
}

export function sampleJourney(j: number, aspect = 16 / 9): JourneyState {
  const target = sampleVec(TARGET, j);
  const position = sampleVec(POSITION, j);
  const pullback =
    aspect >= REFERENCE_ASPECT
      ? 1
      : Math.min(MAX_ASPECT_PULLBACK, REFERENCE_ASPECT / aspect);
  // The flow scene is wide (helmet and virtual hand side by side), so tall
  // screens step further back while it is on screen.
  const flowWeight = clamp01(evaluate(FLOW, j));
  const flowReach = aspect < 1.2 ? 1 + FLOW_PORTRAIT_EXTRA * flowWeight : 1;
  const reach = pullback * DISTANCE_SCALE * flowReach;

  const hotspots = clamp01(evaluate(ALL_CALLOUTS, j));
  const focus = {} as Record<HelmetLayerId, number>;
  const callouts = {} as Record<HelmetLayerId, number>;
  for (const id of LAYER_IDS) {
    focus[id] = clamp01(evaluate(FOCUS[id], j));
    callouts[id] = Math.max(hotspots, clamp01(evaluate(NARRATED[id], j)));
  }

  return {
    camera: {
      position: [
        target[0] + (position[0] - target[0]) * reach,
        target[1] + (position[1] - target[1]) * reach,
        target[2] + (position[2] - target[2]) * reach,
      ],
      target,
      fov: FOV,
    },
    yaw: evaluate(YAW, j),
    shellOpacity: clamp01(evaluate(SHELL, j)),
    focus,
    callouts,
    separation: clamp01(evaluate(SEPARATION, j)),
    guides: clamp01(evaluate(GUIDES, j)),
    hotspots,
    path: clamp01(evaluate(PATH, j)),
    bridge: clamp01(evaluate(BRIDGE, j)),
    flowWeight,
    shift:
      aspect >= 1.2
        ? { x: evaluate(FRAME_X, j), y: 0 }
        : {
            x: PORTRAIT_FLOW_SHIFT.x * flowWeight,
            y: FRAME_Y + PORTRAIT_FLOW_SHIFT.y * flowWeight,
          },
  };
}
