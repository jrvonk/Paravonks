import WesternBackground from './components/WesternBackground'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Process from './components/Process'
import Stack from './components/Stack'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <WesternBackground />

      {/* Page content — sits above the western canvas */}
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
  )
}
