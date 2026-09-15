import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'

/**
 * Cards with a spotlight that tracks the pointer across the whole group — the
 * glow sits on a border layer, so the highlight rides the card edges rather
 * than washing out the text.
 */
export default function SpotlightCards({ items }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <Card key={item.title} item={item} index={i} />
      ))}
    </div>
  )
}

function Card({ item, index }) {
  const ref = useRef(null)
  const mx = useMotionValue(-400)
  const my = useMotionValue(-400)

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  const mask = useMotionTemplate`radial-gradient(200px circle at ${mx}px ${my}px, white, transparent 80%)`

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(-400)
        my.set(-400)
      }}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
      className="ring-spectrum group relative overflow-hidden rounded-2xl border border-line bg-white p-7 transition-shadow duration-500 hover:shadow-lift"
    >
      {/* glowing border layer, revealed only under the cursor */}
      <motion.div
        aria-hidden="true"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
        className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-brand-500"
      />
      {/* faint fill so the spotlight is visible on the card face too */}
      <motion.div
        aria-hidden="true"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
        className="pointer-events-none absolute inset-0 bg-brand-50/70"
      />

      <div className="relative">
        <span className="font-display text-[0.75rem] font-semibold tabular-nums text-brand-600">
          0{index + 1}
        </span>
        <h3 className="mt-2 font-display text-[1.08rem] font-semibold tracking-tight text-ink-900">
          {item.title}
        </h3>
        <p className="mt-2.5 text-[0.88rem] leading-relaxed text-ink-500">{item.text}</p>
      </div>
    </motion.div>
  )
}
