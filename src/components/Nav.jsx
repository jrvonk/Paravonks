export default function Nav() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.1rem 3rem',
      background: 'rgba(0, 0, 0, 0.82)',
      backdropFilter: 'blur(18px)',
      borderBottom: '1px solid rgba(196, 112, 78, 0.18)',
    }}>
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '1rem',
        fontWeight: 700,
        letterSpacing: '0.18em',
        color: 'var(--terracotta)',
        textTransform: 'uppercase',
      }}>
        VONK<span style={{ color: 'var(--mid-brown)' }}> MEDIA</span>
      </div>

      <div style={{ display: 'flex', gap: '2.5rem' }} className="nav-links">
        {['About', 'Services', 'Process', 'Tech', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{
              color: 'var(--muted-brown)',
              textDecoration: 'none',
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--terracotta)'}
            onMouseLeave={e => e.target.style.color = 'var(--muted-brown)'}
          >
            {item}
          </a>
        ))}
      </div>

      <a
        href="#contact"
        style={{
          background: 'transparent',
          border: '1px solid var(--terracotta)',
          color: 'var(--terracotta)',
          padding: '0.45rem 1.3rem',
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          textDecoration: 'none',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.target.style.background = 'var(--terracotta)'; e.target.style.color = '#000' }}
        onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--terracotta)' }}
      >
        Get Started
      </a>

      <style>{`
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          nav { padding: 1rem 1.5rem !important; }
        }
      `}</style>
    </nav>
  )
}
