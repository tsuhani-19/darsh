import { useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { LogoMark } from './Logo.jsx'
import { MaskedHeading, Reveal } from './ui.jsx'
import SpectrumRule from './SpectrumRule.jsx'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Shared hero for the inner pages. The right half carries a per-page art
 * panel that tilts toward the pointer, and the mark drifts behind it as a
 * watermark — the old version left that whole column empty.
 */
export default function PageHero({ eyebrow, lines, subtitle, chips = [], actions, art }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const watermarkY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const watermarkRotate = useTransform(scrollYProgress, [0, 1], [0, 45])

  // pointer tilt shared by whatever art the page passes in
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), { stiffness: 160, damping: 20 })
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), { stiffness: 160, damping: 20 })

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-line bg-white pb-14 pt-28 sm:pb-16 sm:pt-32">
      {/* atmosphere */}
      <div className="pointer-events-none absolute -left-32 top-10 h-[22rem] w-[22rem] rounded-full bg-steel-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-[30rem] w-[30rem] rounded-full bg-brand-100/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[16rem] w-[24rem] rounded-full bg-crimson-100/40 blur-3xl" />
      <motion.div
        style={{ y: watermarkY, rotate: watermarkRotate }}
        className="pointer-events-none absolute -right-20 top-6 hidden h-[26rem] w-[26rem] opacity-[0.06] lg:block"
      >
        <LogoMark className="h-full w-full" />
      </motion.div>

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
        <div>
          <Reveal y={10}>
            <SpectrumRule className="mb-5 max-w-[4.5rem]" />
            <p className="eyebrow mb-5">{eyebrow}</p>
          </Reveal>

          <MaskedHeading
            as="h1"
            immediate
            lines={lines}
            className="font-display text-[2.2rem] font-bold leading-[1.06] tracking-[-0.035em] text-ink-900 sm:text-[3rem] lg:text-[3.3rem]"
          />

          {subtitle && (
            <Reveal delay={0.28} y={12}>
              <p className="lede mt-6 max-w-xl">{subtitle}</p>
            </Reveal>
          )}

          {chips.length > 0 && (
            <Reveal delay={0.38} y={12}>
              <ul className="mt-7 flex flex-wrap gap-2">
                {chips.map((c, i) => (
                  <motion.li
                    key={c}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 + i * 0.06, duration: 0.4 }}
                    className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[0.8rem] text-ink-600"
                  >
                    {c}
                  </motion.li>
                ))}
              </ul>
            </Reveal>
          )}

          {actions && (
            <Reveal delay={0.5} y={12}>
              <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
            </Reveal>
          )}
        </div>

        {art && (
          <motion.div
            onMouseMove={onMove}
            onMouseLeave={reset}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
            className="relative"
          >
            {art}
          </motion.div>
        )}
      </div>
    </section>
  )
}
