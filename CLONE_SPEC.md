Source: https://www.clay.com/?ref=saaspo.com

# Clay.com homepage — build spec

All numbers are **measured** via Playwright (`getComputedStyle` / `getBoundingClientRect`) on
Chromium, DSF 1, at viewport widths 1600 / 1440 / 1366 / 1280 / 1200 / 1100 / 1024 / 992 / 991 /
900 / 834 / 800 / 769 / 768 / 767 / 700 / 640 / 600 / 540 / 480 / 479 / 430 / 414 / 390 / 375 /
360 / 320. Unless a width is named, values are **@1280 × 900**.

`y` values are document-absolute (page top = 0). `x` values are viewport-absolute.

Stack on the original: **Webflow** (`Webflow` global present) + **GSAP 3.15.0** with the
ScrollTrigger plugin loaded. See §11 for what that actually does — it is much less than it sounds.

---

## 0. Global foundations

### 0.1 Container / grid

```
.container-regular { width: 95%; max-width: 1280px; margin-inline: auto; }
```

Measured container width and left offset:

| vw | container w | x | gutter each side |
|---|---|---|---|
| 1600 | 1280 | 160 | 160 |
| 1440 | 1280 | 80 | 80 |
| 1280 | 1216 | 32 | 32 |
| 1200 | 1140 | 30 | 30 |
| 1100 | 1045 | 27.5 | 27.5 |
| 1024 | 972.8 | 25.6 | 25.6 |
| 992 | 942.4 | 24.8 | 24.8 |
| 900 | 855 | 22.5 | 22.5 |
| 768 | 729.6 | 19.2 | 19.2 |
| 640 | 608 | 16 | 16 |
| 480 | 456 | 12 | 12 |
| 390 | 370.5 | 9.75 | 9.75 |
| 320 | 304 | 8 | 8 |

The **nav** uses the same 95% rule but **without the 1280 cap** — at 1600 the nav bar is
`x=40, w=1520`; at 1440 `x=36, w=1368`; at 1280 `x=32, w=1216`. Do not cap nav width.

### 0.2 Breakpoints (exact — Webflow defaults)

Layout changes only at **≤991px**, **≤767px**, **≤479px**. 1024 and 992 are identical to 1280 in
every structural respect (only fluid widths differ). Full deltas in §10.

### 0.3 Typography

Primary face: **`Roobertvf, Arial, sans-serif`** — single variable woff2:
`https://cdn.prod.website-files.com/61477f2c24a826836f969afe/6a1e067cbcc79b9f76bb28f5_RoobertVF.woff2`
Weights used from the VF axis: 400, 500, 550, 575, 600, 700.
Icon font: **Phosphor** (`@phosphor-icons/web@2.1.1`, regular/bold/fill), class pattern
`.icon_ph.ph.ph-arrow-right`. `Space Mono` (300–700) and `Inter` are loaded by the page but are
**not applied to any rendered element on this route** (third-party widget CSS). Ignore them.

`html` font-size stays **16px at every width**. `body` font-size: **16px** ≥768, **14px** at
767–480, **13.92px** ≤479. Body line-height 24px, color `rgb(0,0,0)`.

Roles, computed `font-size / weight / line-height / letter-spacing`:

| role | class | ≥992 | 991–768 | 767–480 | ≤479 |
|---|---|---|---|---|---|
| H1 | `.heading-style-h1` | 88 / 575 / 88 / −3.52px | 64 / 575 / 64 / −2.56px | 48 / 575 / 48 / −1.92px | 41.6 / 575 / 41.6 / −1.664px |
| H2 | `.heading-style-h2` | 72 / 500 / 72 / −2.16px | 56 / 500 / 56 / −1.68px | 40 / 500 / 40 / −1.2px | 40 / 500 / 40 / −1.2px |
| H3 (section) | `.heading-style-h3` | 48 / 500 / 48 / −1.92px | 36 / 500 / 36 / −1.44px | 32 / 500 / 32 / −1.28px | 32 / 500 / 32 / −1.28px |
| Footer CTA H2 | `.footer-action_title h2` | 44 / 500 / 48.4 / −0.88px | — | — | — |
| Large body | `.text-size-large` | 24 / 400 / 31.2 / normal | 24 / 400 / 31.2 | 22.4 / 400 / 29.12 | 20 / 400 / 26 |
| Medium body | `.text-size-medium` | 20 / 400 / 26 / normal | 20 / 400 / 26 | 20 / 400 / 26 | 18 / 400 / 23.4 |
| Regular | `.text-size-regular` | 16 / 400 / 22.4 / normal | | | |
| Small | `.text-size-small` | 14 / 400 / 18.2 / normal | | | |
| Eyebrow (section) | `.eyebrow-text` | 12 / 600 / 18 / **3px** uppercase | | | |
| Eyebrow (card) | `.eyebrow` | 12 / 600 / 14.4 / **1.08px** uppercase | | | |
| Footer col header | `.footer-list-header` | 12 / 600 / 13.2 / **1.44px** uppercase | | | |
| Footer link | `.footer-link` | 14 / 400 / 15.4 / normal, `rgb(85,83,78)` | | | |
| Nav top link | `.nav__list--link` | 16 / 400 / 24 / normal | | | |
| Nav mega heading | | 10 / 600 / — / **0.8px** uppercase, `rgb(121,117,109)` | | | |
| Nav mega item | | 14 / 550 / — / −0.14px, `#000` | | | |
| Nav CTA button | `.btn.cc-small` | 13.92 / 500 / 20.88 / −0.1392px | | | |
| Nav utility (Log in, ⌘K) | | 12.8 / 400–500 / 19.2 | | | |
| Primary button | `.btn` | 16 / 500 / 24 / −0.16px | | | |
| Hero button | `.btn` (hero) | 18 / 500 / 27 / −0.18px | | | |
| Tab pill | `.tab-btn` | 16 / 500 / 24 / normal | | | |
| Feature pill | `.home-feature_pill` | 12 / 600 / 18 / 3px uppercase | | | |

`.u-text-balance` = `text-wrap: balance` — used on H1-adjacent copy, feature headings, logo intro.

### 0.4 Color

Neutrals: `#FEFDFB` (paper), `#F4F3F0` (oat-100), `#F3F2ED` (oat-200, nav demo btn),
`#FFFDF9` (footer base), `#1B1A18` (ink), `#55534E` (footer link), `#7B7974` (muted / chip text),
`#D1CDC7` (hairline, social chips), `rgba(209,205,199,0.5)` (nav + footer divider),
`#FFFFFF`, `#000000`.

Hero green: `rgb(3,93,68)` = `#035D44`.

Accent families (used as flow-card bg / feature tints):

| name | 200/light | 400/base | dark (text) | deep (pill active bg) |
|---|---|---|---|---|
| blueberry | `#BEDFFE` | `#429EFF` | `#001433` | `#395AFA` |
| tangerine | `#FCC9AB` | `#FF7714` | `#381005` | `#B53D0A` |
| lime | `#EEF773` | `#CBD810` | `#102B03` | `#808000` |
| dragonfruit | `#F8B9E4` | `#FF70D2` | `#46022F` | `#CC089E` |
| ube | — | `#A17BF9` | — | — |
| pomegranate | — | `#FB4450` | — | — |
| slushie | — | `#008BAD` (reps eyebrow) | — | — |
| sky | — | `#3BD3FD` (flow card 1) | — | — |

Feature card backgrounds: `#F0F8FF` (data), `#FFF3ED` (agents), `#FCFEE2` (orchestration),
`#FFF0FA` (execution).

Update-card backgrounds: `#F5F3FF`, `#F4F3F0` (oat), `#FCBABE` (pom-light), `#F0F8FF` (blueberry).

### 0.5 Radii

`48px` section shells (≥768) → `40px` (991–768) → `28px` (≤767).
`32px` customer slides / flow tab-bkg; `24px` update cards, media wells, nav dropdown bottom;
`20px` textarea; `18px` logo cards; `16px` hero-CLI panel; `14px` callout logo chips;
`12px` buttons + tab pills; `10px` social chips + hero-CLI icon chips; `8px` hero-CLI inner row;
`1600px` (pill) feature pills; `100px` line-link underline.

### 0.6 Section rhythm & hairlines

Section `padding` (block): `64px 0` ≥768 → `48px 0` at 991–768 → `40px 0` ≤767.

`.frame_line` — 1px full-bleed hairline, `background: #F4F3F0`, `max-width: 1344px`, absolutely
positioned at the section edge. Instances at y = **1352** (flow top), **2342** (flow bottom),
**2861** (prompt bottom), **6779** (customer top), **7554** (updates top).
Each carries two 80×1 `.frame_gradient` fade caps, inset 0 from each end:
left `linear-gradient(90deg,#fff,rgba(255,255,255,0))`, right the reverse.

`.frame_shadow` — 1280×64 block at y=1224 (bottom of logo section) with
`box-shadow: #fff 0 20px 64px 24px` — a white bloom that hides the marquee edge.

### 0.7 Section outline @1280 (verified)

| # | section | class | y | h | bg |
|---|---|---|---|---|---|
| 1 | Hero | `.section_home-hero` | 0 | 1072 | `#035D44` |
| 2 | Logo / social proof | `.section_home-logo` | 844 | 508 | transparent (inner `#F4F3F0`) |
| 3 | Flow (use-case tabs) | `.section_home-flow` | 1352 | 991 | transparent |
| 4 | Prompt | `.test-hide_base > .section_input-action` | 2343 | 519 | transparent |
| 5 | Features (4 sticky cards) | `.section_home-features` | 2862 | 3004 | transparent |
| 6 | Reps | `.section_home-reps` | 5866 | 913 | inner `#F4F3F0` |
| 7 | Customer slider | `.section_home-customer` | 6779 | 775 | transparent |
| 8 | Updates grid | `.section_home-updates` | 7554 | 1061 | `linear-gradient(rgba(255,255,255,0) 35%, #fff)` |
| 9 | Footer | `.section_footer` | 8615 | 1566 | `#FFFDF9` + `linear-gradient(#fff, #FFFDF9 15%)` |

Total document height: 1440→**10283**, 1280→**10180**, 1024→**9924**, 992→9883,
991→**13431**, 768→**12299**, 767→**14531**, 480→12074, 479→11928, 390→**11389**.

Note §2 overlaps §1: `.home-logo_content` has `margin-top: -228px`, and
`.home-hero_intro` has `margin-bottom: 228px`. Hero section is `overflow: hidden` so the logo
panel visually punches into the green.

---

## 1. Navigation bar

```
.nav__layout  x=32 y=44 w=1216 h=58.8
  background #FFFFFF; border-radius 0 0 24px 24px;
  border-bottom 1px solid rgba(209,205,199,0.5);
  padding 7.52px 24px 8.48px;  transition: border-color .25s ease-out, background-color .25s ease-out
```
Floating, not sticky: `position: static` in the document flow, sitting 44px below page top (a
promo banner occupies y 0–44). Height 57px at ≤991.

Children:

| element | x | y | w | h | notes |
|---|---|---|---|---|---|
| `.nav__layout--start` | 57 | 52 | 474.8 | 41.8 | flex row |
| `.nav__brand--wrap` → logo img | 57 | 61 | 72 | 22.5 | `Clay primary logo.avif`, intrinsic 509×163, `object-fit: cover` |
| `.nav__list--main` | 146.2 | 52 | 385.6 | 41.8 | flex row |
| `.nav__layout--end` / `.nav_cta` | 855.6 | 53 | 367.4 | 38.9 | flex row, `gap: 6.4px` |

Top-level links — `padding: 10.4px 8px`, h 41.8, 16/400/24:

| label | x | w |
|---|---|---|
| Product | 148.3 | 67.4 |
| Solutions | 219.8 | 75.9 |
| Resources | 299.9 | 82.8 |
| Company | 386.9 | 77.9 |
| Pricing | 468.9 | 60.8 |

Right cluster:

| element | x | y | w | h | style |
|---|---|---|---|---|---|
| `⌘ K` search | 855.6 | 55 | 70 | 35 | 12.8/400/19.2, `padding: 6.4px`, `gap: 3.2px`, bg transition `.25s cubic-bezier(.075,.82,.165,1)` |
| `Log in` | 926.5 | 56 | 61 | 32 | 12.8/500/19.2, `gap: 3.2px` |
| `Get a demo` | 987.6 | 53 | 106.8 | 38.9 | bg `#F3F2ED`, `border-radius 12px`, `padding: 8px 16px`, `gap: 6.96px`, 13.92/500 |
| `Start free trial` | 1102.4 | 53 | 120.6 | 38.9 | bg `#000`, color `#fff`, same box metrics |

### 1.1 Mega-menu panel

One shared shell, `.nav__dropdown--main`, holds all four panes; hovering a top-level link swaps
the pane and animates the shell height.

```
.nav__dropdown--main
  x=32  y=44  w=1216  h=328   (i.e. exactly container-width, flush under the bar)
  background #FFFFFF
  border-radius 0 0 24px 24px
  border 1px solid rgba(209,205,199,0.5)
  box-shadow: none
  padding: 0
  > .nav__dropdown--inner  x=33 y=45 w=1214 h=326
```
Pane geometry: `.nav__section--main` w 1214, h 328, `padding: 80px 0 24px`
→ `.nav__section--container` (w 1214, `padding-inline: 21.24px`)
→ `.nav__section--layout` (w 1171.5, flex row, h 224, top at y=125).

Column x-origins inside the pane: **54 / 274 / 493 / 712**, plus a promo card whose text block
starts at **x=947**. Group-heading baseline y=125 for every pane. Two item-row rhythms exist:

* **Product & Company panes** — icon-led rows: text x = heading x + 40; item y = 158 / 200 / 242 / 284 (**42px** pitch).
* **Solutions & Resources panes** — plain rows: text x = heading x; item y = 152 / 181 / 211 / 240 / 270 (**≈29.5px** pitch).

Promo card (right edge of every pane): image 294.4×224 at y=125, eyebrow at (947, 276) —
12/600/1.08px uppercase `#fff`; title at (947, 295) — 16/500 `#fff`.

**Real menu contents** (headings uppercase 10/600/0.8px `#79756D`; items 14/550/−0.14px `#000`):

**Product** — cols at 54 / 274 / 493 / 712
* DATA INFRASTRUCTURE → Audiences, Data marketplace, Signals and Intent, Waterfall
* AGENTS → Claygents, Account Agents, Agent plugin CLI/API, MCP for reps
* ORCHESTRATION → Workflows, Functions, AI formatting
* EXECUTION → Ads, Sequencer
* promo: **CLAY MCP** — "Give reps the best prospecting data in their AI tools" — image `6a591a9e3e484c06e9ad7def_MCP.jpg` (500×472)

**Solutions**
* DATA FOUNDATIONS → CRM enrichment, TAM sourcing, Territory planning, Reverse ETL
* PIPELINE GENERATION → Outbound, Automated inbound, PLG assist, ABM
* REP PRODUCTIVITY → Rep prospecting, Account research, Rep assist
* DEPARTMENT → GTM Ops, Marketing, Sales, Enterprise, Startup
* promo: **INTERCOM** — "Grew their outbound-sourced pipeline by +140%" — `69a8cff4ee3cb50deaa6b048_intercom-p-500.avif` (268×267)

**Resources**
* LEARN TO BUILD ON CLAY → University, Guides, Livestreams, Cohort live classes
* CONNECT WITH GTM ENGINEERS → Clay community, Slack, Live events, Startup program, Campus ambassadors
* WORK WITH GTM ENGINEERS → Find Clay experts
* PARTNER WITH CLAY → Become a partner, Solution partners, Integration partners, Private Equity
* promo: **CLAY COMMUNITY** — "In Nigeria, she built a life where money wouldn't decide" — `699c92ab9bfd079f17f3fdb2_Untitled design (1)-p-500.avif` (268×151)

**Company** — cols at 54 / 347 / 639 (wider, 3 groups)
* OUR COMPANY → About, Careers, Open roles, Blog
* GET IN TOUCH → Contact, Press
* SOCIALS → LinkedIn, YouTube
* promo: **ARTICLE – NY TIMES** — "Clay allows employees to sell shares at a $5b valuation." — `69a1f1f3a080096c6cf4cbfa_company-ads-v0-p-500.avif` (268×156)

**Pricing** has no panel.

### 1.2 Mobile nav (≤991)

`.nav__layout` x=9.8, y=0, w=370.5, h=57, bg `#fff`, radius `0 0 24px 24px`,
padding `7.52px 24px 8.48px`. Opened panel: `.nav__section--container` w 368.5,
`padding: 0 16px`, inner `.nav__section--layout` w 336.5, content height up to **956.8px**,
scrollable, single column, all groups stacked in source order.

---

## 2. §1 Hero (y 0–1072)

```
.section_home-hero  1280×1072  display:flex; flex-direction:column;
  min-height: 832px;  position: relative;  overflow: hidden;  background: #035D44
```
Measured section height by breakpoint: **1072** (≥992) · **736** (991–768) · **704** (767–480) · **640** (≤479).

Layer order (back → front):
1. `.video-bg.cc-full` — `position:absolute; inset:0; overflow:hidden`, 1280×1072
   * `.video-bg__iframe-wrapper.cc-short` absolute inset 0
   * `.video-bg_poster.cc-hero` absolute inset 0, `opacity: 0` (after video ready), `transition: opacity .3s ease`
     * `img.image-cover.cc-home-hero` 1280×1072, `object-fit: cover`, `transform: translateY(-53.6px)`, `loading=eager`, src `6a231084ed9c142b6d5c41c6_hero-still_v3-p-1600.avif` (intrinsic 1280×606)
   * `video.video-bg__video` absolute inset 0, 1280×1072 rendered, **intrinsic 3000×1500**, `object-fit: cover`, autoplay + loop + muted + playsinline, `preload="metadata"`, duration **17.14s**, src `https://assets.clayrun.dev/Hero%2006-02%20Lossy%200001-0240.mp4`
2. `.home-hero_shade` — absolute, `top: 892px`, 1280×180, `linear-gradient(rgba(255,255,255,0), #fff)`
3. `.container-regular` — x=32, y=596, 1216×476 (content sits at the bottom of the green)

Content:

```
.home-hero_intro   x=32  y=596  1216×248
  display:flex; flex-direction:row; gap:16px; padding:0 48px 72px; margin-bottom:228px
```
* `.home-hero_title` x=80 y=596 **720×176**, flex col `gap:14px`, `max-width:720px`
  * `h1.heading-style-h1.cc-home-hero` 720×176 — 88/575/88/−3.52px, `#FEFDFB` — "Build systems to grow revenue"
* `.u-stack-md` x=857.8 y=607.4 342.16×164.6, flex col `gap:24px`
  * `.home-hero_text` `max-width:320px` → `p.text-size-large.u-text-balance` 320×93.6, 24/400/31.2, `#FEFDFB`
  * `.home-hero_actions` y=725 → `.button-group.cc-fill` flex row `gap:10px`, h 47
    * `a.btn` x=857.8 **175.03×47**, bg `#FFFFFF`, radius 12, `padding: 9px 18px`, `gap: 9px`, `border: 1px solid transparent`; label 18/500/27/−0.18px `#000` "Start free trial"; trailing `.btn_icon-track` 16×18 `overflow:hidden`
    * `a.btn` x=1042.9 **157.13×47**, bg `rgb(203,216,16)` (`#CBD810`), same box metrics, "Get a demo"
  * `.hero-cli` x=857.8 y=772 342.16×48, radius 12, `margin-bottom: -48px`
    * `.hero-cli_top` y=780 342.16×40, flex row `gap:12px`, `margin-top: 8px`, radius 12, bg `rgba(255,255,255,0)`, `transition: background-color .1s linear`
      * `.text-size-small` 135.8×18.2, 14/400/18.2, `#FEFDFB` — "or install directly with"
      * `.hero-cli_icon-list` x=1005.6 84.78×25.6, flex row `gap:4px` → 3 × `.hero-cli_icon` 25.6×25.6, bg `rgba(255,255,255,0.1)`, radius 10, inner img 20–24px
    * `.hero-cli_bottom` **`position:absolute; bottom:-120.5px`**, 342.16×120.5, bg `#FEFDFB`, radius 16, `box-shadow: rgba(21,21,24,0.1) 0 12px 36px -8px`, initial `opacity: 0; transform: translateY(6px)` — revealed on hover of `.hero-cli_top`
      * `.hero-cli_block.cc-top` 342.16×53.8, flex row, `padding: 9.6px 9.6px 9.6px 24px`; title 16/500/22.4 `#1B1A18`; `.btn.cc-copy` x=1110.7 79.7×34.6 bg `#000` radius 12 `padding: 7.2px 12.4px` `gap: 6.4px`, label 14/500/18.2 `#fff`, `transition: transform .6s cubic-bezier(.19,1,.22,1), background-color .3s cubic-bezier(.075,.82,.165,1)`
      * `.hero-cli_block` 342.16×66.8, `padding: 0 8px 8px`, `gap: 32px` → `.hero-cli_inside` 326.2×58.8 bg `#F4F3F0` radius 8 `padding: 11.2px 16px`; mono-ish 14/400/18.2, muted span `color(srgb .1059 .1020 .0941 / .75)`

Hero responsive: `.home-hero_intro` becomes `flex-direction: column` at ≤991 with
`padding: 0 40px 32px; gap: 24px`; at ≤767 `padding: 0 28px 32px; gap: 16px` (390: gap 16).
`.home-hero_title` `max-width` 720 → **560** (≤991) → **400** (≤767) → **320** (≤479).
`.home-hero_actions` is `flex-direction: column` at all widths (the two buttons sit in the
nested `.button-group` row).

---

## 3. §2 Logo / social-proof marquee (y 844–1352)

```
.section_home-logo   1280×508   padding: 0 0 64px;  position: relative
  .container-regular  x=32 y=844 1216×444
    .home-logo_content  1216×444
      display:flex; flex-direction:column; gap:32px;
      padding: 48px 0;  margin-top: -228px;  min-height: 320px;
      border-radius: 48px;  background: #F4F3F0;  overflow: hidden
```
* `.home-logo_intro` x=280 y=892 **720×52**, `max-width:720px`, centered, `margin-inline: 248px`
  → `.text-size-medium.u-text-balance` 20/400/26 `#000`; the words "customers" and "love" are
  `a.span-link > span.text-weight-bold` (20/**600**/26).
* `.home-logo_wrap` x=32 y=976 1216×264, `overflow: auto` → inner clip div `overflow: hidden`
  * **3 identical copies** of `.home-logo_base`, each `position:absolute; right:-1015px`,
    **2231×264**, `display:grid`, `gap: 12px`, `padding-left: 12px`,
    `grid-template-columns:` `139.77 96.23 193.63 91.77 157.23 136 147.33 132.44 76.31 76.31 160.80 160.80 160.80 160.80 160.80` px (15 tracks),
    3 implicit rows of 80px + 12px gap (row pitch **92px**: card tops at y 976 / 1068 / 1160).
    Copies are offset by exactly **2231px** and translated together (see §11.3).
  * Cards `.logo-card`: `display:flex`, `gap:16px`, `padding: 16px 20px`, `border-radius: 18px`,
    `background: #FEFDFB`, `border: 1px solid #FFFFFF`. Variants (`data-wf--logo-card--variant`):
    `only-logo` (h 80, logo only, flex-col), `base` (h 172, logo + quote, flex-col),
    `horizontal-quote` (h 80, flex-row, logo + 328px quote), `horizontal-stat` (h 80, flex-row,
    logo + `.home-logo_stat` 30.2px tall, `gap: 8px`), a tall stat variant (h 172, `data-tall=2`,
    stat block 61×49.3, flex-col `gap: 0`). Multi-row cards use `data-span` 1–3 and `data-tall`.
    * `.home-logo_height` = logo slot, height **32px** (some 36px, 28.8px, 24px, 16px per brand)
    * `.home-logo_quote` flex col `gap: 5.6px`, width 208 / 224 / 328 px by variant
    * `.clickable_wrap` absolute inset 0 radius 18; `.home-logo_arrow` 12.8×12.8 absolute `top:8px; right:8.8px`
  * `.home-logo_shade` × 2 — 243.19×264, absolute at each edge:
    left `linear-gradient(270deg, rgba(244,243,240,0), #F4F3F0)`,
    right `linear-gradient(270deg, #F4F3F0, rgba(244,243,240,0))`
* `.logo_cursor` — `position: fixed`, 1×1, `opacity: 0`, `transform: scale(.8)`; child
  `.logo_user` 119.4×41 (rendered 95.5×41), flex row `gap: 12.8px`, `padding-right: 17.6px`,
  radius 16, bg `#F4F3F0`, `box-shadow: rgba(0,0,0,.15) 0 4px 8px`; avatar 51.19→41×41 radius 16.
  A fake multiplayer cursor that follows the pointer over the marquee (`data-logo-hover` toggles).

Brand logos rendered (all `object-fit: cover`, `loading=eager`, 24–36px tall): vanta 90.5×36,
ramp 105.9×28.8, stripe 75.5×32, figma 82.6×32, Notion 92.4×32, google 102.2×32, workday 67.1×32,
Perplexity 107.3×24, openai 116.3×32, anthropic 137.4×16, cursor 128.9×32, hubspot 92.4×32,
rippling 120.9×32, verkada 114.7×32, intercom 140.4×32, Canva 83.5×32, okta 97.8×32, uber 66.7×32,
elevenlabs 121.8×32, eBay 79.8×32, Siemens 108.4×32.

Responsive: `.home-logo_content` `padding: 40px 0` / radius 40 (≤991), `padding: 28px 0` /
radius 28 (≤767). Marquee track width 2203 @1440, 2231 @1280/1024, 2191 @768, 2060 @390 (track
list reflows as logo intrinsic widths change).

---

## 4. §3 Flow / use-case tabs (y 1352–2343)

```
.section_home-flow   1280×991   padding: 64px 0;  position: relative
  .frame_line at top (y 1352) and .frame_line.cc-bottom at y 2342
  .container-regular  x=32 y=1416 1216×863.4
```
**Header block** `.u-stack-md` 1216×296, flex col `gap: 24px`:
* `.home-flow_title` x=320 y=1416 **640×144**, `max-width: 640px`, centered, flex col `gap: 12.8px`
  → `h2.heading-style-h2.u-text-balance` 72/500/72/−2.16px — "GTM engineers build on Clay"
* `.home-flow_stack` y=1584 1216×128, `display:grid; grid-template-columns: 1216px; gap: 32px`
  * `.home-flow_text` x=368 y=1584 **544×52**, `max-width: 592px`, grid, `position: relative` —
    all **7** `.home-uses_text.cc-1…7` are stacked here; inactive: `opacity: 0; transform: scale(.98)`.
    Per-variant `max-width`: cc-1 480, cc-2 400, cc-3 544, cc-4 496, cc-5 480, cc-6 512, cc-7 448.
    Copy → `p.text-size-medium.u-text-center` 20/400/26 centered:
    1. Find every account in your TAM in one place.
    2. Enrich, score, and route every lead to the right rep in minutes.
    3. Prioritize the highest-converting leads using real-time intent and engagement signals.
    4. Personalize outreach with live intent signals to reach the right buyers at the right time.
    5. Keep CRM records accurate, complete, and continuously refreshed with live data.
    6. Turn top accounts from your CRM into precision ad campaigns on LinkedIn, Meta and Google Ads.
    7. Automate research, prep, and follow-ups to let reps spend time closing deals.
  * `.home-flow_tab-wrap` x=81 y=1668 **1118×44**, `position: relative; overflow: hidden`
    * inner track 5587.34×44, `transform: translateX(1444.86px)` — **5 copies** of
      `.home-flow_tab-list` (1117.47×44, flex row `gap: 8px`, `padding-right: 8px`, `min-height: 32px`), pitch **1117.47 + 8 = 1117.5px** between copies (copy x: −708.8, 408.7, 1526.1, 2643.6, 3761.1)
    * `.tab-btn` — `padding: 10px 16px`, h 44, radius 12, bg `#F4F3F0`, 16/500/24 `#1B1A18`.
      Active adds `cc-active` + the accent bg. Order and widths:
      TAM Sourcing 133.66 · Automated Inbound 179.38 (`cc-lime`, active bg `#EEF773`) ·
      Lead Scoring 128.17 (`cc-ube`) · Automated Outbound 193.80 (`cc-tangerine`) ·
      CRM Enrichment 156.23 (`cc-blueberry`) · Launch Ads 117.28 (`cc-pomegranate`) ·
      Rep Productivity 152.95 (`cc-dragnfruit`)
    * `.home-flow_shade` × 2 — 279.5×44 at each edge,
      left `linear-gradient(270deg, rgba(255,255,255,0), #fff)`, right the mirror

**Card stage** `.home-flow_base` x=32 y=1712 1216×567.4, flex col `gap: 32px`
→ `.home-flow_tab-base` → `.home-flow_bkg-list` 1216×567.4,
`display: grid; grid-template-columns: 1216px; gap: 80px; border-radius: 48px` — **all 7
`.home-flow_card` overlaid in one grid cell**; only the active has `opacity: 1`.

Per card:
* `.home-flow_tab-bkg` — `position: absolute; top: 175.23px`, 1216×392.2, radius 32, `overflow: hidden`, accent bg. Colors in card order: `#3BD3FD`, `#CBD810`, `#A17BF9`, `#FF7714`, `#BEDFFE` (`cc-200`), `#FB4450`, `#FF70D2`.
  * `.textures` absolute inset 0, 1220×396.2, `margin: -2px` (noise overlay)
  * `.home-flow_bkg-spacer` `padding-top: 392.156px`
* `.home-uses_spacer` — `display: grid; grid-template-columns: 1216px; gap: 16px; position: relative`, holds 1–2 screenshot images:
  * `img.home-flow_ui-bkg` 1216×543.4 (or 543.1), `object-fit: cover`, `loading=lazy`,
    `max-width: 100%`. Two-image cards offset the pair: one `left: 36px, margin-right: -36px`,
    the other `right: 36px, margin-left: -36px`, with per-image vertical offsets
    (`top` −32.25 … +63.75px, plus `transform: translateY(0|24px)`).
  * `.home-uses_clip` 1216×543.1 `overflow: hidden`
  * `.home-uses_fade` — `position: absolute; top: ~298.8px`, 1216×244.5, `overflow: hidden` (bottom mask)

Card-to-image map (see §9 for full asset list): card1 `case-2`+`case-1`(`cc-a`,`cc-b`);
card2 `case-13`+`case-12`(`cc-i`,`cc-h`); card3 `case-7`+`case-6`(`cc-d`,`cc-c`);
card4 `case-10`+`case-9`(`cc-g`,`cc-f`); card5 `case-4`(`cc-e`, single, `left:-42.55px`);
card6 `case-23`+`case-22`(`cc-m`,`cc-l`); card7 `case-16`+`case-15`(`cc-k`,`cc-j`).

Responsive: title `max-width` 640 → 480 (≤991) → 320 + `padding-inline: 19.2px` (≤479);
`.home-flow_bkg-list` track = container width at every step (596 h @1440, 458 @1024, 350 @768,
370.5 @390). Tab track keeps its intrinsic 1117.5px list width down to 768, 1008.6 @390.

---

## 5. §4 Prompt / "What do you want to build?" (y 2343–2862)

```
.test-hide_base > section.section_input-action  1280×518.6  padding: 48px 0;  position: relative
  .frame_line.cc-bottom at y 2861
  .container-regular  x=32 y=2391.4 1216×422.6
    .home-action_content  1216×422.6  flex col; padding: 64px 0; border-radius: 48px
      .u-stack-md  y=2455.4 1216×294.6  flex col gap:24px
```
* `.home-action_title` x=361.5 y=2455.4 **557×48**, centered, `margin-inline: 329.52px`
  → `h3.heading-style-h3` 48/500/48/−1.92px — "What do you want to build?"
* `form.home-action_form` x=320 y=2527.4 **640×222.6**, `max-width: 640px`, `margin-inline: 288px`, flex col `gap: 0`
  * `.home-action_wrap` 640×160, `position: relative`
    * `textarea.home-action_input` x=328 y=2535.4 **624×144**, `margin: 8px`, `padding: 11.2px 16px 16px`, `min-height: 144px`, `border-radius: 20px`, bg `#FFFFFF`, `border: 0`, 16/400/20.8/−0.16px `#1B1A18`, `overflow: auto`.
      Placeholder is animated/typed — captured value: `"Find companies with 30+ sales r|"` (trailing caret char). Treat as a typewriter placeholder cycle.
    * `.home-action_scale` **absolute inset 0**, rendered 645.7×161.4 (`transform: scale(1.0089)`), radius 23.2, bg `#FFFFFF`,
      `box-shadow: rgba(0,0,0,.12) 0 12px 24px -12px, rgba(209,205,199,.6) 0 0 0 1px inset`,
      `transition: box-shadow .5s cubic-bezier(.19,1,.22,1)` — the focus-scale frame behind the textarea
  * `.home-action_button-list` x=340 y=2687.4 **600×62.6**, `margin-inline: 20px`, flex row `gap: 10px`, `padding: 11.2px`, `border-radius: 0 0 23.2px 23.2px`, bg `#F4F3F0`
    * `.home-action_button-group` 530.8×62.6, flex row `gap: 8px`, `padding: 11.2px`, `margin: -11.2px 0 -11.2px -11.2px`, `overflow: auto`
      * 3 × `.tab-btn.cc-light` h 40.2, radius 12, bg `#FEFDFB`, 16/500/24 `#7B7974`, `padding: 10px 16px`,
        `transition: color .15s linear, background-color .15s linear`:
        "Find people data" x=351.2 w=139.4 · "Find company data" x=498.6 w=154.7 · "Find jobs data" x=661.3 w=121.8
    * `button.home-action_button.u-md-hide` x=880.8 y=2698.7 **48×40**, radius 12, bg `#1B1A18` (submit)

Responsive: `padding: 48px 0` (≤991) → `padding: 16px 8px; gap: 20px` (≤479). Form width stays
640 down to 768; 354.5 @390. Content radius stays 48 at all widths.

---

## 6. §5 Features — 4 sticky stacked cards (y 2862–5866)

```
.section_home-features  1280×3004  padding: 64px 0 48px
  .container-regular  x=32 y=2926 1216×2892
    .home-feature_list  1216×2892  border-radius: 48px; overflow: clip
```
Four `.home-feature_theme` children, each `position: sticky; top: 72px` with
`margin-bottom: -48px`; pitch **723px** (tops at y 2926 / 3649 / 4372 / 5095). Inner
`.home-feature_item` is 1216×**771** with `padding-bottom: 48px; margin-bottom: -48px`, so the
visible card is 723 tall and the last (`cc-end`) theme is 723 with radius `0 0 48px 48px` +
`overflow: hidden`; the others carry radius `48px 48px 0 0`.

```
.home-feature_item  display: grid; grid-template-columns: 608px 608px; gap: 0
```
**Left column** `.home-feature_left` 608×723, flex col `gap: 32px`, `padding: 48px 0 64px 48px`
(4th card: `48px 0 48px 48px`):
* `.u-stack-sm` x=80, 560 wide, flex col `gap: 16px`
  * `.home-feature_tag` h 32 — a `display:grid` strip of 4 `.home-feature_pill`s
    (`padding: 0 12px`, `border-radius: 1600px`, 12/600/18/3px uppercase). Only one is
    `cc-active` (white text on the deep accent); the other three are 68px-wide collapsed stubs in
    the light accent, overlapping by 15.2px (grid tracks e.g. `14.27 15.20 15.20 15.20` for card 1).
    Active pill is the one matching its card, and its index advances with the card
    (card1 pill 1 at x=80 w=67.1; card2 pill 2 at x=95.2 w=90.3; card3 pill 3 at x=110.4 w=163.5; card4 pill 4 at x=125.6 w=119.1).
    Active/idle bg pairs: `#395AFA`/`#BEDFFE`, `#B53D0A`/`#FCC9AB`, `#808000`/`#EEF773`, `#CC089E`/`#F8B9E4`.
  * `.eyebrow-text` inside the active pill — 12/600/18/3px `#fff`
  * `.u-stack-rg` 560 wide, flex col `gap: 20px` → `h3.heading-style-h3.u-text-balance`
    48/500/48/−1.92px in the card's deep text color, then body copy
* `.home-feature_btm` (card 4: `.u-stack-lg`) flex col `gap: 32px`
  * `.home-feature_companies` **400×109.8**, `max-width: 400px` — a `.call-out` with
    `gap: 12px`: `.call-out_top` 402×43.2 holding 3 × `.call-out_logo` 43.2×43.2
    (radius 14, bg `#fff`, `box-shadow: <accent-200> 0 0 0 2px inset`, `margin-right: -11.2px`
    → 32px pitch, inner `.call-out_mark` 24×24); then `.call-out_quote` 400×54.6
    `display: grid; gap: 16px` with **3 stacked `.call-out_item`s**, inactive
    `opacity: 0; transform: scale(.98)`. Quote text 14/400/18.2 with a 14/**700** lead-in
    company name. Card-1 rotation includes: "Anthropic 3x'd their enrichment rate with Clay's
    data marketplace." / "Intercom grew outbound pipeline 140% by continuously researching
    target accounts for headcount change, technographics, and web intent." Card 2 includes
    "OpenAI used Clay to fully automate pre-call prep…" / "Canva saved 4 hrs/rep/week…";
    card 3 "ElevenLabs' increased SQLs by +50%…" / "Verkada 2x'd warm lead replies…";
    card 4 "Rippling 2x'd cold email performance…" / "Legora increased qualified lead volume +60%…".
  * `.button-group` flex row `gap: 10px`, h 42 — two `.btn`s, `padding: 8px 16px`, radius 12,
    `gap: 8px`, 16/500/24/−0.16px. `cc-card-dark` = deep accent bg + white text;
    `cc-card-light` = `#fff` bg + deep accent text. Widths measured:
    card1 157.6 / 217.2 ("Start free trial" / "Explore data marketplace");
    card2 157.6 / 140.3 ("Explore agents"); card3 157.6 / 226.2 ("Explore the GTM data layer");
    card4 157.6 / 263.2 ("Learn more about building plays").

**Right column** `.home-feature_right` x=640, 608×723, `padding: 24px`
* `.home-feature_img` x=664, **560×675**, `min-height: 100%`, radius 24, bg `#fff`, `overflow: hidden`
  * `.video-bg` absolute inset 0 → `video.video-bg__video` 560×675 rendered, **intrinsic
    1000×1000**, `object-fit: cover`, autoplay/loop/muted/playsinline, `preload="none"`,
    duration **8.0s**
  * `.video-bg_poster` absolute inset 0, `opacity: 0`, `transition: opacity .3s ease` →
    `img.image-cover` 560×675, intrinsic 960×960, `object-fit: cover`, `loading=lazy`

Card content:

| # | theme class | bg | eyebrow / pill | heading | deep text | video | poster |
|---|---|---|---|---|---|---|---|
| 1 | `cc-top` | `#F0F8FF` | DATA | Get data from the most complete data marketplace | `#001433` | `Data 06-16 1000px.webm` | `Data-Still 1.avif` |
| 2 | `cc-tangerine` | `#FFF3ED` | AGENTS | Create agents who mimic your best reps | `#381005` | `Agents 06-16 1000px.webm` | `Agents-Still 1.avif` |
| 3 | `cc-lime` | `#FCFEE2` | ORCHESTRATION | Orchestrate workflows across tools in real time | `#102B03` | `Orch 06-16 1000px.webm` | `Orch-Still 1.avif` |
| 4 | `cc-dragonfruit cc-end` | `#FFF0FA` | EXECUTION | Launch new plays as fast as you have ideas | `#46022F` | `Execution 06-16 1000px.webm` | `Execution-Still 1.avif` |

Responsive: `grid-template-columns` `640px 640px` @1440 · `608 608` @1280 · `486.4 486.4` @1024 ·
**single column** at ≤991 (`729.59px`), with `.home-feature_left` `padding: 40px 40px 56px;
gap: 64px` and `.home-feature_right` `padding: 0 20px 20px`, media radius 16, item height 1239.5.
At ≤767 left `padding: 20px 20px 44px; gap: 48px`, radius 28/14, item height 984.9 @390.

---

## 7. §6 Reps (y 5866–6779)

```
.section_home-reps  1280×912.6  padding: 0 0 64px
  .container-regular x=32 y=5866 1216×848.6
    .home-reps_content  1216×848.6  flex col; gap:32px; padding:48px;
      border-radius:48px; background:#F4F3F0; box-shadow: #FFFFFF 0 24px 64px 24px
```
* `.home-reps_top` x=80 y=5914 **1120×216.6**,
  `display: grid; grid-template-columns: 544px 544px; gap: 16px 32px; padding-bottom: 16px`
  (row-gap 16, column-gap 32)
  * `.eyebrow-text.cc-slushie-400` — full-row (1120 wide), 12/600/18/3px uppercase `#008BAD` — "GTM INFRASTRUCTURE"
  * `.home-reps_intro` x=80 y=5948 544×96, flex col `gap: 20px`, `max-width: 560px` →
    `h3.heading-style-h3.u-text-balance` 48/500/48/−1.92px `#1B1A18` — "Build systems that make
    reps more productive", with `span.home-reps_span` ("reps more productive", 432.9×58) in `#008BAD`
  * `.home-reps_right.cc-top` x=704 y=5948 496×82, `padding-top: 4px`, `max-width: 496px` →
    `p.text-size-medium.cc-small` 496×78, 20/400/26 `#1B1A18`
  * `.home-reps_action` x=80 y=6060 → `a.line-link` flex row `gap: 4px`, 16/500/24 `#1B1A18`
    "Start free trial"; `.line-link_line.cc-oat` absolute `top: 23.59px`, 100.66×2, radius 100,
    bg `#D1CDC7`, `overflow: hidden`; `.line-link_icon` 19.19×19.19
  * `.home-reps_right` x=704 y=6060 496×54.6 → `.call-out` `gap: 24px`: `.call-out_top` 96×43.2
    (3 overlapping `.call-out_logo` 43.2², radius 14, bg `#fff`,
    `box-shadow: #F4F3F0 0 0 0 2px inset`, 32px pitch) + `.call-out_quote` x=822 378×54.6
    `display: grid; grid-template-columns: 378px; gap: 16px` with 3 stacked `.call-out_item`s
    (inactive `opacity: 0; transform: scale(.98)`). Quotes include "Pendo reps hit 200% of quota
    using agents for account research, tailored messaging and pre-call prep." and
    "Hex sales reps got a +50% lift in their close-rate by contacting…"
* `.home-reps_media` x=80 y=6162.5 **1120×504**, radius 24, `overflow: hidden`
  * `.home-reps_spacer` `padding-top: 504px` (16:7.2 ratio spacer)
  * `.video-bg` absolute inset 0 → `video.video-bg__video` 1120×504 rendered, **intrinsic
    1500×750**, `object-fit: cover`, autoplay/loop/muted/playsinline, `preload="none"`, 8.0s,
    `Reps 06-16 1500px.webm`
  * `.video-bg_poster` absolute inset 0, `opacity: 0` → `img.image-cover` 1120×504, intrinsic
    959×479, `Reps-Still 1.avif`

Responsive: `.home-reps_top` grid `576 576` @1440 · `544 544` @1280 · `422.4 422.4` @1024 ·
**1 column** at ≤991 (`649.59px`, gap `16px 32px`, no bottom padding) · at ≤479 `gap: 16px 24px`.
`.home-reps_content` `padding: 40px`/radius 40 (≤991), `padding: 20px`/radius 28 (≤767).
Media: 1184×532.8 @1440 · 1120×504 @1280 · 876.8×394.5 @1024 · 649.6×292.3 @768 (radius 16) ·
330.5×148.7 @390 (radius 14).

---

## 8. §7 Customer slider (y 6779–7554)

```
.section_home-customer  1280×775.1  padding: 64px 0;  position: relative
  .frame_line at y 6779
  .container-regular x=32 y=6842.5 1216×647.1
    .u-stack-lg  flex col; gap: 32px
```
* `.home-customer_title` x=360 y=6842.5 **560×96**, `max-width: 560px`, centered,
  `margin-inline: 328px` → `h3.heading-style-h3` 48/500/48/−1.92px — "Hear from the teams that
  grow with Clay"
* `.home-customer_slider-wrap` x=32 y=6970.5 1216×519.1, `padding-inline: 48px`
  * `.home-customer_base` x=80 **1120×519.1**, `position: relative; overflow: hidden`
    * `.home-customer_slider` 1120×519.1, `min-height: 519.12px`, `overflow: hidden`
      * 3 × `.home-customer_slide` — `position: absolute; top: 259.55px; left: 560px;
        right: -336px; bottom: -244.44px`, **896×504**, `border-radius: 32px`, `overflow: hidden`,
        `max-width: 100%`, each translated: `translate(-1352px, -252px)`, `translate(-448px, -252px)`
        (**centre/active**), `translate(456px, -252px)`. Slide pitch **904px** = 896 + 8px gap.
        Rendered x: −712 / **192** / 1096. Centre slide is inset (1120−896)/2 = **112px** from
        each side of the base.
      * Slides 1 & 3 (`a.home-customer_slide`): `.home-customers_spacer` `padding-top: 504px`;
        `.home-customer_content` absolute inset 0, `padding: 40px`;
        `.home-customer_overlay` 896×201.6 (bottom scrim); `.home-customer_btm` 352 (slide 1) /
        464 (slide 3) wide × 95.9, 16/500/24 `#FEFDFB`; `h*.text-size-large` 24/400/31.2 `#FEFDFB`
        — "How Hex increased inbound win-rate 50% using Clay" / "How Verkada GTM team expanded in
        28 European countries using Clay" + "Read case study" link.
        Posters: `hex.avif` (896×504) and `v-logo-ph.avif` (896×504), `object-fit: cover`.
      * Slide 2 is a **custom video player** `.video-player_wrapper` 896×504:
        `.video-player_poster` (`padding: 40px`) + `.home-customer_content.cc-video-player`
        (`padding: 64px 40px 40px`). Two `<video>` elements share the box:
        an autoplay loop teaser `Clay-Hero (3) (1).mp4` (intrinsic 1920×1080, 6.014s,
        muted/loop/autoplay, `preload="metadata"`) and the real asset
        `euro_case_study_final_v1_(2)_(1)_v1 (1080p).mp4` (intrinsic 1920×1080, **210.26s**,
        `paused`, not muted, not looping, `preload="metadata"`, `playsinline`).
        Controls: `0:00 / 3:30` label, `.video-player_controls`
        (`transition: opacity .2s ease`), `.video-player_btn.cc-tooltip`
        (`transition: opacity .15s ease`), `.video-player_range-clip`
        (`transition: width .55s cubic-bezier(.625,.05,0,1)`), and a "Start free trial" CTA.
        Poster image `video-clay-ph.avif` (896×504).

Responsive: slide width 947.2 @1440 · 896 @1280 · 701.4 @1024 · 519.7 @768 (radius 24) ·
333.4 @390 (radius 20). Base width tracks container − 96 (the 48px side padding) until ≤767,
where `.home-customer_base` = full container width (370.5 @390).

---

## 9. §8 Updates grid (y 7554–8615)

```
.section_home-updates  1280×1060.9  padding: 64px 0 96px;
  background-image: linear-gradient(rgba(255,255,255,0) 35%, #FFFFFF)
  .frame_line at y 7554
  .container-regular x=32 y=7617.6 1216×900.9
    .u-stack-lg flex col gap:32px
```
* `.home-flow_title` x=320 y=7617.6 **640×96**, `max-width: 640px`, centered → `h3` 48/500/48/−1.92px — "Learn more about GTM engineering"
* `.home-updates_grid` x=32 y=7745.6 **1216×772.9** —
  `display: grid; grid-template-columns: repeat(9, 120.89px); gap: 16px` (9 equal tracks;
  cards span 2/4/6 tracks). Card placements measured:

| card | class | x | y | w | h | span |
|---|---|---|---|---|---|---|
| Sculpt conference | `.update_card` | 32 | 7745.6 | 394.7 | 525.2 | 3 cols × 2 rows |
| Get started with Clay | `.update_card.cc-oat` | 442.7 | 7745.6 | 805.3 | 231.7 | 6 cols × 1 row |
| HCUC livestream | `.update_card.cc-pom-light` | 442.7 | 7993.3 | 394.7 | 277.5 | 3 cols |
| Community story (Sandra) | `.update_card.cc-oat` | 32 | 8286.8 | 531.5 | 231.7 | 4 cols |
| Come and join us | `.update_card.cc-white` | 579.5 | 8286.8 | 257.8 | 231.7 | 2 cols |
| Community story (girls) | `.update_card.cc-blueberry` | 853.3 | 7993.3 | 394.7 | 525.2 | 3 cols × 2 rows |

Card anatomy — `a.update_card` flex col `gap: 0`, `border-radius: 24px`, `overflow: hidden`:
* **image-on-top variant**: `.update_img-wrap` full width × 315.7 (radius 24, `overflow: hidden`)
  with `.update_spacer` `padding-top: 315.719px` and `img.image-cover` absolute inset 0
  `object-fit: cover`; then `.update_intro` flex col `gap: 14px`, `padding: 24px`:
  `.eyebrow` 12/600/14.4/1.08px uppercase (accent color) → `.home-update_title` →
  `h3.text-size-large.text-weight-medium` 24/400/31.2 `#000` → `.line-link` flex row `gap: 4px`
  h 24, `margin-bottom: 1.5px` with `.line-link_icon` 19.19×19.19
* **wide variant** (`.home-update_card`, `padding: 24px`, `min-height: 100%`):
  `.home-update_wide` `display: grid; grid-template-columns: 494.22px 247.11px; gap: 16px`
  (reverse variant `.cc-reverse`: `153.17px 306.375px; gap: 24px`); `.home-update_left`
  flex col `gap: 24px`, `max-width: 400px`; `.home-update_wide-img` radius 12 `overflow: hidden`
* **overlay variant**: `.home-update_base.cc-overlay` `display: grid; grid-template-columns: 1fr;
  gap: 16px; min-height: 100%; background: rgba(0,0,0,0.25)`; `.home-update_center`
  `padding-top: 264.42px` (or 172.7px); `.update_center-content` `padding: 96px 24px 24px`
  (or `24px`), flex col `gap: 12px`; full-bleed `img.image-cover.cc-top`
  (`object-position: 50% 0%`) absolute inset 0 behind it

Eyebrow colors: CONFERENCE `#A17BF9`, LIVESTREAM `#FFFFFF`, COMMUNITY STORY `#000000` /
`#429EFF`, COME AND JOIN US `#FEFDFB`.

Responsive: 9 tracks (128px @1440 · 120.89 @1280 · 93.86 @1024) → **2 tracks** at ≤991
(462.72px, grid h 1980.7 @768) → **1 track** at ≤767 (`padding-inline: 16px` at ≤479, grid h
2366.2 @390). `.home-update_wide` collapses to 1 column at ≤991.

---

## 10. §9 Footer (y 8615–10180)

```
footer.section_footer  1280×1565.6  flex col; position: relative;
  background: #FFFDF9 + linear-gradient(#FFFFFF, #FFFDF9 15%);  overflow: clip
```
**CTA block** `.footer-action_intro` x=320 y=8614.5 **640×274.8**, flex col,
`padding-top: 80px`, `margin-bottom: -48px`:
* `.footer-action_title` 640×114.4 centered → `h2` 640×96.8, **44/500/48.4/−0.88px** `#000`,
  `margin-bottom: 17.6px` — "Turn your growth ideas into reality today"
* `.footer-action_description` x=481 318.1×38.4 → `p` 16/400/22.4 centered,
  `margin-bottom: 16px` — "Start for free today. No credit card required."
* `.flex-row.flex-gap-sm.flex-x-center` x=486.4 y=8847.3 307.25×42, `gap: 8px`
  * `a.btn` x=486.4 **157.58×42** — bg `#000000`, `#fff` text, radius 12, `padding: 8px 16px`,
    `gap: 8px`, 16/500/24/−0.16px, `border: 1px solid transparent` — "Start free trial"
  * `a.btn.cc-secondary` x=652 **141.67×42** — bg `#FFFFFF`, `#000` text, `border: 1px solid #000`
  * Each button ends with `.btn_icon-track` 16×16 `overflow:hidden` containing two stacked
    `.btn-icon` 16×16 (`.icon_ph.ph.ph-arrow-right`), both `transform: translateY(-16px)`,
    `transition: transform .4s cubic-bezier(.165,.84,.44,1)` — the classic icon-swap-on-hover

**Video band** `.footer_stack` y=8841.3 1280×1338.8:
* `.footer_spacer` 1280×384, `padding-top: 307.19px`, `min-height: 384px`
* `.footer_video` absolute inset 0 → `.video-bg.cc-footer` 1280×1338.8,
  `background: rgba(244,243,240,0)`
  * `video.video-bg__video.cc-footer` absolute inset 0, 1280×1338.8 rendered, **intrinsic
    3000×3000**, `object-fit: cover`, bg `#FFFFFF`, autoplay/loop/muted/playsinline,
    `preload="none"`, duration **4.0s**, `Footer 05-29 Lossy 0001-0060.mp4`
  * `.video-bg_poster` absolute inset 0, `opacity: 0` → `img.image-cover.cc-top` 1280×1338.8,
    intrinsic 1280×1280, `object-position: 50% 0%`, `Footer-Still (1)-p-1600.avif`

**Link block** `.footer_wrapper` y=9225.3 1280×954.8
→ `.container-regular` x=32 1216×954.8
→ `.footer_content` flex col `gap: 64px`, `padding: 48px 48px 0`,
`border-radius: 48px 48px 0 0`, bg `#F4F3F0`:
* `.footer_grid` x=80 y=9273.3 **1120×699.5** —
  `display: grid; grid-template-columns: repeat(5, 192px); gap: 24px 40px`
  (row-gap 24, column-gap 40). Columns are `.footer-col.flex-col` 192×415.5, flex col `gap: 48px`,
  each holding one or more `.footer-list-wrap` (flex col `gap: 16px`) of
  `h3.footer-list-header` (12/600/13.2/1.44px uppercase `#000`) + `ul.footer-list`
  (flex col `gap: 10px`, `margin-bottom: 20px`) of `a.footer-link`
  (14/400/15.4 `#55534E`, `transition: color .1s ease-out`).
  Row 1 column x: 80 / 312 / 544 / 776 / 1008. Row 2 starts at y=9712.8 (x 80 and 1008).

  | col | headers | items |
  |---|---|---|
  | 1 | USE CASES | Automated inbound, Account research, ABM, PLG assist, Rep assist, Reverse ETL, Outbound, CRM Enrichment, TAM Sourcing |
  | 2 | PRODUCT | Claygent AI, Account Agents, Sculptor, Ads, Sequencer, Multi-provider data enrichment, Audiences, Signals, Workflows, Functions, Integrations, Pricing, Changelog |
  | 3 | BLOG | The rise of the GTM engineer, Finding GTM alpha, Clay reaches 100M ARR, Series C: The GTM engineering era begins now |
  | 4 | RESOURCES | Get started lesson, University, Use case templates, Partner programs, Community, FAQ |
  | 5 | COMPANY | Contact us, About, Careers, Jobs, Integrate with Clay, Status |
  | 1 (row 2) | CUSTOMERS | OpenAI, Vanta, Verkada, Sendoso, Anthropic, Coverflex, Rippling, Mistral AI, Case studies |
  | 5 (row 2) | LEGAL (`.u-md-hide`) | Privacy policy, Terms of service, Do not sell my data |

* `.footer_credit-bar` x=80 y=10036.8 **1120×143.4** —
  `display: grid; grid-template-columns: 290.13px 507.73px 290.14px; gap: 16px;
  padding: 48px 0; border-top: 1px solid rgba(209,205,199,0.5)`
  * `.footer_brand` → `img.footer_logo` **128×41**, `Clay primary logo.avif` (509×163), `loading=eager`
  * `.footer_credit` x=386.1 507.73×46.4, flex col `gap: 1.6px`, centered text:
    "©2026 Clay Labs Inc." (16/400/22.4) and "Born in Brooklyn • Art by Hudson" (16/**600**/22.4)
  * `.social_list` x=1064 136×40, flex row `gap: 8px` — 3 × `a.social_link` **40×40**,
    `border-radius: 10px`, bg `#D1CDC7` (x 1064 / 1112 / 1160)

Responsive: `.footer_content` `gap: 48px; padding: 40px 40px 0`; radius 40 (≤991);
`padding: 28px 28px 0`; radius 28 (≤767).
`.footer_grid` tracks: 5×204.8 @1440 · 5×192 @1280 · 5×143.36 @1024 · **3 cols** @≤991
(260.47px, `gap: 32px 40px`) · **2 cols** @≤767 (320.31px) · 2 cols @390 (141.25px, `gap: 24px 32px`).
`.footer_credit-bar`: 3 cols down to 768 (164.69 / 288.2 / 164.7) → **1 col** at ≤479
(`gap: 20px`, h 264.4). `.footer-action_intro` `padding-top: 48px` at ≤479.

---

## 11. Motion — measured, not inferred

### 11.1 What is *not* there

* **`ScrollTrigger.getAll()` returns an empty array.** GSAP 3.15.0 + ScrollTrigger are loaded and
  registered, but **no scroll-triggered animation is configured on this route**. Do not build
  scroll-progress scrubs.
* **No CSS `@keyframes` are applied to any element.** A computed-style census of every node
  returns zero elements with `animation-name != none`. The stylesheet *defines* 7 keyframes —
  `spin`, `load`, `marquee` (`translateX(-50%)`), `fadein`, `marquee-up` (`translateY(-400%)`),
  `marquee-down` (`translateY(400%)`), `bouncy` (`rotateZ(0 → -4deg → 0)`) — but none are live on
  the homepage. Treat them as available utilities, not as this page's behaviour.
* **No classic scroll-reveal.** Nothing fades/slides up as it enters the viewport. Elements that
  sit at `opacity: 0` do so because they are *inactive carousel slides*, not because they are
  waiting for a scroll.
* 23 `scroll` listeners are registered (Webflow + analytics + the sticky nav bookkeeping), but
  none produce a visible transform.

### 11.2 IntersectionObserver — exactly two

```
// 1. lazy video start — rootMargin 200px, threshold [0], once: true
targets: 8 × video.video-bg__video  (hero, 4 feature, reps, customer teaser, footer)
// 2. customer slider activation — root null, rootMargin 0px, threshold [0], once: false
targets: 1 × div.home-customer_slider
```
Implement observer #1 as: at 200px before entry, `.play()` the video and cross-fade
`.video-bg_poster` from `opacity: 1 → 0` over `.3s ease`. Measured on the hero: poster ramps
`0 → 0.346 → 0.852 → 0.998 → 1` across 0–400ms after load (fade *in* while the video buffers),
then `0.887 → 0.259 → 0.031 → 0` across 2000–2300ms (fade *out* once the video paints) — i.e. a
**300ms `ease` opacity cross-fade in both directions**, triggered by readiness, not by scroll.
The H1 is at `opacity: 1, transform: none` by the first frame after paint — **no hero entrance
animation**.

### 11.3 Logo marquee (§2)

Continuous leftward translate of the 3-copy track. Measured `translateX` over 4.86s:
−158.23 → −211.78 px, linear, **−24.0 px/s** (no easing, no pause). Loop distance = one copy
width = **2231px** → period ≈ **93s**. Implement as a rAF/GSAP `translateX` modulo 2231, or
`animation: marquee 93s linear infinite` on a 2× track.

### 11.4 Flow tab carousel (§3) — the main interaction

* **Dwell: 9150ms** per tab (measured switch times 19207 → 28361 → 37509ms; deltas 9154 and 9148).
* Advance order is the tab order, wrapping 7 → 1.
* **Tab strip**: `translateX` snaps so the active pill is centred. Measured values 1444.86 →
  1283.06 → 1114.06; the delta equals the exact distance between adjacent tab centres
  (179.38/2 + 8 + 128.17/2 = **161.8**, then 128.17/2 + 8 + 193.80/2 = **169.0**) — so the rule
  is `x = wrapWidth/2 − activeTabCentre`. The move settles in **≈750ms** with an ease-out shape
  (sampled at 250ms intervals: 1359.4 → 1290.7 → 1283.1, i.e. ~53% / ~95% / 100% of the distance
  → best-fit `power2.out`/`cubic-bezier(.19,1,.22,1)` over 0.7–0.8s).
* **Card crossfade**: outgoing `.home-flow_card` `opacity 1 → 0` reaching 0.20 / 0.15 / 0.25
  within the first 250ms sample and 0 by 500ms (**≈0.4s**); incoming card is already at
  `opacity: 1` on the same frame the class flips — i.e. **incoming snaps in, outgoing fades out
  behind it**.
* **Caption crossfade**: `.home-uses_text` outgoing → 0.91 → 0 (~400ms), incoming 0 → 0.88 → 1
  over ~750ms, paired with `transform: scale(.98) → scale(1)`. Inactive resting state is
  `opacity: 0; transform: scale(.98)`.
* Clicking a `.tab-btn` jumps to it and restarts the 9150ms timer. Pill `transition:
  color .15s linear, background-color .15s linear`.

### 11.5 Call-out quote rotator (§5 and §6)

3 `.call-out_item`s per group, all groups in lock-step.
* **Dwell ≈ 3630ms** (switch times 70543 → 73873 → 77802 → 81439ms; deltas 3330 / 3929 / 3637).
* Outgoing: `opacity 1 → 0.74 → 0`, `scale 1 → 0.9948 → 0.98` over **≈600ms**.
* Incoming: `opacity 0 → 0.02 → 1`, `scale 0.98 → 0.9805 → 1` over **≈300ms** (fast in, slow out).
* Resting inactive state: `opacity: 0; transform: scale(0.98)`.

### 11.6 Feature card stack (§5)

Pure CSS. `.home-feature_theme { position: sticky; top: 72px }` with `margin-bottom: -48px` and
the inner item's `padding-bottom: 48px` producing the 48px "peek" of the next card's radius.
No JS, no opacity change, no scale. The feature **pill** strip and the accent colours are static
per card — the pill that is `cc-active` is fixed, not animated.

### 11.7 Customer slider (§8)

Drag/click driven only — sampled for 24 continuous seconds with **zero** transform change. Slide
transforms are discrete multiples of the 904px pitch. No autoplay. The non-`once`
IntersectionObserver on `.home-customer_slider` gates the teaser video, not motion.

### 11.8 Nav mega-menu open (§1.1)

Height animation on `.nav__dropdown--main` from 0 to **328px**. Measured heights at 63ms
intervals from hover: **76 → 220 → 286 → 309 → 322 → 327 → 328** px, then flat. Normalised
progress 0.23 / 0.67 / 0.87 / 0.94 / 0.98 / 0.997 / 1 → best fit **~400ms
`cubic-bezier(.19,1,.22,1)` (expo.out)** on `height`. Opacity stays 1 throughout; `transform`
stays `none`. The panel's own computed `transition` is `all 0s` — the height is driven by JS
(GSAP), so animate `height` explicitly rather than relying on CSS. `.nav__layout` itself has
`transition: border-color .25s ease-out, background-color .25s ease-out`.

### 11.9 Full transition census (computed, deduped)

| declaration | count | representative elements |
|---|---|---|
| `color .1s ease-out` | 61 | `a.footer-link` |
| `background-color .3s cubic-bezier(.075,.82,.165,1)` | 20 | `button.brand-popover_btn.btn` |
| `transform .4s cubic-bezier(.165,.84,.44,1)` | 18 | `.btn-icon`, `.btn_icon-track` children |
| `transform .3s ease-out` | 9 | `img.u-img-cover` (nav promo images — hover zoom) |
| `opacity .3s ease` | 8 | `.video-bg_poster` (all 8) |
| `color .15s linear, background-color .15s linear` | 3 | `.tab-btn.cc-light` |
| `background-color .25s cubic-bezier(.075,.82,.165,1)` | 2 | `.nav_search.is--n-menu`, `.nav_item-text` |
| `box-shadow .3s cubic-bezier(.165,.84,.44,1)` | 1 | `a.nav-banner` |
| `color .4s ease, background-color .4s ease` | 1 | `.banner-sculpt` |
| `border-color .25s ease-out, background-color .25s ease-out` | 1 | `.nav__layout` |
| `background-color .1s linear` | 1 | `.hero-cli_top` |
| `transform .6s cubic-bezier(.19,1,.22,1), background-color .3s cubic-bezier(.075,.82,.165,1)` | 1 | `.btn.cc-copy` |
| `box-shadow .5s cubic-bezier(.19,1,.22,1)` | 1 | `.home-action_scale` |
| `opacity .2s ease` | 1 | `.video-player_controls` |
| `opacity .15s ease` | 1 | `.video-player_btn.cc-tooltip` |
| `width .55s cubic-bezier(.625,.05,0,1)` | 1 | `.video-player_range-clip` |

### 11.10 Hover patterns worth reproducing

* **Icon swap** — `.btn_icon-track { overflow: hidden; height: 16px }` with two stacked
  `.btn-icon` 16×16, both pre-shifted `translateY(-16px)`; on hover translate the pair by a
  further −16px over `.4s cubic-bezier(.165,.84,.44,1)`.
* **Line link** — `.line-link_line` is a 2px, `radius: 100px`, `#D1CDC7` bar absolutely
  positioned at `top: 23.59px` with `overflow: hidden`; a `data-line-link="fill"` child wipes
  across it on hover.
* **Hero CLI** — hovering `.hero-cli_top` (bg `rgba(255,255,255,0) → tinted`, `.1s linear`)
  reveals `.hero-cli_bottom` from `opacity: 0; translateY(6px)` to `1 / 0`.
* **Logo marquee cursor** — `.logo_cursor` fades/scales in from `opacity: 0; scale(.8)` and
  tracks the pointer; `data-logo-hover` flips `false → true` on the hovered card.
* **Nav promo image** — `transform .3s ease-out` scale on `img.u-img-cover`.

---

## 12. Asset manifest

### Video (all from `https://assets.clayrun.dev/`)

| section | file | intrinsic | rendered @1280 | fit | flags | dur |
|---|---|---|---|---|---|---|
| hero | `Hero 06-02 Lossy 0001-0240.mp4` | 3000×1500 | 1280×1072 | cover | autoplay loop muted playsinline, `preload=metadata` | 17.14s |
| features 1 | `Data 06-16 1000px.webm` | 1000×1000 | 560×675 | cover | autoplay loop muted playsinline, `preload=none` | 8.0s |
| features 2 | `Agents 06-16 1000px.webm` | 1000×1000 | 560×675 | cover | same | 8.0s |
| features 3 | `Orch 06-16 1000px.webm` | 1000×1000 | 560×675 | cover | same | 8.0s |
| features 4 | `Execution 06-16 1000px.webm` | 1000×1000 | 560×675 | cover | same | 8.0s |
| reps | `Reps 06-16 1500px.webm` | 1500×750 | 1120×504 | cover | same | 8.0s |
| customer (teaser) | `Clay-Hero (3) (1).mp4` | 1920×1080 | 896×504 | cover | autoplay loop muted playsinline, `preload=metadata` | 6.01s |
| customer (feature) | `euro_case_study_final_v1_(2)_(1)_v1 (1080p).mp4` | 1920×1080 | 896×504 | cover | **paused**, not muted, no loop, playsinline, `preload=metadata` | 210.26s |
| footer | `Footer 05-29 Lossy 0001-0060.mp4` | 3000×3000 | 1280×1338.8 | cover | autoplay loop muted playsinline, `preload=none` | 4.0s |

No `poster` attribute is used on any video; the still is a sibling `<img>` inside
`.video-bg_poster` that cross-fades (§11.2).

### Images (CDN base `https://cdn.prod.website-files.com/61477f2c24a826836f969afe/`)

| section | file | intrinsic | rendered | fit / position | loading |
|---|---|---|---|---|---|
| nav + footer | `6778506d788ebf16fef48551_Clay primary logo.avif` | 509×163 | 72×22.5 / 128×41 | cover | eager |
| nav promo | `6a591a9e3e484c06e9ad7def_MCP.jpg` | 500×472 | 294.4×224 | cover | lazy |
| nav promo | `69a8cff4ee3cb50deaa6b048_intercom-p-500.avif` | 268×267 | 294.4×224 | cover | lazy |
| nav promo | `699c92ab9bfd079f17f3fdb2_Untitled design (1)-p-500.avif` | 268×151 | 294.4×224 | cover | lazy |
| nav promo | `69a1f1f3a080096c6cf4cbfa_company-ads-v0-p-500.avif` | 268×156 | 294.4×224 | cover | lazy |
| hero still | `6a231084ed9c142b6d5c41c6_hero-still_v3-p-1600.avif` | 1280×606 | 1280×1072, `translateY(-53.6px)` | cover / 50% 0% | eager |
| banner | `6a9000b05f737fe02f82088d_Default.svg` (Sculpt logo) | 636×135 | 101×28 | contain | lazy |
| logo marquee | `…_vanta.svg` 98×39 → 90.5×36 · `ramp.svg` 103×28 → 105.9×28.8 · `stripe.svg` 85×36 → 75.5×32 · `figma.svg` 93×36 → 82.6×32 · `Notion.svg` 104×36 → 92.4×32 · `google.svg` 115×36 → 102.2×32 · `workday.svg` 109×52 → 67.1×32 · `Perplexity.svg` 161×36 → 107.3×24 · `openai.svg` 109×30 → 116.3×32 · `anthropic.svg` 146×17 → 137.4×16 · `cursor.svg` 145×36 → 128.9×32 · `hubspot.svg` 104×36 → 92.4×32 · `rippling.svg` 136×36 → 120.9×32 · `verkada.svg` 129×36 → 114.7×32 · `intercom.svg` 158×36 → 140.4×32 · `Canva.svg` 94×36 → 83.5×32 · `okta.svg` 110×36 → 97.8×32 · `uber.svg` 75×36 → 66.7×32 · `elevenlabs.svg` 137×36 → 121.8×32 · `EBay_logo.svg` 1000×401 → 79.8×32 · `Siemens-logo…svg` 122×36 → 108.4×32 | | | cover | eager |
| flow cards | `case-1-p-1600.avif`, `case-2-p-1600.png`, `case-4.avif`, `case-5.avif`, `case-6-p-1600.avif`, `case-7-p-1600.avif`, `case-8.avif`, `case-9-p-1600.avif`, `case-10-p-1600.png`, `case-11.avif`, `case-12-p-1600.png`, `case-13-p-1600.avif`, `case-14.avif`, `case-15-p-1600.avif`, `case-16-p-1600.avif`, `case-21.avif`, `case-22-p-1600.avif`, `case-23-p-1600.avif`, `replace-crm.avif` | 1280×572 (`-p-1600`) or 3600×1608 | 1216×543.4 | cover | lazy |
| features posters | `6a230420e94a7c3edcefe6df_Data-Still 1.avif`, `…f8c4e2d47d16de94_Agents-Still 1.avif`, `…9a92a279ce577172_Orch-Still 1.avif`, `…656b77ff82758b42_Execution-Still 1.avif` | 960×960 | 560×675 | cover | lazy |
| reps poster | `6a230ed1b32bb44bb4710471_Reps-Still 1.avif` | 959×479 | 1120×504 | cover | lazy |
| customer slides | `6a16471db36485482904d85c_hex.avif`, `6a16474bc6e0889d2a9e1af1_video-clay-ph.avif`, `6a164762948537452e857d1c_v-logo-ph.avif` | 896×504 | 896×504 | cover | lazy |
| updates | `6a42d02ac96c9652b4a86e47_Content Card.svg` 384×307 → 394.7×315.7 · `6a164e8facfbaa9df371b518_Footer-Illo.avif` 1280×588 → 247.1×183.7 · `6a3a8ef1e9ef8b7642e8f3bb_…HCUC Livestream…` 1080×847 → 394.7×277.5 (`50% 0%`) · `6a164e4f36cd8072834477c6_more-clay-4.avif` 1280×1023 → 394.7×315.7 · `6a164e208220d25c3d28961a_Blog-card-3.avif` 1280×1107 → 257.8×231.7 (`50% 0%`) · `6a19ed63725d3d3f66c4a991_community story.avif` 425×425 → 153.2×183.7 | | | cover | lazy |
| footer still | `6a26fff108a74d8a55ddab89_Footer-Still (1)-p-1600.avif` | 1280×1280 | 1280×1338.8 | cover / 50% 0% | lazy |

### Fonts / CSS

* `…/6a1e067cbcc79b9f76bb28f5_RoobertVF.woff2` — the only brand font actually rendered.
* `https://unpkg.com/@phosphor-icons/web@2.1.1/src/{regular,bold,fill}/style.css` +
  `…/regular/Phosphor.woff2` — icon font.
* Page CSS: `https://clay-webflow-dev.vercel.app/app.css` and
  `…/css/fs-clay.shared.852e9fb65.min.css`.
* Loaded but unused on this route: Space Mono (Google), Inter (Google), Transcend CMP CSS,
  Google GSI style.

---

## 13. Known gaps / not machine-readable

* **Prompt textarea placeholder** cycles through typed strings; only one frame was captured
  (`"Find companies with 30+ sales r|"`). The full string list lives in the page JS and was not
  extracted — pick a plausible 3–4 string rotation matching the three chips.
* **Logo-card copy and brand assignment** is Webflow-CMS driven. Variants, geometry and the full
  brand-logo list are captured above, but the exact quote ↔ brand pairing for all ~39 cards was
  not exhaustively dumped.
* **Nav promo card inner padding** — the panel promo image and text offsets are recorded
  (image 294.4×224 at y=125; eyebrow at 947,276; title at 947,295) but the promo card's own
  border-radius/background were not separable from the image; treat as a 294.4×224 cover image
  with a bottom scrim and 24px text inset.
* **Exact GSAP easings** for §11.4/§11.5/§11.8 are best fits from 60–250ms polling, not read from
  tween vars (the tweens are created lazily and `gsap.globalTimeline` exposed only 13 empty
  paused timelines plus 2 ScrollTrigger refresh stubs). Durations are reliable to ±100ms;
  easings should be read as "ease-out, expo-ish".
* The promo/announcement banner occupying y 0–44 was not specced in detail (it is above the
  nav and outside the 9 listed sections).
