import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import PageTransition from '../components/PageTransition.jsx'
import PageHero from '../components/PageHero.jsx'
import AuroraMesh from '../components/AuroraMesh.jsx'
import { AboutArt } from '../components/heroArt.jsx'
import { MaskedHeading, Reveal, RevealImage, SectionHeading, SlideIn } from '../components/ui.jsx'
import { CTA } from './Home.jsx'
import { capabilities } from '../data.js'
import { img } from '../images.js'

const refusals = [
  {
    t: 'Work we are not the right fit for',
    d: 'Wrong scope, wrong timeline, or a job another team would honestly do better. We say so on the first call rather than three weeks in.',
  },
  {
    t: 'Features that will not earn their place',
    d: 'If a feature will not help your customers, we will make the case against building it, even though building it would add to the invoice.',
  },
  {
    t: 'Open-ended hourly arrangements',
    d: 'Scope and price are agreed in writing before work starts. If we underestimate something, that is ours to absorb — it does not appear on your invoice.',
  },
  {
    t: 'Handing your project to someone else',
    d: 'The people you meet are the people who build it. Nothing is quietly passed to someone else once the contract is signed.',
  },
]

export default function About() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="About"
        lines={['A small studio that', 'would rather do', 'four things properly.']}
        subtitle="Darsh Innovations is a digital studio in Mumbai. We design and build websites, web apps and mobile apps, and we run the marketing and video work that brings people to them."
        chips={['Design', 'Engineering', 'Marketing', 'Video', 'Mumbai']}
        actions={
          <>
            <Link to="/contact" className="btn-spectrum">
              Work with us <ArrowRight size={15} />
            </Link>
            <Link to="/services" className="btn-outline">
              What we do
            </Link>
          </>
        }
        art={<AboutArt />}
      />

      {/* editorial story: tall image beside offset text */}
      <section className="snap-sec py-20 sm:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SlideIn from="left">
            <RevealImage src={img.aboutStory} alt="Working session" className="aspect-[3/4] rounded-2xl" />
          </SlideIn>
          <div className="lg:pt-10">
            <Reveal>
              <p className="eyebrow mb-5">Why we exist</p>
            </Reveal>
            <MaskedHeading
              lines={['Four vendors,', 'four versions of', 'your brand.']}
              className="font-display text-[2rem] font-bold leading-[1.12] tracking-[-0.025em] text-ink-900 sm:text-[2.6rem]"
            />
            <Reveal delay={0.2}>
              <p className="lede mt-6">
                The usual setup is a design agency, a development shop, a media buyer and a
                freelance editor who have never spoken to each other. A little of the original
                intent is lost at each handover, the brand slowly drifts, and when something
                breaks everybody points at somebody else.
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <p className="lede mt-4">
                We put those four disciplines in one studio and take on a small number of
                projects at a time. That is the whole idea: fewer clients than a large agency
                would carry, and work that holds together because the same people made all of it.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* full-bleed statement over a wide image */}
      <section className="snap-sec relative">
        <div className="relative h-[22rem] overflow-hidden sm:h-[26rem]">
          <img src={img.aboutWide} alt="" className="graded absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-ink-900/80" />
          <AuroraMesh intensity={0.3} />
          {/* The aurora's four blobs are each 30% opaque, so stacked over a
              short band they lift it far past what the scrim underneath can
              hold down — and white type on that washes out. This scrim sits
              ABOVE the aurora and is weighted to the left, where the heading
              is, so the glow still reads on the open right-hand side. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-ink-900/85 via-ink-900/60 to-transparent"
          />
          <div className="container-x relative flex h-full items-center">
            <MaskedHeading
              lines={['We would rather say no', 'than take on work we', 'cannot do well.']}
              className="max-w-3xl font-display text-[1.6rem] font-bold leading-[1.25] tracking-[-0.02em] text-white sm:text-[2.4rem]"
            />
          </div>
        </div>
      </section>

      {/* manifesto list — type only, no imagery */}
      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow="What we turn down" lines={['Four kinds of', 'work we decline.']} />
          </div>
          <ol className="border-t border-line">
            {refusals.map((r, i) => (
              <motion.li
                key={r.t}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group border-b border-line py-7"
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-display text-[0.78rem] font-semibold tabular-nums text-ink-300 transition-colors group-hover:text-crimson-500">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.25rem] font-semibold tracking-tight text-ink-900 transition-transform duration-500 group-hover:translate-x-1 sm:text-[1.5rem]">
                      {r.t}
                    </h3>
                    <p className="mt-2.5 max-w-xl text-[0.9rem] leading-relaxed text-ink-500">{r.d}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* capabilities */}
      <section className="snap-sec border-t border-line py-20 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading eyebrow="Capabilities" lines={['What we work with.']} />
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2.5">
              {capabilities.map((c, i) => (
                <motion.span
                  key={c}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.03 }}
                  whileHover={{ y: -3 }}
                  className="rounded-full border border-line bg-white px-4 py-2 text-[0.85rem] text-ink-600"
                >
                  {c}
                </motion.span>
              ))}
            </div>
            <p className="mt-6 max-w-xl text-[0.9rem] leading-relaxed text-ink-400">
              We choose tools to suit the project rather than the other way round. If nothing
              here fits what you need, we will point you to what does.
            </p>
          </Reveal>
        </div>
      </section>

      <CTA />
    </PageTransition>
  )
}
