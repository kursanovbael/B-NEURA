import type { HelmetLayer } from "./types";

/**
 * Conceptual NeuroHelmet layers. These describe an imagined concept prototype,
 * not existing hardware, and carry no scientific or performance claims.
 * `explodeOffset` is reserved for the later exploded view; unused in Phase 2.
 */
export const HELMET_LAYERS: readonly HelmetLayer[] = [
  {
    id: "outer-shell",
    name: "Outer Shell",
    description:
      "Conceptual outer housing: a dome with a front display band and side modules.",
    explodeOffset: [0, 0.85, 0],
  },
  {
    id: "neural-signal-acquisition",
    name: "Neural Signal Acquisition",
    description:
      "Conceptual sensor array arranged over the curvature of the head. Illustrative placement only.",
    explodeOffset: [0, 0.45, 0],
  },
  {
    id: "conceptual-ai-decoder",
    name: "Conceptual AI Decoder",
    description:
      "Conceptual processing module at the rear, linked to nearby sensors. Not a real processor.",
    explodeOffset: [0, 0.05, 0],
  },
  {
    id: "feedback-interface",
    name: "Feedback Interface",
    description:
      "Abstract band and pads representing a possible future pathway for returning feedback.",
    explodeOffset: [0, -0.4, 0],
  },
  {
    id: "internal-support",
    name: "Internal Support Structure",
    description:
      "Conceptual ring, arches and posts that would hold the layers in place.",
    explodeOffset: [0, -0.8, 0],
  },
  {
    id: "user-head-position",
    name: "User Head Position",
    description: "Abstract head and neck volume marking where a user would be.",
    explodeOffset: [0, 0, 0],
  },
];
