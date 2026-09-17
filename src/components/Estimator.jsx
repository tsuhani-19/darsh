import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Send, Sparkles } from 'lucide-react'
import AuroraMesh from './AuroraMesh.jsx'
import { estimatorOptions } from '../data.js'
import { site } from '../siteConfig.js'

const inr = (n) =>
  n >= 100000 ? `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)} lakh` : `₹${(n / 1000).toFixed(0)}k`

/**
 * Pick what you need, see a realistic range immediately, send it as a brief.
 * Parallel work is assumed for anything after the largest item, so the weeks
 * do not simply add up the way a naive calculator would.
 */
export default function Estimator() {
  const [picked, setPicked] = useState(['website'])

  const toggle = (id) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))

  const { weeks, budget } = useMemo(() => {
    const chosen = estimatorOptions.filter((o) => picked.includes(o.id))
    if (!chosen.length) return { weeks: 0, budget: 0 }
    const sorted = [...chosen].sort((a, b) => b.weeks - a.weeks)
    // longest track runs in full, the rest overlap at roughly 45%
    const w = sorted[0].weeks + sorted.slice(1).reduce((sum, o) => sum + o.weeks * 0.45, 0)
    const b = chosen.reduce((sum, o) => sum + o.from, 0)
    return { weeks: Math.round(w), budget: b }
  }, [picked])

  const send = () => {
    const chosen = estimatorOptions.filter((o) => picked.includes(o.id))
    const msg = [
      `Hello ${site.name},`,
      '',
      'Using the estimator on your site, I am looking at:',
      ...chosen.map((c) => `• ${c.label}`),
      '',
      `Rough timeline shown: ~${weeks} weeks`,
      `Rough starting budget shown: from ${inr(budget)}`,
      '',
      'Can we talk about it?',
    ].join('\n')
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
      <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
        {/* choices */}
        <div className="p-7 sm:p-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-600">
            <Sparkles size={13} /> Rough estimate
          </span>
          <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-[1.9rem]">
            What do you need building?
          </h3>
          <p className="mt-2.5 max-w-md text-[0.92rem] leading-relaxed text-ink-500">
            Tick everything that applies. The numbers update as you go. They are a
            starting point for the conversation, not a quote.
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {estimatorOptions.map((o) => {
              const on = picked.includes(o.id)
              return (
                <motion.button
                  key={o.id}
                  onClick={() => toggle(o.id)}
                  whileTap={{ scale: 0.96 }}
                  aria-pressed={on}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-[0.86rem] font-medium transition-colors duration-200 ${
                    on
                      ? 'border-brand-600 bg-brand-600 text-white'
                      : 'border-line bg-white text-ink-600 hover:border-ink-300 hover:bg-mist'
                  }`}
                >
                  <span className={on ? 'text-white' : 'text-ink-400'}>
                    {on ? <Check size={15} /> : <o.icon size={15} />}
                  </span>
                  {o.label}
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* readout */}
        <div className="relative flex flex-col justify-between overflow-hidden bg-ink-900 p-7 sm:p-10">
          <AuroraMesh intensity={0.32} />
          <div className="relative">
            <p className="text-[0.72rem] uppercase tracking-[0.14em] text-brand-300">Rough shape</p>

            <div className="mt-7 space-y-7">
              <Readout label="Timeline" value={picked.length ? `~${weeks} weeks` : '—'} />
              <Readout label="Starting budget" value={picked.length ? `from ${inr(budget)}` : '—'} />
              <Readout
                label="Scope"
                value={picked.length ? `${picked.length} ${picked.length === 1 ? 'track' : 'tracks'}` : '—'}
              />
            </div>
          </div>

          <div className="relative mt-9">
            <button onClick={send} disabled={!picked.length} className="btn-light w-full disabled:opacity-40">
              Send this as a brief <Send size={15} />
            </button>
            <p className="mt-3 text-center text-[0.72rem] leading-relaxed text-ink-400">
              Opens WhatsApp with your selection written out. The real price is agreed
              after a discovery call.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Readout({ label, value }) {
  return (
    <div>
      <p className="text-[0.8rem] text-ink-400">{label}</p>
      <div className="h-11 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.p
            key={value}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-spectrum font-display text-[1.75rem] font-bold tracking-tight"
          >
            {value}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}
