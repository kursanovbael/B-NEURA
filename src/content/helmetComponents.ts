import type { Classification } from "./maturity";

/**
 * Teaching content for each conceptual NeuroHelmet component. Every component
 * explains what it represents, its role, how it connects to the next stage and
 * how mature it is. Everything describes an imagined concept prototype, not
 * existing hardware. Maturity stays pending until verified sources exist (see
 * the claims register); `null` means the part is not a technology.
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
  /** null: not a technology, so it is not classified. */
  maturity: Classification | null;
  maturityNote: string;
  /** Claim in the register that must be verified before classifying. */
  claimId: string | null;
};

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
    maturity: "requires-source-verification",
    maturityNote:
      "Sensing approaches differ widely. The classification for this component is pending verified sources.",
    claimId: "helmet-neural-signal-acquisition-maturity",
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
    maturity: "requires-source-verification",
    maturityNote:
      "The classification for this component is pending verified sources.",
    claimId: "helmet-conceptual-ai-decoder-maturity",
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
    maturity: "requires-source-verification",
    maturityNote:
      "Nothing on this page can produce real sensations. The classification for this component is pending verified sources.",
    claimId: "helmet-feedback-interface-maturity",
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
    maturity: "requires-source-verification",
    maturityNote:
      "The display band stands for VR display technology. Its classification is pending verified sources.",
    claimId: "helmet-outer-shell-maturity",
  },
];

export function getHelmetComponent(id: HelmetComponentId): HelmetComponent {
  const component = HELMET_COMPONENTS.find((c) => c.id === id);
  if (!component) throw new Error(`Unknown helmet component: ${id}`);
  return component;
}
