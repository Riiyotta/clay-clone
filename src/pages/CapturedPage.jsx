import { useEffect, useState } from 'react'
import ProductBody from '../ui/product/Sections'
import { AUTO } from '../data/productBodies'

/**
 * A page rebuilt by the scroll-then-capture pass (scratchpad/scrollcap.js): every
 * section is an ArtSection — the original's art as a plate, its copy live, its
 * videos playing and its sticky elements sticking. Page data is code-split so the
 * ~60 captured pages don't all ship in the main bundle.
 */
const PAGES = import.meta.glob('../data/art/pages/*.json')
// interactive replacements found by the pass: <key>.faq.json, <key>.sf.json
const EXTRAS = import.meta.glob('../data/art/pages-x/*.json')
const extra = (k, kind) => EXTRAS[`../data/art/pages-x/${k}.${kind}.json`]?.().then((m) => m.default)
export const CAPTURED_KEYS = Object.keys(PAGES).map((f) => f.match(/pages\/(.+)\.json$/)[1])
export const pathOf = (k) => '/' + k.replace(/__/g, '/')

/** Mark the biggest heading in the opening sections as the page's single h1. */
function h1Tagged(sections) {
  if (sections.some((s) => (s.texts || []).some((t) => t.tag === 'h1')))
    return sections.map((s, i) => (i < 2 && !s.type ? { ...s, keepH1: true } : s))
  let best = null
  sections.slice(0, 2).forEach((s, si) => {
    if (s.type) return
    ;(s.texts || []).forEach((t, ti) => {
      const big = t.f && t.f.size >= 24 && (t.lines || []).join(' ').trim().length > 2
      if (big && (!best || t.f.size > best.size)) best = { si, ti, size: t.f.size }
    })
  })
  return sections.map((s, i) => (best && i === best.si ? { ...s, h1At: best.ti } : s))
}

export default function CapturedPage({ k }) {
  const [page, setPage] = useState(null)
  useEffect(() => {
    let on = true
    setPage(null)
    Promise.all([PAGES[`../data/art/pages/${k}.json`]().then((m) => m.default), extra(k, 'faq'), extra(k, 'sf')])
      .then(([pg, faq, sf]) => on && setPage({ ...pg, sections: AUTO(pg.sections, { faq, sticky: sf || [] }) }))
    return () => { on = false }
  }, [k])
  useEffect(() => { if (page?.title) document.title = page.title }, [page])
  // match the original's footer: absent on a few pages, preceded by an 80px spacer
  // on the customer stories (measured footer height minus the shared 1566px footer)
  useEffect(() => {
    if (!page) return
    const el = document.documentElement
    const f = page.footer
    el.dataset.footer = f ? 'on' : 'none'
    el.style.setProperty('--footer-spacer', f ? `${f.h - 1566}px` : '0px')
    return () => { delete el.dataset.footer; el.style.removeProperty('--footer-spacer') }
  }, [page])

  if (!page) return <div style={{ minHeight: '100vh' }} aria-busy="true" />
  // The page's hero carries its h1. Captured pages rarely have an h1 tag of their own
  // (the original titles them with an h2), so nominate the largest heading in the first
  // two sections — measured once per page, not per render.
  const sections = h1Tagged(page.sections)
  // a few pages carry their title inside the artwork, so no text node can be the h1 —
  // give those a visually-hidden one so every page still has exactly one
  const needsH1 = !sections.some((x) => x.h1At !== undefined || x.keepH1)
  const title = (page.title || '').split('|')[0].trim()
  // The captured section bands round outward by a few px, so pin the body to the
  // original's own footer position (or, on a footerless page, its document height).
  const end = page.footer ? page.footer.top : page.docH
  return (
    <div
      style={{
        paddingTop: 'var(--nav-h)',
        background: page.pageBg,
        ...(end ? { height: end, boxSizing: 'border-box', overflow: 'clip' } : null),
      }}
    >
      {needsH1 && <h1 className="sr-only">{title}</h1>}
      <ProductBody sections={sections} />
    </div>
  )
}
