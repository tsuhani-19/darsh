import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { img } from '../images.js'

/* `hide` drops a frame below `sm`. Five equal frames across a phone are about
   60px wide each — too narrow to read as photographs at all, let alone as a
   row with depth. Three is the most that still shows a picture rather than a
   sliver, so the two shallowest drift out on small screens. */
const SHOTS = [
  { src: img.band1, depth: 70, h: 'h-44 sm:h-56' },
  { src: img.band2, depth: -90, h: 'h-56 sm:h-72' },
  { src: img.band3, depth: 50, h: 'h-40 sm:h-48', hide: true },
  { src: img.band4, depth: -60, h: 'h-52 sm:h-64' },
  { src: img.band5, depth: 80, h: 'h-44 sm:h-52', hide: true },
]

/**
 * Full-bleed band where each frame drifts at its own rate, so the row gains
 * depth as it crosses the viewport.
 */
export default function ParallaxBand() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  return (
    <div ref={ref} className="flex items-center gap-3 overflow-hidden px-3 sm:gap-5 sm:px-5">
      {SHOTS.map((s) => (
        <Frame key={s.src} shot={s} progress={scrollYProgress} />
      ))}
    </div>
  )
}

function Frame({ shot, progress }) {
  const raw = useTransform(progress, [0, 1], [shot.depth, -shot.depth])
  const y = useSpring(raw, { stiffness: 80, damping: 22 })
  return (
    <motion.div
      style={{ y }}
      className={`${shot.h} ${shot.hide ? 'hidden sm:block' : ''} min-w-0 flex-1 overflow-hidden rounded-xl bg-ink-100`}
    >
      <img src={shot.src} alt="" loading="lazy" className="graded h-full w-full object-cover" />
    </motion.div>
  )
}
