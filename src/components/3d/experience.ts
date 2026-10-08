import { HELMET_STAGES } from "@/content/helmetStages";
import type { ExperiencePhase, ExperienceProgress } from "./types";

export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function phaseForProgress(progress: number): ExperiencePhase {
  const p = clamp01(progress);
  for (const stage of HELMET_STAGES) {
    if (p < stage.range[1]) return stage.id;
  }
  return HELMET_STAGES[HELMET_STAGES.length - 1].id;
}

export function toExperience(progress: number): ExperienceProgress {
  const p = clamp01(progress);
  return { progress: p, phase: phaseForProgress(p) };
}

export function smoothstep(t: number): number {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

/** Position of `value` within [from, to], eased, clamped to 0..1. */
export function ramp(value: number, from: number, to: number): number {
  return smoothstep((value - from) / (to - from));
}
