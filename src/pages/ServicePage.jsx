import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'

import PageTransition from '../components/PageTransition.jsx'
import PageHero from '../components/PageHero.jsx'
import FaqAccordion from '../components/FaqAccordion.jsx'
import { Reveal, SectionHeading } from '../components/ui.jsx'
import { CTA } from './Home.jsx'
import { services, process } from '../data.js'
import { servicePages } from '../content/servicePages.js'
import { postBySlug } from '../content/posts.js'
import { metaFor } from '../seo.js'
import { whatsappLink } from '../siteConfig.js'

/**
 * One template for every dedicated service page. The words live in
 * content/servicePages.js; this file only lays them out, in the order a
 * visitor tends to ask: what is it, is it for me, what do I get, how does it
 * go, what does it cost, and then the questions.
 */
export default function ServicePage({ page }) {
  const svc = services.find((s) => s.slug === page.service)
  const related = page.related.map(postBySlug).filter(Boolean)
  const others = servicePages.filter((p) => p.path !== page.path)

  return (
    <PageTransition>
      <PageHero
        breadcrumbs={metaFor(page.path).breadcrumbs}
        lines={page.heading}
        subtitle={page.intro}
        chips={page.chips}
        actions={
          <>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-spectrum">
              Start a project <ArrowRight size={15} />
            </a>
            <Link to="/contact" className="btn-outline">
              Send a brief
            </Link>
          </>
        }
        art={
          <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-line bg-ink-900 shadow-lift lg:max-w-md">
            {/* poster art: decorative, the heading beside it says what it is */}
            <img
              src={svc.panelImage ?? svc.image}
              alt=""
              width={960}
              height={1200}
              className="aspect-[4/5] h-auto w-full object-cover object-top"
            />
          </div>
        }
      />

      {/* ---------- who it helps ---------- */}
      <section className="snap-sec py-20 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="Who it helps" lines={[`${page.name}`, 'for growing businesses.']} />
            <Reveal delay={0.15}>
              <p className="lede mt-5">
                We work with businesses across Vasai–Virar, Nalasopara and Mumbai, and with
                clients elsewhere in India over calls, video and WhatsApp.
              </p>
            </Reveal>
          </div>
          <ul className="space-y-3 self-end">
            {page.audience.map((a, i) => (
              <Reveal key={a} delay={i * 0.05}>
                <li className="flex items-start gap-3 border-b border-line pb-3 text-[0.95rem] text-ink-600">
                  <Check size={16} className="mt-1 shrink-0 text-brand-600" /> {a}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- problems ---------- */}
      <section className="snap-sec border-y border-line bg-mist py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="The problem" lines={['What usually', 'gets in the way.']} className="mb-12" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {page.problems.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-line bg-white p-6">
                  <h3 className="font-display text-[1.05rem] font-semibold tracking-tight text-ink-900">{p.t}</h3>
                  <p className="mt-2.5 text-[0.88rem] leading-relaxed text-ink-500">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- deliverables ---------- */}
      <section className="snap-sec py-20 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow="What you get"
            lines={['Specific things,', 'agreed in writing.']}
            subtitle="The exact list goes into your quote, so you know what is included before work starts."
          />
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {page.deliverables.map((d, i) => (
              <Reveal key={d} delay={i * 0.04}>
                <li className="flex items-start gap-3 border-t border-line pt-4 text-[0.92rem] leading-relaxed text-ink-600">
                  <Check size={15} className="mt-1 shrink-0 text-steel-500" /> {d}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- examples ---------- */}
      <section className="snap-sec border-y border-line bg-mist py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Example scopes"
            lines={['The kind of work', 'this covers.']}
            subtitle="These are illustrations of typical projects, not client case studies."
            className="mb-12"
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {page.examples.map((ex, i) => (
              <Reveal key={ex.t} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-6">
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-400">Example</span>
                  <h3 className="mt-2 font-display text-[1.08rem] font-semibold tracking-tight text-ink-900">{ex.t}</h3>
                  <p className="mt-2.5 flex-1 text-[0.88rem] leading-relaxed text-ink-500">{ex.d}</p>
                  {ex.link && (
                    <Link to={ex.link.to} className="link-wipe mt-4 self-start text-[0.83rem]">
                      {ex.link.label} <ArrowUpRight size={13} />
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- process ---------- */}
      <section className="snap-sec py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="How it runs"
            lines={['Four stages,', 'each with a date.']}
            subtitle="Each stage ends with something you can see and approve before the next one starts."
            className="mb-12"
          />
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <motion.li
                key={step.step}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="rounded-2xl border border-line bg-white p-6"
              >
                <span className="font-display text-[0.75rem] font-semibold tabular-nums text-brand-600">{step.step}</span>
                <h3 className="mt-2 font-display text-[1.08rem] font-semibold tracking-tight text-ink-900">{step.title}</h3>
                <p className="mt-2.5 text-[0.88rem] leading-relaxed text-ink-500">{page.process[i]}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- pricing ---------- */}
      <section className="snap-sec border-y border-line bg-mist py-20 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Pricing"
              lines={['What affects', 'the price.']}
              subtitle="We quote a fixed price after a free discovery call, once we know the scope. These are the things that move it."
            />
            <Reveal delay={0.2}>
              <Link to="/contact" className="btn-primary mt-8">
                Get a fixed quote <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>
          <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {page.pricing.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.05}>
                <div className="border-t border-line pt-4">
                  <dt className="text-[0.95rem] font-semibold text-ink-900">{p.t}</dt>
                  <dd className="mt-1.5 text-[0.87rem] leading-relaxed text-ink-500">{p.d}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- FAQs ---------- */}
      <section className="py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow="Questions" lines={['Asked before', 'most projects.']} />
          </div>
          <FaqAccordion items={page.faqs} />
        </div>
      </section>

      {/* ---------- further reading + other services ---------- */}
      <section className="border-t border-line py-16 sm:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          {related.length > 0 && (
            <div>
              <h2 className="eyebrow mb-5">Further reading</h2>
              <ul className="space-y-3">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link to={`/blog/${p.slug}`} className="link-wipe font-display text-[1.02rem] font-semibold text-ink-900">
                      {p.title} <ArrowUpRight size={14} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <h2 className="eyebrow mb-5">Other services</h2>
            <ul className="flex flex-wrap gap-2">
              {others.map((o) => (
                <li key={o.path}>
                  <Link
                    to={o.path}
                    className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-[0.85rem] text-ink-600 transition-colors hover:border-ink-300 hover:text-ink-900"
                  >
                    {o.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/services"
                  className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-[0.85rem] text-ink-600 transition-colors hover:border-ink-300 hover:text-ink-900"
                >
                  All services
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <CTA />
    </PageTransition>
  )
}
