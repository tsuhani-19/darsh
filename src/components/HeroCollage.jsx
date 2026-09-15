import { useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { img } from '../images.js'

const EASE = [0.22, 1, 0.36, 1]

/**
 * The home hero's right-hand panel: two real photographs, layered like prints
 * left on a desk.
 *
 * This replaced a drawn phone-and-dashboard mockup. Invented UI in a hero
 * makes a studio look like it has nothing of its own to show — the photographs
 * do the same job and are actually true. All the motion here is applied to
 * real pictures rather than to synthetic furniture: the frames unmask on
 * arrival, the main shot drifts very slowly, and both layers track the pointer
 * at different rates so the pair has depth.
 */
export default function HeroCollage() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  // scroll parallax: the small frame counter-moves against the big one
  const mainScrollY = useTransform(scrollYProgress, [0, 1], [-18, 34])
  const insetScrollY = useTransform(scrollYProgress, [0, 1], [26, -30])

  // pointer parallax
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const spring = { stiffness: 110, damping: 20, mass: 0.6 }
  const mainX = useSpring(useTransform(px, [-0.5, 0.5], [-13, 13]), spring)
  const mainY = useSpring(useTransform(py, [-0.5, 0.5], [-9, 9]), spring)
  const insetX = useSpring(useTransform(px, [-0.5, 0.5], [24, -24]), spring)
  const insetY = useSpring(useTransform(py, [-0.5, 0.5], [16, -16]), spring)

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="relative mx-auto w-full max-w-[30rem] lg:max-w-none"
    >
      {/* main frame */}
      <motion.div
        style={{ x: mainX, y: mainScrollY }}
        initial={{ clipPath: 'inset(8% 8% 8% 8% round 1rem)', opacity: 0 }}
        animate={{ clipPath: 'inset(0% 0% 0% 0% round 1rem)', opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
        className="relative overflow-hidden rounded-2xl bg-ink-100 shadow-lift"
      >
        <motion.div style={{ y: mainY }}>
          <motion.img
            src={img.homeHero}
            alt="The team at work"
            initial={{ scale: 1.16 }}
            animate={{ scale: [1.04, 1.09, 1.04] }}
            transition={{
              scale: { duration: 22, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="graded aspect-[5/4] w-full object-cover sm:aspect-[4/3.4]"
          />
        </motion.div>

        {/* a faint warm lift in the corner so the crop does not read as flat */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink-900/20 via-transparent to-transparent" />
      </motion.div>

      {/* inset frame, overlapping the corner like a print laid on top */}
      <motion.div
        style={{ x: insetX, y: insetScrollY }}
        initial={{ opacity: 0, y: 30, rotate: -6 }}
        animate={{ opacity: 1, y: 0, rotate: -2.5 }}
        transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
        className="absolute -bottom-8 -left-3 w-40 sm:-left-6 sm:w-52"
      >
        <motion.div style={{ y: insetY }} className="overflow-hidden rounded-xl border-[6px] border-white shadow-lift">
          <img
            src={img.homeHeroInset}
            alt="Editing suite"
            className="graded aspect-[4/3] w-full object-cover"
          />
        </motion.div>
      </motion.div>

      {/* the logo's spectrum, drawn as a rule under the pair */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, delay: 0.9, ease: EASE }}
        className="bg-spectrum absolute -bottom-3 right-0 h-[3px] w-1/2 origin-right rounded-full sm:-bottom-4"
      />
    </div>
  )
}
