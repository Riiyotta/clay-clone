# React Router table in src/App.jsx, rendering a local clone of clay.com

Source: React Router table in src/App.jsx, rendering a local clone of clay.com
Status: **measured-from-source**
95 routes · 16 templates · 23 unique sections

> Generated from `ia.json` by `build.mjs`. Edit the JSON, not this file.

## Shape of the site

The largest 3 templates (Customer story, Product (live-built), Use case) account for 53 of 95 routes (56%). The remaining 42 routes span 13 templates.

| template | routes | share |
|---|---:|---:|
| Customer story | 31 | 33% |
| Product (live-built) | 11 | 12% |
| Use case | 11 | 12% |
| Resource / partner (live-built) | 10 | 11% |
| Resource / partner (scroll-captured) | 9 | 9% |
| Solution ("Clay for X") | 5 | 5% |
| Company | 4 | 4% |
| Product (scroll-captured) | 3 | 3% |
| Pricing / legal (scroll-captured) | 3 | 3% |
| Content index | 2 | 2% |
| Home | 1 | 1% |
| Customer index | 1 | 1% |
| Legal (live-built) | 1 | 1% |
| Solution with sticky-panel splice | 1 | 1% |
| Resource/partner with sticky-panel splice | 1 | 1% |
| FAQ index | 1 | 1% |

## Page chrome

**95 routes carry chrome = `full`** — Home, Product (live-built), Product (scroll-captured), Use case, Solution ("Clay for X"), Customer story, Customer index, Company, Content index, Resource / partner (scroll-captured), Pricing / legal (scroll-captured), Resource / partner (live-built), Legal (live-built), Solution with sticky-panel splice, Resource/partner with sticky-panel splice, FAQ index.

## Sections by reuse

How widely a section is shared determines whether it belongs in a shared
component library or stays local to its page.

| section | category | templates | routes | implementation | scope |
|---|---|---:|---:|---|---|
| `shell.navbar` | SHELL | 16 | 95 | `src/components/Navbar.jsx` | Rendered once outside <Routes> in App.jsx — present on all 95 routes including the 404 catch-all. |
| `shell.footer` | SHELL | 16 | 95 | `src/components/Footer.jsx` | Rendered once outside <Routes> — present on all routes except the 3 a captured page's own JSON marks footerless (press, contact, demo, per HANDOFF.md); customer-story routes get an extra 80px spacer above it instead of a different footer. |
| `captured.page-body` | CAPTURED | 12 | 72 | `src/pages/CapturedPage.jsx (data: src/data/art/pages/*.json)` | All 72 routes rendered by CapturedPage.jsx, across 12 templates — template.product-captured (3), template.use-case (11), template.solution (5) + template.solution-sticky (1), template.customer-story (31), template.customer-index (1), template.company (4), template.content-index (2) + template.faq-index (1), template.resource-captured (9) + template.resource-sticky (1), and template.pricing-legal-captured (3). Sum: 3+11+5+1+31+1+4+2+1+9+1+3 = 72. |
| `conversion.cta-band` | CONVERSION | 2 | 21 | `src/pages/ProductPage.jsx (inline), src/pages/Simple.jsx (Simple's cta block)` | template.product's closing band (11 routes) and template.resource-simple's closing band (10 routes); equivalent closing bands inside captured.page-body on the captured templates are not a separate section id since their content/position is data-defined per route. |
| `proof.logo-wall-static` | PROOF | 2 | 12 | `src/ui/ProductLogoWall.jsx` | template.product's optional logo wall (only products whose productHeroes.js entry sets logoWall) and captured.page-body's own logo band on /customers ('Trusted by 500,000+', per HANDOFF.md's QA-pass note). |
| `hero.left-plain` | HERO | 2 | 11 | `src/ui/PageHero.jsx (shape="left")` | template.resource-simple (10 routes, with CTAs) and template.legal (1 route, /privacy, no CTAs — just title/sub). |
| `hero.product-live` | HERO | 1 | 11 | `src/ui/ProductHero.jsx, src/ui/PageHero.jsx (shape="centre")` | Used by template.product (11 routes) and template.product-captured is NOT this — those 3 render a captured hero band instead (see captured.page-body). |
| `content.feature-rows` | CONTENT | 1 | 11 | `src/ui/FeatureRows.jsx` | template.product's intro band (11 routes) and any other live (non-captured) page that imports it. |
| `content.how-to-band` | CONTENT | 1 | 11 | `src/pages/ProductPage.jsx (inline), src/ui/CardGrid.jsx` | template.product only (11 routes) — added per HANDOFF.md's QA pass note 'added the how-to band ... Fixes all 14' (that note predates 3 of the 14 products being superseded by captured pages; it now applies to the 11 that still render live). |
| `content.faq-band` | CONTENT | 1 | 11 | `src/ui/Faq.jsx` | template.product (11 routes, via shared Faq.jsx) — the captured templates' FAQ content is either interactive.faq-inline (spliced) or part of captured.page-body (frozen plate). |
| `proof.customer-voice-quotes` | PROOF | 1 | 11 | `src/pages/ProductPage.jsx (inline VOICES constant)` | template.product only (11 routes) — added per HANDOFF.md's QA-pass note 'added ... the customer-voice band. Fixes all 14' (now applies to the 11 still rendering live). |
| `content.card-row-3up` | CONTENT | 1 | 10 | `src/pages/Simple.jsx (Simple's card grid)` | template.resource-simple only, and only on routes whose data/simple.js entry sets cards. |
| `interactive.sticky-feature-panel` | INTERACTIVE | 2 | 2 | `src/data/productBodies.js AUTO(), src/ui/product/StickyPanels.jsx, StackedCards.jsx` | Exactly 2 real routes have a matching src/data/art/pages-x/<key>.sf.json file: /enterprise (template.solution-sticky) and /partners/solutions (template.resource-sticky) — each was split into its own single-route template rather than left inside its larger sibling template, since neither the other 5 solution routes nor the other 9 resource routes carry this splice. |
| `hero.home` | HERO | 1 | 1 | `src/components/Hero.jsx, HeroField.jsx, HeroCli.jsx` | Home route only (/). |
| `interactive.faq-inline` | INTERACTIVE | 1 | 1 | `src/data/productBodies.js AUTO(), src/ui/Faq.jsx` | Only the specific captured routes whose JSON has a matching src/data/art/pages-x/<key>.faq.json (per HANDOFF.md's 'interactive replacements' note) — /functions is flagged in HANDOFF §'Still open' as using the compact, non-interactive FAQ variant instead, i.e. NOT this section. |
| `interactive.prompt-builder` | INTERACTIVE | 1 | 1 | `src/components/PromptBuilder.jsx` | Home route only. |
| `content.flow-steps` | CONTENT | 1 | 1 | `src/components/FlowSection.jsx` | Home route only. |
| `content.feature-chapters` | CONTENT | 1 | 1 | `src/components/Features.jsx, FeatureBlock.jsx` | Home route only. |
| `content.reps-visual` | CONTENT | 1 | 1 | `src/components/Reps.jsx` | Home route only. |
| `content.updates-grid` | CONTENT | 1 | 1 | `src/components/Updates.jsx` | Home route only. |
| `proof.logo-marquee` | PROOF | 1 | 1 | `src/components/LogoWall.jsx` | Home route only. |
| `proof.customer-story-player` | PROOF | 1 | 1 | `src/components/Customers.jsx` | Home route only. |
| `content.legal-clauses` | CONTENT | 1 | 1 | `src/pages/Simple.jsx (Legal)` | template.legal only (1 route, /privacy). |

**7 shared sections** appear in more than one template and belong in a component library.

**16 single-use sections** appear in exactly one template. Building these
as "reusable" components up front would be speculative — keep them page-local
until a second caller actually appears.

## Templates

### Home — `template.home`

1 route · `/` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | HERO | `hero.home` | page-local |
| 3 | PROOF | `proof.logo-marquee` | page-local |
| 4 | CONTENT | `content.flow-steps` | page-local |
| 5 | INTERACTIVE | `interactive.prompt-builder` | page-local |
| 6 | CONTENT | `content.feature-chapters` | page-local |
| 7 | CONTENT | `content.reps-visual` | page-local |
| 8 | PROOF | `proof.customer-story-player` | page-local |
| 9 | CONTENT | `content.updates-grid` | page-local |
| 10 | SHELL | `shell.footer` | shared ×16 |

### Product (live-built) — `template.product`

11 routes · `/claygent`, `/account-agents`, `/audiences`, `/signals`, `/waterfall-enrichment`, `/workflows`, `/functions`, `/ads`, `/agent-plugin`, `/ai-formula`, `/integrations` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | HERO | `hero.product-live` | page-local |
| 3 | PROOF | `proof.logo-wall-static` | shared ×2 |
| 4 | CONTENT | `content.feature-rows` | page-local |
| 5 | CONTENT | `content.how-to-band` | page-local |
| 6 | PROOF | `proof.customer-voice-quotes` | page-local |
| 7 | CONTENT | `content.faq-band` | page-local |
| 8 | CONVERSION | `conversion.cta-band` | shared ×2 |
| 9 | SHELL | `shell.footer` | shared ×16 |

### Product (scroll-captured) — `template.product-captured`

3 routes · `/mcp`, `/sculptor`, `/sequencer` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | CAPTURED | `captured.page-body` | shared ×12 |
| 3 | SHELL | `shell.footer` | shared ×16 |

### Use case — `template.use-case`

11 routes · `/use-cases/outbound`, `/use-cases/inbound-enrichment`, `/use-cases/account-research`, `/use-cases/abm`, `/use-cases/plg-assist`, `/use-cases/rep-assist`, `/use-cases/rep-prospecting`, `/use-cases/reverse-etl`, `/use-cases/crm-enrichment`, `/use-cases/tam-sourcing`, `/use-cases/territory-planning` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | CAPTURED | `captured.page-body` | shared ×12 |
| 3 | SHELL | `shell.footer` | shared ×16 |

### Solution ("Clay for X") — `template.solution`

5 routes · `/clay-for-gtm-ops`, `/clay-for-marketing`, `/clay-for-sales`, `/clay-for-startups`, `/clay-for-private-equity` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | CAPTURED | `captured.page-body` | shared ×12 |
| 3 | SHELL | `shell.footer` | shared ×16 |

### Customer story — `template.customer-story`

31 routes · `/customers/a-lign`, `/customers/alertmedia`, `/customers/anthropic`, `/customers/coverflex`, `/customers/depthfirst`, `/customers/elevenlabs`, `/customers/exit-five`, `/customers/figma` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | CAPTURED | `captured.page-body` | shared ×12 |
| 3 | SHELL | `shell.footer` | shared ×16 |

### Customer index — `template.customer-index`

1 route · `/customers` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | CAPTURED | `captured.page-body` | shared ×12 |
| 3 | PROOF | `proof.logo-wall-static` | shared ×2 |
| 4 | SHELL | `shell.footer` | shared ×16 |

### Company — `template.company`

4 routes · `/about`, `/careers`, `/contact`, `/press` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | CAPTURED | `captured.page-body` | shared ×12 |
| 3 | SHELL | `shell.footer` | shared ×16 |

### Content index — `template.content-index`

2 routes · `/blog`, `/changelog` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | CAPTURED | `captured.page-body` | shared ×12 |
| 3 | SHELL | `shell.footer` | shared ×16 |

### Resource / partner (scroll-captured) — `template.resource-captured`

9 routes · `/demo`, `/job-board`, `/jobs`, `/guides`, `/livestreams`, `/clay-campus-ambassadors`, `/partners`, `/partners/integrations`, `/partners/startup-partner-program` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | CAPTURED | `captured.page-body` | shared ×12 |
| 3 | SHELL | `shell.footer` | shared ×16 |

### Pricing / legal (scroll-captured) — `template.pricing-legal-captured`

3 routes · `/pricing`, `/pricing-calculator`, `/terms-of-service` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | CAPTURED | `captured.page-body` | shared ×12 |
| 3 | SHELL | `shell.footer` | shared ×16 |

### Resource / partner (live-built) — `template.resource-simple`

10 routes · `/university`, `/cohort-classes`, `/community`, `/slack`, `/events`, `/experts`, `/templates`, `/status`, `/series-c`, `/do-not-sell` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | HERO | `hero.left-plain` | shared ×2 |
| 3 | CONTENT | `content.card-row-3up` | page-local |
| 4 | CONVERSION | `conversion.cta-band` | shared ×2 |
| 5 | SHELL | `shell.footer` | shared ×16 |

### Legal (live-built) — `template.legal`

1 route · `/privacy` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | HERO | `hero.left-plain` | shared ×2 |
| 3 | CONTENT | `content.legal-clauses` | page-local |
| 4 | SHELL | `shell.footer` | shared ×16 |

### Solution with sticky-panel splice — `template.solution-sticky`

1 route · `/enterprise` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | CAPTURED | `captured.page-body` | shared ×12 |
| 3 | INTERACTIVE | `interactive.sticky-feature-panel` | shared ×2 |
| 4 | SHELL | `shell.footer` | shared ×16 |

### Resource/partner with sticky-panel splice — `template.resource-sticky`

1 route · `/partners/solutions` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | CAPTURED | `captured.page-body` | shared ×12 |
| 3 | INTERACTIVE | `interactive.sticky-feature-panel` | shared ×2 |
| 4 | SHELL | `shell.footer` | shared ×16 |

### FAQ index — `template.faq-index`

1 route · `/faq` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | CAPTURED | `captured.page-body` | shared ×12 |
| 3 | INTERACTIVE | `interactive.faq-inline` | page-local |
| 4 | SHELL | `shell.footer` | shared ×16 |

## Section reference

### SHELL

_Site chrome present on (nearly) every route: nav bar and footer._

**`shell.navbar`** — Fixed overlay nav: wordmark, mega-menu (Product/Solutions/Company/Resources), search/⌘K control, Log in, and a CTA pair. Collapses to a drawer with an accordion below 768px.

· Rendered once outside <Routes> in App.jsx — present on all 95 routes including the 404 catch-all. · appears on 95 routes · implemented by `src/components/Navbar.jsx`

**`shell.footer`** — CTA band plus a 5-column link grid.

· Rendered once outside <Routes> — present on all routes except the 3 a captured page's own JSON marks footerless (press, contact, demo, per HANDOFF.md); customer-story routes get an extra 80px spacer above it instead of a different footer. · appears on 95 routes · implemented by `src/components/Footer.jsx`

### HERO

_Page-opening header block, live-built (not a scroll-captured plate)._

**`hero.home`** — Full-bleed dark-green (#035D44) hero: headline, CLI-style typed demo, and CTA pair.

· Home route only (/). · appears on 1 routes · implemented by `src/components/Hero.jsx, HeroField.jsx, HeroCli.jsx`

**`hero.product-live`** — Measured product hero (spec from data/productHeroes.js) or, for a product with no measured hero yet, the generic centred PageHero shape.

· Used by template.product (11 routes) and template.product-captured is NOT this — those 3 render a captured hero band instead (see captured.page-body). · appears on 11 routes · implemented by `src/ui/ProductHero.jsx, src/ui/PageHero.jsx (shape="centre")`

**`hero.left-plain`** — Left-aligned page hero (57.6/600/57.6/-2.304, 596 cap): eyebrow, title, sub, optional CTA pair. The one hero shape not implemented by a captured plate on any of its current routes.

· template.resource-simple (10 routes, with CTAs) and template.legal (1 route, /privacy, no CTAs — just title/sub). · appears on 11 routes · implemented by `src/ui/PageHero.jsx (shape="left")`

### CAPTURED

_A whole page body produced by the scroll-then-capture pass (scratchpad/scrollcap.js): sequential art+live-copy+live-video bands rendered by CapturedPage.jsx from a JSON file in src/data/art/pages/. Not a fixed section shape — the captured JSON itself defines the band sequence per route, including that route's own hero band._

**`captured.page-body`** — The full sequence of a captured route's content bands, including its own hero band (the largest heading in the first two bands is tagged as the page's h1). Each band is either a static 2x screenshot 'plate' with live DOM copy/links overlaid at measured coordinates, or a live <video>/<gif>, per scrollcap.js's capture pass. This is one section id covering an entire page body because the real band sequence is data-defined per route in its own JSON file, not a fixed component shape shared across routes.

· All 72 routes rendered by CapturedPage.jsx, across 12 templates — template.product-captured (3), template.use-case (11), template.solution (5) + template.solution-sticky (1), template.customer-story (31), template.customer-index (1), template.company (4), template.content-index (2) + template.faq-index (1), template.resource-captured (9) + template.resource-sticky (1), and template.pricing-legal-captured (3). Sum: 3+11+5+1+31+1+4+2+1+9+1+3 = 72. · appears on 72 routes · implemented by `src/pages/CapturedPage.jsx (data: src/data/art/pages/*.json)`

### PROOF

_Social proof: logo walls, marquees, customer quotes, the customer-story player._

**`proof.logo-marquee`** — Continuously scrolling customer-logo track: 2231px track, 15 columns x 3 rows, 24.0px/s (92.96s period). Not CSS animation — measured as rAF-driven on the original.

· Home route only. · appears on 1 routes · implemented by `src/components/LogoWall.jsx`

**`proof.logo-wall-static`** — A static grid of customer logos (not a marquee).

· template.product's optional logo wall (only products whose productHeroes.js entry sets logoWall) and captured.page-body's own logo band on /customers ('Trusted by 500,000+', per HANDOFF.md's QA-pass note). · appears on 12 routes · implemented by `src/ui/ProductLogoWall.jsx`

**`proof.customer-story-player`** — Stateful case-study video/quote player with an IntersectionObserver-gated autoplay.

· Home route only. · appears on 1 routes · implemented by `src/components/Customers.jsx`

**`proof.customer-voice-quotes`** — A 3-up grid of neutral placeholder customer quotes (attributed claims are deliberately not reproduced verbatim, per HANDOFF.md §4's convention).

· template.product only (11 routes) — added per HANDOFF.md's QA-pass note 'added ... the customer-voice band. Fixes all 14' (now applies to the 11 still rendering live). · appears on 11 routes · implemented by `src/pages/ProductPage.jsx (inline VOICES constant)`

### CONTENT

_Live-built, data-driven body content shared across non-captured templates._

**`content.flow-steps`** — 4-step tabbed flow cards with a layered-composite illustration per tab (coloured panel + textures + 2-3 UI screenshots at measured offsets) and a 9150ms auto-advance dwell.

· Home route only. · appears on 1 routes · implemented by `src/components/FlowSection.jsx`

**`content.feature-chapters`** — 4 alternating image/copy chapters, each with its own heading tint (navy/brown/olive/plum) and a looping feature video.

· Home route only. · appears on 1 routes · implemented by `src/components/Features.jsx, FeatureBlock.jsx`

**`content.reps-visual`** — Stacked-record visual with a rotating logo-chip callout, on a looping feature video.

· Home route only. · appears on 1 routes · implemented by `src/components/Reps.jsx`

**`content.updates-grid`** — Conference/event promo banner plus a grid of update/post cards.

· Home route only. · appears on 1 routes · implemented by `src/components/Updates.jsx`

**`content.feature-rows`** — A row-per-feature list (icon/heading/copy), shared primitive.

· template.product's intro band (11 routes) and any other live (non-captured) page that imports it. · appears on 11 routes · implemented by `src/ui/FeatureRows.jsx`

**`content.how-to-band`** — A 3-step 'how to get started' card grid beside a heading/lead, defaulting to a generic 3-step copy if the product has no bespoke steps.

· template.product only (11 routes) — added per HANDOFF.md's QA pass note 'added the how-to band ... Fixes all 14' (that note predates 3 of the 14 products being superseded by captured pages; it now applies to the 11 that still render live). · appears on 11 routes · implemented by `src/pages/ProductPage.jsx (inline), src/ui/CardGrid.jsx`

**`content.faq-band`** — A sticky-heading FAQ accordion band, one item open at a time, all closed on load.

· template.product (11 routes, via shared Faq.jsx) — the captured templates' FAQ content is either interactive.faq-inline (spliced) or part of captured.page-body (frozen plate). · appears on 11 routes · implemented by `src/ui/Faq.jsx`

**`content.card-row-3up`** — A 3-column grid of simple title/body cards on a tinted background; omitted entirely when a route's data has no cards.

· template.resource-simple only, and only on routes whose data/simple.js entry sets cards. · appears on 10 routes · implemented by `src/pages/Simple.jsx (Simple's card grid)`

**`content.legal-clauses`** — A sequence of heading+paragraph clause blocks plus a closing 'Contact us' line — no CTA band.

· template.legal only (1 route, /privacy). · appears on 1 routes · implemented by `src/pages/Simple.jsx (Legal)`

### INTERACTIVE

_Stateful widgets, including interactive pieces spliced back into an otherwise-captured page._

**`interactive.faq-inline`** — An interactive accordion FAQ, spliced into a captured page's band sequence at its measured position, replacing a plate that would otherwise be a frozen screenshot of the same content. Not listed on any template's `sections` array (it doesn't apply to every route in either template it touches) — see each template's `$note` for which single route actually has it.

· Only the specific captured routes whose JSON has a matching src/data/art/pages-x/<key>.faq.json (per HANDOFF.md's 'interactive replacements' note) — /functions is flagged in HANDOFF §'Still open' as using the compact, non-interactive FAQ variant instead, i.e. NOT this section. · appears on 1 routes · implemented by `src/data/productBodies.js AUTO(), src/ui/Faq.jsx`

**`interactive.sticky-feature-panel`** — A sticky-image-plus-scrolling-text panel sequence, spliced into a captured page's band sequence, replacing a plate that would otherwise be frozen. Not listed on any template's `sections` array (it doesn't apply to every route in either template it touches) — see each template's `$note` for which single route actually has it.

· Exactly 2 real routes have a matching src/data/art/pages-x/<key>.sf.json file: /enterprise (template.solution-sticky) and /partners/solutions (template.resource-sticky) — each was split into its own single-route template rather than left inside its larger sibling template, since neither the other 5 solution routes nor the other 9 resource routes carry this splice. · appears on 2 routes · implemented by `src/data/productBodies.js AUTO(), src/ui/product/StickyPanels.jsx, StackedCards.jsx`

**`interactive.prompt-builder`** — Tabbed, stateful prompt-input demo: clickable chips fill a controlled textarea.

· Home route only. · appears on 1 routes · implemented by `src/components/PromptBuilder.jsx`

### CONVERSION

_Closing CTA bands and commerce content._

**`conversion.cta-band`** — Closing centred heading with a 'Start free trial' / 'Get a demo' button pair.

· template.product's closing band (11 routes) and template.resource-simple's closing band (10 routes); equivalent closing bands inside captured.page-body on the captured templates are not a separate section id since their content/position is data-defined per route. · appears on 21 routes · implemented by `src/pages/ProductPage.jsx (inline), src/pages/Simple.jsx (Simple's cta block)`
