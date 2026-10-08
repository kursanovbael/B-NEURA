"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import type { HelmetStageId } from "@/content/helmetStages";
import { CameraRig } from "./CameraRig";
import { ExperienceDriver } from "./ExperienceDriver";
import { NeuroHelmet, type HelmetLayerVisibility } from "./helmet";
import { SceneEnvironment } from "./SceneEnvironment";
import type { ProgressSource } from "./types";

type NeuroHelmetSceneProps = {
  source: ProgressSource;
  visibleLayers: HelmetLayerVisibility;
  onStageChange?: (stage: HelmetStageId) => void;
};

/** Composes camera, environment, helmet and the timeline driver. */
export function NeuroHelmetScene({
  source,
  visibleLayers,
  onStageChange,
}: NeuroHelmetSceneProps) {
  const invalidate = useThree((state) => state.invalidate);

  // With a fixed source the canvas renders on demand; redraw on any change.
  const fixedValue = source.mode === "fixed" ? source.value : null;
  useEffect(() => {
    invalidate();
  }, [fixedValue, visibleLayers, invalidate]);

  return (
    <>
      <CameraRig />
      <SceneEnvironment />
      <NeuroHelmet visibleLayers={visibleLayers} />
      <ExperienceDriver source={source} onStageChange={onStageChange} />
    </>
  );
}
