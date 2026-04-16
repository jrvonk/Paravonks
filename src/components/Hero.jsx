export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '8rem 3rem 5rem',
        overflow: 'hidden',
        background: 'var(--cream)',
      }}
    >
      {/* Subtle grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(181,97,74,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(181,97,74,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
        pointerEvents: 'none',
      }} />

      {/* Radial glow */}
      <div style={{
        position: 'absolute',
        width: 640,
        height: 640,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,201,165,0.35) 0%, transparent 70%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', textAlign: 'center', maxWidth: 860 }}>
        <div style={{
          display: 'inline-block',
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.68rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'var(--terracotta)',
          border: '1px solid rgba(181,97,74,0.35)',
          padding: '0.32rem 1rem',
          marginBottom: '2rem',
        }}>
          Digital Media Production &amp; Consulting
        </div>

        <h1 style={{
          fontSize: 'clamp(3rem, 9vw, 7.5rem)',
          fontWeight: 900,
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          marginBottom: '1.5rem',
          color: 'var(--dark-brown)',
        }}>
          Built <span style={{ color: 'var(--terracotta)' }}>From</span>
          <br />The Ground
          <br /><span style={{ color: 'var(--adobe)' }}>Up.</span>
        </h1>

        <p style={{
          fontSize: '1.05rem',
          color: 'var(--muted-brown)',
          maxWidth: 540,
          margin: '0 auto 2.8rem',
          lineHeight: 1.75,
          fontWeight: 300,
        }}>
          Derek and James Vonk bring cowboy-grade grit and deep-stack technical mastery
          to every project. No fluff. No middlemen. Just results.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#services" className="btn-primary">See What We Do</a>
          <a href="#contact" className="btn-ghost">Work With Us</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '2.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        color: 'var(--muted-brown)',
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.65rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
      }}>
        <div style={{
          width: 1,
          height: 38,
          background: 'linear-gradient(to bottom, var(--terracotta), transparent)',
          animation: 'scrollPulse 2s ease-in-out infinite',
        }} />
        Scroll
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
