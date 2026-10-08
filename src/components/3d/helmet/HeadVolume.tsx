import { HELMET_GEOMETRY as G } from "./HelmetGeometry";
import { HELMET_MATERIALS as M } from "./HelmetMaterials";
import type { HelmetLayerProps } from "./types";

/** Abstract head and neck volume: marks head position and interior scale only. */
export function HeadVolume({ visible = true, ref }: HelmetLayerProps) {
  return (
    <group name="user-head-position" ref={ref} visible={visible}>
      <mesh geometry={G.head} material={M.head} />
      <mesh geometry={G.neck} material={M.neck} position={[0, -0.72, 0]} />
    </group>
  );
}
