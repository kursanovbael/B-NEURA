import { HELMET_GEOMETRY as G, PROCESSING_ORIGIN } from "./HelmetGeometry";
import { HELMET_MATERIALS as M } from "./HelmetMaterials";
import type { HelmetLayerProps } from "./types";

/**
 * Conceptual processing module (the imagined AI decoding stage) at the rear
 * of the head, connected to nearby sensor pads. Illustrative only.
 */
export function ProcessingLayer({ visible = true, ref }: HelmetLayerProps) {
  return (
    <group name="conceptual-ai-decoder" ref={ref} visible={visible}>
      <group position={PROCESSING_ORIGIN} rotation={[0.18, 0, 0]}>
        <mesh
          geometry={G.processingPlate}
          material={M.processingBody}
          position={[0, 0, -0.015]}
        />
        <mesh
          geometry={G.processingCore}
          material={M.processingBody}
          position={[0, 0.01, 0.02]}
        />
        <mesh
          geometry={G.processingAccent}
          material={M.processingAccent}
          position={[0, 0.07, 0.02]}
        />
        {[-0.12, 0.12].map((x) => (
          <mesh
            key={x}
            geometry={G.processingChip}
            material={M.processingBody}
            position={[x, -0.09, 0.015]}
          />
        ))}
      </group>
      {G.processingConnectors.map((geometry, i) => (
        <mesh key={i} geometry={geometry} material={M.connector} />
      ))}
    </group>
  );
}
