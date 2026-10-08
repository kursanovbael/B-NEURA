"use client";

import { useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "three";
import type { CameraPose } from "./types";

/**
 * Stable camera states. Phase 2 only needs a default presentation view and a
 * closer inspection view; cinematic choreography arrives in later phases.
 */
export const CAMERA_POSES = {
  default: { position: [1.95, 0.7, 3.3], target: [0, 0.02, 0], fov: 32 },
  inspection: { position: [1.6, 0.6, 2.7], target: [0, 0.08, 0], fov: 32 },
} as const satisfies Record<string, CameraPose>;

export type CameraPoseId = keyof typeof CAMERA_POSES;

export const DEFAULT_CAMERA_POSE: CameraPose = CAMERA_POSES.default;

type CameraRigProps = {
  pose?: CameraPose;
};

/** Applies a camera pose. No animation: states are switched, not tweened. */
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
