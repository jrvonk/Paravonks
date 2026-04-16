const steps = [
  {
    num: 'Step 01',
    title: 'Discovery',
    desc: "We get deep on your goals, your audience, your constraints, and your gaps. We ask the hard questions upfront so nothing surfaces late.",
  },
  {
    num: 'Step 02',
    title: 'Architecture',
    desc: 'We map the creative and technical plan. Every deliverable, every dependency, every decision point — documented before we shoot a frame.',
  },
  {
    num: 'Step 03',
    title: 'Production',
    desc: 'We execute. Cameras roll, code ships, and systems fire. We communicate clean and move fast without cutting corners.',
  },
  {
    num: 'Step 04',
    title: 'Delivery',
    desc: "Every deliverable is verified against spec before it leaves our hands. We don't call it done until it's actually done.",
  },
]

export default function Process() {
  return (
    <section id="process" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="section-label">How We Work</div>
        <h2 className="section-title">The Vonk Process</h2>
        <p className="section-body">
          Straightforward. No unnecessary meetings. No scope creep. We move with intention
          from first conversation to final delivery.
        </p>

        <div style={{
          marginTop: '4rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
          position: 'relative',
        }} className="process-steps">
          {/* Connecting line */}
          <div style={{
            position: 'absolute',
            top: '0.85rem',
            left: '1.5rem',
            right: '1.5rem',
            height: 1,
            background: 'linear-gradient(90deg, var(--terracotta), rgba(181,97,74,0.1))',
          }} />

          {steps.map((step, i) => (
            <div key={step.num} style={{ padding: '0 1.8rem', position: 'relative' }}>
              <div style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: 'var(--terracotta)',
                border: '2.5px solid var(--bg2)',
                marginBottom: '1.5rem',
                position: 'relative',
                zIndex: 1,
              }} />
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.62rem',
                color: 'var(--terracotta)',
                letterSpacing: '0.14em',
                marginBottom: '0.7rem',
                textTransform: 'uppercase',
              }}>
                {step.num}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.6rem', fontFamily: "'Playfair Display', serif" }}>
                {step.title}
              </div>
              <p style={{ fontSize: '0.83rem', color: 'var(--muted-brown)', lineHeight: 1.72 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .process-steps {
            grid-template-columns: 1fr 1fr !important;
            gap: 2.5rem !important;
          }
          .process-steps > div:first-child {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
