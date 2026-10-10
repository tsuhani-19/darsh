import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import PageTransition from '../components/PageTransition.jsx'
import PageHero from '../components/PageHero.jsx'
import { ServicesArt } from '../components/heroArt.jsx'
import { Reveal, SectionHeading } from '../components/ui.jsx'
import ServiceAccordion from '../components/ServiceAccordion.jsx'
import ProcessTimeline from '../components/ProcessTimeline.jsx'
import LayerStack from '../components/LayerStack.jsx'
import FaqAccordion from '../components/FaqAccordion.jsx'
import { CTA } from './Home.jsx'
import { services, process, faqs } from '../data.js'
import { servicePages } from '../content/servicePages.js'
import { whatsappLink } from '../siteConfig.js'

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
        lines={['Build it, launch it,', 'then grow it.']}
        subtitle="Take a single service or hand over the whole project. Either way there is one team, one schedule, and one person you can ask about any part of it."
        chips={['Seven services', 'One point of contact', 'Fixed quotes']}
        actions={
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-spectrum"
          >
            Start a project <ArrowRight size={15} />
          </a>
        }
        art={<ServicesArt />}
      />

      <section className="snap-sec py-16 sm:py-20">
        <div className="container-x">
          <ServiceAccordion items={services} />
          <nav aria-label="Service pages" className="mt-10 flex flex-wrap items-center gap-2">
            <span className="mr-2 text-[0.85rem] text-ink-500">In more detail:</span>
            {servicePages.map((p) => (
              <Link
                key={p.path}
                to={p.path}
                className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-[0.85rem] text-ink-600 transition-colors hover:border-ink-300 hover:text-ink-900"
              >
                {p.name}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="snap-sec border-y border-line bg-mist py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Engagement"
            lines={['From first call', 'to live product.']}
            subtitle="Each stage has a date, something you receive at the end of it and a price, all agreed before it starts."
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
            <SectionHeading eyebrow="Questions" lines={['The ones we are', 'asked most often.']} />
            <Reveal delay={0.2}>
              <Link to="/contact" className="btn-primary mt-8">
                Ask us something else <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <CTA />
    </PageTransition>
  )
}
