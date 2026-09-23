# Information architecture — Clay clone

`ia.json` is the only hand-edited file here. `IA.md` and `matrix.csv` are
generated from it — never hand-edit them, they'll be overwritten. Re-run after
any route/section change:

```bash
node validate.mjs && node build.mjs
```

## What the data actually shows

**95 real routes across 16 templates**, not the 68-routes/12-templates figure
in `HANDOFF.md`/`PROCESS.md`. Both numbers come from real counting, just of
different things: those docs count distinct *page shapes as originally
designed*; this IA counts every literal path `src/App.jsx` serves, derived
directly from `data/products.js` (14), `data/usecases.js` (11 use-cases + 5
solutions), `data/customers.js`'s captured equivalent (31 real customer-story
JSON files, not the 10 in `STORIES`), `data/simple.js` (21), plus Home and
`/privacy`, then de-duplicated against the actual 72 files in
`src/data/art/pages/`.

**A significant discovery made while building this IA, confirmed live (not
just read from source):** several purpose-built page components —
`About.jsx`, `Careers.jsx`, `Contact.jsx`, `Pricing.jsx`, `Simple.jsx`'s
`Changelog`/`FaqPage`, and one `Legal` instance (`/terms-of-service`) — are
still registered in `App.jsx` but are **unreachable at runtime**. `App.jsx`
registers every `CAPTURED_KEYS` route (the scroll-captured pages) *before*
these dedicated routes, and each of those paths also has a matching file in
`src/data/art/pages/`, so `CapturedPage` wins the match every time. Verified
against the live dev server: `/about`, `/pricing`, etc. all set
`document.title` from captured JSON and (for `/pricing`) render zero
`<table>` elements, where the dedicated components would behave differently.
`/privacy` is the one Legal-style route confirmed still live (its title stays
the default `index.html` title). This is worth a maintainer's attention —
either those components are genuinely dead code to remove, or the intent was
for them to still be reachable and the route order is a bug.

**72 of the 95 routes (76%) are one generic template family** —
`CapturedPage.jsx` rendering a per-route JSON file from the scroll-then-capture
pass. Content-wise they split into 12 distinct page shapes (product,
use-case, solution, customer story, customer index, company, content index,
FAQ index, resource, two single-route "sticky-panel splice" variants, and
pricing/legal), but they all share one section id, `captured.page-body`,
because the real band sequence is data-defined per route rather than a fixed
component shape — see `ia.json`'s `sections.captured.page-body.description`
for why that's one section id, not twelve.

**7 shared sections, 16 page-local.** `shell.navbar` and `shell.footer` are
the only sections on all (or nearly all) 95 routes. Every other section is
either `captured.page-body` (72 routes, one generic family) or specific to a
single template — the home page in particular has 8 sections used nowhere
else (`hero.home`, `proof.logo-marquee`, `content.flow-steps`,
`interactive.prompt-builder`, `content.feature-chapters`,
`content.reps-visual`, `proof.customer-story-player`, `content.updates-grid`),
confirming it's a genuinely bespoke page, not a template instance.

**Two sections apply to exactly one route inside an otherwise-uniform
template**, and were split into their own single-route templates
(`template.solution-sticky` for `/enterprise`, `template.resource-sticky` for
`/partners/solutions`, `template.faq-index` for `/faq`) rather than
overclaiming the section's presence across their 5-9-route sibling templates.
Each corresponds to a real `src/data/art/pages-x/*.sf.json` or `*.faq.json`
file — HANDOFF.md's own "interactive replacements" note.

## Known ambiguity, left as-is

`data/customers.js` exports a `STORIES`/`STORY_LIST` map with only 10 entries,
separate from the 31 real captured customer-story files. The 10-entry map
still feeds `pages/Customers.jsx`'s `CustomerStory` component, which is itself
shadowed by the captured routes for any slug both define — the same
shadowing pattern as the company pages, just one level removed. Not fixed
here since it's app-source behavior, not an IA-authoring error; flagged in
`ia.json`'s `template.customer-story` note.
