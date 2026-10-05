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
 *
 * Between `lg` and `xl` the hero is close to square, so the right-anchored
 * crop lands the figure directly behind the paragraph. Centring the crop
 * there instead moves him out to roughly two-thirds across, clear of the copy
 * column and the veil.
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
        className="h-full w-full object-cover object-right lg:max-xl:object-center"
      />
    </div>
  )
}

/**
 * The same artwork for a phone or portrait tablet, where it cannot be a background.
 *
 * Behind a 390px column the landscape drawing is cropped to its right edge
 * and then washed out by the veil the copy needs, so the figure and most of
 * the red simply never appeared. Below `lg` the scene instead gets its own
 * full-bleed band in the flow of the hero, cropped square around the man
 * with the red arch sweeping over him (he stands at ~60% across the drawing,
 * so 70% horizontal positioning centres him in a square crop). The top and
 * bottom fade into the page so the band reads as the room the copy is in,
 * not as a pasted photograph.
 */
export function HeroSceneInline({ className = '' }) {
  return (
    <div aria-hidden="true" className={`relative -ml-5 w-screen overflow-hidden sm:-ml-8 ${className}`}>
      <motion.img
        src={heroScene}
        alt=""
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="aspect-square max-h-[30rem] w-full object-cover sm:aspect-[16/10]"
        style={{ objectPosition: '70% 55%' }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </div>
  )
}
