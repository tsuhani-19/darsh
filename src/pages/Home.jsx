import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

import { img } from '../images.js'
import PageTransition from '../components/PageTransition.jsx'
import ServiceShowcase from '../components/ServiceShowcase.jsx'
import Estimator from '../components/Estimator.jsx'
import ScrollHighlight from '../components/ScrollHighlight.jsx'
import StackCards from '../components/StackCards.jsx'
import BeforeAfter from '../components/BeforeAfter.jsx'
import BentoGrid from '../components/BentoGrid.jsx'
import VelocityMarquee from '../components/VelocityMarquee.jsx'
import SpotlightCards from '../components/SpotlightCards.jsx'
import ParallaxBand from '../components/ParallaxBand.jsx'
import AuroraMesh from '../components/AuroraMesh.jsx'
import AssemblyEngine from '../components/AssemblyEngine.jsx'
import SpectrumRule from '../components/SpectrumRule.jsx'
import HeroCollage from '../components/HeroCollage.jsx'
import Magnetic from '../components/fx/Magnetic.jsx'
import { MaskedHeading, Reveal, RevealImage, SectionHeading, SlideIn } from '../components/ui.jsx'
import { services, process, commitments, capabilities } from '../data.js'
import { whatsappLink } from '../siteConfig.js'

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <CapabilityStrip />
      <AssemblyEngine />
      <StatementSection />
      <BentoSection />
      <Approach />
      <ServicesSection />
      <CompareSection />
      <EstimatorSection />
      <ProcessSection />
      <CommitmentSection />
      <BandSection />
      <CTA />
    </PageTransition>
  )
}

/* ================================ HERO ================================ */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // the copy and the photographs leave at different rates, which is what gives
  // the hero depth as it scrolls away
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 80])
  // kept small: on a phone the hero is tall, and a bigger lift dragged the
  // photographs up over the checklist above them
  const artY = useTransform(scrollYProgress, [0, 1], [0, -18])
  // only the scroll hint fades — fading the whole hero dimmed the copy while
  // it was still the thing being read
  const hintFade = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  return (
    <section ref={ref} className="relative overflow-hidden bg-white pt-24 sm:pt-28">
      {/* ---------- background stack ---------- */}
      <div className="pointer-events-none absolute -right-48 -top-32 h-[32rem] w-[32rem] rounded-full bg-brand-50/80 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 top-40 h-[24rem] w-[24rem] rounded-full bg-steel-50/60 blur-3xl" />
      <motion.div
        aria-hidden="true"
        animate={{ scale: [1, 1.15, 1], x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[26rem] rounded-full bg-crimson-50/60 blur-3xl"
      />

      <div className="container-x relative grid items-center gap-12 pb-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:pb-20">
        <motion.div style={{ y: copyY }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-5 flex items-center gap-2"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-600" />
            </span>
            Digital studio · Mumbai
          </motion.p>

          <MaskedHeading
            as="h1"
            immediate
            lines={['Websites, apps and', 'campaigns, built by']}
            className="font-display text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] text-ink-900 sm:text-[3.4rem] lg:text-[3.9rem]"
          />
          <MaskedHeading
            as="p"
            immediate
            delay={0.16}
            lines={['one team.']}
            className="text-spectrum font-display text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[3.4rem] lg:text-[3.9rem]"
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="lede mt-6 max-w-xl"
          >
            We design, build and market digital products. The website, the app, the ads
            and the video come from the same people, so you are not the one passing
            information between four different suppliers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Link to="/contact" className="btn-spectrum">
                Start a project <ArrowRight size={16} />
              </Link>
            </Magnetic>
            <Magnetic strength={0.22}>
              <Link to="/services" className="btn-outline">
                See what we do
              </Link>
            </Magnetic>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5 border-t border-line pt-7 text-[0.83rem] text-ink-500"
          >
            {['Fixed quote before we start', 'Test link from week one', 'You own everything'].map((t, i) => (
              <motion.li
                key={t}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.09, duration: 0.5 }}
                className="flex items-center gap-2"
              >
                <Check size={14} className="text-steel-500" /> {t}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div style={{ y: artY }}>
          <HeroCollage />
        </motion.div>
      </div>

      {/* a quiet nudge to keep going */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: hintFade }}
        className="pointer-events-none absolute inset-x-0 bottom-3 hidden justify-center lg:flex"
      >
        <motion.span
          animate={{ y: [0, 7, 0], opacity: [0.35, 0.9, 0.35] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-8 w-5 items-start justify-center rounded-full border border-ink-300 pt-1.5"
        >
          <span className="h-1.5 w-[3px] rounded-full bg-ink-400" />
        </motion.span>
      </motion.div>
    </section>
  )
}

/* =========================== CAPABILITY STRIP =========================== */
function CapabilityStrip() {
  return (
    <section className="overflow-hidden border-y border-line bg-mist py-8">
      <VelocityMarquee items={capabilities} />
    </section>
  )
}

/* ============================== STATEMENT ============================== */
function StatementSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x max-w-4xl">
        <SpectrumRule className="mb-10 max-w-[7rem]" />
        <p className="eyebrow mb-7">Why us</p>
        <ScrollHighlight
          text="A design on its own does not do much. We take it through to a working product, put it live, run the ads and video around it, and stay involved once real people start using it."
          accentFrom={20}
          className="font-display text-[1.6rem] font-semibold leading-[1.4] tracking-[-0.015em] text-ink-900 sm:text-[2.15rem]"
        />
      </div>
    </section>
  )
}

/* ================================ BENTO ================================ */
function BentoSection() {
  return (
    <section className="snap-sec pb-20 sm:pb-28">
      <div className="container-x">
        <BentoGrid services={services} />
      </div>
    </section>
  )
}

/* =============================== COMPARE =============================== */
function CompareSection() {
  return (
    <section className="snap-sec py-20 sm:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
        <SlideIn from="left">
          <p className="eyebrow mb-4">The difference</p>
          <h2 className="font-display text-[1.9rem] font-bold leading-[1.15] tracking-[-0.02em] text-ink-900 sm:text-[2.4rem]">
            Drag it and see.
          </h2>
          <p className="lede mt-5">
            A redesign is more than new colours. The layout, the wording, the order things
            appear in and how fast the page loads all change together — so it is easier to
            use, not just newer to look at.
          </p>
          <p className="mt-5 text-[0.85rem] text-ink-400">
            Drag the handle across, or use the arrow keys.
          </p>
        </SlideIn>
        <SlideIn from="right" delay={0.1}>
          <BeforeAfter
            before={img.compareBefore}
            after={img.compareAfter}
          />
        </SlideIn>
      </div>
    </section>
  )
}

/* =============================== APPROACH =============================== */
function Approach() {
  return (
    <section className="snap-sec py-20 sm:py-28">
      <div className="container-x space-y-20 sm:space-y-28">
        {/* image left, text right */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <SlideIn from="left">
            <RevealImage
              src={img.homeApproachA}
              alt="A working session with a client"
              className="aspect-[4/3] rounded-2xl"
            />
          </SlideIn>
          <SlideIn from="right" delay={0.1}>
            <p className="eyebrow mb-4">The problem we solve</p>
            <h2 className="font-display text-[1.9rem] font-bold leading-[1.15] tracking-[-0.02em] text-ink-900 sm:text-[2.4rem]">
              Four vendors, four versions of your brand.
            </h2>
            <p className="lede mt-5">
              The usual setup is a design agency, a development shop, a media buyer and a
              freelance editor who have never spoken to each other. Details get dropped at
              every handover, the brand slowly drifts, and when something breaks it is not
              clear whose job it is to fix.
            </p>
            <p className="lede mt-4">
              We keep all four in one studio. You write the brief once, you have one person
              to call, and the same care goes into the site, the app, the ads and the video.
            </p>
          </SlideIn>
        </div>

        {/* text left, image right */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <SlideIn from="left" className="lg:order-1">
            <p className="eyebrow mb-4">How we run it</p>
            <h2 className="font-display text-[1.9rem] font-bold leading-[1.15] tracking-[-0.02em] text-ink-900 sm:text-[2.4rem]">
              You watch it get built.
            </h2>
            <p className="lede mt-5">
              There is no long silence between kickoff and a big reveal. A private test link
              goes up in the first week and updates as we work, so you are looking at the real
              thing while changes are still quick to make.
            </p>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              {commitments.slice(0, 4).map((c, i) => (
                <Reveal key={c.title} delay={i * 0.06}>
                  <div className="border-t border-line pt-4">
                    <h3 className="text-[0.92rem] font-semibold text-ink-900">{c.title}</h3>
                    <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink-400">{c.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </SlideIn>
          <SlideIn from="right" delay={0.1} className="lg:order-2">
            <div className="grid grid-cols-2 gap-4">
              <RevealImage
                src={img.homeApproachB}
                alt="Development in progress"
                className="aspect-[3/4] rounded-2xl"
              />
              <RevealImage
                src={img.homeApproachC}
                alt="Reviewing campaign performance"
                className="mt-10 aspect-[3/4] rounded-2xl"
                delay={0.12}
              />
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  )
}

/* =============================== SERVICES =============================== */
function ServicesSection() {
  return (
    <section className="snap-sec border-t border-line bg-mist py-20 sm:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="What we do" lines={['Nine services,', 'one team.']} />
          <Reveal delay={0.15}>
            <Link to="/services" className="btn-outline">
              All services <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
        <div className="mt-12">
          <ServiceShowcase items={services} />
        </div>
      </div>
    </section>
  )
}

/* =============================== ESTIMATOR =============================== */
function EstimatorSection() {
  return (
    <section className="snap-sec py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Before you call"
          lines={['See a rough number', 'first.']}
          subtitle="Tick the parts of the job you need and you will get an approximate timeline and starting budget. It is a starting point for the conversation, not a quote."
          className="mb-12"
        />
        <Reveal>
          <Estimator />
        </Reveal>
      </div>
    </section>
  )
}

/* ================================ PROCESS ================================ */
function ProcessSection() {
  return (
    <section className="border-t border-line bg-white pb-10 pt-20 sm:pt-28">
      <div className="container-x">
        <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            eyebrow="How we work"
            lines={['Four stages, and you', 'see all of them.']}
            subtitle="Each stage has a date, something you receive at the end of it and a price, all agreed before it starts."
          />
          <Reveal delay={0.15}>
            <Link to="/contact" className="btn-dark whitespace-nowrap">
              Book a discovery call <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
        <StackCards items={process} />
      </div>
    </section>
  )
}

/* ============================== COMMITMENTS ============================== */
function CommitmentSection() {
  return (
    <section className="snap-sec border-t border-line bg-mist py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="What you get"
          lines={['Six things we', 'put in writing.']}
          className="mb-12"
        />
        <SpotlightCards items={commitments} />
      </div>
    </section>
  )
}

/* ============================= PARALLAX BAND ============================= */
function BandSection() {
  return (
    <section className="overflow-hidden border-t border-line bg-white py-16 sm:py-20">
      <ParallaxBand />
    </section>
  )
}

/* ================================== CTA ================================== */
export function CTA() {
  return (
    <section className="snap-sec py-20 sm:py-24">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink-900 px-7 py-14 sm:px-14 sm:py-20">
            <AuroraMesh intensity={0.38} />

            {/* a floor of grid lines running away toward the horizon */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 overflow-hidden"
              style={{ perspective: '260px' }}
            >
              <div
                className="grid-floor animate-grid-run absolute inset-x-[-30%] bottom-[-40%] h-[220%] origin-bottom"
                style={{ transform: 'rotateX(72deg)' }}
              />
            </div>

            <div className="relative grid gap-9 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <MaskedHeading
                  lines={['Tell us what you', 'are trying to build.']}
                  className="font-display text-[1.9rem] font-bold leading-[1.12] tracking-[-0.02em] text-white sm:text-[2.6rem]"
                />
                <Reveal delay={0.2}>
                  <p className="mt-5 max-w-lg text-[1rem] leading-relaxed text-ink-300">
                    A free 30-minute call. We will tell you what the work involves, what it
                    costs and whether we are the right people for it. If we are not, we will
                    say so.
                  </p>
                </Reveal>
              </div>
              <Reveal delay={0.3}>
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Magnetic>
                    <Link to="/contact" className="btn-light">
                      Start a project <ArrowRight size={15} />
                    </Link>
                  </Magnetic>
                  <Magnetic strength={0.22}>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn border border-white/20 text-white hover:bg-white/10"
                    >
                      Message on WhatsApp
                    </a>
                  </Magnetic>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
