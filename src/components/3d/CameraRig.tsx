"use client";

import { useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import { PerspectiveCamera, type Camera } from "three";
import type { CameraPose } from "./types";

/**
 * Initial camera pose (the hero stage). During the experience the camera is
 * driven every frame by the timeline through `applyCameraPose`.
 */
export const DEFAULT_CAMERA_POSE: CameraPose = {
  position: [1.95, 0.7, 3.3],
  target: [0, 0.02, 0],
  fov: 32,
};

/** Applies a pose to a camera. Plain function so the frame loop can call it. */
export function applyCameraPose(camera: Camera, pose: CameraPose) {
  if (!(camera instanceof PerspectiveCamera)) return;
  camera.position.set(...pose.position);
  if (camera.fov !== pose.fov) {
    camera.fov = pose.fov;
    camera.updateProjectionMatrix();
  }
  camera.lookAt(...pose.target);
}

type CameraRigProps = {
  pose?: CameraPose;
};

/** Sets the initial camera pose before the first frame is drawn. */
export function CameraRig({ pose = DEFAULT_CAMERA_POSE }: CameraRigProps) {
  const get = useThree((state) => state.get);

  useLayoutEffect(() => {
    applyCameraPose(get().camera, pose);
  }, [get, pose]);

  return null;
}
