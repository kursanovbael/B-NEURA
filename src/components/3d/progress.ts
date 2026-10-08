import { clamp01 } from "./experience";
import type { ProgressSource } from "./types";

/**
 * Reads the current target progress (0 to 1) from a source. For scroll, it is
 * the position of the tall track relative to the sticky stage. Reading layout
 * here (once per frame) avoids scroll listeners and React state.
 */
export function readProgress(source: ProgressSource): number {
  if (source.mode === "fixed") return clamp01(source.value);

  const track = source.track.current;
  const stage = source.stage.current;
  if (!track || !stage) return 0;

  const scrollable = track.getBoundingClientRect().height - stage.offsetHeight;
  if (scrollable <= 0) return 0;
  return clamp01(-track.getBoundingClientRect().top / scrollable);
}
