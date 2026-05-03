import { createContext, useContext, useEffect, useState } from 'react'
import { signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth'
import { auth, firebaseReady } from '../firebase'

const ALLOWED = ['james@paravonk.com', 'derek@paravonk.com']

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]           = useState(null)
  const [loading, setLoading]     = useState(false)
  const [authError, setAuthError] = useState(null)

  useEffect(() => {
    if (!firebaseReady) return

    setLoading(true)

    const timeout = setTimeout(() => {
      console.warn('onAuthStateChanged timeout — unblocking loading')
      setLoading(false)
    }, 10000)

    const unsub = onAuthStateChanged(auth, u => {
      clearTimeout(timeout)
      if (u && !ALLOWED.includes(u.email)) {
        firebaseSignOut(auth)
        setAuthError('Access restricted to authorized accounts only.')
        setUser(null)
      } else {
        setUser(u)
        setAuthError(null)
      }
      setLoading(false)
    })

    return () => { clearTimeout(timeout); unsub() }
  }, [])

  async function signIn(email, password) {
    if (!firebaseReady) return
    setAuthError(null)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      console.error('CMS sign-in error:', err.code, err.message)
      const msg = err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found'
        ? 'Invalid email or password.'
        : (err.code || 'Sign-in failed.')
      setAuthError(msg)
    }
  }

  async function signOut() {
    if (!firebaseReady) return
    await firebaseSignOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, loading, authError, signIn, signOut, isAuthorized: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
