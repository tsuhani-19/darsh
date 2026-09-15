// Single place to change business details across the whole site.
export const site = {
  name: 'Darsh Innovations',
  // ---------------------------------------------------------------------
  // LOGO. Save the two official files into /public, then point these paths at
  // them. SVG is preferred (crisp from favicon to hero, a few KB); transparent
  // PNG is fine as a fallback. See public/ADD-YOUR-LOGO-HERE.txt.
  //   public/logo-full.*  -> the lockup (mark + "Darsh Innovations")
  //   public/logo-mark.*  -> the swirl mark on its own
  // Until they exist the site falls back to the vector stand-in in
  // public/logo-mark.svg plus a typeset wordmark.
  // ---------------------------------------------------------------------
  logoFull: '/logo-full.png',
  logoMark: '/logo-mark.png',
  logoFallback: '/logo-mark.svg',
  tagline: 'We design, build and launch digital products that move.',
  phone: '+91 92231 91191',
  phoneHref: 'tel:+919223191191',
  whatsapp: '919223191191', // country code + number, digits only
  whatsappMessage: 'Hi Darsh Innovations! I would like to discuss a project.',
  email: 'hello@darshinnovations.com',
  address: 'Building 102, Shanti Kutir, Tulinj Road, near Nallasopara East, Mumbai',
  city: 'Mumbai',
  hours: 'Mon – Sat · 10:00 – 19:00 IST',
  socials: [
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Dribbble', href: '#' },
    { label: 'YouTube', href: '#' },
  ],
}

export const whatsappLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  site.whatsappMessage,
)}`
