interface AIVisualizationProps {
  size?: number
  className?: string
  dark?: boolean
}

export default function AIVisualization({ size = 420, className = '', dark = false }: AIVisualizationProps) {
  const cx = size / 2
  const cy = size / 2
  const stroke = dark ? 'rgba(167,139,250,0.5)' : 'rgba(67,56,202,0.3)'
  const strokeLight = dark ? 'rgba(167,139,250,0.2)' : 'rgba(67,56,202,0.12)'
  const nodeFill = dark ? '#7C3AED' : '#4338CA'
  const coreGlow = dark ? '#7C3AED' : '#4338CA'
  const textColor = dark ? 'rgba(255,255,255,0.4)' : 'rgba(67,56,202,0.5)'

  const outerNodes = [
    { angle: 0, r: 130, label: 'Neural' },
    { angle: 60, r: 130, label: 'Cardiac' },
    { angle: 120, r: 130, label: 'Metabolic' },
    { angle: 180, r: 130, label: 'Immune' },
    { angle: 240, r: 130, label: 'Pulmonary' },
    { angle: 300, r: 130, label: 'Digestive' },
  ]

  const midNodes = [
    { angle: 30, r: 78 },
    { angle: 90, r: 78 },
    { angle: 150, r: 78 },
    { angle: 210, r: 78 },
    { angle: 270, r: 78 },
    { angle: 330, r: 78 },
  ]

  function polar(angle: number, r: number) {
    const a = (angle - 90) * (Math.PI / 180)
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={coreGlow} stopOpacity="0.15" />
          <stop offset="100%" stopColor={coreGlow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nodGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={nodeFill} stopOpacity="0.9" />
          <stop offset="100%" stopColor={nodeFill} stopOpacity="0.5" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background glow */}
      <circle cx={cx} cy={cy} r={140} fill="url(#coreGrad)" />

      {/* Outer orbit ring */}
      <circle
        cx={cx}
        cy={cy}
        r={130}
        fill="none"
        stroke={strokeLight}
        strokeWidth="1"
        strokeDasharray="4 8"
        style={{ transformOrigin: `${cx}px ${cy}px`, animation: 'spinSlow 24s linear infinite' }}
      />

      {/* Mid orbit ring */}
      <circle
        cx={cx}
        cy={cy}
        r={78}
        fill="none"
        stroke={strokeLight}
        strokeWidth="1"
        strokeDasharray="3 6"
        style={{ transformOrigin: `${cx}px ${cy}px`, animation: 'spinSlowReverse 18s linear infinite' }}
      />

      {/* Inner orbit ring */}
      <circle
        cx={cx}
        cy={cy}
        r={40}
        fill="none"
        stroke={stroke}
        strokeWidth="0.5"
        strokeDasharray="2 4"
      />

      {/* Connection lines outer→center */}
      {outerNodes.map((n, i) => {
        const p = polar(n.angle, n.r)
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke={strokeLight}
            strokeWidth="1"
            strokeDasharray="3 5"
          />
        )
      })}

      {/* Connection lines mid nodes */}
      {midNodes.map((n, i) => {
        const p = polar(n.angle, n.r)
        const nextN = outerNodes[i]
        const nextP = polar(nextN.angle, nextN.r)
        return (
          <line
            key={i}
            x1={p.x}
            y1={p.y}
            x2={nextP.x}
            y2={nextP.y}
            stroke={strokeLight}
            strokeWidth="0.75"
            strokeDasharray="2 4"
          />
        )
      })}

      {/* Mid nodes */}
      {midNodes.map((n, i) => {
        const p = polar(n.angle, n.r)
        return (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={3} fill={nodeFill} opacity={0.5} />
          </g>
        )
      })}

      {/* Outer nodes */}
      {outerNodes.map((n, i) => {
        const p = polar(n.angle, n.r)
        const delay = i * 0.3
        return (
          <g key={i} filter="url(#glow)">
            <circle
              cx={p.x}
              cy={p.y}
              r={18}
              fill={dark ? 'rgba(124,58,237,0.1)' : 'rgba(67,56,202,0.06)'}
              stroke={stroke}
              strokeWidth="1"
            />
            <circle cx={p.x} cy={p.y} r={5} fill="url(#nodGrad)" />
            <circle
              cx={p.x}
              cy={p.y}
              r={5}
              fill="none"
              stroke={nodeFill}
              strokeWidth="1"
              style={{ transformOrigin: `${p.x}px ${p.y}px`, animation: `pulseRing 2.4s ease-out ${delay}s infinite` }}
              opacity={0.6}
            />
            <text
              x={p.x}
              y={p.y + 26}
              textAnchor="middle"
              fill={textColor}
              fontSize="8"
              fontFamily="var(--font-mono)"
              letterSpacing="0.08em"
            >
              {n.label.toUpperCase()}
            </text>
          </g>
        )
      })}

      {/* Core pulse rings */}
      <circle
        cx={cx}
        cy={cy}
        r={20}
        fill="none"
        stroke={nodeFill}
        strokeWidth="1.5"
        opacity={0.7}
        style={{ transformOrigin: `${cx}px ${cy}px`, animation: 'pulseRing 2s ease-out 0s infinite' }}
      />
      <circle
        cx={cx}
        cy={cy}
        r={20}
        fill="none"
        stroke={nodeFill}
        strokeWidth="1.5"
        opacity={0.5}
        style={{ transformOrigin: `${cx}px ${cy}px`, animation: 'pulseRing 2s ease-out 0.6s infinite' }}
      />

      {/* Core */}
      <circle cx={cx} cy={cy} r={20} fill={dark ? 'rgba(124,58,237,0.2)' : 'rgba(67,56,202,0.1)'} stroke={stroke} strokeWidth="1" />
      <circle cx={cx} cy={cy} r={8} fill="url(#nodGrad)" filter="url(#glow)" />

      {/* Waveform bars across bottom */}
      {Array.from({ length: 22 }, (_, i) => {
        const x = cx - 88 + i * 8.5
        const h = [0.3, 0.5, 0.8, 0.4, 0.9, 0.6, 1.0, 0.7, 0.5, 0.8, 0.4, 0.6, 0.9, 0.5, 0.3, 0.7, 1.0, 0.6, 0.4, 0.8, 0.5, 0.3][i] || 0.5
        const delay = i * 0.07
        return (
          <rect
            key={i}
            x={x}
            y={cy + 155 - h * 20}
            width={4}
            height={h * 20}
            rx={2}
            fill={nodeFill}
            opacity={0.5}
            style={{ transformOrigin: `${x + 2}px ${cy + 155}px`, animation: `barWave ${1.2 + (i % 3) * 0.3}s ease-in-out ${delay}s infinite` }}
          />
        )
      })}

      {/* Label */}
      <text
        x={cx}
        y={cy + 182}
        textAnchor="middle"
        fill={textColor}
        fontSize="7.5"
        fontFamily="var(--font-mono)"
        letterSpacing="0.15em"
      >
        CARETRACK · AI ANALYSIS
      </text>
    </svg>
  )
}
