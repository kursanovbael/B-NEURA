export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function smoothstep(t: number): number {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

/** Position of `value` within [from, to], eased, clamped to 0..1. */
export function ramp(value: number, from: number, to: number): number {
  return smoothstep((value - from) / (to - from));
}
