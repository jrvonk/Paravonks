'use client'
import { AuthProvider }    from '../src/contexts/AuthContext'
import { ContentProvider } from '../src/contexts/ContentContext'

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ContentProvider>{children}</ContentProvider>
    </AuthProvider>
  )
}
