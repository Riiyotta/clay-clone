# Clay homepage clone

A React + Vite + Tailwind v3 rebuild of `clay.com`, measured against the live site
with Playwright-driven Chromium rather than eyeballed.

```bash
npm install
npm run dev
```

## What was measured, not guessed

Every token in `tailwind.config.js` came out of the original's computed styles:

| | Original | Clone |
|---|---|---|
| Container | 1216px @ 1280vw, 32px gutters | same |
| Nav height | 59px, transparent over hero | same |
| Hero | 1072px, `#035D44` | same |
| H1 | 88px / weight 575 / 88px lh / −3.52px ls | same |
| Section H | 48px / 500 / 48px | same |
| Body | 16px / 24px; lead 24px / 31.2px | same |
| Radii | 18px cards, 12px buttons, 24/32px panels | same |
| Palette | `#FEFDFB` `#F4F3F0` `#1B1A18` `#7B7974` `#D1CDC7` | same |
| Accents | `#EEF773` `#BEDFFE` `#FCC9AB` `#F8B9E4` `#FAE188` | same |
| Chapter tints | navy `#001433`, brown `#381005`, olive `#102B03`, plum `#46022F` | same |

### Section heights — verified at 1280px

| Section | Original | Clone |
|---|---|---|
| Hero | 1072 | 1072 |
| Logo band | 508 | 508 |
| Flow | 991 | 991 |
| Prompt builder | 519 | 519 |
| Features | 3004 | 3005 |
| Reps | 913 | 913 |
| Customers | 775 | 775 |
| Updates | 1061 | 1061 |
| Footer | 1566 | 1566 |

Zero console errors; no horizontal overflow at 1280px or 390px.

## Structure

```
src/
├── App.jsx                  section order
├── index.css                tokens → base, buttons, reveal system, grain
├── hooks/useReveal.js       IntersectionObserver @ 0.15 threshold
└── components/
    ├── Navbar.jsx           sticky-less overlay nav + 3-col mega menu + mobile drawer
    ├── Hero.jsx / HeroField.jsx
    ├── LogoWall.jsx         marquee social proof
    ├── FlowSection.jsx      4 step cards
    ├── PromptBuilder.jsx    tabbed input (stateful)
    ├── Features.jsx / FeatureBlock.jsx   4 alternating chapters
    ├── Reps.jsx             stacked-record visual
    ├── Customers.jsx        case-study player (stateful)
    ├── Updates.jsx          conference banner + post grid
    └── Footer.jsx           CTA band + 5-col link grid
```

## Interactions implemented

- Mega-menu on hover with chevron rotation; mobile drawer with animated burger
- Button hover lift + shadow, `:active` scale on every button
- Card hover: border brighten, 3px lift, soft shadow
- Left-origin underline wipe on nav/footer links
- Scroll reveal with per-element stagger via `data-delay`
- Continuous logo marquee; slow-drifting hero/footer gradient blooms
- Tab + text state in the prompt builder; play/pause + transport in the player
- `prefers-reduced-motion` honoured throughout

## Assets

269 files from the original are downloaded into `public/assets/` (~109MB) and wired
in: the hero film, four feature films, the reps and case-study films, the footer
loop, the 7-tab screenshot carousel, the customer logo set, and the wordmark.

The one exception is **RoobertVF** — a commercially licensed typeface that cannot be
self-hosted. **Figtree** stands in for it via `fontFamily.sans`.

See **[ASSETS.md](ASSETS.md)** for the file-by-file map, the video flags, and the
swap points for substituting your own artwork.

These files are Clay's own commissioned artwork and, in `icon/`, other companies'
trademarks. They are cached here for local development reference. Point the build at
your own artwork before deploying or showing this externally.

This is an unaffiliated local rebuild for development reference.
