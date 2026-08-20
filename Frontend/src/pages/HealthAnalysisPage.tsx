import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Activity, Search, ShieldAlert, AlertTriangle, CheckCircle, Info,
  ArrowRight, Filter, Stethoscope, HeartPulse
} from 'lucide-react'
import AnimatedVisual3D from '../components/AnimatedVisual3D'
import { fadeUp, staggerContainer, staggerItem, buttonHover, buttonTap } from '../motion/variants'
import type { Page } from '../types'

interface HealthAnalysisPageProps {
  onNavigate: (page: Page) => void
  onStartHealthCheck: () => void
}

const RISK_TIERS = [
  {
    tier: 'Low Risk',
    color: '#059669',
    bg: 'rgba(5,150,105,0.1)',
    border: 'rgba(5,150,105,0.25)',
    description: 'Minor, self-limiting conditions (e.g., common cold, mild allergies). Self-care measures and monitoring are provided.',
  },
  {
    tier: 'Moderate Risk',
    color: '#D97706',
    bg: 'rgba(217,119,6,0.1)',
    border: 'rgba(217,119,6,0.25)',
    description: 'Conditions requiring planned clinical evaluation or primary doctor consultation (e.g., bronchitis, sinusitis).',
  },
  {
    tier: 'High Risk',
    color: '#E11D48',
    bg: 'rgba(225,29,72,0.1)',
    border: 'rgba(225,29,72,0.25)',
    description: 'Conditions that may escalate without timely medical supervision (e.g., acute infection, pneumonia, severe asthma).',
  },
  {
    tier: 'Critical / Urgent',
    color: '#DC2626',
    bg: 'rgba(220,38,38,0.15)',
    border: 'rgba(220,38,38,0.4)',
    description: 'Emergency signals (e.g., heart attack, acute stroke, severe bleeding). Immediate emergency department referral is flagged.',
  },
]

const SAMPLE_CONDITIONS = [
  { name: 'Common Cold & Upper Respiratory', category: 'Respiratory', symptoms: 12, risk: 'Low' },
  { name: 'Acute Bronchitis & Asthma', category: 'Pulmonary', symptoms: 18, risk: 'Moderate' },
  { name: 'Gastroenteritis & Acid Reflux', category: 'Digestive', symptoms: 15, risk: 'Moderate' },
  { name: 'Migraine & Tension Headache', category: 'Neurological', symptoms: 9, risk: 'Moderate' },
  { name: 'Coronary Angina & Arrhythmia', category: 'Cardiovascular', symptoms: 24, risk: 'Critical' },
  { name: 'Deep Vein Thrombosis (DVT)', category: 'Vascular', symptoms: 14, risk: 'High' },
]

export default function HealthAnalysisPage({ onNavigate, onStartHealthCheck }: HealthAnalysisPageProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = SAMPLE_CONDITIONS.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header Hero */}
        <div className="grid lg:grid-cols-12 gap-10 items-center mb-16">
          <motion.div
            className="lg:col-span-7"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent-subtle text-[11px] font-mono font-semibold text-accent mb-4">
              <Stethoscope size={12} />
              CLINICAL COVERAGE & PROTOCOLS
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Comprehensive <br />
              <span className="text-accent">Health Analysis & Risk Stratification</span>
            </h1>
            <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground max-w-xl">
              CareTrack AI cross-references 377 physiological signals against 713 condition profiles to calculate probabilistic matches and assign clinically validated risk tiers.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <motion.button
                onClick={onStartHealthCheck}
                className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-accent text-white text-[13px] font-semibold shadow-lg shadow-accent/25"
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                Start Your Analysis
                <ArrowRight size={14} />
              </motion.button>
            </div>
          </motion.div>

          <div className="lg:col-span-5 flex justify-center">
            <AnimatedVisual3D type="biometric" size="md" />
          </div>
        </div>

        {/* 4 Risk Tiers */}
        <div className="mb-14">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-foreground">Four-Tier Risk Classification System</h2>
            <p className="text-[13px] text-muted-foreground">Every predicted condition is analyzed for severity to provide actionable next steps.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RISK_TIERS.map((tier) => (
              <div
                key={tier.tier}
                className="rounded-2xl p-5 border flex flex-col justify-between"
                style={{ backgroundColor: tier.bg, borderColor: tier.border }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tier.color }} />
                    <h3 className="font-bold text-[14px]" style={{ color: tier.color }}>{tier.tier}</h3>
                  </div>
                  <p className="text-[12px] leading-relaxed text-muted-foreground mt-2">{tier.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Searchable Condition Explorer */}
        <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">Disease Profile Catalog</h2>
              <p className="text-[12px] text-muted-foreground">Exploring across all 713 ML-classified medical conditions.</p>
            </div>
            <div className="relative w-full md:w-72">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search conditions or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-9 pr-4 rounded-xl border border-border bg-background text-[12px] text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((item) => (
              <div
                key={item.name}
                className="p-4 rounded-xl border border-border/80 bg-background/60 hover:border-accent/40 transition-all flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      {item.category}
                    </span>
                    <h4 className="font-semibold text-[13px] text-foreground mt-0.5">{item.name}</h4>
                  </div>
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold"
                    style={{
                      backgroundColor: item.risk === 'Critical' ? 'rgba(220,38,38,0.15)' : 'rgba(67,56,202,0.1)',
                      color: item.risk === 'Critical' ? '#DC2626' : '#4338CA',
                    }}
                  >
                    {item.risk}
                  </span>
                </div>
                <div className="mt-3 pt-2 border-t border-border/40 text-[11px] text-muted-foreground">
                  Correlates with ~{item.symptoms} symptom indicators
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
