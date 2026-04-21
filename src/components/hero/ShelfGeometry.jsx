import * as THREE from 'three';

/* ── Two wooden shelf boards ── */
const WOOD_COLOR   = '#4A3020';
const WOOD_ROUGH   = 0.92;
const WOOD_METAL   = 0.0;

function ShelfBoard({ position, scale }) {
  return (
    <mesh position={position} scale={scale} receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={WOOD_COLOR}
        roughness={WOOD_ROUGH}
        metalness={WOOD_METAL}
        envMapIntensity={0.3}
      />
    </mesh>
  );
}

/* ── Back wall behind shelves ── */
function BackWall() {
  return (
    <mesh position={[0, 0, -1.2]} receiveShadow>
      <boxGeometry args={[16, 8, 0.1]} />
      <meshStandardMaterial
        color="#1E1208"
        roughness={0.98}
        metalness={0.0}
      />
    </mesh>
  );
}

export default function ShelfGeometry() {
  // Row 1: y=0.6, Row 2: y=-1.2
  const shelfWidth  = 14;
  const shelfH      = 0.12;
  const shelfDepth  = 1.3;

  const sideW  = 0.12;
  const sideH  = 3.5;

  return (
    <group>
      <BackWall />

      {/* Top shelf board */}
      <ShelfBoard
        position={[0, 0.72, -0.35]}
        scale={[shelfWidth, shelfH, shelfDepth]}
      />
      {/* Bottom shelf board */}
      <ShelfBoard
        position={[0, -1.1, -0.35]}
        scale={[shelfWidth, shelfH, shelfDepth]}
      />
      {/* Floor shelf */}
      <ShelfBoard
        position={[0, -2.9, -0.35]}
        scale={[shelfWidth, shelfH, shelfDepth]}
      />

      {/* Left side panel */}
      <ShelfBoard
        position={[-shelfWidth / 2 - sideW / 2, 0, -0.35]}
        scale={[sideW, sideH, shelfDepth]}
      />
      {/* Right side panel */}
      <ShelfBoard
        position={[shelfWidth / 2 + sideW / 2, 0, -0.35]}
        scale={[sideW, sideH, shelfDepth]}
      />

      {/* Gold edge trim on front of top shelf */}
      <mesh position={[0, 0.735, -0.35 + shelfDepth / 2]}>
        <boxGeometry args={[shelfWidth, 0.018, 0.01]} />
        <meshStandardMaterial color="#C8973F" metalness={0.8} roughness={0.2} emissive="#C8973F" emissiveIntensity={0.3} />
      </mesh>
      {/* Gold edge trim on front of bottom shelf */}
      <mesh position={[0, -1.085, -0.35 + shelfDepth / 2]}>
        <boxGeometry args={[shelfWidth, 0.018, 0.01]} />
        <meshStandardMaterial color="#C8973F" metalness={0.8} roughness={0.2} emissive="#C8973F" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}
