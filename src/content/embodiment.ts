import { publicMaturity, publicWording, requireWording } from "./claims";
import type { Classification } from "./maturity";

/**
 * Content of the Embodiment chapter. Research wording and maturity come from
 * the claims register. Definitions carry no maturity: they are concepts, not
 * technologies. Nothing here is a score: the page explains these ideas and
 * never measures, creates or detects them.
 */

export const VIRTUAL_CONTROL_NOTE =
  "Your pointer or keyboard moves this hand. It is virtual control in a simulation: no brain signals are read, from you or from anyone.";

export const CONTACT_LINE = "The virtual hand touches the virtual object.";

export type EmbodimentConceptId = "agency" | "ownership" | "embodiment";

export type EmbodimentConcept = {
  id: EmbodimentConceptId;
  number: string;
  name: string;
  claimId: string;
  /** Approved, hedged definition from the claims register. */
  definition: string;
};

export const EMBODIMENT_CONCEPTS: readonly EmbodimentConcept[] = [
  {
    id: "agency",
    number: "01",
    name: "SENSE OF AGENCY",
    claimId: "embodiment-agency",
    definition: requireWording("embodiment-agency"),
  },
  {
    id: "ownership",
    number: "02",
    name: "BODY OWNERSHIP",
    claimId: "embodiment-body-ownership",
    definition: requireWording("embodiment-body-ownership"),
  },
  {
    id: "embodiment",
    number: "03",
    name: "EMBODIMENT",
    claimId: "embodiment-embodiment",
    definition: requireWording("embodiment-embodiment"),
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
  /** Maturity from the claims register (pending while unresolved). */
  badge: Classification | null;
  /** Approved research wording, or null while the claim is not public. */
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
    badge: publicMaturity("embodiment-motor-intention"),
    evidence: publicWording("embodiment-motor-intention"),
    simulation:
      "A warm white line runs from the conceptual decoder to the virtual hand. Here the hand is moved by your pointer or keys; nothing is decoded.",
  },
  {
    id: "visual",
    number: "02",
    name: "VISUAL FEEDBACK",
    claimId: "embodiment-visual-feedback",
    badge: publicMaturity("embodiment-visual-feedback"),
    evidence: publicWording("embodiment-visual-feedback"),
    simulation:
      "A gray cue runs from the virtual object to the display band: what you see of the hand and the contact.",
  },
  {
    id: "sensory",
    number: "03",
    name: "SENSORY FEEDBACK",
    claimId: "feedback-sensory-feedback",
    badge: publicMaturity("feedback-sensory-feedback"),
    evidence: publicWording("feedback-sensory-feedback"),
    simulation:
      "A simulated pathway runs from the object, through the feedback interface, toward the user. Nothing is felt.",
  },
];

/** Hedged summary of the studied factors. Not a formula. */
export const INGREDIENTS_LINE = requireWording(
  "embodiment-ingredients-studied",
);

/** Counter-evidence that stays visible whenever the ingredients are shown. */
export const RESULTS_VARY_LINE = requireWording("embodiment-results-vary");

export const NOT_A_RECIPE_LINE =
  "Each switch shows one factor on its own. Turning all three on is not a recipe: this page cannot create or measure embodiment.";
