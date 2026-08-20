import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail, MessageSquare, Phone, MapPin, Send, AlertTriangle,
  HelpCircle, ChevronDown, CheckCircle2
} from 'lucide-react'
import AnimatedVisual3D from '../components/AnimatedVisual3D'
import { fadeUp, staggerContainer, staggerItem, buttonHover, buttonTap } from '../motion/variants'
import type { Page } from '../types'

interface ContactPageProps {
  onNavigate: (page: Page) => void
}

const FAQS = [
  {
    q: 'Is CareTrack AI a replacement for a certified medical doctor?',
    a: 'No. CareTrack AI provides probabilistic triage and clinical health information. It is designed to assist you in preparing for a doctor consultation, not to replace in-person clinical diagnostic testing.',
  },
  {
    q: 'How are my symptom inputs and health records secured?',
    a: 'All data is stored in isolated PostgreSQL tables with encrypted connections. We do not sell or share patient records with any third-party advertisers or insurance networks.',
  },
  {
    q: 'What if I am experiencing an emergency?',
    a: 'If you have acute chest pain, difficulty breathing, severe bleeding, or sudden neurological weakness, immediately call your local emergency services (e.g., 911 or 112) or go to the nearest emergency department.',
  },
  {
    q: 'How accurate is the disease prediction model?',
    a: 'Our Gaussian Naive Bayes model has been evaluated on 49,389 clinical test cases, reaching an 86.58% classification accuracy and 88.89% precision score across 713 disease categories.',
  },
]

export default function ContactPage({ onNavigate }: ContactPageProps) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 4000)
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Emergency Alert Banner */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 flex items-center gap-3 text-amber-800 dark:text-amber-300"
        >
          <AlertTriangle size={20} className="text-amber-600 flex-shrink-0" />
          <p className="text-[12px] leading-relaxed">
            <strong>Emergency Advisory:</strong> If you are experiencing severe or life-threatening symptoms, please call emergency services (911/112) immediately rather than submitting an online inquiry.
          </p>
        </motion.div>

        {/* Grid: Form & Info */}
        <div className="grid lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left info column */}
          <motion.div
            className="lg:col-span-5"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent-subtle text-[11px] font-mono font-semibold text-accent mb-4">
              <MessageSquare size={12} />
              GET IN TOUCH
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              We're Here to Help & <br />
              <span className="text-accent">Listen to Your Feedback</span>
            </h1>
            <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
              Have questions about clinical algorithms, platform features, or academic inquiries? Our clinical informatics team is available.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card">
                <div className="w-9 h-9 rounded-lg bg-accent-subtle text-accent flex items-center justify-center">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium">Email Support</p>
                  <p className="text-[13px] font-semibold text-foreground">support@caretrack.ai</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card">
                <div className="w-9 h-9 rounded-lg bg-accent-subtle text-accent flex items-center justify-center">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium">Clinical Inquiries</p>
                  <p className="text-[13px] font-semibold text-foreground">+1 (800) 427-3872</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right form card */}
          <motion.div
            className="lg:col-span-7 rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-xl font-bold text-foreground mb-1">Send a Message</h2>
            <p className="text-[12px] text-muted-foreground mb-6">Fill out the form below and we will respond within 24 hours.</p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-3">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-lg font-bold text-foreground">Message Sent Successfully</h3>
                <p className="text-[12px] text-muted-foreground mt-1 max-w-xs">
                  Thank you for reaching out. Our support team will review your message shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold text-foreground mb-1.5 block">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-[13px] text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-foreground mb-1.5 block">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-[13px] text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-foreground mb-1.5 block">Subject</label>
                  <input
                    type="text"
                    placeholder="General Inquiry / Platform Feedback"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-[13px] text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-foreground mb-1.5 block">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we help you today?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full p-3.5 rounded-xl border border-border bg-background text-[13px] text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
                  />
                </div>

                <motion.button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-accent text-white font-semibold text-[13px] mt-2 shadow-md shadow-accent/20"
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                >
                  <Send size={13} />
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle size={18} className="text-accent" />
            <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>

          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="border border-border/80 rounded-2xl overflow-hidden bg-background/50"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-[13px] text-foreground hover:text-accent transition-colors"
                >
                  <span>{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={16} className="text-muted-foreground" />
                  </motion.div>
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-4 pb-4 text-[12px] leading-relaxed text-muted-foreground border-t border-border/40 pt-3"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
