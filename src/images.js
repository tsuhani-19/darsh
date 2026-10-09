/* ---------------------------------------------------------------------------
   IMAGE REGISTRY

   Every photo slot on the site is declared here exactly once. Nothing else in
   the codebase should hardcode an Unsplash id — import from here instead, so a
   picture can never quietly end up doing three jobs on three pages.

   Swap any value for a real project photo: drop the file in /src/assets/ and
   import it at the top of this file, then set the entry to that import.
--------------------------------------------------------------------------- */

/* Local photos live in /src/assets and are imported so Vite fingerprints them. */
import aiAutomation from './assets/ai-automation.png'
import brandingPoster from './assets/branding-poster.png'
import discovery from './assets/discovery.png'
import marketingPoster from './assets/marketing-poster.png'
import mobilePoster from './assets/mobile-poster.png'
import posterBeyondOrdinary from './assets/poster-beyond-ordinary.png'
import seoPoster from './assets/seo-poster.png'
import stepBuild from './assets/step-build.png'
import stepDesign from './assets/step-design.png'
import stepLaunch from './assets/step-launch.png'
import videoPoster from './assets/video-poster.png'
import websitesPoster from './assets/websites-poster.png'

const u = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const img = {
  /* ---------- services (one each) ---------- */
  svcWebsites: websitesPoster,
  svcMobile: mobilePoster,
  svcMarketing: marketingPoster,
  svcVideo: videoPoster,
  svcBranding: brandingPoster,
  svcSeo: seoPoster,
  svcAi: aiAutomation,

  /* ---------- process ---------- */
  stepDiscovery: discovery,
  stepDesign,
  stepBuild,
  stepLaunch,

  /* ---------- home ---------- */
  statementPoster: posterBeyondOrdinary,
  homeHero: u('photo-1522071820081-009f0129c71c'),
  homeHeroInset: u('photo-1593642532842-98d0fd5ebc1a', 700),
  homeApproachA: u('photo-1521737604893-d14cc237f11d'),
  homeApproachB: u('photo-1483058712412-4245e9b90334', 700),
  homeApproachC: u('photo-1551434678-e076c223a692', 700),
  compareBefore: u('photo-1467232004584-a241de8bcf5d', 1100),
  compareAfter: u('photo-1559136555-9303baea8ebd', 1100),
  band1: u('photo-1497366754035-f200968a6e72', 600),
  band2: u('photo-1524758631624-e2822e304c36', 600),
  band3: u('photo-1541746972996-4e0b0f43e02a', 600),
  band4: u('photo-1504384308090-c894fdcc538d', 600),
  band5: u('photo-1512941937669-90a1b58e7e9c', 600),

  /* ---------- about ---------- */
  aboutRailA: u('photo-1556761175-b413da4baf72', 600),
  aboutRailB: u('photo-1519389950473-47ba0277781c', 600),
  aboutRailC: u('photo-1497215728101-856f4ea42174', 600),
  aboutRailD: u('photo-1542744173-8e7e53415bb0', 600),
  aboutRailE: u('photo-1600607687920-4e2a09cf159d', 600),
  aboutRailF: u('photo-1626544827763-d516dce335e2', 600),
  aboutStory: u('photo-1497366811353-6870744d04b2'),
  aboutSelective: u('photo-1552581234-26160f608093'),
  aboutWide: u('photo-1531403009284-440f080d1e12', 1600),

  /* ---------- services ---------- */
  svcHero: u('photo-1522202176988-66273c2fd55f', 1100),

  /* ---------- contact ---------- */
  contactCall: u('photo-1600880292203-757bb62b4baf', 900),
}

/* Dev-only guard: shout if two slots ever point at the same picture again. */
if (import.meta.env?.DEV) {
  const seen = new Map()
  for (const [key, value] of Object.entries(img)) {
    const id = value.match(/photo-[\w-]+/)?.[0] ?? value
    if (seen.has(id)) {
      console.warn(`[images] duplicate photo: "${key}" reuses the one in "${seen.get(id)}"`)
    } else {
      seen.set(id, key)
    }
  }
}
