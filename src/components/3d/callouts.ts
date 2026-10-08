/** Places a callout element at a screen position. Plain function for the frame loop. */
export function placeCallout(
  el: HTMLElement,
  x: number,
  y: number,
  opacity: number,
  interactive: boolean,
  /** True when the label should sit left of its dot (near the right edge). */
  flip: boolean,
) {
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    el.style.visibility = "hidden";
    return;
  }
  el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
  el.dataset.side = flip ? "left" : "right";
  el.style.opacity = opacity.toFixed(3);
  el.style.visibility = opacity > 0.02 ? "visible" : "hidden";
  el.inert = !interactive;
}

/** Marks a label as the one in focus, for styling. Plain function for the frame loop. */
export function markActive(el: HTMLElement, active: boolean) {
  el.dataset.active = active ? "true" : "false";
}
