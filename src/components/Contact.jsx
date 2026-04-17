import { motion } from 'framer-motion'

const SPRING = { stiffness: 100, damping: 20 }
const fadeUp = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { type: 'spring', ...SPRING } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

const contactItems = [
  {
    label: 'Based In',       value: 'Available Worldwide — We Travel For The Work',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  },
  {
    label: 'Email',           value: 'hello@vonkmedia.com',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  },
  {
    label: 'Phone',           value: 'Available on inquiry',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.02-.95a2 2 0 0 1 2.12-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17z"/></svg>,
  },
  {
    label: 'Response Time',   value: 'Within 24 hours. Usually faster.',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>,
  },
]

const serviceOptions = [
  'Video Production', 'Podcast & Audio', 'Live Streaming', 'Production Pipeline',
  'AI Media Integration', 'Brand & Strategy', 'Digital Platforms', 'Consulting',
  'Post-Production', 'Multiple / Not Sure',
]

const inputStyle = {
  background: 'var(--bg3)',
  border: '1px solid rgba(200,150,100,0.15)',
  color: 'var(--dark-brown)',
  padding: '0.82rem 1rem',
  fontFamily: "'Outfit', sans-serif",
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
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}
        className="contact-inner">

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} variants={stagger}>
          <motion.div variants={fadeUp} className="section-label">Let's Talk</motion.div>
          <motion.h2 variants={fadeUp} className="section-title">Ready When<br />You Are.</motion.h2>
          <motion.div variants={fadeUp} className="gold-divider" />
          <motion.p variants={fadeUp} className="section-body">
            Whether you've got a fully scoped project or just an idea on a napkin — reach out.
            We'll tell you honestly what we can do and what it'll take.
          </motion.p>

          <motion.div variants={stagger} style={{ marginTop: '2.8rem', display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            {contactItems.map(item => (
              <motion.div variants={fadeUp} key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '2.1rem', height: '2.1rem',
                  background: 'rgba(196,112,78,0.08)',
                  border: '1px solid rgba(196,112,78,0.22)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, color: 'var(--terracotta)',
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '0.2rem' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--muted-brown)' }}>{item.value}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.form
          style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}
          onSubmit={e => e.preventDefault()}
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger}
        >
          <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.1rem' }}>
            <FormInput label="First Name">
              <input type="text" placeholder="John" style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(196,112,78,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(200,150,100,0.15)'} />
            </FormInput>
            <FormInput label="Last Name">
              <input type="text" placeholder="Smith" style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(196,112,78,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(200,150,100,0.15)'} />
            </FormInput>
          </motion.div>
          <motion.div variants={fadeUp}><FormInput label="Email">
            <input type="email" placeholder="you@company.com" style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'rgba(196,112,78,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(200,150,100,0.15)'} />
          </FormInput></motion.div>
          <motion.div variants={fadeUp}><FormInput label="Organization">
            <input type="text" placeholder="Your company or project" style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'rgba(196,112,78,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(200,150,100,0.15)'} />
          </FormInput></motion.div>
          <motion.div variants={fadeUp}><FormInput label="Service Interest">
            <select style={{ ...inputStyle, appearance: 'none' }}
              onFocus={e => e.target.style.borderColor = 'rgba(196,112,78,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(200,150,100,0.15)'}>
              <option value="">Select a service...</option>
              {serviceOptions.map(o => <option key={o}>{o}</option>)}
            </select>
          </FormInput></motion.div>
          <motion.div variants={fadeUp}><FormInput label="Tell Us About Your Project">
            <textarea rows={5} placeholder="What are you building, what's the timeline, what's the challenge?"
              style={{ ...inputStyle, resize: 'vertical' }}
              onFocus={e => e.target.style.borderColor = 'rgba(196,112,78,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(200,150,100,0.15)'} />
          </FormInput></motion.div>
          <motion.div variants={fadeUp}>
            <motion.button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', textAlign: 'center', border: 'none', fontSize: '0.8rem', cursor: 'pointer' }}
              whileHover={{ scale: 1.02, transition: { type: 'spring', ...SPRING } }}
              whileTap={{ scale: 0.97 }}
            >
              Send It →
            </motion.button>
          </motion.div>
        </motion.form>
      </div>

      <style>{`
        @media (max-width: 900px) { .contact-inner { grid-template-columns: 1fr !important; gap: 3rem !important; } }
        select option { background: #1A1614; }
      `}</style>
    </section>
  )
}
