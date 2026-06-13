import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const config = {
  apiKey:     process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId:      process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Skip Firebase init on the server — all auth/Firestore usage is client-only.
const isClient = typeof window !== 'undefined'
export const firebaseReady = isClient && !!config.apiKey

let auth = null
let db   = null

if (firebaseReady) {
  const app = initializeApp(config)
  auth = getAuth(app)
  db   = getFirestore(app)
}

export { auth, db }
