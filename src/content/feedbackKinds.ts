import { publicMaturity, publicWording, requireWording } from "./claims";
import type { Classification } from "./maturity";

/**
 * The four kinds of returning information shown in "Seeing is not feeling".
 * Badges and research wording come from the claims register, so they only
 * show what has been approved.
 */
export type FeedbackKindId =
  "touch" | "pressure" | "proprioception" | "temperature";

export type FeedbackKind = {
  id: FeedbackKindId;
  number: string;
  name: string;
  claimId: string;
  /** Maturity from the claims register (pending while unresolved). */
  badge: Classification | null;
  /** Approved research wording, or null while the claim is not public. */
  evidence: string | null;
  /** What this page's simulation shows for the kind. */
  simulation: string;
  /** True when nothing at all is simulated. */
  notSimulated: boolean;
};

export const FEEDBACK_KINDS: readonly FeedbackKind[] = [
  {
    id: "touch",
    number: "01",
    name: "TOUCH",
    claimId: "feedback-touch",
    badge: publicMaturity("feedback-touch"),
    evidence: publicWording("feedback-touch"),
    simulation: "A thin ring marks the contact point. Nothing is felt.",
    notSimulated: false,
  },
  {
    id: "pressure",
    number: "02",
    name: "PRESSURE",
    claimId: "feedback-pressure",
    badge: publicMaturity("feedback-pressure"),
    evidence: publicWording("feedback-pressure"),
    simulation:
      "A slightly stronger ring marks a firmer contact. Nothing is felt.",
    notSimulated: false,
  },
  {
    id: "proprioception",
    number: "03",
    name: "POSITION / PROPRIOCEPTION",
    claimId: "feedback-proprioception",
    badge: publicMaturity("feedback-proprioception"),
    evidence: publicWording("feedback-proprioception"),
    simulation:
      "An arc marks the angle of the virtual arm. It is illustrative only.",
    notSimulated: false,
  },
  {
    id: "temperature",
    number: "04",
    name: "TEMPERATURE",
    claimId: "feedback-temperature",
    badge: publicMaturity("feedback-temperature"),
    evidence: publicWording("feedback-temperature"),
    simulation:
      "Not simulated. The research is skin-based, and nothing on this page delivers temperature.",
    notSimulated: true,
  },
];

export const FUTURE_CONCEPT_LINE =
  "A feedback pathway like this is a concept. It is not demonstrated here.";

export const FEEDBACK_ANSWER =
  "Information about the interaction is represented as a feedback pathway. This prototype does not produce natural sensation.";

export type CompareModeId = "current" | "concept";

export type CompareMode = {
  id: CompareModeId;
  label: string;
  description: string;
  /** What happens at contact in this mode. */
  contact: string;
  tags: readonly string[];
};

/**
 * Narrow, hedged descriptions from the claims register. Current VR is never
 * called visual-only.
 */
export const COMPARE_MODES: readonly CompareMode[] = [
  {
    id: "current",
    label: "CURRENT VR INTERACTION",
    description: requireWording("feedback-vr-haptics"),
    contact: "CONTACT, then a visual interaction cue.",
    tags: ["SIMULATION"],
  },
  {
    id: "concept",
    label: "B-NEURA CONCEPT",
    description: requireWording("feedback-bneura-concept"),
    contact:
      "CONTACT, then a simulated feedback pathway through the feedback interface, toward the user.",
    tags: ["NOT DEMONSTRATED HERE", "SIMULATION", "CONCEPT"],
  },
];
