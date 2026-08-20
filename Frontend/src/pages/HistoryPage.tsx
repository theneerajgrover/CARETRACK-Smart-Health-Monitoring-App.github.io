import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  History, Calendar, User, Activity, AlertTriangle, ArrowRight,
  ChevronDown, ChevronUp, FileText, Sparkles, RefreshCw, AlertCircle,
  ExternalLink, Stethoscope, HeartPulse, Printer
} from 'lucide-react'
import { getPredictionHistory, getPredictionDetails } from '../services/api'
import { fadeUp, staggerContainer, staggerItem, buttonHover, buttonTap } from '../motion/variants'
import type { Page, HistoryItem, PatientDetails, SelectedSymptom, PredictionResponse } from '../types'

interface HistoryPageProps {
  onNavigate: (page: Page) => void
  onStartHealthCheck: () => void
  onViewFullReport: (
    predictionData: PredictionResponse,
    patientDetails: PatientDetails,
    selectedSymptoms: Record<string, SelectedSymptom>
  ) => void
  isAuthenticated: boolean
}

export default function HistoryPage({
  onNavigate,
  onStartHealthCheck,
  onViewFullReport,
  isAuthenticated,
}: HistoryPageProps) {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [selectedDetails, setSelectedDetails] = useState<any | null>(null)
  const [detailsLoading, setDetailsLoading] = useState(false)
  const [openingFullReportId, setOpeningFullReportId] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false)
      return
    }
    loadHistory()
  }, [isAuthenticated])

  async function loadHistory() {
    setLoading(true)
    setError(null)
    try {
      const items = await getPredictionHistory()
      setHistory(items)
    } catch (err: any) {
      setError(err.message || 'Failed to load past health assessments.')
    } finally {
      setLoading(false)
    }
  }

  async function toggleExpand(id: string) {
    if (expandedId === id) {
      setExpandedId(null)
      setSelectedDetails(null)
      return
    }
    setExpandedId(id)
    setDetailsLoading(true)
    try {
      const details = await getPredictionDetails(id)
      setSelectedDetails(details)
    } catch (err) {
      console.error(err)
    } finally {
      setDetailsLoading(false)
    }
  }

  async function handleOpenFullReport(id: string) {
    setOpeningFullReportId(id)
    try {
      const raw = await getPredictionDetails(id)
      if (!raw) return

      // Transform raw API data into structured frontend types
      const patient: PatientDetails = {
        name: raw.patient?.name || '',
        age: String(raw.patient?.age || ''),
        gender: raw.patient?.gender || 'male',
        dob: raw.patient?.dob || '',
        bloodGroup: raw.patient?.blood_group || 'O+',
        height: String(raw.patient?.height || ''),
        weight: String(raw.patient?.weight || ''),
      }

      const symptomsMap: Record<string, SelectedSymptom> = {}
      if (raw.symptoms && Array.isArray(raw.symptoms)) {
        raw.symptoms.forEach((s: any) => {
          symptomsMap[s.key] = {
            key: s.key,
            label: s.label || s.key.replace(/_/g, ' '),
            category: 'general',
            categoryLabel: 'General',
          }
        })
      }

      const prediction: PredictionResponse = {
        prediction_id: raw.id,
        predictions: (raw.results || []).map((r: any) => ({
          rank: r.rank,
          disease: r.disease,
          disease_id: r.disease_id,
          confidence: Number(r.confidence || 0),
          risk_level: r.risk_level || 'low',
          doctor: r.doctor || 'General Physician',
          remedies: r.remedies,
          warning: r.warning,
        })),
        symptom_ids: raw.symptom_ids || [],
        symptoms_matched: (raw.symptoms || []).map((s: any) => s.key),
        symptoms_unmatched: [],
        timestamp: raw.created_at || new Date().toISOString(),
      }

      onViewFullReport(prediction, patient, symptomsMap)
    } catch (err) {
      console.error('Failed to load full report', err)
    } finally {
      setOpeningFullReportId(null)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 px-6 flex items-center justify-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="max-w-md w-full text-center rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-md"
        >
          <div className="w-13 h-13 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4 p-3 border border-indigo-100">
            <History size={26} />
          </div>
          <h2 className="text-xl font-extrabold text-slate-950">Sign In to View Assessment History</h2>
          <p className="text-[13px] text-slate-600 mt-2 mb-6 font-medium leading-relaxed">
            Your longitudinal health records, full clinical prediction reports, and home remedies are securely preserved in your account.
          </p>
          <div className="flex flex-col gap-3">
            <motion.button
              onClick={() => onNavigate('auth')}
              className="h-11 rounded-full bg-indigo-600 text-white font-bold text-[13px] shadow-md shadow-indigo-600/30"
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              Sign In to Your Account
            </motion.button>
            <button
              onClick={onStartHealthCheck}
              className="h-11 rounded-full border-2 border-slate-200 bg-white text-slate-800 font-bold text-[13px] hover:bg-slate-50 transition-colors"
            >
              Start Free Health Check
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-16 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-200 bg-indigo-50 text-[11px] font-mono font-bold text-indigo-700 mb-2">
              <History size={13} />
              PATIENT HEALTH RECORDS
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-950">
              Assessment History & Reports
            </h1>
            <p className="text-[13px] text-slate-600 font-medium mt-1">
              Select any past assessment below to preview findings or click <strong>View Full Report</strong> for the complete document.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <motion.button
              onClick={loadHistory}
              className="p-2.5 rounded-xl border-2 border-slate-200 bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-colors shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Refresh database records"
            >
              <RefreshCw size={15} className={loading ? 'animate-spin text-indigo-600' : ''} />
            </motion.button>
            <motion.button
              onClick={onStartHealthCheck}
              className="inline-flex items-center gap-1.5 h-10 px-5 rounded-full bg-indigo-600 text-white text-[12.5px] font-bold shadow-md shadow-indigo-600/30"
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              <Activity size={14} />
              New Assessment
            </motion.button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <RefreshCw size={32} className="text-indigo-600 animate-spin mb-3" />
            <p className="text-[14px] font-bold text-slate-900">Loading your medical records...</p>
            <p className="text-[12px] text-slate-500 mt-0.5">Fetching from PostgreSQL</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="p-6 rounded-2xl border-2 border-red-300 bg-red-50 text-red-950 text-center my-8 shadow-sm">
            <AlertCircle size={26} className="mx-auto mb-2 text-red-600" />
            <p className="text-[13.5px] font-bold">{error}</p>
            <button
              onClick={loadHistory}
              className="mt-3 px-5 py-1.5 rounded-full bg-red-600 text-white text-[12px] font-bold shadow-sm"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && history.length === 0 && (
          <div className="py-16 text-center rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-sm">
            <div className="w-13 h-13 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto mb-3">
              <FileText size={24} />
            </div>
            <h3 className="font-extrabold text-lg text-slate-950">No Past Health Assessments Found</h3>
            <p className="text-[13px] text-slate-600 mt-1 max-w-sm mx-auto mb-6 font-medium">
              You haven't run any health checks on this account yet. Start your first checkup to record symptoms and receive AI clinical reports.
            </p>
            <motion.button
              onClick={onStartHealthCheck}
              className="h-11 px-7 rounded-full bg-indigo-600 text-white text-[13px] font-bold shadow-md shadow-indigo-600/30"
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              Start First Health Check
            </motion.button>
          </div>
        )}

        {/* Assessment Records List */}
        {!loading && !error && history.length > 0 && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4"
          >
            {history.map((item) => {
              const isExpanded = expandedId === item.id
              const isOpening = openingFullReportId === item.id
              const formattedDate = item.created_at
                ? new Date(item.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'Recent'

              return (
                <motion.div
                  key={item.id}
                  variants={staggerItem}
                  className="rounded-2xl border-2 border-slate-200 bg-white overflow-hidden shadow-sm hover:border-slate-300 transition-all"
                >
                  {/* Card Header & Preview */}
                  <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/50">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center flex-shrink-0 border border-indigo-200">
                        <Activity size={20} />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-black text-[15px] sm:text-[16px] text-slate-950 capitalize">
                            {item.top_disease || 'Health Assessment'}
                          </h3>
                          {item.top_confidence && (
                            <span className="text-[11px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-600 text-white shadow-sm">
                              {item.top_confidence.toFixed(1)}% Match
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-[12px] text-slate-600 font-medium mt-1">
                          <span className="flex items-center gap-1 font-semibold text-slate-800">
                            <User size={12} className="text-indigo-600" />
                            {item.patient_name || 'Patient'}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {formattedDate}
                          </span>
                          <span>•</span>
                          <span>{item.symptom_ids?.length || 0} Symptoms</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 self-end sm:self-center w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-none border-slate-200">
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="h-9 px-3.5 rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 text-[12px] font-bold flex items-center gap-1 transition-colors"
                      >
                        <span>{isExpanded ? 'Hide' : 'Quick Preview'}</span>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>

                      {/* Primary View Full Report Button */}
                      <motion.button
                        onClick={() => handleOpenFullReport(item.id)}
                        disabled={isOpening}
                        className="h-9 px-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] font-extrabold flex items-center gap-1.5 shadow-md shadow-indigo-600/25 transition-all disabled:opacity-50"
                        whileHover={buttonHover}
                        whileTap={buttonTap}
                      >
                        {isOpening ? (
                          <>
                            <RefreshCw size={13} className="animate-spin" />
                            <span>Loading Report...</span>
                          </>
                        ) : (
                          <>
                            <FileText size={13} />
                            <span>View Full Report</span>
                            <ArrowRight size={12} />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Expanded Quick Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-5 border-t-2 border-slate-200 bg-white"
                      >
                        {detailsLoading ? (
                          <div className="py-6 text-center text-[13px] font-semibold text-slate-600 flex items-center justify-center gap-2">
                            <RefreshCw size={15} className="animate-spin text-indigo-600" />
                            Loading assessment details...
                          </div>
                        ) : selectedDetails ? (
                          <div className="flex flex-col gap-4">
                            {/* Patient Quick Vitals Bar */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-[12.5px]">
                              <div>
                                <span className="text-slate-500 block font-mono text-[10px] uppercase">Age / Gender</span>
                                <span className="font-bold text-slate-900">
                                  {selectedDetails.patient?.age || 'N/A'} yrs · {selectedDetails.patient?.gender || 'N/A'}
                                </span>
                              </div>
                              <div>
                                <span className="text-slate-500 block font-mono text-[10px] uppercase">Blood Group</span>
                                <span className="font-bold text-indigo-700">
                                  {selectedDetails.patient?.blood_group || 'O+'}
                                </span>
                              </div>
                              <div>
                                <span className="text-slate-500 block font-mono text-[10px] uppercase">Height & Weight</span>
                                <span className="font-bold text-slate-900">
                                  {selectedDetails.patient?.height ? `${selectedDetails.patient.height} cm` : '—'} · {selectedDetails.patient?.weight ? `${selectedDetails.patient.weight} kg` : '—'}
                                </span>
                              </div>
                              <div>
                                <span className="text-slate-500 block font-mono text-[10px] uppercase">Date of Birth</span>
                                <span className="font-bold text-slate-900">
                                  {selectedDetails.patient?.dob || 'N/A'}
                                </span>
                              </div>
                            </div>

                            {/* Conditions Preview list */}
                            <div className="flex flex-col gap-2.5">
                              {selectedDetails.results?.map((r: any) => (
                                <div
                                  key={r.rank}
                                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col gap-2"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-black text-[14px] text-slate-950 capitalize">
                                      #{r.rank} {r.disease}
                                    </span>
                                    <span className="font-mono text-[12px] font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                                      {r.confidence}% Match
                                    </span>
                                  </div>
                                  {r.warning && (
                                    <div className="p-3 rounded-lg bg-red-50 border border-red-300 text-red-950 text-[12px] font-medium leading-relaxed">
                                      <strong className="text-red-950 font-bold block mb-0.5">Clinical Advisory:</strong>
                                      {r.warning}
                                    </div>
                                  )}
                                  {r.remedies && (
                                    <div className="text-[12px] text-slate-800 font-medium leading-relaxed whitespace-pre-line bg-white p-3 rounded-lg border border-slate-200">
                                      {r.remedies}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>

                            {/* Full Report CTA inside preview */}
                            <div className="pt-2 flex justify-end">
                              <motion.button
                                onClick={() => handleOpenFullReport(item.id)}
                                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-indigo-600 text-white font-extrabold text-[12.5px] shadow-sm shadow-indigo-600/30"
                                whileHover={buttonHover}
                                whileTap={buttonTap}
                              >
                                <FileText size={14} />
                                Open Complete Medical Report
                                <ArrowRight size={13} />
                              </motion.button>
                            </div>
                          </div>
                        ) : null}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </div>
    </div>
  )
}
