import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Activity, User, Heart, Scale, Ruler, Droplets } from 'lucide-react'
import { fadeUp, buttonHover, buttonTap } from '../motion/variants'
import type { PatientDetails, Page } from '../types'

interface PatientDetailsPageProps {
  details: PatientDetails
  onSave: (details: PatientDetails) => void
  onNavigate: (page: Page) => void
}

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'Unknown']

export default function PatientDetailsPage({ details, onSave, onNavigate }: PatientDetailsPageProps) {
  const [form, setForm] = useState<PatientDetails>({
    name: details.name || '',
    age: details.age || '',
    gender: details.gender || 'male',
    dob: details.dob || '',
    bloodGroup: details.bloodGroup || 'O+',
    height: details.height || '',
    weight: details.weight || '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Patient name is required'
    if (!form.age.trim() || isNaN(Number(form.age)) || Number(form.age) <= 0) {
      errs.age = 'Valid age is required'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleContinue(e: React.FormEvent) {
    e.preventDefault()
    if (validate()) {
      onSave(form)
      onNavigate('symptom-categories')
    }
  }

  function set(key: keyof PatientDetails, val: string) {
    setForm((prev) => ({ ...prev, [key]: val }))
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }

  const inputClass = (hasError?: boolean) =>
    `w-full h-11 px-3.5 rounded-xl border text-[13px] text-foreground bg-card placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${
      hasError ? 'border-critical focus:ring-critical/30' : 'border-border focus:ring-accent/30 focus:border-accent'
    }`

  return (
    <div className="min-h-screen bg-background pt-10 pb-12 px-6 flex flex-col justify-center items-center">
      <div className="max-w-xl w-full">
        {/* Progress & Exit Header */}
        <motion.div
          className="flex items-center justify-between mb-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-[12px] font-medium transition-colors"
          >
            <ArrowLeft size={14} />
            Exit Assessment
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-accent">STEP 01 / 04</span>
            <span className="text-[11px] text-muted-foreground">· Patient Vitals</span>
          </div>
        </motion.div>

        {/* Card Container */}
        <motion.div
          className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-md bg-accent-subtle text-accent flex items-center justify-center">
                <User size={13} />
              </div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                Patient Details & Vitals
              </h1>
            </div>
            <p className="text-[12px] text-muted-foreground leading-relaxed">
              Enter the patient's basic vitals to calibrate disease prediction priors and age-specific baseline risks.
            </p>
          </div>

          <form onSubmit={handleContinue} className="flex flex-col gap-4">
            {/* Full Name */}
            <div>
              <label className="text-[11px] font-semibold text-foreground mb-1 block">Full Name *</label>
              <input
                type="text"
                placeholder="e.g. Alex Morgan"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                className={inputClass(!!errors.name)}
              />
              {errors.name && <p className="text-[11px] text-critical mt-1">{errors.name}</p>}
            </div>

            {/* Age & Gender Grid */}
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="text-[11px] font-semibold text-foreground mb-1 block">Age (Years) *</label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  placeholder="e.g. 32"
                  value={form.age}
                  onChange={(e) => set('age', e.target.value)}
                  className={inputClass(!!errors.age)}
                />
                {errors.age && <p className="text-[11px] text-critical mt-1">{errors.age}</p>}
              </div>

              <div>
                <label className="text-[11px] font-semibold text-foreground mb-1 block">Biological Gender</label>
                <select
                  value={form.gender}
                  onChange={(e) => set('gender', e.target.value)}
                  className={inputClass()}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other / Non-Binary</option>
                </select>
              </div>
            </div>

            {/* DOB & Blood Group Grid */}
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="text-[11px] font-semibold text-foreground mb-1 block">Date of Birth</label>
                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) => set('dob', e.target.value)}
                  className={inputClass()}
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-foreground mb-1 block">Blood Group</label>
                <select
                  value={form.bloodGroup}
                  onChange={(e) => set('bloodGroup', e.target.value)}
                  className={inputClass()}
                >
                  {BLOOD_GROUPS.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Height & Weight Grid */}
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="text-[11px] font-semibold text-foreground mb-1 flex items-center gap-1">
                  <Ruler size={12} className="text-muted-foreground" />
                  Height (cm)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 175"
                  value={form.height}
                  onChange={(e) => set('height', e.target.value)}
                  className={inputClass()}
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-foreground mb-1 flex items-center gap-1">
                  <Scale size={12} className="text-muted-foreground" />
                  Weight (kg)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 70"
                  value={form.weight}
                  onChange={(e) => set('weight', e.target.value)}
                  className={inputClass()}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-accent text-white font-semibold text-[13px] shadow-md shadow-accent/25"
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                Continue to Symptoms
                <ArrowRight size={13} />
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
