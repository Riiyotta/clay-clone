# Clay clone — design repo

A machine-validated design system extracted from the pixel-accurate React 18 + Vite +
Tailwind v3 rebuild of `clay.com` that lives in the parent folder. It exists so an AI
can compose new on-brand pages without inventing a colour, a copy budget, a motion
timing or a section that "seems likely".

**Structure and measurement only.** Every number here was measured off the original or
read off the clone's own source. None of the original's copy, artwork, photography or
trademarks is reproduced in this package, and nothing in it licenses reproducing them.
The measured site belongs to a real, live company — see `assets/asset-roles.json` for
per-role generation and licensing guidance, and read it before generating anything.

---

## What is in here

| | count |
|---|---|
| Token files | 15 |
| Primitives | 10 |
| Components | 13 |
| Sections | 67 |
| Templates (page shapes) | 19 |
| Routes mapped | 103 |
| Asset roles | 11 |
| Compatibility rules | 14 |

Counts are not hand-maintained — `extraction/verify_all.py` recomputes every one from
the real files and fails the run on any mismatch.

```
design-repo/
  README.md · CHANGELOG.md · registry.manifest.json
  tokens/{00-foundation,10-semantic,20-component,30-layout,themes,llm}/
  primitives/ · components/ · sections/
  assets/asset-roles.json
  templates/{templates.json,routes.json}
  compatibility/graph.json
  schema/{pagespec.schema.json,example.pagespec.json,semantic_validate.py,tests/adversarial_test.py}
  extraction/{measured-values.json,verify_all.py}
```

## Verify it

```bash
python3 extraction/verify_all.py          # 11 drift-proofed checks
python3 schema/tests/adversarial_test.py  # 20 controls + 27 mutations
python3 schema/semantic_validate.py       # the bundled example
```

Requires Python 3.9+ and `jsonschema`. All three run from a standalone copy of this
folder with no sibling files present; the citation check degrades to a warning there
rather than failing.

---

## The facts this repo is built on

### There is no scroll-reveal system

`ScrollTrigger.getAll()` on the original returns an empty array, and a computed-style
census of every node finds zero elements with `animation-name != none`. Elements
sitting at `opacity: 0` are inactive carousel slides, not pending reveals. An earlier
version of the clone invented a fade-up system and it was removed.

The motion layer is closed to this reality: `pattern` is a 15-value enum containing no
`scroll-reveal`, `fade-up`, `parallax` or `scroll-progress-scrub`, the motion object is
`additionalProperties: false`, and a node whose motion contradicts its own section
contract is rejected. The real measured motion is two IntersectionObservers (lazy video
at `rootMargin: 200px`, and a customer-slider gate), one marquee (a 2231px track at
24.0 px/s → 92.96s), nav hover and panel height, the flow tab dwell and typewriter, a
quote rotator, CSS sticky stacks, and a drag-driven slider.

### Site chrome is not a page node

`Navbar` and `Footer` render once outside `<Routes>`, with every page a child of
`<main>`. A rule saying "the navbar must be the first node" would be wrong for every
template here, so `CHROME_IS_NOT_A_PAGE_NODE` rejects them as nodes instead. The two
chrome contracts exist and are the only sections deliberately used by no template —
`verify_all.py` asserts that exact set rather than allowing orphans generally.

### Most routes render a captured plate, not a live template

72 of the 103 route declarations are served by `CapturedPage`: each band is a raster of
the original's artwork taken with its copy hidden, with the copy, videos and sticky
layers rendered as live DOM at their measured rects. Captured routes are declared first
in `App.jsx` and win react-router's stable ranking, so seven fully-built page shapes —
pricing, about, careers, contact, the customers index, the changelog index and the FAQ
page — are currently unreachable. (The blog index is not among them: `/blog` itself is
captured, but `/blog-tag/:tag` still reaches it.) They are kept with
`status: "shadowed-by-capture"`, not deleted: they are the shapes a regenerated page in
those families must use, and each captured route records its own `generativeTemplate`.

A plate cannot be generated from a content contract. `captured.*` sections exist so a
validator can describe captured pages, not so anything can author new ones, and
`CAPTURED_SECTIONS_ARE_TEMPLATE_BOUND` keeps them on `page.captured-plate` only.

### Photography of identifiable people — an open decision

The original's `/about` and `/careers` carry a wall of real, named employees with real
bios; customer stories carry a quoted individual's headshot and a photo carousel. The
clone deliberately did not download the headshot grid, the customer-story card
photography, the event photography or the quoted individual's headshot. The capture
pass substitutes flat neutral tiles of the same box and radius inside team, grid,
headshot and people containers, which is what cleared `/about` — but `/careers` has not
been re-captured and still shows empty cells.

**Whether to reproduce roughly thirty named individuals' faces and bios is an open
product and privacy decision, deliberately left for a human.** This repo does not
decide it in either direction. It records the situation on the `person.photo` asset
role and on `sections/about__team-grid.json`, and it makes
`placeholder.neutral-tile` the required default. A generator must not fabricate,
reproduce or imitate a real person's likeness, name or bio.

### Copy

Short interface and marketing copy on the original (headings, buttons, eyebrows) is the
original's own. Customer testimonials, attributed performance claims and long-form
editorial — 37 customer stories, the blog, the changelog, terms, `/faq`, `/press` — are
placeholder text at the original's exact character lengths in the clone. This repo
carries neither: section contracts record field lists and `maxWords` budgets derived
from the real data, and the bundled example is written fresh for the example.

### Fonts

The original sets **RoobertVF**, a commercially licensed variable face the foundry
licence does not permit self-hosting. **Figtree** substitutes via `font.sans`. Buying
the licence and swapping that one token restores exact type fidelity. Canela is in the
same position and is not on the critical path.

---

## How a generator uses this

1. Pick a template from `templates/templates.json`. Use `templates/routes.json` to see
   which real routes it serves, and — for a captured route — which template a live
   rebuild should use (`generativeTemplate`).
2. Compose `nodes[]` from that template's own node list, in its order. Required nodes
   are required; only nodes marked `repeatable` may appear more than once.
3. Fill each node's `content` against that section's contract. Every text field carries
   a `maxWords` budget measured off the real data; every media field is an object with
   an `assetRole` from the closed enum, never a bare string.
4. Reference tokens through `tokens/llm/token-catalog.json`, never a raw hex or px.
   There is no per-instance token-override field in the PageSpec — styling belongs to
   the section and component contracts, and `tokens/llm/token-policy.json` says so
   explicitly rather than implying a mechanism that was never built.
5. Validate: schema, then `semantic_validate.py`.

## What the validator enforces that the schema cannot

`schema/semantic_validate.py` and `compatibility/graph.json` are two authoritative
sources for one set of facts, so `verify_all.py` fails the run if a rule id, the
`ONE_HERO_PER_PAGE` exception set or the `CTA_BAND_SHOULD_BE_LAST` exception set
diverges between them.

| rule | severity |
|---|---|
| `TEMPLATE_NODE_SEQUENCE_MATCH` — `nodes[]` cross-referenced against the declared `template` | error |
| `ONE_HERO_PER_PAGE` (exempting three genuinely hero-less templates) | error |
| `HERO_MUST_BE_FIRST` | error |
| `CHROME_IS_NOT_A_PAGE_NODE` | error |
| `NO_SCROLL_REVEAL` — including motion that contradicts a section's measured contract | error |
| `REDUCED_MOTION_FALLBACK_REQUIRED` | error |
| `ONE_PER_PAGE_RESPECTED` — keyed on `(section, variant)` | error |
| `HOME_ONLY_SECTIONS` · `ROUTE_ONLY_SECTIONS` | error |
| `CAPTURED_SECTIONS_ARE_TEMPLATE_BOUND` | error |
| `MEDIA_MUST_DECLARE_ASSET_ROLE` | error |
| `MAX_WORDS_EXCEEDED` (per instance, not just the bundled example) | error |
| `CTA_BAND_SHOULD_BE_LAST` (exempting `page.pricing`, which really closes on its FAQ) | warn |
| `NO_ADJACENT_SAME_CATEGORY` (24 recorded real adjacencies excepted) | warn |
| `MOTION_BUDGET` (exempting `page.home` and `page.captured-plate`) | warn |

Every exception above was read off the real template it describes at the moment the
rule was written, not assumed.

## Known gaps, flagged rather than fabricated

- **`/integrations`** — a ~32,000px searchable list the capture pass cannot carry. No
  template was invented for it; the route resolves to `page.product-generic`, which is
  what it falls back to, not what the original is.
- **Frozen motion inside plates** — widgets baked into a capture do not move. No
  section contract claims live interactivity for a plate-backed band.
- **The marquee cursor chip, the `/careers` name-marquee and the `/about` interactive
  timeline** — present on the original, not rebuilt, and recorded as static.
- **Feature-band buttons run ~28px narrow** — the trailing arrow track is missing;
  recorded as `button.knownGap` rather than silently normalised.

`extraction/measured-values.json` also lists four claims from the source project's own
notes that did **not** reproduce under spot-checking, with the evidence.
