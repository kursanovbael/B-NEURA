import { publicMaturity } from "./claims";
import { evidenceFor, type Evidence } from "./evidence";
import type { Classification } from "./maturity";

/**
 * The Future chapter: a conceptual roadmap from today's VR toward the B-NEURA
 * concept (MASTER_PLAN section 10). It is not a prediction: no dates, no
 * milestones, no implied order of real research.
 *
 * Scientific statements come only from the claims register (through
 * `evidenceFor`). Everything else on a stage is conceptual: what the stage
 * means, how it connects in this concept, and an open question.
 */
export type FutureStage = {
  id: string;
  number: string;
  /** Short name on the timeline, in the plan's order. */
  name: string;
  /** Longer title in the stage panel. */
  title: string;
  /** Claim whose maturity classifies the stage. */
  maturityClaimId: string;
  /** Conceptual explanation of the stage. Not a scientific claim. */
  meaning: string;
  /** Claims that show where the research stands, limits included. */
  evidenceClaimIds: readonly string[];
  /** How the stage leads to the next one in this concept, or null at the end. */
  connects: string | null;
  /** What remains unresolved, asked as a question rather than answered. */
  openQuestion: string;
};

export const FUTURE_STAGES: readonly FutureStage[] = [
  {
    id: "vr",
    number: "01",
    name: "Today: VR",
    title: "Today: virtual reality",
    maturityClaimId: "helmet-outer-shell-maturity",
    meaning:
      "The starting point: a computer-generated world that you see and hear, and act in.",
    evidenceClaimIds: ["helmet-outer-shell-maturity", "feedback-vr-haptics"],
    connects:
      "In this concept, the next stage asks how someone who cannot move their body could still act in a virtual world.",
    openQuestion:
      "What is missing when a virtual world can be seen and heard, but not felt?",
  },
  {
    id: "bci",
    number: "02",
    name: "BCI",
    title: "Brain-computer interfaces: picking up the signal",
    maturityClaimId: "helmet-neural-signal-acquisition-maturity",
    meaning:
      "A brain-computer interface records brain activity so that a computer can respond to it. This stage is only about picking up the signal, without surgery or with implanted electrodes.",
    evidenceClaimIds: ["helmet-neural-signal-acquisition-maturity"],
    connects:
      "A recorded signal only matters once it can be turned into an action. That is the next stage.",
    openQuestion:
      "Could signals recorded without surgery ever carry enough detail for fine control, or will detailed control keep needing implants?",
  },
  {
    id: "control",
    number: "03",
    name: "Brain-controlled interaction",
    title: "Brain-controlled interaction",
    maturityClaimId: "helmet-conceptual-ai-decoder-maturity",
    meaning:
      "Turning recorded activity into an action: moving a cursor, a robotic arm, or, in this concept, a virtual hand.",
    evidenceClaimIds: [
      "helmet-conceptual-ai-decoder-maturity",
      "gap-intention-persists",
    ],
    connects:
      "Acting is half of the loop. The next stage asks what could come back to the user.",
    openQuestion:
      "Could control like this work reliably every day, outside the laboratory, for the people who would use it?",
  },
  {
    id: "feedback",
    number: "04",
    name: "Sensory feedback",
    title: "Sensory feedback",
    maturityClaimId: "feedback-sensory-feedback",
    meaning:
      "Sending information back: letting the user receive something about what the virtual hand touched or where it is.",
    evidenceClaimIds: [
      "feedback-sensory-feedback",
      "feedback-touch",
      "feedback-proprioception",
    ],
    connects:
      "Control together with returning information is what embodiment research studies. That is the next stage.",
    openQuestion:
      "Could returned sensations ever feel natural, and could they be delivered without surgery?",
  },
  {
    id: "embodiment",
    number: "05",
    name: "Virtual embodiment",
    title: "Virtual embodiment",
    maturityClaimId: "embodiment-visual-feedback",
    meaning:
      "Whether a virtual body that responds to the user could come to feel like their own.",
    evidenceClaimIds: ["embodiment-visual-feedback", "embodiment-results-vary"],
    connects:
      "In this concept, the last step would be to bring every stage together in one system.",
    openQuestion:
      "Would control and feedback together make a virtual body feel like one's own, or can each matter on its own?",
  },
  {
    id: "neuro-vr",
    number: "06",
    name: "Future Neuro-VR",
    title: "Future Neuro-VR",
    maturityClaimId: "future-neuro-vr-headset",
    meaning:
      "The B-NEURA concept: every stage combined in one wearable system. A design goal, not a plan with dates.",
    evidenceClaimIds: [
      "future-neuro-vr-headset",
      "future-multisensory-feedback",
      "future-seamless-embodiment",
    ],
    connects: null,
    openQuestion:
      "Could such a system ever be safe, wanted and accessible to the people it is meant for, and who should decide?",
  },
];

/** Shown with the timeline so the order is never read as a forecast. */
export const ROADMAP_NOTE =
  "A conceptual roadmap, not a prediction. The stages are ordered to explain the idea. Real research does not follow one path, has no fixed dates, and may never reach the last stage.";

/** The final message (MASTER_PLAN section 31). */
export const FINAL_MESSAGE = {
  title: "B-NEURA — BEYOND THE PHYSICAL BODY",
  lines: [
    "We are not trying to move consciousness into a computer.",
    "We are exploring how technology could create new pathways between intention and experience.",
  ],
} as const;

export type FutureStageView = FutureStage & {
  maturity: Classification | null;
  evidence: readonly Evidence[];
};

/** Stages with their maturity and evidence resolved from the claims register. */
export const FUTURE_STAGE_VIEWS: readonly FutureStageView[] = FUTURE_STAGES.map(
  (stage) => ({
    ...stage,
    maturity: publicMaturity(stage.maturityClaimId),
    evidence: stage.evidenceClaimIds.flatMap((id) => {
      const evidence = evidenceFor(id);
      return evidence ? [evidence] : [];
    }),
  }),
);
