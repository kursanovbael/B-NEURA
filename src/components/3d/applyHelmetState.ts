import type { Material, Object3D, Scene } from "three";
import { GUIDE_MATERIAL } from "./helmet/ExplodeGuides";
import { HELMET_MATERIALS as M } from "./helmet/HelmetMaterials";
import { PATH_MATERIALS } from "./helmet/SignalPath";
import { DIMMED_FACTOR } from "./journey";
import { HELMET_LAYERS } from "./helmetLayers";
import type { HelmetLayerId } from "./types";

export type HelmetObjects = {
  root: Object3D | null;
  layers: Record<HelmetLayerId, Object3D | null>;
  path: Object3D | null;
};

/** Finds the helmet root, layer groups and signal path in the scene by name. */
export function findHelmetObjects(scene: Scene): HelmetObjects {
  const layers = {} as HelmetObjects["layers"];
  for (const layer of HELMET_LAYERS) {
    layers[layer.id] = scene.getObjectByName(layer.id) ?? null;
  }
  return {
    root: scene.getObjectByName("neuro-helmet") ?? null,
    layers,
    path: scene.getObjectByName("signal-path") ?? null,
  };
}

/** What the frame loop applies to the scene each frame. */
export type HelmetAppearance = {
  yaw: number;
  pitch: number;
  shellOpacity: number;
  /** 0 (dimmed) to 1 (full) per layer, after any selection. */
  focus: Record<HelmetLayerId, number>;
  separation: number;
  guides: number;
  path: number;
  bridge: number;
};

function setOpacity(material: Material, opacity: number) {
  material.opacity = opacity;
  material.transparent = opacity < 0.999;
  material.depthWrite = opacity >= 0.9;
}

function strength(focus: number): number {
  return DIMMED_FACTOR + (1 - DIMMED_FACTOR) * focus;
}

/** Nominal opacity of the translucent head and neck. */
const HEAD_OPACITY = 0.38;
const NECK_OPACITY = 0.18;
/** Shell trim and seams never fade below this, so the shell stays readable. */
const SHELL_DETAIL_FLOOR = 0.4;

/**
 * Applies the journey state to the helmet: yaw, per-layer separation, material
 * opacity, and the guides and path. A plain function so the frame loop can
 * mutate scene objects without touching React state.
 */
export function applyHelmetState(
  appearance: HelmetAppearance,
  objects: HelmetObjects,
) {
  if (objects.root) {
    objects.root.rotation.y = appearance.yaw;
    objects.root.rotation.x = appearance.pitch;
  }

  for (const layer of HELMET_LAYERS) {
    objects.layers[layer.id]?.position.set(
      layer.explodeOffset[0] * appearance.separation,
      layer.explodeOffset[1] * appearance.separation,
      layer.explodeOffset[2] * appearance.separation,
    );
  }

  const shell = appearance.shellOpacity;
  const detail = Math.max(shell, SHELL_DETAIL_FLOOR);
  setOpacity(M.shell, shell);
  setOpacity(M.visor, shell * 0.85);
  setOpacity(M.visorEdge, detail);
  setOpacity(M.trim, detail);
  setOpacity(M.seam, detail);

  const sensors = strength(appearance.focus["neural-signal-acquisition"]);
  setOpacity(M.sensorPad, sensors);
  setOpacity(M.sensorGlow, sensors);
  setOpacity(M.sensorMount, sensors);

  const decoder = strength(appearance.focus["conceptual-ai-decoder"]);
  setOpacity(M.processingBody, decoder);
  setOpacity(M.processingAccent, decoder);
  setOpacity(M.connector, decoder);

  const feedback = strength(appearance.focus["feedback-interface"]);
  setOpacity(M.feedbackBand, feedback);
  setOpacity(M.feedbackPad, feedback);

  setOpacity(M.support, strength(appearance.focus["internal-support"]));

  const head = strength(appearance.focus["user-head-position"]);
  setOpacity(M.head, HEAD_OPACITY * head);
  setOpacity(M.neck, NECK_OPACITY * head);

  GUIDE_MATERIAL.opacity = 0.45 * appearance.guides;
  GUIDE_MATERIAL.visible = appearance.guides > 0.01;

  const path = appearance.path;
  if (objects.path) objects.path.visible = path > 0.01;
  PATH_MATERIALS.main.opacity = 0.7 * path;
  PATH_MATERIALS.bridge.opacity = 0.7 * path * appearance.bridge;
  PATH_MATERIALS.stop.opacity = 0.9 * path * (1 - appearance.bridge);
  PATH_MATERIALS.body.opacity = 0.9 * path * appearance.bridge;
}
