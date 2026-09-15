import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'

/**
 * Split showcase: the list drives a single image panel that crossfades.
 * Nothing follows the cursor, so the picture stays where the eye expects it.
 */
export default function ServiceShowcase({ items }) {
  const [active, setActive] = useState(0)
  const current = items[active]

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-14">
      {/* list */}
      <ul className="order-2 border-t border-line lg:order-1">
        {items.map((s, i) => {
          const on = i === active
          return (
            <li key={s.slug}>
              <button
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-expanded={on}
                className="w-full border-b border-line py-5 text-left"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`font-display text-[0.75rem] font-semibold tabular-nums transition-colors ${
                      on ? 'text-brand-600' : 'text-ink-300'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`flex-1 font-display text-[1.1rem] font-semibold tracking-tight transition-all duration-300 sm:text-[1.3rem] ${
                      on ? 'translate-x-1 text-ink-900' : 'text-ink-400'
                    }`}
                  >
                    {s.title}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                      on ? 'border-brand-600 bg-brand-600 text-white' : 'border-line text-ink-300'
                    }`}
                  >
                    <ArrowUpRight size={15} />
                  </span>
                </div>

                {/* the active row expands with its detail — and its photo on small screens */}
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-[2.1rem] pt-3">
                        <img
                          src={s.image}
                          alt=""
                          loading="lazy"
                          className="graded mb-4 aspect-[16/9] w-full rounded-xl object-cover lg:hidden"
                        />
                        <p className="max-w-md text-[0.9rem] leading-relaxed text-ink-500">{s.blurb}</p>
                        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                          {s.points.map((p) => (
                            <li key={p} className="flex items-center gap-1.5 text-[0.8rem] text-ink-500">
                              <Check size={12} className="text-steel-500" /> {p}
                            </li>
                          ))}
                        </ul>
                        <Link
                          to="/services"
                          className="link-wipe mt-4 text-[0.82rem]"
                        >
                          Details <ArrowUpRight size={13} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </li>
          )
        })}
      </ul>

      {/* image panel — sticky, crossfades with the selection */}
      <div className="order-1 hidden lg:sticky lg:top-28 lg:order-2 lg:block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink-100">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={current.slug}
              src={current.image}
              alt={current.title}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="graded absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/85 to-transparent p-7 pt-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <span className="inline-grid h-10 w-10 place-items-center rounded-lg bg-white/15 text-white backdrop-blur">
                  <current.icon size={19} />
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-white">
                  {current.title}
                </h3>
                <p className="mt-1.5 max-w-sm text-[0.88rem] leading-relaxed text-white/70">
                  {current.blurb}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
