import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import A from '../Link'

/**
 * Stacked sticky feature cards (".content-row" on the original).
 *   each card sticks at its own top (115/135/155/175 on /claygent), 32px apart in
 *   flow, and scales down (origin top) as the next card closes the last 600px to
 *   its own sticking point. The floor depends on depth: 1 − 0.05 × (cards below),
 *   i.e. 0.85 / 0.90 / 0.95 for a stack of four — measured, not assumed. Card chrome and copy are DOM; the mock-up panel
 *   and the section background are plates captured from the original.
 * ≥992 the 1280 artboard is used (CSS zoom below 1280 keeps sticky working);
 * below that the cards simply stack.
 */
const W = 1280
const px = (v) => (typeof v === 'number' ? `${v}px` : v)
const fontStyle = (f) => ({
  fontSize: f.size, fontWeight: f.weight, lineHeight: px(f.lh), color: f.color, opacity: f.op,
  letterSpacing: f.ls === 'normal' ? undefined : f.ls, textTransform: f.tt === 'uppercase' ? 'uppercase' : undefined,
})
const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
    <path d="M3.5 8h9M9 4.5 12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function CardCopy({ c, abs }) {
  return (
    <>
      {c.texts.map((t, i) => {
        const Tag = t.tag === 'h3' || t.tag === 'h2' ? 'h3' : t.tag === 'p' ? 'p' : 'div'
        return (
          <Tag key={i} style={abs ? { position: 'absolute', left: t.x, top: t.y, width: t.w + 1, whiteSpace: 'nowrap', margin: 0, ...fontStyle(t.f) } : { ...fontStyle(t.f), marginTop: 12 }}>
            {abs ? t.lines.map((l, j) => <span key={j} className="block">{l}</span>) : t.lines.join(' ')}
          </Tag>
        )
      })}
      {c.links.map((l, i) => (
        <A key={i} href={l.href || '/'} className="group inline-flex items-center gap-2 whitespace-nowrap"
           style={{ ...fontStyle(l.f), ...(abs ? { position: 'absolute', left: l.x, top: l.y, height: l.h } : { marginTop: 20 }) }}>
          <span className="underline decoration-1 underline-offset-[6px] transition-colors group-hover:text-[rgb(123,121,116)]">{l.t}</span>
          {l.icon && <Arrow />}
        </A>
      ))}
    </>
  )
}

export default function StackedCards({ s }) {
  const outer = useRef(null)
  const cardEls = useRef([])
  const [zoom, setZoom] = useState(1)
  const [scales, setScales] = useState(() => s.cards.map(() => 1))

  useLayoutEffect(() => {
    const el = outer.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setZoom(Math.min(1, e.contentRect.width / W)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    let raf = 0
    const on = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setScales(s.cards.map((_, i) => {
          const next = cardEls.current[i + 1]
          if (!next) return 1
          const dist = next.getBoundingClientRect().top / zoom - s.tops[i + 1]
          const k = Math.min(1, Math.max(0, 1 - dist / 600))
          const depth = s.cards.length - 1 - i
          return 1 - 0.05 * depth * k
        }))
      })
    }
    on(); window.addEventListener('scroll', on, { passive: true }); window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [s, zoom])

  return (
    <section ref={outer}>
      <div className="hidden lg:block">
        <div className="relative mx-auto" style={{ width: W, height: s.h, zoom }}>
          <img src={s.bg} alt="" className="absolute left-0 top-0 max-w-none select-none" style={{ width: W, height: s.h }} loading="lazy" draggable={false} />
          <div className="relative" style={{ paddingTop: s.cards[0].y }}>
            {s.cards.map((c, i) => {
              const prev = s.cards[i - 1]
              const mt = prev ? c.y - (prev.y + prev.h) : 0
              return (
                <div key={i} ref={(el) => (cardEls.current[i] = el)} className="sticky" style={{ top: s.tops[i], marginTop: mt, zIndex: i + 1 }}>
                  <div className="relative overflow-hidden"
                       style={{ marginLeft: c.x, width: c.w, height: c.h, background: c.bg, border: c.border, borderRadius: c.radius,
                                transform: `scale(${scales[i]})`, transformOrigin: 'top center', willChange: 'transform' }}>
                    <img src={c.media.src} alt="" className="absolute max-w-none" style={{ left: c.media.x - 1, top: c.media.y - 1, width: c.media.w, height: c.media.h }} loading="lazy" />
                    <CardCopy c={{ ...c, texts: c.texts.map((t) => ({ ...t, x: t.x - 1, y: t.y - 1 })), links: c.links.map((l) => ({ ...l, x: l.x - 1, y: l.y - 1 })) }} abs />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="container-clay flex flex-col gap-6 py-10 lg:hidden">
        {s.cards.map((c, i) => (
          <div key={i} className="overflow-hidden rounded-[24px]" style={{ background: c.bg, border: c.border }}>
            <img src={c.media.src} alt="" className="w-full" loading="lazy" />
            <div className="p-6"><CardCopy c={c} /></div>
          </div>
        ))}
      </div>
    </section>
  )
}
