import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { CATEGORIES } from '../data/books';
import { useCursor } from '../context/CursorContext';
import SectionHeader from './SectionHeader';

gsap.registerPlugin(ScrollTrigger);

/* ── 3×2 category card grid ── */
export default function CategoriesSection() {
  const gridRef = useRef(null);
  const { setCursorHint } = useCursor();

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.cat-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section id="categories" className="section" aria-label="Browse by Category">
      <div className="container">
        <SectionHeader
          title="Browse by Category"
          subtitle="Explore our curated academic collections"
        />
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={i} cat={cat} setCursorHint={setCursorHint} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ cat, setCursorHint }) {
  const underlineRef = useRef(null);
  const cardRef      = useRef(null);

  const handleEnter = () => {
    setCursorHint('cta');
    if (underlineRef.current) {
      gsap.to(underlineRef.current, { scaleX: 1, duration: 0.3, ease: 'power2.out', transformOrigin: 'left' });
    }
    if (cardRef.current) {
      gsap.to(cardRef.current, { scale: 1.025, duration: 0.25, ease: 'power2.out' });
    }
  };

  const handleLeave = () => {
    setCursorHint('default');
    if (underlineRef.current) {
      gsap.to(underlineRef.current, { scaleX: 0, duration: 0.25, ease: 'power2.in', transformOrigin: 'left' });
    }
    if (cardRef.current) {
      gsap.to(cardRef.current, { scale: 1, duration: 0.25, ease: 'power2.out' });
    }
  };

  return (
    <article
      className="cat-card"
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(200,151,63,0.12)',
        borderRadius: 4,
        padding: '28px 28px 24px',
        cursor: 'none',
        position: 'relative',
        overflow: 'hidden',
        willChange: 'transform',
      }}
    >
      {/* Background glow on hover */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 120, height: 120,
        background: 'radial-gradient(circle, rgba(200,151,63,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ fontSize: '2rem', marginBottom: 12 }} aria-hidden="true">
        {cat.icon}
      </div>

      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.35rem',
        fontWeight: 700,
        letterSpacing: '0.02em',
        marginBottom: 6,
        position: 'relative',
      }}>
        {cat.name}
        {/* Animated gold underline */}
        <span
          ref={underlineRef}
          style={{
            display: 'block',
            height: 2,
            background: 'var(--gold-gradient)',
            marginTop: 4,
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            borderRadius: 1,
          }}
        />
      </h3>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 16, fontStyle: 'italic' }}>
        {cat.desc}
      </p>

      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        color: 'var(--gold)',
        letterSpacing: '0.1em',
      }}>
        {cat.count.toLocaleString()} titles →
      </span>
    </article>
  );
}
