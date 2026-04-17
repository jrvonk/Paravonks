import { useEffect, useRef } from 'react'

const STAR_COUNT = 190

function initStars(w, h) {
  return Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * w,
    y: Math.random() * h * 0.60,
    r: 0.3 + Math.random() * 1.5,
    baseOpacity: 0.35 + Math.random() * 0.65,
    speed: 0.004 + Math.random() * 0.009,
    phase: Math.random() * Math.PI * 2,
    warm: Math.random() > 0.72,
  }))
}

function drawMoon(ctx, w, h, scroll) {
  const x = w * 0.75
  const y = h * 0.17 - scroll * 0.08
  const r = Math.min(w, h) * 0.044

  // Outer atmospheric glow
  const outerGlow = ctx.createRadialGradient(x, y, r * 0.5, x, y, r * 4.5)
  outerGlow.addColorStop(0, 'rgba(255, 230, 140, 0.14)')
  outerGlow.addColorStop(0.4, 'rgba(240, 200, 80,  0.05)')
  outerGlow.addColorStop(1, 'transparent')
  ctx.fillStyle = outerGlow
  ctx.beginPath()
  ctx.arc(x, y, r * 4.5, 0, Math.PI * 2)
  ctx.fill()

  // Inner halo
  const halo = ctx.createRadialGradient(x, y, r, x, y, r * 2.2)
  halo.addColorStop(0, 'rgba(255, 240, 160, 0.12)')
  halo.addColorStop(1, 'transparent')
  ctx.fillStyle = halo
  ctx.beginPath()
  ctx.arc(x, y, r * 2.2, 0, Math.PI * 2)
  ctx.fill()

  // Moon disc
  const disc = ctx.createRadialGradient(x - r * 0.28, y - r * 0.25, 0, x, y, r)
  disc.addColorStop(0, '#FEFCE0')
  disc.addColorStop(0.45, '#EDCF6A')
  disc.addColorStop(1, '#BEA030')
  ctx.fillStyle = disc
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fill()
}

function drawMesas(ctx, w, h, scroll) {
  // Horizon sits at ~58% of viewport height; shifts up as user scrolls
  const horizon = h * 0.60 - scroll * 0.15

  // Subtle atmospheric haze at horizon
  const haze = ctx.createLinearGradient(0, horizon - h * 0.09, 0, horizon + 2)
  haze.addColorStop(0, 'transparent')
  haze.addColorStop(1, 'rgba(22, 10, 6, 0.55)')
  ctx.fillStyle = haze
  ctx.fillRect(0, horizon - h * 0.09, w, h * 0.12)

  // Mesa/butte definitions  [xRatio, widthRatio, heightRatio]
  const defs = [
    [0.05, 0.110, 0.17],
    [0.21, 0.080, 0.12],
    [0.37, 0.145, 0.22],
    [0.57, 0.065, 0.10],
    [0.71, 0.125, 0.16],
    [0.89, 0.085, 0.13],
  ]

  ctx.fillStyle = '#1C1410'
  for (const [xr, wr, hr] of defs) {
    const cx = xr * w
    const mw = wr * w
    const mh = hr * h
    const base = horizon
    const top = base - mh
    const slope = mw * 0.20

    ctx.beginPath()
    ctx.moveTo(cx - mw / 2 - slope, base)
    ctx.lineTo(cx - mw / 2, top)
    ctx.lineTo(cx + mw / 2, top)
    ctx.lineTo(cx + mw / 2 + slope, base)
    ctx.closePath()
    ctx.fill()
  }
}

function drawHills(ctx, w, h, scroll) {
  const base = h * 0.69 - scroll * 0.28

  // Silhouette control points [xRatio, yOffset]
  const pts = [
    [0.00,  22], [0.07, -14], [0.14,  7], [0.24, -40],
    [0.33,  -6], [0.43, -50], [0.52,  -2], [0.62, -60],
    [0.71, -18], [0.80, -46], [0.91, -10], [1.00,  22],
  ]

  ctx.fillStyle = '#130F0C'
  ctx.beginPath()
  ctx.moveTo(0, h)
  ctx.lineTo(0, base + pts[0][1])

  for (let i = 0; i < pts.length - 1; i++) {
    const x0 = pts[i][0] * w,   y0 = base + pts[i][1]
    const x1 = pts[i + 1][0] * w, y1 = base + pts[i + 1][1]
    ctx.quadraticCurveTo(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
  }

  const [lxr, lyo] = pts[pts.length - 1]
  ctx.lineTo(lxr * w, base + lyo)
  ctx.lineTo(w, h)
  ctx.closePath()
  ctx.fill()
}

function drawSaguaro(ctx, cx, groundY, height) {
  const tw = height * 0.12     // trunk width
  const thick = height * 0.10  // arm thickness

  // Left arm: horizontal then vertical
  const laY  = groundY - height * 0.52
  const laLen = height * 0.30
  ctx.fillRect(cx - tw / 2 - laLen, laY, laLen, thick)
  ctx.fillRect(cx - tw / 2 - laLen, laY - laLen * 0.50, thick, laLen * 0.50)

  // Right arm: horizontal then vertical
  const raY  = groundY - height * 0.37
  const raLen = height * 0.27
  ctx.fillRect(cx + tw / 2, raY, raLen, thick)
  ctx.fillRect(cx + tw / 2 + raLen - thick, raY - raLen * 0.46, thick, raLen * 0.46)

  // Trunk
  ctx.fillRect(cx - tw / 2, groundY - height, tw, height)
}

function drawForeground(ctx, w, h, scroll) {
  const groundY = h * 0.80 - scroll * 0.45

  ctx.fillStyle = '#0D0906'

  // Ground plane
  ctx.fillRect(0, groundY, w, h)

  // Boulders
  const boulders = [
    [0.29 * w, groundY + 4, 27, 11, -0.04],
    [0.56 * w, groundY + 3, 16,  7,  0.06],
    [0.74 * w, groundY + 4, 37, 14, -0.08],
  ]
  for (const [bx, by, rx, ry, rot] of boulders) {
    ctx.beginPath()
    ctx.ellipse(bx, by, rx, ry, rot, 0, Math.PI * 2)
    ctx.fill()
  }

  // Cacti  [xRatio, heightRatio]
  const cacti = [
    [0.04, 0.21], [0.17, 0.14], [0.46, 0.22],
    [0.67, 0.13], [0.83, 0.17], [0.94, 0.11],
  ]
  for (const [xr, hr] of cacti) {
    drawSaguaro(ctx, xr * w, groundY, hr * h)
  }
}

export default function WesternBackground() {
  const canvasRef = useRef(null)
  const starsRef  = useRef([])
  const scrollRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    function resize() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      starsRef.current = initStars(canvas.width, canvas.height)
    }

    function onScroll() { scrollRef.current = window.scrollY }

    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    resize()

    function frame(ts) {
      const t      = ts / 1000
      const scroll = scrollRef.current
      const w = canvas.width
      const h = canvas.height

      // Sky — OLED black to very dark warm charcoal at horizon
      const sky = ctx.createLinearGradient(0, 0, 0, h * 0.7)
      sky.addColorStop(0,    '#000000')
      sky.addColorStop(0.55, '#04020A')
      sky.addColorStop(1,    '#0C0809')
      ctx.fillStyle = sky
      ctx.fillRect(0, 0, w, h)

      // Stars (very slow parallax)
      const starOff = scroll * 0.05
      for (const s of starsRef.current) {
        const op = s.baseOpacity * (0.6 + 0.4 * Math.sin(t * s.speed * Math.PI * 2 + s.phase))
        ctx.globalAlpha = Math.max(0, Math.min(1, op))
        ctx.fillStyle = s.warm ? '#FFF0B8' : '#D8E4FF'
        ctx.beginPath()
        ctx.arc(s.x, s.y - starOff, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      drawMoon(ctx, w, h, scroll)
      drawMesas(ctx, w, h, scroll)
      drawHills(ctx, w, h, scroll)
      drawForeground(ctx, w, h, scroll)

      animId = requestAnimationFrame(frame)
    }

    animId = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
