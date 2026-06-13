import WesternBackground from '../src/components/WesternBackground'
import Nav      from '../src/components/Nav'
import Hero     from '../src/components/Hero'
import About    from '../src/components/About'
import Services from '../src/components/Services'
import Process  from '../src/components/Process'
import Stack    from '../src/components/Stack'
import Contact  from '../src/components/Contact'
import Footer   from '../src/components/Footer'

export default function Home() {
  return (
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
  )
}
