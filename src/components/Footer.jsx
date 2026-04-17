import EditableText from './cms/EditableText'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg)',
      borderTop: '1px solid rgba(196,112,78,0.14)',
      padding: '2.2rem 3rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }} className="footer">
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.85rem',
        fontWeight: 700,
        color: 'var(--terracotta)',
        letterSpacing: '0.18em',
      }}>
        <EditableText field="footer.logo">PARAVONK</EditableText>
      </div>

      <div style={{
        fontSize: '0.75rem',
        color: 'var(--muted-brown)',
        opacity: 0.55,
        fontFamily: "'Space Mono', monospace",
        letterSpacing: '0.06em',
      }}>
        <EditableText field="footer.copyright">© 2025 Paravonk — Derek &amp; James Vonk. All rights reserved.</EditableText>
      </div>

      <div style={{ display: 'flex', gap: '2rem' }}>
        {[['#about', 'About'], ['#services', 'Services'], ['#contact', 'Contact']].map(([href, label]) => (
          <a
            key={label}
            href={href}
            style={{ fontSize: '0.72rem', color: 'var(--muted-brown)', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--terracotta)'}
            onMouseLeave={e => e.target.style.color = 'var(--muted-brown)'}
          >
            {label}
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer { flex-direction: column !important; gap: 1.2rem !important; text-align: center !important; padding: 2rem 1.5rem !important; }
        }
      `}</style>
    </footer>
  )
}
