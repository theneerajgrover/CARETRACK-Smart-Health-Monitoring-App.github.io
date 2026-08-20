import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Edit2, User, Shield, Activity, Heart, Sparkles } from 'lucide-react'
import { SYMPTOM_CATEGORIES } from '../data/symptoms'
import { staggerContainer, staggerItem, buttonHover, buttonTap, fadeUp } from '../motion/variants'
import type { PatientDetails, SelectedSymptom, Page } from '../types'

interface ReviewPageProps {
  patientDetails: PatientDetails
  selectedSymptoms: Record<string, SelectedSymptom>
  onNavigate: (page: Page) => void
  onEditSymptoms: () => void
}

export default function ReviewPage({
  patientDetails,
  selectedSymptoms,
  onNavigate,
  onEditSymptoms,
}: ReviewPageProps) {
  const total = Object.keys(selectedSymptoms).length
  const byCategory = SYMPTOM_CATEGORIES.map((cat) => ({
    category: cat,
    symptoms: cat.symptoms.filter((s) => selectedSymptoms[s.key]),
  })).filter((g) => g.symptoms.length > 0)

  return (
    <div className="min-h-screen bg-background pt-10 pb-16 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Progress header */}
        <motion.div className="flex items-center justify-between mb-6" variants={fadeUp} initial="hidden" animate="visible">
          <button
            onClick={() => onNavigate('symptom-categories')}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-[12px] font-medium transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Symptoms
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-accent">STEP 03 / 04</span>
            <span className="text-[11px] text-muted-foreground">· Final Review</span>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div className="mb-6" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            Review Your Assessment Profile
          </h1>
          <p className="mt-1 text-[12px] text-muted-foreground leading-relaxed">
            Verify patient vitals and reported symptoms before initializing machine learning inference.
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-4">
          {/* Patient vitals card */}
          <motion.div variants={staggerItem} className="bg-card border border-border rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/60">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-secondary text-foreground flex items-center justify-center">
                  <User size={14} />
                </div>
                <h2 className="font-bold text-[13px] text-foreground">Patient Vitals Profile</h2>
              </div>
              <button
                onClick={() => onNavigate('patient-details')}
                className="flex items-center gap-1 text-[11px] text-accent font-semibold hover:underline"
              >
                <Edit2 size={11} />
                Edit Vitals
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[12px]">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-mono mb-0.5">FULL NAME</p>
                <p className="font-semibold text-foreground">{patientDetails.name || '—'}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-mono mb-0.5">AGE & GENDER</p>
                <p className="font-semibold text-foreground">
                  {patientDetails.age ? `${patientDetails.age} yrs` : '—'} · {patientDetails.gender || '—'}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-mono mb-0.5">BLOOD GROUP</p>
                <p className="font-semibold text-accent">{patientDetails.bloodGroup || 'O+'}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-mono mb-0.5">HEIGHT & WEIGHT</p>
                <p className="font-semibold text-foreground">
                  {patientDetails.height ? `${patientDetails.height} cm` : '—'} · {patientDetails.weight ? `${patientDetails.weight} kg` : '—'}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-mono mb-0.5">DATE OF BIRTH</p>
                <p className="font-semibold text-foreground">{patientDetails.dob || '—'}</p>
              </div>
            </div>
          </motion.div>

          {/* Selected Symptoms Card */}
          <motion.div variants={staggerItem} className="bg-card border border-border rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/60">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-accent-subtle text-accent flex items-center justify-center">
                  <Activity size={14} />
                </div>
                <h2 className="font-bold text-[13px] text-foreground flex items-center gap-2">
                  Reported Symptoms
                  <span className="px-2 py-0.5 rounded-full bg-accent-subtle text-accent text-[10px] font-mono font-bold">
                    {total}
                  </span>
                </h2>
              </div>
              <button
                onClick={onEditSymptoms}
                className="flex items-center gap-1 text-[11px] text-accent font-semibold hover:underline"
              >
                <Edit2 size={11} />
                Modify
              </button>
            </div>

            {byCategory.length > 0 ? (
              <div className="flex flex-col gap-3">
                {byCategory.map(({ category, symptoms }) => (
                  <div key={category.id} className="text-[12px]">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block mb-1.5">
                      {category.label} ({symptoms.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {symptoms.map((s) => (
                        <span
                          key={s.key}
                          className="px-2.5 py-1 rounded-full bg-secondary text-foreground text-[11px] font-medium border border-border/60"
                        >
                          {s.label}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[12px] text-muted-foreground italic">No symptoms selected yet.</p>
            )}
          </motion.div>

          {/* Action CTA */}
          <div className="pt-2 flex items-center justify-between gap-4">
            <button
              onClick={() => onNavigate('symptom-categories')}
              className="text-[12px] font-medium text-muted-foreground hover:text-foreground"
            >
              Add More Symptoms
            </button>
            <motion.button
              onClick={() => onNavigate('analyzing')}
              disabled={total === 0}
              className="inline-flex items-center gap-2 h-11 px-7 rounded-full bg-accent text-white font-semibold text-[13px] shadow-lg shadow-accent/25 disabled:opacity-40"
              whileHover={total > 0 ? buttonHover : {}}
              whileTap={total > 0 ? buttonTap : {}}
            >
              <Sparkles size={14} />
              Run Health AI Analysis
              <ArrowRight size={13} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
