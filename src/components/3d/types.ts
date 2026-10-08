import type { RefObject } from "react";
import type { HelmetComponentId } from "@/content/helmetComponents";

export type Vec3 = readonly [x: number, y: number, z: number];

export type CameraPose = {
  position: Vec3;
  target: Vec3;
  fov: number;
};

/** Conceptual helmet layer categories. Architectural only; not hardware claims. */
export type HelmetLayerId = HelmetComponentId;

export type HelmetLayer = {
  id: HelmetLayerId;
  /** Offset of the layer in the exploded view. */
  explodeOffset: Vec3;
  /** Point in the layer's own space where its callout is anchored. */
  anchor: Vec3;
};

/**
 * Where the experience reads its position in the story from. "scroll" derives
 * it from the stop elements (native scrolling, never intercepted); "fixed" is
 * an explicit stop position (reduced motion, no animation).
 */
export type JourneySource =
  | { mode: "scroll"; stops: RefObject<(HTMLElement | null)[]> }
  | { mode: "fixed"; value: number };
