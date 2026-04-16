const stats = [
  { num: '12+', label: 'Years Combined Experience' },
  { num: '200+', label: 'Projects Delivered' },
  { num: '50+', label: 'Brands Consulted' },
  { num: '0', label: 'Excuses Made' },
]

const team = [
  {
    initials: 'DV',
    name: 'Derek Vonk',
    role: 'Creative Director & Production Lead',
    bio: "Derek drives the visual language. With an eye trained on everything from documentary-style storytelling to high-production brand films, he leads the creative vision and keeps every frame intentional. He's the one who sees the whole board before a single camera is picked up.",
    tags: ['Direction', 'Cinematography', 'Post-Production', 'Brand Strategy', 'Motion Design'],
  },
  {
    initials: 'JV',
    name: 'James Vonk',
    role: 'Tech Lead & Systems Architect',
    bio: 'James is where the deep tech lives. He architects the digital infrastructure that makes creative work scalable — pipelines, automation, AI integrations, and distribution systems built to last. He speaks both fluent creative and fluent code.',
    tags: ['Full-Stack Dev', 'AI/ML Integration', 'Pipeline Architecture', 'CMS & DAM', 'Automation'],
  },
]

function TeamCard({ person }) {
  return (
    <div style={{
      background: 'var(--warm-white)',
      border: '1px solid rgba(181,97,74,0.14)',
      padding: '2.2rem',
      position: 'relative',
      overflow: 'hidden',
      transition: 'border-color 0.3s',
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(181,97,74,0.38)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(181,97,74,0.14)'}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 2,
        background: 'linear-gradient(90deg, var(--terracotta), transparent)',
      }} />

      <div style={{
        width: 66,
        height: 66,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--adobe) 0%, var(--terracotta-dk) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Space Mono', monospace",
        fontSize: '1.25rem',
        fontWeight: 700,
        color: 'var(--warm-white)',
        marginBottom: '1.4rem',
        border: '2px solid rgba(181,97,74,0.25)',
      }}>
        {person.initials}
      </div>

      <div style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: "'Playfair Display', serif", marginBottom: '0.3rem' }}>
        {person.name}
      </div>
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.66rem',
        color: 'var(--terracotta)',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        marginBottom: '1.1rem',
      }}>
        {person.role}
      </div>
      <p style={{ color: 'var(--muted-brown)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '1.4rem' }}>
        {person.bio}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
        {person.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}
        className="about-grid">
        <div>
          <div className="section-label">Who We Are</div>
          <h2 className="section-title">Two Brothers.<br />One Standard.</h2>
          <div className="gold-divider" />
          <p className="section-body">
            Vonk Media is Derek and James Vonk — a brother duo who built their craft from scratch,
            mastering every layer of digital media production along the way. From raw footage to
            final render, from brand strategy to full-stack pipeline, we own the process end to end.
          </p>
          <p className="section-body" style={{ marginTop: '1rem' }}>
            We don't outsource. We don't hand off. We stay in the room until the work is right —
            because that's how we were raised to work.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.8rem', marginTop: '2.8rem' }}>
            {stats.map(s => (
              <div key={s.label} style={{ borderLeft: '2px solid var(--terracotta)', paddingLeft: '1.1rem' }}>
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--terracotta)',
                  lineHeight: 1,
                }}>
                  {s.num}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted-brown)', marginTop: '0.3rem', letterSpacing: '0.04em' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {team.map(p => <TeamCard key={p.name} person={p} />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  )
}
