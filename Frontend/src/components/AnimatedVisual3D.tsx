import { motion } from 'framer-motion'
import { Activity, Brain, Shield, Sparkles, HeartPulse, Dna, Cpu } from 'lucide-react'

interface AnimatedVisual3DProps {
  type?: 'scanner' | 'neural' | 'dna' | 'shield' | 'biometric'
  size?: 'sm' | 'md' | 'lg'
  accentColor?: string
}

export default function AnimatedVisual3D({
  type = 'scanner',
  size = 'md',
  accentColor = '#4338CA',
}: AnimatedVisual3DProps) {
  const sizeMap = {
    sm: 'w-48 h-48',
    md: 'w-72 h-72 md:w-80 md:h-80',
    lg: 'w-80 h-80 md:w-96 md:h-96',
  }

  const dim = sizeMap[size]

  return (
    <div className={`relative ${dim} flex items-center justify-center pointer-events-none select-none`}>
      {/* Outer ambient glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${accentColor}25 0%, transparent 70%)`,
        }}
        animate={{
          scale: [0.92, 1.08, 0.92],
          opacity: [0.5, 0.85, 0.5],
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Rotating 3D Rings */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 300">
        <defs>
          <linearGradient id={`grad-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818CF8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4338CA" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Outer Orbit */}
        <motion.circle
          cx="150"
          cy="150"
          r="120"
          fill="none"
          stroke={`url(#grad-${type})`}
          strokeWidth="1.5"
          strokeDasharray="6 12"
          animate={{ rotate: 360 }}
          style={{ transformOrigin: '150px 150px' }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        />

        {/* Counter Orbit */}
        <motion.ellipse
          cx="150"
          cy="150"
          rx="105"
          ry="75"
          fill="none"
          stroke={`${accentColor}40`}
          strokeWidth="1.2"
          strokeDasharray="4 8"
          animate={{ rotate: -360 }}
          style={{ transformOrigin: '150px 150px' }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />

        {/* Angled Orbit 2 */}
        <motion.ellipse
          cx="150"
          cy="150"
          rx="80"
          ry="110"
          fill="none"
          stroke="rgba(99,102,241,0.35)"
          strokeWidth="1"
          strokeDasharray="3 7"
          animate={{ rotate: 360 }}
          style={{ transformOrigin: '150px 150px' }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        />

        {/* Orbiting Satellite Nodes */}
        {[0, 90, 180, 270].map((deg, i) => {
          const angle = (deg * Math.PI) / 180
          const x = 150 + 120 * Math.cos(angle)
          const y = 150 + 120 * Math.sin(angle)
          return (
            <g key={i}>
              <motion.circle
                cx={x}
                cy={y}
                r="7"
                fill={`${accentColor}25`}
                stroke="#818CF8"
                strokeWidth="1.5"
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
              />
              <circle cx={x} cy={y} r="2.5" fill="#FFFFFF" />
            </g>
          )
        })}
      </svg>

      {/* Pulsing Concentric Waves */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-indigo-400/30"
          style={{ inset: 60 - i * 16 }}
          animate={{
            scale: [1, 1.45 + i * 0.15],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            delay: i * 0.7,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Central Glass Spherical Node */}
      <motion.div
        className="relative z-10 w-24 h-24 md:w-28 md:h-28 rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-xl border border-white/20"
        style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(99,102,241,0.9) 0%, rgba(67,56,202,0.95) 70%, rgba(30,27,75,1) 100%)',
          boxShadow: '0 12px 36px -6px rgba(67,56,202,0.65), inset 0 2px 8px rgba(255,255,255,0.35)',
        }}
        animate={{
          scale: [1, 1.05, 1],
          y: [-4, 4, -4],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Core Glow Particle */}
        <motion.div
          className="absolute w-12 h-12 rounded-full bg-white/20 blur-md"
          animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />

        {/* Dynamic Icon based on type */}
        <div className="relative z-20 text-white flex items-center justify-center">
          {type === 'scanner' && <Activity size={36} strokeWidth={2.2} className="animate-pulse" />}
          {type === 'neural' && <Brain size={36} strokeWidth={2.2} className="animate-pulse" />}
          {type === 'dna' && <Dna size={36} strokeWidth={2.2} />}
          {type === 'shield' && <Shield size={36} strokeWidth={2.2} />}
          {type === 'biometric' && <HeartPulse size={36} strokeWidth={2.2} className="animate-pulse" />}
        </div>
      </motion.div>

      {/* Floating Micro Tech Badges */}
      <motion.div
        className="absolute -top-2 right-4 bg-card/90 backdrop-blur-md border border-border/80 rounded-full px-3 py-1 text-[10px] font-mono text-accent font-semibold flex items-center gap-1.5 shadow-lg"
        animate={{ y: [0, -6, 0], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
        ML Gaussian NB 86.6%
      </motion.div>

      <motion.div
        className="absolute -bottom-2 left-4 bg-card/90 backdrop-blur-md border border-border/80 rounded-full px-3 py-1 text-[10px] font-mono text-muted-foreground font-medium flex items-center gap-1.5 shadow-lg"
        animate={{ y: [0, 6, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3.6, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}
      >
        <Sparkles size={11} className="text-amber-500" />
        713 Diseases · 377 Signals
      </motion.div>
    </div>
  )
}
