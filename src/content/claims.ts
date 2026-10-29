import type { Classification } from "./maturity";
import type { TopicId } from "./topics";

/**
 * The claims register: the source of truth for public scientific copy.
 *
 * UNVERIFIED -> SOURCE_FOUND -> VERIFIED. Only VERIFIED claims may be
 * published as fact. SOURCE_FOUND means a source was found and read, but the
 * wording and classification are not yet approved. NOT_REQUIRED is only for
 * design goals: B-NEURA's own concepts, presented as goals, never as results.
 */
export type ClaimSourceStatus =
  "UNVERIFIED" | "SOURCE_FOUND" | "VERIFIED" | "NOT_REQUIRED";

/**
 * technology: something that exists or is researched, classified for maturity.
 * finding: a research result or comparison, with no maturity of its own.
 * definition: a concept such as agency. Never classified for maturity.
 * design-goal: a B-NEURA concept. Always FUTURE CONCEPT, never a result.
 */
export type ClaimKind = "technology" | "finding" | "definition" | "design-goal";

export type Verification = {
  /** ISO date (YYYY-MM-DD) on which the project owner approved the claim. */
  approved: string;
  /** What the verification rests on. "abstract" is only used for narrow claims. */
  basis: "full-text" | "abstract";
};

export type Claim = {
  id: string;
  kind: ClaimKind;
  text: string;
  /** Approved classification. null for definitions and findings. */
  maturity: Classification | null;
  sourceStatus: ClaimSourceStatus;
  verification: Verification | null;
  /** Ids of records in `sources`. */
  sourceRefs: readonly string[];
  /** Research topics (MASTER_PLAN section 11) the claim belongs to. */
  topics: readonly TopicId[];
  /** Approved public wording. Shown only while the claim is public. */
  wording: string | null;
  notes: string;
};

const APPROVED = "2026-10-22";
const FULL_TEXT: Verification = { approved: APPROVED, basis: "full-text" };
const ABSTRACT: Verification = { approved: APPROVED, basis: "abstract" };

const CONCEPT_ONLY =
  "B-NEURA explains this idea; the prototype does not measure it.";

export const claims: readonly Claim[] = [
  // --- NeuroHelmet: the underlying technology of each conceptual part ------
  {
    id: "helmet-neural-signal-acquisition-maturity",
    kind: "technology",
    text: "Scalp EEG is a non-invasive way to record brain activity that is common in brain-computer interface research; non-invasive interfaces have limited performance, and detailed arm, handwriting or speech control has used implanted electrodes.",
    maturity: "available-today",
    sourceStatus: "VERIFIED",
    verification: FULL_TEXT,
    sourceRefs: [
      "wolpaw-2002",
      "edelman-2025",
      "hochberg-2012",
      "collinger-2013",
    ],
    topics: ["bci"],
    wording:
      "Scalp EEG records brain activity without surgery and is common in brain-computer interface research, but the control it gives is limited. Detailed control of a robotic arm, handwriting or speech has so far needed electrodes implanted in the brain.",
    notes:
      "Classifies the underlying sensing technology (scalp EEG), not the helmet's sensor layer, which is a concept. Edelman 2025 full text: non-invasive approaches are common, safe and relatively low cost, but 'current non-invasive BCIs exhibit limited performance'. Wolpaw 2002 abstract: scalp signals, 10-25 bits/min. Hochberg 2012 and Collinger 2013 full texts: implanted arrays. The sources do not say EEG is the most widely used method; do not claim that.",
  },
  {
    id: "helmet-conceptual-ai-decoder-maturity",
    kind: "technology",
    text: "Decoders have turned motor-cortex activity into intended movements, handwriting or speech for a small number of research participants with paralysis, using implanted electrodes.",
    maturity: "experimental",
    sourceStatus: "VERIFIED",
    verification: FULL_TEXT,
    sourceRefs: [
      "hochberg-2006",
      "hochberg-2012",
      "collinger-2013",
      "willett-2021",
      "willett-2023",
    ],
    topics: ["bci", "decoding"],
    wording:
      "Decoders that turn brain activity into intended movements, handwriting or speech have worked in research with a small number of people with paralysis, using electrodes implanted in the brain.",
    notes:
      "Full texts: Hochberg 2012 (two participants), Collinger 2013 (one), Willett 2021 (one, handwriting, recurrent neural network decoder), Willett 2023 (one, speech). Hochberg 2006 abstract (one). All research settings with implanted microelectrode arrays.",
  },
  {
    id: "helmet-feedback-interface-maturity",
    kind: "technology",
    text: "Stimulating the brain through implanted electrodes has evoked touch-like and position-like sensations in single research participants with paralysis.",
    maturity: "experimental",
    sourceStatus: "VERIFIED",
    verification: FULL_TEXT,
    sourceRefs: [
      "flesher-2016",
      "flesher-2021",
      "armenta-salas-2018",
      "bensmaia-miller-2014",
    ],
    topics: ["stimulation", "sensory-feedback"],
    wording:
      "Stimulating the brain through implanted electrodes has evoked touch-like and position-like sensations in single research participants with paralysis. Major challenges remain.",
    notes:
      "Classifies the underlying technology (intracortical microstimulation), not the helmet's wearable feedback band, which does not exist and is labeled as part of the concept prototype. Full texts: Flesher 2021 (one participant), Armenta Salas 2018 (one), Bensmaia and Miller 2014 (electrode lifespan, laboratory-only use).",
  },
  {
    id: "helmet-outer-shell-maturity",
    kind: "technology",
    text: "Virtual reality systems are available and used in clinical rehabilitation, for example after stroke, with small benefits on mostly low- to moderate-certainty evidence.",
    maturity: "available-today",
    sourceStatus: "VERIFIED",
    verification: ABSTRACT,
    sourceRefs: ["laver-2025"],
    topics: ["vr-rehabilitation"],
    wording:
      "Virtual reality systems are available today and are used in clinical rehabilitation, for example after stroke. Trials suggest small benefits, with mostly low- to moderate-certainty evidence.",
    notes:
      "Classifies VR display technology, not the helmet's display band. Abstract basis: the Cochrane review's body is not available through PubMed Central. The abstract states VR applications have been 'adopted in clinical practice' and reports 190 trials. It does not cover consumer headsets specifically.",
  },

  // --- The gap -------------------------------------------------------------
  {
    id: "gap-intention-persists",
    kind: "finding",
    text: "Movement-related signals for intended movements persist in motor cortex years after paralysis, in small studies.",
    maturity: null,
    sourceStatus: "VERIFIED",
    verification: FULL_TEXT,
    sourceRefs: ["hochberg-2006", "hochberg-2012", "willett-2021"],
    topics: ["bci", "decoding"],
    wording:
      "When the body stops responding, the brain may not stop intending.",
    notes:
      "Hedged headline. Hochberg 2012 full text: two participants, more than five years after a brainstem stroke. Willett 2021 full text: motor intention 'remains neurally encoded in motor cortex after paralysis'. Hochberg 2006 abstract: three years after spinal cord injury. Do not claim retained cognitive function.",
  },

  // --- Seeing is not feeling ----------------------------------------------
  {
    id: "feedback-touch",
    kind: "technology",
    text: "Stimulation through implanted electrodes has evoked touch-like sensations in a few people with paralysis or amputation.",
    maturity: "experimental",
    sourceStatus: "VERIFIED",
    verification: FULL_TEXT,
    sourceRefs: [
      "flesher-2016",
      "flesher-2021",
      "raspopovic-2014",
      "armenta-salas-2018",
    ],
    topics: ["sensory-feedback", "stimulation", "neuroprosthetics"],
    wording:
      "In research studies, stimulation through implanted electrodes has evoked touch-like sensations in a few people with paralysis or amputation. Nothing on this page produces them.",
    notes:
      "Full texts: Flesher 2021 (one person with tetraplegia, sensations in the palm and fingers), Armenta Salas 2018 (one). Abstracts: Flesher 2016 (one), Raspopovic 2014 (one amputee, nerve electrodes).",
  },
  {
    id: "feedback-pressure",
    kind: "technology",
    text: "In single-participant studies, stimulation through implanted electrodes evoked sensations that included pressure, and their intensity could be graded.",
    maturity: "experimental",
    sourceStatus: "VERIFIED",
    verification: ABSTRACT,
    sourceRefs: ["flesher-2016", "raspopovic-2014"],
    topics: ["sensory-feedback", "stimulation", "neuroprosthetics"],
    wording:
      "In single-participant studies, stimulation through implanted electrodes evoked sensations that included pressure, and their strength could be adjusted.",
    notes:
      "Narrow claim on an abstract basis. Flesher 2016 abstract: percepts with 'feelings of pressure'; stimulus amplitude grades intensity. Raspopovic 2014 abstract: one amputee distinguished three force levels.",
  },
  {
    id: "feedback-proprioception",
    kind: "technology",
    text: "A sense of limb position or movement has been evoked in single participants by brain stimulation (one person with tetraplegia) and by nerve stimulation (one amputee).",
    maturity: "experimental",
    sourceStatus: "VERIFIED",
    verification: FULL_TEXT,
    sourceRefs: ["armenta-salas-2018", "horch-2011"],
    topics: ["sensory-feedback", "stimulation", "neuroprosthetics"],
    wording:
      "Early studies have evoked a sense of limb position or movement in single participants: through brain stimulation in one person with tetraplegia, and through nerve stimulation in one amputee. Evidence is very limited.",
    notes:
      "Armenta Salas 2018 full text: one participant with a C5 spinal cord injury, proprioceptive sensations from intracortical microstimulation. Horch 2011 abstract: one of two amputees. The 3D arm-angle arc stays illustrative.",
  },
  {
    id: "feedback-temperature",
    kind: "technology",
    text: "A wearable thermal device on the skin of the residual limb evoked cooling sensations felt in the missing hand of amputees.",
    maturity: "experimental",
    sourceStatus: "VERIFIED",
    verification: ABSTRACT,
    sourceRefs: ["osborn-2024"],
    topics: ["sensory-feedback", "neuroprosthetics"],
    wording:
      "In research, a wearable thermal device on the skin of the residual limb evoked cooling sensations felt in the missing hand of amputees. This is skin-based feedback, not a brain interface.",
    notes:
      "Narrow claim on an abstract basis. Osborn 2024 is non-invasive, skin-based and in amputees. A PubMed search found no human study of temperature sensations evoked through a brain interface. Never imply B-NEURA delivers temperature to the brain. Temperature stays NOT SIMULATED.",
  },
  {
    id: "feedback-vr-haptics",
    kind: "finding",
    text: "Current VR relies mainly on sight and sound; wearable haptic devices for the hand are a more recent, developing area.",
    maturity: null,
    sourceStatus: "VERIFIED",
    verification: ABSTRACT,
    sourceRefs: ["pacchierotti-2017"],
    topics: ["sensory-feedback"],
    wording:
      "Built mainly on sight and sound. Wearable devices that add touch cues to the hand are a more recent, still-developing area.",
    notes:
      "Narrow claim on an abstract basis. Pacchierotti 2017 abstract: audio and vision technologies became wearable first; haptic systems only recently began to be designed for wearability. Never call current VR visual-only.",
  },
  {
    id: "feedback-bneura-concept",
    kind: "finding",
    text: "B-NEURA imagines returning information through a neural interface; in research, implanted electrodes have evoked touch-like sensations in a few people.",
    maturity: null,
    sourceStatus: "VERIFIED",
    verification: FULL_TEXT,
    sourceRefs: ["flesher-2016", "flesher-2021", "bensmaia-miller-2014"],
    topics: ["sensory-feedback", "stimulation"],
    wording:
      "Imagines returning information through a neural interface. In research, implanted electrodes have evoked touch-like sensations in a few people. It is not demonstrated here.",
    notes:
      "Composite: a labeled concept plus the verified touch claim. The factual part rests on feedback-touch.",
  },
  {
    id: "feedback-sensory-feedback",
    kind: "technology",
    text: "Sensory feedback through implanted electrodes has been shown only in small research studies, and major challenges remain.",
    maturity: "experimental",
    sourceStatus: "VERIFIED",
    verification: FULL_TEXT,
    sourceRefs: ["bensmaia-miller-2014", "flesher-2021"],
    topics: ["sensory-feedback", "neuroprosthetics"],
    wording:
      "Sensory feedback means information about what happened returning to the user. Through implanted electrodes it has been shown only in small research studies, and major challenges remain.",
    notes:
      "Bensmaia and Miller 2014 full text: 'considerable challenges', including electrode lifespan and laboratory-only use. Flesher 2021 full text: one participant.",
  },

  // --- Virtual embodiment --------------------------------------------------
  {
    id: "embodiment-motor-intention",
    kind: "technology",
    text: "A small number of people with tetraplegia have controlled devices using signals from electrodes implanted in motor cortex, in research studies.",
    maturity: "experimental",
    sourceStatus: "VERIFIED",
    verification: FULL_TEXT,
    sourceRefs: [
      "hochberg-2006",
      "hochberg-2012",
      "collinger-2013",
      "bensmaia-miller-2014",
    ],
    topics: ["bci", "neuroprosthetics"],
    wording:
      "In research studies, a small number of people with tetraplegia have controlled devices using signals from electrodes implanted in the motor cortex. B-NEURA only simulates this.",
    notes:
      "Full texts: Hochberg 2012, Collinger 2013, Bensmaia and Miller 2014. Never say the prototype reads or decodes anyone's brain.",
  },
  {
    id: "embodiment-visual-feedback",
    kind: "technology",
    text: "In laboratory studies, a virtual arm moving in step with a person's hidden hand, or touched in sync with it, could come to feel like their own.",
    maturity: "experimental",
    sourceStatus: "VERIFIED",
    verification: FULL_TEXT,
    sourceRefs: ["slater-2008", "slater-2009"],
    topics: ["embodiment", "body-ownership"],
    wording:
      "In laboratory studies, a virtual arm that moved in step with a person's hidden hand, or was touched in sync with it, could come to feel like their own.",
    notes:
      "Classified as embodiment research. Slater 2008 full text: 21 healthy men, seen and felt touch in sync. Slater 2009 full text: also synchronous movement of the real and virtual hand, and a weaker form with a brain-computer interface.",
  },
  {
    id: "embodiment-agency",
    kind: "definition",
    text: "Sense of agency is the experience of controlling one's own actions and, through them, events in the outside world.",
    maturity: null,
    sourceStatus: "VERIFIED",
    verification: ABSTRACT,
    sourceRefs: ["haggard-2017", "gallagher-2000"],
    topics: ["embodiment"],
    wording: `Sense of agency is the feeling of controlling your own actions and, through them, events in the world. ${CONCEPT_ONLY}`,
    notes:
      "Definition on an abstract basis: Haggard 2017 defines it in nearly these words. Not a technology, so no maturity. Never use 'AGENCY DETECTED'.",
  },
  {
    id: "embodiment-body-ownership",
    kind: "definition",
    text: "Body ownership is the experience of a body or body part as one's own.",
    maturity: null,
    sourceStatus: "VERIFIED",
    verification: ABSTRACT,
    sourceRefs: ["tsakiris-2010", "longo-2008"],
    topics: ["body-ownership"],
    wording: `Body ownership is the feeling that a body part is your own. ${CONCEPT_ONLY}`,
    notes:
      "Definition on an abstract basis: Tsakiris 2010 ('the experience of this body as mine'). Not a technology, so no maturity.",
  },
  {
    id: "embodiment-embodiment",
    kind: "definition",
    text: "Embodiment includes experiencing a body part as one's own, located where it is seen, and under one's control; it is studied with rubber-hand and virtual-reality illusions.",
    maturity: null,
    sourceStatus: "VERIFIED",
    verification: ABSTRACT,
    sourceRefs: ["longo-2008", "slater-2008", "slater-2009"],
    topics: ["embodiment", "body-ownership"],
    wording: `Embodiment describes experiencing a body part as your own, where you see it, and under your control. Researchers study it with rubber-hand and virtual-reality illusions. ${CONCEPT_ONLY}`,
    notes:
      "The definition rests on the Longo 2008 abstract (ownership, location and agency). The virtual-reality part rests on the Slater 2008 and 2009 full texts. Not a technology, so no maturity. Kilteni, Groten and Slater (2012) was identified but not read.",
  },
  {
    id: "embodiment-ingredients-studied",
    kind: "finding",
    text: "Matching what you see, what you do and what you feel may help a virtual or artificial limb feel like part of the body; results vary.",
    maturity: null,
    sourceStatus: "VERIFIED",
    verification: FULL_TEXT,
    sourceRefs: [
      "slater-2008",
      "slater-2009",
      "marasco-2011",
      "page-2018",
      "tsakiris-2010",
    ],
    topics: ["embodiment", "neuroprosthetics"],
    wording:
      "Research suggests that matching what you see, what you do and what you feel may help a virtual or artificial limb feel like part of the body. Results vary and the evidence is limited.",
    notes:
      "Full texts: Slater 2008 and 2009, Page 2018. Abstracts: Marasco 2011 (two amputees), Tsakiris 2010. Present as INGREDIENTS STUDIED, each with its own switch: NOT a causal formula, and never imply that combining all three is stronger.",
  },
  {
    id: "embodiment-results-vary",
    kind: "finding",
    text: "In one long-term study of a single person with a hand amputation, movement control alone and sensation alone were each linked to embodiment of the prosthesis, and combining them added no significant improvement.",
    maturity: null,
    sourceStatus: "VERIFIED",
    verification: FULL_TEXT,
    sourceRefs: ["page-2018"],
    topics: ["embodiment", "neuroprosthetics"],
    wording:
      "In one long-term study of a single person with a hand amputation, movement control alone and sensation alone were each linked to the prosthesis feeling more like part of the body, and combining them added no significant improvement.",
    notes:
      "Page 2018 full text: a case study in one amputee, 14 months, implanted nerve electrodes and muscle recording leads with a physical prosthesis. Not paralysis, not a BCI, not VR. Keep it visible whenever ingredients are shown.",
  },

  // --- Design goals (Current Science: FUTURE CONCEPT) -----------------------
  {
    id: "future-neuro-vr-headset",
    kind: "design-goal",
    text: "Design goal: one wearable headset combining brain sensing, decoding, a VR display and feedback.",
    maturity: "future-concept",
    sourceStatus: "NOT_REQUIRED",
    verification: null,
    sourceRefs: [],
    topics: ["bci", "sensory-feedback"],
    wording:
      "Design goal: one wearable headset that combines brain sensing, decoding, a VR display and feedback. The NeuroHelmet is a concept prototype; this headset does not exist.",
    notes:
      "B-NEURA's own concept. States no capability as fact, so it needs no source.",
  },
  {
    id: "future-multisensory-feedback",
    kind: "design-goal",
    text: "Design goal: touch, pressure, position and temperature returned together through a neural interface during virtual interaction.",
    maturity: "future-concept",
    sourceStatus: "NOT_REQUIRED",
    verification: null,
    sourceRefs: [],
    topics: ["sensory-feedback"],
    wording:
      "Design goal: touch, pressure, position and temperature returned together through a neural interface while interacting in VR. It is a goal, not a demonstrated capability.",
    notes:
      "B-NEURA's own concept. The separate research results are in the feedback claims; this combination is a goal only.",
  },
  {
    id: "future-seamless-embodiment",
    kind: "design-goal",
    text: "Design goal: a virtual body that a person with paralysis could control and come to feel as their own.",
    maturity: "future-concept",
    sourceStatus: "NOT_REQUIRED",
    verification: null,
    sourceRefs: [],
    topics: ["embodiment"],
    wording:
      "Design goal: a virtual body that a person with paralysis could control and come to feel as their own. It is a goal, not a demonstrated capability.",
    notes:
      "B-NEURA's own concept. Never claim the prototype produces or detects embodiment.",
  },
];

export function getClaim(id: string): Claim {
  const claim = claims.find((c) => c.id === id);
  if (!claim) throw new Error(`Unknown claim: ${id}`);
  return claim;
}

/** True when the claim may appear in public copy. */
export function isPublic(claim: Claim): boolean {
  return (
    claim.sourceStatus === "VERIFIED" || claim.sourceStatus === "NOT_REQUIRED"
  );
}

/** Approved wording, or null while the claim is not public. */
export function publicWording(id: string): string | null {
  const claim = getClaim(id);
  return isPublic(claim) ? claim.wording : null;
}

/**
 * Approved wording for copy that must appear. Throws while the claim is not
 * public, so unsupported copy fails the build instead of reaching the page.
 */
export function requireWording(id: string): string {
  const wording = publicWording(id);
  if (!wording) throw new Error(`Claim ${id} is not approved for public copy`);
  return wording;
}

/**
 * What a maturity badge may show: the approved classification, the pending
 * marker while a technology claim is unresolved, or null when the claim has
 * no maturity (definitions and findings).
 */
export function publicMaturity(id: string): Classification | null {
  const claim = getClaim(id);
  if (claim.maturity === null) return null;
  return isPublic(claim) ? claim.maturity : "requires-source-verification";
}
