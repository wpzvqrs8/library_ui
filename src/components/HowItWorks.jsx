import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { HOW_IT_WORKS } from '../data/books';
import SectionHeader from './SectionHeader';

gsap.registerPlugin(ScrollTrigger);

/* ── 3-step horizontal process section ── */
export default function HowItWorks() {
  const stepsRef = useRef(null);

  useEffect(() => {
    if (!stepsRef.current) return;
    const steps = stepsRef.current.querySelectorAll('.hiw-step');
    const line  = stepsRef.current.querySelector('.hiw-connector');

    gsap.fromTo(steps,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.7,
        stagger: 0.18,
        ease: 'power3.out',
        scrollTrigger: { trigger: stepsRef.current, start: 'top 75%' },
      }
    );

    if (line) {
      gsap.fromTo(line, { scaleX: 0 }, {
        scaleX: 1, duration: 1.2, ease: 'power2.inOut',
        scrollTrigger: { trigger: stepsRef.current, start: 'top 75%' },
      });
    }
  }, []);

  return (
    <section id="how-it-works" className="section" aria-label="How ARCANA works">
      <div className="container">
        <SectionHeader
          title="How It Works"
          subtitle="Three steps to a world of knowledge"
        />

        <div ref={stepsRef} style={{ position: 'relative' }}>
          {/* Connector line */}
          <div
            className="hiw-connector"
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '60px',
              left: '16.5%',
              right: '16.5%',
              height: '1px',
              background: 'repeating-linear-gradient(90deg, #C8973F 0, #C8973F 8px, transparent 8px, transparent 18px)',
              opacity: 0.4,
              transformOrigin: 'left center',
              transform: 'scaleX(0)',
              zIndex: 0,
            }}
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 40,
            position: 'relative',
            zIndex: 1,
          }}>
            {HOW_IT_WORKS.map((step, i) => (
              <div
                key={i}
                className="hiw-step"
                style={{
                  textAlign: 'center',
                  opacity: 0,
                }}
              >
                {/* Step number */}
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '3.5rem',
                  fontWeight: 900,
                  background: 'var(--gold-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1,
                  marginBottom: 16,
                  letterSpacing: '-0.02em',
                }}>
                  {step.step}
                </div>

                {/* Icon bubble */}
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'rgba(200,151,63,0.08)',
                  border: '1px solid rgba(200,151,63,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.6rem',
                  margin: '0 auto 20px',
                }}>
                  {step.icon}
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  marginBottom: 10,
                  letterSpacing: '0.02em',
                }}>
                  {step.title}
                </h3>

                <p style={{
                  fontSize: '0.92rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.65,
                  fontStyle: 'italic',
                  maxWidth: 260,
                  margin: '0 auto',
                }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
