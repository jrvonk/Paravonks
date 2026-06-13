import './globals.css'
import Providers from './providers'

export const metadata = {
  title: 'Paravonk',
  description: 'Derek and James Vonk — digital media production & consulting.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
