import { useCursor } from '../context/CursorContext';

/* ── Shared section header with animated gold rule ── */
export default function SectionHeader({ title, subtitle }) {
  return (
    <header className="section-header" style={{ marginBottom: 'clamp(32px, 5vw, 60px)' }}>
      <h2 className="section-title">{title}</h2>
      {subtitle && (
        <p className="section-subtitle">{subtitle}</p>
      )}
      <div
        className="section-rule"
        style={{
          height: 1,
          background: 'linear-gradient(90deg, #C8973F, #F0C060, transparent)',
          width: '100%',
          maxWidth: 340,
          opacity: 0.7,
        }}
      />
    </header>
  );
}
