import { useRef } from 'react'
import { cubicBezier, motion, useScroll, useSpring, useTransform } from 'framer-motion'

/**
 * The second scroll-scrubbed assembly on the site, and deliberately not a
 * repeat of the first. AssemblyEngine converges four parts radially into a
 * mark; this one stacks five slabs vertically in 3D into a cross-section of a
 * product. Same engine, opposite geometry — so the two read as one family
 * without either feeling like the other played twice.
 *
 * The content is the reason it belongs on this page: the Tooling grid below
 * lists what we build with, and this shows what those tools are building. The
 * list beside the deck lights up in step with the slabs, so the reader can
 * follow either the picture or the words.
 */

const EASE = cubicBezier(0.22, 1, 0.36, 1)

// Travel is eased differently, for the same reason as AssemblyEngine: the
// standard ease covers 76% of the distance in the first 25% of the window, so a
// slab appeared almost fully landed and — scrolling back up — slipped off its
// shelf and vanished rather than visibly returning to where it flew in from.
// This spreads the distance across the window while still settling onto the
// shelf, so the build reads the same in both directions.
const TRAVEL = cubicBezier(0.4, 0, 0.2, 1)

// Bottom of the stack first — the order slabs physically sit in, which is also
// the order they get built in.
const LAYERS = [
  {
    id: 'infra',
    label: 'Infrastructure',
    detail: 'Hosting, pipelines, backups, monitoring',
    face: 'from-ink-700 to-ink-800',
    edge: 'bg-ink-900',
    from: -520,
  },
  {
    id: 'data',
    label: 'Data & APIs',
    detail: 'Schemas, services, third-party integrations',
    face: 'from-steel-700 to-ink-700',
    edge: 'bg-ink-800',
    from: 520,
  },
  {
    id: 'logic',
    label: 'Application logic',
    detail: 'Rules, roles, permissions, workflows',
    face: 'from-brand-900 to-brand-800',
    edge: 'bg-brand-900',
    from: -520,
  },
  {
    id: 'interface',
    label: 'Interface',
    detail: 'Design system, screens, states, motion',
    face: 'from-brand-600 to-brand-500',
    edge: 'bg-brand-800',
    marks: true,
    from: 520,
  },
  {
    id: 'growth',
    label: 'Growth & measurement',
    detail: 'Search, ads, analytics, iteration',
    face: 'from-steel-100 to-steel-300',
    edge: 'bg-steel-500',
    from: -520,
  },
]

const windowFor = (i) => [0.04 + i * 0.125, 0.04 + i * 0.125 + 0.32]

// Middle slab sits at z=0, so the deck grows evenly either side of the plate.
const MID = (LAYERS.length - 1) / 2

function Slab({ layer, index, progress }) {
  const [start, end] = windowFor(index)
  const opts = { ease: TRAVEL }

  const x = useTransform(progress, [start, end], [layer.from, 0], opts)
  // Slabs come in from well above the deck and settle onto their own shelf.
  // The gap has to clear the slab's own thickness once foreshortened by the
  // deck's 46° tilt, or five layers read as one thick slab.
  //
  // Centred on zero rather than stacked up from it: at 64px a side, five
  // layers spread ~180px on screen, and growing that spread in one direction
  // walks the top slab straight up into the heading.
  const z = useTransform(progress, [start, end], [460, (index - MID) * 64], opts)
  const rotate = useTransform(progress, [start, end], [layer.from > 0 ? 14 : -14, 0], opts)
  // A brief fade at the very start of the window, not a quarter of it: the slab
  // has to be on screen for its flight, not just for the landing.
  const opacity = useTransform(progress, [start, start + 0.025], [0, 1])

  // Flashes at the moment its row in the list lights, then falls back to a
  // trace. Held at full, five lit rims at rest is five red outlines competing
  // with the plate colours they are supposed to be pointing at.
  const rim = useTransform(progress, [end - 0.1, end, end + 0.1], [0, 1, 0.15])

  return (
    <motion.div
      style={{ x, z, rotate, opacity }}
      className="[grid-area:1/1] h-[5.5rem] w-[19rem] place-self-center [transform-style:preserve-3d] sm:h-[6.5rem] sm:w-[24rem]"
    >
      {/* The side wall. A flat rectangle reads as a card; one dark copy sitting
          a few pixels behind it reads as a plate with thickness, which is what
          makes the deck look machined rather than printed. */}
      <div
        className={`absolute inset-0 rounded-[1.25rem] ${layer.edge} [transform:translateZ(-16px)]`}
      />
      {/* No box-shadow on the plates, deliberately. Three stacked shadows on a
          3D-transformed, promoted layer have to be re-rasterised every frame,
          and five of them was enough to stall the compositor outright. The
          depth here comes from the side wall and the one ground shadow below;
          a hairline top highlight does the rest. */}
      <div
        className={`absolute inset-0 rounded-[1.25rem] bg-gradient-to-br ${layer.face} ring-1 ring-white/10`}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[1.25rem] bg-white/30" />
      <motion.div
        style={{ opacity: rim }}
        className="absolute inset-0 rounded-[1.25rem] ring-2 ring-brand-400/70"
      />
      {layer.marks && (
        <div className="absolute inset-0 flex flex-col justify-center gap-1.5 px-6">
          <span className="h-1.5 w-1/3 rounded-full bg-white/45" />
          <span className="h-1.5 w-2/3 rounded-full bg-white/25" />
          <span className="h-1.5 w-1/2 rounded-full bg-white/25" />
        </div>
      )}
    </motion.div>
  )
}

function LayerRow({ layer, index, progress }) {
  const [, end] = windowFor(index)
  const opacity = useTransform(progress, [end - 0.1, end], [0.25, 1])
  const x = useTransform(progress, [end - 0.1, end], [-10, 0])
  const rule = useTransform(progress, [end - 0.1, end], [0, 1])

  return (
    <motion.li style={{ opacity, x }} className="relative py-3.5 pl-5">
      {/* The rule fills rather than fades, so the column reads as a level
          rising through the stack as each slab lands. */}
      <span className="absolute inset-y-0 left-0 w-[2px] rounded-full bg-white/10" />
      <motion.span
        style={{ scaleY: rule }}
        className="absolute inset-y-0 left-0 w-[2px] origin-top rounded-full bg-brand-500"
      />
      <p className="font-display text-[1rem] font-bold text-white">
        <span className="mr-2 text-[0.72rem] font-semibold tabular-nums text-brand-400">
          {String(index + 1).padStart(2, '0')}
        </span>
        {layer.label}
      </p>
      <p className="mt-0.5 text-[0.82rem] leading-snug text-ink-400">{layer.detail}</p>
    </motion.li>
  )
}

export default function LayerStack() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Same reason as AssemblyEngine: a wheel notch is one jump, and a transform
  // driven straight off raw scroll progress steps rather than travels.
  const progress = useSpring(scrollYProgress, {
    // Soft and heavily damped. Stiffer than this and the spring tracks the
    // wheel's steps closely enough to reproduce them; this glides through a
    // notch instead, and still settles without visible overshoot.
    stiffness: 48,
    damping: 26,
    mass: 0.34,
    restDelta: 0.00005,
  })

  const glow = useTransform(progress, [0.6, 0.9], [0, 0.7])
  const hintOpacity = useTransform(progress, [0, 0.12], [1, 0])

  // The plate keeps turning a few degrees across the whole section. Motion that
  // continues after the last part lands is what stops the finished deck looking
  // like a still image the scroll happened to stop on.
  const deckTurn = useTransform(progress, [0, 1], [-34, -20])
  const shadow = useTransform(progress, [0.1, 0.8], [0, 0.55])

  return (
    <section ref={ref} className="relative h-[300vh] bg-ink-900 text-white sm:h-[330vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="grid-floor pointer-events-none absolute inset-0 opacity-40" />
        <motion.div
          aria-hidden="true"
          style={{ opacity: glow }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/25 blur-[120px]"
        />

        <div className="container-x relative flex h-full w-full flex-col justify-center pb-8 pt-[4.75rem]">
          <div className="text-center lg:text-left">
            <p className="eyebrow !text-brand-400">Under the hood</p>
            <h2 className="mt-2.5 font-display text-[1.6rem] font-bold leading-tight tracking-tight text-white sm:text-[2.1rem]">
              Every build is five layers deep
            </h2>
          </div>

          <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            {/* The deck. perspective on the parent, preserve-3d on the plate,
                so each slab's translateZ actually lifts it off the one below
                instead of just scaling it. */}
            {/* min-h reserves the room the deck needs once its layers are spread —
                the slabs all share one grid cell, so the cell itself is only ever
                one slab tall and cannot reserve it on its own. */}
            <div className="perspective-1200 flex min-h-[21rem] items-center justify-center lg:min-h-[25rem]">
              <motion.div
                className="grid [transform-style:preserve-3d]"
                style={{ rotateX: 46, rotateZ: deckTurn }}
              >
                {/* Contact shadow on the deck's floor, well below the lowest
                    plate. Without it the stack floats in the dark with nothing
                    to sit on. */}
                <motion.div
                  aria-hidden="true"
                  style={{
                    opacity: shadow,
                    // A radial gradient, not a blur filter: blurring a layer
                    // that also carries a 3D transform drops the compositor onto
                    // a slow path, and five plates and a bloom are already on
                    // this frame.
                    background:
                      'radial-gradient(closest-side, rgba(0,0,0,0.85), rgba(0,0,0,0.45) 55%, rgba(0,0,0,0) 78%)',
                  }}
                  className="[grid-area:1/1] h-[9rem] w-[26rem] place-self-center [transform:translateZ(-190px)] sm:h-[11rem] sm:w-[32rem]"
                />
                {LAYERS.map((layer, i) => (
                  <Slab key={layer.id} layer={layer} index={i} progress={progress} />
                ))}
              </motion.div>
            </div>

            <ul className="mx-auto w-full max-w-sm lg:mx-0">
              {LAYERS.map((layer, i) => (
                <LayerRow key={layer.id} layer={layer} index={i} progress={progress} />
              ))}
            </ul>
          </div>

          <motion.p
            style={{ opacity: hintOpacity }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[0.7rem] uppercase tracking-[0.2em] text-ink-500"
          >
            Scroll to build
          </motion.p>
        </div>
      </div>
    </section>
  )
}
