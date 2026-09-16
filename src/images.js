/* ---------------------------------------------------------------------------
   IMAGE REGISTRY

   Every photo slot on the site is declared here exactly once. Nothing else in
   the codebase should hardcode an Unsplash id — import from here instead, so a
   picture can never quietly end up doing three jobs on three pages.

   Swap any value for a real project photo: drop the file in /public/shots/ and
   set the entry to '/shots/whatever.jpg'.
--------------------------------------------------------------------------- */

const u = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const img = {
  /* ---------- services (one each) ---------- */
  svcWebsites: u('photo-1517245386807-bb43f82c33c4'),
  svcWebApps: u('photo-1551288049-bebda4e38f71'),
  svcMobile: u('photo-1581091226825-a6a2a5aee158'),
  svcMarketing: u('photo-1432888622747-4eb9a8efeb07'),
  svcVideo: u('photo-1611162617213-7d7a39e9b1d7'),
  svcBranding: u('photo-1561070791-2526d30994b5'),
  svcSeo: u('photo-1516321318423-f06f85e504b3'),
  svcEcom: u('photo-1563986768609-322da13575f3'),
  svcAi: u('photo-1620712943543-bcc4688e7485'),

  /* ---------- process ---------- */
  stepDiscovery: u('photo-1517048676732-d65bc937f952'),
  stepDesign: u('photo-1517292987719-0369a794ec0f'),
  stepBuild: u('photo-1498050108023-c5249f4df085'),
  stepLaunch: u('photo-1552664730-d307ca884978'),

  /* ---------- home ---------- */
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
