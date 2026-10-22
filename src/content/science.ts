import { evidenceFor } from "./evidence";
import type { MaturityLevel } from "./maturity";
import type { Source } from "./sources";

/**
 * Items of the Current Science section. Each points at a claim in the
 * register; the claim decides the column, the wording and the citations. An
 * item whose claim is not public is left out rather than shown as fact.
 */
export type ScienceItem = {
  id: string;
  title: string;
  claimId: string;
  /** Setting and scale, so research results are not read as products. */
  setting: string;
};

export const SCIENCE_ITEMS: readonly ScienceItem[] = [
  {
    id: "eeg",
    title: "Scalp EEG recording",
    claimId: "helmet-neural-signal-acquisition-maturity",
    setting: "Non-invasive · research, clinical and recreational use",
  },
  {
    id: "vr",
    title: "Virtual reality",
    claimId: "helmet-outer-shell-maturity",
    setting: "Non-invasive · used in clinical rehabilitation",
  },
  {
    id: "decoding",
    title: "Decoding movement, handwriting and speech",
    claimId: "helmet-conceptual-ai-decoder-maturity",
    setting: "Implanted electrodes · one or two participants per study",
  },
  {
    id: "touch",
    title: "Touch-like sensations",
    claimId: "feedback-touch",
    setting: "Implanted electrodes · single participants per study",
  },
  {
    id: "position",
    title: "Sense of limb position",
    claimId: "feedback-proprioception",
    setting: "Implanted electrodes · single participants",
  },
  {
    id: "thermal",
    title: "Skin-based thermal feedback",
    claimId: "feedback-temperature",
    setting: "Non-invasive, on the skin · amputees",
  },
  {
    id: "virtual-body",
    title: "Virtual-body illusions",
    claimId: "embodiment-visual-feedback",
    setting: "Non-invasive · laboratory studies with volunteers",
  },
  {
    id: "neuro-vr-headset",
    title: "A Neuro-VR headset",
    claimId: "future-neuro-vr-headset",
    setting: "Design goal · not demonstrated",
  },
  {
    id: "multisensory",
    title: "Rich multisensory feedback",
    claimId: "future-multisensory-feedback",
    setting: "Design goal · not demonstrated",
  },
  {
    id: "seamless-embodiment",
    title: "Seamless virtual embodiment",
    claimId: "future-seamless-embodiment",
    setting: "Design goal · not demonstrated",
  },
];

export type ScienceEntry = {
  item: ScienceItem;
  wording: string;
  citations: readonly Source[];
};

export type ScienceColumn = {
  level: MaturityLevel;
  entries: readonly ScienceEntry[];
};

const COLUMN_ORDER: readonly MaturityLevel[] = [
  "available-today",
  "experimental",
  "future-concept",
];

/** The three columns, built from the claims register. */
export function scienceColumns(): readonly ScienceColumn[] {
  return COLUMN_ORDER.map((level) => ({
    level,
    entries: SCIENCE_ITEMS.flatMap((item) => {
      const evidence = evidenceFor(item.claimId);
      if (!evidence || evidence.maturity !== level) return [];
      return [
        { item, wording: evidence.wording, citations: evidence.citations },
      ];
    }),
  }));
}
