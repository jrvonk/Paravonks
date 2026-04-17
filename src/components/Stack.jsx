import { motion } from 'framer-motion'

const SPRING = { stiffness: 100, damping: 20 }
const fadeUp = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { type: 'spring', ...SPRING } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }

const categories = [
  { title: 'Production',               items: ['DaVinci Resolve / Studio', 'Adobe Creative Suite', 'Final Cut Pro', 'Pro Tools / Logic Pro', 'After Effects / Nuke', 'RED / ARRI / Sony FX'] },
  { title: 'Streaming & Distribution', items: ['OBS / vMix / Wirecast', 'Wowza / Mux.io', 'Frame.io / Vimeo', 'YouTube API / Twitch', 'CDN Architecture', 'RTMP / SRT / WebRTC'] },
  { title: 'Development',              items: ['React / Next.js / TypeScript', 'Node.js / Python / Rust', 'AWS / GCP / Cloudflare', 'Docker / Kubernetes', 'PostgreSQL / Redis', 'GraphQL / REST / gRPC'] },
  { title: 'AI & Automation',          items: ['OpenAI / Anthropic APIs', 'Whisper / ElevenLabs', 'Runway / Sora / ComfyUI', 'n8n / Zapier / Make', 'Langchain / RAG Systems', 'Custom Model Fine-tuning'] },
]

function Dot() {
  return <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--terracotta)', display: 'inline-block', flexShrink: 0, marginTop: 2 }} />
}

export default function Stack() {
  return (
    <section id="tech" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '5rem', alignItems: 'start' }}
        className="stack-inner">

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
          <motion.div variants={fadeUp} className="section-label">Under The Hood</motion.div>
          <motion.h2 variants={fadeUp} className="section-title">Deep Tech,<br />Real Tools</motion.h2>
          <motion.div variants={fadeUp} className="gold-divider" />
          <motion.p variants={fadeUp} className="section-body">
            We don't just know the tools — we know why they work, when they break,
            and how to push them past what most people think is possible.
          </motion.p>
          <motion.p variants={fadeUp} style={{ marginTop: '1rem', fontStyle: 'italic', fontSize: '0.86rem', color: 'var(--muted-brown)', lineHeight: 1.7 }}>
            "Cowboy style means you learn to fix the fence with whatever's in the truck." — James Vonk
          </motion.p>
        </motion.div>

        <motion.div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', marginTop: '0.5rem' }}
          className="stack-categories"
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}
        >
          {categories.map(cat => (
            <motion.div key={cat.title} variants={fadeUp}>
              <h4 style={{
                fontFamily: "'Space Mono', monospace", fontSize: '0.63rem', letterSpacing: '0.22em',
                color: 'var(--terracotta)', textTransform: 'uppercase',
                marginBottom: '1rem', paddingBottom: '0.5rem',
                borderBottom: '1px solid rgba(196,112,78,0.2)',
              }}>
                {cat.title}
              </h4>
              {cat.items.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.84rem', color: 'var(--muted-brown)', marginBottom: '0.5rem' }}>
                  <Dot />{item}
                </div>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .stack-inner { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .stack-categories { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
