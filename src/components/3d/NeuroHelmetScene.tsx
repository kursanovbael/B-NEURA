"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { CameraRig } from "./CameraRig";
import { HelmetPlaceholder } from "./HelmetPlaceholder";
import { SceneEnvironment } from "./SceneEnvironment";
import type { ExperienceProgress } from "./types";

type NeuroHelmetSceneProps = {
  experience: ExperienceProgress;
  reducedMotion: boolean;
};

/**
 * Composes camera, environment and helmet. Reads a single ExperienceProgress,
 * so scroll-driven behavior can later be added without touching the parts.
 */
export function NeuroHelmetScene({
  experience,
  reducedMotion,
}: NeuroHelmetSceneProps) {
  const invalidate = useThree((state) => state.invalidate);

  // With reduced motion the canvas renders on demand; redraw on progress change.
  useEffect(() => {
    invalidate();
  }, [experience.progress, invalidate]);

  return (
    <>
      <CameraRig />
      <SceneEnvironment />
      <HelmetPlaceholder
        progress={experience.progress}
        reducedMotion={reducedMotion}
      />
    </>
  );
}
