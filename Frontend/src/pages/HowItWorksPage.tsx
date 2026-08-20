import { motion } from 'framer-motion'
import {
  Activity, ArrowRight, Brain, Cpu, Database, CheckCircle2,
  Sparkles, ShieldCheck, FileCheck, Layers
} from 'lucide-react'
import AnimatedVisual3D from '../components/AnimatedVisual3D'
import { fadeUp, staggerContainer, staggerItem, buttonHover, buttonTap } from '../motion/variants'
import type { Page } from '../types'

interface HowItWorksPageProps {
  onNavigate: (page: Page) => void
  onStartHealthCheck: () => void
}

const STEPS = [
  {
    number: '01',
    title: 'Symptom & Vitals Intake',
    description: 'Provide your primary physical signals, patient vitals (Blood Group, Height, Weight), and timeline. The system cleanses and maps inputs to standard clinical descriptors.',
    icon: Activity,
    highlight: '377 Standardized Signals',
  },
  {
    number: '02',
    title: 'One-Hot Clinical Vectorization',
    description: 'Reported symptoms are converted into high-dimensional binary vectors matching the 246,945 clinical case records in the CareTrack ML repository.',
    icon: Database,
    highlight: 'Zero-Noise Normalization',
  },
  {
    number: '03',
    title: 'Gaussian Naive Bayes ML Inference',
    description: 'Our trained Gaussian probabilistic classifier computes the posterior likelihood across 713 disease categories in under 1.5 seconds with 86.58% accuracy.',
    icon: Brain,
    highlight: '713 Disease Classifiers',
  },
  {
    number: '04',
    title: 'AI Clinical Safety & Triage Advisory',
    description: 'High-risk predictions trigger immediate clinical safety warnings. For mild conditions, AI-synthesized home care guidance and doctor consultation notes are compiled.',
    icon: ShieldCheck,
    highlight: 'Automated Risk Stratification',
  },
]

const PIPELINE_METRICS = [
  { label: 'Training Set Size', value: '246,945', sub: 'Verified medical cases' },
  { label: 'Gaussian NB Accuracy', value: '86.58%', sub: 'High precision rating' },
  { label: 'Detectable Diseases', value: '713', sub: 'Comprehensive coverage' },
  { label: 'Avg Prediction Latency', value: '< 45ms', sub: 'Ultra-fast inference' },
]

export default function HowItWorksPage({ onNavigate, onStartHealthCheck }: HowItWorksPageProps) {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header Hero Section */}
        <div className="grid lg:grid-cols-12 gap-10 items-center mb-16">
          <motion.div
            className="lg:col-span-7"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent-subtle text-[11px] font-mono font-semibold text-accent mb-4">
              <Cpu size={12} />
              CLINICAL ML PIPELINE EXPLAINED
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              How CareTrack AI <br />
              <span className="text-accent">Transforms Symptoms into Insights</span>
            </h1>
            <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground max-w-xl">
              CareTrack AI bridges patient symptoms with machine learning and medical intelligence. Learn how our 4-stage pipeline turns your inputs into validated risk assessments.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <motion.button
                onClick={onStartHealthCheck}
                className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-accent text-white text-[13px] font-semibold shadow-lg shadow-accent/25"
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                Try Free Health Check
                <ArrowRight size={14} />
              </motion.button>
              <motion.button
                onClick={() => onNavigate('health-analysis')}
                className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-border bg-card text-foreground text-[13px] font-medium hover:bg-secondary transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Diseases
              </motion.button>
            </div>
          </motion.div>

          <div className="lg:col-span-5 flex justify-center">
            <AnimatedVisual3D type="neural" size="md" />
          </div>
        </div>

        {/* 4 Interactive Process Steps */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16"
        >
          {STEPS.map((step) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                variants={staggerItem}
                className="relative rounded-2xl border border-border bg-card p-6 flex flex-col justify-between hover:border-accent/40 transition-colors shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[12px] font-mono font-bold text-accent px-2 py-0.5 rounded-md bg-accent-subtle">
                      STEP {step.number}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-accent">
                      <Icon size={16} />
                    </div>
                  </div>
                  <h3 className="font-bold text-[16px] text-foreground mb-2">{step.title}</h3>
                  <p className="text-[12px] leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/60">
                  <span className="text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                    ✓ {step.highlight}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* ML Performance Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-foreground text-background p-8 relative overflow-hidden"
        >
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            {PIPELINE_METRICS.map((m) => (
              <div key={m.label} className="border-r last:border-none border-white/10 pr-4">
                <p className="text-2xl md:text-3xl font-extrabold text-white">{m.value}</p>
                <p className="text-[12px] font-medium text-white/80 mt-1">{m.label}</p>
                <p className="text-[10px] text-white/40 mt-0.5 font-mono">{m.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
