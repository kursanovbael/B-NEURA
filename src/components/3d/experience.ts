import type { ExperiencePhase, ExperienceProgress } from "./types";

export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/** Upper bound (exclusive) of each phase along the 0..1 progress range. */
const PHASE_BOUNDS: ReadonlyArray<readonly [ExperiencePhase, number]> = [
  ["hero", 0.2],
  ["close-up", 0.4],
  ["exploded", 0.65],
  ["internal", 0.85],
];

export function phaseForProgress(progress: number): ExperiencePhase {
  const p = clamp01(progress);
  for (const [phase, bound] of PHASE_BOUNDS) {
    if (p < bound) return phase;
  }
  return "cutaway";
}

export function toExperience(progress: number): ExperienceProgress {
  const p = clamp01(progress);
  return { progress: p, phase: phaseForProgress(p) };
}

export function smoothstep(t: number): number {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}
