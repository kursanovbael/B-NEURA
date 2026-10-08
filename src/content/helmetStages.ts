export type HelmetStageId =
  | "hero"
  | "approach"
  | "inspection"
  | "shell"
  | "internal"
  | "separation"
  | "exploded"
  | "interface";

export type HelmetStage = {
  id: HelmetStageId;
  name: string;
  /** Plain-language, explicitly conceptual description. No scientific claims. */
  description: string;
  /** Scroll progress range (0 to 1) in which this stage is active. */
  range: readonly [start: number, end: number];
  /** Progress used when the stage is shown statically (reduced motion). */
  rest: number;
};

/**
 * The stages of the NeuroHelmet concept view. Single source of truth for the
 * scroll timeline ranges, the on-screen caption and the text equivalent.
 * Ranges are an initial proposal and are tunable after visual testing.
 */
export const HELMET_STAGES: readonly HelmetStage[] = [
  {
    id: "hero",
    name: "The NeuroHelmet concept",
    description:
      "A conceptual helmet shown as a research prototype. It does not depict existing hardware.",
    range: [0, 0.15],
    rest: 0.05,
  },
  {
    id: "approach",
    name: "A closer look",
    description:
      "The camera moves in to show the outer shell and its front display band.",
    range: [0.15, 0.3],
    rest: 0.3,
  },
  {
    id: "inspection",
    name: "Inspection angle",
    description:
      "The helmet turns to show its side and the structures around the head.",
    range: [0.3, 0.42],
    rest: 0.42,
  },
  {
    id: "shell",
    name: "Outer shell",
    description:
      "The shell becomes translucent so the layers inside can be seen.",
    range: [0.42, 0.55],
    rest: 0.55,
  },
  {
    id: "internal",
    name: "Inner layers",
    description:
      "A conceptual sensor array, a conceptual AI decoder and a conceptual feedback interface appear in turn.",
    range: [0.55, 0.68],
    rest: 0.68,
  },
  {
    id: "separation",
    name: "Separating the layers",
    description:
      "The layers move apart along fixed directions to show how they relate to each other.",
    range: [0.68, 0.82],
    rest: 0.82,
  },
  {
    id: "exploded",
    name: "Exploded view",
    description:
      "Each conceptual layer is shown on its own: shell, sensors, decoder, feedback interface, support structure and head position.",
    range: [0.82, 0.91],
    rest: 0.865,
  },
  {
    id: "interface",
    name: "Toward the inner interface",
    description:
      "The camera moves toward the sensor and decoder layers. Nothing here represents real neural data.",
    range: [0.91, 1],
    rest: 1,
  },
];
