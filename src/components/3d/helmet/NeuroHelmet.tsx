"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { FeedbackLayer } from "./FeedbackLayer";
import { HeadVolume } from "./HeadVolume";
import { InternalSupport } from "./InternalSupport";
import { OuterShell } from "./OuterShell";
import { ProcessingLayer } from "./ProcessingLayer";
import { SensorLayer } from "./SensorLayer";
import {
  ALL_LAYERS_VISIBLE,
  type HelmetLayerRefs,
  type HelmetLayerVisibility,
} from "./types";

type NeuroHelmetProps = {
  visibleLayers?: HelmetLayerVisibility;
  /** Optional refs so later phases can transform each layer independently. */
  layerRefs?: HelmetLayerRefs;
  reducedMotion: boolean;
};

const SWAY_AMPLITUDE = 0.32; // radians either side of the default view
const SWAY_SPEED = 0.35; // radians/second of the sway phase (~18 s period)

/**
 * The conceptual NeuroHelmet. Six layer groups share one origin (the center of
 * the head volume). Idle motion is a slow sway, off under reduced motion.
 */
export function NeuroHelmet({
  visibleLayers = ALL_LAYERS_VISIBLE,
  layerRefs,
  reducedMotion,
}: NeuroHelmetProps) {
  const root = useRef<Group>(null);

  useFrame((state) => {
    if (!root.current) return;
    root.current.rotation.y = reducedMotion
      ? 0
      : Math.sin(state.clock.elapsedTime * SWAY_SPEED) * SWAY_AMPLITUDE;
  });

  return (
    <group name="neuro-helmet" ref={root}>
      <OuterShell
        ref={layerRefs?.["outer-shell"]}
        visible={visibleLayers["outer-shell"]}
      />
      <SensorLayer
        ref={layerRefs?.["neural-signal-acquisition"]}
        visible={visibleLayers["neural-signal-acquisition"]}
      />
      <ProcessingLayer
        ref={layerRefs?.["conceptual-ai-decoder"]}
        visible={visibleLayers["conceptual-ai-decoder"]}
      />
      <FeedbackLayer
        ref={layerRefs?.["feedback-interface"]}
        visible={visibleLayers["feedback-interface"]}
      />
      <InternalSupport
        ref={layerRefs?.["internal-support"]}
        visible={visibleLayers["internal-support"]}
      />
      <HeadVolume
        ref={layerRefs?.["user-head-position"]}
        visible={visibleLayers["user-head-position"]}
      />
    </group>
  );
}
