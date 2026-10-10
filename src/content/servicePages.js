/* ---------------------------------------------------------------------------
   SERVICE PAGES

   One entry per dedicated service page. Same content policy as data.js:
   capability and process only. The "examples" are typical scopes, labelled on
   the page as illustrations — they are not past clients. Replace or add real
   project write-ups as you get permission to publish them.

   No prices here on purpose: the pricing section lists what moves the price,
   and the actual figure comes from the discovery call.

   `service` links each page to its entry in data.js (icon, poster art).
   `related` lists blog post slugs from content/posts.js.
--------------------------------------------------------------------------- */

export const servicePages = [
  /* ============================ WEBSITES ============================ */
  {
    path: '/website-development',
    service: 'websites',
    name: 'Website development',
    metaTitle: 'Website Development in Mumbai & Vasai–Virar | Darsh Innovations',
    metaDescription:
      'Custom websites for businesses in Vasai–Virar, Nalasopara and Mumbai: fast on mobile, easy to update, and built to turn visitors into enquiries.',
    heading: ['Websites that turn', 'visitors into enquiries.'],
    intro:
      'We design and build websites for small and growing businesses: fast on a phone, clear about what you do, easy for your team to update, and set up so a visitor can call, message or book in a tap.',
    chips: ['Custom design', 'Mobile first', 'Editable by your team', 'SEO foundations'],
    audience: [
      'Local service businesses such as clinics, coaching classes, salons, consultants and contractors',
      'Shops, traders and manufacturers who want enquiries from people searching online',
      'Start-ups that need a credible site for launch or fundraising',
      'Anyone with a site that is slow, dated, or impossible to edit without calling a developer',
    ],
    problems: [
      {
        t: 'It is slow on a phone',
        d: 'Most visitors arrive on mobile data. Heavy images and bloated themes make them wait, and many leave before the page appears.',
      },
      {
        t: 'Nobody knows what to do next',
        d: 'No visible phone number, no WhatsApp button, no clear next step. Interested visitors leave without getting in touch.',
      },
      {
        t: 'You cannot change it yourself',
        d: 'Updating a price or adding a photo means waiting on a developer, so the site falls out of date.',
      },
      {
        t: 'Google does not understand it',
        d: 'Missing titles, no sitemap, and content that only appears after scripts run. Search engines struggle to work out what each page is about.',
      },
    ],
    deliverables: [
      'A page plan and copy guidance, so each page has one clear job',
      'Custom design for mobile and desktop, reviewed as a clickable prototype before any code',
      'A responsive build in React or Next.js, or on a CMS if your team will edit often',
      'Call, WhatsApp and enquiry actions wired straight to you',
      'Technical SEO foundations: titles, descriptions, sitemap, structured data and Search Console setup',
      'Analytics (GA4) set up, so you can see where enquiries come from',
      'Speed and accessibility checks before launch',
      'Domain, hosting and every account in your name, plus a handover session',
    ],
    examples: [
      {
        t: 'A clinic or practice website',
        d: 'Services, doctor profiles, timings and location, with an appointment-request form or WhatsApp booking.',
        link: { to: '/blog/clinic-booking-website-checklist', label: 'What a clinic booking site needs' },
      },
      {
        t: 'A five-page site for a local service business',
        d: 'Home, services, about, gallery and contact, with click-to-call and WhatsApp on every page.',
      },
      {
        t: 'A landing page for an ad campaign',
        d: 'One focused page for one offer, built to load fast and measured against enquiries.',
        link: { to: '/digital-marketing', label: 'Digital marketing' },
      },
      {
        t: 'A redesign of an existing site',
        d: 'Keeping the URLs and content that already bring in search traffic, and fixing what slows visitors down.',
      },
    ],
    process: [
      'We agree what the site has to achieve, list the pages and decide who provides the text and photos.',
      'Layouts first, then full design. You review a clickable prototype on your own phone.',
      'We build on a private test link you can open at any time, page by page.',
      'We connect your domain, submit the sitemap to Google, set up analytics and show your team how to edit.',
    ],
    pricing: [
      { t: 'Number of pages and layouts', d: 'Ten pages that share two layouts usually cost less than five that are each designed from scratch.' },
      { t: 'Content', d: 'Whether you supply the text and photos, or need us to write copy and source images.' },
      { t: 'Features', d: 'Booking, payments, multiple languages, product catalogues or member areas each add work.' },
      { t: 'Editing needs', d: 'A CMS for frequent updates takes more setup than a site that changes twice a year.' },
      { t: 'Integrations', d: 'Connecting to your CRM, Google Sheets, payment gateway or other tools.' },
      { t: 'Support after launch', d: 'Optional monthly hosting, updates and improvement hours.' },
    ],
    faqs: [
      {
        q: 'Do I need to provide the content?',
        a: 'It helps if you know your business details, services and prices. We give you a simple outline to fill in, and we can write or tighten the copy if you would rather not.',
      },
      {
        q: 'Will I be able to update the website myself?',
        a: 'If you need to, yes. We set up an editor for the parts that change often, such as services, prices, photos and blog posts, and show your team how to use it.',
      },
      {
        q: 'Will my website show up on Google?',
        a: 'We build the technical foundations search engines need and submit the site to Google Search Console. Where you rank depends on competition, your content and your reputation over time, so nobody can honestly guarantee a position.',
      },
      {
        q: 'How long does a website take?',
        a: 'A marketing website usually takes 3–5 weeks from agreed scope to launch. You get a week-by-week plan before we start.',
      },
      {
        q: 'Do you only work with local businesses?',
        a: 'No. We work with businesses across Vasai–Virar, Nalasopara and Mumbai, and with clients elsewhere in India over calls, video and WhatsApp.',
      },
    ],
    related: ['small-business-website-cost', 'clinic-booking-website-checklist', 'website-or-app'],
  },

  /* ============================== APPS ============================== */
  {
    path: '/app-development',
    service: 'mobile-apps',
    name: 'App development',
    metaTitle: 'Web & Mobile App Development in Mumbai | Darsh Innovations',
    metaDescription:
      'Web apps and Android/iOS apps for businesses in Mumbai, Vasai–Virar and across India. Scoped first versions, clickable prototypes, and code you own.',
    heading: ['Web and mobile apps,', 'scoped to what you need first.'],
    intro:
      'We build web apps, and Android and iOS apps, for businesses that have outgrown spreadsheets or need customers to book, order or track something themselves. We start with the smallest version that is genuinely useful, then build on what real users do.',
    chips: ['Web apps', 'Android & iOS', 'Admin panels', 'You own the code'],
    audience: [
      'Businesses running orders, bookings or field work on Excel sheets and WhatsApp groups',
      'Founders with an app idea who need help deciding what goes into version one',
      'Companies whose off-the-shelf software does not fit how they actually work',
      'Teams with an existing app that needs to be finished, fixed or taken over',
    ],
    problems: [
      {
        t: 'The process lives in spreadsheets',
        d: 'Several copies of the same sheet, formulas that break, and no record of who changed what.',
      },
      {
        t: 'Customers have to call for everything',
        d: 'Bookings, order status and payments all go through your staff, which caps how many customers you can handle.',
      },
      {
        t: 'Ready-made software almost fits',
        d: 'You pay for features you do not use and work around the ones you need.',
      },
      {
        t: 'Version one keeps growing',
        d: 'Without a clear first scope, an app idea turns into a long, expensive build that launches late.',
      },
    ],
    deliverables: [
      'A written scope for the first version, with what is deliberately left for later',
      'User flows and a clickable prototype in Figma, tested before development',
      'Web apps built with React, Node.js and PostgreSQL',
      'Android and iOS apps in React Native or Flutter, with offline support where needed',
      'An admin panel for your team to manage users, content and data',
      'Integrations such as payment gateways, WhatsApp, SMS, email and maps',
      'Push notifications, deep links and app store submission',
      'Source code, store listings, servers and accounts in your name',
    ],
    examples: [
      {
        t: 'An internal order or job tracker',
        d: 'Replaces a shared spreadsheet: each order has a status, an owner and a history, with a simple dashboard for the owner.',
        link: { to: '/blog/excel-to-crm', label: 'When to move from Excel to a CRM' },
      },
      {
        t: 'A customer booking app',
        d: 'Customers pick a service and slot, pay or confirm, and get reminders. Staff manage the calendar from an admin panel.',
      },
      {
        t: 'A field staff app',
        d: 'Staff record visits, photos and signatures on a phone, even with patchy signal, and sync when back online.',
      },
    ],
    process: [
      'We map who uses the app and what each person needs to do, then agree a first version and a fixed quote.',
      'User flows and a clickable prototype that you try on your own phone before we write code.',
      'Built in short cycles on a test link or test build, so you can use each feature as it lands.',
      'Store submission, server setup and analytics, then monitoring and fixes as real usage comes in.',
    ],
    pricing: [
      { t: 'Platforms', d: 'A web app, an Android app, an iOS app, or all three.' },
      { t: 'Screens and user roles', d: 'Customer, staff and admin roles each bring their own screens and permissions.' },
      { t: 'Integrations', d: 'Payments, WhatsApp, SMS, maps, accounting or existing systems.' },
      { t: 'Offline and real-time needs', d: 'Working without signal, or live updates between users, adds engineering.' },
      { t: 'Reporting', d: 'Dashboards, exports and analytics for the business side.' },
      { t: 'Running costs and support', d: 'Hosting, store fees and third-party services, plus optional maintenance after launch.' },
    ],
    faqs: [
      {
        q: 'Do I need a mobile app, or will a web app do?',
        a: 'Often a web app that works well on phones is enough, and it is quicker and cheaper to build. A store app makes sense when people use it daily, need notifications, or need the camera, location or offline access.',
      },
      {
        q: 'Do I need both Android and iOS?',
        a: 'Look at which phones your users have. With React Native or Flutter one codebase can serve both, so adding the second platform usually costs much less than building it twice.',
      },
      {
        q: 'How long does an app take?',
        a: 'A web or mobile app usually takes 8–14 weeks depending on scope. A tight first version is the quickest way to get something useful into people’s hands.',
      },
      {
        q: 'Who owns the code?',
        a: 'You do. The repository, store accounts, servers and domains are set up in your name from the start.',
      },
      {
        q: 'Can you take over an app someone else started?',
        a: 'Usually, yes. We start with a short paid review of the existing code and tell you honestly whether repairing it or starting again makes more sense.',
      },
    ],
    related: ['website-or-app', 'excel-to-crm'],
  },

  /* =========================== AUTOMATION =========================== */
  {
    path: '/business-automation',
    service: 'ai',
    name: 'Business automation',
    metaTitle: 'Business Automation & WhatsApp Workflows | Darsh Innovations',
    metaDescription:
      'Automate enquiries, follow-ups, reminders and data entry with WhatsApp workflows, simple CRMs and AI assistants that hand over to your team.',
    heading: ['Less copying and chasing,', 'more time for customers.'],
    intro:
      'We automate the repetitive work around enquiries, follow-ups, reminders and data entry, wired into tools your team already uses, such as WhatsApp, Google Sheets, email and your existing software. Where an AI assistant helps, it hands over to a person when it should.',
    chips: ['WhatsApp workflows', 'Simple CRMs', 'Reminders', 'AI with human handoff'],
    audience: [
      'Businesses whose enquiries arrive by WhatsApp, phone and forms and are tracked in someone’s head',
      'Teams that type the same details into several sheets or systems',
      'Owners who spend evenings compiling reports or chasing payments',
      'Businesses answering the same customer questions many times a day',
    ],
    problems: [
      {
        t: 'Enquiries get lost',
        d: 'Leads sit across personal WhatsApp chats, call logs and email, with no one place to see who replied and who did not.',
      },
      {
        t: 'Follow-ups depend on memory',
        d: 'Quotes, payment reminders and appointment confirmations go out late, or not at all.',
      },
      {
        t: 'The same data is typed twice',
        d: 'An order goes into WhatsApp, then a sheet, then an invoice. Each copy is a chance for a mistake.',
      },
      {
        t: 'Reports take hours',
        d: 'Weekly numbers are pieced together by hand from several sources.',
      },
    ],
    deliverables: [
      'A map of your current process and where automation will actually save time',
      'WhatsApp enquiry capture and routing on the official WhatsApp Business Platform',
      'A simple CRM or lead tracker, built or configured to fit how you sell',
      'Automatic reminders and follow-ups for quotes, payments and appointments',
      'Document and data workflows, for example form to sheet to invoice draft',
      'AI assistants for common questions, with a clear handoff to your team',
      'Dashboards that update themselves',
      'Documentation and training so your team can run it',
    ],
    examples: [
      {
        t: 'One list for every enquiry',
        d: 'Enquiries from WhatsApp, the website form and missed calls land in one tracker with an owner and a status.',
        link: { to: '/blog/organise-whatsapp-enquiries', label: 'Organising WhatsApp enquiries' },
      },
      {
        t: 'Payment and renewal reminders',
        d: 'Templated WhatsApp or email reminders sent on a schedule, stopping automatically once payment is marked.',
      },
      {
        t: 'An FAQ assistant',
        d: 'Answers timings, location, pricing basics and availability, and passes anything else to a person with the conversation attached.',
      },
    ],
    process: [
      'We sit with the people who do the work and map each step, then pick the automations worth building first.',
      'We design the flow, including what happens when something goes wrong, and you approve it before anything is connected.',
      'We build and test with real but safe data, then run it alongside your current process for a short while.',
      'We switch over, train the team, and monitor the first weeks closely, adjusting rules as real cases come in.',
    ],
    pricing: [
      { t: 'Number of processes', d: 'One enquiry flow is a smaller job than automating sales, billing and support together.' },
      { t: 'Tools involved', d: 'Whether your current software has an API or export we can connect to.' },
      { t: 'Message volume', d: 'Meta charges for many WhatsApp Business Platform messages, such as reminders and marketing templates. These are billed separately from our work.' },
      { t: 'AI usage', d: 'AI assistants have running costs that grow with the number of conversations.' },
      { t: 'Build or configure', d: 'Configuring an existing CRM is usually quicker than building a custom one.' },
      { t: 'Training and support', d: 'Ongoing changes to rules, templates and reports after launch.' },
    ],
    faqs: [
      {
        q: 'Do we have to replace our current software?',
        a: 'Usually not. We prefer connecting what you already use. If a tool genuinely cannot be connected, we explain the options before recommending a change.',
      },
      {
        q: 'Is WhatsApp automation allowed?',
        a: 'Yes, through the official WhatsApp Business Platform. Customers need to have opted in, and the templates for messages you start are reviewed by Meta. We use the official platform rather than unofficial tools, which risk getting your number blocked.',
      },
      {
        q: 'Will an AI assistant reply to customers without us?',
        a: 'Only for the things you approve, such as timings or directions. Anything outside that is handed to a person, and you can see every conversation.',
      },
      {
        q: 'What happens to our data?',
        a: 'It stays in accounts you own. We give the automation only the access it needs, and document where each piece of data goes.',
      },
    ],
    related: ['organise-whatsapp-enquiries', 'excel-to-crm'],
  },

  /* ============================ MARKETING ============================ */
  {
    path: '/digital-marketing',
    service: 'digital-marketing',
    name: 'Digital marketing',
    metaTitle: 'Digital Marketing for Local Businesses | Darsh Innovations',
    metaDescription:
      'Meta and Google Ads, landing pages and creative testing for businesses in Mumbai and Vasai–Virar, judged on enquiries, with plain-English reports.',
    heading: ['Campaigns judged on', 'enquiries, not impressions.'],
    intro:
      'We plan and run Meta and Google Ads, build the landing pages they point to, and test the creative. You get plain-English reports on what each rupee brought in.',
    chips: ['Meta Ads', 'Google Ads', 'Landing pages', 'Plain-English reports'],
    audience: [
      'Local businesses that want more calls and WhatsApp enquiries from nearby customers',
      'Businesses launching a new service, branch or product',
      'Owners who have tried boosting posts and are not sure what it achieved',
    ],
    problems: [
      { t: 'Spend without a clear result', d: 'Likes and reach go up, but it is unclear whether any of it became a customer.' },
      { t: 'Ads point to the wrong page', d: 'Traffic lands on a home page that does not match the offer, and leaves.' },
      { t: 'The same creative runs for months', d: 'Without testing, ads go stale and costs creep up.' },
    ],
    deliverables: [
      'Campaign plan: audience, offer, budget split and what counts as a result',
      'Meta and Google Ads setup, with conversion tracking you can check',
      'Landing pages built for each offer',
      'Ad creative, with new variations tested regularly',
      'Regular plain-English reports with results and next steps',
      'Ad accounts and data owned by you',
    ],
    examples: [
      {
        t: 'A local lead campaign',
        d: 'Ads shown to people in a set radius, sending them to a landing page with call and WhatsApp buttons.',
        link: { to: '/website-development', label: 'Landing pages' },
      },
      {
        t: 'A launch campaign',
        d: 'Short videos and ads for a new service, with a simple offer and a clear end date.',
        link: { to: '/video-editing', label: 'Video for ads' },
      },
    ],
    process: [
      'We agree the goal, budget and what a good enquiry looks like, and check your tracking.',
      'We write and design the ads and landing page, and you approve them before anything goes live.',
      'Campaigns launch small, and we shift budget towards what produces enquiries.',
      'Regular reports and review calls, then the next round of tests.',
    ],
    pricing: [
      { t: 'Ad budget', d: 'Paid directly to Meta or Google, separate from our fee.' },
      { t: 'Number of channels and campaigns', d: 'One platform and one offer is simpler than several at once.' },
      { t: 'Creative volume', d: 'How many new images and videos each month.' },
      { t: 'Landing pages', d: 'Whether new pages are needed, or existing ones can be used.' },
    ],
    faqs: [
      {
        q: 'How much should we spend on ads?',
        a: 'It depends on your area, competition and what a customer is worth to you. We suggest a test budget first and scale only what works.',
      },
      {
        q: 'Who owns the ad accounts?',
        a: 'You do. We work inside your Meta and Google accounts, so the history and data stay with you.',
      },
      {
        q: 'Can you guarantee a number of leads?',
        a: 'No honest agency can. We can promise clear tracking, regular testing, and a straight answer about what is and is not working.',
      },
    ],
    related: ['organise-whatsapp-enquiries'],
  },

  /* ============================== VIDEO ============================== */
  {
    path: '/video-editing',
    service: 'video-editing',
    name: 'Video editing',
    metaTitle: 'Video Editing for Reels, Ads & Brand Films | Darsh Innovations',
    metaDescription:
      'Video editing and motion graphics for reels, ads, explainers and brand films. Colour, sound, subtitles and versions for every platform, edited in house.',
    heading: ['Reels, ads and brand films,', 'edited in house.'],
    intro:
      'We edit, colour grade and finish video for social media, ads, websites and presentations, with motion graphics, subtitles and a version for every platform you post on.',
    chips: ['Reels & shorts', 'Ad edits', 'Motion graphics', 'Subtitles'],
    audience: [
      'Businesses posting regularly on Instagram, YouTube or LinkedIn',
      'Brands running video ads that need several cuts and sizes',
      'Teams with raw footage and no time to edit it',
    ],
    problems: [
      { t: 'Footage sits unused', d: 'Good material is recorded and never edited because nobody has the time.' },
      { t: 'Viewers scroll past', d: 'The first seconds do not hold attention, and there are no subtitles for people watching on mute.' },
      { t: 'One video, many formats', d: 'Every platform wants a different length and aspect ratio.' },
    ],
    deliverables: [
      'Edits for reels, shorts, ads, explainers and longer brand films',
      'Motion graphics, titles and simple animations',
      'Colour grading and sound clean-up',
      'Subtitles, in more than one language if needed',
      'Versions in 9:16, 1:1 and 16:9',
      'Project files and exports delivered to you',
    ],
    examples: [
      {
        t: 'A monthly reel batch',
        d: 'Several short edits from one recording session, each with subtitles and a hook in the first seconds.',
      },
      {
        t: 'An ad set',
        d: 'One concept cut into different lengths and sizes so campaigns can test which works.',
        link: { to: '/digital-marketing', label: 'Digital marketing' },
      },
    ],
    process: [
      'We agree the purpose, platforms, style references and deadlines, and you share the footage.',
      'A first cut for structure and pacing, before time goes into polish.',
      'Colour, sound, graphics and subtitles, with up to the agreed number of revision rounds.',
      'Final exports in every format you need, with project files handed over.',
    ],
    pricing: [
      { t: 'Length and number of videos', d: 'A batch of short reels is priced differently from a single long film.' },
      { t: 'Motion graphics', d: 'Custom animation takes longer than titles and simple overlays.' },
      { t: 'Footage condition', d: 'Well-lit, clean audio needs less repair than footage shot on the go.' },
      { t: 'Versions and languages', d: 'Each extra format or subtitle language adds finishing time.' },
    ],
    faqs: [
      {
        q: 'Do you shoot the video as well?',
        a: 'This service covers editing and motion work on footage you supply. If you do not have footage yet, mention it in your brief and we will talk through options.',
      },
      {
        q: 'How do we send footage?',
        a: 'Through a shared drive link such as Google Drive. Send the original files rather than clips forwarded over WhatsApp, which are heavily compressed.',
      },
      {
        q: 'How many revisions are included?',
        a: 'The number of revision rounds is agreed in the quote before we start, so there are no surprises.',
      },
    ],
    related: [],
  },
]

export const servicePageFor = (serviceSlug) => servicePages.find((p) => p.service === serviceSlug)
