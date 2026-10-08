import {
  MathUtils,
  Vector3,
  type Mesh,
  type Object3D,
  type Scene,
} from "three";
import { FLOW_CURVES, FLOW_PATH_KIND, HAND } from "./flowPaths";
import {
  FLOW_PATH_COUNT,
  FLOW_ROUTE_COUNT,
  type FlowVisuals,
} from "./flowVisuals";
import {
  ARROW_MATERIALS,
  FLOW_COLORS,
  FLOW_MATERIALS,
} from "./helmet/flowMaterials";
import { INDICES_PER_SEGMENT, TUBULAR_SEGMENTS } from "./helmet/FlowVisuals";
import { HELMET_MATERIALS as M } from "./helmet/HelmetMaterials";

export type FlowObjects = {
  group: Object3D | null;
  active: (Mesh | null)[];
  mid: (Mesh | null)[];
  rails: (Mesh | null)[];
  arc: Mesh | null;
  pulse: Mesh | null;
  hand: Object3D | null;
  fingers: Object3D[];
  tips: Object3D[];
  thumb: Object3D | null;
  target: Object3D | null;
};

/** Finds the flow drawing in the scene by name. */
export function findFlowObjects(scene: Scene): FlowObjects {
  const fingers: Object3D[] = [];
  const tips: Object3D[] = [];
  scene.traverse((object) => {
    if (object.name === "hand-finger") fingers.push(object);
    if (object.name === "hand-tip") tips.push(object);
  });
  return {
    group: scene.getObjectByName("flow-visuals") ?? null,
    active: Array.from(
      { length: FLOW_ROUTE_COUNT },
      (_, i) => (scene.getObjectByName(`flow-active-${i}`) as Mesh) ?? null,
    ),
    rails: Array.from(
      { length: FLOW_ROUTE_COUNT },
      (_, i) => (scene.getObjectByName(`flow-rail-${i}`) as Mesh) ?? null,
    ),
    arc: (scene.getObjectByName("flow-angle-arc") as Mesh) ?? null,
    mid: Array.from(
      { length: FLOW_ROUTE_COUNT },
      (_, i) => (scene.getObjectByName(`flow-mid-${i}`) as Mesh) ?? null,
    ),
    pulse: (scene.getObjectByName("flow-pulse") as Mesh) ?? null,
    hand: scene.getObjectByName("virtual-hand") ?? null,
    fingers,
    tips,
    thumb: scene.getObjectByName("hand-thumb") ?? null,
    target: scene.getObjectByName("flow-target") ?? null,
  };
}

/** Emissive strength of the helmet parts at rest; the flow adds to it. */
const REST = {
  sensors: 0.9,
  decoder: 0.8,
  connector: 0.25,
  feedbackBand: 0.5,
  feedbackPad: 0.55,
} as const;

const FINGER_CURL_REST = 0.7;
const FINGER_CURL_RAISED = 0.05;
const RAIL_OPACITY = 0.55;
const ARROW_DIM = 0.4;

const point = new Vector3();

/**
 * Applies the flow visuals: lines drawn along their route, the pulse, the
 * virtual hand, the target ring, and a restrained glow on the helmet parts
 * that are active. `weight` fades everything with the chapter. Plain function
 * for the frame loop; nothing here touches React state.
 */
export function applyFlow(
  visuals: FlowVisuals,
  weight: number,
  objects: FlowObjects,
  /** 0 to 1: a close view of the hand; secondary geometry steps back. */
  close = 0,
) {
  if (objects.group) objects.group.visible = weight > 0.01;

  FLOW_MATERIALS.rail.opacity = RAIL_OPACITY * weight;
  FLOW_MATERIALS.signal.opacity = weight;
  FLOW_MATERIALS.intention.opacity = weight;
  FLOW_MATERIALS.feedback.opacity = weight;
  FLOW_MATERIALS.hand.opacity = weight;
  FLOW_MATERIALS.body.opacity = 0.4 * weight * (1 - 0.75 * close);
  FLOW_MATERIALS.object.opacity = weight;

  for (let i = 0; i < FLOW_PATH_COUNT; i++) {
    const frac = visuals.paths[i];
    objects.active[i]?.geometry.setDrawRange(
      0,
      Math.floor(frac * TUBULAR_SEGMENTS) * INDICES_PER_SEGMENT,
    );
    const mid = objects.mid[i];
    if (mid) mid.visible = frac > 0.5;
    ARROW_MATERIALS[i].opacity = weight * (frac >= 0.999 ? 1 : ARROW_DIM);
  }

  // The visual interaction cue is not part of the story route.
  const cue = visuals.emphasis.cue;
  objects.active[5]?.geometry.setDrawRange(
    0,
    Math.floor(cue * TUBULAR_SEGMENTS) * INDICES_PER_SEGMENT,
  );
  const cueMid = objects.mid[5];
  if (cueMid) cueMid.visible = cue > 0.5;
  const cueRail = objects.rails[5];
  if (cueRail) cueRail.visible = cue > 0.01;
  FLOW_MATERIALS.cue.opacity = weight;
  ARROW_MATERIALS[5].opacity =
    weight * (cue > 0.01 ? (cue >= 0.999 ? 1 : ARROW_DIM) : 0);

  const pulse = objects.pulse;
  if (pulse) {
    pulse.visible = visuals.pulsePath >= 0;
    if (visuals.pulsePath >= 0) {
      FLOW_CURVES[visuals.pulsePath].getPointAt(visuals.pulseAt, point);
      pulse.position.copy(point);
      FLOW_MATERIALS.pulse.color.copy(
        FLOW_COLORS[FLOW_PATH_KIND[visuals.pulsePath]],
      );
    }
    FLOW_MATERIALS.pulse.opacity = weight;
  }

  if (objects.hand) {
    objects.hand.rotation.z = MathUtils.lerp(
      HAND.restAngle,
      HAND.raisedAngle,
      visuals.handRaise,
    );
  }
  const curl = MathUtils.lerp(
    FINGER_CURL_REST,
    FINGER_CURL_RAISED,
    visuals.handRaise,
  );
  for (const finger of objects.fingers) finger.rotation.z = -curl;
  for (const tip of objects.tips) tip.rotation.z = -curl * 0.8;
  if (objects.thumb)
    objects.thumb.rotation.z = -0.5 * (curl / FINGER_CURL_REST);

  // The contact ring. The touch and pressure selections change how strongly
  // it is drawn; nothing about it is a sensation.
  const { touch, pressure, arc } = visuals.emphasis;
  const contact = visuals.targetResponse;
  const ringScale = MathUtils.lerp(
    MathUtils.lerp(1.15, 1, touch),
    1.35,
    pressure,
  );
  const ringOpacity = MathUtils.lerp(
    MathUtils.lerp(0.65, 0.3, touch),
    0.75,
    pressure,
  );
  if (objects.target) {
    objects.target.scale.setScalar(1 + (ringScale - 1) * contact);
  }
  FLOW_MATERIALS.target.opacity = weight * (0.25 + ringOpacity * contact);
  FLOW_MATERIALS.object.emissiveIntensity =
    0.7 * contact * (1 - 0.4 * touch + 0.4 * pressure);

  if (objects.arc) objects.arc.visible = arc > 0.01;
  FLOW_MATERIALS.angle.opacity = weight * arc * 0.9;

  FLOW_MATERIALS.decoderRing.opacity =
    weight * (0.2 + 0.8 * visuals.decoderGlow);
  M.sensorGlow.emissiveIntensity =
    REST.sensors + 1.5 * visuals.sensorGlow * weight;
  M.processingAccent.emissiveIntensity =
    REST.decoder + 1.6 * visuals.decoderGlow * weight;
  M.connector.emissiveIntensity =
    REST.connector + 0.9 * visuals.decoderGlow * weight;
  M.feedbackBand.emissiveIntensity =
    REST.feedbackBand + 1.2 * visuals.feedbackGlow * weight;
  M.feedbackPad.emissiveIntensity =
    REST.feedbackPad + 1.4 * visuals.feedbackGlow * weight;
}
