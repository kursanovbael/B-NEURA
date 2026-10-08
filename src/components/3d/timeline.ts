import { clamp01, ramp } from "./experience";
import type { CameraPose, Vec3 } from "./types";

/**
 * Deterministic timeline for the NeuroHelmet scroll experience.
 *
 * `sampleTimeline(progress, aspect)` is a pure function: the same progress and
 * aspect always give the same state. Keyframed values are interpolated with a
 * monotone cubic (Fritsch-Carlson), so velocity is continuous across keyframes:
 * motion flows from one stage into the next instead of stopping at every
 * boundary. It only comes to rest where the data holds a value (equal
 * neighbouring keys) or at the very start and end. The curve never overshoots
 * its keyframes. All numbers are tunable after visual testing.
 */

type Key<T> = readonly [progress: number, value: T];

const FOV = 32;

const CAMERA_POSITION: readonly Key<Vec3>[] = [
  [0, [1.95, 0.7, 3.3]],
  [0.15, [1.95, 0.7, 3.3]],
  [0.3, [1.7, 0.65, 3.0]],
  [0.42, [1.65, 0.7, 2.95]],
  [0.55, [1.6, 0.78, 2.9]],
  [0.64, [1.5, 0.95, 2.85]],
  [0.82, [3.5, 1.1, 6.7]],
  [0.91, [3.5, 1.1, 6.7]],
  // Final inspection view: a calm medium shot with room around the layers.
  [1, [0.7, 1.2, 5.0]],
];

const CAMERA_TARGET: readonly Key<Vec3>[] = [
  [0, [0, 0.02, 0]],
  [0.15, [0, 0.02, 0]],
  [0.3, [0, 0.05, 0]],
  [0.42, [0, 0.08, 0]],
  [0.55, [0, 0.12, 0]],
  [0.64, [0, 0.15, 0]],
  [0.82, [0, 0.75, 0]],
  [0.91, [0, 0.75, 0]],
  [1, [0, 0.7, 0]],
];

/**
 * Helmet yaw in radians. Turns one way only and stays within about 130
 * degrees: no full spin, and no reversal that would stop the motion.
 */
const YAW: readonly Key<number>[] = [
  [0, 0],
  [0.15, 0],
  [0.3, -0.3],
  [0.42, -0.9],
  [0.55, -1.4],
  [0.64, -2.0],
  [0.82, -2.1],
  [0.91, -2.1],
  [1, -2.3],
];

/** Outer shell opacity. Opaque first, translucent later, never below 0.2. */
const SHELL_OPACITY: readonly Key<number>[] = [
  [0, 1],
  [0.42, 1],
  [0.55, 0.24],
  [1, 0.22],
];

/** Progress ranges in which each inner layer is brought into focus. */
export const REVEAL_RANGES = {
  sensors: [0.54, 0.6],
  decoder: [0.59, 0.64],
  feedback: [0.63, 0.68],
} as const;

/** Progress range of the separation of the layers. */
export const SEPARATION_RANGE = [0.68, 0.82] as const;

/** Narrow screens pull the camera back so the helmet stays in frame. */
const REFERENCE_ASPECT = 1.3;
const MAX_ASPECT_PULLBACK = 2.2;

export type TimelineState = {
  camera: CameraPose;
  yaw: number;
  shellOpacity: number;
  /** 0 (dimmed) to 1 (fully shown) for each inner layer. */
  reveal: { sensors: number; decoder: number; feedback: number };
  /** 0 (assembled) to 1 (fully separated). */
  separation: number;
};

/** A scalar curve through keyframes with precomputed tangents. */
type Curve = {
  xs: readonly number[];
  ys: readonly number[];
  slopes: readonly number[];
};

/**
 * Monotone cubic Hermite tangents (Fritsch-Carlson / PCHIP). Where the data
 * changes direction or holds a value, the tangent is zero, so the curve never
 * overshoots; elsewhere the tangent is shared by both neighbouring segments,
 * which keeps velocity continuous. The ends start and finish at rest.
 */
function makeCurve(keys: readonly Key<number>[]): Curve {
  const n = keys.length;
  const xs = keys.map(([x]) => x);
  const ys = keys.map(([, y]) => y);
  const h = xs.slice(1).map((x, i) => x - xs[i]);
  const d = h.map((hi, i) => (ys[i + 1] - ys[i]) / hi);

  const slopes = new Array<number>(n).fill(0);
  for (let i = 1; i < n - 1; i++) {
    if (d[i - 1] * d[i] > 0) {
      const w1 = 2 * h[i] + h[i - 1];
      const w2 = h[i] + 2 * h[i - 1];
      slopes[i] = (w1 + w2) / (w1 / d[i - 1] + w2 / d[i]);
    }
  }
  return { xs, ys, slopes };
}

function evaluate(curve: Curve, p: number): number {
  const { xs, ys, slopes } = curve;
  const last = xs.length - 1;
  if (p <= xs[0]) return ys[0];
  if (p >= xs[last]) return ys[last];

  let i = 0;
  while (p > xs[i + 1]) i++;

  const h = xs[i + 1] - xs[i];
  const t = (p - xs[i]) / h;
  const t2 = t * t;
  const t3 = t2 * t;
  return (
    (2 * t3 - 3 * t2 + 1) * ys[i] +
    (t3 - 2 * t2 + t) * h * slopes[i] +
    (-2 * t3 + 3 * t2) * ys[i + 1] +
    (t3 - t2) * h * slopes[i + 1]
  );
}

function vec3Curves(keys: readonly Key<Vec3>[]) {
  return [0, 1, 2].map((axis) =>
    makeCurve(keys.map(([p, v]) => [p, v[axis]] as const)),
  );
}

const POSITION_CURVES = vec3Curves(CAMERA_POSITION);
const TARGET_CURVES = vec3Curves(CAMERA_TARGET);
const YAW_CURVE = makeCurve(YAW);
const SHELL_CURVE = makeCurve(SHELL_OPACITY);

function sampleVec3(curves: readonly Curve[], p: number): Vec3 {
  return [
    evaluate(curves[0], p),
    evaluate(curves[1], p),
    evaluate(curves[2], p),
  ];
}

export function sampleTimeline(
  progress: number,
  aspect = 16 / 9,
): TimelineState {
  const p = clamp01(progress);
  const target = sampleVec3(TARGET_CURVES, p);
  const position = sampleVec3(POSITION_CURVES, p);

  const pullback =
    aspect >= REFERENCE_ASPECT
      ? 1
      : Math.min(MAX_ASPECT_PULLBACK, REFERENCE_ASPECT / aspect);

  return {
    camera: {
      position: [
        target[0] + (position[0] - target[0]) * pullback,
        target[1] + (position[1] - target[1]) * pullback,
        target[2] + (position[2] - target[2]) * pullback,
      ],
      target,
      fov: FOV,
    },
    yaw: evaluate(YAW_CURVE, p),
    shellOpacity: evaluate(SHELL_CURVE, p),
    reveal: {
      sensors: ramp(p, ...REVEAL_RANGES.sensors),
      decoder: ramp(p, ...REVEAL_RANGES.decoder),
      feedback: ramp(p, ...REVEAL_RANGES.feedback),
    },
    separation: ramp(p, ...SEPARATION_RANGE),
  };
}
