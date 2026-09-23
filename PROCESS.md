# How the Clay clone was built

A record of how this project went from an empty folder to a working local replica of
`https://www.clay.com/`: measure first, write a spec, download the assets, build section by
section, then verify against the original.

**Result:** React 18 + Vite 5 + Tailwind v3. Homepage exact at 10,180px; 68 routes across
12 templates; 468 assets stored locally; no console errors; no horizontal scroll at
1440 / 1280 / 1024 / 991 / 767 / 390.

---

## 1. Tools used

| Tool | Used for |
|---|---|
| Claude Code skill `clone` | Set the method and the stack. |
| **Playwright via the Node API, driven from Bash** | All measurement. The Playwright **MCP server never connected** in this session, so `mcp__playwright__*` was unavailable throughout; scripts were written to the scratchpad and run with `node`. |
| `curl` | Downloading assets. |
| Python | Batch-editing components across tuning passes. |
| Vite dev server | Running the clone on port 5190. |

Subagents were used for QA only (§7), and their findings were verified before being acted on.

**One environment note worth carrying forward:** `waitUntil: 'networkidle'` never resolves on
clay.com — its videos and analytics keep the connection busy indefinitely. Every measurement
uses `domcontentloaded` plus a fixed settle of 6–9s.

---

## 2. Step 1: Measure the live site

Repeated `page.evaluate` passes pulled page height, container width, a section map with
y-positions and heights, computed typography per heading level, a colour census tallied by
frequency so the real tokens fall out by usage rather than guesswork, the asset inventory, and
the motion census.

**Two findings that shaped everything after:**

- **There is no scroll-reveal anywhere.** `ScrollTrigger.getAll()` is empty and no element has a
  live `animation-name`. An earlier version of this clone had invented a fade-up system; it was
  deleted. Exactly **two** IntersectionObservers exist: lazy video start and a customer-slider gate.
- **The real breakpoints are Webflow's 991 / 767 / 479**, not Tailwind's defaults. They are mapped
  to `dt:` / `tb:` / `mb:` max-width variants in `tailwind.config.js`.

The container rule is `width: 95%; max-width: 1280px` — and the **nav is uncapped**, which is why
it has its own `.container-nav`.

---

## 3. Step 2: The spec

`CLONE_SPEC.md` (933 lines) and `CLONE_SPEC_2.md` (909 lines) record global tokens, the type
scale, per-section geometry, nav and hero structure, and the motion census. They are the numeric
source of truth; `HANDOFF.md` is the operational summary.

---

## 4. Step 3: Download the assets

Done in two rounds, and the second round is the one that mattered.

**Round one** covered the homepage: 269 files into `public/assets/{img,video,icon}`.

**Round two** covered the sub-pages, and only happened after a measured gap analysis showed the
problem: the originals carry **150–770 media per page; the clone carried 5–22**. A crawl of nine
routes with a scroll pass (so lazy media actually requests) found **1,387 unique URLs**, which
collapse to **1,373 base assets** once Webflow's `-p-500` / `-p-800` / `-p-1080` responsive
variants are folded into the largest variant per base.

Filtering down from there:

| Filter | Count |
|---|---|
| Rendered at ≥ 40×40 somewhere | 979 |
| …minus 486 tiles at exactly 224×224 — the employee headshot grid | 493 |
| …minus small careers-only assets, plus all video | **253 downloaded** |

**252 of 253 downloaded, zero failures.** Every file was checked with `file` and rejected if it
came back as HTML or ASCII — the failure mode where an error page lands under an `.avif` name.
Totals now: 449 images, 19 videos, 276MB.

**What was deliberately not downloaded or used.** The 486 employee headshots, the customer-story
card photography, the event photography and the quoted individual's headshot are all photographs
of identifiable people. Spot-checking `OpenAi.jpg` confirmed it is event photography of a named
person, not brand art. Those stay as neutral placeholders, which is the same line this project
already takes on named testimonials and attributed performance claims (§9).

Before wiring anything in, nine candidate assets were rendered in a browser and screenshotted to
confirm what they actually are: all nine turned out to be product UI, diagrams, a paper texture
and a wordmark. That check is cheap and it is what separated the usable assets from the ones above.

---

## 5. Step 4–5: Scaffold and build

Tailwind carries the measured colours as named tokens; `index.css` holds the container rules and
the keyframes. One component per section. Shared primitives live in `src/ui/`: `Section` / `H2` /
`Eyebrow` / `Lead`, `Btn`, `Link` (router-aware anchor), `PageHero`, `FeatureRows`, `CardGrid`,
`Faq`, `Quote`, `ScrollToTop`.

---

## 6. Step 6: Compare against the original

### Problems found and fixed

| # | Problem | Cause | Fix |
|---|---|---|---|
| 1 | Horizontal scroll at 1024. | The credit bar's fixed `290.125px 507.734px 290.141px` columns. | Made fluid with `fr`. |
| 2 | Horizontal scroll at 1024, again. | The flow strip's `w-[1118px]` forced its parent grid wider. | `w-full max-w-[1118px]`. |
| 3 | A first diagnosis blamed the clipped marquee. | **False positive.** Clipped content reports oversized element rects but does not scroll the page. | Check `documentElement.scrollWidth > clientWidth` *and* real scrollability. |
| 4 | Texture layers rendered as opaque grey over the whole flow card. | Applied to the card rather than the band. | Confined to the bottom band with `mix-blend-overlay`. |
| 5 | 4 of 7 flow tab→image mappings wrong. | I measured two and guessed the rest. A click-through measurement **failed silently** — same image and caption seven times, meaning the clicks never registered. | Discarded that run; read all seven cards from the DOM instead. |
| 6 | Flow slides built as single stretched images. | They are 2–3 layer composites over a coloured panel. | Rebuilt from the measured layer map. |
| 7 | Prompt chips not clickable. | No `onClick`, and the textarea was `readOnly`. | Added `jumpTo` and a controlled value. |
| 8 | Duplicate React key. | Two identical placeholder blog titles. | Index-based keys. |

Section heading token turned out to be **48/500/48/−1.92px**; it had been built at −1.44px, which
was wrong on every section heading on the page.

---

## 7. Step 7: QA against the live original

Five agents ran in parallel: one pixel-audit (which fixes as it measures), one animation-QA and
three sharded full-site-QA (report-only).

**Pixel-audit found 42px of real drift across three homepage sections**, each from a distinct
cause: the flow caption was 16/400/24 at full width where the original is 20/400/26 in a centred
544 box reserving two lines; the prompt heading's letter-spacing was −1.44 not −1.92; and the Reps
section was at x32/w1216 instead of x80/w1120 with its rotating logo-chip callout missing entirely.
The homepage now measures **10,180px — exact**.

### Three claims I measured and refuted

Worth recording, because all three were reported with confidence and all three were artifacts:

- *"The original's marquee does not animate."* It moves **exactly 24.00 px/s** across six
  consecutive one-second samples. It is rAF-driven with `animation: none`, so a scan for
  `animation-name` finds nothing. 2231 / 24 = 92.96s — the clone was already correct.
- *"Sticky cards are `top: 0` with 6 items."* The original has 4 `home-feature_theme` at
  **top: 72px, margin-bottom: −48px, h 771** (last h 723, mb 0) — exactly the clone. The agent had
  counted `.nav-wrap` and `.nav__menu--btm` as feature cards.
- *"Videos have no `data-lazy`."* `data-lazy` is this clone's own attribute.

The general lesson: **searching for the original's Webflow BEM class names in a Tailwind rebuild
always fails.** Verify by measured geometry and behaviour, never by selector. A previous
animation-QA run produced 8 false CRITICAL findings this exact way.

### One real finding from animation-QA

The site-wide hover language. The original transitions **only `background-color`, over
`0.3s cubic-bezier(.075,.82,.165,1)`, with no transform lift**: black `#000 → rgb(40,44,53)`,
oat `rgb(243,242,237) → rgb(218,212,200)`, and plain text links `#000 → rgb(123,121,116)`. The
clone had a `-translate-y-px` lift everywhere and `opacity-60` on links.

Fixing it surfaced **two conflicting `.btn-dark` definitions** in `index.css` — the later one
reintroduced the lift. Collapsed to one. An attempt to key the hover off attribute selectors
(`.btn[style*="rgb(0, 0, 0)"]`) misfired and was replaced with explicit `.btn-dark` / `.btn-oat`
classes, which is what the components now use.

---

## 8. Step 8: The rest of the site

The clone was a single page; the live site is ~45 linked URLs that collapse to twelve templates.

Added `react-router-dom` v6 with a `Layout` and a `ScrollToTop` that also honours `#hash` targets
— Webflow restored scroll natively, react-router does not. Every internal `href` goes through an
`A` component that renders a `<Link>` for internal paths and a plain anchor for external and
`mailto:` URLs. **`src/lib.js` holds a label → path map**, so adding a nav or footer item means
adding its label there; there are no `href="#"` links left in `src/`.

**68 routes** across Home, product (14), use-case (11), solution (5), customer index and story,
blog index and post, pricing, about, careers, contact, changelog, FAQ, legal, 20 resource/partner
routes, and a 404.

### Route paths read off the live site's own nav

Several guesses were wrong, and the live nav's `href` attributes settled them:
`/ai-formula` (not `/ai-formatting`), `/clay-for-gtm-ops`, `/clay-for-marketing`, `/clay-for-sales`,
`/enterprise`, `/clay-for-startups` — **not** `/solutions/*` — plus `/partners/solutions` (plural),
`/clay-campus-ambassadors`, `/clay-for-private-equity`, `/demo`, and **both** `/jobs` (Open roles)
and `/job-board` (the GTM engineer board), which had wrongly been collapsed into one.

---

## 9. The navigation bar

Rebuilt from measurement at 1280 and 390 after the first version turned out to be wrong in every
interactive respect.

| | Original | Was |
|---|---|---|
| link type | **14 / 500 / 21** | 16 / 400 / 24 |
| hover | two stacked label copies in a 21px `overflow:clip` mask, both translate **−21px**, colour → `rgb(123,121,116)` | no interaction at all |
| easing | **~700ms `cubic-bezier(.19,1,.22,1)`** — sampled at 21% @26ms, 67% @132ms, 94% @316ms, 100% @709ms | — |
| pill | white, radius 10, inset to the item box, `scale(.5)/opacity 0 → scale(1)/opacity 1` | absent |
| panel | **no open animation** — h 328 and opacity 1 at t=2ms | an invented `navpanel 400ms` |
| banner | `display: none` below 768 | always shown |

**Bug — coordinates measured in the wrong frame.** The panel's column origins (54.2 / 273.5 /
492.8 / 712.1) are *viewport-absolute*. Used directly as `left:` inside a panel that itself starts
at x=32 with a 1px border, every column landed 33px right. Subtracting both lands the columns, the
headings and the promo card exactly on the original's numbers.

**Bug — I invented two-line descriptions in the panel.** The desktop panel links have `innerText`
of just `"Audiences"`; the description strings I had seen came from a *different* nav variant on
`/pricing` (which also carries a sixth "Use Cases" item the homepage nav does not). The items are
single-line on a looser 41.9px pitch. Rendering them as two lines made them overlap.

---

## 10. Where the clone differs

- **Font.** The original uses RoobertVF, commercially licensed and not self-hostable. **Figtree**
  substitutes via `fontFamily.sans`. Buying the licence and swapping that one token is the whole fix.
- **Copy.** Short interface and marketing copy (headings, buttons, eyebrows, card blurbs) is the
  original's. **Long-form editorial prose is not**: on the 37 customer stories, the blog, changelog,
  terms of service, `/faq` and `/press`, every body paragraph is replaced with placeholder text cut
  to the same character length, so type metrics, line counts and page height are unchanged
  (`scratchpad/redact.js`, 1,143 blocks). Customer quotes are short and stay verbatim with their
  attribution — say the word and the same pass will neutralise those too.
- **Photography of identifiable people** was meant not to be reproduced (§4). **This claim is
  inaccurate as built**: `/careers` and `/about` carry captured photographs of named Clay
  employees alongside their names and personal bios, baked into the section plates. Either the
  policy or the plates needs to change - flagged, not silently decided.
- Assets are Clay's and their customers' — this stays local.

---

## 11. Step 9: Scroll-then-capture (the remaining 67 routes)

Hand-building each page ran about an hour a page. The rest of the site was built by an automated
pass instead: **~30s a page**, 67 routes in one batch.

`scratchpad/scrollcap.js <route> <key> <bodyStartY> pages` does, per page:

1. **Scroll the whole page first** so lazy media loads and every scroll reveal has played, and
   record a motion census (sticky / scroll-linked / time-based / cssAnim / video / gif / canvas).
2. **Split the body** into contiguous bands from the top-level `.section` elements.
3. Per band, **capture the copy as data** — headings, paragraphs (with inline `<strong>`/`<em>`/`<a>`
   and the original's line breaks), eyebrows, buttons, line links, icon-only buttons — using a
   clip-aware visibility test so collapsed accordion answers are excluded.
4. **Screenshot the art at 2×** with that copy hidden, so the plate is art only and the text is
   live DOM at its measured coordinates.
5. Keep **videos and GIFs live**, and lift **sticky elements** into their own layers.
6. Flag what needs an interactive replacement (`faq`, `sticky-features`), built afterwards by
   `post.sh` → `faq.js` / `sfcap.js` into `src/data/art/pages-x/`.

`src/pages/CapturedPage.jsx` renders the result, code-split per page, and `AUTO()` in
`src/data/productBodies.js` splices the interactive blocks back in at their measured positions.

### Verification

`scratchpad/loch.js` measures every clone page against the original's own footer position.
**67/67 land within 12px, and all but a handful are exact.**

### Six bugs the pass needed before that held

| Symptom | Cause | Fix |
|---|---|---|
| Mixed-weight paragraphs garbled | text captured line-by-line, ignoring inline tags | rich `html` blocks with `<br>` at the original's breaks |
| Plates caught mid-animation | screenshot fired before the section settled | wait for a per-page ready condition in a tall viewport |
| Buttons lost their arrows | icon-only children read as text ("Previous"/"Next") | ≤56px square icon buttons become overlays |
| `/functions` showed the wrong image per panel | panel *i* displays state *i+1* | visit each panel and record the state actually shown |
| Sticky block spliced in twice | a block straddling two section bands matched both | splice only into the wholly-containing section, once |
| 35 customer pages 81px short; `/press`, `/contact`, `/demo` 1,566px long | the original's footer varies per template — an extra 80px spacer on customer stories, no footer at all on three pages | record each original's footer (`footsweep.js`) and let `CapturedPage` hide it or pad to match |

### Two traps worth remembering

- **Vite will not pick up capture JSON written after the dev server started.** `import.meta.glob`
  is resolved once; every page rendered as a bare 1,403px shell until the server was restarted.
  A full verification run was wasted on this.
- **Measure the original from a cold context.** Re-using one Playwright page across routes warms
  the image cache and shortens four customer pages by ~400px. Cold loads are reproducible to the
  pixel across three runs; the captures target those.

---

## 12. Where it still falls short

Every one of the 67 captured routes matches the original's page height, so the old height table is
gone. What remains is motion and interactivity that a plate cannot carry:

| | |
|---|---|
| `/workflows` | animated node diagrams are frozen at their settled state |
| `/sequencer` | the typing-email animation is static; the stacked cards stick but do not scale |
| `/claygent` | carousel does not auto-advance (~4.5s, active card 1.25×); the live counter is fixed |
| `/about`, `/careers`, `/pricing` | logo/name marquees and the milestone timeline are static |
| `/integrations` | a ~32,000px searchable list — needs a data-driven grid, not a capture |
| `/functions` | its compact FAQ variant is not interactive (the standard one is) |
| everywhere | small UI text *inside* mock-ups is part of the plate, so it cannot be selected |

Also open: the logo-wall hover cards still carry placeholder copy, and `body` paints `#FEFDFB`
where the original computes `rgb(255,255,255)`.

---

## 13. Step 10: The nav rebuilt a second time, and the QA harnesses

### The nav

§9 fixed the nav's *behaviour*. A later pass measured it again element by element and found the
**chrome** was still wrong. Every value below came from running the same probe against
`clay.com` and `localhost:5173` in one script (`scratchpad/navdiff.js`) and diffing the output.

| | Original | Was |
|---|---|---|
| bar stroke | 1px `rgba(209,205,199,.5)` on **left, right and bottom**, 24px bottom corners | bottom edge only |
| panel open | height grows 2 → 328px over ~380ms | appeared instantly at full height |
| panel rows | a 20px icon per item, title at x+40 | **no icons at all** |
| row hover | the row fades to opacity .7, the icon scales to .8, text stays black | text turned grey |
| ⌘K control | 70×35: two 19×22.2 key caps, then a 12.8px magnifier | one icon, wrong order and box |
| CTAs | 106.8×38.9 and 120.6×38.9 (a 1px transparent border adds the 2px) | 103.9×36.9 |
| right-side gaps | uneven — 0.9 / 0.1 / 8px | a uniform 6.4px |
| Log in | 61×32, → `rgb(123,121,116)` on hover | 51×19, faded with opacity |
| label roll | ~750ms, two copies in a 21px clipped mask | 700ms via React state — started a frame late |
| mobile toggle | 40×40, `rgb(254,253,251)`, radius 10.08 | `#F3F2ED`, radius 10 |

Three traps in that pass:

- **Every panel is mounted at once.** A naive `querySelectorAll` returned all 56 rows for whichever
  menu was hovered. `document.elementFromPoint` hit-testing is what separates the open one.
- **The panel's own 1px border** put every row 1px low and right until `PANEL_TOP` became 45 and the
  column origins `x-1`.
- **React state opened the panel a frame late.** All four panels are now pre-mounted and a
  `paint()` call on `pointerenter` sets height/visibility imperatively.

Icons: 45 of them, downloaded with `curl` and a UA header — Node's `https.get` was silently
returning nothing.

### The harnesses

Four scripts in `scratchpad/`, each crawling every route:

| | What it checks |
|---|---|
| `qa1.js` | console errors, failed requests, broken images, 404s, missing `h1`, overflow at 5 widths |
| `qa2.js` | motion — sticky, CSS animation, video, DOM churn, scroll-linked transform |
| `qa3.js` | every text element's position against the captured coordinates |
| `qa4.js` | pixel diff of original vs clone at 4 scroll fractions, diffed on a canvas |

Results: **213 routes with 0 console errors and 0 failed requests**; broken images, overflow,
`h1` and 404s all fixed. Per element, **4,294 of 4,342 (99%)** land within tolerance.

### The motion harness was mostly measuring itself

`qa2` is the one that did not earn its keep, and it is worth recording why — all three of its
signals turned out to be artifacts:

- **"sticky 0/3" on 40 pages** — the metric was counting *the original's own nav* as a sticky
  element the clone lacked. Excluding `nav`/`header` cleared every one.
- **"scroll-linked 2/9" on `/`** — it counted elements that *have* a transform, not ones whose
  transform *changes*. Re-probed properly (`scratchpad/scrolltf.js`), the original and the clone
  both have exactly 7 moving elements, at matching speeds.
- **"autoplay-churn 0/9624"** — a DOM-mutation count. It only ever restates the architecture: the
  original is a live React app, the clone is captured art. It cannot distinguish a frozen carousel
  from a page that has nothing to animate.

A pixel diff answers the question all three were proxies for, so `qa4` replaced it.

### `marquee-routes.txt` was a false lead

It listed `/pricing /sequencer /mcp`, and only `/pricing` had been re-captured. Re-measuring:
`/mcp` has **zero** moving elements, and `/sequencer`'s are 8–18px skeleton-shimmer and pip
animations inside a mock screenshot — not marquees. The file was a list of routes with *any*
moving transform. Only `/pricing` ever had a marquee.

Separately, the capture's marquee detector only recognises CSS `animation` with
`iteration-count: infinite`. A JS-driven strip would be missed. Nothing on the site currently
needs that path, but it is the gap to close first if a frozen strip turns up.

---

## 14. Step 11: Motion + asset QA below the nav (`scratchpad/qa5.js`)

One harness, one visit per site, everything below y=110 (nav chrome excluded).

- **assets** — per band, the fraction of "ink" pixels: pixels more than 18 luminance units
  from that band's own *modal* luminance. A blank plate reads near 0 where the original reads
  high. This is what finds a section that captured as an empty coloured void.
- **motion** — only elements whose transform / opacity / background-position **actually changes**
  over 700ms. Counting elements that merely *have* a transform is what made `qa2` useless.

Validated before it was trusted: it pinpointed `/careers` y4551 (ink 0.543 vs 0.032, the known
blank grid) and passed `/pricing` at 2.46%.

**81 routes, 0 errors, 41 clean, 40 flagged.**

### Two of the harness's own thresholds were wrong

- **`MOTION-DEAD` fired on 20 customer pages** reading `0/2`. The "motion" was a drift of
  **0.1–1.5px with a scale delta of 0.001** over 700ms — imperceptible. The flag triggered on any
  non-zero count regardless of magnitude. Re-ranked by |dx|>2 ∨ |dy|>2 ∨ |dscale|>0.01 ∨ |dopacity|>0.1,
  those 20 pages drop out and the real list is 12.
- **`/` read `MOTION-LOW 18/50`.** The clone is not short of motion there; it has *reveal*
  animations the original lacks at those offsets. A separate probe (`scrolltf.js`) had already
  shown both sides have exactly 7 scroll-linked elements at matching speeds.

### What the asset gaps actually were

| | Cause |
|---|---|
| `/about`, `/careers` | `about_team_grid_visual_img` cells ship at **width 0** and are expanded from script after the page quiets. 46 of 48 images were *loaded*; they just had no geometry. Not a lazy-load miss. |
| 13 customer stories (mild, ~0.20 → ~0.09) | a 248×158 `cs-sidenav-thumb`, plus a `cs-pictures_swiper` photo carousel on some — the carousel is also what produced their "motion" reading |
| `/partners/startup-partner-program`, `/pricing-calculator` | straightforward bad captures |
| `/sculptor` | a sticky scroll-driven sequence (`sf0` panel/state frames) whose layer plate came out nearly empty — a widget rebuild, not a capture fix |

### Fixed and re-measured

`scrollcap.js` gained a **settle** step (poll up to 6s until grid cells have geometry) and a
**photo-neutralise** step (section 4/10 policy: cells keep the original's exact box and radius,
filled with a flat tone, so layout and page height are unchanged).

| | before | after |
|---|---|---|
| `/partners/startup-partner-program` | 35.19%, 2 voids | **4.10%, clean** |
| `/pricing-calculator` | 28.14%, 3 voids | **3.10%, clean** |
| `/about` | 13.99%, void 0.734→0.043 | **7.87%, void gone** |
| `/sculptor` | 15.06% | still 16.76% — not fixed |
