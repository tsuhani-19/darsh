import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import PageTransition from '../components/PageTransition.jsx'
import PageHero from '../components/PageHero.jsx'
import AuroraMesh from '../components/AuroraMesh.jsx'
import { AboutArt } from '../components/heroArt.jsx'
import { MaskedHeading, Reveal, RevealImage, SectionHeading, SlideIn } from '../components/ui.jsx'
import { CTA } from './Home.jsx'
import { team, capabilities } from '../data.js'
import { img } from '../images.js'

const refusals = [
  {
    t: 'Work we are not the right fit for',
    d: 'Wrong scope, wrong timeline, or a job another team would genuinely do better. We say so on the first call rather than three weeks in.',
  },
  {
    t: 'Features that will not earn their place',
    d: 'If something will not serve your customers, we will argue against building it — even when building it would bill more hours.',
  },
  {
    t: 'Open-ended hourly arrangements',
    d: 'Scope and price are fixed in writing before work starts. Underestimating is our problem to absorb, not a surprise on your invoice.',
  },
  {
    t: 'Handing your project to someone else',
    d: 'The people you meet are the people who build it. No quiet transfer to juniors once the contract is signed.',
  },
]

export default function About() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="About"
        lines={['A small studio that', 'would rather do', 'four things properly.']}
        subtitle="Darsh Innovations is a digital studio in Mumbai. We design and build websites, web and mobile applications, then run the marketing and video work that makes them worth having."
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
                freelance editor who have never spoken to each other. Every handover loses a little
                intent. The brand drifts. And when something breaks, everybody points somewhere
                else.
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <p className="lede mt-4">
                We put those four disciplines in one studio and keep the client list short on
                purpose. That is the entire idea — fewer projects than a larger agency takes, and
                work that holds together because the same people made all of it.
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
          <div className="container-x relative flex h-full items-center">
            <MaskedHeading
              lines={['We would rather say no', 'than take work we', 'cannot do well.']}
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

      {/* team */}
      <section className="snap-sec border-t border-line bg-mist py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="The team"
            lines={['The people you', 'actually work with.']}
            subtitle="No account managers relaying messages. You talk directly to whoever is doing the work."
            className="mb-12"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <motion.article
                key={m.role}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl bg-ink-900"
              >
                <img
                  src={m.image}
                  alt={m.name}
                  loading="lazy"
                  className="graded aspect-[4/5] w-full object-cover opacity-85 transition-all [transition-duration:900ms] ease-out group-hover:scale-105 group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[0.75rem] font-medium text-brand-300">{m.role}</p>
                  <h3 className="mt-1 font-display text-[1.05rem] font-semibold tracking-tight text-white">
                    {m.name}
                  </h3>
                  <p className="mt-2 max-h-0 overflow-hidden text-[0.82rem] leading-relaxed text-white/70 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                    {m.bio}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
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
              We pick tools to fit the project rather than the other way round. If nothing here is
              right for what you need, we will tell you what is.
            </p>
          </Reveal>
        </div>
      </section>

      <CTA />
    </PageTransition>
  )
}
