"use client";

import { FeedbackLayer } from "./FeedbackLayer";
import { HeadVolume } from "./HeadVolume";
import { InternalSupport } from "./InternalSupport";
import { OuterShell } from "./OuterShell";
import { ProcessingLayer } from "./ProcessingLayer";
import { SensorLayer } from "./SensorLayer";
import { ALL_LAYERS_VISIBLE, type HelmetLayerVisibility } from "./types";

type NeuroHelmetProps = {
  visibleLayers?: HelmetLayerVisibility;
};

/**
 * The conceptual NeuroHelmet. Six layer groups share one origin (the center of
 * the head volume). It has no motion of its own: yaw, separation and opacity
 * are applied from the timeline by the experience driver, which finds the
 * groups by name ("neuro-helmet" and each layer id).
 */
export function NeuroHelmet({
  visibleLayers = ALL_LAYERS_VISIBLE,
}: NeuroHelmetProps) {
  return (
    <group name="neuro-helmet">
      <OuterShell visible={visibleLayers["outer-shell"]} />
      <SensorLayer visible={visibleLayers["neural-signal-acquisition"]} />
      <ProcessingLayer visible={visibleLayers["conceptual-ai-decoder"]} />
      <FeedbackLayer visible={visibleLayers["feedback-interface"]} />
      <InternalSupport visible={visibleLayers["internal-support"]} />
      <HeadVolume visible={visibleLayers["user-head-position"]} />
    </group>
  );
}
