# Assets

269 files pulled from the original into `public/assets/` (`img/`, `video/`, `icon/`), ~109MB. Captured 2026-09-22 at 1440px.

## Where each film is used

| Local file | Section | Rendered | Flags |
|---|---|---|---|
| `video/Hero-06-02-Lossy-0001-0240.mp4` | Hero | 1440x1072 cover | autoplay loop muted |
| `video/Data-06-16-1000px.webm` | Feature 1 — Data | 592x675 cover | autoplay loop muted |
| `video/Agents-06-16-1000px.webm` | Feature 2 — Agents | 592x675 cover | autoplay loop muted |
| `video/Orch-06-16-1000px.webm` | Feature 3 — Orchestration | 592x675 cover | autoplay loop muted |
| `video/Execution-06-16-1000px.webm` | Feature 4 — Execution | 592x675 cover | autoplay loop muted |
| `video/Reps-06-16-1500px.webm` | Reps | 1184x533 cover | autoplay loop muted |
| `video/euro_case_study_final…mp4` | Customers | 947x533 cover | click-to-play |
| `video/Footer-05-29-Lossy-0001-0060.mp4` | Footer CTA | 1440x1321 cover | autoplay loop muted |

Each `<video>` carries its matching `*-Still-1.avif` as `poster`.

## Stills, screenshots, logos

- `img/case-*.avif`, `img/replace-crm.avif` — the 7-tab play carousel (1280x572), with `-p-500/800/1080/1600/2000` responsive cuts
- `img/*-Still-1.avif` — video posters
- `img/Clay-primary-logo.avif` — wordmark (72px nav, 128px footer)
- `icon/*.svg` — customer logo marquee, 32px tall
- `img/community-story.avif`, `img/more-clay-4.avif`, `img/…HCUC-Livestream-Asset.avif`, `img/Footer-Illo.avif` — Updates cards

## Not downloaded

| Item | Why |
|---|---|
| `RoobertVF.woff2` | Commercially licensed typeface — the foundry licence does not permit self-hosting. **Figtree** is used instead (`fontFamily.sans` in `tailwind.config.js`). Buy the licence and swap that token for exact type fidelity. |
| `Canela` | Same; not used on this page's critical path. |

## Swapping in your own artwork

Asset paths are declared at the top of each component, not scattered inline:

```
Hero.jsx / HeroField.jsx   hero film + poster
Features.jsx               BLOCKS[].video / .still
FlowSection.jsx            PLAYS[].img
LogoWall.jsx               LOGOS[]
Updates.jsx                POSTS[].img
Customers.jsx, Reps.jsx    inline src/poster
Logo.jsx                   wordmark
```

Replace the files in `public/assets/` keeping the filenames, or edit those arrays.


---

These files are Clay's own commissioned artwork and, in `icon/`, other companies'
trademarks. They are cached here for local development reference. Point the build at
your own artwork before deploying, publishing, or showing this anywhere externally.
