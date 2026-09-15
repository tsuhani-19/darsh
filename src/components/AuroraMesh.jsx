import { motion } from 'framer-motion'

/**
 * Slow-drifting colour field built from the logo's own materials — two reds, a
 * molten highlight and a silver bloom. Sits behind dark sections so they glow
 * like lacquer under a light instead of reading as flat ink.
 */
export default function AuroraMesh({ intensity = 0.5 }) {
  const blobs = [
    { c: 'bg-steel-200', pos: '-left-24 -top-20 h-[26rem] w-[26rem]', dur: 19, path: { x: [0, 70, -30, 0], y: [0, 50, 90, 0] } },
    { c: 'bg-brand-500', pos: 'left-1/3 -top-28 h-[30rem] w-[30rem]', dur: 23, path: { x: [0, -80, 40, 0], y: [0, 70, -20, 0] } },
    { c: 'bg-crimson-500', pos: '-right-20 top-0 h-[28rem] w-[28rem]', dur: 21, path: { x: [0, -50, 30, 0], y: [0, 60, 20, 0] } },
    { c: 'bg-gold-400', pos: 'right-1/4 -bottom-32 h-[24rem] w-[24rem]', dur: 26, path: { x: [0, 60, -40, 0], y: [0, -50, 30, 0] } },
  ]

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          animate={{ ...b.path, scale: [1, 1.18, 0.94, 1] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut' }}
          style={{ opacity: intensity }}
          className={`absolute rounded-full blur-[110px] ${b.c} ${b.pos}`}
        />
      ))}
    </div>
  )
}
