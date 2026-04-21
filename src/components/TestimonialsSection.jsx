import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { TESTIMONIALS } from '../data/books';
import SectionHeader from './SectionHeader';

gsap.registerPlugin(ScrollTrigger);

/* ── 3 glass quote cards ── */
export default function TestimonialsSection() {
  const rowRef = useRef(null);

  useEffect(() => {
    if (!rowRef.current) return;
    const cards = rowRef.current.querySelectorAll('.testi-card');
    gsap.fromTo(cards,
      { opacity: 0, rotateX: 15, y: 40 },
      {
        opacity: 1, rotateX: 0, y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: rowRef.current, start: 'top 80%' },
      }
    );
  }, []);

  return (
    <section id="testimonials" className="section" aria-label="What our readers say">
      <div className="container">
        <SectionHeader
          title="What Our Readers Say"
          subtitle="Voices from across the campus"
        />

        <div
          ref={rowRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
            perspective: 1000,
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <TestiCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestiCard({ t }) {
  return (
    <blockquote
      className="testi-card"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(200,151,63,0.12)',
        borderLeft: '3px solid #C8973F',
        borderRadius: '0 4px 4px 0',
        padding: '28px 28px 24px',
        opacity: 0,
        position: 'relative',
        transition: 'border-color 0.2s, background 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(200,151,63,0.04)';
        e.currentTarget.style.borderColor = 'rgba(200,151,63,0.25)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
        e.currentTarget.style.borderColor = 'rgba(200,151,63,0.12)';
      }}
    >
      {/* Quote mark */}
      <span aria-hidden="true" style={{
        fontFamily: 'var(--font-display)',
        fontSize: '4rem',
        color: 'rgba(200,151,63,0.2)',
        lineHeight: 1,
        position: 'absolute',
        top: 10, left: 20,
        userSelect: 'none',
      }}>
        "
      </span>

      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '1rem',
        fontStyle: 'italic',
        color: 'var(--text-secondary)',
        lineHeight: 1.75,
        marginBottom: 20,
        paddingTop: 24,
        position: 'relative',
        zIndex: 1,
      }}>
        {t.quote}
      </p>

      <footer style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {/* Avatar */}
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'linear-gradient(135deg, #C8973F, #F0C060)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '0.85rem',
          color: 'var(--bg-base)',
          flexShrink: 0,
        }}>
          {t.initials}
        </div>
        <div>
          <cite style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '0.88rem',
            color: 'var(--text-primary)',
            display: 'block',
            letterSpacing: '0.02em',
          }}>
            {t.name}
          </cite>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.76rem',
            color: 'var(--text-muted)',
            fontStyle: 'italic',
          }}>
            {t.role}
          </span>
        </div>
      </footer>
    </blockquote>
  );
}
