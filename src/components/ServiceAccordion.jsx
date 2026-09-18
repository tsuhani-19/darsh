import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, Plus } from 'lucide-react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/controls/tabs.jsx'
import { useSlideDistance } from './ui.jsx'

const EASE = [0.22, 1, 0.36, 1]

// Four veils, all inside the red/black family so the set reads as one brand
// rather than four. Every stop is dark enough to hold white type at AA.
const veil = {
  brand: 'from-brand-700/95 via-brand-700/55',
  steel: 'from-ink-900/95 via-ink-900/55',
  crimson: 'from-crimson-600/95 via-crimson-600/55',
  gold: 'from-brand-900/95 via-brand-900/55',
}

/**
 * Expanding panel accordion — not a grid at all. On desktop the panels are
 * vertical slivers that flex open on hover; on touch they stack and expand
 * downward. Collapsed panels carry a rotated title so the whole set stays
 * readable while closed.
 *
 * The category filter is a real Radix tab list, so arrow keys move between
 * categories and the relationship between a category and its panels is
 * announced. Radix mounts only the active tab's content, so rendering one
 * TabsContent per category costs no more than the old single list did.
 */
export default function ServiceAccordion({ items, categories }) {
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState(0)

  const itemsFor = (c) => (c === 'All' ? items : items.filter((s) => s.category === c))

  const pick = (f) => {
    setFilter(f)
    setActive(0)
  }

  return (
    <Tabs value={filter} onValueChange={pick}>
      <TabsList className="mb-8">
        {categories.map((c) => (
          <TabsTrigger key={c} value={c} layoutGroup="svc-pill">
            {c}
            <span className="text-[0.72rem] text-ink-300 transition-colors group-data-[state=active]:text-white/50">
              {itemsFor(c).length}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>

      {categories.map((c) => (
        <TabsContent key={c} value={c}>
          <Panels items={itemsFor(c)} active={active} setActive={setActive} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

function Panels({ items, active, setActive }) {
  // these rows only exist below `lg`, so their entrance is the one that most
  // needs to stay inside the gutter
  const travel = useSlideDistance(56)
  return (
    <>
      {/* ---------- desktop: horizontal expanding panels ---------- */}
      <div className="hidden h-[34rem] gap-2.5 lg:flex">
        {items.map((s, i) => {
          const on = i === active
          return (
            <motion.button
              key={s.slug}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-expanded={on}
              aria-label={s.title}
              style={{ flexGrow: on ? 7 : 1 }}
              className="group relative h-full min-w-[3.5rem] basis-0 overflow-hidden rounded-2xl text-left transition-[flex-grow] [transition-duration:700ms] ease-out"
            >
              <img
                src={s.image}
                alt=""
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-all [transition-duration:900ms] ease-out ${
                  on ? 'scale-100 saturate-100' : 'scale-110 saturate-[0.25]'
                }`}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t to-transparent transition-opacity duration-500 ${
                  veil[s.tone]
                } ${on ? 'opacity-90' : 'opacity-100'}`}
              />

              {/* collapsed: number top, rotated title bottom */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-between py-7 transition-opacity duration-300 ${
                  on ? 'pointer-events-none opacity-0' : 'opacity-100'
                }`}
              >
                <span className="font-display text-[0.75rem] font-bold tabular-nums text-white/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="[writing-mode:vertical-rl] rotate-180 whitespace-nowrap font-display text-[0.95rem] font-semibold tracking-tight text-white">
                  {s.title}
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full border border-white/30 text-white transition-transform duration-300 group-hover:rotate-90">
                  <Plus size={14} />
                </span>
              </div>

              {/* expanded */}
              <AnimatePresence>
                {on && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, delay: 0.18 }}
                    className="absolute inset-x-0 bottom-0 p-8"
                  >
                    <span className="inline-grid h-11 w-11 place-items-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
                      <s.icon size={20} />
                    </span>
                    <h3 className="mt-4 font-display text-[1.6rem] font-bold tracking-tight text-white">
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-md text-[0.92rem] leading-relaxed text-white/75">{s.blurb}</p>

                    <ul className="mt-5 grid max-w-lg grid-cols-2 gap-x-6 gap-y-2">
                      {s.points.map((p, k) => (
                        <motion.li
                          key={p}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.28 + k * 0.05, duration: 0.35 }}
                          className="flex items-start gap-2 text-[0.83rem] text-white/85"
                        >
                          <Check size={13} className="mt-1 shrink-0 text-white/60" />
                          {p}
                        </motion.li>
                      ))}
                    </ul>

                    <Link
                      to="/contact"
                      className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[0.83rem] font-semibold text-ink-900 transition-transform hover:scale-[1.03]"
                    >
                      Talk about this <ArrowUpRight size={14} />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </div>

      {/* ---------- touch / narrow: vertical expanding rows ---------- */}
      <div className="space-y-2.5 lg:hidden">
        {items.map((s, i) => {
          const on = i === active
          return (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, x: -travel }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: (i % 4) * 0.07, ease: EASE }}
              className="overflow-hidden rounded-2xl"
            >
              <button
                onClick={() => setActive(on ? -1 : i)}
                aria-expanded={on}
                className="relative block h-24 w-full text-left"
              >
                <img src={s.image} alt="" loading="lazy" className="graded absolute inset-0 h-full w-full object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-r to-transparent ${veil[s.tone]}`} />
                <div className="relative flex h-full items-center gap-4 px-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
                    <s.icon size={18} />
                  </span>
                  <span className="flex-1 font-display text-[1.05rem] font-semibold tracking-tight text-white">
                    {s.title}
                  </span>
                  <motion.span animate={{ rotate: on ? 45 : 0 }} className="text-white">
                    <Plus size={18} />
                  </motion.span>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="overflow-hidden border border-t-0 border-line bg-white"
                  >
                    <div className="p-5">
                      <p className="text-[0.88rem] leading-relaxed text-ink-500">{s.blurb}</p>
                      <ul className="mt-4 space-y-2">
                        {s.points.map((p) => (
                          <li key={p} className="flex items-start gap-2 text-[0.83rem] text-ink-600">
                            <Check size={13} className="mt-1 shrink-0 text-steel-500" /> {p}
                          </li>
                        ))}
                      </ul>
                      <Link
                        to="/contact"
                        className="link-wipe mt-4 text-[0.83rem]"
                      >
                        Talk about this <ArrowUpRight size={13} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </>
  )
}
