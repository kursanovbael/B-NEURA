import type { RefObject } from "react";
import type { HelmetStageId } from "@/content/helmetStages";

export type Vec3 = readonly [x: number, y: number, z: number];

/** Narrative phase of the scroll-driven helmet experience (see helmetStages). */
export type ExperiencePhase = HelmetStageId;

/**
 * Single source of truth the scene reads from. Future scroll logic only has to
 * produce one of these; camera, rotation, separation, transparency, labels and
 * data flow all derive from it.
 */
export type ExperienceProgress = {
  /** 0 (start) to 1 (end). */
  progress: number;
  phase: ExperiencePhase;
};

export type CameraPose = {
  position: Vec3;
  target: Vec3;
  fov: number;
};

/** Conceptual helmet layer categories. Architectural only; not hardware claims. */
export type HelmetLayerId =
  | "outer-shell"
  | "neural-signal-acquisition"
  | "conceptual-ai-decoder"
  | "feedback-interface"
  | "internal-support"
  | "user-head-position";

export type HelmetLayer = {
  id: HelmetLayerId;
  name: string;
  /** Plain-language, explicitly conceptual description. */
  description: string;
  /** Offset applied at progress = 1 (exploded view). */
  explodeOffset: Vec3;
};

/**
 * Where the experience reads its progress from. "scroll" derives progress from
 * the position of a tall track element (native scrolling, never intercepted);
 * "fixed" is an explicit value (reduced-motion stage stepper, dev scrubber).
 */
export type ProgressSource =
  | {
      mode: "scroll";
      track: RefObject<HTMLElement | null>;
      stage: RefObject<HTMLElement | null>;
    }
  | { mode: "fixed"; value: number };
