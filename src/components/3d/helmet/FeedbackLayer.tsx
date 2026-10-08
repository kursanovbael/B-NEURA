import { HELMET_GEOMETRY as G } from "./HelmetGeometry";
import { HELMET_MATERIALS as M } from "./HelmetMaterials";
import type { HelmetLayerProps } from "./types";

/** Abstract feedback layer: a low band with a few pads. Conceptual only. */
export function FeedbackLayer({ visible = true, ref }: HelmetLayerProps) {
  return (
    <group name="feedback-interface" ref={ref} visible={visible}>
      <mesh geometry={G.feedbackBand} material={M.feedbackBand} />
      {G.feedbackPads.map(({ position, rotationY }, i) => (
        <mesh
          key={i}
          geometry={G.feedbackPad}
          material={M.feedbackPad}
          position={position}
          rotation={[0, rotationY, 0]}
        />
      ))}
    </group>
  );
}
