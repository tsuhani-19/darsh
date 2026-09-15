import { useRef } from 'react'
import {
  motion, useAnimationFrame, useMotionValue, useScroll,
  useSpring, useTransform, useVelocity, useMotionValueEvent,
} from 'framer-motion'

/**
 * Marquee whose speed and direction respond to how you are scrolling: flick
 * down and it accelerates, scroll up and the whole row reverses. It also skews
 * slightly with velocity, which is what sells the sense of momentum.
 */
function Row({ items, baseVelocity = 3 }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false })
  const skew = useTransform(smooth, [-2000, 0, 2000], [-4, 0, 4], { clamp: true })

  const direction = useRef(1)
  useMotionValueEvent(scrollVelocity, 'change', (v) => {
    if (v < 0) direction.current = -1
    else if (v > 0) direction.current = 1
  })

  // wrap over one copy's width; the row renders the list twice
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)

  useAnimationFrame((_, delta) => {
    let move = direction.current * baseVelocity * (delta / 1000)
    move += direction.current * move * factor.get()
    baseX.set(baseX.get() + move)
  })

  return (
    <motion.div style={{ skewX: skew }} className="flex overflow-hidden">
      <motion.div style={{ x }} className="flex min-w-max gap-10 whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-[1.35rem] font-semibold tracking-tight text-ink-300 sm:text-[1.7rem]">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
          </span>
        ))}
      </motion.div>
    </motion.div>
  )
}

function wrap(min, max, v) {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

export default function VelocityMarquee({ items }) {
  const half = Math.ceil(items.length / 2)
  return (
    <div className="space-y-3 py-2">
      <Row items={items.slice(0, half)} baseVelocity={2.5} />
      <Row items={items.slice(half)} baseVelocity={-2} />
    </div>
  )
}
