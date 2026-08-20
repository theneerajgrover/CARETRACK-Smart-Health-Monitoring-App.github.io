import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity, Brain, Wind, Heart, Eye, Ear, Zap, Droplets, Bone, Layers,
  Smile, User, MoreHorizontal, ArrowLeft, ArrowRight, Check, Search,
} from 'lucide-react'
import { SYMPTOM_CATEGORIES } from '../data/symptoms'
import { staggerContainer, staggerItem, buttonHover, buttonTap, fadeUp } from '../motion/variants'
import type { SelectedSymptom, Page } from '../types'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties; strokeWidth?: number }>> = {
  Activity, Brain, Wind, Heart, Eye, Ear, Zap, Droplets, Bone, Layers, Smile, User, MoreHorizontal,
}

interface SymptomSubcategoryPageProps {
  categoryId: string
  selectedSymptoms: Record<string, SelectedSymptom>
  onToggle: (symptom: SelectedSymptom) => void
  onNavigate: (page: Page) => void
  onSelectMore: () => void
}

export default function SymptomSubcategoryPage({
  categoryId,
  selectedSymptoms,
  onToggle,
  onNavigate,
  onSelectMore,
}: SymptomSubcategoryPageProps) {
  const [search, setSearch] = useState('')
  const category = SYMPTOM_CATEGORIES.find((c) => c.id === categoryId)
  if (!category) return null

  const Icon = ICON_MAP[category.iconName] || Activity
  const filtered = useMemo(() => {
    if (!search.trim()) return category.symptoms
    const q = search.toLowerCase()
    return category.symptoms.filter((s) => s.label.toLowerCase().includes(q))
  }, [category, search])

  const selectedInCategory = category.symptoms.filter((s) => selectedSymptoms[s.key]).length
  const totalSelected = Object.keys(selectedSymptoms).length

  return (
    <div className="min-h-screen bg-background pt-10 pb-40 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Progress & Breadcrumb */}
        <motion.div className="flex items-center justify-between mb-6" variants={fadeUp} initial="hidden" animate="visible">
          <button
            onClick={onSelectMore}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-[12px] font-medium"
          >
            <ArrowLeft size={14} />
            All Categories
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-accent">STEP 02 / 04</span>
            <span className="text-[11px] text-muted-foreground">· Select Symptoms</span>
          </div>
        </motion.div>

        {/* Category Header */}
        <motion.div
          className="mb-6 rounded-2xl border border-border bg-card p-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${category.color}15`, border: `1px solid ${category.color}30` }}
              >
                <Icon size={20} style={{ color: category.color }} strokeWidth={1.8} />
              </div>
              <div>
                <h1 className="font-extrabold text-xl tracking-tight text-foreground">{category.label}</h1>
                <p className="text-[12px] text-muted-foreground">{category.description}</p>
              </div>
            </div>

            <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-accent-subtle text-accent border border-accent/20">
              {selectedInCategory} selected
            </span>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div className="relative mb-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={`Search ${category.label.toLowerCase()} symptoms...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-xl border border-border bg-card text-[12px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
          />
        </motion.div>

        {/* Symptom Grid — Stable Hover, No Position Shifting */}
        <motion.div
          className="grid sm:grid-cols-2 gap-2.5"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {filtered.map((symptom) => {
            const isSelected = !!selectedSymptoms[symptom.key]
            return (
              <button
                key={symptom.key}
                type="button"
                onClick={() => onToggle({ key: symptom.key, label: symptom.label, category: category.id, categoryLabel: category.label })}
                className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-150 ${
                  isSelected
                    ? 'border-accent bg-indigo-50/70 dark:bg-indigo-950/30 ring-1 ring-accent/30 shadow-sm'
                    : 'border-border bg-card hover:border-accent/40 hover:bg-secondary/40'
                }`}
              >
                {/* Custom Checkbox */}
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected ? 'bg-accent text-white' : 'border border-border bg-background'
                  }`}
                >
                  {isSelected && <Check size={10} strokeWidth={3} />}
                </div>

                <span className={`text-[12.5px] font-medium leading-snug ${isSelected ? 'text-accent font-semibold' : 'text-foreground'}`}>
                  {symptom.label}
                </span>
              </button>
            )
          })}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-10">
            <p className="text-muted-foreground text-[12px]">No symptoms match "{search}"</p>
            <button onClick={() => setSearch('')} className="mt-2 text-accent text-[12px] font-medium">
              Clear search filter
            </button>
          </div>
        )}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border px-6 py-3.5 z-40">
        <div className="max-w-3xl mx-auto flex flex-col gap-2">
          {/* Selected chips strip */}
          <AnimatePresence>
            {totalSelected > 0 && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                <span className="text-[10px] font-mono text-muted-foreground uppercase mr-1">Selected:</span>
                {Object.values(selectedSymptoms).map((s) => (
                  <span
                    key={s.key}
                    className="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent-subtle border border-accent/20 text-[10px] font-semibold text-accent font-mono"
                  >
                    <Check size={8} strokeWidth={3} />
                    {s.label}
                  </span>
                ))}
              </div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={onSelectMore}
              className="flex-1 h-10 rounded-full border border-border text-[12px] font-semibold text-foreground bg-background hover:bg-secondary transition-colors"
              whileTap={buttonTap}
            >
              Browse Other Categories
            </motion.button>
            <motion.button
              onClick={() => onNavigate('review')}
              disabled={totalSelected === 0}
              className="flex-1 h-10 rounded-full bg-accent text-white font-semibold text-[12px] flex items-center justify-center gap-2 disabled:opacity-40 shadow-sm shadow-accent/25"
              whileHover={totalSelected > 0 ? buttonHover : {}}
              whileTap={totalSelected > 0 ? buttonTap : {}}
            >
              Review & Analyze ({totalSelected})
              <ArrowRight size={13} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}
