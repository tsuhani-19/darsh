import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import heroScene from '../assets/hero-scene.svg'

/**
 * The home hero's background: the supplied vector artwork, full bleed, with
 * the copy standing on top of it.
 *
 * The drawing itself is untouched — it is loaded as a flat image rather than
 * inlined, so its own ids and gradients cannot collide with anything else on
 * the page. The only motion is a slow drift as the hero scrolls away: the
 * scene deliberately does not react to the pointer, because a background that
 * slides under the cursor pulls the eye off the copy it is sitting behind.
 *
 * It is anchored right, because the artwork keeps its pale wall on the left
 * and that is where the headline sits.
 */
export default function HeroScene({ className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // the scene sinks and closes in slightly as the hero scrolls away. The scale
  // always stays ahead of the drift, so no edge of the artwork creeps into view
  const driftY = useTransform(scrollYProgress, [0, 1], [0, 36])
  const driftScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.14])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.img
        src={heroScene}
        alt=""
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1.06 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: driftY, scale: driftScale }}
        className="h-full w-full object-cover object-right"
      />
    </div>
  )
}
