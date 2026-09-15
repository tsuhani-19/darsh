import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Check } from 'lucide-react'

/**
 * Overlapping stack. Each card owns a full viewport of scroll, pins in the
 * middle of the screen, then shrinks as the next card slides over it — so the
 * cards visibly pile up with the earlier ones peeking out behind.
 *
 * The previous version gave every card only its natural height, so the pin
 * distance was a few hundred pixels and the stack never actually formed.
 */
export default function StackCards({ items }) {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  return (
    <div ref={container} className="relative pb-[14vh]">
      {items.map((item, i) => (
        <StackCard key={item.step} item={item} index={i} total={items.length} progress={scrollYProgress} />
      ))}
    </div>
  )
}

function StackCard({ item, index, total, progress }) {
  // every card ends a little smaller than the one that lands on top of it
  const targetScale = 1 - (total - index) * 0.035
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])

  return (
    <div className="sticky top-[4.75rem] flex h-[82vh] items-center justify-center">
      <motion.article
        style={{
          scale,
          // each card rests slightly lower, so the stack edges stay visible
          top: `${index * 26 - 44}px`,
        }}
        className="relative w-full origin-top overflow-hidden rounded-3xl border border-line bg-white shadow-lift"
      >
        <div className="grid md:grid-cols-[1.05fr_0.95fr]">
          <div className="p-7 sm:p-10 lg:p-12">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-600 font-display text-[0.8rem] font-bold text-white">
                {item.step}
              </span>
              <span className="rounded-full bg-mist px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-ink-500">
                {item.duration}
              </span>
            </div>

            <h3 className="mt-5 font-display text-[1.6rem] font-bold tracking-tight text-ink-900 sm:text-[2rem]">
              {item.title}
            </h3>
            <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-ink-500">{item.text}</p>

            <p className="mt-7 flex items-start gap-2.5 border-t border-line pt-5 text-[0.88rem] font-medium text-ink-800">
              <Check size={15} className="mt-0.5 shrink-0 text-steel-500" />
              {item.deliverable}
            </p>
          </div>

          <div className="relative hidden md:block">
            <img src={item.image} alt="" loading="lazy" className="graded absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
      </motion.article>
    </div>
  )
}
