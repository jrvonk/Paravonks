import { createContext, useContext, useEffect, useState } from 'react'
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth'
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

    // Surface redirect errors instead of swallowing them
    getRedirectResult(auth)
      .then(result => {
        if (result?.user && !ALLOWED.includes(result.user.email)) {
          firebaseSignOut(auth)
          setAuthError('Access restricted to authorized accounts only.')
        }
      })
      .catch(err => {
        console.error('getRedirectResult error:', err.code, err.message)
        if (err.code !== 'auth/no-auth-event') {
          setAuthError(err.code || 'Sign-in failed.')
        }
      })

    // Safety net: if onAuthStateChanged never fires, unblock after 10s
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

  async function signIn() {
    if (!firebaseReady) return
    setAuthError(null)
    const provider = new GoogleAuthProvider()
    try {
      await signInWithRedirect(auth, provider)
    } catch (err) {
      console.error('CMS sign-in error:', err.code, err.message)
      setAuthError(err.code || 'Sign-in failed.')
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
