import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Check, CheckCheck } from 'lucide-react'
import { services } from '../data.js'
import { img } from '../images.js'
import { site } from '../siteConfig.js'

const EASE = [0.22, 1, 0.36, 1]

/* ---------------------------------------------------------------------------
   About — twin vertical photo rails drifting in opposite directions.
   Deliberately nothing like the home hero's static collage.
--------------------------------------------------------------------------- */
const railA = [img.aboutRailA, img.aboutRailB, img.aboutRailC]
const railB = [img.aboutRailD, img.aboutRailE, img.aboutRailF]

function Rail({ shots, direction = 1, duration = 26 }) {
  const loop = [...shots, ...shots]
  return (
    <div className="flex-1">
      <motion.div
        animate={{ y: direction > 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        className="flex flex-col gap-4"
      >
        {loop.map((src, i) => (
          <div key={i} className="overflow-hidden rounded-xl bg-ink-100">
            <img src={src} alt="" loading="lazy" className="graded aspect-[3/4] w-full object-cover" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export function AboutArt() {
  return (
    <div className="relative mx-auto w-full max-w-[26rem] lg:max-w-none">
      <div className="flex h-[26rem] gap-4 overflow-hidden sm:h-[30rem]">
        <Rail shots={railA} direction={1} duration={28} />
        <Rail shots={railB} direction={-1} duration={34} />
      </div>

      {/* soft fades so the rails bleed out instead of cutting */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent" />

    </div>
  )
}

/* ---------------------------------------------------------------------------
   Services — one graded photograph, held in a frame that unmasks on arrival
   and drifts with the pointer.

   Two earlier versions were rejected: a static mosaic of nine tinted tiles,
   then those tiles scattering and snapping into formation, which read as a
   loading animation rather than a design. This is deliberately quiet — the
   nine disciplines are already listed, in full, a screen below.
--------------------------------------------------------------------------- */
export function ServicesArt() {
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const spring = { stiffness: 110, damping: 20, mass: 0.6 }
  const shiftX = useSpring(useTransform(px, [-0.5, 0.5], [-12, 12]), spring)
  const shiftY = useSpring(useTransform(py, [-0.5, 0.5], [-8, 8]), spring)

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
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="relative mx-auto w-full max-w-[26rem] lg:max-w-none"
    >
      <motion.div
        initial={{ clipPath: 'inset(10% 10% 10% 10% round 1rem)', opacity: 0 }}
        animate={{ clipPath: 'inset(0% 0% 0% 0% round 1rem)', opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
        className="relative overflow-hidden rounded-2xl bg-ink-100 shadow-lift"
      >
        <motion.div style={{ x: shiftX, y: shiftY }}>
          <motion.img
            src={img.svcHero}
            alt="The studio mid-project"
            initial={{ scale: 1.14 }}
            animate={{ scale: [1.05, 1.1, 1.05] }}
            transition={{ scale: { duration: 24, repeat: Infinity, ease: 'easeInOut' } }}
            className="graded aspect-[4/3.6] w-full object-cover"
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/55 via-transparent to-transparent" />

        {/* the count, set into the frame rather than floated beside it */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
          className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6"
        >
          <p className="font-display text-[0.95rem] font-semibold leading-tight text-white">
            Nine disciplines,
            <br />
            one team.
          </p>
          <p className="font-display text-[2.6rem] font-bold leading-none tabular-nums text-white/85">
            09
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, delay: 0.9, ease: EASE }}
        className="bg-spectrum absolute -bottom-3 left-0 h-[3px] w-2/5 origin-left rounded-full"
      />
    </div>
  )
}

/* ---------------------------------------------------------------------------
   Contact — a preview of the brief this page actually sends, typing itself
   out. It shows the mechanic instead of repeating the call/WhatsApp buttons
   that already sit in the page body.
--------------------------------------------------------------------------- */
const CHAT = [
  { from: 'them', text: `Hello ${site.name},` },
  { from: 'them', text: 'Looking for: Web application\nBudget: ₹2 – 5 lakh' },
  { from: 'them', text: 'We need an ops dashboard for about 40 people. Hoping to launch by March.' },
  { from: 'us', text: 'Got it — that is a clear scope. Free for a 30 minute call tomorrow?' },
]

export function ContactArt() {
  return (
    <div className="mx-auto w-full max-w-[24rem] overflow-hidden rounded-[1.75rem] border-[6px] border-ink-900 bg-ink-900 shadow-deep lg:max-w-[25rem]">
      <div className="flex items-center gap-2.5 bg-ink-800 px-4 py-3">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-steel-400 opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-steel-400" />
        </span>
        <p className="text-[0.78rem] font-medium text-white">{site.name}</p>
        <p className="ml-auto text-[0.66rem] text-ink-400">online</p>
      </div>

      <div className="space-y-2 bg-ink-900 px-3.5 py-4">
        {CHAT.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.5 + i * 0.55, ease: EASE }}
            className={`flex ${m.from === 'us' ? 'justify-start' : 'justify-end'}`}
          >
            <span
              className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-[0.8rem] leading-relaxed ${
                m.from === 'us'
                  ? 'rounded-bl-sm bg-ink-700 text-white/85'
                  : 'rounded-br-sm bg-steel-600 text-white'
              }`}
            >
              {m.text}
              {m.from !== 'us' && (
                <CheckCheck size={13} className="ml-1.5 inline-block -translate-y-px text-white/60" />
              )}
            </span>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.9 }}
          className="flex items-center justify-center gap-2 pt-2 text-[0.68rem] text-ink-400"
        >
          <Check size={12} className="text-steel-400" />
          This is what the form below sends
        </motion.div>
      </div>
    </div>
  )
}
