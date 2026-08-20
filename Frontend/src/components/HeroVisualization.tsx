import { motion } from 'framer-motion'

interface Node {
  id: string
  label: string
  angle: number
  radius: number
  color: string
  floatY: number[]
  floatX: number[]
  duration: number
  delay: number
}

const NODES: Node[] = [
  { id: 'neuro', label: 'Neural', angle: -90, radius: 145, color: '#4338CA', floatY: [0, -14, 0], floatX: [0, 5, 0], duration: 7, delay: 0 },
  { id: 'cardiac', label: 'Cardiac', angle: -30, radius: 145, color: '#DC2626', floatY: [0, -10, 5, 0], floatX: [0, 8, 0], duration: 9, delay: 0.8 },
  { id: 'metabolic', label: 'Metabolic', angle: 30, radius: 145, color: '#059669', floatY: [0, 8, -6, 0], floatX: [0, -5, 0], duration: 8, delay: 1.5 },
  { id: 'pulm', label: 'Pulmonary', angle: 90, radius: 145, color: '#0891B2', floatY: [0, 12, 0], floatX: [0, -8, 3, 0], duration: 6.5, delay: 0.4 },
  { id: 'digest', label: 'Digestive', angle: 150, radius: 145, color: '#7C3AED', floatY: [0, -8, 6, 0], floatX: [0, 6, 0], duration: 9.5, delay: 1.1 },
  { id: 'immune', label: 'Immune', angle: -150, radius: 145, color: '#D97706', floatY: [0, 10, -5, 0], floatX: [0, -10, 4, 0], duration: 7.5, delay: 2 },
]

function polar(angleDeg: number, r: number, cx = 0, cy = 0) {
  const a = (angleDeg * Math.PI) / 180
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
}

export default function HeroVisualization() {
  const size = 480
  const cx = size / 2
  const cy = size / 2

  return (
    <div className="relative select-none" style={{ width: size, height: size }}>

      {/* Ambient glow — breathing */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(ellipse 72% 72% at 50% 50%, rgba(67,56,202,0.13) 0%, rgba(8,145,178,0.06) 55%, transparent 80%)',
          transformOrigin: 'center',
        }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Outer orbital ring */}
      <motion.div
        className="absolute"
        style={{ inset: cx - 155, borderRadius: '50%', border: '1px dashed rgba(67,56,202,0.18)', transformOrigin: 'center' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      />

      {/* Mid orbital ring */}
      <motion.div
        className="absolute"
        style={{ inset: cx - 100, borderRadius: '50%', border: '1px solid rgba(67,56,202,0.1)', transformOrigin: 'center' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />

      {/* Inner ring */}
      <motion.div
        className="absolute"
        style={{ inset: cx - 50, borderRadius: '50%', border: '1px solid rgba(67,56,202,0.15)', transformOrigin: 'center' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      {/* SVG connecting lines */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {NODES.map((node) => {
          const p = polar(node.angle, node.radius, cx, cy)
          return (
            <motion.line
              key={node.id}
              x1={cx} y1={cy}
              x2={p.x} y2={p.y}
              stroke={node.color}
              strokeWidth={1}
              strokeOpacity={0.2}
              strokeDasharray="4 8"
              animate={{ strokeOpacity: [0.12, 0.28, 0.12] }}
              transition={{ duration: node.duration * 0.8, repeat: Infinity, delay: node.delay, ease: 'easeInOut' }}
            />
          )
        })}

        {/* Mid ring ring nodes (small dots on ring) */}
        {NODES.map((node) => {
          const p = polar(node.angle + 30, 100, cx, cy)
          return (
            <motion.circle
              key={`mid-${node.id}`}
              cx={p.x} cy={p.y} r={2.5}
              fill={node.color}
              opacity={0.35}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: node.duration, repeat: Infinity, delay: node.delay + 0.5 }}
            />
          )
        })}
      </svg>

      {/* Floating nodes */}
      {NODES.map((node) => {
        const p = polar(node.angle, node.radius, cx, cy)
        return (
          <motion.div
            key={node.id}
            className="absolute"
            style={{ left: p.x - 32, top: p.y - 32 }}
            animate={{ y: node.floatY, x: node.floatX }}
            transition={{ duration: node.duration, repeat: Infinity, ease: 'easeInOut', delay: node.delay, repeatType: 'mirror' }}
          >
            {/* Node ring pulse */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: node.color, opacity: 0 }}
              animate={{ scale: [1, 2.2], opacity: [0.35, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: node.delay + 0.5, ease: 'easeOut' }}
            />
            {/* Node body */}
            <motion.div
              className="relative w-16 h-16 rounded-full flex flex-col items-center justify-center"
              style={{
                background: `${node.color}12`,
                border: `1px solid ${node.color}35`,
                backdropFilter: 'blur(8px)',
              }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: node.color, boxShadow: `0 0 8px ${node.color}60` }} />
              <span
                className="mt-1 text-[8px] font-mono font-bold tracking-wider"
                style={{ color: node.color, opacity: 0.8 }}
              >
                {node.label.toUpperCase()}
              </span>
            </motion.div>
          </motion.div>
        )
      })}

      {/* Central core */}
      <div
        className="absolute"
        style={{ left: cx - 52, top: cy - 52 }}
      >
        {/* Pulse rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              inset: -i * 14,
              border: '1px solid rgba(67,56,202,0.4)',
              transformOrigin: 'center',
            }}
            animate={{ scale: [1, 1.6 + i * 0.3], opacity: [0.6, 0] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              delay: i * 0.65,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* Core sphere */}
        <motion.div
          className="relative w-[104px] h-[104px] rounded-full flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle at 38% 35%, rgba(99,102,241,0.35) 0%, rgba(67,56,202,0.15) 60%, transparent 100%)',
            border: '1px solid rgba(67,56,202,0.4)',
            boxShadow: '0 0 32px rgba(67,56,202,0.2), inset 0 1px 0 rgba(255,255,255,0.15)',
          }}
          animate={{ scale: [1, 1.035, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Inner glow */}
          <motion.div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle, rgba(99,102,241,0.5) 0%, rgba(67,56,202,0.2) 100%)',
              border: '1px solid rgba(99,102,241,0.5)',
            }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 2L13.5 8H20L14.5 12L16.5 18L11 14L5.5 18L7.5 12L2 8H8.5L11 2Z" fill="rgba(167,139,250,0.9)" strokeWidth="0" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Waveform row */}
      <div
        className="absolute flex items-end gap-[3px]"
        style={{ left: cx - 72, top: cy + 172 }}
      >
        {[0.3, 0.55, 0.85, 0.45, 1.0, 0.65, 0.38, 0.9, 0.7, 0.5, 0.8, 0.42, 0.95, 0.6, 0.35, 0.75, 0.55, 1.0, 0.48, 0.68, 0.3, 0.6, 0.88, 0.4].map((h, i) => (
          <motion.div
            key={i}
            className="w-[4px] rounded-sm"
            style={{ background: 'rgba(67,56,202,0.5)', originY: 1, height: Math.round(h * 22) }}
            animate={{ scaleY: [h, h * 0.3, h * 1.1, h * 0.5, h] }}
            transition={{
              duration: 1.4 + (i % 4) * 0.25,
              repeat: Infinity,
              delay: i * 0.055,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Bottom label */}
      <div
        className="absolute text-center"
        style={{ left: cx - 80, top: cy + 200, width: 160 }}
      >
        <span className="text-[8px] font-mono tracking-[0.18em] text-indigo-400/50 uppercase">
          CareTrack · AI Core
        </span>
      </div>

      {/* Floating mini info cards */}
      <motion.div
        className="absolute bg-white/90 backdrop-blur-sm border border-border rounded-xl px-3 py-2.5 shadow-lg"
        style={{ left: -24, top: cy - 90 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] font-bold text-foreground">Analysis Ready</span>
        </div>
        <p className="text-[9px] text-muted-foreground font-mono mt-0.5">6 symptoms reviewed</p>
      </motion.div>

      <motion.div
        className="absolute bg-white/90 backdrop-blur-sm border border-border rounded-xl px-3 py-2.5 shadow-lg"
        style={{ right: -28, top: cy + 50 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      >
        <p className="text-[9px] text-muted-foreground font-mono uppercase tracking-wide">Confidence</p>
        <div className="mt-1.5 flex items-end gap-0.5">
          {[35, 58, 45, 72, 60, 88, 74].map((h, i) => (
            <motion.div
              key={i}
              className="w-2 rounded-sm bg-indigo-500"
              style={{ height: Math.round(h * 0.28) }}
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
