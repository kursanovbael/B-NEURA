import { claims } from "./claims";
import type { Classification } from "./maturity";

/**
 * The four kinds of returning information shown in "Seeing is not feeling".
 * Wording comes from the claims register. Every public badge stays pending
 * until final verification, whatever the register's source status.
 */
export type FeedbackKindId =
  "touch" | "pressure" | "proprioception" | "temperature";

export type FeedbackKind = {
  id: FeedbackKindId;
  number: string;
  name: string;
  claimId: string;
  /** Always pending in the interface until the claim is VERIFIED. */
  badge: Classification;
  /** Approved research wording, or null when none is approved. */
  evidence: string | null;
  /** What this page's simulation shows for the kind. */
  simulation: string;
  /** True when nothing at all is simulated. */
  notSimulated: boolean;
};

function wordingOf(claimId: string): string | null {
  return claims.find((claim) => claim.id === claimId)?.wording ?? null;
}

export const FEEDBACK_KINDS: readonly FeedbackKind[] = [
  {
    id: "touch",
    number: "01",
    name: "TOUCH",
    claimId: "feedback-touch",
    badge: "requires-source-verification",
    evidence: wordingOf("feedback-touch"),
    simulation: "A thin ring marks the contact point. Nothing is felt.",
    notSimulated: false,
  },
  {
    id: "pressure",
    number: "02",
    name: "PRESSURE",
    claimId: "feedback-pressure",
    badge: "requires-source-verification",
    evidence: wordingOf("feedback-pressure"),
    simulation:
      "A slightly stronger ring marks a firmer contact. Nothing is felt.",
    notSimulated: false,
  },
  {
    id: "proprioception",
    number: "03",
    name: "POSITION / PROPRIOCEPTION",
    claimId: "feedback-proprioception",
    badge: "requires-source-verification",
    evidence: wordingOf("feedback-proprioception"),
    simulation:
      "An arc marks the angle of the virtual arm. It is illustrative only.",
    notSimulated: false,
  },
  {
    id: "temperature",
    number: "04",
    name: "TEMPERATURE",
    claimId: "feedback-temperature",
    badge: "requires-source-verification",
    evidence: null,
    simulation: "Not simulated. This stays pending until it is sourced.",
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
 * Narrow, hedged descriptions. Current VR is described only as far as the
 * project owner approved; it is never called visual-only.
 */
export const COMPARE_MODES: readonly CompareMode[] = [
  {
    id: "current",
    label: "CURRENT VR INTERACTION",
    description:
      "Visual interaction and, in some systems, external or wearable haptic cues.",
    contact: "CONTACT, then a visual interaction cue.",
    tags: ["SIMULATION"],
  },
  {
    id: "concept",
    label: "B-NEURA CONCEPT",
    description:
      "Explores a conceptual feedback pathway associated with the neural-interface loop. In research, a few people with paralysis or amputation have had touch-like sensations evoked. It is not demonstrated here.",
    contact:
      "CONTACT, then a simulated feedback pathway through the feedback interface, toward the user.",
    tags: ["NOT DEMONSTRATED HERE", "SIMULATION", "CONCEPT"],
  },
];
