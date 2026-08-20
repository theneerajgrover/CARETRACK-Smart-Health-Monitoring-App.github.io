import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity, Brain, Wind, Heart, Eye, Ear, Zap, Droplets, Bone, Layers,
  Smile, User, MoreHorizontal, ChevronRight, Search, ArrowLeft, ArrowRight, Check
} from 'lucide-react'
import { SYMPTOM_CATEGORIES } from '../data/symptoms'
import { staggerContainer, staggerItem, buttonHover, buttonTap, fadeUp } from '../motion/variants'
import type { SelectedSymptom, Page } from '../types'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number; style?: React.CSSProperties }>> = {
  Activity, Brain, Wind, Heart, Eye, Ear, Zap, Droplets, Bone, Layers, Smile, User, MoreHorizontal,
}

interface SymptomCategoriesPageProps {
  selectedSymptoms: Record<string, SelectedSymptom>
  onSelectCategory: (categoryId: string) => void
  onNavigate: (page: Page) => void
}

export default function SymptomCategoriesPage({
  selectedSymptoms,
  onSelectCategory,
  onNavigate,
}: SymptomCategoriesPageProps) {
  const [search, setSearch] = useState('')

  const totalSelected = Object.keys(selectedSymptoms).length

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    Object.values(selectedSymptoms).forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1
    })
    return counts
  }, [selectedSymptoms])

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return SYMPTOM_CATEGORIES
    const q = search.toLowerCase()
    return SYMPTOM_CATEGORIES.filter(
      (cat) =>
        cat.label.toLowerCase().includes(q) ||
        cat.description.toLowerCase().includes(q) ||
        cat.symptoms.some((s) => s.label.toLowerCase().includes(q))
    )
  }, [search])

  return (
    <div className="min-h-screen bg-background pt-10 pb-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Progress header */}
        <motion.div className="flex items-center justify-between mb-6" variants={fadeUp} initial="hidden" animate="visible">
          <button
            onClick={() => onNavigate('patient-details')}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-[12px] font-medium transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Vitals
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-accent">STEP 02 / 04</span>
            <span className="text-[11px] text-muted-foreground">· Select Symptoms</span>
          </div>
        </motion.div>

        {/* Title */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
              What symptoms are you experiencing?
            </h1>
            <p className="mt-1 text-[12px] text-muted-foreground">
              Select any affected body system or category below to specify your exact symptoms.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-mono font-semibold bg-card">
            <span className={`w-2 h-2 rounded-full ${totalSelected > 0 ? 'bg-accent animate-pulse' : 'bg-muted-foreground'}`} />
            <span>{totalSelected} symptom{totalSelected !== 1 ? 's' : ''} reported</span>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mb-6">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search symptoms (e.g. fever, cough, chest tightness, fatigue)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-9 pr-4 rounded-xl border border-border bg-card text-[12px] text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </div>

        {/* Categories Grid — Stable card layout */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {filteredCategories.map((cat) => {
            const Icon = ICON_MAP[cat.iconName] || Activity
            const count = categoryCounts[cat.id] || 0
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`relative text-left rounded-2xl p-4 border transition-all duration-150 flex flex-col justify-between ${
                  count > 0
                    ? 'border-accent bg-indigo-50/50 dark:bg-indigo-950/20 shadow-sm'
                    : 'border-border bg-card hover:border-accent/40 hover:bg-secondary/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30` }}
                    >
                      <Icon size={18} style={{ color: cat.color }} strokeWidth={1.8} />
                    </div>
                    {count > 0 && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent text-white text-[10px] font-mono font-bold">
                        <Check size={9} strokeWidth={3} />
                        {count} active
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-[14px] text-foreground mb-1">{cat.label}</h3>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">{cat.description}</p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                  <span>{cat.symptoms.length} symptom options</span>
                  <ChevronRight size={14} className="text-accent" />
                </div>
              </button>
            )
          })}
        </motion.div>
      </div>

      {/* Floating Bottom Sticky Bar when symptoms selected */}
      {totalSelected > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border px-6 py-3.5 z-40"
        >
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[12px] font-semibold text-foreground">
                {totalSelected} symptom{totalSelected !== 1 ? 's' : ''} selected across categories
              </span>
            </div>
            <motion.button
              onClick={() => onNavigate('review')}
              className="inline-flex items-center gap-2 h-10 px-6 rounded-full bg-accent text-white font-semibold text-[12px] shadow-sm shadow-accent/25"
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              Continue to Review ({totalSelected})
              <ArrowRight size={13} />
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
