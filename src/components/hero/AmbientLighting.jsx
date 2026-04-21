/* ── Warm candle-tone lighting for the bookshelf scene ── */
export default function AmbientLighting() {
  return (
    <>
      {/* Brighter ambient so nothing is pitch black. Use a warm white so it illuminates materials accurately. */}
      <ambientLight color="#ffeedd" intensity={1.5} />

      {/* Main hanging lamp — warm, casts shadows */}
      <pointLight
        position={[-3, 5, 5]}
        color="#FFA040"
        intensity={80}
        distance={40}
        decay={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.001}
      />

      {/* Secondary fill from front-right, cooler */}
      <pointLight
        position={[4, 2, 7]}
        color="#FFD080"
        intensity={40}
        distance={30}
        decay={1.5}
      />

      {/* Subtle blue-cool rim from far right — creates depth on spines */}
      <directionalLight
        position={[8, 3, -2]}
        color="#A0B0C0"
        intensity={1.5}
      />

      {/* Very soft ground bounce — warms the shelf bottom */}
      <pointLight
        position={[0, -4, 3]}
        color="#C8973F"
        intensity={20}
        distance={20}
        decay={1.5}
      />
    </>
  );
}
