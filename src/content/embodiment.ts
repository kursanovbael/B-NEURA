import { claims } from "./claims";
import type { Classification } from "./maturity";

/**
 * Content of the Embodiment chapter. Research wording comes from the claims
 * register. Every public badge stays pending until its claim is VERIFIED.
 * Nothing here is a score: the page explains these ideas and never measures,
 * creates or detects them.
 */

function wordingOf(claimId: string): string | null {
  return claims.find((claim) => claim.id === claimId)?.wording ?? null;
}

export const VIRTUAL_CONTROL_NOTE =
  "Your pointer or keyboard moves this hand. It is virtual control in a simulation: no brain signals are read, from you or from anyone.";

export const CONTACT_LINE = "The virtual hand touches the virtual object.";

export type EmbodimentConceptId = "agency" | "ownership" | "embodiment";

export type EmbodimentConcept = {
  id: EmbodimentConceptId;
  number: string;
  name: string;
  claimId: string;
  /** Always pending in the interface until the claim is VERIFIED. */
  badge: Classification;
  /** Approved, hedged definition, or null when none is approved. */
  definition: string | null;
};

export const EMBODIMENT_CONCEPTS: readonly EmbodimentConcept[] = [
  {
    id: "agency",
    number: "01",
    name: "SENSE OF AGENCY",
    claimId: "embodiment-agency",
    badge: "requires-source-verification",
    definition: wordingOf("embodiment-agency"),
  },
  {
    id: "ownership",
    number: "02",
    name: "BODY OWNERSHIP",
    claimId: "embodiment-body-ownership",
    badge: "requires-source-verification",
    definition: wordingOf("embodiment-body-ownership"),
  },
  {
    id: "embodiment",
    number: "03",
    name: "EMBODIMENT",
    claimId: "embodiment-embodiment",
    badge: "requires-source-verification",
    definition: wordingOf("embodiment-embodiment"),
  },
];

export const NOT_MEASURED_LINE =
  "Explained here, not measured. Nothing on this page detects agency, body ownership or embodiment.";

export type IngredientId = "motor" | "visual" | "sensory";

export type Ingredient = {
  id: IngredientId;
  number: string;
  name: string;
  claimId: string;
  /** Always pending in the interface until the claim is VERIFIED. */
  badge: Classification;
  /** Approved research wording, or null when none is approved. */
  evidence: string | null;
  /** What this page's simulation shows when the switch is on. */
  simulation: string;
};

export const INGREDIENTS: readonly Ingredient[] = [
  {
    id: "motor",
    number: "01",
    name: "MOTOR INTENTION",
    claimId: "embodiment-motor-intention",
    badge: "requires-source-verification",
    evidence: wordingOf("embodiment-motor-intention"),
    simulation:
      "A warm white line runs from the conceptual decoder to the virtual hand. Here the hand is moved by your pointer or keys; nothing is decoded.",
  },
  {
    id: "visual",
    number: "02",
    name: "VISUAL FEEDBACK",
    claimId: "embodiment-visual-feedback",
    badge: "requires-source-verification",
    evidence: wordingOf("embodiment-visual-feedback"),
    simulation:
      "A gray cue runs from the virtual object to the display band: what you see of the hand and the contact.",
  },
  {
    id: "sensory",
    number: "03",
    name: "SENSORY FEEDBACK",
    claimId: "feedback-sensory-feedback",
    badge: "requires-source-verification",
    evidence: wordingOf("feedback-sensory-feedback"),
    simulation:
      "A simulated pathway runs from the object, through the feedback interface, toward the user. Nothing is felt.",
  },
];

/** Hedged summary of the studied factors. Not a formula. */
export const INGREDIENTS_LINE = wordingOf("embodiment-ingredients-studied");

/** Counter-evidence that stays visible whenever the ingredients are shown. */
export const RESULTS_VARY_LINE = wordingOf("embodiment-results-vary");

export const NOT_A_RECIPE_LINE =
  "Each switch shows one factor on its own. Turning all three on is not a recipe: this page cannot create or measure embodiment.";
