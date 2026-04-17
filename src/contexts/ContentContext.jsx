import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db, firebaseReady } from '../firebase'
import { useAuth } from './AuthContext'

const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const { isAuthorized } = useAuth()
  const [content, setContent]     = useState({})
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (!firebaseReady) return
    const ref = doc(db, 'content', 'site')
    return onSnapshot(ref, snap => {
      if (snap.exists()) setContent(snap.data())
    })
  }, [])

  // Disable editing mode when user loses authorization
  useEffect(() => {
    if (!isAuthorized) setIsEditing(false)
  }, [isAuthorized])

  const updateContent = useCallback(async (field, value) => {
    if (!firebaseReady || !isAuthorized) return
    const ref = doc(db, 'content', 'site')
    await setDoc(ref, { [field]: value }, { merge: true })
  }, [isAuthorized])

  return (
    <ContentContext.Provider value={{ content, isEditing, setIsEditing, updateContent }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  return useContext(ContentContext)
}
