import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * A statement that lights up word by word as it passes through the viewport.
 * Each word gets its own slice of the scroll range, so the sentence "reads"
 * itself at the reader's pace.
 */
export default function ScrollHighlight({ text, accentFrom = 0, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.25'],
  })
  const words = text.split(' ')

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]} accent={i >= accentFrom}>
            {word}
          </Word>
        )
      })}
    </p>
  )
}

function Word({ children, progress, range, accent }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <span className="relative mr-[0.28em] mt-[0.16em]">
      <span className="absolute inset-0 opacity-15">{children}</span>
      <motion.span style={{ opacity }} className={accent ? 'text-brand-600' : ''}>
        {children}
      </motion.span>
    </span>
  )
}
