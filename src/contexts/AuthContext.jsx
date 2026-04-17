import { createContext, useContext, useEffect, useState } from 'react'
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth'
import { auth, firebaseReady } from '../firebase'

const ALLOWED = ['james@paravonk.com', 'derek@paravonk.com']

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]           = useState(null)
  const [loading, setLoading]     = useState(firebaseReady)
  const [authError, setAuthError] = useState(null)

  useEffect(() => {
    if (!firebaseReady) return

    // Handle redirect result after mobile sign-in returns
    getRedirectResult(auth).then(result => {
      if (result?.user && !ALLOWED.includes(result.user.email)) {
        firebaseSignOut(auth)
        setAuthError('Access restricted to authorized accounts only.')
      }
    }).catch(() => {})

    return onAuthStateChanged(auth, u => {
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
  }, [])

  async function signIn() {
    if (!firebaseReady) return
    setAuthError(null)
    const provider = new GoogleAuthProvider()
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    try {
      if (isMobile) {
        await signInWithRedirect(auth, provider)
      } else {
        await signInWithPopup(auth, provider)
      }
    } catch (err) {
      if (err.code === 'auth/popup-blocked') {
        await signInWithRedirect(auth, provider)
      } else if (err.code !== 'auth/popup-closed-by-user') {
        setAuthError('Sign-in failed. Please try again.')
      }
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
