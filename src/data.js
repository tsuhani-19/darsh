import {
  Globe, Smartphone, LayoutDashboard, Megaphone, Clapperboard,
  PenTool, Search, ShoppingCart, Bot,
} from 'lucide-react'

import { img } from './images.js'

/* ---------------------------------------------------------------------------
   NOTE ON CONTENT
   Everything here describes capability and process — nothing invents a client,
   a testimonial, a revenue figure or a founding date. Fill in real project
   results as you get them, and the layouts adapt.
--------------------------------------------------------------------------- */

export const serviceCategories = ['All', 'Build', 'Grow', 'Create', 'Automate']

export const services = [
  {
    slug: 'websites',
    short: 'Websites',
    category: 'Build',
    icon: Globe,
    title: 'Website design & development',
    blurb: 'Marketing sites, portfolios and landing pages that load fast and read clearly.',
    points: ['Custom design, no templates', 'React or Next.js builds', 'A CMS your team can run', 'Speed and accessibility tuned'],
    image: img.svcWebsites,
    tone: 'brand',
  },
  {
    slug: 'web-apps',
    short: 'Web apps',
    category: 'Build',
    icon: LayoutDashboard,
    title: 'Web applications',
    blurb: 'Dashboards, portals, CRMs and internal tools built for daily use by real teams.',
    points: ['React front ends, Node or Rust APIs', 'Roles and permissions', 'Reporting and exports', 'Deployed and monitored'],
    image: img.svcWebApps,
    tone: 'brand',
  },
  {
    slug: 'mobile-apps',
    short: 'Mobile apps',
    category: 'Build',
    icon: Smartphone,
    title: 'Mobile apps',
    blurb: 'iOS and Android apps that feel native and keep working on a weak connection.',
    points: ['React Native and Flutter', 'Offline-first data', 'Push and deep links', 'Store submission handled'],
    image: img.svcMobile,
    tone: 'steel',
  },
  {
    slug: 'digital-marketing',
    short: 'Marketing',
    category: 'Grow',
    icon: Megaphone,
    title: 'Digital marketing',
    blurb: 'Paid and organic campaigns judged on enquiries, not impressions.',
    points: ['Meta and Google Ads', 'Landing pages and funnels', 'Creative testing', 'Plain-English reporting'],
    image: img.svcMarketing,
    tone: 'crimson',
  },
  {
    slug: 'video-editing',
    short: 'Video',
    category: 'Create',
    icon: Clapperboard,
    title: 'Video editing & motion',
    blurb: 'Reels, ads, explainers and brand films, edited and colour graded in house.',
    points: ['Short-form for social', 'Motion graphics', 'Colour and sound', 'Subtitles and versioning'],
    image: img.svcVideo,
    tone: 'gold',
  },
  {
    slug: 'branding',
    short: 'Branding',
    category: 'Create',
    icon: PenTool,
    title: 'Branding & UI/UX',
    blurb: 'Identity and product design, so everything built afterwards looks like one thing.',
    points: ['Logo and identity systems', 'Design systems in Figma', 'Prototypes for testing', 'Usability reviews'],
    image: img.svcBranding,
    tone: 'brand',
  },
  {
    slug: 'seo',
    short: 'SEO',
    category: 'Grow',
    icon: Search,
    title: 'SEO & content',
    blurb: 'Technical fixes, plus content written around what people actually search for.',
    points: ['Technical audits', 'Keyword and topic mapping', 'Local SEO', 'Content production'],
    image: img.svcSeo,
    tone: 'steel',
  },
  {
    slug: 'ecommerce',
    short: 'E-commerce',
    category: 'Build',
    icon: ShoppingCart,
    title: 'E-commerce',
    blurb: 'Stores built around checkout speed, trust and repeat purchase.',
    points: ['Shopify and custom builds', 'Payments and logistics', 'Checkout optimisation', 'Retention and email flows'],
    image: img.svcEcom,
    tone: 'crimson',
  },
  {
    slug: 'ai',
    short: 'AI',
    category: 'Automate',
    icon: Bot,
    title: 'AI & automation',
    blurb: 'Assistants and automations wired into the tools your team already uses.',
    points: ['Support and sales assistants', 'WhatsApp automation', 'Document and data workflows', 'Human handoff built in'],
    image: img.svcAi,
    tone: 'brand',
  },
]

/* Rough inputs for the estimator. Tune these to your real pricing. */
export const estimatorOptions = [
  { id: 'website', label: 'Marketing website', weeks: 4, from: 60000, icon: Globe },
  { id: 'webapp', label: 'Web app or dashboard', weeks: 10, from: 250000, icon: LayoutDashboard },
  { id: 'mobile', label: 'Mobile app', weeks: 12, from: 300000, icon: Smartphone },
  { id: 'ecommerce', label: 'Online store', weeks: 6, from: 120000, icon: ShoppingCart },
  { id: 'brand', label: 'Brand & identity', weeks: 3, from: 45000, icon: PenTool },
  { id: 'marketing', label: 'Marketing & ads', weeks: 2, from: 35000, icon: Megaphone },
  { id: 'video', label: 'Video & motion', weeks: 2, from: 25000, icon: Clapperboard },
  { id: 'ai', label: 'AI assistant', weeks: 5, from: 90000, icon: Bot },
]

export const process = [
  {
    step: '01',
    title: 'Discovery',
    duration: '3–5 days',
    text: 'A working session on your business, your customers and what this project has to achieve. Nothing gets designed or priced until we agree on that.',
    deliverable: 'Written scope, timeline and a fixed quote',
    image: img.stepDiscovery,
  },
  {
    step: '02',
    title: 'Design',
    duration: '1–2 weeks',
    text: 'Rough layouts first, then the full design. You review it before anyone writes code, while a change still takes minutes rather than weeks.',
    deliverable: 'A clickable prototype in Figma',
    image: img.stepDesign,
  },
  {
    step: '03',
    title: 'Build',
    duration: '2–10 weeks',
    text: 'Short cycles, tested as we go. You see progress as it happens and can change direction well before anything is too far along to alter.',
    deliverable: 'A private test link, updated as we work',
    image: img.stepBuild,
  },
  {
    step: '04',
    title: 'Launch & after',
    duration: 'Ongoing',
    text: 'We put it live, set up analytics and train your team on it. After that we stay on for monitoring, fixes and the changes real usage turns out to need.',
    deliverable: 'Live product, analytics and handover',
    image: img.stepLaunch,
  },
]

/* What we commit to — promises we control, not metrics we cannot prove. */
export const commitments = [
  {
    title: 'A fixed quote before we start',
    text: 'Scope and price are agreed in writing. If we underestimate something, that is ours to absorb rather than something added to your invoice.',
  },
  {
    title: 'A test link from week one',
    text: 'You watch it being built instead of waiting for a reveal that lands too late to change.',
  },
  {
    title: 'The people you meet do the work',
    text: 'Nothing is handed to a junior after signing. The person on your first call is the person building it.',
  },
  {
    title: 'You own everything',
    text: 'Code, design files, hosting, domains, ad accounts and analytics stay in your name from day one.',
  },
  {
    title: 'Answers within one working day',
    text: 'By call, WhatsApp or email. If something is going to be late, you hear it from us before you have to ask.',
  },
  {
    title: 'We will tell you not to build it',
    text: 'If a feature will not help your customers, we say so and explain why. Agreeing with everything would not be much use to you.',
  },
]

export const capabilities = [
  'Design', 'React', 'Next.js', 'React Native', 'Node.js', 'Rust', 'PostgreSQL',
  'Shopify', 'Meta Ads', 'Google Ads', 'SEO', 'After Effects', 'Figma', 'AI assistants',
]

export const faqs = [
  {
    q: 'How long does a project take?',
    a: 'A marketing website usually takes 3–5 weeks. A web or mobile app takes 8–14 weeks, depending on scope. You get a week-by-week plan before we start, and we tell you early if anything puts it at risk.',
  },
  {
    q: 'What does it cost?',
    a: 'A small, focused website starts around ₹60,000. Apps and larger platforms are quoted on scope after a discovery call. Either way the price is agreed before work begins; we do not bill hours you did not expect.',
  },
  {
    q: 'Do you work with early-stage companies?',
    a: 'Yes. We split the work into phases so you can launch a small first version, learn from real users, and build the rest around what they actually do.',
  },
  {
    q: 'What happens after launch?',
    a: 'There is an optional monthly plan covering hosting, updates, monitoring, backups and a set number of improvement hours. You can also take it all in-house — the code and the accounts are yours.',
  },
  {
    q: 'Can you take over an existing project?',
    a: 'Usually, yes. We start with a short paid review of the existing code and tell you honestly whether it is better to repair it or start again — including when repairing it is the smaller job for us.',
  },
  {
    q: 'Who actually does the work?',
    a: 'The people you meet on the first call. We are a small team, and projects are not passed down to anyone else after signing.',
  },
]
