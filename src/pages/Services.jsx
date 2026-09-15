import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Plus } from 'lucide-react'

import PageTransition from '../components/PageTransition.jsx'
import PageHero from '../components/PageHero.jsx'
import { ServicesArt } from '../components/heroArt.jsx'
import { Reveal, SectionHeading } from '../components/ui.jsx'
import ServiceAccordion from '../components/ServiceAccordion.jsx'
import ProcessTimeline from '../components/ProcessTimeline.jsx'
import LayerStack from '../components/LayerStack.jsx'
import { CTA } from './Home.jsx'
import { services, serviceCategories, process, faqs } from '../data.js'

const stacks = [
  { group: 'Front end', items: ['React', 'Next.js', 'Vue', 'TypeScript', 'Tailwind CSS'] },
  { group: 'Back end', items: ['Node.js', 'Rust', 'Python', 'PostgreSQL', 'Redis'] },
  { group: 'Mobile', items: ['React Native', 'Flutter', 'Swift', 'Kotlin'] },
  { group: 'Growth & studio', items: ['Meta Ads', 'Google Ads', 'GA4', 'Premiere Pro', 'After Effects'] },
]

export default function Services() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Services"
        lines={['Everything you need', 'to launch it, and', 'then grow it.']}
        subtitle="Take one service or hand us the whole thing. Either way you get one team, one timeline and one person answerable for the outcome."
        chips={['Nine disciplines', 'One point of contact', 'Fixed quotes']}
        actions={
          <Link to="/contact" className="btn-spectrum">
            Start a project <ArrowRight size={15} />
          </Link>
        }
        art={<ServicesArt />}
      />

      <section className="snap-sec py-16 sm:py-20">
        <div className="container-x">
          <ServiceAccordion items={services} categories={serviceCategories} />
        </div>
      </section>

      <section className="snap-sec border-y border-line bg-mist py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Engagement"
            lines={['From first call', 'to live product.']}
            subtitle="Every stage has a date, a deliverable and a price attached before it starts."
            className="mb-14"
          />
          <ProcessTimeline items={process} />
        </div>
      </section>

      <LayerStack />

      <section className="snap-sec py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Tooling" lines={['What we build with.']} />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stacks.map((st, i) => (
              <Reveal key={st.group} delay={i * 0.07}>
                <div className="border-t border-line pt-5">
                  <h3 className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-ink-900">
                    {st.group}
                  </h3>
                  <ul className="mt-4 space-y-2 text-[0.88rem] text-ink-500">
                    {st.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-24 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow="Questions" lines={['The ones we get', 'every week.']} />
            <Reveal delay={0.2}>
              <Link to="/contact" className="btn-primary mt-8">
                Ask us something else <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>
          <div className="border-t border-line">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05}>
                <Accordion {...f} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </PageTransition>
  )
}

function Accordion({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-6 py-5 text-left"
      >
        <span className="font-display text-[1.02rem] font-semibold tracking-tight text-ink-900">{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} className="mt-0.5 shrink-0 text-ink-400">
          <Plus size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 text-[0.92rem] leading-relaxed text-ink-500">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
