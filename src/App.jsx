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
import CMSBar from './components/cms/CMSBar'
import EditModal from './components/cms/EditModal'

export default function App() {
  return (
    <AuthProvider>
      <ContentProvider>
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

        <CMSBar />
        <EditModal />
      </ContentProvider>
    </AuthProvider>
  )
}
