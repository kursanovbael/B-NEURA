import { useMemo } from "react";
import {
  BufferGeometry,
  Float32BufferAttribute,
  LineBasicMaterial,
} from "three";
import { HELMET_LAYERS } from "../helmetLayers";

/** Hairline material of the exploded-view guides. Opacity is set by the driver. */
export const GUIDE_MATERIAL = new LineBasicMaterial({
  color: "#6b7f94",
  transparent: true,
  opacity: 0,
  depthWrite: false,
});

const AXIS_BOTTOM = -1.75;
const AXIS_TOP = 3.1;
const TICK_HALF = 0.16;
const PLINTH = { y: -1.6, radius: 1.35, segments: 72 } as const;

/**
 * Thin technical guides of the exploded view: one vertical axis, a tick at the
 * height of every layer, and a faint ring under the stack.
 */
function guideGeometry(): BufferGeometry {
  const points: number[] = [];
  const segment = (a: number[], b: number[]) => points.push(...a, ...b);

  segment([0, AXIS_BOTTOM, 0], [0, AXIS_TOP, 0]);

  for (const layer of HELMET_LAYERS) {
    const y = layer.anchor[1] + layer.explodeOffset[1];
    segment([-TICK_HALF, y, 0], [TICK_HALF, y, 0]);
    segment([0, y, -TICK_HALF], [0, y, TICK_HALF]);
  }

  for (let i = 0; i < PLINTH.segments; i++) {
    const a0 = (i / PLINTH.segments) * Math.PI * 2;
    const a1 = ((i + 1) / PLINTH.segments) * Math.PI * 2;
    segment(
      [PLINTH.radius * Math.cos(a0), PLINTH.y, PLINTH.radius * Math.sin(a0)],
      [PLINTH.radius * Math.cos(a1), PLINTH.y, PLINTH.radius * Math.sin(a1)],
    );
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(points, 3));
  return geometry;
}

/** Axis, ticks and plinth of the exploded view. Static; fades in with separation. */
export function ExplodeGuides() {
  const geometry = useMemo(() => guideGeometry(), []);
  return (
    <lineSegments
      geometry={geometry}
      material={GUIDE_MATERIAL}
      frustumCulled={false}
      renderOrder={-1}
    />
  );
}
