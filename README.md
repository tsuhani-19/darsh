# Darsh Innovations — Website

Marketing site for Darsh Innovations: websites, web apps, mobile apps, digital
marketing, video editing, branding, SEO, e-commerce and AI automation.

## Stack

- **React 18** + **Vite 5**
- **React Router v6** — real routes: `/`, `/about`, `/services`, `/contact`, `*` (404)
- **Tailwind CSS 3** — custom palette pulled from the logo (mint → grape → coral → sun)
- **Framer Motion** — page transitions, scroll reveals, magnetic buttons, 3D tilt, parallax
- **lucide-react** — icons
- **shadcn/ui (Radix)** — the form controls only, restyled to the brand (see below)

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # preview the build
```

## Where to change things

| What | File |
|---|---|
| Phone, WhatsApp number, email, address, hours, socials | `src/siteConfig.js` |
| Services, process, commitments, team, FAQs | `src/data.js` |
| Logo artwork | `public/logo-full.png` + `public/logo-mark.png` (see below) |
| Colours, fonts, animations | `tailwind.config.js` |

**Set your real numbers before going live** — `site.phone`, `site.phoneHref` and
`site.whatsapp` in `src/siteConfig.js` are placeholders.

## Content policy

`src/data.js` contains no invented clients, testimonials, project counts or
founding dates. Everything describes capability and process. Add real results and
real team members as you get them — the layouts adapt to whatever is in the array.

`team` currently holds four role placeholders. Replace `name`, `bio` and `image`
(drop headshots into `public/team/` and reference them as `/team/name.jpg`).

`estimatorOptions` drives the instant-estimate tool. The week and rupee figures
there are starting guesses — set them to your real pricing.

## Form controls

The interactive controls are shadcn/ui components — Radix primitives generated
against `components.json` and then restyled to this site's palette. They live
in `src/components/controls/` (not the usual `components/ui`, because
`src/components/ui.jsx` already exists and the two would be easy to confuse).
`@/` resolves to `src/` via the alias in `vite.config.js` and `jsconfig.json`.

| Control | Used by |
|---|---|
| `controls/tabs.jsx` | The service category filter. Radix gives it arrow-key navigation and the tab/panel relationship; the active pill slides between tabs with a shared layout animation. |
| `controls/select.jsx` | The brief's *What do you need* and *Budget range* fields. |
| `controls/input.jsx`, `controls/textarea.jsx`, `controls/label.jsx` | The rest of the brief. |

Only the controls come from shadcn. Buttons, cards and the rest stay bespoke —
the default shadcn look is what most generated sites ship with, and matching it
would undo the point of having a brand.

Two things to know:

- `tailwindcss-animate` is installed for the Radix enter/exit utilities. It
  also defines `duration-*` as an animation utility, which makes arbitrary
  values like `duration-[900ms]` **ambiguous** — Tailwind then emits nothing
  and the transition silently breaks. Existing ones were rewritten to
  `[transition-duration:900ms]`. Spell the property out for new ones too.
- A Radix `Select` trigger must not be nested inside a `<label>`; the brief's
  `Field` wrapper uses `<Label htmlFor>` beside the control instead.

## Craft pass

- **Photography is graded.** `.graded` in `index.css` pulls saturation back,
  lifts contrast and warms the mids. Stock photos arrive at wildly different
  saturations and white balances, which is most of why a page of them looks
  assembled rather than shot. Apply it to any new photo. It has no effect on
  elements that already use a Tailwind `saturate-*`/`filter` utility, since
  those are emitted after `@layer components` and win.
- **Shadows are three layers each** — a tight contact shadow, a mid bloom and a
  wide ambient one. One big blur reads as a grey halo.
- **`.btn-dark` / `.btn-light` / `.btn-outline`** take a single specular pass on
  hover; `.link-wipe` gives an inline link a rule that wipes in from the left.
- **One focus treatment** for the whole site, drawn as an outline outside the
  box so it never shifts layout or gets clipped by a rounded corner.

## The motion layer

Effects live in `src/components/fx/`, plus two art components. All of it is
opt-in per section — nothing is global except the cursor and the grain.

| File | What it does |
|---|---|
| `HeroCollage.jsx` | The home hero's right-hand panel: two real photographs layered like prints on a desk, unmasking on arrival and tracking the pointer at different rates. |
| `heroArt.jsx` → `ServicesArt` | Nine blocks, one per discipline, that drift apart and snap back into a 3×3 formation on a loop. Hovering pulls them in and holds them there. |
| `fx/Magnetic.jsx` | Pulls a button toward the cursor. Mouse only — touch never fires it. |
| `fx/CursorGlow.jsx` | Dot-and-ring cursor that swells over anything clickable. Mounts only where `(pointer: fine)` matches and motion is welcome. |
| `fx/Grain.jsx` | A static film-grain wash over the page. |

Some things that were tried and removed, so they don't come back:

- **A drawn phone-and-dashboard mockup in the hero, with floating capability
  chips, orbit rings and a canvas particle constellation.** It read as generic
  AI-landing-page filler, and invented product UI makes a studio look like it
  has nothing of its own to show. The photographs do the same job and are true.
- **A sticky scroll-driven phone tour.** Same problem — the screens inside it
  were invented software.

Two rendering notes worth keeping:

- **Never wrap a sticky section in `overflow-hidden`.** A clipped ancestor
  silently turns off `position: sticky` for everything inside it.
- **Don't nest a `transform-style: preserve-3d` scene inside `PageHero`'s
  perspective wrapper.** Chrome drops clipped, rounded children entirely and
  leaves blank rectangles. `ServicesArt` animates in 2D for this reason.

Reduced motion is handled in two places: `index.css` neuters CSS animations,
and `<MotionConfig reducedMotion="user">` in `App.jsx` does the same for
Framer, which drives its transforms from JS and would otherwise ignore the
preference entirely.

## The floating assistant

`src/components/AssistantWidget.jsx` renders the pulsing call button pinned to the
bottom-right of every page. Opening it types out a short AI-style greeting character
by character, then reveals two actions:

- **Connect on a call** → `tel:` link using `site.phoneHref`
- **Chat on WhatsApp** → `https://wa.me/...` with a prefilled message

It also self-teases with a "Need help? Let's talk" bubble after ~5s, closes on `Esc`,
and is fully keyboard/ARIA labelled.

## Contact form — no SMTP

By design there is **no email backend**. `src/pages/Contact.jsx` collects name,
company, service, budget and details, formats them into a message and opens
WhatsApp with it prefilled. Nothing to host, nothing to configure, no deliverability
problems.

## Adding the real logo

**This is the one step only you can do.** Save the two official files into
`public/` with these exact names (see `public/ADD-YOUR-LOGO-HERE.txt`):

```
public/logo-full.png   the lockup: mark + "Darsh Innovations"
public/logo-mark.png   the swirl mark on its own
```

Nothing else needs changing — the header, footer, favicon and assistant all read
those paths from `src/siteConfig.js`. Until the files exist the site falls back to a
vector stand-in of the mark plus a typeset wordmark, so it never shows a broken image.
(SVG or WebP work too — just update `logoFull` / `logoMark` in `siteConfig.js`.)

## Notes

- Fully responsive from 320px up; mobile nav is a full-screen animated overlay.
- Honours `prefers-reduced-motion` — all animation is neutered for users who ask for it.
- Light theme throughout, with dark sections used for contrast (numbers band, CTA, footer).
- Photography is loaded from Unsplash CDN URLs defined in `src/data.js`. Swap them for
  real project photos when you have them.
