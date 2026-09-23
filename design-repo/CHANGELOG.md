# Changelog

## 1.0.0 — 2026-09-23

First build. Extracted from the sibling Clay clone project; nothing was carried over
from a draft. Every count below was recomputed from disk by
`extraction/verify_all.py`, not written by hand.

### Built

- **Tokens — 15 files.** `00-foundation` (colour, typography, radius, spacing,
  breakpoint, motion, elevation, icon-size), `10-semantic`, `20-component`,
  `30-layout`, `themes/light.json`, and the `llm/` curated layer
  (`component-allowlist.json`, `token-catalog.json`, `token-policy.json`). Every value
  cites a real line range in `tailwind.config.js`, `src/index.css`, `CLONE_SPEC.md`,
  `CLONE_SPEC_2.md`, `HANDOFF.md` or component JSX. 186 citation ranges, all validated
  in-range at build time.
- **10 primitives, 13 components** — bottom-up from real JSX, each with props, tokens,
  a motion contract and a `reducedMotionFallback`.
- **67 sections** — one per distinct section type actually observed, each with a closed
  content contract (`additionalProperties: false`, `maxWords` on every text-bearing
  field), constraints, a measured motion contract and a structured responsive field.
- **19 templates** and a **1:1 map of all 103 route declarations** in `src/App.jsx`.
- **`compatibility/graph.json`** — 14 rules, each with `severity` and, where a template
  genuinely violates the general case, named exceptions read off the real file.
- **`schema/pagespec.schema.json`** (draft-07) with a closed `template` enum, a closed
  section enum, 67 per-section `if`/`then` content branches each supplying a complete
  closed schema, a closed `assetRole` enum and a motion object closed to the real
  measured fields.
- **`schema/semantic_validate.py`**, **`schema/tests/adversarial_test.py`** (20
  controls + 27 mutations), **`extraction/verify_all.py`** (11 checks),
  **`extraction/measured-values.json`**, **`assets/asset-roles.json`** (11 roles),
  **`registry.manifest.json`**.

### Decisions worth recording

- **Motion is closed to the measured reality.** The original has no scroll-reveal of
  any kind. `pattern` is a 15-value enum with no reveal, fade-up, parallax or
  scroll-scrub value; the motion object is `additionalProperties: false`; and a node
  whose motion contradicts its own section contract is an error, not a warning.
- **`chrome.navbar` / `chrome.footer` are not page nodes.** Checked against
  `src/App.jsx` while the rule was being written: both render once outside `<Routes>`.
  A "navbar must be first" rule would have been wrong for all 19 templates. They are
  the only two sections used by no template, and `verify_all.py` asserts that exact
  set rather than tolerating orphans in general.
- **`ONE_HERO_PER_PAGE` exempts three templates** (`page.not-found`, `page.contact`,
  `page.captured-plate`) that genuinely compose no hero-category node. The exception
  set is duplicated in the graph's prose and the validator's code, so `verify_all.py`
  fails if the two ever diverge — the same is done for
  `CTA_BAND_SHOULD_BE_LAST`'s single exception.
- **`CTA_BAND_SHOULD_BE_LAST` is `warn`, not `error`,** because `page.pricing` really
  does close on its FAQ and carries no CTA band. Verified against `Pricing.jsx` before
  the rule was written.
- **`NO_ADJACENT_SAME_CATEGORY` carries 24 named exceptions,** every one a real
  adjacency in a real template's node sequence. Two of them (`feature.sticky-chapters`
  → `feature.reps-band` on home, `content.blog-featured` → `content.blog-grid`) were
  found mid-build by running the rule against the synthesized controls and were fixed
  in the rule rather than in the content.
- **`assetRole` is a closed 11-value enum** wired through the schema, the allowlist and
  the example, with per-role `aiGuidance` (`may-generate-new` /`must-reuse-exact` /
  `must-not-fabricate`) and explicit licensing guidance. `verify_all.py` fails if any
  role lacks either.
- **`entryPoints` lists only files inside this package.** External evidence lives in
  `extraction/measured-values.json`, which warns and skips when no sibling source tree
  is present.
- **`allowlistVersion` is machine-checked; `repositoryVersion` and `pageSpecVersion`
  are not,** and `registry.manifest.json`'s `versionFieldNote` says so directly.
- **The PageSpec has no per-instance token-override field.** Styling belongs to the
  section and component contracts. `token-policy.json.overrides` records that plainly
  instead of inventing a field just to have something to validate.

### Spot-check findings against the source project

Recorded rather than forced to agree:

- **"68 routes, 12 templates" does not reproduce.** `src/App.jsx` declares 95 concrete
  paths, 6 dynamic patterns, 1 catch-all and 1 redirect — 103 declarations resolving to
  19 page shapes. The figures predate the scroll-capture pass.
- **"67 captured pages" does not reproduce** — 72 capture files exist today. The 67/67
  height verification was accurate when written; five captures were added after.
- **The handoff route table is only partly accurate.** Captured routes are declared
  first and win react-router's stable ranking, so 72 paths — including `/pricing`,
  `/about`, `/careers`, `/contact`, `/customers`, `/blog`, `/changelog`, `/faq`, all 11
  use-case slugs, all 5 solution routes and 3 product routes — render `CapturedPage`,
  not the components named there. Eight page shapes are consequently unreachable and
  are recorded as `shadowed-by-capture`.
- **The project `README.md` is stale** — it describes a `hooks/useReveal.js` reveal
  system and per-element scroll stagger that do not exist (`src/hooks/` holds
  `useVideoAutoplay.js` and `useTypewriter.js`), and an asset count superseded by the
  handoff. Its token table, by contrast, reproduces exactly.

### Gaps flagged, not fabricated

`/integrations` (a ~32,000px searchable list a capture cannot carry) has no invented
template. Frozen widget motion inside captured plates, the marquee cursor chip, the
`/careers` name-marquee, the `/about` interactive timeline and the ~28px-narrow
feature-band button are each recorded where they belong instead of being normalised
away. The `/about` and `/careers` employee-photography question is surfaced as an open
product decision and is not resolved here.

### Verification run

- Draft-07 schema validation of `example.pagespec.json` — 0 errors.
- Adversarial suite — 20 controls clean (19 synthesized templates + the unmutated
  example), 27 mutations all rejected.
- Self-containment — the whole folder copied to an isolated temp directory with no
  siblings; `verify_all.py` and the adversarial suite both pass there.
- Allowlist-parity and citation-range checks each proven to catch drift by injecting a
  phantom entry and an out-of-range citation into a scratch copy.
- `design-repo.zip` packaged with the CLI `zip` tool: 0 `__MACOSX` / `.DS_Store`
  entries, built last, and gitignored.
