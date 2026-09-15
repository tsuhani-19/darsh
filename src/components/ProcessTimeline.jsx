import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Editorial process timeline. On large screens the steps run across a rail
 * that draws itself in; below that it folds into a vertical timeline with the
 * same nodes, so the sequence stays legible on a phone.
 */
export default function ProcessTimeline({ items }) {
  return (
    <div className="relative">
      {/* horizontal rail (desktop only) — sits behind the nodes */}
      <div className="absolute inset-x-0 top-[1.4rem] hidden h-px bg-line lg:block" />
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ duration: 1.4, ease: EASE }}
        className="absolute inset-x-0 top-[1.4rem] hidden h-px origin-left bg-gradient-to-r from-brand-600 via-brand-500 to-steel-400 lg:block"
      />

      <ol className="relative grid gap-y-2 lg:grid-cols-4 lg:gap-x-7">
        {items.map((item, i) => (
          <motion.li
            key={item.step}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
            className="relative flex gap-5 pb-10 lg:block lg:pb-0"
          >
            {/* vertical rail segment (mobile only) */}
            {i < items.length - 1 && (
              <span className="absolute bottom-0 left-[1.4rem] top-12 w-px bg-line lg:hidden" />
            )}

            {/* node */}
            <motion.span
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-90px' }}
              transition={{ duration: 0.45, delay: 0.25 + i * 0.12, type: 'spring', stiffness: 260, damping: 18 }}
              className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-white font-display text-[0.78rem] font-bold tabular-nums text-brand-600 shadow-soft"
            >
              {item.step}
            </motion.span>

            {/* card */}
            <div className="group min-w-0 flex-1 lg:mt-7">
              <div className="overflow-hidden rounded-xl bg-ink-100">
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  className="graded aspect-[16/10] w-full object-cover transition-transform [transition-duration:1100ms] ease-out group-hover:scale-[1.05]"
                />
              </div>

              <span className="mt-5 inline-block rounded-full bg-mist px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-ink-500">
                {item.duration}
              </span>

              <h3 className="mt-3 font-display text-[1.25rem] font-bold tracking-tight text-ink-900">
                {item.title}
              </h3>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-500">{item.text}</p>

              <p className="mt-4 flex items-start gap-2 border-t border-line pt-4 text-[0.82rem] font-medium text-ink-700">
                <Check size={14} className="mt-0.5 shrink-0 text-steel-500" />
                {item.deliverable}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
