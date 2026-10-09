import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Check } from 'lucide-react'
import { useNarrowScreen, useShortScreen } from './ui.jsx'

/**
 * Overlapping stack. Each card owns a full viewport of scroll, pins in the
 * middle of the screen, then shrinks as the next card slides over it — so the
 * cards visibly pile up with the earlier ones peeking out behind.
 *
 * Two things the first pass got wrong, both fixed here:
 *
 *  - the photo was `hidden md:block`, so on a phone — where most of this
 *    traffic lands — every card was a wall of text and the section lost the
 *    one thing that made it worth scrolling;
 *  - the card was given 82vh whatever was in it, so four short paragraphs
 *    floated in a half-empty sheet. The card is now sized from its content
 *    and the column is centred in it, so the sheet is full at any width.
 *
 * Pinning also needs a tall viewport to read as a stack at all. On a phone or
 * a landscape screen the cards render as an ordinary list instead, photo
 * first, which is the same information without the scroll hijack.
 */
export default function StackCards({ items }) {
  const container = useRef(null)
  const narrow = useNarrowScreen()
  const short = useShortScreen()
  const plain = narrow || short

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  if (plain) {
    return (
      <div className="space-y-5">
        {items.map((item) => (
          <PlainCard key={item.step} item={item} total={items.length} />
        ))}
      </div>
    )
  }

  return (
    <div ref={container} className="relative pb-[12vh]">
      {items.map((item, i) => (
        <StackCard key={item.step} item={item} index={i} total={items.length} progress={scrollYProgress} />
      ))}
    </div>
  )
}

/* ------------------------------ pinned card ------------------------------ */

function StackCard({ item, index, total, progress }) {
  // every card ends a little smaller than the one that lands on top of it
  const targetScale = 1 - (total - index) * 0.035
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])

  return (
    <div className="sticky top-[5.5rem] flex h-[88vh] items-center justify-center">
      <motion.article
        style={{
          scale,
          // each card rests slightly lower, so the stack edges stay visible
          top: `${index * 22 - 36}px`,
        }}
        className="relative w-full origin-top overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-lift"
      >
        <div className="grid min-h-[27rem] lg:min-h-[30rem] md:grid-cols-[1.02fr_0.98fr]">
          <CardBody item={item} total={total} />
          <Photo item={item} className="hidden md:block" />
        </div>
      </motion.article>
    </div>
  )
}

/* ------------------------- phone / short-screen card ---------------------- */

function PlainCard({ item, total }) {
  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-lift">
      <Photo item={item} className="h-48 sm:h-60" />
      <CardBody item={item} total={total} />
    </article>
  )
}

/* -------------------------------- pieces --------------------------------- */

/**
 * `fit: 'contain'` on the item, for artwork that carries its own typography.
 *
 * The panel is close to square and the launch poster is 16:9, so `cover` was
 * scaling it up and taking the headline off the left edge. Contained, it shows
 * whole; a blurred, over-scaled copy of the same picture fills what is left so
 * the panel still reads as a photograph rather than a letterboxed one. Stock
 * photographs stay on `cover` — they have nothing in them to lose.
 */
function Photo({ item, className = '' }) {
  const contain = item.fit === 'contain'

  return (
    <div className={`graded-frame relative bg-ink-100 ${className}`}>
      {contain && (
        <img
          src={item.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl"
        />
      )}
      <img
        src={item.image}
        alt=""
        loading="lazy"
        className={`graded absolute inset-0 h-full w-full ${contain ? 'object-contain' : 'object-cover'}`}
      />
    </div>
  )
}

function CardBody({ item, total }) {
  return (
    <div className="flex flex-col justify-center gap-6 p-7 sm:p-10 lg:p-14">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-600 font-display text-[0.8rem] font-bold text-white">
          {item.step}
        </span>
        <span className="rounded-full bg-mist px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-ink-500">
          {item.duration}
        </span>
        <span className="ml-auto font-display text-[0.72rem] font-semibold tracking-[0.18em] text-ink-300">
          {item.step} / {String(total).padStart(2, '0')}
        </span>
      </div>

      <div>
        <h3 className="font-display text-[1.6rem] font-bold tracking-tight text-ink-900 sm:text-[2rem] lg:text-[2.3rem]">
          {item.title}
        </h3>
        <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-ink-500">{item.text}</p>
      </div>

      <p className="flex items-start gap-2.5 text-[0.88rem] font-medium text-ink-800">
        <Check size={15} className="mt-0.5 shrink-0 text-steel-500" />
        {item.deliverable}
      </p>
    </div>
  )
}
