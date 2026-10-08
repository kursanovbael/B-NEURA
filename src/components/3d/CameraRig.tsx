"use client";

import { useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import { PerspectiveCamera, type Camera } from "three";
import type { CameraPose } from "./types";

/**
 * Initial camera pose (the hero stop). During the experience the camera is
 * driven every frame by the journey through `applyCameraPose`.
 */
export const DEFAULT_CAMERA_POSE: CameraPose = {
  position: [1.95, 0.7, 3.3],
  target: [0, 0.02, 0],
  fov: 32,
};

/** Shifts the helmet away from the centre so text and helmet can share a screen. */
export type FrameShift = { x: number; y: number };

/**
 * Wide screens put the helmet right of centre, beside the text column. Tall
 * screens move it up, above the text panel.
 */
export function frameShiftFor(aspect: number): FrameShift {
  return aspect >= 1.2 ? { x: 0.17, y: 0 } : { x: 0, y: 0.17 };
}

/** Applies a pose to a camera. Plain function so the frame loop can call it. */
export function applyCameraPose(
  camera: Camera,
  pose: CameraPose,
  shift: FrameShift,
  width: number,
  height: number,
) {
  if (!(camera instanceof PerspectiveCamera)) return;
  camera.position.set(...pose.position);
  camera.fov = pose.fov;
  camera.lookAt(...pose.target);
  if (shift.x === 0 && shift.y === 0) {
    camera.clearViewOffset();
  } else {
    camera.setViewOffset(
      width,
      height,
      -shift.x * width,
      shift.y * height,
      width,
      height,
    );
  }
  camera.updateProjectionMatrix();
  camera.updateMatrixWorld();
}

type CameraRigProps = {
  pose?: CameraPose;
};

/** Sets the initial camera pose before the first frame is drawn. */
export function CameraRig({ pose = DEFAULT_CAMERA_POSE }: CameraRigProps) {
  const get = useThree((state) => state.get);

  useLayoutEffect(() => {
    const { camera, size } = get();
    applyCameraPose(
      camera,
      pose,
      frameShiftFor(size.width / size.height),
      size.width,
      size.height,
    );
  }, [get, pose]);

  return null;
}
