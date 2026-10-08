import type { Material, Object3D, Scene } from "three";
import { HELMET_MATERIALS as M } from "./helmet/HelmetMaterials";
import { HELMET_LAYERS } from "./helmetLayers";
import type { TimelineState } from "./timeline";
import type { HelmetLayerId } from "./types";

export type HelmetObjects = {
  root: Object3D | null;
  layers: Record<HelmetLayerId, Object3D | null>;
};

/** Finds the helmet root and layer groups in the scene by their names. */
export function findHelmetObjects(scene: Scene): HelmetObjects {
  const layers = {} as HelmetObjects["layers"];
  for (const layer of HELMET_LAYERS) {
    layers[layer.id] = scene.getObjectByName(layer.id) ?? null;
  }
  return { root: scene.getObjectByName("neuro-helmet") ?? null, layers };
}

/** Opacity of an inner layer before it is brought into focus. */
const DIMMED_OPACITY = 0.2;
/** Shell trim and seams never fade below this, so the shell stays readable. */
const SHELL_DETAIL_FLOOR = 0.4;

function setOpacity(material: Material, opacity: number) {
  material.opacity = opacity;
  material.transparent = opacity < 0.999;
  material.depthWrite = opacity >= 0.9;
}

function focus(reveal: number): number {
  return DIMMED_OPACITY + (1 - DIMMED_OPACITY) * reveal;
}

/**
 * Applies a timeline state to the helmet: yaw, per-layer separation and
 * material opacity. A plain function (not a hook) so it can mutate scene
 * objects from the frame loop without touching React state.
 */
export function applyHelmetState(state: TimelineState, objects: HelmetObjects) {
  if (objects.root) objects.root.rotation.y = state.yaw;

  for (const layer of HELMET_LAYERS) {
    objects.layers[layer.id]?.position.set(
      layer.explodeOffset[0] * state.separation,
      layer.explodeOffset[1] * state.separation,
      layer.explodeOffset[2] * state.separation,
    );
  }

  const shell = state.shellOpacity;
  const detail = Math.max(shell, SHELL_DETAIL_FLOOR);
  setOpacity(M.shell, shell);
  setOpacity(M.visor, shell * 0.85);
  setOpacity(M.visorEdge, detail);
  setOpacity(M.trim, detail);
  setOpacity(M.seam, detail);

  const sensors = focus(state.reveal.sensors);
  setOpacity(M.sensorPad, sensors);
  setOpacity(M.sensorGlow, sensors);
  setOpacity(M.sensorMount, sensors);
  setOpacity(M.support, sensors);

  const decoder = focus(state.reveal.decoder);
  setOpacity(M.processingBody, decoder);
  setOpacity(M.processingAccent, decoder);
  setOpacity(M.connector, decoder);

  const feedback = focus(state.reveal.feedback);
  setOpacity(M.feedbackBand, feedback);
  setOpacity(M.feedbackPad, feedback);
}
