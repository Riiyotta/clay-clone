import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import A from '../Link'

/**
 * A section rebuilt from a capture of the original: the art (panels, UI
 * mock-ups, imagery, textures) is a 2x plate taken with the original's page copy
 * hidden, and that copy is rendered here as live DOM at its measured position.
 * See scratchpad/artcap.js and PROCESS.md §13.
 *
 *   ≥1280  the 1280-wide artboard renders 1:1 — pixel-exact to the original
 *   992–1279  the artboard scales to fit (CSS zoom, so sticky layers keep working)
 *   <992   the plate stacks above the copy, which reflows
 *
 * Motion captured by the scroll pass is reproduced, not frozen:
 *   media   videos and GIFs play as real elements at their measured rect
 *   layers  sticky elements are separate layers that stick at their measured top
 */
const W = 1280

const px = (v) => (typeof v === 'number' ? `${v}px` : v)
function fontStyle(f) {
  return {
    fontSize: f.size, fontWeight: f.weight, lineHeight: px(f.lh === 'normal' ? 'normal' : f.lh),
    letterSpacing: f.ls === 'normal' ? undefined : f.ls, color: f.color, opacity: f.op,
    textTransform: f.tt === 'uppercase' ? 'uppercase' : undefined,
  }
}

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
    <path d="M3.5 8h9M9 4.5 12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/**
 * Copy set in Figtree can run wider than the original's RoobertVF. At the
 * artboard we know the original box width, so any line that overflows is
 * narrowed with scaleX until it fits — nothing collides or spills out of a card.
 */
function useFit(ref, w, align) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => {
      el.style.transform = ''
      const over = el.scrollWidth / (w + 1)
      if (over > 1.001) {
        el.style.transform = `scaleX(${(1 / over).toFixed(4)})`
        el.style.transformOrigin = align === 'center' ? 'center top' : align === 'right' || align === 'end' ? 'right top' : 'left top'
      }
    }
    fit()
    document.fonts?.ready?.then(fit)
  }, [ref, w, align])
}

function Text({ t, abs, keepH1, asH1 }) {
  const ref = useRef(null)
  useFit(abs ? ref : { current: null }, t.w, t.f.align)
  const Tag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'blockquote', 'li'].includes(t.tag) ? t.tag : 'div'
  // a page has exactly one h1 — the hero's. Captured pages often have none (the
  // original titles them with an h2), so CapturedPage nominates one via asH1.
  const Tg = asH1 ? 'h1' : Tag === 'h1' && !keepH1 ? 'h2' : Tag
  const style = abs
    ? { position: 'absolute', left: t.x, top: t.y, width: t.w + 1, textAlign: t.f.align === 'start' ? 'left' : t.f.align, whiteSpace: 'nowrap', margin: 0, ...fontStyle(t.f) }
    : { ...fontStyle(t.f), textAlign: t.f.align === 'center' ? 'center' : 'left' }
  if (t.html) {
    // inline formatting preserved; <br> marks the original's line breaks
    const html = abs ? t.html : t.html.replace(/<br>/g, ' ')
    return <Tg ref={ref} style={style} className={abs ? '[&_strong]:font-bold' : 'mt-3 max-w-[640px] [&_strong]:font-bold'} dangerouslySetInnerHTML={{ __html: html }} />
  }
  return (
    <Tg ref={ref} style={style} className={abs ? '' : 'mt-3 max-w-[640px] [overflow-wrap:anywhere]'}>
      {abs ? t.lines.map((l, i) => <span key={i} className="block">{l}</span>) : t.lines.join(' ')}
    </Tg>
  )
}

function Button({ b, abs }) {
  const style = {
    background: b.bg, color: b.color, border: b.border, borderRadius: b.radius, padding: b.pad,
    fontSize: b.f.size, fontWeight: b.f.weight, lineHeight: px(b.f.lh), letterSpacing: b.f.ls === 'normal' ? undefined : b.f.ls,
    ...(abs ? { position: 'absolute', left: b.x, top: b.y, width: b.w, height: b.h } : {}),
  }
  return (
    <A href={b.href || '/'} className="btn inline-flex items-center justify-center gap-2 whitespace-nowrap" style={style}>
      {b.t}{b.icon && <Arrow />}
    </A>
  )
}

function LineLink({ l, abs }) {
  if (l.overlay) {
    return abs ? <A href={l.href || '#'} aria-label={l.label || 'Open link'} style={{ position: 'absolute', left: l.x, top: l.y, width: l.w, height: l.h }} /> : null
  }
  const style = { ...fontStyle(l.f), ...(abs ? { position: 'absolute', left: l.x, top: l.y, height: l.h } : {}) }
  return (
    <A href={l.href || '/'} className="group inline-flex items-center gap-2 whitespace-nowrap" style={style}>
      <span className="underline decoration-1 underline-offset-[6px] transition-colors group-hover:text-[rgb(123,121,116)]">{l.t}</span>
      {l.icon && <Arrow />}
    </A>
  )
}

function Media({ m }) {
  const style = { position: 'absolute', left: m.x, top: m.y, width: m.w, height: m.h, borderRadius: m.radius, objectFit: m.fit || 'cover' }
  if (m.kind !== 'video') return <img src={m.src} alt="" style={style} loading="lazy" />
  // click-to-play videos keep their controls and poster, as on the original
  return m.controls
    ? <video src={m.src} poster={m.poster || undefined} style={style} controls playsInline preload="metadata" />
    : <video src={m.src} poster={m.poster || undefined} style={style} autoPlay muted loop={m.loop !== false} playsInline aria-hidden="true" />
}

/**
 * A marquee lifted out of the plate: the original's track is one long strip that
 * already repeats its content, so translating it by half its width and looping at
 * the original's duration reproduces the same continuous scroll.
 */
function Marquee({ m }) {
  return (
    <div className="absolute overflow-hidden" style={{ left: m.box.x, top: m.box.y, width: m.box.w, height: m.box.h }} aria-hidden="true">
      {/* two copies of the strip, translated by one strip width per cycle — the same
          distance per second as the original, and seamless at the wrap */}
      <div className="flex" style={{ width: m.w * 2, marginLeft: m.x - m.box.x, animation: `art-marquee ${m.dur}s ${m.ease || 'linear'} infinite` }}>
        <img src={m.plate} alt="" className="max-w-none" style={{ width: m.w, height: m.h }} />
        <img src={m.plate} alt="" className="max-w-none" style={{ width: m.w, height: m.h }} />
      </div>
    </div>
  )
}

/** A sticky element lifted out of the plate: it sticks within its original parent's box. */
function Layer({ L }) {
  return (
    <div className="absolute left-0" style={{ top: L.box.y, width: W, height: L.box.h, pointerEvents: 'none' }}>
      <div className="relative" style={{ position: 'sticky', top: L.top, marginTop: L.y - L.box.y, marginLeft: L.x, width: L.w, height: L.h, pointerEvents: 'auto' }}>
        {L.plate && <img src={L.plate} alt="" className="absolute left-0 top-0 max-w-none" style={{ width: L.w, height: L.h }} loading="lazy" />}
        {L.texts.map((t, i) => <Text key={i} t={t} abs />)}
        {L.links.map((l, i) => <LineLink key={i} l={l} abs />)}
        {L.btns.map((b, i) => <Button key={i} b={b} abs />)}
      </div>
    </div>
  )
}

/** Restrict a captured section to [from, to) so another block can be spliced in. */
export function cropSection(s, from, to) {
  const inside = (o) => o.y >= from - 1 && o.y < to
  const shift = (o) => ({ ...o, y: +(o.y - from).toFixed(1) })
  return {
    ...s, name: `${s.name}@${from}`, h: +(to - from).toFixed(1), plateOffset: (s.plateOffset || 0) + from,
    texts: s.texts.filter(inside).map(shift), btns: s.btns.filter(inside).map(shift), links: s.links.filter(inside).map(shift),
    media: (s.media || []).filter(inside).map(shift), layers: (s.layers || []).filter((L) => L.y >= from && L.y < to).map((L) => ({ ...shift(L), box: { ...L.box, y: L.box.y - from } })),
  }
}

export default function ArtSection({ s }) {
  const outer = useRef(null)
  const [scale, setScale] = useState(1)
  useLayoutEffect(() => {
    const el = outer.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setScale(Math.min(1, e.contentRect.width / W)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <section ref={outer} aria-label={s.label} data-sect={s.name || ''}>
      {/* ≥992: the artboard. overflow-x: clip rather than hidden — hidden would make
          this a scroll container and stop the sticky layers from sticking. */}
      <div className="hidden lg:block" style={{ overflowX: 'clip' }}>
        <div className="relative mx-auto" style={{ width: W, height: s.h, zoom: scale }}>
          <div className="absolute inset-0 overflow-hidden">
            {/* very tall sections are captured as stacked tiles (a single clip over
                ~15k px exceeds the renderer's max texture and comes back empty) */}
            {s.plateTiles
              ? s.plateTiles.map((t) => (
                  <img key={t.src} src={t.src} alt="" className="absolute left-0 max-w-none select-none"
                       style={{ width: W, height: t.h, top: t.y - (s.plateOffset || 0) }} loading="lazy" draggable={false} />
                ))
              : <img src={s.plate} alt="" className="absolute left-0 max-w-none select-none" style={{ width: W, top: -(s.plateOffset || 0) }} loading="lazy" draggable={false} />}
          </div>
          {(s.media || []).map((m, i) => <Media key={i} m={m} />)}
          {s.texts.map((t, i) => <Text key={i} t={t} abs keepH1={s.keepH1} asH1={s.h1At === i} />)}
          {s.links.map((l, i) => <LineLink key={i} l={l} abs />)}
          {s.btns.map((b, i) => <Button key={i} b={b} abs />)}
          {(s.marquees || []).map((m, i) => <Marquee key={i} m={m} />)}
          {(s.layers || []).map((L, i) => <Layer key={i} L={L} />)}
        </div>
      </div>

      {/* <992: plate, then the copy in reading order */}
      <div className="lg:hidden">
        <div className="relative overflow-hidden" style={{ aspectRatio: `${W} / ${s.h}` }}>
          {s.plateTiles
            ? s.plateTiles.map((t) => (
                <img key={t.src} src={t.src} alt="" className="absolute left-0 w-full max-w-none"
                     style={{ top: `${(t.y - (s.plateOffset || 0)) / s.h * 100}%`, height: `${t.h / s.h * 100}%` }} loading="lazy" />
              ))
            : <img src={s.plate} alt="" className="absolute left-0 w-full max-w-none" style={{ top: `${-(s.plateOffset || 0) / s.h * 100}%` }} loading="lazy" />}
          {(s.media || []).map((m, i) => (
            m.kind === 'video'
              ? <video key={i} src={m.src} className="absolute" style={{ left: `${m.x / W * 100}%`, top: `${m.y / s.h * 100}%`, width: `${m.w / W * 100}%`, height: `${m.h / s.h * 100}%`, objectFit: m.fit || 'cover', borderRadius: m.radius }} autoPlay muted loop playsInline aria-hidden="true" />
              : <img key={i} src={m.src} alt="" className="absolute" style={{ left: `${m.x / W * 100}%`, top: `${m.y / s.h * 100}%`, width: `${m.w / W * 100}%`, height: `${m.h / s.h * 100}%` }} />
          ))}
        </div>
        <div className="container-clay py-8">
          {[...s.texts, ...(s.layers || []).flatMap((L) => L.texts.map((t) => ({ ...t, y: t.y + L.y, x: t.x + L.x })))].sort((a, b) => a.y - b.y || a.x - b.x).map((t, i) => <Text key={i} t={t} />)}
          <div className="mt-6 flex flex-wrap gap-4">
            {s.btns.map((b, i) => <Button key={i} b={b} />)}
            {s.links.filter((l) => !l.overlay).map((l, i) => <LineLink key={i} l={l} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
