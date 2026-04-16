import { useEffect, useRef, useState } from 'react'

// SVG tumbleweed: monochromatic brown tangled brush shape
function TumbleweedSVG({ size = 80 }) {
  const c = '#8B6542'
  const s = { stroke: c, strokeWidth: 1.5, strokeLinecap: 'round', fill: 'none' }
  const cx = size / 2, cy = size / 2, r = size * 0.42
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Outer circle */}
      <circle cx={cx} cy={cy} r={r} stroke={c} strokeWidth={1.8} fill="none" opacity="0.7" />
      {/* Inner woven branches */}
      <ellipse cx={cx} cy={cy} rx={r * 0.85} ry={r * 0.45} {...s} opacity="0.65" />
      <ellipse cx={cx} cy={cy} rx={r * 0.45} ry={r * 0.85} {...s} opacity="0.65" />
      <ellipse cx={cx} cy={cy} rx={r * 0.85} ry={r * 0.45} {...s} opacity="0.5"
        transform={`rotate(45 ${cx} ${cy})`} />
      <ellipse cx={cx} cy={cy} rx={r * 0.85} ry={r * 0.45} {...s} opacity="0.5"
        transform={`rotate(-45 ${cx} ${cy})`} />
      {/* Random interior twigs */}
      <line x1={cx - r * 0.6} y1={cy - r * 0.2} x2={cx + r * 0.6} y2={cy + r * 0.3} {...s} opacity="0.4" />
      <line x1={cx - r * 0.4} y1={cy + r * 0.5} x2={cx + r * 0.5} y2={cy - r * 0.4} {...s} opacity="0.4" />
      <line x1={cx} y1={cy - r * 0.8} x2={cx + r * 0.3} y2={cy + r * 0.7} {...s} opacity="0.35" />
      <line x1={cx - r * 0.7} y1={cy + r * 0.1} x2={cx + r * 0.2} y2={cy - r * 0.6} {...s} opacity="0.35" />
      {/* Center knot */}
      <circle cx={cx} cy={cy} r={r * 0.12} stroke={c} strokeWidth={1.2} fill={c} fillOpacity="0.2" />
    </svg>
  )
}

export default function Tumbleweed() {
  const [active, setActive] = useState(false)
  const timerRef = useRef(null)
  const weedRef = useRef(null)

  useEffect(() => {
    function trigger() {
      setActive(true)
      // Reset after animation (5.5s)
      setTimeout(() => {
        setActive(false)
      }, 5500)
    }

    // First appearance after 10s, then every 10s
    timerRef.current = setTimeout(function run() {
      trigger()
      timerRef.current = setTimeout(run, 10000)
    }, 10000)

    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    <div
      ref={weedRef}
      style={{
        position: 'fixed',
        bottom: 8,
        left: 0,
        width: '100vw',
        height: 90,
        pointerEvents: 'none',
        zIndex: 50,
        overflow: 'hidden',
      }}
    >
      {active && (
        <div
          style={{
            position: 'absolute',
            bottom: 4,
            animation: 'tumbleweedRoll 5.2s linear forwards',
          }}
        >
          <TumbleweedSVG size={72} />
        </div>
      )}

      <style>{`
        @keyframes tumbleweedRoll {
          0%   { transform: translateX(-90px) translateY(0px) rotate(0deg); }
          10%  { transform: translateX(calc(10vw))  translateY(-18px) rotate(72deg); }
          20%  { transform: translateX(calc(20vw))  translateY(0px)   rotate(144deg); }
          30%  { transform: translateX(calc(30vw))  translateY(-14px) rotate(216deg); }
          40%  { transform: translateX(calc(40vw))  translateY(0px)   rotate(288deg); }
          50%  { transform: translateX(calc(50vw))  translateY(-20px) rotate(360deg); }
          60%  { transform: translateX(calc(60vw))  translateY(0px)   rotate(432deg); }
          70%  { transform: translateX(calc(70vw))  translateY(-12px) rotate(504deg); }
          80%  { transform: translateX(calc(80vw))  translateY(0px)   rotate(576deg); }
          90%  { transform: translateX(calc(90vw))  translateY(-16px) rotate(648deg); }
          100% { transform: translateX(calc(100vw + 90px)) translateY(0px) rotate(720deg); }
        }
      `}</style>
    </div>
  )
}
