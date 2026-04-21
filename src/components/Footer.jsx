import { useCursor } from '../context/CursorContext';

const quickLinks = ['Browse Catalog', 'Reading Room', 'My Shelf', 'New Arrivals', 'About ARCANA', 'Help & FAQs'];
const contactLines = [
  'Vivekananda Institute of Technology',
  'Central Library, Block C, Ground Floor',
  'library@vit.ac.in',
  '+91 79 2630 0000',
];

/* ── Multi-column dark footer with ornamental divider ── */
export default function Footer() {
  const { setCursorHint } = useCursor();
  const year = new Date().getFullYear();

  return (
    <footer id="footer" aria-label="Site footer">
      {/* Ornamental divider */}
      <div style={{ position: 'relative', height: 24, overflow: 'hidden' }}>
        <svg
          viewBox="0 0 1200 24"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block', opacity: 0.4 }}
          aria-hidden="true"
        >
          <path
            d="M0,12 L100,12 Q120,4 140,12 Q160,20 180,12 Q200,4 220,12 L380,12 Q400,2 420,12 Q440,22 460,12 Q480,2 500,12 L600,12 L700,12 Q720,2 740,12 Q760,22 780,12 Q800,2 820,12 L980,12 Q1000,20 1020,12 Q1040,4 1060,12 Q1080,20 1100,12 L1200,12"
            fill="none"
            stroke="#C8973F"
            strokeWidth="1"
          />
          {/* Center diamond ornament */}
          <polygon points="600,6 607,12 600,18 593,12" fill="#C8973F" opacity="0.8"/>
          <polygon points="540,10 545,12 540,14 535,12" fill="#C8973F" opacity="0.4"/>
          <polygon points="660,10 665,12 660,14 655,12" fill="#C8973F" opacity="0.4"/>
        </svg>
      </div>

      {/* Main footer body */}
      <div style={{
        background: 'rgba(10, 7, 4, 0.98)',
        borderTop: '1px solid rgba(200,151,63,0.1)',
        padding: 'clamp(40px, 6vw, 72px) clamp(20px, 5vw, 80px) 0',
      }}>
        <div style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'clamp(32px, 5vw, 60px)',
          marginBottom: 'clamp(32px, 5vw, 56px)',
        }}>
          {/* Col 1 — Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <BookSVG />
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.1rem',
                letterSpacing: '0.22em',
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
              }}>
                Arcana
              </span>
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              fontSize: '0.95rem',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              maxWidth: 260,
            }}>
              "Knowledge is the light that cannot be extinguished."
            </p>
            <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
              {['twitter', 'instagram', 'linkedin'].map(s => (
                <a
                  key={s}
                  href="#"
                  aria-label={`Follow on ${s}`}
                  onMouseEnter={() => setCursorHint('cta')}
                  onMouseLeave={() => setCursorHint('default')}
                  style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: 'rgba(200,151,63,0.08)',
                    border: '1px solid rgba(200,151,63,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--gold)',
                    fontSize: '0.75rem',
                    transition: 'background 0.2s, border-color 0.2s',
                  }}
                  onFocus={e => { e.currentTarget.style.background = 'rgba(200,151,63,0.2)'; }}
                  onBlur={e => { e.currentTarget.style.background = 'rgba(200,151,63,0.08)'; }}
                >
                  {s[0].toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: 20,
            }}>
              Quick Links
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {quickLinks.map(link => (
                <li key={link}>
                  <a
                    href="#"
                    onMouseEnter={() => setCursorHint('cta')}
                    onMouseLeave={() => setCursorHint('default')}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.92rem',
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      transition: 'color 0.15s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                    onFocus={e => { e.currentTarget.style.color = 'var(--gold)'; }}
                    onBlur={e => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                  >
                    <span style={{ color: 'rgba(200,151,63,0.4)', fontSize: '0.7rem' }}>›</span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: 20,
            }}>
              Contact
            </h3>
            <address style={{ fontStyle: 'normal', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {contactLines.map((line, i) => (
                <p key={i} style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.4,
                }}>
                  {line}
                </p>
              ))}
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(200,151,63,0.08)',
          padding: 'clamp(16px, 3vw, 24px) 0 clamp(20px, 4vw, 32px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          maxWidth: 1400,
          margin: '0 auto',
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            letterSpacing: '0.18em',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
          }}>
            © {year} ARCANA Digital Library. All rights reserved.
          </p>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            letterSpacing: '0.12em',
            color: 'rgba(138,123,101,0.5)',
            textTransform: 'uppercase',
          }}>
            Crafted with care · Powered by knowledge
          </p>
        </div>
      </div>
    </footer>
  );
}

function BookSVG() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 6 C12 4 6 4 4 6 L4 26 C6 24 12 24 16 26 Z" fill="#C8973F" fillOpacity="0.85"/>
      <path d="M16 6 C20 4 26 4 28 6 L28 26 C26 24 20 24 16 26 Z" fill="#F0C060" fillOpacity="0.85"/>
      <line x1="16" y1="6" x2="16" y2="26" stroke="#8A6020" strokeWidth="1"/>
    </svg>
  );
}
