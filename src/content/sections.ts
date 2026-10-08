import { CHAPTERS } from "./chapters";

export type SectionEntry = {
  id: string;
  title: string;
  anchor: string;
};

/** Ordered sections of the page: the chapters of the NeuroHelmet story. */
export const sections: readonly SectionEntry[] = CHAPTERS.map((chapter) => ({
  id: chapter.id,
  title: chapter.name,
  anchor: chapter.anchor,
}));
