import type { HelmetLayerId } from "./types";

/**
 * Mutable state shared between the page (pointer, buttons) and the frame loop.
 * Plain object in a ref: changing it never re-renders React.
 */
export type Interaction = {
  /** Extra yaw and pitch from dragging or the turn buttons (radians). */
  yaw: number;
  pitch: number;
  dragging: boolean;
  /** Seconds (performance.now / 1000) of the last turn input. */
  lastInput: number;
  /** Selected component in the exploded view. */
  selected: HelmetLayerId | null;
  /** 0 to 1, eased toward 1 while something is selected. */
  selectionWeight: number;
};

export function createInteraction(): Interaction {
  return {
    yaw: 0,
    pitch: 0,
    dragging: false,
    lastInput: 0,
    selected: null,
    selectionWeight: 0,
  };
}

export const MAX_PITCH = 0.35;

/** Seconds after the last turn input before turning eases back to the journey pose. */
const RETURN_AFTER_S = 2.5;
/** Rate (1/s) of that return. */
const RETURN_RATE = 2.5;
const SELECTION_RATE = 8;

const nowSeconds = () => performance.now() / 1000;

export function beginDrag(it: Interaction) {
  it.dragging = true;
}

export function dragBy(it: Interaction, dx: number, dy: number) {
  it.yaw += dx * 0.008;
  it.pitch = Math.max(-MAX_PITCH, Math.min(MAX_PITCH, it.pitch + dy * 0.004));
  it.lastInput = nowSeconds();
}

export function endDrag(it: Interaction) {
  it.dragging = false;
  it.lastInput = nowSeconds();
}

export function turnBy(it: Interaction, radians: number) {
  it.yaw += radians;
  it.lastInput = nowSeconds();
}

export function resetTurn(it: Interaction) {
  it.yaw = 0;
  it.pitch = 0;
}

export function selectComponent(it: Interaction, id: HelmetLayerId | null) {
  it.selected = id;
}

/** Eases turning back after a pause and the selection weight toward its goal. */
export function stepInteraction(
  it: Interaction,
  delta: number,
  instant: boolean,
) {
  if (
    !instant &&
    !it.dragging &&
    nowSeconds() - it.lastInput > RETURN_AFTER_S
  ) {
    const k = 1 - Math.exp(-RETURN_RATE * delta);
    it.yaw -= it.yaw * k;
    it.pitch -= it.pitch * k;
  }
  const goal = it.selected ? 1 : 0;
  it.selectionWeight = instant
    ? goal
    : it.selectionWeight +
      (goal - it.selectionWeight) * (1 - Math.exp(-SELECTION_RATE * delta));
}
