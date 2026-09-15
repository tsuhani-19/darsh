import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { cubicBezier, motion, useScroll, useSpring, useTransform } from 'framer-motion'

/**
 * Exploded assembly. Four blades fly in from off-screen, rotate into register
 * and lock together into the mark; the star core drops in last and the name
 * resolves under it.
 *
 * The point is not that it moves — it is that the four blades are the four
 * things the studio actually sells. Each one carries its discipline in as it
 * arrives, so by the time the mark is whole the reader has been told what is
 * inside it. A decorative assembly would play exactly the same and mean
 * nothing; this one is the positioning statement, animated.
 *
 * Scroll-scrubbed rather than time-based: the reader sets the pace, can stop
 * halfway, and can scrub back up to watch a part seat again.
 */

// Arcs are the same four in public/logo-mark.svg — one circle, 90° apart,
// each sweeping 150°. Kept literal rather than generated so this and the
// static mark can never drift apart.
const BLADES = [
  {
    id: 'build',
    label: 'Build',
    blurb: 'Sites, apps, platforms',
    d: 'M68.3 178.1 A78 78 0 0 1 154.7 54.7',
    gradient: 'asm-red',
    from: { x: -300, y: -210, rotate: -165 },
    at: 'left-0 top-0 text-left',
  },
  {
    id: 'grow',
    label: 'Grow',
    blurb: 'Search, ads, content',
    d: 'M187.7 77.9 A78 78 0 0 1 101.3 201.3',
    gradient: 'asm-red-deep',
    from: { x: 310, y: -180, rotate: 175 },
    at: 'right-0 top-0 text-right',
  },
  {
    id: 'create',
    label: 'Create',
    blurb: 'Film, motion, design',
    d: 'M178.1 187.7 A78 78 0 0 1 54.7 101.3',
    gradient: 'asm-silver',
    from: { x: 280, y: 240, rotate: 150 },
    at: 'right-0 bottom-0 text-right',
  },
  {
    id: 'automate',
    label: 'Automate',
    blurb: 'Workflows, assistants',
    d: 'M77.9 68.3 A78 78 0 0 1 201.3 154.7',
    gradient: 'asm-ink',
    from: { x: -290, y: 220, rotate: -145 },
    at: 'left-0 bottom-0 text-left',
  },
]

// Each blade gets its own slice of the scroll so they seat one behind another
// rather than all at once.
const windowFor = (i) => [0.03 + i * 0.085, 0.03 + i * 0.085 + 0.4]

// The site's standard ease. Linear travel is the thing that makes a
// scroll-scrubbed assembly feel like a slider being dragged; decelerating into
// register is what makes it feel like a part being seated.
const EASE = cubicBezier(0.22, 1, 0.36, 1)

/**
 * One pass of a blade. `lag` offsets its scroll window, so a copy drawn with a
 * small lag sits a little behind the real part — three passes stacked is a
 * cheap, controllable motion blur that a filter could not do at this cost.
 */
function BladePath({ blade, index, progress, lag = 0, ghost = 0 }) {
  const [s0, e0] = windowFor(index)
  const start = s0 + lag
  const end = e0 + lag
  const opts = { ease: EASE }

  const x = useTransform(progress, [start, end], [blade.from.x, 0], opts)
  const y = useTransform(progress, [start, end], [blade.from.y, 0], opts)
  const rotate = useTransform(progress, [start, end], [blade.from.rotate, 0], opts)
  const scale = useTransform(progress, [start, end], [0.5, 1], opts)
  // Trailing copies burn off as the part lands, so the blur only exists while
  // there is actually movement to blur.
  const opacity = useTransform(
    progress,
    ghost ? [start, start + 0.08, end - 0.06, end] : [start, start + 0.1],
    ghost ? [0, ghost, ghost, 0] : [0, 1],
  )

  return (
    <motion.path
      d={blade.d}
      fill="none"
      stroke={`url(#${blade.gradient})`}
      strokeWidth={30}
      strokeLinecap="round"
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        // Without view-box these translations would be in CSS pixels and the
        // rotation would pivot on the blade's own bounding box, not the mark's
        // centre — so the parts would swing rather than seat.
        transformBox: 'view-box',
        transformOrigin: '128px 128px',
      }}
    />
  )
}

function Blade({ blade, index, progress }) {
  return (
    <>
      <BladePath blade={blade} index={index} progress={progress} lag={0.055} ghost={0.16} />
      <BladePath blade={blade} index={index} progress={progress} lag={0.028} ghost={0.32} />
      <BladePath blade={blade} index={index} progress={progress} />
    </>
  )
}

function DisciplineTag({ blade, index, progress }) {
  const [, end] = windowFor(index)
  const opacity = useTransform(progress, [end - 0.12, end + 0.02], [0, 1])
  const y = useTransform(progress, [end - 0.12, end + 0.02], [14, 0])

  return (
    <motion.div style={{ opacity, y }} className={`absolute ${blade.at} max-w-[8.5rem]`}>
      <p className="font-display text-[0.95rem] font-bold text-white sm:text-[1.05rem]">{blade.label}</p>
      <p className="mt-0.5 text-[0.72rem] leading-snug text-ink-400">{blade.blurb}</p>
    </motion.div>
  )
}

export default function AssemblyEngine() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

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

  const starScale = useTransform(progress, [0.6, 0.79], [0, 1], { ease: EASE })
  const starRotate = useTransform(progress, [0.6, 0.79], [-160, 0], { ease: EASE })
  const starOpacity = useTransform(progress, [0.6, 0.7], [0, 1])

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
            Four disciplines, one moving part
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
              className="pointer-events-none absolute aspect-square h-[min(25rem,45vh)] animate-spin-slow rounded-full border border-dashed border-brand-500/55"
            />
            <motion.div
              aria-hidden="true"
              style={{ opacity: orbitOpacity }}
              className="pointer-events-none absolute aspect-square h-[min(29rem,52vh)] animate-spin-reverse rounded-full border border-dashed border-steel-500/35"
            />
            <motion.div
              aria-hidden="true"
              style={{ scale: waveScale, opacity: waveOpacity }}
              className="pointer-events-none absolute aspect-square h-[min(22rem,40vh)] rounded-full border-2 border-brand-400"
            />

            <motion.svg
              viewBox="0 0 256 256"
              style={{ rotate: markRotate, scale: markScale }}
              className="relative h-[min(22rem,40vh)] w-[min(22rem,40vh)] overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="asm-red" x1="46" y1="176" x2="176" y2="52" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF4A44" />
                  <stop offset="0.45" stopColor="#E8161F" />
                  <stop offset="1" stopColor="#8E0A12" />
                </linearGradient>
                <linearGradient id="asm-red-deep" x1="196" y1="72" x2="96" y2="204" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#C80B14" />
                  <stop offset="0.5" stopColor="#E8161F" />
                  <stop offset="1" stopColor="#FF6B4A" />
                </linearGradient>
                <linearGradient id="asm-silver" x1="180" y1="196" x2="52" y2="104" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFFFFF" />
                  <stop offset="0.5" stopColor="#E4E6EA" />
                  <stop offset="1" stopColor="#9AA0A8" />
                </linearGradient>
                {/* Lifted off the logo's piano black — true black would vanish
                    against this section's ground. */}
                <linearGradient id="asm-ink" x1="74" y1="62" x2="204" y2="160" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#7C828B" />
                  <stop offset="0.5" stopColor="#3D4046" />
                  <stop offset="1" stopColor="#1B1D21" />
                </linearGradient>
                <linearGradient id="asm-star" x1="104" y1="100" x2="152" y2="158" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF4A44" />
                  <stop offset="1" stopColor="#A00810" />
                </linearGradient>
              </defs>

              {BLADES.map((blade, i) => (
                <Blade key={blade.id} blade={blade} index={i} progress={progress} />
              ))}

              <motion.path
                d="M128 86 C132.6 117 139 123.4 170 128 C139 132.6 132.6 139 128 170 C123.4 139 117 132.6 86 128 C117 123.4 123.4 117 128 86 Z"
                fill="url(#asm-star)"
                style={{
                  scale: starScale,
                  rotate: starRotate,
                  opacity: starOpacity,
                  transformBox: 'view-box',
                  transformOrigin: '128px 128px',
                }}
              />
            </motion.svg>

            {BLADES.map((blade, i) => (
              <DisciplineTag key={blade.id} blade={blade} index={i} progress={progress} />
            ))}
          </div>

          <motion.div style={{ opacity: nameOpacity, y: nameY }} className="mt-6 flex flex-col items-center sm:mt-7">
            <p className="font-display text-[1.6rem] font-extrabold leading-none tracking-[-0.02em] text-white sm:text-[2rem]">
              Darsh <span className="text-brand-500">Innovations</span>
            </p>
            <p className="mt-2 max-w-md text-center text-[0.85rem] leading-relaxed text-ink-400">
              One senior team holds all four — so nothing is lost in a handover.
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
