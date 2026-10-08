/**
 * Dark environment and restrained lighting. No HDR/environment files, so
 * nothing is fetched at runtime.
 */
export function SceneEnvironment() {
  return (
    <>
      <color attach="background" args={["#05070a"]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} color="#e6f4ff" />
      <directionalLight
        position={[-4, 1, -3]}
        intensity={1.1}
        color="#a78bfa"
      />
      <pointLight
        position={[0, 0.2, 0]}
        intensity={0.8}
        color="#22d3ee"
        distance={4}
      />
    </>
  );
}
