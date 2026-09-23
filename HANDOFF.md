# HANDOFF — read this first

Pixel-accurate rebuild of **https://www.clay.com/?ref=saaspo.com** in React 18 + Vite +
Tailwind v3. The **homepage and all 68 routes are built and verified**.

```bash
npm install && npm run dev
```

---

## 1. Environment gotchas — read before doing anything

**The Playwright MCP server is registered in `.mcp.json` but does NOT connect until the
session restarts.** If `mcp__playwright__*` tools fail, that's why. Two options:

- Restart the session so the MCP server connects, **or**
- Drive Chromium through the Playwright **Node API via Bash** (what every measurement in
  this project used). A working install lives in the session scratchpad; if it's gone:
  `npm i playwright@1.63.0` in a scratch dir, then `node script.js`. Chromium is installed.

**When measuring the live original, `waitUntil:'networkidle'` times out** — its videos and
analytics never settle. Use `waitUntil:'domcontentloaded'` plus `waitForTimeout(9000)`.

**Subagents burn session rate limits fast.** Two recon agents died mid-run on a 429. Doing
the measuring directly in the main session was faster and more reliable.

**Other MCP connectors (Figma, Linear, Notion, Atlassian…) are unauthorized** — authorize via
claude.ai connector settings if needed.

---

## 2. What exists

| File | What |
|---|---|
| `CLONE_SPEC.md` (933 ln) | Global tokens, nav, hero, per-section geometry, motion census |
| `CLONE_SPEC_2.md` (909 ln) | Marquee grid, flow tabs, prompt typewriter, reps, slider, updates, footer |
| `ASSETS.md` | The homepage asset round + where each is used |
| `PROCESS.md` | **How this was built** — method, the asset crawl, every bug and its cause, and the refuted findings. Read this before re-litigating anything. |
| `clone.config.json` | Original URL, dev port (5190) |
| `README.md` | Stack + measured token table |

`src/components/` — Navbar, Hero, HeroField, HeroCli, LogoWall, FlowSection, PromptBuilder,
Features, FeatureBlock, CallOut, Reps, Customers, Updates, Footer, Logo.
`src/hooks/` — `useVideoAutoplay` (lazy video IO), `useTypewriter`.

**Assets**: **449 images + 19 videos** in `public/assets/{img,video,icon}` (~276MB), across two
rounds — the homepage set, then a crawl of nine sub-page routes (see `PROCESS.md` §4). Paths are
declared in arrays at the top of each component or in `src/data/*.js`, not scattered inline.

Webflow serves `-p-500` / `-p-800` / `-p-1080` variants of every image; the crawl folds those into
the largest variant per base name. Every downloaded file was verified with `file` so an HTML error
page can't sit under an `.avif` extension.

**Not downloaded, deliberately**: the 486-tile employee headshot grid, customer-story card
photography, event photography and the quoted individual's headshot — photographs of identifiable
people, which stay as neutral placeholders on the original's geometry (§4).

---

## 3. Homepage — verified state

All 9 sections match the original at 1280 (±≤4px). Total 10138 vs 10180.
Zero console errors. **No horizontal scroll at 1440/1280/1024/991/767/390.**

Key facts that were expensive to learn — do not re-derive:

- Container is `width:95%; max-width:1280px`. The **nav is uncapped** (no max-width).
- Real breakpoints are **991 / 767 / 479** (Webflow), not Tailwind defaults. Mapped to
  `dt:` / `tb:` / `mb:` (max-width variants) in `tailwind.config.js`.
- **There is NO scroll-reveal anywhere.** `ScrollTrigger.getAll()` is empty; no element has a
  live `animation-name`. An earlier version invented a fade-up system — it was removed. Do
  not reintroduce it.
- Exactly **two IntersectionObservers**: lazy video start (rootMargin 200px, once, 300ms
  poster cross-fade) and a customer-slider gate.
- Section heading token is **48/500/48/−1.92px** (`text-h2`). Flow's h2 is 72/500/72/−2.16.
- **Flow slides are layered composites**, not single images: a coloured panel (dy 175,
  1216×392, radius 32) in the tab accent, textures over it, then 2–3 UI screenshots at
  measured dx/dy offsets. See `FlowSection.jsx` `PLAYS[].layers`.
- Feature cards are `position:sticky; top:72px`, 771px items → **723px pitch**.
- Marquee: 2231px track, 15 columns, 3 rows, **24.0 px/s → 92.96s**.
- Flow tab dwell **9150ms**; typewriter ~33ms/char, 1520ms hold, caret blinks 495ms.

---

## 4. Conventions to keep

**Copy**: wherever the original carries customer testimonials, attributed performance claims
("X tripled their…"), or editorial headlines about named individuals, this build uses
**neutral placeholder text on the original's exact type metrics and geometry**. Layout
fidelity is preserved; the specific claims are not reproduced. Keep doing this — swap in the
client's own approved copy at the end if wanted.

**Fonts**: the original uses **RoobertVF**, a commercially licensed typeface that cannot be
self-hosted. **Figtree** substitutes via `fontFamily.sans`. Buy the licence and swap that one
token for exact type fidelity.

**Verification loop that works**: build → `npm run build` → start dev → measure the clone with
Playwright → diff against the original's numbers → fix → re-measure. Never trust a
self-report; always re-measure.

**Beware false positives** when auditing:
- Clipped content (marquee track) reports oversized element rects but does **not** scroll the
  page. Check `documentElement.scrollWidth > clientWidth` AND real scrollability.
- `alt=""` on decorative images is correct markup, not "missing alt".
- Searching for the original's Webflow BEM class names (`.home-feature_theme`) in this
  Tailwind rebuild will always fail. Verify by **behaviour and geometry**, never by selector.

---

## 5. Open items on the homepage

1. **Marquee cursor interaction** — the original has a `.logo_cursor` / `.logo_user` chip
   (95.5×41, radius 16, avatar + 2-line label) that appears to follow the pointer over the
   logo cards. Never measured; not built. Start by hovering the original's marquee.
2. **Feature buttons run ~28px narrow** — missing their trailing 16×16 arrow icon track.
   Original "Start free trial" is 157.6×42; ours is ~129.8.
3. Flow caption box is full-width centred; the original's is a narrower centred box
   (x437.9 w404.2). Visually identical, structurally different.

---

## 6. Routing and the rest of the site — BUILT

`react-router-dom` v6 is wired in `src/main.jsx` (`BrowserRouter`) and `src/App.jsx`
(`Routes`). `Navbar` and `Footer` are rendered once outside `<Routes>`; every page is a
child of `<main>`. `src/ui/ScrollToTop.jsx` restores scroll on navigation and honours
`#hash` targets (Webflow did this natively; react-router does not).

**68 routes render, zero console errors, no horizontal scroll at 1440/1280/1024/991/767/390,
and no dead internal links.** The homepage is byte-for-byte unchanged (still 10138px tall).

### Where a link's destination is decided

`src/lib.js` holds `PATH`, a label → path map, and `to(label)`. Navbar and Footer render
from label arrays, so **adding a nav/footer item means adding its label to `PATH`** —
otherwise `to()` falls back to `/` rather than a dead `#`. There are no `href="#"` links
left anywhere in `src/`.

### Page shapes

Three hero shapes were measured off the original and live in `src/ui/PageHero.jsx`:

| shape | metrics | used by |
|---|---|---|
| `big` | 120/600/121.2/−4.8 centred | /about, /careers |
| `centre` | 88/575/88/−3.52 centred, 960 cap | product pages |
| `left` | 57.6/600/57.6/−2.304 left, 596 cap | use-cases, pricing, contact, resources |

Shared primitives in `src/ui/`: `Section`/`H2`/`Eyebrow`/`Lead`, `Btn`, `Link` (router-aware
`<a>`), `FeatureRows`, `CardGrid`, `Faq`, `Quote`, `ScrollToTop`.

### Routes and where their content lives

| Routes | Component | Content |
|---|---|---|
| `/` | `pages/Home` | the existing section components |
| 14 product routes | `pages/ProductPage` | `data/products.js` |
| 11 `/use-cases/:slug` | `pages/UseCasePage` | `data/usecases.js` → `USE_CASES` |
| 5 `/solutions/:slug` | `pages/UseCasePage` | `data/usecases.js` → `SOLUTIONS` |
| `/customers`, `/customers/:slug` | `pages/Customers` | `data/customers.js` |
| `/blog`, `/blog/:slug` | `pages/Blog` | `data/misc.js` → `POSTS` |
| `/pricing` | `pages/Pricing` | `data/pricing.js` (plans + comparison matrix) |
| `/about`, `/careers`, `/contact` | own components | `data/misc.js` |
| `/changelog`, `/faq`, legal | `pages/Simple` | `data/misc.js`, `data/simple.js` |
| 20 resource/partner routes | `pages/Simple` → `Simple` | `data/simple.js` → `SIMPLE` |
| `*` | `pages/NotFound` | — |

Adding a resource-style route is one entry in `SIMPLE`; `App.jsx` maps over it.

### Known gaps on the new pages

1. **Copy is placeholder wherever the original is editorial** — customer stories, press,
   blog bodies, and the community cards, per §4. Product and use-case copy is written from
   the original's own feature descriptions.
2. **Measured against the original's archetypes, not every route.** `/pricing`, `/about`,
   `/careers`, `/contact`, `/claygent`, `/use-cases/outbound`, `/customers`, and
   `/customers/open-ai` were measured with Playwright; the rest follow those templates. Page
   heights therefore differ from the originals, which run 2–3× longer with imagery the clone
   does not have.
3. **Interactive set pieces not rebuilt**: the about-page milestone timeline is a static
   row (the original reveals on hover/arrow keys), and the careers-page name marquee is not
   present.
4. Production hosting needs an SPA history fallback (`vite preview` and `vite dev` do this
   already; a static host needs a rewrite to `/index.html`).

---

## 7. QA pass against the live original — what changed

Ran pixel-audit + animation-QA + three sharded full-site-QA agents against
https://www.clay.com/, then verified every claim by measurement before acting.

### Nav — rebuilt (`src/components/Navbar.jsx`)

Measured at 1280 and 390 and rebuilt to match:

| | Original | Was in the clone |
|---|---|---|
| link type | **14 / 500 / 21** | 16 / 400 / 24 |
| hover | two stacked label copies in a 21px `overflow:clip` mask, both translate **−21px**, colour → `rgb(123,121,116)` | no interaction at all |
| hover easing | **~700ms `cubic-bezier(.19,1,.22,1)`** (21% @26ms, 67% @132ms, 94% @316ms, 100% @709ms) | — |
| pill | white, radius 10, inset to the item, `scale(.5)/opacity 0` → `scale(1)/opacity 1` | absent |
| panel open | **no animation** — h=328 and opacity 1 at t=2ms | invented `navpanel 400ms` |
| panel columns | absolute x 54.2 / 273.5 / 492.8 / 712.1 (Company 54.2 / 346.6 / 639) | wrong origin (these are viewport-absolute; subtract the panel's x=32 **and** its 1px border) |
| panel items | single line, 41.9px pitch (Product/Company) or 29.5px (Solutions/Resources) | had invented two-line descriptions |
| promo card | 294.4×224 at x=931.4 | x=903 |
| banner | **`display:none` below 768** | always shown |
| mobile | bar 370.5 @x10 (= the 95% container at 390), 40×40 toggle, fixed drawer inset 10px, accordion per menu, CTAs pinned bottom ("Get a demo" / "Sign up") | flat link list |

Panel geometry now lands exactly on the original's numbers.

### Buttons and links — the site-wide hover language

The original transitions **only `background-color`, 0.3s `cubic-bezier(.075,.82,.165,1)`,
with no transform lift**:

- black CTA `#000` → `rgb(40,44,53)`  ·  oat CTA `rgb(243,242,237)` → `rgb(218,212,200)`
- plain text links `#000` → `rgb(123,121,116)` (not `opacity-60`)

Use `.btn-dark` / `.btn-oat` (in `index.css`) rather than setting a background inline —
the hover comes with the class. Two conflicting `.btn-dark` definitions were collapsed.

### Routes corrected to the original's real paths

Read off the live site's own nav hrefs:

`/ai-formula` (not `/ai-formatting`) · `/clay-for-gtm-ops` · `/clay-for-marketing` ·
`/clay-for-sales` · `/enterprise` · `/clay-for-startups` (**not** `/solutions/*`) ·
`/partners/solutions` (plural) · `/clay-campus-ambassadors` · `/clay-for-private-equity` ·
`/demo` · and **both** `/jobs` (Open roles) and `/job-board` (GTM engineer board).

Product and solution pages can now carry a `path` override in their data file;
`App.jsx` uses `p.path || '/'+slug`.

### Sections that were missing and are now built

The first QA round came back "clean" because the agents were told not to report
content gaps — that was wrong. A section-level diff of original vs clone found:

- **`/careers`** — added Offices, Collective effervescence (6 perks), Our benefits (8),
  Play Pot, and the 4-step Interview process. 4480 → 7719px.
- **product template** — added the how-to band and the customer-voice band. Fixes all 14.
- **customer-story template** — added the opening pull-quote, the closing narrative,
  "Explore more customers", and the closing product CTA. Fixes all 10.
- **`/customers`** — added the "Trusted by 500,000+" logo wall.
- **`/pricing`** — the comparison matrix is now inline (it was hidden behind a toggle;
  the original shows it), plus a customers band.
- **`/about`** — added "Our team".
- **`/contact`** — was over-built (4 invented cards); the original is a hero and one
  paragraph in a centred 800 band at 64/600/64/−1.92.

### Claims I measured and REFUTED — do not re-open

- *"The original's marquee doesn't animate"* — it moves **exactly 24.00 px/s**
  (six consecutive 1s samples). It is rAF-driven with `animation: none`, so scanning
  for `animation-name` finds nothing. 2231/24 = 92.96s; the clone is correct.
- *"Sticky cards are top:0 with 6 items"* — the original has 4 `home-feature_theme`
  at **top:72px, margin-bottom:−48px, h=771** (last h=723, mb=0). Exactly the clone.
  That agent counted `.nav-wrap` as a feature card.
- Flow dwell measured **9294 / 9067 ms ≈ 9150ms** — the clone is correct.
- `data-lazy` is this clone's own attribute; its absence upstream is not a finding.

### Scroll-then-capture — the 67 non-product routes (`src/data/art/pages/`)

Built by `scratchpad/scrollcap.js`, not by hand: ~30s a page. Each page JSON holds its
sections (plate + live copy + live video + sticky layers), its `pageBg`, and the original's
`footer` geometry. `src/pages/CapturedPage.jsx` renders it, code-split per page.

- **Verified: 67/67 within 12px of the original's height**, nearly all exact
  (`scratchpad/loch.js`). Measure the original from a **cold** browser context — a warm
  image cache shortens some customer pages by ~400px.
- **Restart Vite after writing new capture JSON.** `import.meta.glob` resolves once; new
  pages otherwise render as a bare 1,403px shell.
- Interactive replacements (FAQ, sticky feature panels) live in `src/data/art/pages-x/`
  and are spliced back by `AUTO()` in `src/data/productBodies.js`.
- Long-form prose on the 36 article pages is placeholder text at the original's exact
  character lengths (`scratchpad/redact.js`) — rerun it after re-capturing any of them,
  and re-record that page's `footer` too, since a re-capture overwrites both.

### Still open

- **Motion inside captured plates is frozen**: `/workflows` node diagrams, `/sequencer`'s
  typing email plus its 8-18px skeleton-shimmer and pip animations, `/claygent`'s carousel
  auto-advance and live counter, and the `/about` timeline.
- `/integrations` (a ~32,000px searchable list) still needs a data-driven grid - it is the
  one page a capture cannot carry.
- `/functions` uses a compact FAQ variant that is not interactive.
- Small UI text inside captured mock-ups is part of the plate, so it is not selectable.
- The careers name-marquee is not built.
- Body paints `#FEFDFB` where the original computes `rgb(255,255,255)` - a ~1-unit
  delta, left alone rather than churned site-wide on one measurement.

### Marquees - corrected

`scratchpad/marquee-routes.txt` lists `/pricing /sequencer /mcp`. **Only `/pricing` has a
marquee.** That file was a list of routes with *any* moving transform. Re-measured: `/mcp` has
zero moving elements; `/sequencer`'s are skeleton shimmers inside a mock screenshot. Do not
spend time "fixing" the other two.

Note that the capture's marquee detector (`scrollcap.js`) only matches CSS `animation` with
`iteration-count: infinite`. A JS/rAF-driven strip would be silently missed - that is the first
thing to check if a frozen strip ever turns up.

### The QA harnesses (`scratchpad/`)

`qa1.js` health sweep - `qa2.js` motion - `qa3.js` per-element position - `qa4.js` pixel diff.
Re-run any of them with a route list as argv, or no args to read `routes.txt`.

**`qa2.js` is not trustworthy** and should be read with suspicion: its sticky, scroll-linked and
mutation-churn signals all proved to be measuring the harness or the architecture rather than the
clone (see PROCESS.md section 13). `qa4.js` is the one that answers the real question. `scrolltf.js`
is the corrected scroll-motion probe.

### Motion + asset QA (`scratchpad/qa5.js`) — current state

Run it with routes as argv, or no args for `routes.txt`. It measures everything **below the nav**:
per-band "ink" fraction (finds sections captured as empty voids) and only *actually changing*
transform/opacity/background-position (finds frozen motion).

**81 routes, 0 errors.** Read two of its flags with care:

- `MOTION-DEAD` fires on any non-zero count. On ~20 customer pages the "motion" is a **0.1–1.5px
  drift** — not real. Filter by |dx|>2 ∨ |dy|>2 ∨ |dscale|>0.01 ∨ |dopacity|>0.1 first.
- `MOTION-LOW` on `/` is wrong; the clone has *more* motion there, not less.

**Fixed and verified:** `/partners/startup-partner-program` (35.2% → 4.1%),
`/pricing-calculator` (28.1% → 3.1%), `/about` (team-grid void gone).

**Still open, in priority order:**

1. `/sculptor` — 16.8%, two near-total voids. Its sticky `sf0` panel/state sequence captured
   almost empty. Needs the widget rebuilt, not re-captured; re-capturing was tried and did not help.
2. **Perceptible frozen motion on 12 pages**: `/clay-for-sales`, `/customers`, `/livestreams`,
   `/claygent` (12 each), `/workflows` (8), `/careers` (7), `/customers/saviynt`, `/demo` (6),
   `/partners/solutions` (5), `/about`, `/sequencer` (4), `/customers/figma` (2). Each is a widget
   baked into a plate; de-freezing means rebuilding it as live DOM.
3. **13 customer stories** carry a mild gap from a `cs-sidenav-thumb` and a `cs-pictures_swiper`
   photo carousel. Both are photography — see the note below before "fixing" them.

### Photography of identifiable people — a live decision

`scrollcap.js` now replaces images inside team/grid/headshot/people containers with flat tiles of
the same box and radius, so geometry and page height are unaffected. That is what cleared `/about`.

`/careers` has **not** been re-captured yet and still shows empty cells where the original has a
wall of employee photographs. Re-capturing it under the current policy gives neutral tiles; the
alternative reproduces roughly thirty named individuals' faces and bios. That is a product
decision, not a QA one - it is deliberately left for a human to make.
