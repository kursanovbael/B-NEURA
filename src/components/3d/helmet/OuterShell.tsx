import { HELMET_GEOMETRY as G } from "./HelmetGeometry";
import { HELMET_MATERIALS as M } from "./HelmetMaterials";
import type { HelmetLayerProps } from "./types";

/** Conceptual outer housing: dome, front display band, seams, rim and side modules. */
export function OuterShell({ visible = true, ref }: HelmetLayerProps) {
  return (
    <group name="outer-shell" ref={ref} visible={visible}>
      <mesh geometry={G.shell} material={M.shell} />
      <mesh geometry={G.visor} material={M.visor} position={[0, 0.02, 0]} />
      {G.visorFrame.map((geometry, i) => (
        <mesh key={i} geometry={geometry} material={M.visorEdge} />
      ))}
      {G.seams.map((geometry, i) => (
        <mesh key={i} geometry={geometry} material={M.seam} />
      ))}
      <mesh geometry={G.rimTrim} material={M.trim} />
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          geometry={G.earPod}
          material={M.trim}
          position={[side * 0.845, -0.05, -0.05]}
          rotation={[0, 0, Math.PI / 2]}
        />
      ))}
    </group>
  );
}
