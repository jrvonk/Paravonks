import { useState, useRef, useEffect, useCallback } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useContent } from '../../contexts/ContentContext'

/* ─── field definitions per tab ─────────────────────────────────────────── */
const TABS = [
  {
    id: 'hero',
    label: 'Hero',
    fields: [
      { key: 'hero.eyebrow',   name: 'Eyebrow tag',   style: { fontFamily: "'Space Mono',monospace", fontSize: '0.72rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--terracotta)' } },
      { key: 'hero.headline1', name: 'Headline — line 1', style: { fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 900, lineHeight: 1, color: 'var(--dark-brown)' } },
      { key: 'hero.headline2', name: 'Headline — line 2', style: { fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 900, lineHeight: 1, color: 'var(--dark-brown)' } },
      { key: 'hero.headline3', name: 'Headline — line 3', style: { fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 900, lineHeight: 1, color: 'var(--adobe)' } },
      { key: 'hero.sub',       name: 'Subtitle',       style: { fontFamily: "'Outfit',sans-serif", fontSize: '1rem', color: 'var(--muted-brown)', lineHeight: 1.78, fontWeight: 300 }, multiline: true },
    ],
    defaults: {
      'hero.eyebrow':   'Digital Media Production & Consulting',
      'hero.headline1': 'Built From',
      'hero.headline2': 'The Ground',
      'hero.headline3': 'Up.',
      'hero.sub':       'Derek and James Vonk bring cowboy-grade grit and deep-stack technical mastery to every project. No fluff. No middlemen. Just results.',
    },
  },
  {
    id: 'about',
    label: 'About',
    fields: [
      { key: 'about.body1',      name: 'Body — paragraph 1', style: { fontFamily: "'Outfit',sans-serif", fontSize: '1rem', color: 'var(--muted-brown)', lineHeight: 1.8 }, multiline: true },
      { key: 'about.body2',      name: 'Body — paragraph 2', style: { fontFamily: "'Outfit',sans-serif", fontSize: '1rem', color: 'var(--muted-brown)', lineHeight: 1.8 }, multiline: true },
      { key: 'about.derek.bio',  name: 'Derek — bio',        style: { fontFamily: "'Outfit',sans-serif", fontSize: '0.88rem', color: 'var(--muted-brown)', lineHeight: 1.75 }, multiline: true },
      { key: 'about.james.bio',  name: 'James — bio',        style: { fontFamily: "'Outfit',sans-serif", fontSize: '0.88rem', color: 'var(--muted-brown)', lineHeight: 1.75 }, multiline: true },
    ],
    defaults: {
      'about.body1':     'Paravonk is Derek and James Vonk — a brother duo who built their skills in the field, not the classroom.',
      'about.body2':     'We combine hands-on production craft with deep technical systems knowledge to deliver work that actually ships.',
      'about.derek.bio': 'Derek leads creative direction and on-set production. From RED cameras to broadcast trucks, he\'s operated in environments most crews never see.',
      'about.james.bio': 'James architects the technical side — live streaming pipelines, AI integrations, custom platforms, and anything that needs to scale.',
    },
  },
  {
    id: 'process',
    label: 'Process',
    fields: [
      { key: 'process.title',    name: 'Section title',  style: { fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 700, color: 'var(--dark-brown)' } },
      { key: 'process.subtitle', name: 'Subtitle',       style: { fontFamily: "'Outfit',sans-serif", fontSize: '1rem', color: 'var(--muted-brown)', lineHeight: 1.8 }, multiline: true },
      { key: 'process.step1',    name: 'Step 1 — Discovery',    style: { fontFamily: "'Outfit',sans-serif", fontSize: '0.9rem', color: 'var(--muted-brown)', lineHeight: 1.7 }, multiline: true },
      { key: 'process.step2',    name: 'Step 2 — Architecture', style: { fontFamily: "'Outfit',sans-serif", fontSize: '0.9rem', color: 'var(--muted-brown)', lineHeight: 1.7 }, multiline: true },
      { key: 'process.step3',    name: 'Step 3 — Production',   style: { fontFamily: "'Outfit',sans-serif", fontSize: '0.9rem', color: 'var(--muted-brown)', lineHeight: 1.7 }, multiline: true },
      { key: 'process.step4',    name: 'Step 4 — Delivery',     style: { fontFamily: "'Outfit',sans-serif", fontSize: '0.9rem', color: 'var(--muted-brown)', lineHeight: 1.7 }, multiline: true },
    ],
    defaults: {
      'process.title':    'The Paravonk Process',
      'process.subtitle': 'We run a tight ship. Every engagement follows the same proven framework — no surprises, no scope creep.',
      'process.step1':    'Deep-dive into your goals, audience, and constraints. We ask the hard questions up front so nothing breaks in production.',
      'process.step2':    'Design the system before touching a camera or keyboard. Pipelines, workflows, and deliverables locked before work begins.',
      'process.step3':    'Execute with precision. Daily check-ins, real-time updates, no mystery about where the project stands.',
      'process.step4':    'Ship it, document it, hand it off clean. You own everything — no lock-in, no recurring fees for basic access.',
    },
  },
  {
    id: 'contact',
    label: 'Contact',
    fields: [
      { key: 'contact.heading',  name: 'Section heading', style: { fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 700, color: 'var(--dark-brown)' } },
      { key: 'contact.body',     name: 'Body paragraph',  style: { fontFamily: "'Outfit',sans-serif", fontSize: '1rem', color: 'var(--muted-brown)', lineHeight: 1.8 }, multiline: true },
      { key: 'contact.location', name: 'Location',        style: { fontFamily: "'Outfit',sans-serif", fontSize: '0.9rem', color: 'var(--muted-brown)' } },
      { key: 'contact.email',    name: 'Email address',   style: { fontFamily: "'Outfit',sans-serif", fontSize: '0.9rem', color: 'var(--muted-brown)' } },
      { key: 'contact.phone',    name: 'Phone',           style: { fontFamily: "'Outfit',sans-serif", fontSize: '0.9rem', color: 'var(--muted-brown)' } },
      { key: 'contact.response', name: 'Response time',   style: { fontFamily: "'Outfit',sans-serif", fontSize: '0.9rem', color: 'var(--muted-brown)' } },
    ],
    defaults: {
      'contact.heading':  'Ready to build something?',
      'contact.body':     'Whether you need a single deliverable or a full production partner, we want to hear about it.',
      'contact.location': 'Available Worldwide — We Travel For The Work',
      'contact.email':    'hello@paravonk.com',
      'contact.phone':    'Available on inquiry',
      'contact.response': 'Within 24 hours. Usually faster.',
    },
  },
  {
    id: 'footer',
    label: 'Footer',
    fields: [
      { key: 'footer.logo',      name: 'Logo text',      style: { fontFamily: "'Space Mono',monospace", fontSize: '0.9rem', fontWeight: 700, color: 'var(--terracotta)', letterSpacing: '0.18em', textTransform: 'uppercase' } },
      { key: 'footer.copyright', name: 'Copyright line', style: { fontFamily: "'Space Mono',monospace", fontSize: '0.75rem', color: 'var(--muted-brown)' } },
    ],
    defaults: {
      'footer.logo':      'PARAVONK',
      'footer.copyright': '© 2025 Paravonk — Derek & James Vonk. All rights reserved.',
    },
  },
]

/* ─── single editable field ──────────────────────────────────────────────── */
function EditField({ fieldKey, name, fieldStyle, multiline, value, onChange, onSave, saveState }) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current && ref.current.innerText !== value) {
      ref.current.innerText = value
    }
  }, [value])

  function handleInput() {
    onChange(fieldKey, ref.current.innerText)
  }

  function handleBlur() {
    onSave(fieldKey, ref.current.innerText)
  }

  function handleKeyDown(e) {
    if (!multiline && e.key === 'Enter') { e.preventDefault(); ref.current.blur() }
  }

  const state = saveState[fieldKey]

  return (
    <div style={{ marginBottom: '1.6rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#5A4838' }}>
          {name}
        </span>
        {state === 'saving' && <span style={{ fontSize: '0.58rem', color: '#9A8070', fontFamily: "'Space Mono',monospace" }}>saving…</span>}
        {state === 'saved'  && <span style={{ fontSize: '0.58rem', color: '#7A9B8A', fontFamily: "'Space Mono',monospace" }}>saved</span>}
        {state === 'error'  && <span style={{ fontSize: '0.58rem', color: '#ff6b6b', fontFamily: "'Space Mono',monospace" }}>error</span>}
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        style={{
          ...fieldStyle,
          display: 'block',
          minHeight: multiline ? '4rem' : 'auto',
          padding: '0.55rem 0.75rem',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(196,112,78,0.18)',
          borderRadius: 2,
          outline: 'none',
          whiteSpace: multiline ? 'pre-wrap' : 'nowrap',
          overflowX: multiline ? 'unset' : 'hidden',
          cursor: 'text',
          transition: 'border-color 0.15s',
        }}
        onFocus={e => e.currentTarget.style.borderColor = 'rgba(196,112,78,0.55)'}
        onBlurCapture={e => e.currentTarget.style.borderColor = 'rgba(196,112,78,0.18)'}
      />
    </div>
  )
}

/* ─── tab panel ──────────────────────────────────────────────────────────── */
function TabPanel({ tab, content, updateContent }) {
  const [drafts, setDrafts]      = useState({})
  const [saveState, setSaveState] = useState({})
  const timers = useRef({})

  function getValue(key) {
    return drafts[key] ?? content[key] ?? tab.defaults[key] ?? ''
  }

  const handleChange = useCallback((key, val) => {
    setDrafts(d => ({ ...d, [key]: val }))
  }, [])

  const handleSave = useCallback(async (key, val) => {
    clearTimeout(timers.current[key])
    setSaveState(s => ({ ...s, [key]: 'saving' }))
    try {
      await updateContent(key, val)
      setSaveState(s => ({ ...s, [key]: 'saved' }))
      timers.current[key] = setTimeout(() => setSaveState(s => ({ ...s, [key]: null })), 2000)
    } catch {
      setSaveState(s => ({ ...s, [key]: 'error' }))
    }
  }, [updateContent])

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '2.5rem 2rem' }}>
      {tab.fields.map(f => (
        <EditField
          key={f.key}
          fieldKey={f.key}
          name={f.name}
          fieldStyle={f.style}
          multiline={f.multiline}
          value={getValue(f.key)}
          onChange={handleChange}
          onSave={handleSave}
          saveState={saveState}
        />
      ))}
    </div>
  )
}

/* ─── sign-in screen ─────────────────────────────────────────────────────── */
function SignInScreen({ signIn, authError, loading }) {
  return (
    <div style={{ minHeight: '100dvh', background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.7rem', letterSpacing: '0.32em', color: '#C4704E', textTransform: 'uppercase', marginBottom: '2.8rem' }}>
        PARAVONK CMS
      </div>
      <button
        onClick={signIn}
        disabled={loading}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.8rem',
          background: '#1A1614',
          border: '1px solid rgba(196,112,78,0.38)',
          color: '#EAE0D0',
          padding: '1rem 2.2rem',
          fontFamily: "'Space Mono',monospace",
          fontSize: '0.72rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          cursor: loading ? 'wait' : 'pointer',
          opacity: loading ? 0.6 : 1,
          transition: 'border-color 0.2s',
        }}
        onMouseEnter={e => !loading && (e.currentTarget.style.borderColor = 'rgba(196,112,78,0.75)')}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(196,112,78,0.38)'}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        {loading ? 'Redirecting…' : 'Sign in with Google'}
      </button>
      {authError && (
        <div style={{ marginTop: '1.2rem', fontSize: '0.68rem', color: '#ff6b6b', fontFamily: "'Space Mono',monospace", letterSpacing: '0.06em', textAlign: 'center', maxWidth: 340 }}>
          {authError}
          {authError.includes('unauthorized-domain') && (
            <div style={{ marginTop: '0.4rem', color: '#9A8070', lineHeight: 1.6 }}>
              Add this domain in Firebase Console →<br />Authentication → Settings → Authorized domains
            </div>
          )}
        </div>
      )}
      <div style={{ marginTop: '1.8rem', fontSize: '0.58rem', color: '#3A2A18', fontFamily: "'Space Mono',monospace", letterSpacing: '0.12em' }}>
        Restricted access
      </div>
    </div>
  )
}

/* ─── main admin ─────────────────────────────────────────────────────────── */
export default function CMSAdmin() {
  const { user, signIn, signOut, authError, isAuthorized, loading } = useAuth()
  const { content, updateContent } = useContent()
  const [activeTab, setActiveTab] = useState('hero')

  if (loading) {
    return (
      <div style={{ minHeight: '100dvh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5A4838', fontFamily: "'Space Mono',monospace", fontSize: '0.7rem', letterSpacing: '0.2em' }}>
        LOADING…
      </div>
    )
  }

  if (!isAuthorized) {
    return <SignInScreen signIn={signIn} authError={authError} loading={loading} />
  }

  const tab = TABS.find(t => t.id === activeTab)

  return (
    <div style={{ minHeight: '100dvh', background: '#000', color: '#EAE0D0', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 20,
        background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(196,112,78,0.18)',
        padding: '0.85rem 2rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem',
      }}>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.68rem', letterSpacing: '0.28em', color: '#C4704E', textTransform: 'uppercase', fontWeight: 700 }}>
          PARAVONK CMS
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.65rem', color: '#5A4838', fontFamily: "'Space Mono',monospace" }}>{user.email}</span>
          <button onClick={signOut} style={ghostBtn}>Sign Out</button>
          <a href="/" style={{ ...ghostBtn, textDecoration: 'none', display: 'inline-block' }}>← Site</a>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex', gap: 0,
        borderBottom: '1px solid rgba(196,112,78,0.14)',
        background: '#0A0806',
        padding: '0 2rem',
        overflowX: 'auto',
      }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '0.85rem 1.2rem',
              fontFamily: "'Space Mono',monospace",
              fontSize: '0.62rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: activeTab === t.id ? '#C4704E' : '#5A4838',
              borderBottom: activeTab === t.id ? '2px solid #C4704E' : '2px solid transparent',
              transition: 'color 0.15s',
              whiteSpace: 'nowrap',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div style={{ flex: 1 }}>
        <TabPanel
          key={activeTab}
          tab={tab}
          content={content}
          updateContent={updateContent}
        />
      </div>

    </div>
  )
}

const ghostBtn = {
  background: 'transparent',
  border: '1px solid rgba(196,112,78,0.22)',
  color: '#9A8070',
  padding: '0.32rem 0.85rem',
  fontFamily: "'Space Mono',monospace",
  fontSize: '0.6rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  cursor: 'pointer',
}
