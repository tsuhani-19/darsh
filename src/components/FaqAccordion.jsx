import { useId, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

import { Reveal } from './ui.jsx'

/**
 * Question-and-answer list. Closed answers collapse to zero height rather than
 * unmounting, so the text is in the page's HTML for search engines and for the
 * browser's find-in-page, not only after someone clicks.
 */
export default function FaqAccordion({ items }) {
  return (
    <div className="border-t border-line">
      {items.map((f, i) => (
        <Reveal key={f.q} delay={i * 0.05}>
          <Item {...f} />
        </Reveal>
      ))}
    </div>
  )
}

function Item({ q, a }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <div className="border-b border-line">
      <h3>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={id}
          className="flex w-full items-start justify-between gap-6 py-5 text-left"
        >
          <span className="font-display text-[1.02rem] font-semibold tracking-tight text-ink-900">{q}</span>
          <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} className="mt-0.5 shrink-0 text-ink-400">
            <Plus size={18} />
          </motion.span>
        </button>
      </h3>
      <motion.div
        id={id}
        role="region"
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="max-w-2xl pb-6 text-[0.92rem] leading-relaxed text-ink-500">{a}</p>
      </motion.div>
    </div>
  )
}
