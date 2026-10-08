import { useMemo } from "react";
import {
  CatmullRomCurve3,
  MeshBasicMaterial,
  TubeGeometry,
  Vector3,
  type BufferGeometry,
} from "three";

/**
 * A simple line leaving the head toward a virtual body. In the gap chapter it
 * stops short and ends in a cross; later it reaches a ring that stands for the
 * virtual body. Purely illustrative, drawn in world space. Opacities are set
 * by the driver.
 */
export const PATH_MATERIALS = {
  main: new MeshBasicMaterial({
    color: "#22d3ee",
    transparent: true,
    opacity: 0,
  }),
  bridge: new MeshBasicMaterial({
    color: "#22d3ee",
    transparent: true,
    opacity: 0,
  }),
  stop: new MeshBasicMaterial({
    color: "#94a3b8",
    transparent: true,
    opacity: 0,
  }),
  body: new MeshBasicMaterial({
    color: "#a78bfa",
    transparent: true,
    opacity: 0,
  }),
};

const CURVE = new CatmullRomCurve3([
  new Vector3(0.2, -0.15, 0.15),
  new Vector3(0.9, -0.4, 0.45),
  new Vector3(1.6, -0.7, 0.7),
  new Vector3(2.2, -0.85, 0.95),
]);
const GAP_START = 0.5;
const GAP_END = 0.64;
const RADIUS = 0.006;

function section(from: number, to: number): BufferGeometry {
  const points = Array.from({ length: 28 }, (_, i) =>
    CURVE.getPoint(from + ((to - from) * i) / 27),
  );
  return new TubeGeometry(new CatmullRomCurve3(points), 56, RADIUS, 6, false);
}

export function SignalPath() {
  const parts = useMemo(
    () => ({
      before: section(0, GAP_START),
      bridge: section(GAP_START, GAP_END),
      after: section(GAP_END, 1),
      gap: CURVE.getPoint((GAP_START + GAP_END) / 2),
      end: CURVE.getPoint(1),
    }),
    [],
  );

  return (
    <group name="signal-path" visible={false}>
      <mesh geometry={parts.before} material={PATH_MATERIALS.main} />
      <mesh geometry={parts.bridge} material={PATH_MATERIALS.bridge} />
      <mesh geometry={parts.after} material={PATH_MATERIALS.bridge} />
      <group position={parts.gap}>
        {[Math.PI / 4, -Math.PI / 4].map((angle) => (
          <mesh
            key={angle}
            rotation={[0, 0, angle]}
            material={PATH_MATERIALS.stop}
          >
            <boxGeometry args={[0.1, 0.01, 0.01]} />
          </mesh>
        ))}
      </group>
      <mesh position={parts.end} material={PATH_MATERIALS.body}>
        <torusGeometry args={[0.1, 0.01, 8, 40]} />
      </mesh>
    </group>
  );
}
