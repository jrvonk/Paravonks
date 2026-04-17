import { motion } from 'framer-motion'
import EditableText from './cms/EditableText'

const SPRING = { stiffness: 100, damping: 20 }
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { type: 'spring', ...SPRING } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.13 } } }

const steps = [
  { num: 'Step 01', title: 'Discovery',    descField: 'process.step1', descDefault: "We get deep on your goals, your audience, your constraints, and your gaps. We ask the hard questions upfront so nothing surfaces late." },
  { num: 'Step 02', title: 'Architecture', descField: 'process.step2', descDefault: 'We map the creative and technical plan. Every deliverable, every dependency, every decision point — documented before we shoot a frame.' },
  { num: 'Step 03', title: 'Production',   descField: 'process.step3', descDefault: 'We execute. Cameras roll, code ships, and systems fire. We communicate clean and move fast without cutting corners.' },
  { num: 'Step 04', title: 'Delivery',     descField: 'process.step4', descDefault: "Every deliverable is verified against spec before it leaves our hands. We don't call it done until it's actually done." },
]

export default function Process() {
  return (
    <section id="process" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <motion.div
        style={{ maxWidth: 1200, margin: '0 auto' }}
        initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}
      >
        <motion.div variants={fadeUp} className="section-label">How We Work</motion.div>
        <motion.h2 variants={fadeUp} className="section-title">
          <EditableText field="process.title">The Paravonk Process</EditableText>
        </motion.h2>
        <motion.p variants={fadeUp} className="section-body">
          <EditableText field="process.subtitle">
            Straightforward. No unnecessary meetings. No scope creep. We move with intention
            from first conversation to final delivery.
          </EditableText>
        </motion.p>

        <motion.div
          variants={stagger}
          style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', position: 'relative' }}
          className="process-steps"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }}
            style={{
              position: 'absolute', top: '0.85rem', left: '1.5rem', right: '1.5rem',
              height: 1,
              background: 'linear-gradient(90deg, var(--terracotta), rgba(196,112,78,0.1))',
              transformOrigin: 'left',
            }}
          />

          {steps.map(step => (
            <motion.div key={step.num} variants={fadeUp} style={{ padding: '0 1.8rem', position: 'relative' }}>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 180, damping: 16, delay: 0.2 }}
                style={{
                  width: 14, height: 14, borderRadius: '50%',
                  background: 'var(--terracotta)',
                  border: '2.5px solid var(--bg)',
                  marginBottom: '1.5rem', position: 'relative', zIndex: 1,
                }}
              />
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', color: 'var(--terracotta)', letterSpacing: '0.14em', marginBottom: '0.7rem', textTransform: 'uppercase' }}>
                {step.num}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.6rem', fontFamily: "'Playfair Display', serif", color: 'var(--dark-brown)' }}>
                {step.title}
              </div>
              <p style={{ fontSize: '0.83rem', color: 'var(--muted-brown)', lineHeight: 1.72 }}>
                <EditableText field={step.descField}>{step.descDefault}</EditableText>
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          .process-steps { grid-template-columns: 1fr 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  )
}
