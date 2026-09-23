import A from './Link'

/**
 * Product-page hero, driven by measurements of each page on clay.com at 1280.
 *
 * Every `y` in a spec is the original's page-y at 1280, where the sticky nav
 * occupies the first 102.8px. The clone's nav is fixed and overlays the page,
 * so vertical positions resolve as `var(--nav-h) + (y - 102.8)`. Between
 * elements we use the measured gap (next.y - prev.bottom), so the stack lands on
 * the original's coordinates at 1280 and reflows naturally below it.
 *
 * Artwork ("plates") was captured from the original at 2x with its own copy
 * hidden, so headings, sub-copy and buttons here are live DOM.
 */

const NAV = 102.8
const top = (y) => `calc(var(--nav-h) + ${(y - NAV).toFixed(1)}px)`

/* Heading ramps. Desktop values are measured; the smaller steps keep the same
   proportions at Webflow's 991 / 767 breakpoints. */
const H1 = {
  88: 'text-[88px] font-[575] leading-[88px] tracking-[-3.52px] dt:text-[64px] dt:leading-[64px] dt:tracking-[-2.4px] tb:text-[44px] tb:leading-[46px] tb:tracking-[-1.5px]',
  72: 'text-[72px] font-medium leading-[72px] tracking-[-2.16px] dt:text-[56px] dt:leading-[58px] dt:tracking-[-1.7px] tb:text-[38px] tb:leading-[40px] tb:tracking-[-1.2px]',
  64: 'text-[64px] font-semibold leading-[64px] tracking-[-1.92px] dt:text-[52px] dt:leading-[54px] dt:tracking-[-1.6px] tb:text-[36px] tb:leading-[38px] tb:tracking-[-1.1px]',
}
const LH = { 88: 88, 72: 72, 64: 64 }
const SUB = {
  24: 'text-[24px] leading-[31.2px] tb:text-[18px] tb:leading-[26px]',
  20: 'text-[20px] leading-[28px] tb:text-[16px] tb:leading-[24px]',
  '20t': 'text-[20px] leading-[26px] tb:text-[16px] tb:leading-[24px]',
}
const SUB_LH = { 24: 31.2, 20: 28, '20t': 26 }
const MUTED = 'rgba(27,26,24,0.75)'

/** Lines are pinned at ≥1280 — the width they were measured at — and wrap freely below. */
function Lines({ lines }) {
  return lines.map((l, i) => {
    const t = typeof l === 'string' ? l : l.t
    const style = typeof l === 'string' ? undefined : { color: l.color }
    return (
      <span key={i} className="xl:block xl:whitespace-nowrap" style={style}>
        {t}{i < lines.length - 1 ? ' ' : ''}
      </span>
    )
  })
}

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
    <path d="M3.5 8h9M9 4.5 12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const Play = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className="shrink-0">
    <path d="M4 2.8v8.4L11 7 4 2.8Z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
  </svg>
)

/**
 * Buttons as measured: h42, pad 8/16, 16/500, r12 (the big variant is h47, pad
 * 9/18, 18/500). Every one carries a trailing 16px icon with an 8px gap: that is
 * exactly what makes "Start building for free" measure 212.1px (16+154.1+8+16+16+2).
 */
const KIND = {
  dark: 'btn-dark border border-transparent',
  light: 'bg-white text-black border border-black hover:bg-[rgb(243,242,237)]',
  white: 'bg-white text-black border border-transparent hover:bg-[rgb(243,242,237)]',
  ghostWhite: 'bg-transparent text-white border border-transparent !pl-0 hover:opacity-70',
}
export function HeroButton({ b }) {
  const size = b.big
    ? 'h-[47px] px-[18px] text-[18px] leading-[27px] tracking-[-0.18px]'
    : b.small
      ? 'h-[38.9px] px-4 text-[13.92px] leading-[20.88px] tracking-[-0.14px]'
      : 'h-[42px] px-4 text-[16px] leading-6 tracking-[-0.16px]'
  return (
    <A href={b.href} className={`btn inline-flex items-center gap-2 rounded-[12px] font-medium ${size} ${KIND[b.kind || 'dark']}`}>
      {b.t}
      {b.icon === 'play' ? <Play /> : b.icon === false ? null : <Arrow />}
    </A>
  )
}

function Eyebrow({ e }) {
  return (
    <span
      className="inline-flex items-center rounded-full text-[12px] font-semibold uppercase leading-[14.4px] tracking-[1.08px]"
      style={{ background: e.bg, color: e.color, height: e.h, padding: `0 ${e.padX || 12}px` }}
    >
      {e.t}
    </span>
  )
}

/** The copy stack: eyebrow → gif → h1 → sub → buttons, each at its measured gap. */
function Copy({ s, align = 'center' }) {
  const centred = align === 'center'
  let cursor = null
  const gap = (y) => { const g = cursor == null ? 0 : Math.max(0, y - cursor); return g }
  const out = []

  if (s.eyebrow) {
    out.push(<div key="eb" className={centred ? 'flex justify-center' : 'flex'}><Eyebrow e={s.eyebrow} /></div>)
    cursor = s.eyebrow.y + s.eyebrow.h
  }
  if (s.gif) {
    const w = s.gif.w || 50, h = s.gif.h || 50
    out.push(
      <div key="gif" className={centred ? 'flex justify-center' : 'flex'} style={{ marginTop: gap(s.gif.y) }}>
        <img src={s.gif.src} alt="" width={w} height={h} className="object-cover" style={{ width: w, height: h, borderRadius: s.gif.radius ?? 8 }} />
      </div>,
    )
    cursor = s.gif.y + h
  }
  const h1 = s.h1
  out.push(
    <h1
      key="h1"
      className={`${h1.srOnly ? 'sr-only' : H1[h1.size]} ${centred ? 'mx-auto text-center' : ''}`}
      style={{ marginTop: gap(h1.y), maxWidth: h1.w, color: h1.color || '#000' }}
    >
      <Lines lines={h1.lines} />
    </h1>,
  )
  cursor = h1.y + h1.lines.length * LH[h1.size || 64]

  if (s.sub) {
    out.push(
      <p
        key="sub"
        className={`${SUB[s.sub.size]} font-normal ${centred ? 'mx-auto text-center' : ''}`}
        style={{ marginTop: gap(s.sub.y), maxWidth: s.sub.w, color: s.sub.color || '#000' }}
      >
        <Lines lines={s.sub.lines} />
      </p>,
    )
    cursor = s.sub.y + s.sub.lines.length * SUB_LH[s.sub.size]
  }
  if (s.btns && !s.btnsAside) {
    out.push(
      <div key="btns" className={`flex flex-wrap gap-[10px] ${centred ? 'justify-center' : ''}`} style={{ marginTop: gap(s.btns.y) }}>
        {s.btns.items.map((b) => <HeroButton key={b.t} b={b} />)}
      </div>,
    )
    cursor = s.btns.y + (s.btns.items[0].big ? 47 : 42)
  }
  if (s.pill) {
    // the agent-plugin install pill, captured with a 12px margin around it
    out.push(
      <div key="pill" className="flex justify-center" style={{ marginTop: gap(s.pill.y - 12) }}>
        <img src={s.pill.src} alt="Install the Clay Plugin to start building" width={s.pill.w + 24} height={s.pill.h + 24}
             style={{ width: s.pill.w + 24, height: 'auto' }} />
      </div>,
    )
    cursor = s.pill.y + s.pill.h + 12
  }
  return { nodes: out, cursor }
}

function Plate({ p, className = '' }) {
  if (p.video) {
    return (
      <video className={`w-full ${className}`} style={{ maxWidth: p.w, aspectRatio: `${p.w} / ${p.h}`, objectFit: 'contain' }}
             src={p.video} autoPlay muted loop playsInline aria-hidden="true" />
    )
  }
  return (
    <img src={p.src} alt={p.alt || ''} width={p.w} height={p.h} className={`h-auto w-full ${className}`}
         style={{ maxWidth: p.w }} fetchpriority="high" />
  )
}

export default function ProductHero({ spec: s }) {
  /* ---------- sculptor: the whole card is the plate; buttons sit on it ---------- */
  if (s.layout === 'plateCard') {
    return (
      <section style={{ paddingTop: top(s.plate.y), paddingBottom: s.end - (s.plate.y + s.plate.h) }}>
        <h1 className="sr-only">{s.h1.lines.join(' ')}</h1>
        <div className="container-clay">
          <div className="relative">
            <Plate p={s.plate} />
            <div className="absolute inset-x-0 flex justify-center gap-4"
                 style={{ top: `${((s.btns.y - s.plate.y) / s.plate.h) * 100}%` }}>
              {s.btns.items.map((b) => <HeroButton key={b.t} b={b} />)}
            </div>
          </div>
        </div>
      </section>
    )
  }

  /* ---------- sequencer: copy left, plate bleeding off the right edge ---------- */
  if (s.layout === 'split') {
    const { nodes } = Copy({ s: { ...s, btns: null }, align: 'left' })
    const h1Bottom = s.h1.y + s.h1.lines.length * LH[s.h1.size]
    const subBottom = s.sub.y + s.sub.lines.length * SUB_LH[s.sub.size]
    return (
      <section className="relative overflow-hidden" style={{ background: s.band.color, paddingTop: top(s.eyebrow.y), paddingBottom: s.end - (s.btns.y + 42) }}>
        <div className="container-clay relative z-10">
          <div style={{ paddingLeft: s.h1.x - 32 }} className="dt:!pl-0">
            {nodes.slice(0, 2)}
            <div className="lg:w-[358.4px]" style={{ marginTop: s.sub.y - h1Bottom }}>
              <p className={`${SUB[s.sub.size]} font-normal`} style={{ color: s.sub.color }}>
                <Lines lines={s.sub.lines} />
              </p>
            </div>
            <div className="flex" style={{ marginTop: s.btns.y - subBottom }}>
              {s.btns.items.map((b) => <HeroButton key={b.t} b={b} />)}
            </div>
          </div>
        </div>
        {/* ≥992: the plate sits at x550 and runs to the viewport edge */}
        <div className="pointer-events-none absolute hidden lg:block"
             style={{ top: top(s.plate.y), left: 'calc(50% - 90px)', right: 0 }}>
          <img src={s.plate.src} alt="" width={s.plate.w} height={s.plate.h} style={{ width: s.plate.w, height: s.plate.h }} />
        </div>
        <div className="container-clay mt-12 lg:hidden"><Plate p={s.plate} /></div>
      </section>
    )
  }

  /* ---------- ai-formula: dark band, copy left, buttons in a right column ---------- */
  if (s.layout === 'dark') {
    const { nodes, cursor } = Copy({ s: { ...s, btnsAside: true }, align: 'left' })
    return (
      <section style={{ paddingTop: 'var(--nav-h)', paddingBottom: s.end - s.band.to }}>
        <div style={{ background: s.band.color }}>
          <div className="container-clay relative" style={{ paddingTop: s.h1.y - s.band.from }}>
            <div className="min-w-0" style={{ maxWidth: s.h1.w }}>{nodes}</div>
            {/* ≥992 the buttons sit in a right-hand column that takes no height of its own */}
            <div className="mt-8 flex flex-col items-start gap-4 lg:absolute lg:right-0 lg:mt-0" style={{ top: s.btns.y - s.band.from }}>
              {s.btns.items.map((b) => <HeroButton key={b.t} b={b} />)}
            </div>
          </div>
          <div style={{ marginTop: s.plate.y - cursor }}>
            <img src={s.plate.src} alt="" width={s.plate.w} height={s.plate.h} className="mx-auto block h-auto w-full" style={{ maxWidth: s.plate.w }} />
          </div>
        </div>
      </section>
    )
  }

  /* ---------- overlay: art plate is the band's background, copy on top ---------- */
  if (s.layout === 'overlay') {
    const { nodes, cursor } = Copy({ s })
    const bandTop = s.band.from === 0 ? '0px' : top(s.band.from)
    return (
      <section style={{ paddingTop: s.band.from === 0 ? 0 : 'var(--nav-h)', paddingBottom: s.end - s.band.to }}>
        <div
          className="relative"
          style={{
            backgroundColor: s.band.color,
            backgroundImage: `url(${s.plate.src})`,
            backgroundSize: `${s.plate.w}px auto`,
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
            minHeight: s.band.to - s.band.from,
            paddingTop: s.band.from === 0 ? top(s.first) : s.first - s.band.from,
            paddingBottom: s.band.to - cursor,
          }}
          data-band-top={bandTop}
        >
          <div className="container-clay">{nodes}</div>
        </div>
      </section>
    )
  }

  /* ---------- stack (default): copy, then plate — optionally in a card or band ---------- */
  const { nodes, cursor } = Copy({ s })
  const plateTop = s.plate.y
  const plateGap = Math.max(0, plateTop - cursor)
  const plateBottom = s.plate.y + s.plate.h

  const plateRow = (
    <div style={{ marginTop: plateGap }} className={s.plate.full ? 'flex justify-center overflow-hidden' : 'container-clay flex justify-center'}>
      <Plate p={s.plate} />
    </div>
  )

  if (s.card) {
    return (
      <section style={{ paddingTop: top(s.card.top), paddingBottom: s.end - s.card.bottom }}>
        <div className="container-clay">
          <div className="overflow-hidden" style={{ background: s.card.color, borderRadius: 24, paddingTop: s.first - s.card.top, paddingBottom: Math.max(0, s.card.bottom - plateBottom) }}>
            <div className="px-6 lg:px-0">{nodes}</div>
            <div style={{ marginTop: plateGap }} className="flex justify-center">
              <Plate p={s.plate} />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (s.band) {
    return (
      <section style={{ paddingTop: 'var(--nav-h)', paddingBottom: s.end - s.band.to }}>
        <div style={{ background: s.band.color, paddingTop: s.first - s.band.from, paddingBottom: Math.max(0, s.band.to - plateBottom) }}>
          <div className="container-clay">{nodes}</div>
          {plateRow}
        </div>
      </section>
    )
  }

  return (
    <section style={{ paddingTop: top(s.first), paddingBottom: s.end - plateBottom }}>
      <div className="container-clay">{nodes}</div>
      {plateRow}
    </section>
  )
}
