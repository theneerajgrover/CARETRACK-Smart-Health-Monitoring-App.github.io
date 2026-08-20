import { motion } from 'framer-motion'
import {
  Shield, Lock, Heart, Award, CheckCircle2, Cpu,
  Database, Activity, ArrowRight, UserCheck
} from 'lucide-react'
import AnimatedVisual3D from '../components/AnimatedVisual3D'
import { fadeUp, staggerContainer, staggerItem, buttonHover, buttonTap } from '../motion/variants'
import type { Page } from '../types'

interface AboutPageProps {
  onNavigate: (page: Page) => void
  onStartHealthCheck: () => void
}

const VALUES = [
  {
    icon: Lock,
    title: 'Zero Data Compromise',
    description: 'We do not sell or monetize personal health data. Session tokens and vitals records are protected with industry-standard bcrypt hashing and JWT authentication.',
  },
  {
    icon: Award,
    title: 'Clinical AI Precision',
    description: 'Trained on 246,945 verified multi-label clinical datasets, yielding 86.58% classification accuracy across 713 distinct diagnostic targets.',
  },
  {
    icon: Shield,
    title: 'Responsible AI Safety',
    description: 'Our system integrates AI clinical safety protocols to detect high-risk signals immediately, directing patients to professional medical care when warranted.',
  },
  {
    icon: UserCheck,
    title: 'Patient-First Ergonomics',
    description: 'Designed to reduce cognitive load and triage anxiety with clear probability scores, lifestyle remedies, and clean digital health reports.',
  },
]

export default function AboutPage({ onNavigate, onStartHealthCheck }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-12 gap-10 items-center mb-16">
          <motion.div
            className="lg:col-span-7"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent-subtle text-[11px] font-mono font-semibold text-accent mb-4">
              <Heart size={12} />
              ABOUT CARETRACK AI
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Empowering Patients with <br />
              <span className="text-accent">Intelligent Clinical Guidance</span>
            </h1>
            <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground max-w-xl">
              CareTrack AI was built to solve the frustration of unorganized symptom searching. We combine verified probabilistic machine learning with AI clinical synthesis to deliver fast, structured, and responsible health clarity.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <motion.button
                onClick={onStartHealthCheck}
                className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-accent text-white text-[13px] font-semibold shadow-lg shadow-accent/25"
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                Experience the Platform
                <ArrowRight size={14} />
              </motion.button>
              <motion.button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-border bg-card text-foreground text-[13px] font-medium hover:bg-secondary transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>

          <div className="lg:col-span-5 flex justify-center">
            <AnimatedVisual3D type="shield" size="md" />
          </div>
        </div>

        {/* Core Values / Architecture Pillars */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-5 mb-14"
        >
          {VALUES.map((val) => {
            const Icon = val.icon
            return (
              <motion.div
                key={val.title}
                variants={staggerItem}
                className="rounded-2xl border border-border bg-card p-6 hover:border-accent/40 transition-colors shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-accent-subtle text-accent flex items-center justify-center mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-[16px] text-foreground mb-2">{val.title}</h3>
                <p className="text-[13px] leading-relaxed text-muted-foreground">{val.description}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Technology Stack Grid */}
        <div className="rounded-3xl border border-border bg-card p-8 text-center md:text-left">
          <h2 className="text-xl font-bold text-foreground mb-1">Architecture & Technology Stack</h2>
          <p className="text-[13px] text-muted-foreground mb-6">Engineered for sub-second responses and high fault tolerance.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-border/70 bg-background">
              <span className="text-[11px] font-mono text-accent font-bold">ML ENGINE</span>
              <p className="font-bold text-[14px] text-foreground mt-1">Gaussian Naive Bayes</p>
              <p className="text-[11px] text-muted-foreground">Scikit-Learn · 86.6% Acc</p>
            </div>
            <div className="p-4 rounded-xl border border-border/70 bg-background">
              <span className="text-[11px] font-mono text-accent font-bold">CLINICAL ADVISORY</span>
              <p className="font-bold text-[14px] text-foreground mt-1">Clinical AI Engine</p>
              <p className="text-[11px] text-muted-foreground">Remedies & Warnings</p>
            </div>
            <div className="p-4 rounded-xl border border-border/70 bg-background">
              <span className="text-[11px] font-mono text-accent font-bold">BACKEND</span>
              <p className="font-bold text-[14px] text-foreground mt-1">Flask REST API</p>
              <p className="text-[11px] text-muted-foreground">Python 3.11 · Threaded</p>
            </div>
            <div className="p-4 rounded-xl border border-border/70 bg-background">
              <span className="text-[11px] font-mono text-accent font-bold">DATABASE</span>
              <p className="font-bold text-[14px] text-foreground mt-1">PostgreSQL</p>
              <p className="text-[11px] text-muted-foreground">Relational Vector Pool</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
