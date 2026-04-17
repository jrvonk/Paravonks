import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  ssr: {
    // Bundle firebase so Vite transforms browser-specific paths and our
    // typeof-window guard in firebase.js prevents Node-side initialization.
    noExternal: ['firebase'],
  },
})
