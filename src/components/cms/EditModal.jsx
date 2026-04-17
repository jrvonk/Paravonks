import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

let _resolve = null

export function registerEditModal(openFn) {
  window.__cmsOpenModal = openFn
}

export default function EditModal() {
  const [state, setState] = useState(null) // { field, value, save }
  const textareaRef = useRef(null)

  useEffect(() => {
    window.__cmsOpenModal = (field, value, save) => {
      setState({ field, value: String(value ?? ''), save })
    }
    return () => { delete window.__cmsOpenModal }
  }, [])

  useEffect(() => {
    if (state) setTimeout(() => textareaRef.current?.focus(), 30)
  }, [state])

  if (!state) return null

  function close() { setState(null) }

  async function save() {
    await state.save(state.field, state.value)
    close()
  }

  function onKey(e) {
    if (e.key === 'Escape') close()
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) save()
  }

  return createPortal(
    <div
      onClick={close}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(0,0,0,0.72)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg3)',
          border: '1px solid rgba(196,112,78,0.28)',
          padding: '2rem',
          width: '100%',
          maxWidth: 560,
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--terracotta)' }}>
          Editing: {state.field}
        </div>

        <textarea
          ref={textareaRef}
          value={state.value}
          onChange={e => setState(s => ({ ...s, value: e.target.value }))}
          onKeyDown={onKey}
          rows={5}
          style={{
            background: 'var(--bg)',
            border: '1px solid rgba(196,112,78,0.3)',
            color: 'var(--text)',
            padding: '0.8rem 1rem',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.95rem',
            lineHeight: 1.6,
            resize: 'vertical',
            outline: 'none',
            width: '100%',
          }}
        />

        <div style={{ fontSize: '0.7rem', color: 'var(--muted)', fontFamily: "'Space Mono', monospace" }}>
          Ctrl+Enter to save · Esc to cancel
        </div>

        <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end' }}>
          <button
            onClick={close}
            style={{ background: 'transparent', border: '1px solid rgba(200,150,100,0.25)', color: 'var(--muted-brown)', padding: '0.55rem 1.4rem', fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            Cancel
          </button>
          <button
            onClick={save}
            style={{ background: 'var(--terracotta)', border: 'none', color: '#000', padding: '0.55rem 1.4rem', fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontWeight: 700 }}
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
