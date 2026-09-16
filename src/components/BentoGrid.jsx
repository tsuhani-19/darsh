import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { LogoMark } from './Logo.jsx'
import { cn } from '@/lib/utils'

/* `cn` rather than a template string: the shared cell carries `bg-white`, and
   a plain `${cell} bg-ink-900` leaves both in the class list. Which one wins is
   then decided by the order Tailwind happens to emit them in — which is how the
   dark cell ended up white, with white text on it. tailwind-merge drops the
   losing class instead of leaving it to chance. */
const cell =
  'group relative overflow-hidden rounded-2xl border border-line bg-white transition-all duration-500 hover:shadow-lift'

const rise = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' },
}

/**
 * Mixed-size capability grid. Deliberately uneven so the eye moves around it
 * instead of scanning identical boxes.
 *
 * The four columns fill exactly three rows: the photo feature holds the left
 * half over two rows, the brand panel and two compact cells fill the right
 * half, and two wide cells close the bottom. An earlier version ran a wide
 * cell into a fourth row and left half of it empty.
 */
export default function BentoGrid({ services }) {
  const [a, b, c, d, e] = services
  const compact = [b, c]
  const wide = [d, e]

  return (
    /* No explicit `grid-rows`: `grid-rows-3` makes three EQUAL rows, which
       forced the bottom row to match half the photo's height and left a band
       of dead space under the two wide cards. Implicit rows size to content,
       and the row-spanning photo still stretches rows one and two. */
    <div className="grid gap-4 md:grid-cols-4">
      {/* ---------- photo feature: left half, full height ---------- */}
      <motion.div
        {...rise}
        transition={{ duration: 0.6 }}
        className={cn(cell, 'md:col-span-2 md:row-span-2')}
      >
        <img
          src={a.image}
          alt=""
          loading="lazy"
          className="graded h-full min-h-[19rem] w-full object-cover transition-transform [transition-duration:1100ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-7">
          <span className="inline-grid h-10 w-10 place-items-center rounded-xl bg-white/15 text-white backdrop-blur">
            <a.icon size={19} />
          </span>
          <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-white">{a.title}</h3>
          <p className="mt-2 max-w-xs text-[0.88rem] leading-relaxed text-white/70">{a.blurb}</p>
        </div>
      </motion.div>

      {/* ---------- brand panel: the one dark cell ---------- */}
      <motion.div
        {...rise}
        transition={{ duration: 0.6, delay: 0.08 }}
        className={cn(cell, 'flex flex-col justify-between border-transparent bg-ink-900 p-7 md:col-span-2')}
      >
        <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 overflow-hidden rounded-full opacity-[0.18]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
            className="h-full w-full"
          >
            <LogoMark className="h-full w-full" />
          </motion.div>
        </div>

        <p className="relative text-[0.72rem] uppercase tracking-[0.14em] text-brand-300">
          Everything under one roof
        </p>
        <p className="relative mt-4 font-display text-[1.3rem] font-bold leading-snug tracking-tight text-white">
          Design, engineering, marketing and video — briefed once, delivered together.
        </p>
        <div className="relative mt-5 flex items-center gap-4">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-white"
          >
            See the full list
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <span className="bg-spectrum h-[2px] flex-1 rounded-full opacity-70" />
        </div>
      </motion.div>

      {/* ---------- two compact cells ---------- */}
      {compact.map((s, i) => (
        <motion.div
          key={s.slug}
          {...rise}
          transition={{ duration: 0.6, delay: 0.14 + i * 0.06 }}
          className={cn(cell, 'p-6')}
        >
          <span className="inline-grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
            <s.icon size={19} />
          </span>
          <h3 className="mt-4 font-display text-[1.02rem] font-semibold tracking-tight text-ink-900">
            {s.title}
          </h3>
          <p className="mt-2 text-[0.86rem] leading-relaxed text-ink-500">{s.blurb}</p>
        </motion.div>
      ))}

      {/* ---------- two wide cells close the grid ---------- */}
      {wide.map((s, i) => (
        <motion.div
          key={s.slug}
          {...rise}
          transition={{ duration: 0.6, delay: 0.26 + i * 0.06 }}
          className={cn(cell, 'p-6 md:col-span-2')}
        >
          <div className="flex items-start gap-4">
            <span className="inline-grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
              <s.icon size={19} />
            </span>
            <div>
              <h3 className="font-display text-[1.02rem] font-semibold tracking-tight text-ink-900">
                {s.title}
              </h3>
              <p className="mt-2 text-[0.86rem] leading-relaxed text-ink-500">{s.blurb}</p>
              {/* each card's own points — these used to come from a different service */}
              <div className="mt-4 flex flex-wrap gap-2">
                {s.points.slice(0, 3).map((p) => (
                  <span
                    key={p}
                    className="rounded-full bg-mist px-2.5 py-1 text-[0.72rem] text-ink-500 transition-colors duration-300 group-hover:bg-brand-50 group-hover:text-brand-700"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
