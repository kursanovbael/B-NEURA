import type { Classification, MaturityLevel } from "./maturity";

/**
 * UNVERIFIED -> SOURCE_FOUND -> VERIFIED. Only VERIFIED claims may be
 * published as fact.
 *
 * SOURCE_FOUND means a primary source was found and its abstract was read. It
 * is NOT verification: the wording and any maturity level still need the
 * project owner's confirmation. Until a claim is VERIFIED, the public maturity
 * badge stays REQUIRES SOURCE VERIFICATION.
 */
export type ClaimSourceStatus = "UNVERIFIED" | "SOURCE_FOUND" | "VERIFIED";

export type Claim = {
  id: string;
  text: string;
  /** What the interface may show. Stays pending until the claim is VERIFIED. */
  maturity: Classification;
  /**
   * The level the sources point to, recorded for the final verification step.
   * Never rendered while `maturity` is pending.
   */
  suggestedMaturity: MaturityLevel | null;
  sourceStatus: ClaimSourceStatus;
  /** Ids of records in `sources`. For UNVERIFIED claims these are candidates only. */
  sourceRefs: readonly string[];
  /** Approved, hedged page wording. Null until wording is approved. */
  wording: string | null;
  notes: string;
};

const DRAFT_NOTE =
  "Draft. Classify as AVAILABLE TODAY, EXPERIMENTAL or FUTURE CONCEPT only after sources are found and verified. Until then the page shows the pending marker.";

const PENDING_NOTE =
  "SOURCE_FOUND, not VERIFIED. Abstracts were read, not full texts. The public badge stays REQUIRES SOURCE VERIFICATION until final verification.";

const CONCEPT_ONLY =
  "B-NEURA explains these concepts; the prototype does not measure them.";

export const claims: readonly Claim[] = [
  {
    id: "helmet-neural-signal-acquisition-maturity",
    text: "Maturity classification of the technology area represented by the conceptual neural signal acquisition layer.",
    maturity: "requires-source-verification",
    suggestedMaturity: null,
    sourceStatus: "UNVERIFIED",
    sourceRefs: [],
    wording: null,
    notes: DRAFT_NOTE,
  },
  {
    id: "helmet-conceptual-ai-decoder-maturity",
    text: "Maturity classification of the technology area represented by the conceptual AI decoder.",
    maturity: "requires-source-verification",
    suggestedMaturity: null,
    sourceStatus: "UNVERIFIED",
    sourceRefs: [],
    wording: null,
    notes: DRAFT_NOTE,
  },
  {
    id: "helmet-feedback-interface-maturity",
    text: "Maturity classification of the technology area represented by the conceptual feedback interface.",
    maturity: "requires-source-verification",
    suggestedMaturity: null,
    sourceStatus: "UNVERIFIED",
    sourceRefs: [],
    wording: null,
    notes: DRAFT_NOTE,
  },
  {
    id: "helmet-outer-shell-maturity",
    text: "Maturity classification of the VR display technology represented by the front band of the outer shell.",
    maturity: "requires-source-verification",
    suggestedMaturity: null,
    sourceStatus: "UNVERIFIED",
    sourceRefs: [],
    wording: null,
    notes: DRAFT_NOTE,
  },
  {
    id: "gap-intention-persists",
    text: "People with severe paralysis can retain the intention to move.",
    maturity: "requires-source-verification",
    suggestedMaturity: null,
    sourceStatus: "SOURCE_FOUND",
    sourceRefs: ["hochberg-2006", "hochberg-2012"],
    wording:
      "When the body stops responding, the brain may not stop intending.",
    notes: `${PENDING_NOTE} The sources support that movement-related signals persist in motor cortex years after injury, in small studies. Keep the hedge "may not stop intending". Do not claim retained cognitive function.`,
  },

  // --- Phase 7: sensory feedback -------------------------------------------
  {
    id: "feedback-touch",
    text: "Research has evoked touch-like sensations in a few people with paralysis or amputation.",
    maturity: "requires-source-verification",
    suggestedMaturity: "experimental",
    sourceStatus: "SOURCE_FOUND",
    sourceRefs: ["flesher-2016", "flesher-2021", "raspopovic-2014"],
    wording:
      "Research has evoked touch-like sensations in a few people with paralysis or amputation. Nothing on this page produces them.",
    notes: `${PENDING_NOTE} Each study involved one or very few participants in research settings. Do not imply B-NEURA produces these sensations.`,
  },
  {
    id: "feedback-pressure",
    text: "Some stimulation experiments report pressure-like sensations whose strength can be adjusted.",
    maturity: "requires-source-verification",
    suggestedMaturity: "experimental",
    sourceStatus: "SOURCE_FOUND",
    sourceRefs: ["flesher-2016", "raspopovic-2014"],
    wording:
      "Some stimulation experiments report pressure-like sensations whose strength can be adjusted.",
    notes: `${PENDING_NOTE} Single-participant research settings. Do not imply B-NEURA produces these sensations.`,
  },
  {
    id: "feedback-proprioception",
    text: "Early research in amputees has tried to return a sense of finger position.",
    maturity: "requires-source-verification",
    suggestedMaturity: null,
    sourceStatus: "UNVERIFIED",
    sourceRefs: ["horch-2011"],
    wording:
      "Early research in amputees has tried to return a sense of finger position. Evidence is limited.",
    notes:
      "Candidate source only, not approved. The one source read shows a proprioceptive sensation in one of two amputees. No source was found for proprioception from brain stimulation in people. Do not upgrade maturity. Use the wording only if needed.",
  },
  {
    id: "feedback-temperature",
    text: "Maturity classification of temperature feedback.",
    maturity: "requires-source-verification",
    suggestedMaturity: null,
    sourceStatus: "UNVERIFIED",
    sourceRefs: ["osborn-2024"],
    wording: null,
    notes:
      "Pending. The candidate source is a peripheral-nerve study in amputees using a wearable thermal device, not a brain-computer-interface result. Do not simulate temperature. Do not imply the study is a BCI result.",
  },
  {
    id: "feedback-vr-haptics",
    text: "Current VR interaction typically uses visual and audio cues, and in some systems wearable haptic devices for touch.",
    maturity: "requires-source-verification",
    suggestedMaturity: null,
    sourceStatus: "UNVERIFIED",
    sourceRefs: ["pacchierotti-2017"],
    wording:
      "Typically uses visual and audio cues, and in some systems wearable haptic devices for touch.",
    notes:
      "Candidate source only, not approved. The review supports that wearable haptic systems for the fingertip and hand exist and are an active field. It does not support the visual and audio part, or what is commercially available. Never claim current VR is visual-only. Do not show an external haptic device in the scene.",
  },
  {
    id: "feedback-bneura-concept",
    text: "B-NEURA explores returning information through a neural interface; touch-like sensations have been evoked in research.",
    maturity: "requires-source-verification",
    suggestedMaturity: null,
    sourceStatus: "UNVERIFIED",
    sourceRefs: ["flesher-2016", "flesher-2021", "bensmaia-miller-2014"],
    wording:
      "Explores returning information through a neural interface. In research, a few people with paralysis or amputation have had touch-like sensations evoked. It is not demonstrated here.",
    notes:
      "Composite statement for the CURRENT VR INTERACTION vs B-NEURA CONCEPT comparison. Rests on the touch claim, which is SOURCE_FOUND, but the composite itself has not been approved as a claim.",
  },
  {
    id: "feedback-sensory-feedback",
    text: "Sensory feedback means information about what happened returning to the user; in research it is experimental and limited.",
    maturity: "requires-source-verification",
    suggestedMaturity: "experimental",
    sourceStatus: "SOURCE_FOUND",
    sourceRefs: ["bensmaia-miller-2014", "flesher-2021"],
    wording:
      "Sensory feedback means information about what happened returning to the user. In research it is experimental and limited.",
    notes: `${PENDING_NOTE} The review notes substantial open challenges.`,
  },

  // --- Phase 7: virtual embodiment ------------------------------------------
  {
    id: "embodiment-motor-intention",
    text: "In research studies, people with tetraplegia have controlled devices using signals from motor cortex.",
    maturity: "requires-source-verification",
    suggestedMaturity: "experimental",
    sourceStatus: "SOURCE_FOUND",
    sourceRefs: [
      "hochberg-2006",
      "hochberg-2012",
      "collinger-2013",
      "bensmaia-miller-2014",
    ],
    wording:
      "In research studies, people with tetraplegia have controlled devices using signals from motor cortex. B-NEURA only simulates this.",
    notes: `${PENDING_NOTE} Small studies in research settings. Never say the prototype reads or decodes anyone's brain.`,
  },
  {
    id: "embodiment-visual-feedback",
    text: "Seeing a virtual hand respond in step with your actions can help it feel like your own.",
    maturity: "requires-source-verification",
    suggestedMaturity: null,
    sourceStatus: "SOURCE_FOUND",
    sourceRefs: ["slater-2008", "slater-2009"],
    wording:
      "Seeing a virtual hand respond in step with your actions can help it feel like your own.",
    notes: `${PENDING_NOTE} Laboratory illusion studies with small groups. Keep hedged.`,
  },
  {
    id: "embodiment-agency",
    text: "Sense of agency is the feeling of controlling your actions and their effects.",
    maturity: "requires-source-verification",
    suggestedMaturity: null,
    sourceStatus: "SOURCE_FOUND",
    sourceRefs: ["haggard-2017", "gallagher-2000"],
    wording: `Sense of agency is the feeling of controlling your actions and their effects. ${CONCEPT_ONLY}`,
    notes: `${PENDING_NOTE} A definition, not a technology. Never use "AGENCY DETECTED".`,
  },
  {
    id: "embodiment-body-ownership",
    text: "Body ownership is the feeling that a body part is your own.",
    maturity: "requires-source-verification",
    suggestedMaturity: null,
    sourceStatus: "SOURCE_FOUND",
    sourceRefs: ["tsakiris-2010", "longo-2008"],
    wording: `Body ownership is the feeling that a body part is your own. ${CONCEPT_ONLY}`,
    notes: `${PENDING_NOTE} A definition, not a technology.`,
  },
  {
    id: "embodiment-embodiment",
    text: "Embodiment is the feeling of having and controlling a body, studied in research on illusions and virtual reality.",
    maturity: "requires-source-verification",
    suggestedMaturity: null,
    sourceStatus: "SOURCE_FOUND",
    sourceRefs: ["longo-2008", "tsakiris-2010"],
    wording: `Embodiment is the feeling of having and controlling a body, studied in research on illusions and virtual reality. ${CONCEPT_ONLY}`,
    notes: `${PENDING_NOTE} A fuller definition by Kilteni, Groten and Slater (2012) was identified but not read, so it is not used.`,
  },
  {
    id: "embodiment-ingredients-studied",
    text: "Matching what you see, what you do and what you feel may help a virtual or artificial limb feel like part of the body.",
    maturity: "requires-source-verification",
    suggestedMaturity: null,
    sourceStatus: "UNVERIFIED",
    sourceRefs: [
      "slater-2008",
      "slater-2009",
      "marasco-2011",
      "page-2018",
      "tsakiris-2010",
    ],
    wording:
      "Research suggests that matching what you see, what you do and what you feel may help a virtual or artificial limb feel like part of the body. Results vary and the evidence is limited.",
    notes:
      "Candidate sources, not approved. Present as INGREDIENTS STUDIED, each with its own switch. NOT a causal formula, and never imply that combining all three is stronger. Keep the counter-evidence: in one amputee, motor control alone and sensation alone each produced embodiment, and a closed loop added no significant improvement (Page et al., 2018). The earlier A + B + C = embodiment equation is removed.",
  },
];
