import { clamp01, smoothstep } from "./experience";
import type { JourneySource } from "./types";

/**
 * How much of the gap between two stops is spent standing still at each stop,
 * so text can be read while the helmet rests.
 */
const DWELL = 0.22;

/**
 * Reads the position in the story (j: 0 at the first stop, 1 at the second...)
 * from where the stop blocks sit relative to the middle of the viewport.
 * Layout is read once per frame; nothing listens to scroll and no scrolling is
 * intercepted.
 */
export function readJourney(source: JourneySource): number {
  if (source.mode === "fixed") return source.value;

  const stops = source.stops.current;
  const count = stops.length;
  if (count === 0) return 0;

  const middle = window.innerHeight / 2;
  const centers: number[] = [];
  for (const el of stops) {
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    centers.push(rect.top + rect.height / 2);
  }

  if (middle <= centers[0]) return 0;
  if (middle >= centers[count - 1]) return count - 1;

  let k = 0;
  while (middle > centers[k + 1]) k++;
  const t = (middle - centers[k]) / (centers[k + 1] - centers[k]);
  const eased = smoothstep(clamp01((t - DWELL) / (1 - 2 * DWELL)));
  return k + eased;
}
