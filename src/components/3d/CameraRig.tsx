"use client";

import { useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "three";
import type { CameraPose } from "./types";

/**
 * Pose per narrative phase. Phase 1 only defines the stable default; the
 * remaining phases (close-up, exploded, internal, cutaway) arrive with the
 * NeuroHelmet phase.
 */
export const CAMERA_POSES = {
  hero: { position: [0, 0.4, 5], target: [0, 0.1, 0], fov: 35 },
} as const satisfies Partial<Record<string, CameraPose>>;

export const DEFAULT_CAMERA_POSE: CameraPose = CAMERA_POSES.hero;

type CameraRigProps = {
  pose?: CameraPose;
};

/** Applies a camera pose. No animation yet: Phase 1 is a stable camera. */
export function CameraRig({ pose = DEFAULT_CAMERA_POSE }: CameraRigProps) {
  const get = useThree((state) => state.get);

  useLayoutEffect(() => {
    const { camera } = get();
    if (!(camera instanceof PerspectiveCamera)) return;
    camera.position.set(...pose.position);
    camera.fov = pose.fov;
    camera.lookAt(...pose.target);
    camera.updateProjectionMatrix();
  }, [get, pose]);

  return null;
}
