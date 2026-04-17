import { motion } from 'framer-motion'

const SPRING = { stiffness: 100, damping: 20 }
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', ...SPRING } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }

const icons = {
  video: <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="17" height="16" rx="1.5"/><polyline points="19,10 26,7 26,21 19,18"/><line x1="7" y1="11" x2="7" y2="17"/><line x1="10" y1="9" x2="10" y2="19"/></svg>,
  podcast: <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="10" y="2" width="8" height="14" rx="4"/><path d="M5 14a9 9 0 0 0 18 0"/><line x1="14" y1="23" x2="14" y2="26"/><line x1="9" y1="26" x2="19" y2="26"/></svg>,
  live: <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="14" cy="14" r="4"/><path d="M6 6a11.3 11.3 0 0 0 0 16"/><path d="M22 6a11.3 11.3 0 0 1 0 16"/><path d="M9 9a7 7 0 0 0 0 10"/><path d="M19 9a7 7 0 0 1 0 10"/></svg>,
  pipeline: <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="10" width="6" height="8" rx="1"/><rect x="11" y="6" width="6" height="8" rx="1"/><rect x="20" y="10" width="6" height="8" rx="1"/><line x1="8" y1="14" x2="11" y2="10"/><line x1="17" y1="10" x2="20" y2="14"/></svg>,
  ai: <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="14" cy="14" r="4"/><line x1="14" y1="2" x2="14" y2="8"/><line x1="14" y1="20" x2="14" y2="26"/><line x1="2" y1="14" x2="8" y2="14"/><line x1="20" y1="14" x2="26" y2="14"/><line x1="5.5" y1="5.5" x2="9.8" y2="9.8"/><line x1="18.2" y1="18.2" x2="22.5" y2="22.5"/><line x1="22.5" y1="5.5" x2="18.2" y2="9.8"/><line x1="9.8" y1="18.2" x2="5.5" y2="22.5"/></svg>,
  brand: <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="14" cy="10" r="4"/><path d="M4 26c0-5.5 4.5-10 10-10s10 4.5 10 10"/><line x1="14" y1="14" x2="14" y2="26"/><line x1="8" y1="20" x2="20" y2="20"/></svg>,
  platforms: <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="22" height="16" rx="1.5"/><line x1="9" y1="24" x2="19" y2="24"/><line x1="14" y1="20" x2="14" y2="24"/><line x1="8" y1="10" x2="20" y2="10"/><line x1="8" y1="14" x2="15" y2="14"/></svg>,
  consulting: <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12"/><line x1="2" y1="20" x2="26" y2="20"/><line x1="10" y1="12" x2="18" y2="12"/><line x1="10" y1="16" x2="14" y2="16"/></svg>,
  post: <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="24" height="16" rx="1.5"/><polyline points="8,12 12,16 16,11 20,15"/><circle cx="6.5" cy="9.5" r="1" fill="currentColor" stroke="none"/></svg>,
}

const services = [
  { num: '01', icon: 'video',      title: 'Video Production',    desc: 'Commercial films, documentary, brand storytelling, event coverage, and episodic content. Full crew or lean-team — we scale to fit the job.' },
  { num: '02', icon: 'podcast',    title: 'Podcast & Audio',      desc: 'Studio-quality podcast production, audio post, music supervision, and branded sound design. We build shows that people actually come back to.' },
  { num: '03', icon: 'live',       title: 'Live Streaming',       desc: 'Multi-camera live production, broadcast-grade encoding, platform distribution, and real-time graphics. Zero downtime. Every time.' },
  { num: '04', icon: 'pipeline',   title: 'Production Pipeline',  desc: 'Architecting end-to-end media workflows — ingest, edit, review, approval, and delivery — built to eliminate bottlenecks and move fast.' },
  { num: '05', icon: 'ai',         title: 'AI Media Integration', desc: 'Implementing AI tools into real production workflows — generative assets, automated transcription, smart delivery, and content intelligence.' },
  { num: '06', icon: 'brand',      title: 'Brand & Strategy',     desc: "Positioning, visual identity, content strategy, and messaging frameworks. We help brands figure out what they're saying before they say it." },
  { num: '07', icon: 'platforms',  title: 'Digital Platforms',    desc: 'Custom web, content portals, creator platforms, and distribution infrastructure. Built from scratch, built to scale.' },
  { num: '08', icon: 'consulting', title: 'Consulting',            desc: 'Fractional creative direction, technical audits, workflow consulting, and media strategy for organizations ready to level up their production operation.' },
  { num: '09', icon: 'post',       title: 'Post-Production',      desc: 'Color grading, motion graphics, VFX, sound mixing, and final delivery. We handle your post from rough cut to broadcast-ready master.' },
]

function ServiceCard({ service }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, transition: { type: 'spring', ...SPRING } }}
      style={{
        background: 'var(--bg3)',
        padding: '2.2rem',
        cursor: 'default',
        borderBottom: '1px solid var(--border)',
        borderRight: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.22s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg4)'}
      onMouseLeave={e => e.currentTarget.style.background = 'var(--bg3)'}
    >
      <motion.div style={{
        position: 'absolute', bottom: 0, right: 0,
        width: 40, height: 40,
        background: 'linear-gradient(135deg, transparent 50%, rgba(196,112,78,0.07) 50%)',
      }} />
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: 'rgba(196,112,78,0.4)', letterSpacing: '0.14em', marginBottom: '1.1rem' }}>
        {service.num}
      </div>
      <div style={{ color: 'var(--mid-brown)', marginBottom: '0.95rem' }}>
        {icons[service.icon]}
      </div>
      <div style={{ fontSize: '0.98rem', fontWeight: 600, marginBottom: '0.7rem', letterSpacing: '-0.01em', color: 'var(--dark-brown)' }}>
        {service.title}
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--muted-brown)', lineHeight: 1.72 }}>
        {service.desc}
      </p>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" style={{ background: 'var(--bg)', padding: '7rem 3rem' }}>
      <motion.div
        style={{ maxWidth: 1200, margin: '0 auto 3.5rem' }}
        initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger}
      >
        <motion.div variants={fadeUp} className="section-label">What We Do</motion.div>
        <motion.h2 variants={fadeUp} className="section-title">Full-Spectrum<br />Production &amp; Consulting</motion.h2>
        <motion.p variants={fadeUp} className="section-body">
          We cover the full spectrum — from creative concepting to technical delivery.
          Whether you need a single service or a complete production partner, we plug in at any layer.
        </motion.p>
      </motion.div>

      <motion.div
        style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: '1px solid var(--border)' }}
        className="services-grid"
        initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger}
      >
        {services.map(s => <ServiceCard key={s.num} service={s} />)}
      </motion.div>

      <style>{`
        @media (max-width: 900px) { .services-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 901px) and (max-width: 1100px) { .services-grid { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </section>
  )
}
