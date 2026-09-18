import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { cubicBezier, motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { LogoMark, LOGO_PAPER } from './Logo.jsx'
import { useNarrowScreen } from './ui.jsx'

/**
 * Exploded assembly. Four parts fly in from off-screen, rotate into register
 * and lock together into the mark; the core drops in last and the name
 * resolves under it.
 *
 * The parts are quarters of the official mark itself — the same artwork the
 * navbar and footer draw, cut into four and put back together — so the thing
 * that assembles is the logo exactly, not a drawing of it. Nothing here is
 * redrawn or recoloured: every piece is a window onto public/logo.svg, which
 * is why the finished state is pixel-identical to the mark anywhere else on
 * the site.
 *
 * The point is not that it moves — it is that the four parts are the four
 * things the studio actually sells. Each one carries its discipline in as it
 * arrives, so by the time the mark is whole the reader has been told what is
 * inside it.
 *
 * Scroll-scrubbed rather than time-based: the reader sets the pace, can stop
 * halfway, and can scrub back up to watch a part seat again.
 */

// One quarter each, cut on the horizontal and vertical so a part and its label
// share a corner of the stage. `clip` is in the part's own box, so it turns
// with the part and the four only tile back into a whole disc at rest.
const PARTS = [
  {
    id: 'build',
    label: 'Build',
    blurb: 'Sites, apps, platforms',
    clip: 'polygon(0% 0%, 50% 0%, 50% 50%, 0% 50%)',
    from: { x: -300, y: -210, rotate: -165 },
    at: 'left-0 top-0 text-left',
  },
  {
    id: 'grow',
    label: 'Grow',
    blurb: 'Search, ads, content',
    clip: 'polygon(50% 0%, 100% 0%, 100% 50%, 50% 50%)',
    from: { x: 310, y: -180, rotate: 175 },
    at: 'right-0 top-0 text-right',
  },
  {
    id: 'create',
    label: 'Create',
    blurb: 'Film, motion, design',
    clip: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)',
    from: { x: 280, y: 240, rotate: 150 },
    at: 'right-0 bottom-0 text-right',
  },
  {
    id: 'automate',
    label: 'Automate',
    blurb: 'Workflows, assistants',
    clip: 'polygon(0% 50%, 50% 50%, 50% 100%, 0% 100%)',
    from: { x: -290, y: 220, rotate: -145 },
    at: 'left-0 bottom-0 text-left',
  },
]

// The four quarters are cut around an empty middle so there is a socket for the
// core to seat into. The core is drawn a shade wider than the socket, so the
// two overlap rather than meet on a hairline that could show as a seam.
const SOCKET = 'radial-gradient(circle at 50% 50%, transparent 0 17.5%, #000 18.2%)'

// Each part gets its own slice of the scroll so they seat one behind another
// rather than all at once.
const windowFor = (i) => [0.03 + i * 0.085, 0.03 + i * 0.085 + 0.4]

// The site's standard ease, used for the punctuation beats (the scale punch,
// the core seating, the shock ring) where a hard deceleration is the point.
const EASE = cubicBezier(0.22, 1, 0.36, 1)

// Travel is eased differently, and deliberately.
//
// The standard ease is extremely front-loaded: 76% of the distance is covered
// in the first 25% of the window. A part therefore arrived almost fully seated
// before it was even visible, and — read backwards, which is what scrolling up
// does — it barely left register before disappearing, so it never visibly
// returned to the corner it came from. This curve spreads the distance across
// the window (24% covered at 25% of the way through) while still decelerating
// into register, so the whole flight is legible in BOTH directions.
const TRAVEL = cubicBezier(0.4, 0, 0.2, 1)

/**
 * The finished face of the machine: the official mark on its own ground.
 *
 * The artwork is published on a near-white ground rather than on
 * transparency, so the ground is made the point — a paper disc, the part the
 * mark is stamped on. Every piece carries the same disc, which is why they
 * close up into one without a visible join.
 */
function MarkFace() {
  return (
    // The artwork is a square with an opaque ground, so it has to be trimmed to
    // the disc — left untrimmed its corners stand proud of the rim as four tabs.
    <span aria-hidden="true" className="absolute inset-0 block overflow-hidden rounded-full">
      <span className="absolute inset-0 block" style={{ backgroundColor: LOGO_PAPER }} />
      {/* Inset off the rim: the mark very nearly fills its own square, and a
          disc inscribed in that square would cut the tips off the swirl. */}
      <span className="absolute left-1/2 top-1/2 block h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2">
        <LogoMark className="h-full w-full" />
      </span>
    </span>
  )
}

/** One quarter of the mark, flying in and seating. */
function Part({ part, index, progress, travelScale }) {
  const [start, end] = windowFor(index)
  const opts = { ease: TRAVEL }

  // The approach offsets above are pixels measured against a desktop stage.
  // A phone's stage is a third of that width, so unscaled they park each part
  // most of a screen away: the reader scrolls through the section watching an
  // empty floor while the pieces sit off-canvas, and only the last moments of
  // the assembly ever land in view. Scaling the offsets with the stage keeps
  // the whole flight on screen at every size.
  const x = useTransform(progress, [start, end], [part.from.x * travelScale, 0], opts)
  const y = useTransform(progress, [start, end], [part.from.y * travelScale, 0], opts)
  const rotate = useTransform(progress, [start, end], [part.from.rotate, 0], opts)
  const scale = useTransform(progress, [start, end], [0.5, 1], opts)
  // A brief fade at the very start of the window, not a quarter of it: the part
  // has to be on screen for its flight, not just for the landing.
  const opacity = useTransform(progress, [start, start + 0.03], [0, 1])

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        clipPath: part.clip,
        WebkitClipPath: part.clip,
        maskImage: SOCKET,
        WebkitMaskImage: SOCKET,
      }}
      className="absolute inset-0"
    >
      <MarkFace />
    </motion.div>
  )
}

function DisciplineTag({ part, index, progress }) {
  const [, end] = windowFor(index)
  const opacity = useTransform(progress, [end - 0.12, end + 0.02], [0, 1])
  const y = useTransform(progress, [end - 0.12, end + 0.02], [14, 0])

  return (
    /* The four labels sit at the corners of the stage and the mark sits in the
       middle of it. On a phone the stage is barely wider than the mark, so at
       the desktop width the labels were printed straight over the artwork. */
    <motion.div style={{ opacity, y }} className={`absolute ${part.at} max-w-[6rem] sm:max-w-[8.5rem]`}>
      <p className="font-display text-[0.82rem] font-bold text-white sm:text-[1.05rem]">{part.label}</p>
      <p className="mt-0.5 text-[0.66rem] leading-snug text-ink-400 sm:text-[0.72rem]">{part.blurb}</p>
    </motion.div>
  )
}

export default function AssemblyEngine() {
  const ref = useRef(null)
  const narrow = useNarrowScreen()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // The stage, the mark inside it and the distance the parts travel all shrink
  // together below `sm`, so the assembly reads the same on a phone as it does
  // on a desktop rather than happening mostly off the edges.
  const travelScale = narrow ? 0.42 : 1

  // Scroll arrives in lumps — a wheel notch is one jump, not a sweep — so a
  // transform driven straight off scrollYProgress steps rather than travels.
  // Running the progress through a spring first gives every part a continuous
  // value to follow and lets them carry a little momentum past a sudden stop.
  const progress = useSpring(scrollYProgress, {
    // Soft and heavily damped. Stiffer than this and the spring tracks the
    // wheel's steps closely enough to reproduce them; this glides through a
    // notch instead, and still settles without visible overshoot.
    stiffness: 48,
    damping: 26,
    mass: 0.34,
    restDelta: 0.00005,
  })

  // The whole mark counter-rotates as the parts arrive, so the assembly reads
  // as one machine turning into alignment rather than four separate flights.
  const markRotate = useTransform(progress, [0, 0.72], [-42, 0])

  // A small punch of scale as the last part lands, so the finished mark asserts
  // itself instead of just stopping.
  const markScale = useTransform(progress, [0.55, 0.78, 0.88], [0.9, 1.06, 1], { ease: EASE })

  const coreScale = useTransform(progress, [0.6, 0.79], [0, 1], { ease: EASE })
  const coreRotate = useTransform(progress, [0.6, 0.79], [-160, 0], { ease: EASE })
  const coreOpacity = useTransform(progress, [0.6, 0.7], [0, 1])

  // One bloom of heat at the moment the core seats, then it settles back.
  const flash = useTransform(progress, [0.72, 0.82, 0.95], [0, 1, 0.45])
  const coreGlow = useTransform(progress, [0.6, 0.8], [0, 0.8])

  // A single ring thrown off at the instant the core seats. One pass only —
  // repeat it and it stops reading as an impact and starts reading as a
  // loading spinner.
  const waveScale = useTransform(progress, [0.74, 0.95], [0.25, 2.5], { ease: EASE })
  const waveOpacity = useTransform(progress, [0.74, 0.8, 0.95], [0, 0.5, 0])

  // Orbit rings only appear once the thing they orbit exists.
  const orbitOpacity = useTransform(progress, [0.74, 0.92], [0, 1])

  // The floor lights up as the machine comes together.
  const gridOpacity = useTransform(progress, [0, 0.8], [0.28, 0.85])

  const nameOpacity = useTransform(progress, [0.8, 0.95], [0, 1])
  const nameY = useTransform(progress, [0.8, 0.95], [24, 0])

  const hintOpacity = useTransform(progress, [0, 0.12], [1, 0])

  return (
    <section ref={ref} className="relative h-[300vh] bg-ink-900 text-white sm:h-[340vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ opacity: gridOpacity }} className="grid-floor pointer-events-none absolute inset-0" />
        <motion.div
          aria-hidden="true"
          style={{ opacity: flash }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/30 blur-[130px]"
        />
        <motion.div
          aria-hidden="true"
          style={{ opacity: coreGlow }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/40 blur-[70px]"
        />

        {/* pt clears the fixed header — this panel is pinned to the very top
            of the viewport, so centring alone would slide the heading under it. */}
        <div className="container-x relative flex h-full w-full flex-col items-center justify-center pb-8 pt-[4.75rem]">
          <p className="eyebrow !text-brand-400">How the work fits together</p>
          <h2 className="mt-2.5 max-w-xl text-center font-display text-[1.6rem] font-bold leading-tight tracking-tight text-white sm:text-[2.1rem]">
            Four kinds of work, one team
          </h2>

          {/* The stage. Its width sets how far apart the four labels sit; the
              mark inside is sized off viewport *height*, because this panel is
              pinned and a mark sized on width alone pushes the name and the
              button off the bottom of a short laptop screen. */}
          <div className="relative mt-5 flex w-full max-w-[34rem] items-center justify-center py-10 sm:mt-6 sm:py-11">
            {/* Counter-rotating rings. They read as tolerance marks around a
                machined part rather than as decoration, which is why they are
                dashed and hairline rather than solid. */}
            <motion.div
              aria-hidden="true"
              style={{ opacity: orbitOpacity }}
              className="pointer-events-none absolute aspect-square h-[min(15rem,26vh)] animate-spin-slow rounded-full border border-dashed border-brand-500/55 sm:h-[min(25rem,45vh)]"
            />
            <motion.div
              aria-hidden="true"
              style={{ opacity: orbitOpacity }}
              className="pointer-events-none absolute aspect-square h-[min(17.5rem,30vh)] animate-spin-reverse rounded-full border border-dashed border-steel-500/35 sm:h-[min(29rem,52vh)]"
            />
            <motion.div
              aria-hidden="true"
              style={{ scale: waveScale, opacity: waveOpacity }}
              className="pointer-events-none absolute aspect-square h-[min(13rem,23vh)] rounded-full border-2 border-brand-400 sm:h-[min(22rem,40vh)]"
            />

            <motion.div
              style={{ rotate: markRotate, scale: markScale }}
              className="relative h-[min(13rem,23vh)] w-[min(13rem,23vh)] sm:h-[min(22rem,40vh)] sm:w-[min(22rem,40vh)]"
              role="img"
              aria-label="The Darsh Innovations mark, assembling"
            >
              {PARTS.map((part, i) => (
                <Part key={part.id} part={part} index={i} progress={progress} travelScale={travelScale} />
              ))}

              {/* The core: the middle of the same artwork, at the same scale,
                  dropped into the socket the four quarters leave open. */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  aria-hidden="true"
                  style={{ scale: coreScale, rotate: coreRotate, opacity: coreOpacity }}
                  className="h-full w-full overflow-hidden rounded-full"
                >
                  {/* 250% of the core is 100% of the stage, so the mark inside
                      lands at exactly the scale the quarters are drawn at. */}
                  <div className="absolute left-1/2 top-1/2 h-[250%] w-[250%] -translate-x-1/2 -translate-y-1/2">
                    <MarkFace />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {PARTS.map((part, i) => (
              <DisciplineTag key={part.id} part={part} index={i} progress={progress} />
            ))}
          </div>

          <motion.div style={{ opacity: nameOpacity, y: nameY }} className="mt-6 flex flex-col items-center sm:mt-7">
            <p className="font-display text-[1.6rem] font-extrabold leading-none tracking-[-0.02em] text-white sm:text-[2rem]">
              Darsh <span className="text-brand-500">Innovations</span>
            </p>
            <p className="mt-2 max-w-md text-center text-[0.85rem] leading-relaxed text-ink-400">
              The same team handles all four, so nothing is lost between them.
            </p>
            <Link to="/services" className="btn-primary mt-5 !px-5 !py-2.5 !text-[0.85rem]">
              See what we do
            </Link>
          </motion.div>

          <motion.p
            style={{ opacity: hintOpacity }}
            className="absolute bottom-5 text-[0.7rem] uppercase tracking-[0.2em] text-ink-500"
          >
            Scroll to assemble
          </motion.p>
        </div>
      </div>
    </section>
  )
}
