import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useContent } from '../../contexts/ContentContext'

const SECTIONS = [
  { label: 'Navigation', fields: [
    { key: 'nav.logo', name: 'Logo Text' },
  ]},
  { label: 'Hero', fields: [
    { key: 'hero.eyebrow',    name: 'Eyebrow Tag' },
    { key: 'hero.headline1',  name: 'Headline — Line 1' },
    { key: 'hero.headline2',  name: 'Headline — Line 2' },
    { key: 'hero.headline3',  name: 'Headline — Line 3' },
    { key: 'hero.sub',        name: 'Subtitle Paragraph' },
  ]},
  { label: 'About', fields: [
    { key: 'about.label',     name: 'Section Label' },
    { key: 'about.title',     name: 'Section Title' },
    { key: 'about.body',      name: 'Body Text' },
    { key: 'about.derek.name',  name: 'Derek — Name' },
    { key: 'about.derek.title', name: 'Derek — Title' },
    { key: 'about.derek.bio',   name: 'Derek — Bio', multiline: true },
    { key: 'about.james.name',  name: 'James — Name' },
    { key: 'about.james.title', name: 'James — Title' },
    { key: 'about.james.bio',   name: 'James — Bio', multiline: true },
  ]},
  { label: 'Services', fields: [
    { key: 'services.label', name: 'Section Label' },
    { key: 'services.title', name: 'Section Title' },
  ]},
  { label: 'Process', fields: [
    { key: 'process.label', name: 'Section Label' },
    { key: 'process.title', name: 'Section Title' },
    { key: 'process.body',  name: 'Body Text', multiline: true },
  ]},
  { label: 'Contact', fields: [
    { key: 'contact.label',    name: 'Section Label' },
    { key: 'contact.title',    name: 'Section Title' },
    { key: 'contact.sub',      name: 'Subtitle' },
    { key: 'contact.location', name: 'Location' },
    { key: 'contact.email',    name: 'Email' },
    { key: 'contact.phone',    name: 'Phone' },
    { key: 'contact.response', name: 'Response Time' },
  ]},
  { label: 'Footer', fields: [
    { key: 'footer.logo',      name: 'Logo Text' },
    { key: 'footer.copyright', name: 'Copyright Line' },
  ]},
]

function Field({ fieldKey, name, multiline, content, updateContent }) {
  const defaultVal = content[fieldKey] ?? ''
  const [val, setVal]     = useState(defaultVal)
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  async function save() {
    setSaving(true)
    await updateContent(fieldKey, val)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const inputStyle = {
    width: '100%',
    background: '#0E0C0A',
    border: '1px solid rgba(196,112,78,0.22)',
    color: '#EAE0D0',
    padding: '0.6rem 0.8rem',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.88rem',
    lineHeight: 1.6,
    outline: 'none',
    resize: multiline ? 'vertical' : 'none',
    borderRadius: 0,
  }

  return (
    <div style={{ marginBottom: '1.2rem' }}>
      <div style={{ fontSize: '0.6rem', fontFamily: "'Space Mono', monospace", letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9A8070', marginBottom: '0.35rem' }}>
        {name} <span style={{ opacity: 0.45 }}>· {fieldKey}</span>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
        {multiline ? (
          <textarea rows={3} value={val} onChange={e => setVal(e.target.value)} style={inputStyle} />
        ) : (
          <input type="text" value={val} onChange={e => setVal(e.target.value)} style={{ ...inputStyle, height: 38 }} />
        )}
        <button
          onClick={save}
          disabled={saving}
          style={{
            flexShrink: 0,
            background: saved ? '#7A9B8A' : 'var(--terracotta, #C4704E)',
            border: 'none',
            color: '#000',
            padding: '0 1rem',
            height: 38,
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: saving ? 'wait' : 'pointer',
            fontWeight: 700,
            transition: 'background 0.2s',
            whiteSpace: 'nowrap',
          }}
        >
          {saved ? 'Saved' : saving ? '…' : 'Save'}
        </button>
      </div>
    </div>
  )
}

export default function CMSAdmin() {
  const { user, signIn, signOut, authError, isAuthorized, loading } = useAuth()
  const { content, updateContent } = useContent()

  if (loading) {
    return (
      <div style={{ minHeight: '100dvh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9A8070', fontFamily: "'Space Mono', monospace", fontSize: '0.72rem', letterSpacing: '0.2em' }}>
        LOADING…
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div style={{ minHeight: '100dvh', background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.72rem', letterSpacing: '0.3em', color: '#C4704E', textTransform: 'uppercase', marginBottom: '2.5rem' }}>
          PARAVONK CMS
        </div>
        <button
          onClick={signIn}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            background: '#1A1614',
            border: '1px solid rgba(196,112,78,0.35)',
            color: '#EAE0D0',
            padding: '0.9rem 2rem',
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.72rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(196,112,78,0.7)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(196,112,78,0.35)'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>
        {authError && (
          <div style={{ marginTop: '1rem', maxWidth: 360, textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: '#ff6b6b', fontFamily: "'Space Mono', monospace", letterSpacing: '0.06em', marginBottom: '0.3rem' }}>
              {authError}
            </div>
            {authError.includes('unauthorized-domain') && (
              <div style={{ fontSize: '0.62rem', color: '#9A8070', fontFamily: "'Space Mono', monospace", lineHeight: 1.6 }}>
                Add this domain to Firebase Console →<br />Authentication → Settings → Authorized domains
              </div>
            )}
          </div>
        )}
        <div style={{ marginTop: '1.5rem', fontSize: '0.6rem', color: '#5A4838', fontFamily: "'Space Mono', monospace", letterSpacing: '0.1em' }}>
          Access restricted to authorised accounts
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100dvh', background: '#000', color: '#EAE0D0' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(196,112,78,0.2)', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(12px)', zIndex: 10 }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.72rem', letterSpacing: '0.28em', color: '#C4704E', textTransform: 'uppercase', fontWeight: 700 }}>
          PARAVONK CMS
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <span style={{ fontSize: '0.68rem', color: '#9A8070', fontFamily: "'Space Mono', monospace" }}>{user.email}</span>
          <button
            onClick={signOut}
            style={{ background: 'transparent', border: '1px solid rgba(200,150,100,0.2)', color: '#9A8070', padding: '0.35rem 0.9rem', fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            Sign Out
          </button>
          <a href="/" style={{ background: 'transparent', border: '1px solid rgba(196,112,78,0.3)', color: '#C4704E', padding: '0.35rem 0.9rem', fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', textDecoration: 'none' }}>
            ← View Site
          </a>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '3rem 2rem' }}>
        {SECTIONS.map(section => (
          <div key={section.label} style={{ marginBottom: '3rem' }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C4704E', borderBottom: '1px solid rgba(196,112,78,0.18)', paddingBottom: '0.5rem', marginBottom: '1.2rem' }}>
              {section.label}
            </div>
            {section.fields.map(f => (
              <Field
                key={f.key}
                fieldKey={f.key}
                name={f.name}
                multiline={f.multiline}
                content={content}
                updateContent={updateContent}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
