import { useEffect, useRef, useState } from 'react'
import A from '../Link'
import { HeroButton } from '../ProductHero'

/**
 * Body sections for the product pages. Each is built from measurements of the
 * original at 1280; the numbers in comments are the original's page geometry.
 * They are shared across pages — the data in src/data/productBodies.js decides
 * which ones a page uses and with what content.
 */

const BORDER = 'rgb(218,212,200)'

/** Lines are pinned at ≥1280, where they were measured, and wrap freely below. */
export function Lines({ lines }) {
  return lines.map((l, i) => (
    <span key={i} className="xl:block xl:whitespace-nowrap">{l}{i < lines.length - 1 ? ' ' : ''}</span>
  ))
}

const EYEBROW = 'text-[12px] font-semibold uppercase leading-[14.4px] tracking-[1.08px]'
const H44 = 'text-[44px] font-medium leading-[48.4px] tracking-[-0.88px] tb:text-[32px] tb:leading-[36px]'
const H48 = 'text-[48px] font-medium leading-[48px] tracking-[-1.92px] tb:text-[34px] tb:leading-[36px] tb:tracking-[-1.2px]'
const BODY = 'text-[16px] font-normal leading-[22.4px]'

/* ---------------------------------------------------------------------------
 * QuoteCard — a bordered white card (r30) on a coloured band: square image on
 * the left, eyebrow / quote / name / role / button on the right.
 *   band 1280×613, pt16 · card 1216×597 · image box 595×595 · text x+647
 * ------------------------------------------------------------------------- */
export function QuoteCard({ s }) {
  return (
    <section style={{ background: s.band, paddingTop: 16 }}>
      <div className="container-clay">
        <div className="grid overflow-hidden rounded-[30px] border bg-white lg:grid-cols-[595px_1fr]" style={{ borderColor: BORDER }}>
          <div className="aspect-square overflow-hidden rounded-[30px] border" style={{ borderColor: BORDER }}>
            <img src={s.img} alt={s.alt || ''} className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="px-8 py-10 lg:pl-[52px] lg:pr-6 lg:pt-[168px] lg:pb-0">
            <p className={EYEBROW}>{s.eyebrow}</p>
            <blockquote className="mt-[11.9px] max-w-[567px] text-[24px] font-normal leading-[31.2px] tb:text-[19px] tb:leading-[26px]">
              <Lines lines={s.quote} />
            </blockquote>
            <p className="mt-6 text-[16px] font-medium leading-[19.2px] tracking-[-0.32px]">{s.name}</p>
            <p className={`mt-[6.4px] ${EYEBROW}`}>{s.role}</p>
            <div className="mt-[18px]"><HeroButton b={s.btn} /></div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------------------
 * StickyFeatures — a sticky square image (top:144) on the left, a column of
 * 630px text panels on the right with their content centred. A panel is active
 * while the viewport centre is inside its block (none before or after the
 * section). Active: image opacity 1, copy 1; inactive: image 0, copy 0.2 — both
 * over 0.3s, as measured.
 *   wrapper 1216 × panels·630 · sticky box 608×666, frame 608×608 r30 1px
 *   rgb(230,232,236) · text at x+729.6, w486.4
 * ------------------------------------------------------------------------- */
export function StickyFeatures({ s }) {
  const [active, setActive] = useState(-1)
  const blocks = useRef([])
  useEffect(() => {
    let raf = 0
    const on = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const mid = window.innerHeight / 2
        let a = -1
        blocks.current.forEach((b, i) => { if (!b) return; const r = b.getBoundingClientRect(); if (r.top <= mid && r.bottom > mid) a = i })
        setActive(a)
      })
    }
    on(); window.addEventListener('scroll', on, { passive: true }); window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])

  const frame = (i) => (
    <div className="aspect-square overflow-hidden rounded-[30px] border" style={{ borderColor: 'rgb(230,232,236)' }}>
      <img src={s.panels[i].img} alt="" className="h-full w-full object-cover" loading="lazy" />
    </div>
  )

  return (
    <section style={{ paddingTop: s.pt ?? 96, paddingBottom: s.pb ?? 96, background: s.bg }}>
      <div className="container-clay lg:grid lg:grid-cols-[608px_1fr]">
        <div className="hidden lg:block">
          <div className="sticky top-[144px] flex h-[666px] items-center">
            <div className="relative w-full">
              {s.panels.map((p, i) => (
                <div key={i} className={i ? 'absolute inset-0' : 'relative'}
                     style={{ opacity: active === i ? 1 : 0, zIndex: active === i ? 10 : 1, transition: 'opacity .3s' }}
                     aria-hidden={active !== i}>
                  {frame(i)}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:pl-[121.6px]">
          {s.panels.map((p, i) => (
            <div key={p.h.join()} ref={(el) => (blocks.current[i] = el)} className="flex flex-col justify-center py-10 lg:h-[630px] lg:py-0">
              <div className="mb-8 lg:hidden">{frame(i)}</div>
              <div className="transition-opacity duration-300 dt:!opacity-100" style={{ opacity: active === i ? 1 : 0.2 }}>
                <h2 className={H44}><Lines lines={p.h} /></h2>
                <p className={`mt-4 ${BODY}`}><Lines lines={p.p} /></p>
                {p.btn && <div className="mt-4"><HeroButton b={p.btn} /></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------------------
 * UseCaseGrid — heading on the left, grouped solid cards on the right.
 *   white section, 96 padding · right column x648 w600 · cards 292, gap 16,
 *   r24, p24, flex-col gap48 · link row: text + 48px square r12, ↗ 19px
 * ------------------------------------------------------------------------- */
const Arrow45 = () => (
  <svg width="19" height="19" viewBox="0 0 19 19" aria-hidden="true">
    <path d="M6 13 13 6M7.5 6H13v5.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
export function UseCaseGrid({ s }) {
  return (
    <section className="py-24 tb:py-16" style={{ background: s.bg || '#fff' }}>
      <div className="container-clay grid gap-12 lg:grid-cols-[1fr_600px] lg:gap-4">
        <div>
          <div className="lg:sticky lg:top-20">
            <h2 className={`${H48} max-w-[400px]`}><Lines lines={s.h} /></h2>
            <p className={`mt-5 max-w-[352px] ${BODY}`}><Lines lines={s.p} /></p>
          </div>
        </div>
        {/* the right column starts 4px below the heading */}
        <div className="flex flex-col gap-16 lg:pt-1">
          {s.groups.map((g) => (
            <div key={g.eyebrow}>
              <p className={EYEBROW}>{g.eyebrow}</p>
              <div className="mt-[18px] grid grid-cols-2 gap-4 tb:grid-cols-1">
                {g.cards.map((c) => (
                  <A key={c.t} href={c.href} className="group flex flex-col justify-between gap-12 rounded-[24px] p-6" style={{ background: g.bg }}>
                    <div>
                      <p className="max-w-[244px] text-[16px] font-semibold leading-[22.4px]"><Lines lines={c.t.split('\n')} /></p>
                      {/* the original's card paragraph carries a 16px bottom margin */}
                      <p className={`mb-4 mt-3 max-w-[244px] ${BODY}`}>{Array.isArray(c.p) ? <Lines lines={c.p} /> : c.p}</p>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="max-w-[180px] text-[16px] font-semibold leading-[22.4px]"><Lines lines={c.link.split('\n')} /></span>
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[12px] text-[rgb(254,253,251)] transition-transform duration-200 group-hover:scale-105"
                            style={{ background: g.square }}>
                        <Arrow45 />
                      </span>
                    </div>
                  </A>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------------------
 * IntegrationsStrip — centred label, heading, a row of 80px icon tiles, button.
 *   tiles 80×80 r24 rgb(244,243,240), gap 12, logos 48 tall
 * ------------------------------------------------------------------------- */
export function IntegrationsStrip({ s }) {
  return (
    <section style={{ background: s.bg || '#fff', paddingTop: s.pt ?? 0, paddingBottom: s.pb ?? 0 }}>
      <div className="container-clay flex flex-col items-center text-center">
        <p className="text-[20px] font-medium leading-[26px]">{s.label}</p>
        <h2 className={`mt-[10px] ${H48}`}>{s.h}</h2>
        <ul className="mt-5 flex flex-wrap justify-center gap-3">
          {s.logos.map((l) => (
            <li key={l.src} className="grid h-20 w-20 place-items-center rounded-[24px]" style={{ background: 'rgb(244,243,240)' }}>
              <img src={l.src} alt={l.alt} className="h-12 object-contain" style={{ width: l.w || 48 }} loading="lazy" />
            </li>
          ))}
        </ul>
        <div className="mt-5"><HeroButton b={{ ...s.btn, small: true }} /></div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------------------
 * CourseCta — bordered card (r30): icon, heading and button left, a 587 square
 * image right.   section pt96 pb64 · card 1216×621 · pad 16/20/16/32
 * ------------------------------------------------------------------------- */
export function CourseCta({ s }) {
  return (
    <section style={{ background: s.bg || '#fff', paddingTop: 96, paddingBottom: 64 }}>
      <div className="container-clay">
        <div className="grid items-center gap-8 rounded-[30px] border p-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,587px)] lg:gap-0 xl:grid-cols-[575px_587px] lg:py-4 lg:pl-8 lg:pr-5"
             style={{ borderColor: BORDER }}>
          {/* the copy sits 4px above the card's centre on the original */}
          <div className="px-4 py-6 lg:p-0 lg:pb-2">
            <img src={s.icon} alt="" width={56} height={56} className="h-14 w-14 object-contain" loading="lazy" />
            <h2 className={`mt-5 max-w-[551px] ${H48}`}><Lines lines={s.h} /></h2>
            <div className="mt-5"><HeroButton b={s.btn} /></div>
          </div>
          <div className="aspect-square overflow-hidden rounded-[30px] border" style={{ borderColor: BORDER }}>
            <img src={s.img} alt="" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  )
}


/* ---------------------------------------------------------------------------
 * ProductFaq — sticky heading (top:96) in a 320 column, a 704 list on the right.
 *   rows: 1px rgb(224,222,220) top border, 24px padding, question 24/400/31.2,
 *   plus icon 24px rotating 135deg when open. One open at a time; all closed
 *   on load, as on the original. Answers are the original's markup.
 * ------------------------------------------------------------------------- */
export function ProductFaq({ s }) {
  const [open, setOpen] = useState(-1)
  const RULE = 'rgb(224,222,220)'
  return (
    <section style={{ paddingTop: s.pt ?? 48, paddingBottom: s.pb ?? 96 }}>
      <div className="container-clay grid gap-10 lg:grid-cols-[280px_minmax(0,704px)] lg:justify-between lg:px-6 xl:grid-cols-[320px_704px] xl:px-12">
        <div>
          <h2 className={`${H48} lg:sticky lg:top-24`}>{s.heading.join(" ")}</h2>
        </div>
        <div>
          {s.items.map((it, i) => {
            const on = open === i
            return (
              <div key={it.q} style={{ borderTop: `1px solid ${RULE}` }}>
                <button type="button" onClick={() => setOpen(on ? -1 : i)} aria-expanded={on}
                        className="flex w-full items-start justify-between gap-6 py-6 text-left">
                  <h3 className="text-[24px] font-normal leading-[31.2px] tb:text-[19px] tb:leading-[26px]">{it.q}</h3>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"
                       className="mt-[3.6px] shrink-0 transition-transform duration-300"
                       style={{ transform: on ? 'rotate(135deg)' : 'none' }}>
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: on ? '1fr' : '0fr' }}>
                  <div className="overflow-hidden">
                    <div
                      className="faq-answer pb-4 text-[16px] leading-[22.4px] [&_a]:underline [&_a]:underline-offset-4 [&_li]:mb-2 [&_li]:leading-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_table]:mb-4 [&_table]:w-full [&_td]:border-b [&_td]:py-2 [&_td]:pr-4 [&_td]:align-top [&_th]:border-b [&_th]:py-2 [&_th]:pr-4 [&_th]:text-left [&_th]:font-semibold [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6"
                      style={{ borderColor: RULE }}
                      dangerouslySetInnerHTML={{ __html: it.html }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import ArtSection from './ArtSection'
import StackedCards from './StackedCards'
import StickyPanels from './StickyPanels'

const REGISTRY = { QuoteCard, StickyFeatures, UseCaseGrid, IntegrationsStrip, CourseCta, Faq: ProductFaq, Art: ArtSection, Stack: StackedCards, StickyPanels }

export default function ProductBody({ sections }) {
  return sections.map((sec, i) => {
    // captured sections carry no `type`; they're ArtSections
    const C = REGISTRY[sec.type || 'Art']
    return C ? <C key={i} s={sec} /> : null
  })
}
