Source: https://www.clay.com/?ref=saaspo.com

# Clay.com homepage — build spec, pass 2

Companion to `CLONE_SPEC.md` (pass 1). Pass 1 owns global foundations, nav, banner, hero,
§5 features sticky stack, the container rule (`width:95%; max-width:1280px`), the breakpoints
(991 / 767 / 479) and the global motion census. **This file does not repeat any of that.**
It fills in the exact internal geometry of the sections pass 1 treated thinly:
§2 logo marquee, §3 flow tabs, §4 prompt, §6 reps, §7 customer slider, §8 updates, §9 footer.

All numbers were read with `getComputedStyle` / `getBoundingClientRect` at **viewport 1280×900**
unless the heading says otherwise. `y` values are **absolute document y** (page top = 0), matching
the section table in pass 1. Sub-pixel values are reported as measured — round to 2dp in the build.

Motion in these sections is **JS-driven** (GSAP-style inline styles). Computed `transition`
on the animated elements is literally `all 0s ease 0s`, so durations below were derived by
time-sampling the live page, not read from CSS. Where that's the case it is stated.

---

## A. §2 — Logo / social-proof marquee (y 844 – 1352, h 508)

### A.1 Outer boxes

| element | box (x, y, w, h) | key style |
|---|---|---|
| `section.section_home-logo` | 0, 844, 1280, 508 | `position:relative; padding:0 0 64px` |
| `.container-regular` | 32, 844, 1216, 444 | `margin:0 32px` (the 95%/1280 rule) |
| `.home-logo_content` | 32, 844, 1216, 444 | `display:flex; flex-direction:column; justify-content:space-between; gap:32px;`<br>`padding:48px 0; margin-top:-228px; background:rgb(244,243,240); border-radius:48px` |
| `.home-logo_intro` | 280, 892, 720, 52 | `margin:0 248px` (720px fixed text column, centred) |
| `.home-logo_wrap` | 32, 976, 1216, 264 | `position:relative; display:flex` |
| `.home-logo_wrap > div` (viewport) | 32, 976, 1216, 264 | `position:relative; overflow:hidden` — this is the clip box |
| `.frame_shadow` | 0, 1224, 1280, 64 | `position:absolute; top:380px; box-shadow: rgb(255,255,255) 0 20px 64px 24px` (white glow that hides the marquee bottom edge) |

**The `-228px` margin is the load-bearing bit**: the oat card is pulled up 228px so its top
(y 844) overlaps the hero, whose flow bottom is 1072. Do not reproduce this with absolute
positioning — the negative margin is what collapses the section box to h 508.

### A.2 Intro line

`.home-logo_intro > .text-size-medium.u-text-balance`
20px / 26px, weight 400, `color:rgb(0,0,0)`, `text-align:center`, no max-width (the 720px
comes from the parent margins). Two rendered lines, block height 52px.

Text (exact, with two inline links):
> Trusted by more than 500,000 leading GTM teams of all sizes. Inspired by our
> **[customers](/customers)**. Built with **love** *(second link, `.span-link`)*.

Both links are `a.span-link > span.text-weight-bold` → 20px / 26px, weight **600**.
Measured link boxes: "customers" 97.5×24 @ x 642.3; "love" 37.4×24 @ x 838.3.

### A.3 The track

- The clip box is 1216×264. Inside it are **3 identical copies** of `.home-logo_base`.
- `.home-logo_base`: `position:absolute; left:0; top:0; display:grid; padding:0 0 0 12px;`
  **width 2231px**, height 264px.
- `grid-template-rows: 80px 80px 80px` + `gap: 12px` → **row pitch 92px, 3 rows, all 3 visible**
  (3×80 + 2×12 = 264). There is **no per-row offset/stagger** — the "staggered" look comes
  entirely from cards spanning 1 or 2 rows and 1–4 columns (see A.5).
- `grid-template-columns` — **15 tracks**, measured:
  `139.766px 96.2344px 193.625px 91.7656px 157.234px 136px 147.328px 132.438px 76.3125px 76.3125px 160.797px 160.797px 160.797px 160.797px 160.797px`
  Sum 2051.00 + 14×12 gap (168) + 12 left padding = **2231px** exactly.
- The three copies are transformed to `translateX(X)`, `translateX(X + 2231)`, `translateX(X + 4462)`.

### A.4 Marquee motion (sampled, not CSS)

- Continuous leftward scroll at **24.0 px/s** (measured −903.56px over 37.65s, i.e. exactly 24).
- `X` decreases and wraps at −2231 → loop period **2231 / 24 = 92.96 s**.
- Linear — no easing, no pause, no hover-pause observed.
- Equivalent CSS implementation: one 2231px track ×2–3 copies,
  `animation: marquee 92.96s linear infinite; @keyframes { to { transform: translateX(-2231px) } }`.

### A.5 Card grid map (order = DOM order, left→right by column)

Cards are `.logo-card`. Variants (all share `padding:16px 20px; border-radius:18px;
background:rgb(254,253,251); border-top:1px solid #fff; border-bottom:1px solid rgba(123,121,116,.15);
gap:16px`):

| variant class suffix | flex | height | contents |
|---|---|---|---|
| `w-variant-cb86a75a-…` | column, center/center | 80px | logo only |
| `w-variant-648b1c58-…` | row, space-between/center | 80px | logo + quote inline |
| `w-variant-26e0998e-…` | row, space-between/center | 80px | logo + stat inline |
| `w-variant-02c1b250-…` | column, space-between/flex-start, `min-width:8.5rem` | 172px | logo + stat stacked |
| *(no variant — base `.logo-card`)* | column, space-between/flex-start | 172px | logo + quote stacked |

172px = 2 rows (2×80 + 12).

| # | logo (svg file) | grid-column | grid-row | card w×h | rendered img w×h (natural) | extra |
|---|---|---|---|---|---|---|
| 0 | stripe | 1 / span 1 | 1 / span 1 | 139.77×80 | 75.55×32 (85×36) | — |
| 1 | openai | 1 / span 2 | 2 / span 2 | 248×172 | 116.27×32 (109×30) | quote |
| 2 | snapchat | 2 / span 1 | 1 / span 1 | 96.23×80 | 32×32 (800×800) | — |
| 3 | figma | 3 / span 3 | 1 / span 1 | 466.62×80 | 82.63×32 (93×36) | quote inline (328px wide) |
| 4 | cursor | 3 / span 1 | 2 / span 1 | 193.63×80 | 128.88×32 (145×36) | — |
| 5 | intercom | 3 / span 3 | 3 / span 1 | 466.62×80 | 140.44×32 (158×36) | stat **+140% / outbound pipeline** |
| 6 | ups | 4 / span 1 | 2 / span 1 | 91.77×80 | 26.97×32 (52×62) | — |
| 7 | hubspot | 5 / span 1 | 2 / span 1 | 157.23×80 | 92.44×32 (104×36) | — |
| 8 | vanta | 6 / span 1 | 1 / span 2 | 136×172 | 90.45×36 (98×39) | stat **80%+ / enrichment coverage** (column) |
| 9 | canva | 6 / span 1 | 3 / span 1 | 136×80 | 83.55×32 (94×36) | — |
| 10 | perplexity | 7 / span 1 | 1 / span 1 | 147.33×80 | 107.33×24 (161×36) | — |
| 11 | anthropic | 7 / span 2 | 2 / span 2 | 291.77×172 | 137.41×16 (146×17) | title block + quote |
| 12 | notion | 8 / span 1 | 1 / span 1 | 132.44×80 | 92.44×32 (104×36) | — |
| 13 | google | 9 / span 4 | 1 / span 1 | 510.22×80 | 102.22×32 (115×36) | quote inline (352px) |
| 14 | rippling | 9 / span 3 | 2 / span 1 | 337.42×80 | 120.88×32 (136×36) | stat **2x / demos from cold email** |
| 15 | okta | 11 / span 1 | 3 / span 1 | 160.80×80 | 97.77×32 (110×36) | — |
| 16 | verkada | 12 / span 2 | 2 / span 1 | 333.59×80 | 114.66×32 (129×36) | stat **3x / reply rate** |
| 17 | workday | 13 / span 1 | 1 / span 1 | 160.80×80 | 67.06×32 (109×52) | — |
| 18 | uber | 9 / span 2 | 3 / span 1 | 164.63×80 | 66.66×32 (75×36) | — |
| 19 | elevenlabs | 12 / span 2 | 3 / span 1 | 333.59×80 | 121.77×32 (137×36) | stat **+50% / SQLs** |
| 20 | ebay | 14 / span 1 | auto / span 1 | 160.80×80 | 79.84×32 (1000×401) | — |
| 21 | ramp | 14 / span 2 | 1 / span 2 | 333.59×172 | 105.92×28.8 (103×28) | quote |
| 22 | siemens | 15 / span 1 | 3 / span 1 | 160.80×80 | 108.44×32 (122×36) | — |

Asset base for all of the above: `https://cdn.prod.website-files.com/61477f2c24a826836f969afe/`
(same CDN prefix documented in pass 1 §12). Exact filenames:
`6a0ccb555445092a87f2709e_stripe.svg`, `6a0ccb0c2bf53107f21d44c7_openai.svg`,
`6a70e3dfddc4fecd0ba9ddb5_snapchat-logo-svgrepo-com.svg`, `6a0de741bbaa090adc89091a_figma.svg`,
`6a0ccbb286520a4c0e24960d_cursor.svg`, `6a0df1791215a474231062b4_intercom.svg`,
`6a70c5b9c6fbdb1c03fe2e84_ups logo.svg`, `6a0df040091092333801bccc_hubspot.svg`,
`6a0de6e1e1dac677646e8b46_vanta.svg`, `6a0de6610ad9f1586b27b2a7_Canva.svg`,
`6a0df205f982e4d9bdc0e6e3_Perplexity.svg`, `6a0de7adeebce78e9afbcd29_anthropic.svg`,
`6a0df09c2211b0094722ac24_Notion.svg`, `6a0df119144736bb9e7310b2_google.svg`,
`6a0df0d97c25defd00b0fa06_rippling.svg`, `6a0df14a9b0484a8e77799d4_okta.svg`,
`6a0df080f837402bbf30791b_verkada.svg`, `6a0de774f8c55d6f2dd0864f_workday.svg`,
`6a0df15ead79765c58028f4c_uber.svg`, `6a0df1b2385b73a20f7b534d_elevenlabs.svg`,
`6a70c50ca05f5a7f864e4bed_EBay_logo.svg`, `6a0df12ff09e285248c8b732_ramp.svg`,
`6a7c9d3e8418f14e6c0a1953_…_Siemens-logo.svg`.

Logo images sit in `.home-logo_height` (a fixed-height box, 32px in most cards; 36px vanta,
28.8px ramp, 25px perplexity, 24px anthropic) with `img{object-fit:cover}` and auto width.

### A.6 Card internals

- **Quote** `.home-logo_quote`: `display:flex; flex-direction:column; gap:5.6px`.
  `p.text-size-small.cc-logo` → **12px / 15.6px, weight 400, rgb(0,0,0)**.
  Quote column widths measured: 208px (openai), 328px (figma), 224px (anthropic), 352px (google),
  293.6px (ramp).
- **Title block** (anthropic only) `.home-logo_title`: `flex-column; gap:3.2px; margin-bottom:4.8px`,
  two lines — "All inbound" at 20px/26px w500, and "qualified and scored with Clay" at
  **9.6px / 9.6px, weight 500, uppercase**.
- **Stat** `.home-logo_stat`: row variant → `flex-direction:row; gap:8px; align-items:center`;
  column variant (vanta) → `flex-direction:column; gap:0; align-items:flex-start`.
  - number `.text-size-medium.cc-logo-stat` → **23.2px / 30.16px, weight 500, rgb(0,0,0)**
  - caption `.text-all-caps` inner → **9.6px / 11.04px, weight 500, uppercase, rgb(0,0,0)**,
    wraps to 2 lines (measured caption boxes 53.08×22.06, 61.03×19.19, 63.05×22.06, 27.5×22.06,
    23.94×11.03).
- **Link affordance** (only on cards that are links): `.clickable_wrap > a.clickable_link`
  absolutely fills the card inset 1px (e.g. 248×170 inside a 248×172 card), `border-radius:18px`.
- **Arrow** `.home-logo_arrow`: 12.8×12.8, `position:absolute; top:8px; right:8.8px`,
  `color:rgb(123,121,116)`. Two stacked SVGs, the second pre-offset
  `translate(-12.8px, 12.8px)` — the standard diagonal hover-swap used elsewhere on the page.

### A.7 Edge fade masks

Not CSS masks — two absolutely-positioned gradient divs, `z-index:5; pointer-events:none;
width:20%` of the clip box:

| element | box | background |
|---|---|---|
| `.home-logo_shade` (left) | 32, 976, **243.19**, 264 — `inset:0 auto 0 0` | `linear-gradient(270deg, rgba(244,243,240,0), rgb(244,243,240))` |
| `.home-logo_shade.cc-right` | 1004.81, 976, **243.19**, 264 — `inset:0 0 0 auto` | `linear-gradient(270deg, rgb(244,243,240), rgba(244,243,240,0))` |

243.19 = 20% of 1216. At ≤991 the rule becomes `width:15%`.

### A.8 "Callout / quote block beneath it" — clarification

There is **no separate quote block below the marquee**. The social-proof copy is (a) the
720px intro line above the track and (b) the per-card quotes/stats inside the track. The
content card ends at y 1288; the remaining 64px to y 1352 is the section's bottom padding,
visually covered by `.frame_shadow`'s white glow.

One extra, easy-to-miss element: `.logo_cursor` — a `position:fixed; z-index:100;
transform:scale(.8)` fake cursor chip (`.logo_user` 95.5×41, `background:rgb(244,243,240);
border-radius:16px; padding-right:17.6px; gap:12.8px`, with a 41×41 `border-radius:16px` avatar
and a two-line label at 14px/18.2px w500 + w400). It is parked at 14,15 with a placeholder
avatar and 0.8×0.8 host box — effectively invisible on load. Treat as optional.

### A.9 §2 responsive deltas

| | ≤991 | ≤767 | ≤479 |
|---|---|---|---|
| section box | 0, 688, 991, 476 | 0, 614, 767, 444 | 0, 592, 479, 462.2 |
| container | 941.44 wide, margin 24.78 | 728.64 wide, margin 19.17 | 455.05 wide, margin 11.97 |
| `.home-logo_content` | `padding:40px 0; margin-top:-48px; radius:40px` | `padding:28px 0; margin-top:-90px; radius:28px` | `padding:28px 0; margin-top:-48px; radius:28px` |
| intro margin / font | `0 110.72px` / 20px | `0 4.31px` / 20px | `0` (full width, 3 lines, h 70.2) / **18px** |
| track width | **2061px** (cols 3,5,9,10,11-15 shrink) | **2162px** | **2162px** |
| `gap` | 12px (unchanged) | 12px | 12px |
| rows | 80/80/80 (unchanged, 3 rows) | same | same |
| `.logo-card` gap | **14px** (was 16) | 14px | 14px |
| shade width | 15% → **141.20px** | 15% → **109.28px** | 15% → **68.25px** |

Column tracks @≤991: `139.766 96.2344 118.109 91.0938 118.094 136 147.328 132.438 78.9688 78.9844 148.797×5`.
Column tracks @≤767 and ≤479 (identical): `139.766 96.2344 192.797 91.0938 156.562 136 147.328 132.438 96.9219 96.9219 139.188×5`.

---

## B. §3 — Flow / use-case tabs (y 1352 – 2343, h 991)

### B.1 Frame

- `section.section_home-flow`: 0, 1352, 1280, 991.4; `padding:64px 0; position:relative`.
- Hairlines: `.frame_line` at y 1352 and `.frame_line.cc-bottom` at y 2342.4 —
  1280×1px, `background:rgb(244,243,240)`, each with two 80×1 `.frame_gradient` caps at x 0 and x 1200.
- `.container-regular`: 32, 1416, 1216, 863.4.
- `.u-stack-md` (title + caption + tabs): 32, 1416, 1216, 296; `flex-column; gap:24px`.

### B.2 Heading

`.home-flow_title` 320, 1416, 640, 144 (`margin:0 288px`; `flex-column; align-items:center; gap:12.8px`).
`h2.heading-style-h2.u-text-balance` → **72px / 72px, weight 500, letter-spacing −2.16px,
rgb(0,0,0)**, two lines. Text: "GTM engineers build on Clay".

### B.3 Caption block (the rotating sub-line)

- `.home-flow_stack` (grid): 32, 1584, 1216, 128 — `grid-template-columns:1216px;
  grid-template-rows: 52px 44px; gap:32px`. Row 1 = caption, row 2 = tab strip.
- `.home-flow_text`: **368, 1584, 544, 52** — a 1-cell grid (`544px` / `52px`), `position:relative`.
  All 7 captions occupy that single cell and stack.
- Each `.home-uses_text.cc-N`: `display:flex; justify-content:center; align-items:center;
  margin-inline:auto`; `p.text-size-medium.u-text-center` → **20px / 26px, weight 400,
  text-align:center, rgb(0,0,0)**.
- Per-caption `max-width` (this is what makes each line break differently):
  cc-1 **480px** (30rem), cc-2 **400px** (25rem), cc-3 **544px** (34rem), cc-4 **496px** (31rem),
  cc-5 **480px** (30rem), cc-6 **512px** (32rem), cc-7 **448px** (28rem).
- Active caption: `opacity:1; transform:scale(1)`. Inactive: `opacity:0; transform:scale(0.98)`.

Caption text, index-matched to the tabs:

| # | caption |
|---|---|
| 1 | Find every account in your TAM in one place. |
| 2 | Enrich, score, and route every lead to the right rep in minutes. |
| 3 | Prioritize the highest-converting leads using real-time intent and engagement signals. |
| 4 | Personalize outreach with live intent signals to reach the right buyer at the right time. |
| 5 | Keep CRM records accurate, complete, and continuously refreshed with live data. |
| 6 | Turn top accounts from your CRM into precision ad campaigns on LinkedIn and Meta. |
| 7 | Automate research, prep, and follow-ups to let reps spend time closing. |

### B.4 Tab strip geometry

- `.home-flow_tab-wrap`: **81, 1668, 1118, 44**, `overflow:hidden; position:relative`.
  (1216 − 1118 = 98 → 49px inset each side of the container.)
- Inside it, one track `div` 5587.34 wide containing **5 identical `.home-flow_tab-list` copies**,
  each `1117.47 × 44`, `display:flex; align-items:center; gap:8px; padding:0 8px 0 0`.
  (7 pill widths 1032.47 + 6×8 gap + 8 right pad = 1117.47.)
- The **7 tab labels, in order**, with measured pill widths (all `height:44px;
  padding:10px 16px; border-radius:12px; font 16px/24px weight 500; color rgb(27,26,24);
  idle background rgb(244,243,240)`):

| i | label | width | x-offset in list | pill centre |
|---|---|---|---|---|
| 0 | TAM Sourcing | 133.66 | 0 | 66.83 |
| 1 | Automated Inbound | 179.38 | 141.66 | 231.35 |
| 2 | Lead Scoring | 128.17 | 329.04 | 393.13 |
| 3 | Automated Outbound | 193.80 | 465.21 | 562.11 |
| 4 | CRM Enrichment | 156.23 | 667.01 | 745.13 |
| 5 | Launch Ads | 117.28 | 831.24 | 889.88 |
| 6 | Rep Productivity | 152.95 | 956.52 | 1032.99 |

- **translateX rule** (verified against all 7 measured values):
  `translateX = 1676.21 − centre(i)` px, i.e. the active pill (in track copy #2, the 0-based
  index-1 copy) is centred in the 1118px window.

  | i | measured translateX |
  |---|---|
  | 0 | 1609.38 |
  | 1 | 1444.86 |
  | 2 | 1283.09 |
  | 3 | 1114.10 |
  | 4 | 931.09 |
  | 5 | 786.33 |
  | 6 | 643.21 |

- **Active-pill colours** (`.tab-btn.cc-active` sets `background-color` to the tab's theme
  `button-dark` token; text colour never changes):

  | i | class | active background |
  |---|---|---|
  | 0 | `.tab-btn` (slushie) | `rgb(170,235,253)` |
  | 1 | `.cc-lime` | `rgb(238,247,115)` |
  | 2 | `.cc-ube` | `rgb(200,187,251)` |
  | 3 | `.cc-tangerine` | `rgb(252,201,171)` |
  | 4 | `.cc-blueberry` | `rgb(190,223,254)` |
  | 5 | `.cc-pomegranate` | `rgb(252,186,190)` |
  | 6 | `.cc-dragnfruit` | `rgb(248,185,228)` |

- Edge fades over the strip: `.home-flow_shade` / `.home-flow_shade.cc-right`,
  `z-index:10; pointer-events:none; width:25%` → **279.5 × 44**, at x 81 and x 919.5.
  Left: `linear-gradient(270deg, rgba(255,255,255,0), rgb(255,255,255))`;
  right: `linear-gradient(270deg, rgb(255,255,255), rgba(255,255,255,0))`.

### B.5 Card stage

- `.home-flow_base`: 32, 1712, 1216, 567.39 — `flex-column; gap:32px`.
- `.home-flow_tab-base`: 32, 1712, 1216, 567.39 — `flex-column; justify-content:flex-end;
  align-items:center; position:relative`.
- `.home-flow_bkg-list`: 32, 1712, 1216, 567.39 — `display:grid;
  grid-template-columns:1216px; grid-template-rows:567.391px; gap:80px; border-radius:48px;
  overflow:visible`. **All 7 `.home-flow_card` children live in this one cell** and crossfade
  by opacity (active 1, others 0). `position:relative`, no transform.

Per card:

| layer | box | notes |
|---|---|---|
| `.home-flow_tab-bkg` | 32, **1887.23**, 1216, 392.16 | `position:absolute; top:175.234px; border-radius:32px`, solid tab colour |
| `.textures` | 30, 1885.23, 1220, 396.16 | `position:absolute; margin:-2px`; children `.texture-noise`, `.texture-fingers.cc-under`, `.texture-fingers` |
| `.home-uses_spacer` | 32, ~1712–1736, 1216, 543.14–567.39 | 1-cell grid; holds the screenshot layers |
| `.home-uses_clip` | 32, 1736.25, 1216, 543.14 | `overflow:hidden` — clips the base screenshot |
| `.home-uses_fade` | 32, ~2034.9, 1216, 244.4–255.3 | `position:absolute; top:298.73px` (312.08px on the dragonfruit card) |
| `.home-uses_shade` (×2) | fills the fade | 1st: `linear-gradient(rgba(255,255,255,0), <card colour>)`; 2nd `.cc-white`: `linear-gradient(rgba(255,255,255,0), rgb(255,255,255))`; both `border-radius:0 0 30px 30px` |

Card background colours (`.home-flow_tab-bkg`), in tab order:
`rgb(59,211,253)` · `rgb(203,216,16)` · `rgb(161,123,249)` · `rgb(255,119,20)` ·
`rgb(190,223,254)` *(`.cc-200` modifier)* · `rgb(251,68,80)` · `rgb(255,112,210)`.
The matching `.home-uses_shade` gradient endpoint is the same colour **except** the blueberry
card, which fades to `rgb(66,158,255)`.

### B.6 Per-tab screenshot mapping

Every card has one base screenshot `img.home-flow_ui-bkg.cc-b` (1216 × 543.14, inside
`.home-uses_clip`, static flow), plus 0–2 floating layers positioned by margins.
All from the website-files CDN, `object-fit:cover`.

| tab | layer | file | natural | box (x, y, w, h) | offset |
|---|---|---|---|---|---|
| 0 TAM Sourcing | cc-a | `6a1797e881c7e667e295352b_case-2-p-1600.png` | 1280×572 | 32, 1736, 1216, 543.39 | `position:absolute; left:0` |
| | cc-b | `6a1797e6d3521b590356310e_case-1-p-1600.avif` | 1280×572 | 32, 1736, 1216, 543.39 | static |
| 1 Automated Inbound | cc-i | `6a179faff90f119220577af5_case-13-p-1600.avif` | 1280×572 | 68, 1776, 1216, 543.39 | `absolute; left:36px; margin:0 -36px -16px 0` |
| | cc-h | `6a179fafd3521b5903574d32_case-12-p-1600.png` | 1280×572 | −4, 1728, 1216, 543.39 | `absolute; left:0; margin:0 0 32px -36px` |
| | cc-b | `6a179fb22da16e223f77e1ba_case-11.avif` | 3600×1608 | 32, 1760.25, 1216, 543.14 | static |
| 2 Lead Scoring | cc-d | `6a1797e66f7069ecbc07c7e9_case-7-p-1600.avif` | 1280×572 | 68, 1796, 1216, 543.39 | `absolute; left:36px; margin:0 -36px -60px 0` |
| | cc-c | `6a1797e6aa3f837f06d2ba87_case-6-p-1600.avif` | 1280×572 | −4, 1800, 1216, 543.39 | `absolute; left:0; margin:0 0 -64px -36px` |
| | cc-b | `6a1797eac527a0f357c5c344_case-5.avif` | 3600×1608 | 32, 1736.25, 1216, 543.14 | static |
| 3 Automated Outbound | cc-g | `6a17999dacf41661f8506ba0_case-10-p-1600.png` | 1280×572 | 68, 1744, 1216, 543.39 | `absolute; left:36px; margin:0 -36px -8px 0` |
| | cc-f | `6a17999dacf41661f8506bb7_case-9-p-1600.avif` | 1280×572 | −4, 1819.44, 1216, 543.39 | `absolute; left:0; margin:83.2px 0 -83.2px -36px` |
| | cc-b | `6a17999e7db7a603d7ee0d66_case-8.avif` | 3600×1608 | 32, 1736.25, 1216, 543.14 | static |
| 4 CRM Enrichment | cc-e | `6a1797e635ca38900bfbb10a_case-4.avif` | 3600×1608 | −10.55, 1736.25, 1216, 543.14 | `absolute; left:-42.55px; margin-right:42.55px` |
| | cc-b | `6a18e5abd503d973ad198052_replace-crm.avif` | 3600×1608 | 32, 1736.25, 1216, 543.14 | static |
| 5 Launch Ads | cc-m | `6a17a25c2ff7f5b53dc40b65_case-23-p-1600.avif` | 1280×572 | 68, 1736, 1216, 543.39 | `relative; margin-right:-36px` |
| | cc-l | `6a17a25c1fdaacf23f129e06_case-22-p-1600.avif` | 1280×572 | −4, 1918.39, 1216, 543.39 | `relative; margin:0 0 -182.39px -36px` |
| | cc-b | `6a17a25f992e1d665e16ea68_case-21.avif` | 3600×1608 | 32, 1736.25, 1216, 543.14 | static |
| 6 Rep Productivity | cc-k | `6a17a0504d077d0205e53b81_case-16-p-1600.avif` | 1280×572 | 68, 1736, 1216, 543.39 | `relative; margin-right:-36px` |
| | cc-j | `6a17a050b4b2caf5acfde214_case-15-p-1600.avif` | 1280×572 | −4, 1712, 1216, 543.39 | `relative; margin:0 0 24px -36px` |
| | cc-b | `6a17a05226b22fa10e5df344_case-14.avif` | 3600×1608 | 32, 1736.25, 1216, 543.14 | static |

Each card also contains an `img.home-uses_mobile` which is `display:none` at ≥768 (see B.8).

### B.7 Tab motion (sampled)

- **Auto-advance every ≈9.15 s** (measured gaps 9143 / 9150 / 9150 / 9150 ms). Cycles 0→1→…→6→0.
- Outgoing card opacity 1 → 0 in **≈300 ms**; incoming card is already at 1 (hard cut up, fade down).
- Tab-strip `translateX` settles in **≈450 ms**, eased (values at +150/+300/+450 ms from a
  1609.38 → 1444.86 move: 1533.92, 1474.53, 1450.00, then 1444.91 → 1444.86 — an ease-out,
  roughly `cubic-bezier(.16,1,.3,1)`).
- Caption swap runs on the same 450 ms window (opacity + scale .98 ↔ 1).
- Clicking a pill advances immediately and restarts the timer.

### B.8 §3 responsive deltas

| | ≤991 | ≤767 | ≤479 |
|---|---|---|---|
| section box | 0, 1164, 991, 796.2 | 0, 1058, 767, 1087.6 | 0, 1054.2, 479, 798.1 |
| h2 | 56px / 56px / ls −1.68px | **40px / 40px / −1.2px** | 40px / 40px / −1.2px |
| `.home-flow_stack` rows / gap | `52px 44px` / 32px | `78px 41px` / 32px | `70.17px 40.88px` / **20px** |
| caption font / cc-1 max-w | 16px / **400px** | 14px / **384px** (24rem) | 13.92px / 384px |
| tab pill | 133.66×44, 16px | 120.9×**41**, **14px** | 120.4×40.9, 13.92px |
| tab list width | 1117.47 | **1012.8** | **1008.6** |
| strip fade width (25%) | 214.86 | 167.66 | 113.25 |
| card | 941.44 × **444.16** | 728.64 × **728.64 (1:1)** | 455.05 × **455.05 (1:1)** |
| `.home-flow_tab-bkg` | `top:140.55px`, 941.44×303.61, radius **24px** | `top:0`, fills the card, radius **20px** | `top:0`, fills the card, radius 20px |
| desktop screenshot layers | still used (cc-b 941.44×420.16) | **`display:none`** | `display:none` |
| `.home-uses_mobile` | `display:none` | **`display:block`, 728.64×728.64** | `display:block`, 455.05×455.05 |

So below 768 the whole stage becomes a **square card with a single mobile image**, no layered
screenshots and no coloured strip offset.

---

## C. §4 — Prompt block "What do you want to build?" (y 2343 – 2862, h 519)

### C.1 Boxes

| element | box | style |
|---|---|---|
| `.test-hide_base` | 0, 2343.39, 1280, 518.56 | plain wrapper |
| `section.section_input-action` | 0, 2343.39, 1280, 518.56 | `padding:48px 0; position:relative` |
| `.frame_line.cc-bottom` | 0, 2861, 1280, 1 | `position:absolute; top:517.56px; background:rgb(244,243,240)` + 80×1 gradient caps at x 0 / 1200 |
| `.container-regular` | 32, 2391.39, 1216, 422.56 | `margin:0 32px` |
| `.home-action_content` | 32, 2391.39, 1216, 422.56 | `flex-column; justify-content:center; padding:64px 0; border-radius:48px`; background transparent |
| `.u-stack-md` | 32, 2455.39, 1216, 294.56 | `flex-column; gap:24px` |

### C.2 Heading

`.home-action_title` 361.52, 2455.39, 556.95, 48 — `margin:0 329.52px`.
`h3.heading-style-h3` → **48px / 48px, weight 500, letter-spacing −1.92px, rgb(0,0,0),
text-align:center**, single line. Text: "What do you want to build?"

### C.3 Form / input box

| element | box | style |
|---|---|---|
| `form.home-action_form` | **320, 2527.39, 640, 222.56** | `flex-column; justify-content:space-between; gap:0; margin:0 288px; position:relative` |
| `.home-action_wrap` | 320, 2527.39, 640, 160 | `flex-column; justify-content:center; position:relative` |
| `.home-action_scale` (the visible card) | 320, 2527.39, 640, 160 (+ live scale) | `position:absolute; inset:0; background:rgb(255,255,255); border-radius:23.2px;`<br>`box-shadow: rgba(0,0,0,.12) 0 12px 24px -12px, rgba(209,205,199,.6) 0 0 0 1px inset;`<br>`transition: box-shadow .5s cubic-bezier(.19,1,.22,1)` |
| `textarea.home-action_input` | **328, 2535.39, 624, 144** | `z-index:5; margin:8px; padding:11.2px 16px 16px; min-height:144px (9rem);`<br>`background:rgb(255,255,255); border:none; border-radius:20px;`<br>`font 16px / 20.8px (1.3); letter-spacing −.01em; color rgb(27,26,24); resize:none; rows=2`<br>`::placeholder { color: var(--text) }` |

`.home-action_scale` is **continuously pulsing** (JS, not CSS): `scale` oscillates
**1.000 ↔ 1.010** with a **1800 ms** period, sine/ease-in-out (min at t=541, 2340, 4141, 5941 ms;
max at t=1441, 3241, 5040 ms). Rendered box therefore ranges 640×160 → 645.7×161.6.

### C.4 Chip row + submit

| element | box | style |
|---|---|---|
| `.home-action_button-list` | **340, 2687.39, 600, 62.56** | `flex-row; justify-content:space-between; align-items:center; gap:10px; padding:11.2px; margin:0 20px; background:rgb(244,243,240); border-radius:0 0 23.2px 23.2px` |
| `.home-action_button-group` | 340, 2687.39, 530.81, 62.56 | `flex-row; align-items:center; gap:8px; padding:11.2px; margin:-11.2px 0 -11.2px -11.2px; overflow:auto` (horizontal scroll) |
| `button.tab-btn.cc-light` ×3 | see below | `padding:10px 16px; height 40.19; border-radius:12px; background:rgb(254,253,251); color:rgb(123,121,116); font 14px weight 500;`<br>`border-top:1px solid #fff; border-bottom:1px solid rgba(123,121,116,.15);`<br>`transition: color .15s linear, background-color .15s linear` |
| `button.home-action_button.u-md-hide` | **880.8, 2698.7, 48, 40** | `flex; center/center; background:rgb(27,26,24); color:rgb(254,253,251); border-radius:12px`; inner arrow SVG 19.2×19.2 at 895.2, 2709.1 (`M5 12H19M12 19L19 12L12 5`, stroke-width 2, round caps) |

Chips, in order (these are **static** — no active state, background never changes):

| label | x | width |
|---|---|---|
| Find people data | 351.19 | 139.44 |
| Find company data | 498.63 | 154.66 |
| Find jobs data | 661.28 | 121.78 |

The submit button's accessible name is the text node **"Submit"** (no `aria-label`).
There is **no helper text** anywhere in this section — the only copy is the h3, the 3 chips,
the submit label and the animated placeholder.

### C.5 The typed placeholder animation — MEASURED (closes the §13 gap in pass 1)

It is a **typewriter cycle written into the `<textarea>`'s `placeholder` attribute** (not a DOM
text node, not CSS). A `|` character is appended/removed as a blinking caret.

**The three strings, cycled in this order:**

1. `Find phone numbers for controllers or accounting directors in the US or UK with 100-1,000 employees` (98 chars)
2. `Find companies with 30+ sales reps, $10M+ in revenue, and a free trial button on their website` (93 chars)
3. `Find companies with 3+ open roles that mention international expansion in the job descriptions` (93 chars)

They map 1:1 onto the three chips (people / company / jobs), but the chips do **not** highlight
in sync — they stay inert.

**Cadence (33 ms sampling, cursor stripped from the length):**

| phase | measured |
|---|---|
| type | 1 char per **~33 ms**, with an extra 33 ms skipped roughly every 5th char → **38.6 ms/char average**; a 94-char string types in **3630 ms** |
| hold at full string | **~1520 ms** |
| delete | 1 char per **~33 ms** → 94 chars in **3135 ms** (33.4 ms/char) |
| empty pause before next string | **0 – 500 ms** |
| full cycle per string | **≈8.3 s** (94 chars); 3-string loop ≈ **25 s** |

Observed phase boundaries in one run: TYPE 2773→7921 (5148 ms incl. hold), DEL 7921→11023
(3102 ms), TYPE 11023→16171, DEL 16171→19306, TYPE 19306→24620 (99-char string, 5314 ms),
DEL 24620→27919 (3299 ms).

**Caret blink:** the trailing `|` toggles every **495 ms** (measured 493/495/495/528/495/…),
i.e. a 990 ms, 50%-duty blink, running independently of the typing.

### C.6 §4 responsive deltas

| | ≤991 | ≤767 | ≤479 |
|---|---|---|---|
| section box | 0, 1960.2, 991, 434.6 | 0, 2145.6, 767, 398.6 | 0, 1852.3, 479, 450.8 |
| `.home-action_content` padding | `48px 0` | **`16px 0`** | **`16px 8px`** |
| h3 | 36px / 36px / −1.44px | 32px / 32px / −1.28px | 32px / 32px / −1.28px |
| form | 640 wide, `margin:0 150.72px` | 640 wide, `margin:0 44.31px` | **439 wide, `margin:0`** |
| textarea | 624×144, `padding:11.2px 16px **56px**` | 624×144, same | **423×144**, same |
| submit button | **moves inside the textarea**, 48×40 at (751.5, 2196.2) — i.e. bottom-right of the input, which is why padding-bottom becomes 56px | same, 48×40 at (639.5, 2377.6) | same, 48×40 at (395, 2088.3) |
| `.home-action_button-list` | 454.28 wide | 454.28 wide | **399 wide, h 110.8 (chips wrap to 2 rows)** |
| chip font | 16px | 14px | 13.92px |
| chip group overflow | `auto` | `visible` | `visible` |

At ≤479 the three chips wrap: rows at y 2155.5 (people + company) and y 2203.6 (jobs, centred at x 178.6).

---

## D. §6 — Reps (y 5866 – 6779, h 913)

### D.1 Boxes

| element | box | style |
|---|---|---|
| `section.section_home-reps` | 0, 5866, 1280, 912.56 | `padding:0 0 64px` |
| `.container-regular` | 32, 5866, 1216, 848.56 | |
| `.home-reps_content` | 32, 5865.95, 1216, 848.56 | `flex-column; gap:32px; padding:48px; background:rgb(244,243,240); border-radius:48px` |

### D.2 Top grid

`.home-reps_top`: **80, 5913.95, 1120, 216.56** —
`display:grid; grid-template-columns: 544px 544px; grid-template-rows: 18px 96px 54.5625px;
gap: 16px 32px; padding: 0 0 16px`.

| child | grid area | box | content |
|---|---|---|---|
| `.eyebrow-text.cc-slushie-400` | `span 2 / span 2`, row 1 | 80, 5913.95, 1120, 18 | "GTM INFRASTRUCTURE" — **12px / 18px, weight 600, letter-spacing 3px, uppercase, `rgb(0,139,173)`** |
| `.home-reps_intro` | auto (col 1, row 2) | 80, 5947.95, 544, 96 | `flex-column; gap:20px`; `h3.heading-style-h3.u-text-balance` → **48px / 48px, weight 500, ls −1.92px, rgb(27,26,24)**, 2 lines: "Build systems that make reps more productive". The words "reps more productive" are a `span.home-reps_span` in **`rgb(0,139,173)`** (432.9×58 @ x 80, y 5991) |
| `.home-reps_right.cc-top` | auto (col 2, row 2) | 704, 5947.95, 496, 82 | `flex-column; gap:20px; padding-top:4px`; `p.text-size-medium.cc-small` → **20px / 26px, weight 400, rgb(27,26,24)**, box 496×78, 3 lines |
| `.home-reps_action` | `1 / 2`, `3 / 4` | 80, 6059.95, 123.84, 25.5 | "Start free trial" line-link |
| `.home-reps_right` | `2 / 3`, `3 / 4` | 704, 6059.95, 496, 54.56 | the call-out group |

**The "bullet/point list" is not a list.** It is one paragraph of three sentences in
`.home-reps_right.cc-top > p`, exactly:
> Reps can self-serve the best prospecting data. Chat to get full account context in natural
> language. Build centralized workflows for any rep to run.

No `<ul>`, no bullet glyphs, no icons. Build it as a single `<p>` at 20/26 with width 496px.

`.home-reps_action > a.line-link`: 80, 6059.95, 123.84, 24 — `flex-row; align-items:center;
gap:4px; margin-bottom:1.5px`. Label 100.66×24 at **16px / 24px, weight 500, rgb(27,26,24)**;
underline `.line-link_line.cc-oat` 100.66×2 at `top:23.59px`, `background:rgb(209,205,199);
border-radius:100px`, with a `.line-link_fill` (`background:rgb(27,26,24)`) pre-offset
`translateX(-100.66px)` for the hover wipe; trailing `.line-link_icon` 19.2×19.2 at x 184.7
containing the two-arrow diagonal swap (second arrow at `translateX(-19.19px)`).

### D.3 Call-out quote group

`.home-reps_right > .call-out`: **704, 6059.95, 496, 54.56** — `flex-row; align-items:center; gap:24px`.

- `.call-out_top` (logo cluster): 702, 6065.64, 96, 43.19 — `flex-row; margin-left:-2px`.
  Three `.call-out_logo` chips, each **43.19 × 43.19**, `background:rgb(255,255,255);
  border-radius:14px; margin-right:-11.2px` (so they overlap by 11.2px → pitch 32px:
  x 702 / 734 / 766). Each holds a 24×24 `img.call-out_mark`, centred.
  Order (DOM / at rest): `6a2371bba98c22a3005fcd06_hex-mark.svg`,
  `6a237276303e00f4e4114292_terrappin-mark.svg`, `6a19d4e456842bfe0c1ea942_pendo-mark.svg`.
  The *front* chip (the one matching the visible quote) animates to `transform:scale(1)` and
  slides forward; the other two sit at `scale(0.817)` / `translateX(±30.1px)` — i.e. the cluster
  re-orders as the quote rotates.
- `.call-out_quote`: **822, 6059.95, 378, 54.56** — `display:grid; grid-template-columns:378px;
  grid-template-rows:54.5625px; gap:16px; position:relative`. All three
  `.call-out_item`s occupy that single cell.
- `.call-out_item`: `flex-column; justify-content:center; align-items:flex-start`.
  Visible item `opacity:1; transform:scale(1)`; hidden items `opacity:0; transform:scale(0.98)`.
  `p.text-size-small.u-text-balance` → **14px / 18.2px, weight 400, rgb(27,26,24)**,
  box 370.44 × 53.47 (the Pendo one is 378 × 54.56).

The three quotes, in DOM order:
1. "Pendo reps hit 200% of quota using agents for account research, tailored messaging and pre-call prep."
2. "Hex sales reps got a +50% lift in their close-rate by contacting qualified leads the same-day they show intent."
3. "Terrapinn generates +19% more revenue per rep and reduced acquisition cost by 90% using Claygent to find and qualify leads."

**Rotator timing (sampled):** advance every **≈3750 ms**; crossfade ≈**450 ms**
(old item 1 → 0 over ~300 ms, new item 0 → 1 over ~300 ms, overlapping by ~150 ms).
Observed visible order: item 2 → item 1 → item 3 → item 2 → … (indices 1, 0, 2 repeating).

### D.4 Video box

| element | box | detail |
|---|---|---|
| `.home-reps_media` | **80, 6162.52, 1120, 504** | `position:relative; border-radius:24px; overflow:hidden` (aspect 20:9) |
| `.home-reps_spacer` | same | `padding-top:504px` aspect spacer |
| `.video-bg` / `.video-bg__iframe-wrapper` | same | `position:absolute; inset:0; flex center/center` |
| `video.video-bg__video` | same | `https://assets.clayrun.dev/Reps%2006-16%201500px.webm` — natural **1500×750**, duration **8 s**, `loop muted`, `object-fit:cover` |
| `.video-bg_poster > img.image-cover` | same | `6a230ed1b32bb44bb4710471_Reps-Still%201.avif` (959×479), `opacity:0` once the video is ready, `transition: opacity 0.3s` |

### D.5 §6 responsive deltas

| | ≤991 | ≤767 | ≤479 |
|---|---|---|---|
| section box | 0, 7606.4, 991, 852.7 | 0, 7131, 767, 767.3 | 0, 6024, 479, 644.2 |
| `.home-reps_content` | `padding:40px; radius:40px` | `padding:20px; radius:28px` | `padding:20px; radius:28px` |
| `.home-reps_top` | **1 column** (861.44), rows `18 / 72 / 66.39 / 41.5 / 43.19`, gap `16px 32px` | 1 col (688.64), rows `18 / 64 / 66.39 / 41.5 / 91.56`, gap `16px 24px` | 1 col (415.05), same rows, gap `16px 24px` |
| h3 | 36px / 36px / −1.44px, block 432×72 | 32px / 32px / −1.28px, 432×64 | 32px / 32px / −1.28px, 415×64 |
| paragraph | 16px / 20.8px, 400 wide | 16px / 20.8px, 400 wide | 16px / 20.8px, 400 wide |
| "Start free trial" | grid `1/2`, `4/5` (row 4) | same | same |
| call-out | `flex-row; gap:24px; align-items:center`, h 43.2 | **`flex-column; gap:12px; align-items:flex-start`, h 91.6** | same as 767 |
| `.home-reps_media` | 861.44 × 387.64, radius **16px** | 688.64 × 309.88, radius **14px** | 415.05 × 186.77, radius 14px |

Stacking order at ≤991 becomes: eyebrow → h3 → paragraph → "Start free trial" → call-out → video.

---

## E. §7 — Customer slider (y 6779 – 7554, h 775)

### E.1 Boxes

| element | box | style |
|---|---|---|
| `section.section_home-customer` | 0, 6778.52, 1280, 775.1 | `padding:64px 0; position:relative`; `.frame_line` hairline at y 6778.5 (1280×1, `rgb(244,243,240)`, 80×1 gradient caps at x 0 / 1200) |
| `.container-regular` | 32, 6842.52, 1216, 647.11 | |
| `.u-stack-lg` | 32, 6842.52, 1216, 647.11 | `flex-column; gap:32px` |
| `.home-customer_title` | 360, 6842.52, 560, 96 | `margin:0 328px`; `h3.heading-style-h3` → **48px / 48px, weight 500, ls −1.92px, text-align:center, rgb(0,0,0)**, 2 lines: "Hear from the teams that grow with Clay" |
| `.home-customer_slider-wrap` | 32, 6970.52, 1216, 519.11 | `flex-column; padding:0 48px` (`--card--large`) |
| `.home-customer_base` | **80, 6970.52, 1120, 519.11** | `position:relative; overflow:hidden` |
| `.home-customer_slider` | 80, 6970.52, 1120, 519.11 | `z-index:5; flex-column; center/center; position:relative; overflow:hidden` |

### E.2 Slides — 3 total

Every slide: `position:absolute; top:259.547px; left:560px; width:80% (→ 896px);
height 504px (16:9); border-radius:32px; overflow:hidden; border:2px #fff (transparent)`.
They are placed purely with `transform: translate(Xpx, -252px)` (the −252 = −h/2 recentring;
`top:259.547px` + `left:560px` + the translate is what puts them on the 1120px stage).

| slot | translateX | resulting page x | z-index |
|---|---|---|---|
| left | **−1352** | −712 | 90 |
| centre | **−448** | 192 | **100** |
| right | **+456** | 1096 | 90 |

**Slide pitch = 904 px** (896 card + 8 px gap). Centre slide left edge = 560 − 448 = 112
inside the 1120 stage → exactly centred ((1120 − 896) / 2 = 112).

**No arrows, no dots, no autoplay.** Sampled for 20 s: transforms never changed on their own.
The slider is **drag/swipe-driven**: a 300 px leftward pointer drag rotated the assignment to
`[+456, −1352, −448]` (slide 0 wrapped from left slot to right slot, slide 2 became centre) —
i.e. a 3-slot infinite carousel that re-assigns the three translate values. `transition` is
inline-JS (`all`), so animate the transform yourself; the snap completes well inside 1 s.

### E.3 Per-slide content

**Slide A (left slot) — `<a href="/customers/hex">`**
- `.home-customers_spacer` `padding-top:504px` aspect spacer.
- `.home-customer_content` `position:absolute; inset:0; flex-row; justify-content:center;
  align-items:flex-end; padding:40px`.
- `img.image-cover` `6a16471db36485482904d85c_hex.avif`, natural **896×504**, fills the slide.
- `.home-customer_overlay` `position:absolute; inset:auto 0 0; height:40%` → 896 × 201.59 at
  `top:302.406px`; `background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.4))`; `z-index:1`.
- `.home-customer_btm` 352 × 95.88 — `flex-column; justify-content:flex-end; align-items:center; gap:8px`:
  - `.text-size-large` → **24px / 31.2px, weight 400, `rgb(254,253,251)`, centred**, 352 × 62.38 —
    "How Hex increased inbound win-rate 50% using Clay"
  - `.line-link` 142.63 × 24 → "Read case study", **16px / 24px, weight 500, rgb(254,253,251)**

**Slide B (centre slot) — `<div>`, the video player. This is the "two-video arrangement":**
- `.video-player_wrapper` 896 × 504 with the 504px spacer.
- **Video 1 — the ambient poster loop**: inside `.video-player_poster`
  (`position:absolute; inset:0; flex-column; center/center; padding:40px`), a `.video-bg` holds
  `video.video-bg__video` → `https://assets.clayrun.dev/Clay-Hero%20(3)%20(1).mp4`,
  natural 1920×1080, duration **6.014 s**, `autoplay loop muted`, `z-index:1`, plus a fallback
  `img.image-cover` `6a16474bc6e0889d2a9e1af1_video-clay-ph.avif` (896×504).
  Over it: a 64×64 `.video-player_btn.cc-poster` play button, the same
  `.home-customer_overlay` gradient, and a `.home-customer_btm.hide` caption
  ("How Hex increased inbound win-rate 50% using Clay") which is hidden by default.
  `.home-customer_content.cc-video-player` padding is `64px 40px 40px`.
- **Video 2 — the real case-study film**: `video.video-player`
  `https://assets.clayrun.dev/euro_case_study_final_v1_(2)_(1)_v1%20(1080p).mp4`,
  natural 1920×1080, duration **210.26 s** (= the "3:30" in the UI), `autoplay=false`,
  `loop=false`, **not muted**. Sits `position:absolute; inset:0`, revealed on play.
- `.video-player_controls` `position:absolute; inset:0; display:grid; padding:24.8px;
  gap:14px 6.4px;` `grid-template-columns: 42px 42px 502.141px 0px 98.875px 129.438px;`
  `grid-template-rows: 42px 316.406px 12px 42px`:

  | child | grid area | box | style |
  |---|---|---|---|
  | `.video-player_overlay` | auto | fills 896×504 | click target |
  | `.video-player_btn.cc-play` | `1/2`, `4/5` | 216.8, 7415.27, 42, 42 | `background:rgba(208,208,208,.12); border-radius:12px` |
  | `.video-player_btn.cc-hug.md-hide` (mute) | `2/3`, `4/5` | 265.19, 7415.27, 42, 42 | same |
  | `.video-player_stack` (scrubber, label "00:00") | `1/7`, `3/4` | 216.8, 7389.27, 846.41, 12 | |
  | `.video-player_btn.cc-time` | `5/6`, `4/5` | 828.5, 7415.27, 98.88, 42 | "0:00 / 3:30" |
  | `.video-player_btn.cc-btn.cc-light` | `6/7`, `4/5` | 933.77, 7415.27, 129.44, 42 | "Start free trial", `background:rgb(254,253,251); border-radius:12px` |
  | `.video-player_btn` (fullscreen) | `6/7`, `1/2` | 1021.2, 7002.86, 42, 42 | `background:rgba(208,208,208,.12); border-radius:12px` |

**Slide C (right slot) — `<a href="/customers/verkada-emea">`**
- Same structure as slide A. `img.image-cover` `6a164762948537452e857d1c_v-logo-ph.avif` (896×504).
- `.home-customer_btm` **464** × 95.88 (wider than A) —
  "How Verkada GTM team expanded in 28 European countries using Clay" (24/31.2, 464×62.38)
  + "Read case study" line-link (142.63 × 24).

### E.4 §7 responsive deltas

| | ≤991 | ≤767 | ≤479 |
|---|---|---|---|
| section box | 0, 8459.1, 991, 599.6 | 0, 7898.3, 767, 526.4 | 0, 6668.2, 479, 404.9 |
| h3 | 36px / 36px, 512 wide | 32px / 32px, 384 wide | 32px / 32px, 336 wide |
| `.home-customer_slider-wrap` padding | `0 40px` | **`0`** | **`0`** |
| slide width rule | **85%** → 689.14 × 388 | **90%** → 619.34 × 348 | 90% → 409.53 × 230 |
| slide radius | 24px | 20px | 20px |
| `left` / `top` | 430.719px / 199.812px | 364.312px / 179.219px | 227.516px / 118.438px |
| translateX trio | −1041.57 / −344.57 / +352.43 → **pitch 697** | −936.67 / −309.67 / +317.33 → **pitch 627** | −622.77 / −204.77 / +213.23 → **pitch 418** |
| overlay | `height:40%` (155.19), `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.4))` | **`height:100%`**, `linear-gradient(rgba(0,0,0,.15), rgba(0,0,0,.15)), linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.4))` | same as 767 |
| caption font | 24px / 31.2px | **22.4px / 29.12px** | **20px / 26px** |
| controls padding / rows | `24.8px`, rows `42 / 256.05 / 12` | **`12px`**, rows `42 / 242.38 / 12` | `12px`, rows `42 / 124.36 / 12` |

Note the slide gap stays 8px at every width (pitch − width = 697−689.14 ≈ 7.9, 627−619.34 ≈ 7.7,
418−409.53 ≈ 8.5).

---

## F. §8 — Updates grid (y 7554 – 8615, h 1061)

### F.1 Boxes

| element | box | style |
|---|---|---|
| `section.section_home-updates` | 0, 7553.63, 1280, 1060.89 | `padding:64px 0 96px; position:relative;`<br>`background-image: linear-gradient(rgba(255,255,255,0) 35%, rgb(255,255,255))`; `.frame_line` hairline at y 7553.6 |
| `.container-regular` | 32, 7617.63, 1216, 900.89 | |
| `.u-stack-lg` | 32, 7617.63, 1216, 900.89 | `flex-column; gap:32px` |
| `.home-flow_title` | 320, 7617.63, 640, 96 | `margin:0 288px; flex-column; align-items:center; gap:12.8px`; `h3` → **48px / 48px, weight 500, ls −1.92px, centred** — "Learn more about GTM engineering" |
| `.home-updates_grid` | **32, 7745.63, 1216, 772.89** | `display:grid; gap:16px`<br>`grid-template-columns: 120.875px 120.891px ×7 120.875px` (**9 tracks**; 9×120.89 + 8×16 = 1216)<br>`grid-template-rows: 231.719px 277.453px 231.719px` (231.72 + 277.45 + 231.72 + 2×16 = 772.89) |

### F.2 Card span map (DOM order)

| # | card | span | box (x, y, w, h) | background / radius |
|---|---|---|---|---|
| 0 | **Conference / Sculpt** `a[href="https://sculpt.clay.com/"]` | `span 3` cols × `span 2` rows | 32, 7745.63, **394.66 × 525.17** | `rgb(245,243,255)` / 24px |
| 1 | **Get started with Clay** `a[href="https://university.clay.com/"]` | `span 6` × `span 1` | 442.66, 7745.63, **805.33 × 231.72** | `rgb(244,243,240)` (`.cc-oat`) / 24px |
| 2 | **Livestream** `a[href="/livestreams/how-clay-uses-clay-abm-direct-mail-campaigns"]` | `span 3` × `span 1` | 442.66, 7993.34, **394.67 × 277.45** | `rgb(252,186,190)` (`.cc-pom-light`) / 24px |
| 3 | **Community story — Lagos** `a[href="/blog/sandra-uche"]` | `span 4` × `span 1` | 32, 8286.80, **531.55 × 231.72** | `rgb(244,243,240)` (`.cc-oat`) / 24px |
| 4 | **Come and join us / careers** `a[href="/careers-old"]` | `span 2` × `span 1` | 579.55, 8286.80, **257.78 × 231.72** | `rgb(244,243,240)` (`.cc-white`) / 24px |
| 5 | **Community story — Javeria** `a[href="/blog/javeria-shah"]` | **explicit `grid-column: 7 / 10; grid-row: 2 / 4`** | 853.33, 7993.34, **394.66 × 525.17** | `rgb(240,248,255)` (`.cc-blueberry`) / 24px |

Card 5 is the only one with explicit line placement; the others are auto-placed in DOM order.

### F.3 Card internals

**Tall image-over-text cards (0 and 5)** — `flex-column; gap:0`:
- `.update_img-wrap` 394.66 × **315.72**, `border-radius:24px`, with a `.update_spacer`
  `padding-top:315.719px` and `img.image-cover` absolutely filling it, `object-fit:cover`.
- `.update_intro` 394.66 × 209.45 — `flex-column; justify-content:space-between;
  align-items:flex-start; gap:14px; padding:24px`.
- `.eyebrow.u-mb-0-2` → **12px / 14.4px, weight 600, letter-spacing 1.08px, uppercase**.
  Card 0: "Conference", `rgb(161,123,249)`. Card 5: "Community story", `rgb(66,158,255)`.
- `h3.text-size-large.text-weight-medium` → **24px / 31.2px, weight 400, rgb(0,0,0)**, width 346.66.
- `.line-link` 24px tall (label 16px/24px weight 500 + 19.2×19.2 arrow, gap 4px).
- Images: card 0 `6a42d02ac96c9652b4a86e47_Content%20Card.svg` (384×307);
  card 5 `6a164e4f36cd8072834477c6_more-clay-4.avif` (1280×1023).

**The conference banner block (card 0)** is exactly the same `update_card` pattern — there is no
separate banner component. Its eyebrow is "Conference", its heading is
"Sculpt: The go-to-market conference returns in 2026" (346.66 × 62.38 @ 56, 8129.33) and its
link is "Get tickets" (103.03 × 24 @ 56, 8221.30). The purple wash `rgb(245,243,255)` plus the
purple eyebrow `rgb(161,123,249)` are what make it read as a banner.

**Wide split cards (1 and 3)** — `.home-update_card` `flex-row; padding:24px` wrapping a
`.home-update_wide` grid:
- Card 1: `grid-template-columns: 494.219px 247.109px; gap:16px`, box 466.66, 7769.63, 757.33, 183.72.
  Left `.home-update_left` (`flex-column; justify-content:center; gap:24px`, width 400):
  h3 "Get started with Clay" (232.63 × 31.19), `.update_description` **320 × 72**
  (`max-width:320px`, 16px / 24px) — "Find the content that helps you level up your GTM skills
  and build confidently with Clay." — and the "Go to University" line-link (139.34 × 24).
  Right `.home-update_wide-img` 247.11 × 183.72, `border-radius:12px`, image
  `6a164e8facfbaa9df371b518_Footer-Illo.avif` (1280×588), with a `.home-update_spacer`
  `padding-top:160.609px`.
- Card 3: `.home-update_wide.cc-reverse` → `grid-template-columns: 153.172px 306.375px;
  gap:24px`, image **first**. Image box 153.17 × 183.72 at (56, 8310.80), radius 12px,
  `6a19ed63725d3d3f66c4a991_community%20story.avif` (425×425), spacer
  `.cc-tall` `padding-top:99.547px`. Text column at x 233.17: eyebrow "Community story"
  `rgb(0,0,0)` (130.38 × 14.39), h3 "Sandra has built the Clay community in Lagos"
  (306.38 × 62.38), "Read story" (101.25 × 24).

**Full-bleed image cards (2 and 4)**:
- `img.image-cover.cc-top` absolutely fills the card, `object-fit:cover`.
  Card 2: `6a3a8ef1e9ef8b7642e8f3bb_…_HCUC%20Livestream%20Asset.avif` (1080×847).
  Card 4: `6a164e208220d25c3d28961a_Blog-card-3.avif` (1280×1107).
- Card 2 has a scrim: `.home-update_base.cc-overlay` (grid 394.672 × 277.453, gap 16px)
  with `background-color: rgba(0,0,0,0.25)`.
- `.update_center-content` — `flex-column; justify-content:flex-end; align-items:flex-start; gap:12px`.
  Card 2 (`.cc-1`): `padding:96px 24px 24px`; eyebrow "Livestream" white,
  h3 "How Clay Uses Clay: ABM campaigns to break into Tier 1 accounts" (346.67 × 93.56, white),
  link "Watch" (71.06 × 24).
  Card 4: `padding:24px`; eyebrow "Come and join us" `rgb(254,253,251)` (127.05 × 14.39),
  no h3, link "See open roles" (131.05 × 24).
- `.home-update_center` inside these cards is a `padding-top` aspect spacer:
  264.422px (card 2), 172.703px (card 4).

### F.4 §8 responsive deltas

| | ≤991 | ≤767 | ≤479 |
|---|---|---|---|
| section box | 0, 9058.8, 991, 2660.6 | 0, 8424.7, 767, 4272.1 | 0, 7073.1, 479, 2871.1 |
| h3 | 36px / 36px, 480 wide | 32px / 32px, 281.6 wide | 32px / 32px, 281.6 wide |
| grid columns | **`462.719px 462.719px` (2 cols)** | **1 column (728.641px)** | **1 column (423.047px)** |
| grid rows | `540.438 / 630.75 / 594.703 / 630.75` | `747.25 / 648.234 / 488.188 / 896.984 / 488.188 / 747.25` | `500.453 / 454.219 / 283.438 / 593.062 / 283.438 / 500.453` |
| gap | 16px | 16px | 16px |
| spans | card 0 `span 1`, card 1 `span 1`, card 2 **`span 2`**, card 3 `span 1`, card 4 **`span 2`**, card 5 explicit **`2 / 3` × `3 / 4`** | all `span 1` (pure stack, DOM order) | all `span 1` |
| `.home-update_wide` | 1 column (422.719px) — image drops under the text | 1 column (688.641px) | 1 column (383.047px) |
| `.update_intro` padding | `20px` | `20px` | `20px 20px 24px` |

At ≤991 the visual order is: [Sculpt | Get started] / [Livestream, full width] /
[Lagos | Javeria] / [Careers, full width]. Below 768 it is a single column in DOM order.

---

## G. §9 — Footer (y 8615 – 10180, h 1566)

### G.1 Shell

| element | box | style |
|---|---|---|
| `footer.section_footer` | 0, 8614.52, 1280, 1565.64 | `flex-column; align-items:center; position:relative;`<br>`background-color: rgb(255,253,249);`<br>`background-image: linear-gradient(rgb(255,255,255), rgb(255,253,249) 15%)` |
| `.footer_stack` | 0, 8841.31, 1280, 1338.84 | `flex-column; position:relative` |
| `.footer_spacer` | 0, 8841.31, 1280, 384 | `padding-top:307.188px` (24% aspect spacer that reserves the video band) |
| `.footer_video` | 0, 8841.31, 1280, **1338.84** | `position:absolute; inset:0` |
| `.footer_wrapper` | 0, 9225.31, 1280, 954.84 | `position:relative; z-index:2` |

`.footer_video > .video-bg.cc-footer > video.video-bg__video.cc-footer`:
`https://assets.clayrun.dev/Footer%2005-29%20Lossy%200001-0060.mp4`, natural **3000×3000**,
duration **4 s**, `object-fit:cover`, `background:rgb(255,255,255)`, `position:absolute; inset:0`.
Poster: `.video-bg_poster > img.image-cover.cc-top`
`6a26fff108a74d8a55ddab89_Footer-Still%20(1)-p-1600.avif` (1280×1280).

### G.2 CTA band

`.footer-action_intro`: **320, 8614.52, 640, 274.8** —
`flex-column; justify-content:center; align-items:center; position:relative;
padding:80px 0 0; margin-bottom:-48px`.

| element | box | type |
|---|---|---|
| `.footer-action_title > h2` | 320, 8694.52, 640, 96.81 | **44px / 48.4px, weight 500, letter-spacing −0.88px, centred, rgb(0,0,0)**, `margin-bottom:17.6px`, 2 lines — "Turn your growth ideas into reality today" |
| `.footer-action_description > p` | 480.95, 8808.92, 318.08, 22.39 | **16px / 22.4px, weight 400, centred**, `margin-bottom:16px` — "Start for free today. No credit card required." |
| `.flex-row.flex-gap-sm.flex-x-center` | 486.38, 8847.31, 307.25, 42 | `flex-row; justify-content:center; gap:8px` |
| `a.btn` "Start free trial" | 486.38, 8847.31, **157.58 × 42** | `background:rgb(0,0,0); color:rgb(255,255,255); border:1px solid transparent; border-radius:12px; padding:8px 16px; gap:8px`; label 16px / 24px weight 500, ls −0.16px; trailing 16×16 `.btn_icon-track` arrow (two `.btn-icon` stacked, both pre-offset `translateY(-16px)`) |
| `a.btn.cc-secondary.u-w-100` "Get a demo" | 651.95, 8847.31, **141.67 × 42** | `background:rgb(255,255,255); color:rgb(0,0,0); border:1px solid rgb(0,0,0)`; otherwise identical |

### G.3 Oat panel + link grid

`.container-regular` 32, 9225.31, 1216, 954.84 → `.footer_content`
32, 9225.31, 1216, 954.84 — `flex-column; gap:64px; padding:48px 48px 0;
background:rgb(244,243,240); border-radius:48px 48px 0 0`.

`.footer_grid`: **80, 9273.31, 1120, 699.47** —
`display:grid; grid-template-columns: repeat(5, 192px); grid-template-rows: 415.516px 259.953px;
gap: 24px 40px`. (5×192 + 4×40 = 1120; 415.52 + 24 + 259.95 = 699.47.)

Column x positions: **80, 312, 544, 776, 1008** (pitch 232 = 192 + 40).

Typography:
- `h3.footer-list-header` → **12px / 13.2px, weight 600, letter-spacing 1.44px, uppercase, rgb(0,0,0)**.
- `a.footer-link` → **14px / 15.4px, weight 400, `rgb(85,83,78)`**, `transition: color .1s ease-out`.
- `.footer-list-wrap` → `flex-column; gap:16px`; `ul.footer-list` → `flex-column; gap:10px;
  margin-bottom:20px`; each `li` is 17.6px tall (link 16px tall, 1px offset), so **li pitch 27.6px**.
- `.footer-col.flex-col` → `flex-column; align-items:flex-start; gap:48px`.

**Row 1 (y 9273.31, col 1–5):**

| col | heading | links (label → href) |
|---|---|---|
| 1 | **USE CASES** | Automated inbound `/use-cases/inbound-enrichment` · Account research `/use-cases/account-research` · ABM `/use-cases/abm` · PLG assist `/use-cases/plg-assist` · Rep assist `/use-cases/rep-assist` · Reverse ETL `/use-cases/reverse-etl` · Outbound `/use-cases/outbound` · CRM Enrichment `/use-cases/crm-enrichment` · TAM Sourcing `/use-cases/tam-sourcing` |
| 2 | **PRODUCT** | Claygent AI `/claygent` · Account Agents `/account-agents` · Sculptor `/sculptor` · Ads `/ads` · Sequencer `/sequencer` · Multi-provider data enrichment `/waterfall-enrichment` *(wraps to 2 lines, li h 35.2)* · Audiences `/audiences` · Signals `/signals` · Workflows `/workflows` · Functions `/functions` · Integrations `/integrations` · Pricing `/pricing` · Changelog `/changelog` |
| 3 | **BLOG** | The rise of the GTM engineer `/blog/gtm-engineering` · Finding GTM alpha `/blog/gtm-alpha` · Clay reaches 100M ARR `/blog/100m-arr` · Series C: The GTM engineering era begins now `/series-c` *(2 lines)* |
| 4 | **RESOURCES** | Get started lesson `/university/lesson/intro-to-clay-101-clay-101` · University `https://university.clay.com/` · Use case templates `https://university.clay.com/claybooks` · Partner programs `/partners` · Community `https://community.clay.com/` · FAQ `/faq` |
| 5 | **COMPANY** | Contact us `/contact` · About `/about` · Careers `/careers` · Jobs `/jobs` · Integrate with Clay `/partners/integrations` *(2 lines)* · Status `https://status.clay.com/` |

**Row 2 (y 9712.83):**

| col | heading | links |
|---|---|---|
| 1 | **CUSTOMERS** (`.footer-list-wrap`, no `.footer-col` wrapper) | OpenAI `/customers/open-ai` · Vanta `/customers/vanta` · Verkada `/customers/verkada` · Sendoso `/customers/sendoso` · Anthropic `/customers/anthropic` · Coverflex `/customers/coverflex` · Rippling `/customers/rippling` · Case studies `/customers` |
| 5 | **LEGAL** (`.footer-col.u-md-hide`, explicit `grid-column:5/6; grid-row:2/3`) | Privacy policy `https://privacy.clay.com/` · Terms of service `/terms-of-service` · Do not sell my data `https://privacy.clay.com/policies?modal=select-subject` |

Two extra `.footer-col.u-md-only` blocks (a second **Customers** list that also contains
"Mistral AI", and a second **Legal** list pointing at `/privacy` + a Google Form) are
`display:none` above 991 — they are the ≤991 replacements. See G.5.

### G.4 Credit bar

`.footer_credit-bar`: **80, 10036.78, 1120, 143.38** —
`display:grid; grid-template-columns: 290.125px 507.734px 290.141px; grid-template-rows: 46.375px;
gap:16px; padding:48px 0; align-items:center; border-top:1px solid rgba(209,205,199,0.5)`.
(290.125 + 507.734 + 290.141 + 2×16 = 1120.)

| cell | element | box | content |
|---|---|---|---|
| 1 | `.footer_brand > img.footer_logo` | 80, 10088.47, **128 × 40.98** | `6778506d788ebf16fef48551_Clay%20primary%20logo.avif` (509×163), `object-fit:cover` |
| 2 | `.footer_credit` | 386.13, 10085.78, 507.73, 46.38 | `flex-column; align-items:center; justify-content:center; gap:1.6px`;<br>line 1 `.text-size-regular` 155.72 × 22.39 — "©2026 Clay Labs Inc." (**16px / 22.4px, weight 400**; the year is a `span.footer_year`);<br>line 2 `.text-size-regular.text-weight-semibold` 236.08 × 22.39 — "Born in Brooklyn • Art by Hudson" (**16px / 22.4px, weight 600**; "Hudson" is a link) |
| 3 | `.social_list` | 1064, 10088.97, **136 × 40** | `flex-row; justify-content:flex-end; align-items:center; gap:8px` |

Social icons — three `a.social_link`, each **40 × 40**, `background:rgb(209,205,199);
border-radius:10px`, `display:flex; center/center`, containing a **24 × 24** inline SVG
(`fill:none`, `currentColor` = `rgb(0,0,0)`), at x 1064 / 1112 / 1160 (pitch 48):

1. LinkedIn — `https://www.linkedin.com/company/grow-with-clay/posts/?feedView=all` (title "Visit Clay on LinkedIn")
2. YouTube — `https://www.youtube.com/@GrowWithClay` ("Visit Clay on YouTube")
3. Slack — `https://www.clay.com/slack-community` ("Visit Clay on Slack")

### G.5 §9 responsive deltas

| | ≤991 | ≤767 | ≤479 |
|---|---|---|---|
| footer box | 0, 11719.4, 991, 1711.3 | 0, 12696.8, 767, 1833.8 | 0, 9944.2, 479, 1983.6 |
| `.footer-action_intro` | 638.4 wide, `padding:80px 0 0; margin-bottom:-48px` | 448 wide, `padding:48px 0 0; margin-bottom:**-96px**` | 320 wide, `padding:48px 0 0; margin-bottom:-48px` |
| CTA h2 | **36px / 39.6px / −0.72px**, `margin-bottom:14.4px` | **32px / 38.4px / −0.64px**, `margin-bottom:12.8px` | 32px / 38.4px / −0.64px |
| CTA buttons | row, gap 8px (157.58 + 141.67) | **column**, gap 8px, both **157.58 × 42** | column, gap 8px, both 157.58 × 42 |
| `.footer_spacer` | `padding-top:237.828px` (h 384) | `padding-top:184.078px` (h 304) | `padding-top:114.953px` (h 234) |
| `.footer_video` height | 1544.97 | 1666.59 | 1730.16 |
| `.footer_content` | `padding:40px 40px 0; radius:40px 40px 0 0; gap:48px` | `padding:28px 28px 0; radius:28px 28px 0 0` | `padding:28px 28px 0; radius:28px 28px 0 0` |
| `.footer_grid` | **3 cols** `260.469 260.484 260.469`, rows `397.922 / 207.719 / 259.953`, gap **`32px 40px`** | **2 cols** `320.312 320.328`, rows `267.016 / 368.578 / 194 / 241.625`, gap **`24px 32px`** | **2 cols** `183.516 183.531`, rows `266.312 / 383.266 / 193.297 / 240.922`, gap `24px 32px` |
| column order | Use cases · **Customers (`u-md-only`)** · Product / Blog · Resources · Company / Legal (`u-md-only`) · Customers | same 8 blocks, 2-up | same 8 blocks, 2-up |
| `.footer-col.u-md-hide` (Legal, row 2 col 5) | `display:none` | `display:none` | `display:none` |
| `.footer_credit-bar` | `290/508/290` → **`221.172 387.078 221.172`**, 1 row, gap 16px, padding `48px 0` | **`170.828 298.969 170.828`**, 1 row | **1 column (399.047px), 3 rows `40.98 / 46.375 / 40`, gap 20px** — logo, credit text, socials stack and centre |
| logo | 128 × 40.98 (unchanged) | 128 × 40.98 | 128 × 40.98, centred at x 175.5 |
| social list | 136 × 40, `justify-content:flex-end` | same | same box, row centred at x 171.5 |

The `u-md-only` / `u-md-hide` pair is the mechanism: above 991 the **Legal** column sits in
grid cell (5, 2) and **Customers** sits in cell (1, 2); at ≤991 those two are hidden and the
duplicated `u-md-only` blocks (which carry slightly different link sets — the alternate
Customers list adds **Mistral AI** `/customers/mistral-ai`, and the alternate Legal list uses
`/privacy` and a Google Form for "Do not sell my data") take over in normal flow order.

---

## H. Things still not machine-readable

- The exact easing curves for the JS tweens (tab strip, card crossfade, call-out rotator,
  slider snap). Durations above are sampled to ±33 ms; the shapes are ease-out-ish. Use
  `cubic-bezier(.16,1,.3,1)` for the strip and a plain `ease` for opacity unless a visual
  audit says otherwise.
- `.texture-noise` / `.texture-fingers` (§3 cards) are CSS-image texture overlays; their source
  images are declared in Webflow custom CSS and were not resolvable to a single asset URL in
  the network log.
- The customer slider's drag physics (velocity threshold, rubber-banding) — only the resulting
  3-slot re-assignment was confirmed.
- `.logo_cursor` (§2) is rendered at 0.8×0.8px with a placeholder avatar on a cold load; whatever
  drives it did not fire during any measurement run.
