/* ---------------------------------------------------------------------------
   BLOG POSTS

   Each post is a list of blocks so it renders without a Markdown parser:
     { h2: 'Heading' }
     { p: 'Text' }  or  { p: ['Text with a ', { to: '/path', label: 'link' }, '.'] }
     { ul: ['item', ...] }  /  { ol: ['item', ...] }

   `services` lists the service page paths the post links to at the end.
   Practical guidance only — no invented statistics, clients or case studies.
--------------------------------------------------------------------------- */

export const posts = [
  {
    slug: 'small-business-website-cost',
    title: 'What affects the cost of a small-business website?',
    description:
      'The factors that move the price of a small-business website, from page count and content to features, editing and support, and how to get a quote you can compare.',
    date: '2026-10-10',
    services: ['/website-development'],
    body: [
      {
        p: 'Ask five agencies to quote for “a website” and the numbers can be far apart. Usually they are not pricing the same thing. Here is what actually moves the cost, so you can compare quotes properly and decide what you need.',
      },
      { h2: '1. How many pages, and how many different layouts' },
      {
        p: 'Page count matters less than people think. What costs time is the number of distinct layouts. Ten service pages that share one template are quicker to build than five pages that are each designed differently. When you request a quote, list the pages and note which ones are “the same shape”.',
      },
      { h2: '2. Who provides the words and pictures' },
      {
        p: 'Content is a common cause of delay. If you supply finished text and good photos, the work is mostly design and build. If the agency has to write copy, find images or organise a photo shoot, that is extra work and should appear as a separate line in the quote.',
      },
      { h2: '3. Features beyond information pages' },
      { p: 'Each of these adds design, development and testing time:' },
      {
        ul: [
          'Appointment booking or enquiry forms with several steps',
          'Online payments or a product catalogue',
          'More than one language, such as English, Hindi and Marathi',
          'Member logins, downloads or customer portals',
          'Connections to a CRM, Google Sheets or WhatsApp',
        ],
      },
      { h2: '4. Whether your team needs to edit it' },
      {
        p: 'If you will update prices, photos or blog posts every week, it is worth paying for a proper editing setup (a CMS) and a short training session. If the site will barely change, a simpler build can cost less to make and to host.',
      },
      { h2: '5. Custom design or a template' },
      {
        p: 'A template is cheaper up front but can look like your competitors’ sites and be hard to adapt. Custom design costs more, but the layout is built around your services and your customers’ questions. Either can be the right choice. Just make sure you know which you are buying.',
      },
      { h2: '6. Speed, SEO and accessibility basics' },
      {
        p: 'Page titles, descriptions, a sitemap, image optimisation and mobile testing should be part of any professional build. If a quote is much lower than the others, check whether these are included or treated as extras.',
      },
      { h2: '7. What happens after launch' },
      {
        p: 'Domain renewal, hosting, security updates, backups and small changes all cost something each year. Ask what is included, what is extra, and whether the domain and hosting accounts will be in your name. They should be.',
      },
      { h2: 'How to get quotes you can compare' },
      {
        ol: [
          'Write down what the site must achieve, for example more calls, bookings or credibility with buyers.',
          'List the pages and any features you are sure you need.',
          'Say who will provide text and photos.',
          'Ask each agency for a written scope with a fixed price, a timeline and what is excluded.',
        ],
      },
      {
        p: [
          'If you would like a quote on that basis, see how we approach ',
          { to: '/website-development', label: 'website development' },
          ' or ',
          { to: '/contact', label: 'send us a short brief' },
          '.',
        ],
      },
    ],
  },

  {
    slug: 'clinic-booking-website-checklist',
    title: 'What should a clinic booking website include?',
    description:
      'A practical checklist for clinics and practices: what patients look for, how booking should work, what to avoid collecting, and what to set up after launch.',
    date: '2026-10-10',
    services: ['/website-development', '/business-automation'],
    body: [
      {
        p: 'Patients visiting a clinic website usually want answers to a few questions quickly. Can this doctor help me? When are they available? Where is the clinic? How do I book? A good clinic site answers these within seconds on a phone, then makes booking easy.',
      },
      { h2: 'The information patients look for first' },
      {
        ul: [
          'Treatments and services, in plain language rather than only medical terms',
          'Doctors’ names, qualifications and the days they consult',
          'Clinic timings, including lunch breaks and holidays',
          'Address, a map link, parking and nearby landmarks',
          'A phone number and WhatsApp button that work with one tap',
        ],
      },
      { h2: 'How booking should work' },
      {
        p: 'Decide whether you need confirmed bookings or appointment requests. A request form, where the clinic calls back to confirm, is simpler and suits many practices. Real-time slot booking needs a calendar the front desk keeps up to date. Otherwise patients book slots that do not exist.',
      },
      { p: 'Whichever you choose:' },
      {
        ul: [
          'Keep the form short: name, phone number, preferred doctor or service, and preferred date',
          'Show clearly what happens next, for example “We will call you to confirm within two hours”',
          'Send a confirmation and a reminder on WhatsApp or SMS',
          'Give the front desk a single list of requests rather than a pile of emails',
        ],
      },
      { h2: 'What not to collect' },
      {
        p: 'Avoid asking for detailed medical history in a website form. It is sensitive information and a simple form is not the place to store it. Collect what you need to schedule the visit, and handle clinical details at the clinic.',
      },
      { h2: 'Trust signals that are honest' },
      {
        p: 'Real photos of the clinic and team help more than stock images. If you show patient reviews, use genuine ones and do not edit them. Registration details and memberships can be listed if they are current.',
      },
      { h2: 'After launch' },
      {
        ul: [
          'Make sure your Google Business Profile has the same name, address, phone number and timings as the website',
          'Check the site on an older Android phone over mobile data',
          'Track how many booking requests arrive, and from which page',
        ],
      },
      {
        p: [
          'If you need a site like this, see our ',
          { to: '/website-development', label: 'website development' },
          ' service. Reminders and request tracking are covered under ',
          { to: '/business-automation', label: 'business automation' },
          '.',
        ],
      },
    ],
  },

  {
    slug: 'excel-to-crm',
    title: 'When should a business move from Excel to a CRM?',
    description:
      'Signs your spreadsheets have become a bottleneck, what a CRM actually changes, and how to move across without disrupting your team.',
    date: '2026-10-10',
    services: ['/business-automation', '/app-development'],
    body: [
      {
        p: 'Spreadsheets are a sensible way to start tracking customers and leads. They are flexible, free and familiar. The question is not whether Excel is “bad”. It is whether it has started costing you sales or hours each week.',
      },
      { h2: 'Signs you have outgrown the spreadsheet' },
      {
        ul: [
          'Several people keep their own copy, and nobody is sure which is current',
          'Follow-ups are missed because nothing reminds anyone',
          'You cannot see who last spoke to a customer, or what was said',
          'Someone spends hours each week building the same report',
          'Leads come in from WhatsApp, calls and forms, and some never reach the sheet',
          'Rows get overwritten or deleted, and there is no history to recover them',
        ],
      },
      {
        p: 'If two or three of these sound familiar, a CRM (customer relationship management system) is probably worth it.',
      },
      { h2: 'What a CRM actually changes' },
      {
        ul: [
          'One shared record per customer, with every call, message and quote attached',
          'Each lead has an owner and a stage, such as new, contacted, quoted, won or lost',
          'Reminders for follow-ups, so nothing depends on memory',
          'Reports that update themselves',
          'Permissions, so staff see what they need and nothing more',
        ],
      },
      { h2: 'Ready-made or custom?' },
      {
        p: [
          'Start by looking at ready-made CRMs. Many are affordable and cover common sales processes. A custom system makes sense when your process is unusual, for example tracking installations, circuits, service visits or renewals alongside sales, or when you need it to connect closely with other tools. See our ',
          { to: '/app-development', label: 'app development' },
          ' page if that sounds like you.',
        ],
      },
      { h2: 'How to move across without chaos' },
      {
        ol: [
          'Write down your current stages and the columns you actually use.',
          'Clean the spreadsheet: remove duplicates and agree on one format for phone numbers.',
          'Import the data, then test with one person or team for a week or two.',
          'Connect lead sources such as your website form and WhatsApp so new enquiries arrive automatically.',
          'Switch everyone over on a set date, and archive the old sheet as read-only.',
        ],
      },
      {
        p: [
          'We help businesses set up CRMs and the automations around them. See ',
          { to: '/business-automation', label: 'business automation' },
          '.',
        ],
      },
    ],
  },

  {
    slug: 'organise-whatsapp-enquiries',
    title: 'How can businesses organise WhatsApp enquiries?',
    description:
      'Practical steps to stop losing leads in WhatsApp chats: the Business app’s built-in tools, a simple tracking routine, and when to move to the WhatsApp Business Platform.',
    date: '2026-10-10',
    services: ['/business-automation', '/digital-marketing'],
    body: [
      {
        p: 'For many businesses WhatsApp is where enquiries actually arrive. That is convenient for customers, but leads easily get buried under personal chats, forwarded messages and group notifications. Here is how to bring order to it, starting with what is free.',
      },
      { h2: 'Start with the WhatsApp Business app' },
      {
        p: 'If you are still using personal WhatsApp for business, switch to the free WhatsApp Business app. It gives you:',
      },
      {
        ul: [
          'A business profile with your address, timings and website',
          'Labels, such as “New enquiry”, “Quote sent”, “Paid” and “Follow up”, to sort chats',
          'Quick replies for answers you type often',
          'Greeting and away messages, so nobody waits in silence',
          'A catalogue for your services or products',
        ],
      },
      { h2: 'Agree a simple daily routine' },
      {
        ol: [
          'Label every new enquiry the same day.',
          'Reply with a quick reply that asks the two or three questions you always need answered.',
          'At the end of the day, check the “Follow up” label and reply to each chat.',
          'Move finished conversations to “Won” or “Closed” so the list stays short.',
        ],
      },
      {
        p: 'This works well for one or two people sharing a phone. It stops working when several staff need to answer, or when you want reports.',
      },
      { h2: 'Keep a record outside WhatsApp' },
      {
        p: [
          'Chats are not a database. Copy the essentials, such as name, number, what they need, source and status, into a shared sheet or a CRM. Once you are doing this by hand every day, it is a sign to automate it. See ',
          { to: '/blog/excel-to-crm', label: 'when to move from Excel to a CRM' },
          '.',
        ],
      },
      { h2: 'When to move to the WhatsApp Business Platform' },
      { p: 'The official WhatsApp Business Platform (the API) is worth considering when:' },
      {
        ul: [
          'Several team members need to answer from one number',
          'You want enquiries to appear automatically in a CRM or sheet',
          'You send reminders or updates, such as appointments or payments, to customers who have opted in',
          'You want an assistant to answer common questions and pass the rest to a person',
        ],
      },
      {
        p: 'Meta charges for many types of message on the platform, with prices that depend on the message type and country. You may need to verify your business with Meta, and the templates for messages you start are reviewed before use. Avoid unofficial bulk-messaging tools. They can get your number banned.',
      },
      {
        p: [
          'We set up WhatsApp workflows, lead tracking and reminders as part of ',
          { to: '/business-automation', label: 'business automation' },
          '. If your enquiries come from ads, ',
          { to: '/digital-marketing', label: 'digital marketing' },
          ' covers tracking which campaigns they came from.',
        ],
      },
    ],
  },

  {
    slug: 'website-or-app',
    title: 'Does a business need a website or an app?',
    description:
      'How to decide between a website, a web app and a mobile app, based on how often customers use it, what it needs to do, and your budget.',
    date: '2026-10-10',
    services: ['/website-development', '/app-development'],
    body: [
      {
        p: 'It is a common question, and the answer is usually simpler than it seems. Most businesses need a good website first. Some also need an app. Very few need an app instead of a website.',
      },
      { h2: 'What each one is for' },
      {
        ul: [
          'A website tells people who you are and what you offer, and helps them get in touch. Search engines can find it, and anyone can open it with a link.',
          'A web app is software in the browser, such as a booking system, customer portal or internal dashboard. There is nothing to install, and it works on phones and computers.',
          'A mobile app is installed from the Play Store or App Store. It suits things people use often, and it can send notifications, work offline and use the camera or location.',
        ],
      },
      { h2: 'You probably need a website if…' },
      {
        ul: [
          'Most customers find you through Google, social media or word of mouth',
          'They contact you before buying, by calling, messaging or visiting',
          'They interact with you a few times a year rather than every week',
        ],
      },
      { h2: 'Consider an app if…' },
      {
        ul: [
          'Customers come back often, for example ordering, booking, tracking or learning',
          'Notifications are central to the service, such as reminders, order updates or alerts',
          'It must work without signal, or use the camera, GPS or other phone features',
          'Your staff need a tool for field work or daily operations',
        ],
      },
      { h2: 'The middle ground: a web app' },
      {
        p: 'Many “we need an app” ideas work well as a web app first. It costs less, launches sooner, needs no store approval, and shows you whether people actually use it before you invest in Android and iOS versions.',
      },
      { h2: 'Questions to ask before deciding' },
      {
        ol: [
          'How often will one customer use this in a month?',
          'What must it do that a phone call or WhatsApp message cannot?',
          'Who will keep the content and data up to date?',
          'What is the smallest version that would be useful?',
        ],
      },
      {
        p: [
          'If you are still unsure, read about our ',
          { to: '/website-development', label: 'website development' },
          ' and ',
          { to: '/app-development', label: 'app development' },
          ' services, or ',
          { to: '/contact', label: 'tell us what you are planning' },
          '. We will tell you honestly which one fits.',
        ],
      },
    ],
  },
]

export const postBySlug = (slug) => posts.find((p) => p.slug === slug)
