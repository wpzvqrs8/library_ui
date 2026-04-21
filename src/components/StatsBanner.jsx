import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { STATS } from '../data/books';

gsap.registerPlugin(ScrollTrigger);

/* ── Animated stats counter banner ── */
export default function StatsBanner() {
  const sectionRef = useRef(null);

  return (
    <section
      id="stats"
      ref={sectionRef}
      aria-label="Library by the numbers"
      style={{
        background: 'linear-gradient(180deg, rgba(13,10,7,0) 0%, rgba(30,18,8,0.9) 30%, rgba(30,18,8,0.9) 70%, rgba(13,10,7,0) 100%)',
        borderTop: '1px solid rgba(200,151,63,0.1)',
        borderBottom: '1px solid rgba(200,151,63,0.1)',
        padding: 'clamp(50px, 8vw, 80px) clamp(20px, 5vw, 80px)',
      }}
    >
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 40,
        textAlign: 'center',
      }}>
        {STATS.map((stat, i) => (
          <StatItem key={i} stat={stat} index={i} />
        ))}
      </div>
    </section>
  );
}

function StatItem({ stat, index }) {
  const numRef      = useRef(null);
  const wrapRef     = useRef(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!numRef.current) return;
    const obj = { val: 0 };

    ScrollTrigger.create({
      trigger: wrapRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: stat.value,
          duration: 1.8,
          delay: index * 0.15,
          ease: 'power2.out',
          onUpdate: () => {
            if (numRef.current) {
              numRef.current.textContent =
                Math.round(obj.val).toLocaleString() + stat.suffix;
            }
          },
          onComplete: () => setDone(true),
        });
      },
    });
  }, [stat, index]);

  return (
    <div
      ref={wrapRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}
    >
      {/* Decorative top ornament */}
      <div style={{
        width: 30,
        height: 1,
        background: 'var(--gold-gradient)',
        marginBottom: 8,
        opacity: 0.6,
      }} />

      <span
        ref={numRef}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.4rem, 5vw, 3.5rem)',
          fontWeight: 800,
          background: 'var(--gold-gradient)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
          letterSpacing: '-0.01em',
        }}
      >
        0{stat.suffix}
      </span>

      <span style={{
        fontFamily: 'var(--font-body)',
        fontStyle: 'italic',
        fontSize: '0.95rem',
        color: 'var(--text-secondary)',
        letterSpacing: '0.02em',
      }}>
        {stat.label}
      </span>

      <div style={{
        width: 30,
        height: 1,
        background: 'var(--gold-gradient)',
        marginTop: 8,
        opacity: 0.6,
      }} />
    </div>
  );
}
