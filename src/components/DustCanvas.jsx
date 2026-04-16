import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 70

function createParticle(width, height) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    r: 1 + Math.random() * 2.5,
    speed: 0.2 + Math.random() * 0.5,
    opacity: 0.04 + Math.random() * 0.1,
    phase: Math.random() * Math.PI * 2,
    amplitude: 0.3 + Math.random() * 1.2,
    frequency: 0.003 + Math.random() * 0.008,
  }
}

export default function DustCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particles = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(canvas.width, canvas.height)
      )
    }

    window.addEventListener('resize', resize)
    resize()

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x += p.speed
        p.y += Math.sin(p.x * p.frequency + p.phase) * p.amplitude * 0.15

        // Wrap around
        if (p.x > canvas.width + 10) {
          p.x = -10
          p.y = Math.random() * canvas.height
        }
        if (p.y < -10) p.y = canvas.height + 10
        if (p.y > canvas.height + 10) p.y = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180, 150, 110, ${p.opacity})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
