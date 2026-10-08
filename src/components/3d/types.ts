export type Vec3 = readonly [x: number, y: number, z: number];

/** Narrative phase of the future scroll-driven helmet experience. */
export type ExperiencePhase =
  "hero" | "close-up" | "exploded" | "internal" | "cutaway";

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
