import { motion } from 'framer-motion'

const SPRING = { stiffness: 100, damping: 20 }
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', ...SPRING } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

const stats = [
  { num: '12+',  label: 'Years Combined Experience' },
  { num: '200+', label: 'Projects Delivered' },
  { num: '50+',  label: 'Brands Consulted' },
  { num: '0',    label: 'Excuses Made' },
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
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -5, transition: { type: 'spring', ...SPRING } }}
      style={{
        background: 'var(--bg3)',
        border: '1px solid rgba(196,112,78,0.14)',
        padding: '2.2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, var(--terracotta), transparent)',
      }} />

      <div style={{
        width: 66, height: 66, borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--adobe) 0%, var(--terracotta-dk) 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Space Mono', monospace", fontSize: '1.2rem', fontWeight: 700,
        color: '#000', marginBottom: '1.4rem',
        border: '2px solid rgba(196,112,78,0.3)',
      }}>
        {person.initials}
      </div>

      <div style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: "'Playfair Display', serif", marginBottom: '0.28rem', color: 'var(--dark-brown)' }}>
        {person.name}
      </div>
      <div style={{
        fontFamily: "'Space Mono', monospace", fontSize: '0.64rem',
        color: 'var(--terracotta)', letterSpacing: '0.14em',
        textTransform: 'uppercase', marginBottom: '1rem',
      }}>
        {person.role}
      </div>
      <p style={{ color: 'var(--muted-brown)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '1.3rem' }}>
        {person.bio}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.42rem' }}>
        {person.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}
        className="about-grid">

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="section-label">Who We Are</motion.div>
          <motion.h2 variants={fadeUp} className="section-title">Two Brothers.<br />One Standard.</motion.h2>
          <motion.div variants={fadeUp} className="gold-divider" />
          <motion.p variants={fadeUp} className="section-body">
            Vonk Media is Derek and James Vonk — a brother duo who built their craft from scratch,
            mastering every layer of digital media production along the way. From raw footage to
            final render, from brand strategy to full-stack pipeline, we own the process end to end.
          </motion.p>
          <motion.p variants={fadeUp} className="section-body" style={{ marginTop: '1rem' }}>
            We don't outsource. We don't hand off. We stay in the room until the work is right —
            because that's how we were raised to work.
          </motion.p>

          <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.8rem', marginTop: '2.8rem' }}>
            {stats.map(s => (
              <motion.div key={s.label} variants={fadeUp} style={{ borderLeft: '2px solid var(--terracotta)', paddingLeft: '1.1rem' }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '2rem', fontWeight: 700, color: 'var(--terracotta)', lineHeight: 1 }}>
                  {s.num}
                </div>
                <div style={{ fontSize: '0.79rem', color: 'var(--muted-brown)', marginTop: '0.3rem', letterSpacing: '0.04em' }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {team.map(p => <TeamCard key={p.name} person={p} />)}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  )
}
