import type { HelmetLayer } from "./types";

/**
 * Conceptual NeuroHelmet layers. These describe an imagined concept prototype,
 * not existing hardware, and carry no scientific or performance claims.
 */
export const HELMET_LAYERS: readonly HelmetLayer[] = [
  {
    id: "outer-shell",
    name: "Outer Shell",
    description: "Conceptual outer housing of the NeuroHelmet.",
    explodeOffset: [0, 0.85, 0],
  },
  {
    id: "neural-signal-acquisition",
    name: "Neural Signal Acquisition",
    description:
      "Conceptual layer where neural activity could be sensed. Placeholder sensors only.",
    explodeOffset: [0, 0.45, 0],
  },
  {
    id: "conceptual-ai-decoder",
    name: "Conceptual AI Decoder",
    description:
      "Conceptual processing layer where signals could be interpreted by an AI model.",
    explodeOffset: [0, 0.05, 0],
  },
  {
    id: "feedback-interface",
    name: "Feedback Interface",
    description:
      "Conceptual layer representing a possible future pathway for returning feedback.",
    explodeOffset: [0, -0.4, 0],
  },
  {
    id: "internal-support",
    name: "Internal Support Structure",
    description: "Conceptual frame that would hold the layers in place.",
    explodeOffset: [0, -0.8, 0],
  },
  {
    id: "user-head-position",
    name: "User Head Position",
    description: "Reference volume marking where a head would be.",
    explodeOffset: [0, 0, 0],
  },
];
