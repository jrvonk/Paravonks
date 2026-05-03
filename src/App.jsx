import { AuthProvider } from './contexts/AuthContext'
import { ContentProvider } from './contexts/ContentContext'
import WesternBackground from './components/WesternBackground'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Process from './components/Process'
import Stack from './components/Stack'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CMSAdmin from './components/cms/CMSAdmin'

export default function App({ url = '/' }) {
  const isAdmin = url.startsWith('/ghost')

  return (
    <AuthProvider>
      <ContentProvider>
        {isAdmin ? (
          <CMSAdmin />
        ) : (
          <>
            <WesternBackground />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <Nav />
              <Hero />
              <About />
              <Services />
              <Process />
              <Stack />
              <Contact />
              <Footer />
            </div>
          </>
        )}
      </ContentProvider>
    </AuthProvider>
  )
}
