import type { Ref } from "react";
import type { Group } from "three";
import type { HelmetLayerId } from "../types";

/**
 * Shared props for every helmet layer. Each layer renders one named group
 * whose origin is the shared helmet origin (the center of the head volume),
 * so each layer can be translated, rotated, scaled or faded on its own.
 */
export type HelmetLayerProps = {
  visible?: boolean;
  ref?: Ref<Group>;
};

export type HelmetLayerVisibility = Record<HelmetLayerId, boolean>;

export const ALL_LAYERS_VISIBLE: HelmetLayerVisibility = {
  "outer-shell": true,
  "neural-signal-acquisition": true,
  "conceptual-ai-decoder": true,
  "feedback-interface": true,
  "internal-support": true,
  "user-head-position": true,
};
