export type Source = {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  /** DOI, PubMed ID, or URL. */
  identifier: string;
  /** ISO date (YYYY-MM-DD) on which the source was checked. */
  accessed: string;
  /** What was actually read. Abstracts are not full texts. */
  read: "abstract" | "bibliographic-only";
};

const ACCESSED = "2026-10-08";

/**
 * Sources checked for Phase 7. Each was found in PubMed and its abstract was
 * read; full texts were not. A source being listed does not make a claim
 * VERIFIED: see claims.ts.
 */
export const sources: readonly Source[] = [
  {
    id: "hochberg-2006",
    title:
      "Neuronal ensemble control of prosthetic devices by a human with tetraplegia",
    authors: "Hochberg LR, Serruya MD, Friehs GM, et al.",
    venue: "Nature",
    year: 2006,
    identifier: "PMID 16838014",
    accessed: ACCESSED,
    read: "abstract",
  },
  {
    id: "hochberg-2012",
    title:
      "Reach and grasp by people with tetraplegia using a neurally controlled robotic arm",
    authors: "Hochberg LR, Bacher D, Jarosiewicz B, et al.",
    venue: "Nature",
    year: 2012,
    identifier: "PMID 22596161",
    accessed: ACCESSED,
    read: "abstract",
  },
  {
    id: "collinger-2013",
    title:
      "High-performance neuroprosthetic control by an individual with tetraplegia",
    authors: "Collinger JL, Wodlinger B, Downey JE, et al.",
    venue: "The Lancet",
    year: 2013,
    identifier: "PMID 23253623",
    accessed: ACCESSED,
    read: "abstract",
  },
  {
    id: "bensmaia-miller-2014",
    title:
      "Restoring sensorimotor function through intracortical interfaces: progress and looming challenges",
    authors: "Bensmaia SJ, Miller LE",
    venue: "Nature Reviews Neuroscience",
    year: 2014,
    identifier: "PMID 24739786",
    accessed: ACCESSED,
    read: "abstract",
  },
  {
    id: "flesher-2016",
    title: "Intracortical microstimulation of human somatosensory cortex",
    authors: "Flesher SN, Collinger JL, Foldes ST, et al.",
    venue: "Science Translational Medicine",
    year: 2016,
    identifier: "PMID 27738096",
    accessed: ACCESSED,
    read: "abstract",
  },
  {
    id: "flesher-2021",
    title:
      "A brain-computer interface that evokes tactile sensations improves robotic arm control",
    authors: "Flesher SN, Downey JE, Weiss JM, et al.",
    venue: "Science",
    year: 2021,
    identifier: "PMID 34016775",
    accessed: ACCESSED,
    read: "abstract",
  },
  {
    id: "raspopovic-2014",
    title:
      "Restoring natural sensory feedback in real-time bidirectional hand prostheses",
    authors: "Raspopovic S, Capogrosso M, Petrini FM, et al.",
    venue: "Science Translational Medicine",
    year: 2014,
    identifier: "PMID 24500407",
    accessed: ACCESSED,
    read: "abstract",
  },
  {
    id: "horch-2011",
    title:
      "Object discrimination with an artificial hand using electrical stimulation of peripheral tactile and proprioceptive pathways with intrafascicular electrodes",
    authors: "Horch K, Meek S, Taylor TG, Hutchinson DT",
    venue: "IEEE Transactions on Neural Systems and Rehabilitation Engineering",
    year: 2011,
    identifier: "PMID 21859607",
    accessed: ACCESSED,
    read: "abstract",
  },
  {
    id: "osborn-2024",
    title:
      "Evoking natural thermal perceptions using a thin-film thermoelectric device with high cooling power density and speed",
    authors: "Osborn LE, Venkatasubramanian R, Himmtann M, et al.",
    venue: "Nature Biomedical Engineering",
    year: 2024,
    identifier: "PMID 37500749",
    accessed: ACCESSED,
    read: "abstract",
  },
  {
    id: "pacchierotti-2017",
    title:
      "Wearable haptic systems for the fingertip and the hand: taxonomy, review, and perspectives",
    authors: "Pacchierotti C, Sinclair S, Solazzi M, et al.",
    venue: "IEEE Transactions on Haptics",
    year: 2017,
    identifier: "PMID 28500008",
    accessed: ACCESSED,
    read: "abstract",
  },
  {
    id: "gallagher-2000",
    title:
      "Philosophical conceptions of the self: implications for cognitive science",
    authors: "Gallagher S",
    venue: "Trends in Cognitive Sciences",
    year: 2000,
    identifier: "PMID 10637618",
    accessed: ACCESSED,
    read: "abstract",
  },
  {
    id: "haggard-2017",
    title: "Sense of agency in the human brain",
    authors: "Haggard P",
    venue: "Nature Reviews Neuroscience",
    year: 2017,
    identifier: "PMID 28251993",
    accessed: ACCESSED,
    read: "abstract",
  },
  {
    id: "tsakiris-2010",
    title: "My body in the brain: a neurocognitive model of body-ownership",
    authors: "Tsakiris M",
    venue: "Neuropsychologia",
    year: 2010,
    identifier: "PMID 19819247",
    accessed: ACCESSED,
    read: "abstract",
  },
  {
    id: "longo-2008",
    title: "What is embodiment? A psychometric approach",
    authors: "Longo MR, Schuur F, Kammers MPM, et al.",
    venue: "Cognition",
    year: 2008,
    identifier: "PMID 18262508",
    accessed: ACCESSED,
    read: "abstract",
  },
  {
    id: "slater-2008",
    title: "Towards a digital body: the virtual arm illusion",
    authors: "Slater M, Perez-Marcos D, Ehrsson HH, Sanchez-Vives MV",
    venue: "Frontiers in Human Neuroscience",
    year: 2008,
    identifier: "PMID 18958207",
    accessed: ACCESSED,
    read: "abstract",
  },
  {
    id: "slater-2009",
    title: "Inducing illusory ownership of a virtual body",
    authors: "Slater M, Perez-Marcos D, Ehrsson HH, Sanchez-Vives MV",
    venue: "Frontiers in Neuroscience",
    year: 2009,
    identifier: "PMID 20011144",
    accessed: ACCESSED,
    read: "abstract",
  },
  {
    id: "marasco-2011",
    title:
      "Robotic touch shifts perception of embodiment to a prosthesis in targeted reinnervation amputees",
    authors: "Marasco PD, Kim K, Colgate JE, et al.",
    venue: "Brain",
    year: 2011,
    identifier: "PMID 21252109",
    accessed: ACCESSED,
    read: "abstract",
  },
  {
    id: "page-2018",
    title:
      "Motor control and sensory feedback enhance prosthesis embodiment and reduce phantom pain after long-term hand amputation",
    authors: "Page DM, George JA, Kluger DT, et al.",
    venue: "Frontiers in Human Neuroscience",
    year: 2018,
    identifier: "PMID 30319374",
    accessed: ACCESSED,
    read: "abstract",
  },
  {
    id: "botvinick-cohen-1998",
    title: "Rubber hands 'feel' touch that eyes see",
    authors: "Botvinick M, Cohen J",
    venue: "Nature",
    year: 1998,
    identifier: "PMID 9486643",
    accessed: ACCESSED,
    read: "bibliographic-only",
  },
];
