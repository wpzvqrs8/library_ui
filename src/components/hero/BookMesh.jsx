import { useRef, useState, useMemo, useCallback, memo } from 'react';
import { useSpring, animated } from '@react-spring/three';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useCursor } from '../../context/CursorContext';

/* ── Generate a canvas-based spine texture for each book ── */
function createSpineTexture(book) {
  const W = 80, H = 320;
  const canvas    = document.createElement('canvas');
  canvas.width    = W;
  canvas.height   = H;
  const ctx       = canvas.getContext('2d');

  // Background
  ctx.fillStyle = book.color;
  ctx.fillRect(0, 0, W, H);

  // Subtle texture gradient
  const grad = ctx.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0,   'rgba(255,255,255,0.06)');
  grad.addColorStop(0.5, 'rgba(255,255,255,0.0)');
  grad.addColorStop(1,   'rgba(0,0,0,0.14)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Gold top strip
  ctx.fillStyle = '#C8973F';
  ctx.fillRect(0, 0, W, 5);
  ctx.fillRect(0, H - 5, W, 5);

  // Thin inner lines
  ctx.fillStyle = 'rgba(200,151,63,0.5)';
  ctx.fillRect(6, 10, W - 12, 1);
  ctx.fillRect(6, H - 11, W - 12, 1);

  // Gold outer border lines (vertical)
  ctx.fillStyle = 'rgba(200,151,63,0.3)';
  ctx.fillRect(4, 0, 1, H);
  ctx.fillRect(W - 5, 0, 1, H);

  // Draw rotated text
  ctx.save();
  ctx.translate(W / 2, H / 2);
  ctx.rotate(-Math.PI / 2);

  // Title
  ctx.fillStyle = '#EDE8DC';
  ctx.font      = 'bold 13px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  const titleText  = book.title.length > 22 ? book.title.slice(0, 20) + '…' : book.title;
  ctx.fillText(titleText, 0, -6);

  // Author
  ctx.fillStyle = 'rgba(184,169,138,0.85)';
  ctx.font      = 'italic 9px serif';
  ctx.fillText(book.author.split(' ').slice(-1)[0], 0, 9);

  ctx.restore();

  const tex          = new THREE.CanvasTexture(canvas);
  tex.colorSpace     = THREE.SRGBColorSpace;
  tex.needsUpdate    = true;
  return tex;
}

/* ── Single 3D Book ── */
const BookMesh = memo(function BookMesh({ book, position, neighborOffset = 0 }) {
  const [hovered, setHovered]   = useState(false);
  const hoverTimeout            = useRef(null);
  const groupRef                = useRef();
  const { setCursorHint }       = useCursor();

  // Vary book dimensions per id
  const height = useMemo(() => 0.85 + ((book.id * 7) % 10) * 0.035, [book.id]);
  const width  = useMemo(() => 0.13 + ((book.id * 3) % 10) * 0.009, [book.id]);
  const depth  = 0.85;

  const spineTexture = useMemo(() => createSpineTexture(book), [book]);

  // Spring for pull animation
  const { posZ, posY, scaleX, glowIntensity } = useSpring({
    posZ:          hovered ? 1.85 : 0,
    posY:          hovered ? 0.06 : 0,
    scaleX:        hovered ? 1.04 : 1,
    glowIntensity: hovered ? 15.0 : 0,
    config:        { tension: 180, friction: 22 },
  });

  // Neighbor nudge spring
  const { nudgeX } = useSpring({
    nudgeX: neighborOffset * 0.18,
    config: { tension: 200, friction: 28 },
  });

  const handlePointerEnter = useCallback((e) => {
    e.stopPropagation();
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setHovered(true);
    setCursorHint('book');
    document.body.style.cursor = 'none';
  }, [setCursorHint]);

  const handlePointerLeave = useCallback(() => {
    hoverTimeout.current = setTimeout(() => {
      setHovered(false);
    }, 3500); // 3.5 seconds
    setCursorHint('default');
  }, [setCursorHint]);

  return (
    <animated.group
      ref={groupRef}
      position-x={position[0]}
      position-y={posY.to(y => position[1] + y)}
      position-z={posZ}
    >
      <animated.mesh
        position-x={nudgeX}
        scale-x={scaleX}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          map={spineTexture}
          roughness={0.82}
          metalness={0.08}
          envMapIntensity={0.4}
        />
      </animated.mesh>

      {/* Per-book halo light when pulled */}
      <animated.pointLight
        position={[0, 0, depth / 2 + 0.5]}
        color="#FFB040"
        intensity={glowIntensity}
        distance={4}
        decay={2}
      />

      {/* Info panel overlay */}
      {hovered && (
        <Html
          position={[0, -height / 2 - 0.25, depth / 2 + 1.0]}
          center
          distanceFactor={6}
          zIndexRange={[10, 20]}
          occlude={false}
        >
          <div className="book-panel">
            <h3>{book.title}</h3>
            <p className="bp-author">{book.author}</p>
            <span className="bp-pill">{book.category}</span>
            <p className="bp-desc">{book.desc}</p>
            <p className="bp-year" style={{ fontFamily: 'Courier Prime, monospace' }}>{book.year}</p>
            <div className="bp-actions">
              <button
                className="bp-btn-read"
                onClick={() => window.dispatchEvent(new CustomEvent('showComingSoon'))}
              >
                Read Now
              </button>
              <button
                className="bp-btn-shelf"
                aria-label="Add to shelf"
                title="Add to My Shelf"
                onClick={() => window.dispatchEvent(new CustomEvent('showComingSoon'))}
              >
                🔖
              </button>
            </div>
          </div>
        </Html>
      )}
    </animated.group>
  );
});

export default BookMesh;
