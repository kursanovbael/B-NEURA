import { HELMET_GEOMETRY as G } from "./HelmetGeometry";
import { HELMET_MATERIALS as M } from "./HelmetMaterials";
import type { HelmetLayerProps } from "./types";

/** Conceptual sensor array: a restrained set of pads organized in rings. */
export function SensorLayer({ visible = true, ref }: HelmetLayerProps) {
  return (
    <group name="neural-signal-acquisition" ref={ref} visible={visible}>
      {G.sensorMountRings.map((geometry, i) => (
        <mesh key={i} geometry={geometry} material={M.sensorMount} />
      ))}
      {G.sensorPlacements.map(({ position, quaternion }, i) => (
        <group key={i} position={position} quaternion={quaternion}>
          <mesh geometry={G.sensorPad} material={M.sensorPad} />
          <mesh
            geometry={G.sensorGlow}
            material={M.sensorGlow}
            position={[0, 0.012, 0]}
          />
        </group>
      ))}
    </group>
  );
}
