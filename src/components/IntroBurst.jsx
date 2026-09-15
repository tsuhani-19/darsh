import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LogoMark, Wordmark } from './Logo.jsx'

const EASE = [0.22, 1, 0.36, 1]
const KEY = 'di-intro-seen'

/* Twelve shards thrown out from the mark. Colours cycle through the logo's
   own sweep so the burst cannot introduce a hue the brand does not own. */
// lacquer red, its highlight, brushed silver, piano black — the mark's own
// four materials, so the burst reads as the logo coming apart
const SHARD_COLORS = ['#E8161F', '#FF6B4A', '#CDD1D6', '#151719']
const SHARDS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2
  return {
    angle,
    x: Math.cos(angle),
    y: Math.sin(angle),
    color: SHARD_COLORS[i % SHARD_COLORS.length],
    long: i % 3 === 0,
  }
})

/* Session-scoped, and defensive: private windows throw on storage access. */
function alreadySeen() {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}
function markSeen() {
  try {
    sessionStorage.setItem(KEY, '1')
  } catch {
    /* nothing to do — the intro simply plays again next load */
  }
}

/**
 * The name lands in the centre, then bursts outward and hands over to the page.
 *
 * It plays once per browser session rather than on every route change, skips
 * entirely under `prefers-reduced-motion`, and never gates the content: the
 * site is fully rendered underneath the whole time, so a stalled animation can
 * only ever cost the curtain, not the page.
 */
export default function IntroBurst() {
  // decided before first paint so the curtain never flashes for a returning
  // visitor, and never mounts at all for someone who asked for less motion
  const [playing, setPlaying] = useState(() => {
    if (typeof window === 'undefined') return false
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return !alreadySeen()
  })
  const [burst, setBurst] = useState(false)

  useEffect(() => {
    if (!playing) return undefined
    markSeen()

    const toBurst = setTimeout(() => setBurst(true), 1150)
    const toEnd = setTimeout(() => setPlaying(false), 2000)

    // hold the page still underneath while the curtain is up
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // let an impatient visitor skip it
    const skip = () => {
      setBurst(true)
      setTimeout(() => setPlaying(false), 620)
    }
    window.addEventListener('keydown', skip, { once: true })
    window.addEventListener('pointerdown', skip, { once: true })

    return () => {
      clearTimeout(toBurst)
      clearTimeout(toEnd)
      document.body.style.overflow = prev
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
    }
  }, [playing])

  return (
    <AnimatePresence>
      {playing && (
        <motion.div
          key="intro"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-white"
        >
          {/* the ground itself pulls back as the burst goes off */}
          <motion.div
            animate={burst ? { scale: 1.12, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="absolute inset-0 bg-white"
          />

          {/* a soft brand wash behind the mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={burst ? { opacity: 0, scale: 2.4 } : { opacity: 1, scale: 1 }}
            transition={{ duration: burst ? 0.7 : 0.9, ease: EASE }}
            className="absolute h-[22rem] w-[22rem] rounded-full bg-brand-100/70 blur-3xl sm:h-[30rem] sm:w-[30rem]"
          />

          {/* expanding ring, released at the moment of the burst */}
          <motion.div
            initial={{ scale: 0.2, opacity: 0 }}
            animate={burst ? { scale: 3.4, opacity: [0.55, 0] } : { scale: 0.2, opacity: 0 }}
            transition={{ duration: 0.85, ease: EASE }}
            className="bg-spectrum absolute h-40 w-40 rounded-full opacity-0 blur-xl sm:h-56 sm:w-56"
          />

          {/* the shards */}
          {SHARDS.map((s, i) => (
            <motion.span
              key={i}
              initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              animate={
                burst
                  ? {
                      x: s.x * (s.long ? 460 : 320),
                      y: s.y * (s.long ? 460 : 320),
                      scale: [0, 1, 0.2],
                      opacity: [0, 1, 0],
                    }
                  : { x: 0, y: 0, scale: 0, opacity: 0 }
              }
              transition={{ duration: 0.9, delay: i * 0.012, ease: EASE }}
              style={{
                backgroundColor: s.color,
                rotate: `${(s.angle * 180) / Math.PI}deg`,
              }}
              className={`absolute rounded-full ${s.long ? 'h-[3px] w-16' : 'h-[3px] w-9'}`}
            />
          ))}

          {/* the name */}
          <motion.div
            animate={burst ? { scale: 1.45, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative flex flex-col items-center gap-4"
          >
            <motion.div
              initial={{ scale: 0.3, opacity: 0, rotate: -40 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 150, damping: 13, delay: 0.1 }}
            >
              <LogoMark className="h-16 w-16 sm:h-20 sm:w-20" />
            </motion.div>

            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.42, ease: EASE }}
                className="text-center"
              >
                <Wordmark />
              </motion.div>
            </div>

            {/* a rule that draws under the name, then goes with the burst */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
              className="bg-spectrum h-[2px] w-28 origin-center rounded-full sm:w-36"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
