import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, MapPin, MessageCircle, Phone, Send } from 'lucide-react'

import PageTransition from '../components/PageTransition.jsx'
import PageHero from '../components/PageHero.jsx'
import { ContactArt } from '../components/heroArt.jsx'
import { Reveal, SectionHeading } from '../components/ui.jsx'
import { site } from '../siteConfig.js'
import { Input } from '@/components/controls/input.jsx'
import { Textarea } from '@/components/controls/textarea.jsx'
import { Label } from '@/components/controls/label.jsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/controls/select.jsx'
import { img } from '../images.js'
import { services } from '../data.js'

const budgets = ['Under ₹50,000', '₹50,000 – ₹2 lakh', '₹2 – 5 lakh', '₹5 lakh +', 'Not sure yet']

export default function Contact() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Contact"
        lines={['Tell us what you', 'are trying to build.']}
        subtitle="This form does not vanish into an inbox. Fill it in and it opens WhatsApp with your brief already written out — or call instead and skip the typing."
        chips={['Free 30-minute call', 'No pitch deck', 'Reply within a working day']}
        art={<ContactArt />}
      />

      <section className="snap-sec py-16 sm:py-24">
        <div className="container-x grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <BriefBuilder />
          </Reveal>

          <div className="space-y-4">
            <Reveal delay={0.08}>
              <ContactCard
                icon={Phone}
                tone="bg-brand-600"
                title="Call"
                value={site.phone}
                note="You get a person, not a queue"
                href={site.phoneHref}
              />
            </Reveal>
            <Reveal delay={0.14}>
              <ContactCard
                icon={MessageCircle}
                tone="bg-steel-500"
                title="WhatsApp"
                value="Start a chat"
                note="Often the quickest way to reach us"
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`}
                external
              />
            </Reveal>
            <Reveal delay={0.2}>
              <div className="card">
                <div className="flex items-start gap-3 text-[0.9rem] text-ink-600">
                  <MapPin size={17} className="mt-0.5 shrink-0 text-crimson-400" />
                  <span>{site.address}</span>
                </div>
                <div className="mt-4 flex items-start gap-3 text-[0.9rem] text-ink-600">
                  <Clock size={17} className="mt-0.5 shrink-0 text-gold-400" />
                  <span>{site.hours}</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="overflow-hidden rounded-2xl border border-line">
                <img
                  src={img.contactCall}
                  alt="A project kickoff conversation"
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="bg-white p-5">
                  <p className="font-display text-[0.98rem] font-semibold text-ink-900">
                    What happens on the first call
                  </p>
                  <p className="mt-2 text-[0.86rem] leading-relaxed text-ink-500">
                    Thirty minutes. We ask about your business and what you need this project to
                    achieve, then tell you what that realistically takes and costs. No slide deck
                    and no follow-up emails you did not ask for.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="snap-sec border-t border-line bg-mist py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="After you send it"
            lines={['What happens next.']}
            subtitle="Three steps, and no marketing emails afterwards."
            className="mb-12"
          />
          <ol className="grid gap-5 md:grid-cols-3">
            {[
              {
                n: '01',
                t: 'We read it properly',
                d: 'A person reads your brief — there is no autoresponder. If anything is unclear we ask a question or two on WhatsApp.',
              },
              {
                n: '02',
                t: 'A 30-minute call',
                d: 'We talk through what you need and what it realistically takes to build. If we are not the right studio for it, we will say so on that call.',
              },
              {
                n: '03',
                t: 'A written proposal',
                d: 'Scope, timeline and a fixed price in writing within two working days. No pressure and no expiry date on the number.',
              },
            ].map((step, i) => (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-2xl border border-line bg-white p-6"
              >
                <span className="font-display text-[0.75rem] font-semibold tabular-nums text-brand-600">
                  {step.n}
                </span>
                <h3 className="mt-2 font-display text-[1.08rem] font-semibold tracking-tight text-ink-900">
                  {step.t}
                </h3>
                <p className="mt-2.5 text-[0.88rem] leading-relaxed text-ink-500">{step.d}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
    </PageTransition>
  )
}

function ContactCard({ icon: Icon, tone, title, value, note, href, external }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -3 }}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="card group flex items-center gap-4 hover:border-ink-300 hover:shadow-lift"
    >
      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${tone} text-white`}>
        <Icon size={18} />
      </span>
      <span className="min-w-0">
        <span className="block text-[0.72rem] uppercase tracking-[0.14em] text-ink-400">{title}</span>
        <span className="block truncate font-display text-[1.02rem] font-semibold text-ink-900">{value}</span>
        <span className="block text-[0.8rem] text-ink-400">{note}</span>
      </span>
      <span className="ml-auto text-ink-300 transition-transform duration-300 group-hover:translate-x-1">→</span>
    </motion.a>
  )
}

/**
 * Collects the brief, formats it into a message and opens WhatsApp.
 * Deliberately no email backend — nothing to host, nothing to misdeliver.
 */
function BriefBuilder() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    service: services[0].title,
    budget: budgets[1],
    details: '',
  })
  const [touched, setTouched] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  // Radix Select hands back the value itself rather than a change event
  const pick = (k) => (value) => setForm((f) => ({ ...f, [k]: value }))
  const valid = form.name.trim().length > 1 && form.details.trim().length > 4

  const submit = (e) => {
    e.preventDefault()
    setTouched(true)
    if (!valid) return
    const msg = [
      `Hello ${site.name},`,
      '',
      `Name: ${form.name}`,
      form.company ? `Company: ${form.company}` : null,
      `Looking for: ${form.service}`,
      `Budget: ${form.budget}`,
      '',
      'About the project:',
      form.details,
    ]
      .filter(Boolean)
      .join('\n')

    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-line bg-white p-6 sm:p-9">
      <h2 className="font-display text-2xl font-bold tracking-tight text-ink-900">Your brief</h2>
      <p className="mt-2 text-[0.9rem] text-ink-500">
        A few short answers. It opens WhatsApp with everything written out for you.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field id="brief-name" label="Your name" required>
          <Input
            id="brief-name"
            value={form.name}
            onChange={set('name')}
            placeholder="Ananya Rao"
            aria-invalid={touched && form.name.trim().length < 2}
            className={touched && form.name.trim().length < 2 ? 'border-crimson-400 focus-visible:ring-crimson-100' : ''}
          />
        </Field>
        <Field id="brief-company" label="Company">
          <Input id="brief-company" value={form.company} onChange={set('company')} placeholder="Lumen Health" />
        </Field>

        <Field id="brief-service" label="What do you need">
          <Select value={form.service} onValueChange={pick('service')}>
            <SelectTrigger id="brief-service" className="group">
              <SelectValue placeholder="Pick a service" />
            </SelectTrigger>
            <SelectContent>
              {/* the short name reads cleanly in the trigger; the full title is
                  still what gets sent in the brief */}
              {services.map((s) => (
                <SelectItem key={s.slug} value={s.title}>
                  {s.short}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field id="brief-budget" label="Budget range">
          <Select value={form.budget} onValueChange={pick('budget')}>
            <SelectTrigger id="brief-budget" className="group">
              <SelectValue placeholder="Pick a range" />
            </SelectTrigger>
            <SelectContent>
              {budgets.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <div className="sm:col-span-2">
          <Field id="brief-details" label="About the project" required>
            <Textarea
              id="brief-details"
              value={form.details}
              onChange={set('details')}
              rows={5}
              placeholder="What are you building, who is it for, and when would you like it live?"
              aria-invalid={touched && form.details.trim().length < 5}
              className={touched && form.details.trim().length < 5 ? 'border-crimson-400 focus-visible:ring-crimson-100' : ''}
            />
          </Field>
        </div>
      </div>

      {touched && !valid && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-[0.82rem] text-crimson-500">
          Please add your name and a line or two about the project.
        </motion.p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button type="submit" className="btn-spectrum">
          Send on WhatsApp <Send size={15} />
        </button>
        <a href={site.phoneHref} className="btn-outline">
          <Phone size={15} /> Call instead
        </a>
      </div>
    </form>
  )
}

function Field({ id, label, required, children }) {
  return (
    <div className="block">
      <Label htmlFor={id} className="mb-2 block normal-case tracking-[0.02em] text-ink-600">
        {label}
        {required && <span className="text-crimson-500"> *</span>}
      </Label>
      {children}
    </div>
  )
}
