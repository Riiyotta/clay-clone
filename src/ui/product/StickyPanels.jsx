import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import A from '../Link'

/**
 * The original's ".sticky-features" block, driven by sfcap.js: a sticky media
 * frame (top 144) beside a column of 630px panels. A panel is active while the
 * viewport centre is inside it (none before or after the block); the active
 * panel's copy is opacity 1, the rest 0.2, and the frame cross-fades to that
 * panel's image or video — all over 0.3s, as measured on /audiences.
 */
const W = 1280
const px = (v) => (typeof v === 'number' ? `${v}px` : v)
const fontStyle = (f) => ({
  fontSize: f.size, fontWeight: f.weight, lineHeight: px(f.lh), color: f.color,
  letterSpacing: f.ls === 'normal' ? undefined : f.ls, textTransform: f.tt === 'uppercase' ? 'uppercase' : undefined,
})
const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
    <path d="M3.5 8h9M9 4.5 12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* States were captured from the original while each panel was active, so they are
   in panel order (the original's own image order isn't — /functions is rotated). */
function State({ st, style }) {
  return st.kind === 'video'
    ? <video src={st.src} poster={st.poster} className="h-full w-full" style={{ objectFit: st.fit || 'cover', ...style }} autoPlay muted loop playsInline aria-hidden="true" />
    : <img src={st.src} alt="" className="h-full w-full" style={{ objectFit: st.fit || 'cover', ...style }} loading="lazy" />
}

function Copy({ it, abs }) {
  return (
    <>
      {it.texts.map((t, i) => {
        const Tag = t.tag === 'h2' || t.tag === 'h3' || t.tag === 'h4' ? t.tag : t.tag === 'p' ? 'p' : 'div'
        if (t.html) {
          return <Tag key={i} className="[&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-bold"
                      style={abs ? { position: 'absolute', left: t.x, top: t.y, whiteSpace: 'nowrap', margin: 0, ...fontStyle(t.f) } : { ...fontStyle(t.f), marginTop: 12 }}
                      dangerouslySetInnerHTML={{ __html: abs ? t.html : t.html.replace(/<br>/g, ' ') }} />
        }
        return (
          <Tag key={i} style={abs ? { position: 'absolute', left: t.x, top: t.y, whiteSpace: 'nowrap', margin: 0, ...fontStyle(t.f) } : { ...fontStyle(t.f), marginTop: 12 }}>
            {abs ? t.lines.map((l, j) => <span key={j} className="block">{l}</span>) : t.lines.join(' ')}
          </Tag>
        )
      })}
      {it.btns.map((b, i) => (
        <A key={i} href={b.href || '/'}
           className={`group inline-flex items-center gap-2 whitespace-nowrap ${b.line ? '' : 'btn justify-center'}`}
           style={{ ...(b.line ? {} : { background: b.bg, border: b.border, borderRadius: b.radius, padding: b.pad }), color: b.color,
                    fontSize: b.f.size, fontWeight: b.f.weight, lineHeight: px(b.f.lh), letterSpacing: b.f.ls === 'normal' ? undefined : b.f.ls,
                    ...(abs ? { position: 'absolute', left: b.x, top: b.y, width: b.w, height: b.h } : { marginTop: 16 }) }}>
          <span className={b.line ? 'underline decoration-1 underline-offset-[6px]' : ''}>{b.t}</span><Arrow />
        </A>
      ))}
    </>
  )
}

export default function StickyPanels({ s }) {
  const outer = useRef(null)
  const panels = useRef([])
  const [zoom, setZoom] = useState(1)
  const [active, setActive] = useState(-1)

  useLayoutEffect(() => {
    const el = outer.current; if (!el) return
    const ro = new ResizeObserver(([e]) => setZoom(Math.min(1, e.contentRect.width / W)))
    ro.observe(el); return () => ro.disconnect()
  }, [])
  useEffect(() => {
    let raf = 0
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => {
      const mid = window.innerHeight / 2; let a = -1
      panels.current.forEach((p, i) => { if (!p) return; const r = p.getBoundingClientRect(); if (r.top <= mid && r.bottom > mid) a = i })
      setActive(a)
    }) }
    on(); window.addEventListener('scroll', on, { passive: true }); window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])

  const f = s.frame
  return (
    <section ref={outer}>
      <div className="hidden lg:block">
        <div className="relative mx-auto" style={{ width: W, height: s.h, zoom }}>
          <div className="absolute top-0" style={{ left: s.x + s.sticky.x, width: s.sticky.w, height: s.h }}>
            <div className="sticky" style={{ top: s.sticky.top, height: s.sticky.h }}>
              <div className="absolute overflow-hidden" style={{ left: f.x, top: f.y, width: f.w, height: f.h, border: f.border, borderRadius: f.radius }}>
                {s.states.map((st, i) => (
                  <div key={i} className="absolute inset-0" style={{ opacity: active === i ? 1 : 0, transition: 'opacity .3s', zIndex: active === i ? 2 : 1 }}>
                    <State st={st} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {s.items.map((it, i) => (
            <div key={i} ref={(el) => (panels.current[i] = el)} className="absolute"
                 style={{ left: s.x + it.x, top: it.y, width: it.w, height: it.h, opacity: active === i ? 1 : 0.2, transition: 'opacity .3s' }}>
              {/* the panel's own art — icons, cards, logos — captured with its copy hidden */}
              {it.plate && <img src={it.plate} alt="" className="absolute left-0 top-0 max-w-none" style={{ width: it.w, height: it.plateH }} loading="lazy" />}
              <Copy it={it} abs />
            </div>
          ))}
        </div>
      </div>
      <div className="container-clay flex flex-col gap-12 py-8 lg:hidden">
        {s.items.map((it, i) => (
          <div key={i}>
            {s.states[i] && <div className="aspect-square overflow-hidden rounded-[30px]" style={{ border: f.border }}><State st={s.states[i]} /></div>}
            <div className="mt-6"><Copy it={it} /></div>
          </div>
        ))}
      </div>
    </section>
  )
}
