import { publicMaturity, requireWording } from "./claims";
import type { Classification } from "./maturity";

/**
 * Teaching content for each conceptual NeuroHelmet component. Every component
 * explains what it represents, its role, how it connects to the next stage and
 * how mature it is. Everything describes an imagined concept prototype, not
 * existing hardware. Maturity classifies the underlying technology a part
 * stands for, never the helmet's imagined form, and comes from the claims
 * register; `null` means the part is not a technology.
 */
export type HelmetComponentId =
  | "outer-shell"
  | "neural-signal-acquisition"
  | "conceptual-ai-decoder"
  | "feedback-interface"
  | "internal-support"
  | "user-head-position";

export type HelmetComponent = {
  id: HelmetComponentId;
  name: string;
  /** Short name for callouts. */
  shortName: string;
  /** A few words for callouts. */
  calloutRole: string;
  represents: string;
  role: string;
  connects: string;
  /** The component that follows along the path of the simulated signal. */
  nextId: HelmetComponentId;
  /** Maturity of the underlying technology. null: not a technology. */
  maturity: Classification | null;
  /** The underlying technology, from the claims register, or why it is not classified. */
  maturityNote: string;
  /** How this part of the helmet itself relates to the concept prototype. */
  formNote: string | null;
  /** Claim in the register for the underlying technology. */
  claimId: string | null;
};

/** Maturity and note for a part that stands for a technology. */
function fromClaim(claimId: string) {
  return {
    maturity: publicMaturity(claimId),
    maturityNote: requireWording(claimId),
    claimId,
  };
}

export const HELMET_COMPONENTS: readonly HelmetComponent[] = [
  {
    id: "user-head-position",
    name: "User head position",
    shortName: "Head position",
    calloutRole: "Where the loop starts",
    represents:
      "A reference volume that marks where a user's head would be. It is a marker, not a model of a person.",
    role: "In this simulation, the loop starts and ends here.",
    connects: "The simulated signal passes from here to the sensor layer.",
    nextId: "neural-signal-acquisition",
    maturity: null,
    maturityNote:
      "Not a technology, so it is not classified. It only marks where a user would be.",
    formNote: null,
    claimId: null,
  },
  {
    id: "neural-signal-acquisition",
    name: "Neural signal acquisition",
    shortName: "Sensors",
    calloutRole: "Pick up the signal",
    represents:
      "A conceptual array of sensing points arranged around the head. Their placement here is illustrative.",
    role: "Stands for the step that would pick up a signal. In this simulation the signal is generated, not measured.",
    connects: "Hands the simulated signal to the conceptual AI decoder.",
    nextId: "conceptual-ai-decoder",
    ...fromClaim("helmet-neural-signal-acquisition-maturity"),
    formNote:
      "The sensor layer drawn here is part of the concept prototype. In this simulation nothing is measured.",
  },
  {
    id: "conceptual-ai-decoder",
    name: "Conceptual AI decoder",
    shortName: "AI decoder",
    calloutRole: "Interprets the signal",
    represents:
      "A conceptual processing module at the rear of the helmet. It is not a real processor.",
    role: "Stands for the step that would turn a signal into a representation of an intended action.",
    connects:
      "Passes that representation on to the virtual body, which sits outside the helmet. Feedback then returns through the feedback interface.",
    nextId: "feedback-interface",
    ...fromClaim("helmet-conceptual-ai-decoder-maturity"),
    formNote:
      "The module drawn here is part of the concept prototype. In this simulation nothing is decoded.",
  },
  {
    id: "feedback-interface",
    name: "Feedback interface",
    shortName: "Feedback",
    calloutRole: "Returns information",
    represents:
      "An abstract band with a few pads. It shows where feedback could be returned, nothing more.",
    role: "Stands for a possible future path for returning information about virtual events to the user.",
    connects:
      "Closes the loop: information returns toward the user head position.",
    nextId: "internal-support",
    ...fromClaim("helmet-feedback-interface-maturity"),
    formNote:
      "A wearable feedback band like this one is part of the concept prototype; it does not exist. Nothing on this page produces real sensations.",
  },
  {
    id: "internal-support",
    name: "Internal support structure",
    shortName: "Support",
    calloutRole: "Holds it together",
    represents: "A conceptual ring, arches and posts inside the shell.",
    role: "Holds the other layers in place.",
    connects: "Gives the sensor layer a structure to attach to.",
    nextId: "outer-shell",
    maturity: null,
    maturityNote:
      "A structural idea, not a scientific technology, so it is not classified.",
    formNote: null,
    claimId: null,
  },
  {
    id: "outer-shell",
    name: "Outer shell",
    shortName: "Outer shell",
    calloutRole: "Houses the layers",
    represents:
      "The conceptual outer housing: a dome with a front display band and side modules.",
    role: "Holds and protects the inner layers and carries the display band.",
    connects:
      "Everything else sits inside it. Follow the signal path again from the head position.",
    nextId: "user-head-position",
    ...fromClaim("helmet-outer-shell-maturity"),
    formNote:
      "The display band stands for VR display technology. The helmet itself is a concept prototype.",
  },
];

export function getHelmetComponent(id: HelmetComponentId): HelmetComponent {
  const component = HELMET_COMPONENTS.find((c) => c.id === id);
  if (!component) throw new Error(`Unknown helmet component: ${id}`);
  return component;
}
