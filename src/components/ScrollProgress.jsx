import { useScroll, useSpring, motion } from 'framer-motion';

/* ── Gold scroll progress bar at top of viewport ── */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #C8973F, #F0C060)',
        transformOrigin: '0% 50%',
        scaleX,
        zIndex: 'var(--z-cursor)',
        pointerEvents: 'none',
      }}
    />
  );
}
