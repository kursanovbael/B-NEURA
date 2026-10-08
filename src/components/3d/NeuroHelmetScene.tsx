"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { CAMERA_POSES, CameraRig, type CameraPoseId } from "./CameraRig";
import { NeuroHelmet, type HelmetLayerVisibility } from "./helmet";
import { SceneEnvironment } from "./SceneEnvironment";

type NeuroHelmetSceneProps = {
  visibleLayers: HelmetLayerVisibility;
  cameraPose: CameraPoseId;
  reducedMotion: boolean;
};

/** Composes camera, environment and helmet. */
export function NeuroHelmetScene({
  visibleLayers,
  cameraPose,
  reducedMotion,
}: NeuroHelmetSceneProps) {
  const invalidate = useThree((state) => state.invalidate);

  // With reduced motion the canvas renders on demand; redraw on any change.
  useEffect(() => {
    invalidate();
  }, [visibleLayers, cameraPose, invalidate]);

  return (
    <>
      <CameraRig pose={CAMERA_POSES[cameraPose]} />
      <SceneEnvironment />
      <NeuroHelmet
        visibleLayers={visibleLayers}
        reducedMotion={reducedMotion}
      />
    </>
  );
}
