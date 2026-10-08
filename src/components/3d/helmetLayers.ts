import type { HelmetLayer } from "./types";

/**
 * Where each conceptual layer goes in the exploded view and where its callout
 * is anchored. Names and teaching text live in content/helmetComponents.
 * Everything here is illustrative: it describes an imagined concept prototype.
 */
export const HELMET_LAYERS: readonly HelmetLayer[] = [
  {
    id: "outer-shell",
    explodeOffset: [0, 1.7, 0],
    anchor: [0, 0.55, 0],
  },
  {
    id: "neural-signal-acquisition",
    explodeOffset: [0, 0.45, 0],
    anchor: [0, 0.5, 0],
  },
  {
    id: "conceptual-ai-decoder",
    explodeOffset: [0, 0.05, -0.5],
    anchor: [0, 0.18, -0.7],
  },
  {
    id: "feedback-interface",
    explodeOffset: [0, -0.45, 0],
    anchor: [0.49, -0.3, -0.33],
  },
  {
    id: "internal-support",
    explodeOffset: [0, -1, 0],
    anchor: [0.62, -0.12, 0],
  },
  {
    id: "user-head-position",
    explodeOffset: [0, 0, 0],
    anchor: [0, 0, 0],
  },
];
