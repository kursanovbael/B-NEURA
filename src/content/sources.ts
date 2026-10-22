export type Source = {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  /** PubMed ID. */
  pmid: string;
  doi: string;
  /** Direct link to the PubMed record. */
  url: string;
  /** ISO date (YYYY-MM-DD) on which the source was last checked. */
  accessed: string;
  /**
   * What was actually read. "full-text" means the PubMed Central full text was
   * read; "abstract" means only the abstract (no free full text, or the full
   * text was not read).
   */
  read: "full-text" | "abstract" | "bibliographic-only";
};

const ACCESSED = "2026-10-22";

const pubmed = (pmid: string) => `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;

/**
 * Sources behind the claims register. Metadata comes from PubMed records
 * retrieved through the NCBI E-utilities. A source being listed does not make
 * a claim VERIFIED: see claims.ts.
 */
export const sources: readonly Source[] = [
  {
    id: "hochberg-2006",
    title:
      "Neuronal ensemble control of prosthetic devices by a human with tetraplegia",
    authors: "Hochberg LR, Serruya MD, Friehs GM, et al.",
    venue: "Nature",
    year: 2006,
    pmid: "16838014",
    doi: "10.1038/nature04970",
    url: pubmed("16838014"),
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
    pmid: "22596161",
    doi: "10.1038/nature11076",
    url: pubmed("22596161"),
    accessed: ACCESSED,
    read: "full-text",
  },
  {
    id: "collinger-2013",
    title:
      "High-performance neuroprosthetic control by an individual with tetraplegia",
    authors: "Collinger JL, Wodlinger B, Downey JE, et al.",
    venue: "The Lancet",
    year: 2013,
    pmid: "23253623",
    doi: "10.1016/S0140-6736(12)61816-9",
    url: pubmed("23253623"),
    accessed: ACCESSED,
    read: "full-text",
  },
  {
    id: "bensmaia-miller-2014",
    title:
      "Restoring sensorimotor function through intracortical interfaces: progress and looming challenges",
    authors: "Bensmaia SJ, Miller LE",
    venue: "Nature Reviews Neuroscience",
    year: 2014,
    pmid: "24739786",
    doi: "10.1038/nrn3724",
    url: pubmed("24739786"),
    accessed: ACCESSED,
    read: "full-text",
  },
  {
    id: "flesher-2016",
    title: "Intracortical microstimulation of human somatosensory cortex",
    authors: "Flesher SN, Collinger JL, Foldes ST, et al.",
    venue: "Science Translational Medicine",
    year: 2016,
    pmid: "27738096",
    doi: "10.1126/scitranslmed.aaf8083",
    url: pubmed("27738096"),
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
    pmid: "34016775",
    doi: "10.1126/science.abd0380",
    url: pubmed("34016775"),
    accessed: ACCESSED,
    read: "full-text",
  },
  {
    id: "raspopovic-2014",
    title:
      "Restoring natural sensory feedback in real-time bidirectional hand prostheses",
    authors: "Raspopovic S, Capogrosso M, Petrini FM, et al.",
    venue: "Science Translational Medicine",
    year: 2014,
    pmid: "24500407",
    doi: "10.1126/scitranslmed.3006820",
    url: pubmed("24500407"),
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
    pmid: "21859607",
    doi: "10.1109/TNSRE.2011.2162635",
    url: pubmed("21859607"),
    accessed: ACCESSED,
    read: "abstract",
  },
  {
    id: "armenta-salas-2018",
    title:
      "Proprioceptive and cutaneous sensations in humans elicited by intracortical microstimulation",
    authors: "Armenta Salas M, Bashford L, Kellis S, et al.",
    venue: "eLife",
    year: 2018,
    pmid: "29633714",
    doi: "10.7554/eLife.32904",
    url: pubmed("29633714"),
    accessed: ACCESSED,
    read: "full-text",
  },
  {
    id: "osborn-2024",
    title:
      "Evoking natural thermal perceptions using a thin-film thermoelectric device with high cooling power density and speed",
    authors: "Osborn LE, Venkatasubramanian R, Himmtann M, et al.",
    venue: "Nature Biomedical Engineering",
    year: 2024,
    pmid: "37500749",
    doi: "10.1038/s41551-023-01070-w",
    url: pubmed("37500749"),
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
    pmid: "28500008",
    doi: "10.1109/TOH.2017.2689006",
    url: pubmed("28500008"),
    accessed: ACCESSED,
    read: "abstract",
  },
  {
    id: "wolpaw-2002",
    title: "Brain-computer interfaces for communication and control",
    authors: "Wolpaw JR, Birbaumer N, McFarland DJ, et al.",
    venue: "Clinical Neurophysiology",
    year: 2002,
    pmid: "12048038",
    doi: "10.1016/s1388-2457(02)00057-3",
    url: pubmed("12048038"),
    accessed: ACCESSED,
    read: "abstract",
  },
  {
    id: "edelman-2025",
    title:
      "Non-invasive brain-computer interfaces: state of the art and trends",
    authors: "Edelman BJ, Zhang S, Schalk G, et al.",
    venue: "IEEE Reviews in Biomedical Engineering",
    year: 2025,
    pmid: "39186407",
    doi: "10.1109/RBME.2024.3449790",
    url: pubmed("39186407"),
    accessed: ACCESSED,
    read: "full-text",
  },
  {
    id: "willett-2021",
    title: "High-performance brain-to-text communication via handwriting",
    authors: "Willett FR, Avansino DT, Hochberg LR, et al.",
    venue: "Nature",
    year: 2021,
    pmid: "33981047",
    doi: "10.1038/s41586-021-03506-2",
    url: pubmed("33981047"),
    accessed: ACCESSED,
    read: "full-text",
  },
  {
    id: "willett-2023",
    title: "A high-performance speech neuroprosthesis",
    authors: "Willett FR, Kunz EM, Fan C, et al.",
    venue: "Nature",
    year: 2023,
    pmid: "37612500",
    doi: "10.1038/s41586-023-06377-x",
    url: pubmed("37612500"),
    accessed: ACCESSED,
    read: "full-text",
  },
  {
    id: "laver-2025",
    title: "Virtual reality for stroke rehabilitation",
    authors: "Laver KE, Lange B, George S, et al.",
    venue: "Cochrane Database of Systematic Reviews",
    year: 2025,
    pmid: "40537150",
    doi: "10.1002/14651858.CD008349.pub5",
    url: pubmed("40537150"),
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
    pmid: "10637618",
    doi: "10.1016/s1364-6613(99)01417-5",
    url: pubmed("10637618"),
    accessed: ACCESSED,
    read: "abstract",
  },
  {
    id: "haggard-2017",
    title: "Sense of agency in the human brain",
    authors: "Haggard P",
    venue: "Nature Reviews Neuroscience",
    year: 2017,
    pmid: "28251993",
    doi: "10.1038/nrn.2017.14",
    url: pubmed("28251993"),
    accessed: ACCESSED,
    read: "abstract",
  },
  {
    id: "tsakiris-2010",
    title: "My body in the brain: a neurocognitive model of body-ownership",
    authors: "Tsakiris M",
    venue: "Neuropsychologia",
    year: 2010,
    pmid: "19819247",
    doi: "10.1016/j.neuropsychologia.2009.09.034",
    url: pubmed("19819247"),
    accessed: ACCESSED,
    read: "abstract",
  },
  {
    id: "longo-2008",
    title: "What is embodiment? A psychometric approach",
    authors: "Longo MR, Schüür F, Kammers MP, et al.",
    venue: "Cognition",
    year: 2008,
    pmid: "18262508",
    doi: "10.1016/j.cognition.2007.12.004",
    url: pubmed("18262508"),
    accessed: ACCESSED,
    read: "abstract",
  },
  {
    id: "slater-2008",
    title: "Towards a digital body: the virtual arm illusion",
    authors: "Slater M, Perez-Marcos D, Ehrsson HH, Sanchez-Vives MV",
    venue: "Frontiers in Human Neuroscience",
    year: 2008,
    pmid: "18958207",
    doi: "10.3389/neuro.09.006.2008",
    url: pubmed("18958207"),
    accessed: ACCESSED,
    read: "full-text",
  },
  {
    id: "slater-2009",
    title: "Inducing illusory ownership of a virtual body",
    authors: "Slater M, Perez-Marcos D, Ehrsson HH, Sanchez-Vives MV",
    venue: "Frontiers in Neuroscience",
    year: 2009,
    pmid: "20011144",
    doi: "10.3389/neuro.01.029.2009",
    url: pubmed("20011144"),
    accessed: ACCESSED,
    read: "full-text",
  },
  {
    id: "marasco-2011",
    title:
      "Robotic touch shifts perception of embodiment to a prosthesis in targeted reinnervation amputees",
    authors: "Marasco PD, Kim K, Colgate JE, et al.",
    venue: "Brain",
    year: 2011,
    pmid: "21252109",
    doi: "10.1093/brain/awq361",
    url: pubmed("21252109"),
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
    pmid: "30319374",
    doi: "10.3389/fnhum.2018.00352",
    url: pubmed("30319374"),
    accessed: ACCESSED,
    read: "full-text",
  },
  {
    id: "botvinick-cohen-1998",
    title: "Rubber hands 'feel' touch that eyes see",
    authors: "Botvinick M, Cohen J",
    venue: "Nature",
    year: 1998,
    pmid: "9486643",
    doi: "10.1038/35784",
    url: pubmed("9486643"),
    accessed: ACCESSED,
    read: "bibliographic-only",
  },
];

export function getSource(id: string): Source {
  const source = sources.find((s) => s.id === id);
  if (!source) throw new Error(`Unknown source: ${id}`);
  return source;
}

/** Short citation, for example "Willett et al., 2021, Nature". */
export function shortCitation(source: Source): string {
  const first = source.authors.split(",")[0].replace(/\s+[A-Z]+$/, "");
  const etAl = source.authors.includes(",") ? " et al." : "";
  return `${first}${etAl}, ${source.year}, ${source.venue}`;
}
