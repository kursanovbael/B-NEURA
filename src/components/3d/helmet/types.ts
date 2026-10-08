import type { Ref } from "react";
import type { Group } from "three";
import type { HelmetLayerId } from "../types";

/**
 * Shared props for every helmet layer. Each layer renders one named group
 * whose origin is the shared helmet origin (the center of the head volume),
 * so later phases can translate, rotate, scale or fade any layer on its own.
 */
export type HelmetLayerProps = {
  visible?: boolean;
  ref?: Ref<Group>;
};

export type HelmetLayerVisibility = Record<HelmetLayerId, boolean>;

export type HelmetLayerRefs = Partial<Record<HelmetLayerId, Ref<Group>>>;

export const ALL_LAYERS_VISIBLE: HelmetLayerVisibility = {
  "outer-shell": true,
  "neural-signal-acquisition": true,
  "conceptual-ai-decoder": true,
  "feedback-interface": true,
  "internal-support": true,
  "user-head-position": true,
};
