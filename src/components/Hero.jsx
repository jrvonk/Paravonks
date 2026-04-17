import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

// Spring config per taste-skill spec
const SPRING = { stiffness: 100, damping: 20 }

// Stagger container
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

// Slide-up word reveal
const wordReveal = {
  hidden: { opacity: 0, y: 40, skewY: 2 },
  show:   { opacity: 1, y: 0, skewY: 0, transition: { type: 'spring', ...SPRING } },
}

// Tag fade-in
const tagAnim = {
  hidden: { opacity: 0, y: -10 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 18 } },
}

// Magnetic button hook
function MagneticBtn({ children, href, className, style }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, SPRING)
  const sy = useSpring(y, SPRING)

  function onMove(e) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set(dx * 0.25)
    y.set(dy * 0.25)
  }

  function onLeave() { x.set(0); y.set(0) }

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ ...style, x: sx, y: sy, display: 'inline-block' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.a>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '8rem 3rem 5rem',
        overflow: 'hidden',
        background: 'var(--cream)',
      }}
    >
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(181,97,74,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(181,97,74,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
      }} />

      {/* Radial glow — floats perpetually */}
      <motion.div
        style={{
          position: 'absolute',
          width: 680, height: 680,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,201,165,0.32) 0%, transparent 70%)',
          top: '50%', left: '50%',
          x: '-50%', y: '-50%',
          pointerEvents: 'none',
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ position: 'relative', textAlign: 'center', maxWidth: 880 }}
      >
        {/* Tag */}
        <motion.div variants={tagAnim} style={{
          display: 'inline-block',
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.66rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'var(--terracotta)',
          border: '1px solid rgba(181,97,74,0.35)',
          padding: '0.32rem 1rem',
          marginBottom: '2rem',
        }}>
          Digital Media Production &amp; Consulting
        </motion.div>

        {/* Kinetic headline — each line is its own reveal */}
        <h1 style={{
          fontSize: 'clamp(3.2rem, 9vw, 7.8rem)',
          fontWeight: 900,
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          marginBottom: '1.6rem',
          color: 'var(--dark-brown)',
          overflow: 'hidden',
        }}>
          {[
            <span key="a">Built <span style={{ color: 'var(--terracotta)' }}>From</span></span>,
            <span key="b">The Ground</span>,
            <span key="c"><span style={{ color: 'var(--adobe)' }}>Up.</span></span>,
          ].map((line, i) => (
            <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
              <motion.span
                display="block"
                style={{ display: 'block' }}
                variants={wordReveal}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Sub */}
        <motion.p
          variants={wordReveal}
          style={{
            fontSize: '1.05rem',
            color: 'var(--muted-brown)',
            maxWidth: 540,
            margin: '0 auto 2.8rem',
            lineHeight: 1.78,
            fontWeight: 300,
          }}
        >
          Derek and James Vonk bring cowboy-grade grit and deep-stack technical mastery
          to every project. No fluff. No middlemen. Just results.
        </motion.p>

        {/* Magnetic CTA buttons */}
        <motion.div variants={wordReveal} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <MagneticBtn href="#services" className="btn-primary">See What We Do</MagneticBtn>
          <MagneticBtn href="#contact" className="btn-ghost">Work With Us</MagneticBtn>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
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
          fontSize: '0.62rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
      >
        <motion.div
          style={{
            width: 1,
            height: 38,
            background: 'linear-gradient(to bottom, var(--terracotta), transparent)',
            originY: 0,
          }}
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        Scroll
      </motion.div>
    </section>
  )
}
