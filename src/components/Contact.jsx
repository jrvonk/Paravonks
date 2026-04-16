const contactItems = [
  { icon: '📍', label: 'Based In', value: 'Available Worldwide — We Travel For The Work' },
  { icon: '✉️', label: 'Email', value: 'hello@vonkmedia.com' },
  { icon: '📞', label: 'Phone', value: 'Available on inquiry' },
  { icon: '⏱️', label: 'Response Time', value: 'Within 24 hours. Usually faster.' },
]

// Monochromatic inline SVGs for contact icons
const contactIcons = {
  '📍': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  '✉️': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  '📞': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.02-.95a2 2 0 0 1 2.12-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17z" />
    </svg>
  ),
  '⏱️': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
    </svg>
  ),
}

const serviceOptions = [
  'Video Production', 'Podcast & Audio', 'Live Streaming', 'Production Pipeline',
  'AI Media Integration', 'Brand & Strategy', 'Digital Platforms', 'Consulting',
  'Post-Production', 'Multiple / Not Sure',
]

const inputStyle = {
  background: 'var(--warm-white)',
  border: '1px solid rgba(107,79,42,0.18)',
  color: 'var(--dark-brown)',
  padding: '0.82rem 1rem',
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color 0.2s',
  width: '100%',
}

function FormInput({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
      <label style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted-brown)' }}>
        {label}
      </label>
      {children}
    </div>
  )
}

export default function Contact() {
  return (
    <section id="contact" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '5rem',
        alignItems: 'start',
      }} className="contact-inner">
        <div>
          <div className="section-label">Let's Talk</div>
          <h2 className="section-title">Ready When<br />You Are.</h2>
          <div className="gold-divider" />
          <p className="section-body">
            Whether you've got a fully scoped project or just an idea on a napkin — reach out.
            We'll tell you honestly what we can do and what it'll take.
          </p>

          <div style={{ marginTop: '2.8rem', display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            {contactItems.map(item => (
              <div key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '2.1rem',
                  height: '2.1rem',
                  background: 'rgba(181,97,74,0.08)',
                  border: '1px solid rgba(181,97,74,0.22)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: 'var(--terracotta)',
                }}>
                  {contactIcons[item.icon]}
                </div>
                <div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '0.2rem' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--muted-brown)' }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }} onSubmit={e => e.preventDefault()}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.1rem' }}>
            <FormInput label="First Name">
              <input type="text" placeholder="John" style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(181,97,74,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(107,79,42,0.18)'} />
            </FormInput>
            <FormInput label="Last Name">
              <input type="text" placeholder="Smith" style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(181,97,74,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(107,79,42,0.18)'} />
            </FormInput>
          </div>
          <FormInput label="Email">
            <input type="email" placeholder="you@company.com" style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'rgba(181,97,74,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(107,79,42,0.18)'} />
          </FormInput>
          <FormInput label="Organization">
            <input type="text" placeholder="Your company or project" style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'rgba(181,97,74,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(107,79,42,0.18)'} />
          </FormInput>
          <FormInput label="Service Interest">
            <select style={{ ...inputStyle, appearance: 'none' }}
              onFocus={e => e.target.style.borderColor = 'rgba(181,97,74,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(107,79,42,0.18)'}>
              <option value="">Select a service...</option>
              {serviceOptions.map(o => <option key={o}>{o}</option>)}
            </select>
          </FormInput>
          <FormInput label="Tell Us About Your Project">
            <textarea rows={5} placeholder="What are you building, what's the timeline, what's the challenge?"
              style={{ ...inputStyle, resize: 'vertical' }}
              onFocus={e => e.target.style.borderColor = 'rgba(181,97,74,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(107,79,42,0.18)'} />
          </FormInput>
          <button type="submit" className="btn-primary" style={{ width: '100%', textAlign: 'center', border: 'none', fontSize: '0.8rem', cursor: 'pointer' }}>
            Send It →
          </button>
        </form>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-inner { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  )
}
