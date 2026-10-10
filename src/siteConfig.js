// Single place to change business details across the whole site.
export const site = {
  name: 'Darsh Innovations',
  // ---------------------------------------------------------------------
  // LOGO. One official file, drawn everywhere through src/components/Logo.jsx:
  //   public/logo.svg  -> the lockup (mark + "Darsh Innovations"), 1618 x 971
  // The square mark used for avatars and watermarks is that same file seen
  // through a crop, not a second asset, so the two can never drift apart.
  // public/favicon.svg is the one exception: browsers refuse external
  // references inside an SVG favicon, so it carries its own copy of the mark.
  // ---------------------------------------------------------------------
  logo: '/logo.svg',
  tagline: 'We design, build and launch digital products, then help them grow.',
  // The business phone, also the WhatsApp number (confirmed by the owner).
  phone: '+91 92231 91191',
  phoneHref: 'tel:+919223191191',
  whatsapp: '919223191191', // country code + number, digits only
  whatsappMessage: 'Hi Darsh Innovations! I would like to discuss a project.',
  email: 'darshinnovations@gmail.com',
  // Left empty until the owner confirms it. Everything that shows the address
  // (and the structured data) hides itself while this is blank.
  address: '',
  city: 'Mumbai',
  hours: 'Mon – Sat · 10:00 – 19:00 IST',
  // Put the real profile URL in `href` and the link appears in the footer.
  // Anything still left blank (or on '#') is skipped rather than rendered as a
  // link that goes nowhere — a dead social link costs more trust than a
  // missing one.
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/darshinnovations' },
    { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61595371855955' },
    { label: 'LinkedIn', href: '' },
    { label: 'Dribbble', href: '' },
    { label: 'YouTube', href: '' },
  ],
}

export const whatsappLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  site.whatsappMessage,
)}`
