import {
  Globe, Smartphone, LayoutDashboard, Megaphone, Clapperboard,
  PenTool, Search, ShoppingCart, Bot,
} from 'lucide-react'

import { img } from './images.js'

/* ---------------------------------------------------------------------------
   NOTE ON CONTENT
   Everything here describes capability and process — nothing invents a client,
   a testimonial, a revenue figure or a founding date. Fill in real project
   results and real team members as you get them, and the layouts adapt.
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
    blurb: 'Dashboards, portals, CRMs and internal tools built to survive real usage.',
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
    blurb: 'Reels, ads, explainers and brand films, cut and graded in house.',
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
    blurb: 'Identity and product design that makes everything downstream easier.',
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
    blurb: 'Technical fixes plus content that earns its place on the results page.',
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
    text: 'A working session on your business, your customers and what this project has to achieve. Nothing is designed or costed until we agree on that.',
    deliverable: 'Written scope, timeline and a fixed quote',
    image: img.stepDiscovery,
  },
  {
    step: '02',
    title: 'Design',
    duration: '1–2 weeks',
    text: 'Wireframes first, then full design. You review it before anyone writes code, which is when changes still cost minutes instead of weeks.',
    deliverable: 'A clickable prototype in Figma',
    image: img.stepDesign,
  },
  {
    step: '03',
    title: 'Build',
    duration: '2–10 weeks',
    text: 'Short cycles, tested as we go. You see progress as it happens and can redirect us long before something has gone too far to change.',
    deliverable: 'A staging link, updated continuously',
    image: img.stepBuild,
  },
  {
    step: '04',
    title: 'Launch & after',
    duration: 'Ongoing',
    text: 'We deploy it, wire up analytics and train your team on it. Then we stay on for monitoring, fixes and whatever the real usage data suggests.',
    deliverable: 'Live product, analytics and handover',
    image: img.stepLaunch,
  },
]

/* What we commit to — promises we control, not metrics we cannot prove. */
export const commitments = [
  {
    title: 'A fixed quote before we start',
    text: 'Scope and price are agreed in writing. If we underestimate something, absorbing it is our problem, not your invoice.',
  },
  {
    title: 'A staging link from week one',
    text: 'You watch the thing get built instead of waiting for a reveal that arrives too late to change.',
  },
  {
    title: 'The people you meet do the work',
    text: 'No handover to a junior after signing. The person in your first call is the person building it.',
  },
  {
    title: 'You own everything',
    text: 'Code, design files, hosting, domains, ad accounts and analytics stay in your name from day one.',
  },
  {
    title: 'Answers within one working day',
    text: 'Calls, WhatsApp or email. If something will be late, you hear it from us before you have to ask.',
  },
  {
    title: 'We will tell you not to build it',
    text: 'If a feature will not serve your customers, we say so and explain why. Agreeing with everything is not a service.',
  },
]

/* ---------------------------------------------------------------------------
   TEAM — replace these with your real people and photos.
   Drop headshots into /public/team/ and set `image: '/team/name.jpg'`.
--------------------------------------------------------------------------- */
export const team = [
  {
    name: 'Sanjeev Tiwari',
    role: 'Founder & Owner',
    bio: 'Runs the studio and stays on every project from the first call through to launch.',
    image: img.teamOne,
  },
  {
    name: 'Add a name',
    role: 'Design Lead',
    bio: 'Brand, product design and the design system every project is built on.',
    image: img.teamTwo,
  },
  {
    name: 'Add a name',
    role: 'Growth & Marketing',
    bio: 'Paid media, SEO and the reporting that shows what the spend actually did.',
    image: img.teamThree,
  },
  {
    name: 'Harshit Tiwari',
    role: 'Video & Motion',
    bio: 'Short-form edits, motion graphics and everything that happens after the shoot.',
    image: img.teamFour,
  },
]

export const capabilities = [
  'Design', 'React', 'Next.js', 'React Native', 'Node.js', 'Rust', 'PostgreSQL',
  'Shopify', 'Meta Ads', 'Google Ads', 'SEO', 'After Effects', 'Figma', 'AI assistants',
]

export const faqs = [
  {
    q: 'How long does a project take?',
    a: 'A marketing website is usually 3–5 weeks. A web or mobile app is 8–14 weeks depending on scope. You get a week-by-week plan before we start, and we tell you early if anything threatens it.',
  },
  {
    q: 'What does it cost?',
    a: 'A focused website starts around ₹60,000. Apps and platforms are quoted on scope after a discovery call. Either way the price is agreed before work begins — we do not bill surprise hours.',
  },
  {
    q: 'Do you work with early-stage companies?',
    a: 'Yes. We scope in phases so you can launch a tight first version, learn from real users, and expand based on what they actually do rather than assumptions.',
  },
  {
    q: 'What happens after launch?',
    a: 'Optional monthly care covers hosting, updates, monitoring, backups and a block of improvement hours. You can also take it all in-house — it is your code and your accounts.',
  },
  {
    q: 'Can you take over an existing project?',
    a: 'Usually. We start with a short paid audit of the codebase and give you an honest read on whether to fix or rebuild, even when rebuilding would be the bigger job for us.',
  },
  {
    q: 'Who actually does the work?',
    a: 'The people you meet on the first call. We are a small team and we do not pass projects down after signing.',
  },
]
