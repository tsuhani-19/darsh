import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/* Tailwind's `sm` breakpoint, as a value JS can read. Anything below it is a
   phone held upright. */
const NARROW = '(max-width: 639.98px)'

/**
 * True on a phone-width screen.
 *
 * The motion layer is the one part of the site a media query in CSS cannot
 * reach: Framer drives transforms from JS, so a travel distance chosen for a
 * desktop column stays the same on a 390px screen unless something tells it
 * otherwise. This is that something.
 */
export function useNarrowScreen() {
  return useMediaQuery(NARROW)
}

/* A phone on its side: wide enough for the tablet layout, but well under
   500px tall once the browser chrome is taken off. */
const SHORT = '(max-height: 500px)'

/**
 * True on a screen too short for a pinned, scroll-scrubbed panel.
 *
 * The two assembly sections pin a full-height stage and play it out as the
 * page scrolls past. On a landscape phone that stage is ~300px under the
 * header, which cannot hold a heading, the artwork and its labels at once —
 * so there they drop the pinning and render finished, as ordinary content.
 */
export function useShortScreen() {
  return useMediaQuery(SHORT)
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    setMatches(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

/**
 * True while a phone reader is scrolling down the page.
 *
 * The floating corner buttons sit over the content column, and on a 390px
 * screen that column runs edge to edge, so whatever they float over is text.
 * They step aside while the reader is moving down through the page and come
 * back the moment they scroll up — the gesture that means "I want to go
 * somewhere" — or stop near the top. Never hides from `sm` up (bar a phone on
 * its side), where the gutters are wide enough that they sit beside the text
 * instead.
 */
export function useHideOnScrollDown() {
  // a landscape phone is wider than `sm` but has even less height to give up
  const phoneWidth = useNarrowScreen()
  const phoneHeight = useShortScreen()
  const narrow = phoneWidth || phoneHeight
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    if (!narrow) {
      setHidden(false)
      return
    }
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const delta = y - last
      // a few px of slack so momentum jitter does not flicker them
      if (Math.abs(delta) < 6) return
      setHidden(delta > 0 && y > 240)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [narrow])
  return hidden
}

/**
 * A sideways entrance, clamped to what the viewport can actually absorb.
 *
 * A phone's content column is the full screen less a 20px gutter, so any
 * horizontal travel larger than that gutter starts the element beyond the
 * edge of the page. Below `sm` the distance is cut to fit inside it; from
 * `sm` up the travel is unchanged.
 */
export function useSlideDistance(distance) {
  return useNarrowScreen() ? Math.min(distance, 16) : distance
}

/* ---------- thin reading-progress bar ---------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      style={{ scaleX }}
      className="bg-spectrum fixed inset-x-0 top-0 z-[60] h-[2.5px] origin-left"
    />
  )
}

/* ---------- fade + rise on scroll ---------- */
// `margin` shrinks the viewport the element has to enter. Anything sitting in
// the last 70px of the page can never get that far in, so the very foot of the
// page passes a smaller one or it simply never appears.
export function Reveal({ children, delay = 0, y = 24, className = '', margin = '-70px' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Headline that reveals line by line from behind a mask. Pass an array of
 * strings; each one gets its own overflow-hidden row.
 */
export function MaskedHeading({ lines, className = '', delay = 0, as: Tag = 'h2', immediate = false }) {
  // The trigger lives on the MASK, not on the line inside it.
  //
  // The line starts translated 110% of its own height, and the mask clips to
  // its own box — which, depending on the line-height, can leave the line with
  // a zero-area intersection rect. An IntersectionObserver watching the line
  // then reports "never in view" forever, so it never animates, so it never
  // becomes visible: a deadlock that showed up as a silently blank headline.
  // The mask is always on screen, so watching it instead always resolves, and
  // the line follows through variant propagation.
  //
  // Above the fold, `animate` is used instead of `whileInView`: an element that
  // is already on screen at mount can miss the intersection callback and stay
  // parked off-canvas, which reads as a blank gap where the headline should be.
  const trigger = immediate
    ? { animate: 'shown' }
    : { whileInView: 'shown', viewport: { once: true, margin: '-60px' } }

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className="block overflow-hidden pb-[0.12em]"
          initial="hidden"
          {...trigger}
        >
          <motion.span
            className="block"
            variants={{ hidden: { y: '110%' }, shown: { y: 0 } }}
            transition={{ duration: 0.8, delay: delay + i * 0.08, ease: EASE }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  )
}

/* ---------- slide in from a side as it scrolls into view ---------- */
export function SlideIn({ children, from = 'left', delay = 0, distance = 60, className = '' }) {
  const travel = useSlideDistance(distance)
  const axis = from === 'left' ? -travel : travel
  return (
    <motion.div
      initial={{ opacity: 0, x: axis }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ---------- image that unmasks and settles as it enters ---------- */
export function RevealImage({ src, alt, className = '', imgClassName = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ clipPath: 'inset(12% 12% 12% 12% round 1rem)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 1rem)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, delay, ease: EASE }}
      className={`overflow-hidden ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.3, delay, ease: EASE }}
        className={`graded h-full w-full object-cover ${imgClassName}`}
      />
    </motion.div>
  )
}

/* ---------- section header ---------- */
export function SectionHeading({ eyebrow, lines, subtitle, align = 'left', className = '', immediate = false }) {
  const alignCls = align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'
  return (
    <div className={`${alignCls} ${className}`}>
      {eyebrow && (
        <Reveal>
          <p className="eyebrow mb-4">{eyebrow}</p>
        </Reveal>
      )}
      <MaskedHeading
        lines={lines}
        immediate={immediate}
        className="font-display text-[2rem] font-bold leading-[1.14] tracking-[-0.02em] text-ink-900 sm:text-[2.6rem]"
      />
      {subtitle && (
        <Reveal delay={0.12}>
          <p className="lede mt-5">{subtitle}</p>
        </Reveal>
      )}
    </div>
  )
}
