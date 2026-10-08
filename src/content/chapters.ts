import type { HelmetComponentId } from "./helmetComponents";

/**
 * The story told around the NeuroHelmet. A "stop" is one block of text with a
 * matching state of the helmet; scrolling moves from stop to stop. All copy is
 * conceptual. Statements that would be scientific facts are held back or
 * hedged until they are verified (see the claims register).
 */
export type ChapterId = "arrive" | "gap" | "idea" | "inside" | "flow";

export type Chapter = {
  id: ChapterId;
  /** Name in the chapter navigation. */
  name: string;
  /** Anchor of the chapter's first stop. */
  anchor: string;
};

export const CHAPTERS: readonly Chapter[] = [
  { id: "arrive", name: "Arrive", anchor: "arrive" },
  { id: "gap", name: "The gap", anchor: "the-gap" },
  { id: "idea", name: "The idea", anchor: "the-idea" },
  { id: "inside", name: "Inside", anchor: "inside" },
  { id: "flow", name: "How it works", anchor: "how-it-works" },
];

export type StopId =
  | "hero"
  | "gap"
  | "idea-interface"
  | "idea-decoder"
  | "idea-body"
  | "idea-feedback"
  | "part-user-head-position"
  | "part-neural-signal-acquisition"
  | "part-conceptual-ai-decoder"
  | "part-feedback-interface"
  | "part-internal-support"
  | "part-outer-shell"
  | "exploded"
  | "flow";

export type Stop = {
  id: StopId;
  chapter: ChapterId;
  /** Set when the stop teaches one helmet component. */
  component?: HelmetComponentId;
  /** Introduces the chapter when it is the first stop in it. */
  chapterHeadline?: string;
  headline: string;
  body: readonly string[];
};

export const STOPS: readonly Stop[] = [
  {
    id: "hero",
    chapter: "arrive",
    headline: "Beyond the Physical Body",
    body: [
      "A conceptual Neuro-VR prototype. Turn the helmet, open it up and see how each part could connect.",
    ],
  },
  {
    id: "gap",
    chapter: "gap",
    headline:
      "When the body stops responding, the brain may not stop intending.",
    body: [
      "Intending to move and moving are two separate things. This concept explores a pathway that does not depend on the body moving.",
      "What if the brain could communicate with another body?",
    ],
  },
  {
    id: "idea-interface",
    chapter: "idea",
    chapterHeadline: "A new pathway between intention and experience.",
    headline: "Brain interface",
    body: [
      "The part that would pick up a signal. In this concept it sits around the head.",
    ],
  },
  {
    id: "idea-decoder",
    chapter: "idea",
    headline: "AI decoder",
    body: [
      "The part that would interpret that signal as an intended action. Here it is a conceptual module.",
    ],
  },
  {
    id: "idea-body",
    chapter: "idea",
    headline: "Virtual body",
    body: [
      "A digital body that could carry out the intended action. It lives outside the helmet and arrives in a later chapter.",
    ],
  },
  {
    id: "idea-feedback",
    chapter: "idea",
    headline: "Sensory feedback",
    body: [
      "A possible future way to send information about what happened back to the user. It is a concept, not something this page can do.",
    ],
  },
  {
    id: "part-user-head-position",
    chapter: "inside",
    component: "user-head-position",
    chapterHeadline: "Inside the NeuroHelmet",
    headline: "User head position",
    body: [
      "Follow the path of a simulated signal through each conceptual part.",
    ],
  },
  {
    id: "part-neural-signal-acquisition",
    chapter: "inside",
    component: "neural-signal-acquisition",
    headline: "Neural signal acquisition",
    body: [],
  },
  {
    id: "part-conceptual-ai-decoder",
    chapter: "inside",
    component: "conceptual-ai-decoder",
    headline: "Conceptual AI decoder",
    body: [],
  },
  {
    id: "part-feedback-interface",
    chapter: "inside",
    component: "feedback-interface",
    headline: "Feedback interface",
    body: [],
  },
  {
    id: "part-internal-support",
    chapter: "inside",
    component: "internal-support",
    headline: "Internal support structure",
    body: [],
  },
  {
    id: "part-outer-shell",
    chapter: "inside",
    component: "outer-shell",
    headline: "Outer shell",
    body: [],
  },
  {
    id: "exploded",
    chapter: "inside",
    headline: "The exploded view",
    body: [
      "Every conceptual part, pulled apart along one axis. Select a part to see what it represents, its role, where it connects and how mature it is.",
    ],
  },
  {
    id: "flow",
    chapter: "flow",
    chapterHeadline: "Follow one intention.",
    headline: "MOVE HAND",
    body: [
      "A simulation of one intention travelling through the helmet and back. Nothing here uses or decodes real signals.",
    ],
  },
];

export function stopIndexOf(id: StopId): number {
  return STOPS.findIndex((stop) => stop.id === id);
}

export function chapterIndexOf(id: ChapterId): number {
  return CHAPTERS.findIndex((chapter) => chapter.id === id);
}
