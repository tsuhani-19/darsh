import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LOGO_PAPER } from './Logo.jsx'
import { site } from '../siteConfig.js'

const EASE = [0.22, 1, 0.36, 1]
const KEY = 'di-intro-seen'

/* The artwork's own proportions (public/logo.svg is 1618 x 971), so the
   assembly box and the image inside it are the same shape and a piece can
   never land a fraction off its neighbour. */
const ART_RATIO = '1618 / 971'

/**
 * The lockup, cut along the seams it is actually built from: the swirl mark,
 * the word "Darsh", and the word "Innovations". Measured off the artwork —
 * the mark inks to x 593/1618 (36.7%) and the two words part at y 545/971
 * (56%), so these windows fall in the gaps rather than through any glyph.
 *
 * Every piece draws the one official file through a clip window, so what
 * flies in is the real artwork rather than a redrawn imitation, and when each
 * piece reaches its resting transform the windows abut exactly and the logo
 * is simply itself again — seamless, because it never actually came apart.
 *
 * `clip` is inset(top right bottom left) in percentages of the box, and the
 * approach offsets are percentages of the box too — so the assembly reads at
 * the same scale on a phone as on a desktop rather than flinging the pieces
 * across the screen on one and barely nudging them on the other.
 *
 * The approach directions are chosen so no piece's opaque ground ever travels
 * across a piece that has already landed.
 */
const PIECES = [
  // the swirl mark screws itself in from the left
  {
    id: 'mark',
    clip: 'inset(0 60% 0 0)',
    from: { x: '-22%', y: '4%', rotate: -155, scale: 0.3 },
    delay: 0,
  },
  // "Darsh" drops from above, onto empty paper
  {
    id: 'darsh',
    clip: 'inset(0 0 44% 40%)',
    from: { x: 0, y: '-26%', rotate: 0, scale: 1 },
    delay: 0.32,
  },
  // "Innovations" rises from below, and so never crosses the line above it
  {
    id: 'innovations',
    clip: 'inset(56% 0 0 40%)',
    from: { x: 0, y: '14%', rotate: 0, scale: 1 },
    delay: 0.48,
  },
]

/* The four-pointed star at the heart of the mark, as a fraction of the box —
   where the glint goes off once every piece has landed. */
const STAR = { left: '23%', top: '48.5%' }

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
 * The opening curtain: the logo builds itself out of its own three parts,
 * holds for a beat, then lifts.
 *
 * The curtain is painted in the artwork's own paper colour, so the pieces have
 * no ground of their own to give them away — there is no plate, no card and no
 * wash behind them, only ink arriving on the page.
 *
 * It plays once per browser session rather than on every route change, skips
 * entirely under `prefers-reduced-motion`, and never gates the content: the
 * site is fully rendered underneath the whole time, so a stalled animation can
 * only ever cost the curtain, not the page.
 */
export default function IntroLoader() {
  // decided before first paint so the curtain never flashes for a returning
  // visitor, and never mounts at all for someone who asked for less motion
  const [playing, setPlaying] = useState(() => {
    if (typeof window === 'undefined') return false
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return !alreadySeen()
  })
  const [assembled, setAssembled] = useState(false)

  useEffect(() => {
    if (!playing) return undefined
    markSeen()

    const toSettle = setTimeout(() => setAssembled(true), 950)
    const toEnd = setTimeout(() => setPlaying(false), 1950)

    // hold the page still underneath while the curtain is up
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // let an impatient visitor skip it
    const skip = () => {
      setAssembled(true)
      setTimeout(() => setPlaying(false), 260)
    }
    window.addEventListener('keydown', skip, { once: true })
    window.addEventListener('pointerdown', skip, { once: true })

    return () => {
      clearTimeout(toSettle)
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
          role="status"
          aria-label={`${site.name} — loading`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ backgroundColor: LOGO_PAPER }}
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden"
        >
          <motion.div
            // the assembled lockup settles with one small press, then lifts away
            animate={assembled ? { scale: [1, 1.03, 1] } : { scale: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
            exit={{ y: -20, opacity: 0, transition: { duration: 0.45, ease: EASE } }}
            className="relative flex flex-col items-center gap-10"
          >
            <div
              aria-hidden="true"
              // Sized off the viewport width rather than a fixed height: the
              // lockup is the whole point of the curtain, so it should read at
              // a glance on a phone and still be the largest thing on a
              // desktop screen without ever touching the edges.
              className="relative w-[min(78vw,36rem)]"
              style={{ aspectRatio: ART_RATIO }}
            >
              {PIECES.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ ...p.from, opacity: 0 }}
                  animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 140,
                    damping: 18,
                    delay: p.delay,
                    opacity: { duration: 0.25, delay: p.delay, ease: EASE },
                  }}
                  style={{ clipPath: p.clip, WebkitClipPath: p.clip }}
                  className="absolute inset-0"
                >
                  <img
                    src={site.logo}
                    alt=""
                    draggable={false}
                    className="h-full w-full select-none object-contain"
                  />
                </motion.div>
              ))}

              {/* the star in the mark catches the light once the last piece
                  is home — the logo's own detail, not an added sparkle */}
              <motion.span
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.3 }}
                animate={assembled ? { opacity: [0, 0.85, 0], scale: [0.3, 2.4, 3.2] } : {}}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ ...STAR, background: 'radial-gradient(circle, #fff 0%, rgba(255,255,255,0) 70%)' }}
                className="pointer-events-none absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-overlay"
              />
            </div>

            {/* a real progress track rather than a decorative flourish: it
                fills across the life of the intro and is full when the
                curtain lifts */}
            <div className="h-[3px] w-40 overflow-hidden rounded-full bg-ink-900/[0.07] sm:w-56">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.45, ease: [0.4, 0, 0.2, 1] }}
                className="bg-spectrum h-full w-full origin-left rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
