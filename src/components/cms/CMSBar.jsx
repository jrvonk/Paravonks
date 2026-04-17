import { useAuth } from '../../contexts/AuthContext'
import { useContent } from '../../contexts/ContentContext'
import { firebaseReady } from '../../firebase'

export default function CMSBar() {
  const { user, signIn, signOut, authError, isAuthorized } = useAuth()
  const { isEditing, setIsEditing } = useContent()

  if (!firebaseReady) return null

  if (!isAuthorized) {
    return (
      <div style={{ position: 'fixed', bottom: '1.2rem', right: '1.5rem', zIndex: 8000 }}>
        {authError && (
          <div style={{ fontSize: '0.68rem', color: '#ff6b6b', fontFamily: "'Space Mono', monospace", marginBottom: '0.5rem', textAlign: 'right' }}>
            {authError}
          </div>
        )}
        <button
          onClick={signIn}
          style={{
            background: 'rgba(14,12,10,0.88)',
            border: '1px solid rgba(196,112,78,0.28)',
            color: 'var(--muted)',
            padding: '0.38rem 0.85rem',
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--terracotta)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
        >
          CMS
        </button>
      </div>
    )
  }

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      zIndex: 8000,
      background: 'rgba(14,12,10,0.96)',
      borderTop: isEditing ? '1px solid rgba(196,112,78,0.5)' : '1px solid rgba(196,112,78,0.18)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.65rem 2rem',
      gap: '1rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--terracotta)', fontWeight: 700 }}>
          PARAVONK CMS
        </div>
        <div style={{ width: 1, height: 14, background: 'rgba(196,112,78,0.3)' }} />
        <div style={{ fontSize: '0.72rem', color: 'var(--muted)', fontFamily: "'Space Mono', monospace" }}>
          {user.email}
        </div>
      </div>

      {isEditing && (
        <div style={{ fontSize: '0.68rem', color: 'var(--muted)', fontFamily: "'Space Mono', monospace" }}>
          Click any highlighted field to edit · Changes save instantly to Firestore
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <button
          onClick={() => setIsEditing(v => !v)}
          style={{
            background: isEditing ? 'var(--terracotta)' : 'transparent',
            border: '1px solid var(--terracotta)',
            color: isEditing ? '#000' : 'var(--terracotta)',
            padding: '0.42rem 1.1rem',
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.62rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontWeight: 700,
            transition: 'all 0.15s',
          }}
        >
          {isEditing ? 'Stop Editing' : 'Edit Mode'}
        </button>

        <button
          onClick={signOut}
          style={{
            background: 'transparent',
            border: '1px solid rgba(200,150,100,0.2)',
            color: 'var(--muted)',
            padding: '0.42rem 1.1rem',
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.62rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--terracotta)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
