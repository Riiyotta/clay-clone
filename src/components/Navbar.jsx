import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import A from '../ui/Link'
import { to } from '../lib'
import { NAV_MENUS, NAV_LINKS, LABEL_W } from '../data/navMenus'

/*
 * Measured off https://www.clay.com/ at 1280 and 390.
 *
 *  .nav-wrap        sticky, top 0, z 9999   (this build pins with `fixed`; the
 *                                            pages reserve the same height)
 *  .nav-banner      1280x44, display:none below 768
 *  .nav__layout     1216x58.8 at x=32, white, radius 0 0 24 24,
 *                   border-bottom 1px rgba(209,205,199,.5), pad 7.52/24/8.48
 *  .nav__list--link 41.8 tall, label 14/500/21, 8px side padding, 4.1px apart
 *  .nav__link--pw   21px overflow:clip mask holding TWO copies of the label
 *                   21px apart; hover translates both by -21px
 *  .nav__link--bg   white pill, radius 10, inset to the item box,
 *                   scale(.5)+opacity 0 at rest -> scale(1)+opacity 1 on hover
 *  hover easing     ~700ms cubic-bezier(.19,1,.22,1)  (sampled 21% @26ms,
 *                   67% @132ms, 94% @316ms, 100% @709ms)
 *  .nav__layout     border 0/1/1/1 rgba(209,205,199,.5) - sides AND bottom
 *  panel            1216x328 at y=44 (it starts behind the bar), radius 0 0 24 24,
 *                   1px rgba(209,205,199,.5); it GROWS from 2px on open:
 *                   sampled h = 111,219,275,303,317,324,327,328 at 45ms steps
 *  headings         10/600/12/0.8px uppercase rgb(121,117,109) at y=125
 *  columns          absolute x 54.2 / 273.5 / 492.8 / 712.1 (Company 54.2 / 346.6 / 639)
 *                   -> panel-relative once the panel's own x=32 is removed
 *  item pitch       41.9 with a description, 29.5 without; first row y=147
 *  promo card       294.4x224 at x=931.4 y=125, radius 16
 */

const LINK_EASE = 'cubic-bezier(.19,1,.22,1)'
const LINK_MS = 750
/* the panel grows 2 -> 328 in ~300ms: sampled 111,219,275,303,317,324,327,328
   at 45ms steps from the moment the pointer lands on the label */
const PANEL_MS = 380
const PANEL_TOP = 45  // panel top (44) + its 1px border, so rows land on the original's y

/**
 * One top-level nav item. The label lives twice inside a 21px clipped mask; on
 * hover both copies slide up by exactly one line height so the second replaces
 * the first. A white pill scales up behind them at the same time.
 */
function NavItem({ label, hovered, onEnter }) {
  const menu = NAV_MENUS[label]
  // the roll and the pill run off CSS :hover, not React state — going through a
  // state update costs a frame or two and the original starts on the first frame
  const roll = { transition: `transform ${LINK_MS}ms ${LINK_EASE}` }
  const inner = (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0 scale-50 rounded-[10px] bg-white opacity-0 group-hover:scale-100 group-hover:opacity-100"
        style={{ transition: `transform ${LINK_MS}ms ${LINK_EASE}, opacity ${LINK_MS}ms ${LINK_EASE}` }}
      />
      {/* 21px clipped mask holding two copies of the label, exactly the width the
          original's label occupies so the items land on its x positions */}
      <span className="relative block h-[21px] overflow-clip" style={{ width: LABEL_W[label] }}>
        <span className="block group-hover:-translate-y-[21px]" style={roll}>
          <span className="block h-[21px] whitespace-nowrap text-[14px] font-medium leading-[21px] text-black group-hover:text-[rgb(123,121,116)]">
            {label}
          </span>
          <span className="block h-[21px] whitespace-nowrap text-[14px] font-medium leading-[21px]" style={{ color: 'rgb(123,121,116)' }}>
            {label}
          </span>
        </span>
      </span>
    </>
  )

  const box = 'group relative flex items-center px-2 py-[10.4px]'
  return (
    <li onMouseEnter={onEnter}>
      {menu ? (
        <button type="button" className={box} aria-expanded={hovered} aria-haspopup="true">{inner}</button>
      ) : (
        <A href={to(label)} className={box}>{inner}</A>
      )}
    </li>
  )
}

/** The panel's flat rows regrouped under their column heading, for the drawer. */
function groupsOf(menu) {
  return menu.heads.map((h) => ({ h: h.t, items: menu.items.filter((it) => it.x === h.x) }))
}

/** A link inside the mega panel. Text goes grey on hover, as everywhere else. */
function PanelLink({ label, w, onNavigate }) {
  return (
    <A href={to(label)} onClick={onNavigate} style={{ width: w }}
       className="block text-[14px] font-[550] leading-[19.6px] tracking-[-0.14px] text-black"
       onMouseEnter={(e) => { e.currentTarget.style.color = 'rgb(123,121,116)' }}
       onMouseLeave={(e) => { e.currentTarget.style.color = '' }}>
      {label}
    </A>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(null)
  const [mobile, setMobile] = useState(false)
  const [section, setSection] = useState(null)   // expanded accordion in the drawer
  const closeTimer = useRef(null)

  useEffect(() => { document.body.style.overflow = mobile ? 'hidden' : '' }, [mobile])
  useEffect(() => () => clearTimeout(closeTimer.current), [])

  // A small close delay keeps the panel open while the pointer crosses the gap
  // between the bar and the panel.
  const panelRef = useRef(null)
  const paint = (l) => {
    const el = panelRef.current
    if (!el) return
    const m = NAV_MENUS[l]
    el.style.height = `${m ? m.h : 2}px`
    el.style.visibility = m ? 'visible' : 'hidden'
    el.querySelectorAll('[data-menu]').forEach((d) => { d.style.display = d.dataset.menu === l ? 'block' : 'none' })
  }
  const enter = (l) => { clearTimeout(closeTimer.current); paint(NAV_MENUS[l] ? l : null); setOpen(NAV_MENUS[l] ? l : null) }
  const leave = () => { closeTimer.current = setTimeout(() => { paint(null); setOpen(null) }, 120) }

  // Escape closes whatever is open.
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(null); setMobile(false) } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const pane = open && NAV_MENUS[open]

  return (
    <div className="fixed left-0 right-0 top-0 z-[9999]"
         onMouseEnter={() => clearTimeout(closeTimer.current)} onMouseLeave={leave}>
      {/* .nav-banner — 1280x44, hidden below 768 on the original */}
      <A href="/events" className="block h-11 w-full tb:hidden">
        <div className="container-nav flex h-11 items-center justify-between"
             style={{ background: '#45012E', padding: '8px 20px' }}>
          <span className="flex items-center gap-2 dt:gap-1.5">
            <img src="/assets/icon/Default.svg" alt="Sculpt" width={101} height={28}
                 className="h-7 w-[101px] shrink-0 object-contain" />
            <span className="text-[20px] font-normal leading-[28px] text-banner-tx dt:text-[16px]">
              The most creative minds in GTM. October 8, San Francisco
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-[12px] font-semibold uppercase leading-[14.4px] tracking-[1.08px] text-ac-gold">
            Get tickets
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </A>

      <div className="container-nav relative z-50">
        {/* .nav__layout */}
        <nav className="relative z-10 flex h-[58.8px] items-center justify-between bg-white dt:h-[57px]"
             style={{
               borderRadius: '0 0 24px 24px',
               // the original strokes the sides as well as the bottom, never the top
               borderTop: '0 solid rgba(209,205,199,0.5)',
               borderRight: '1px solid rgba(209,205,199,0.5)',
               borderBottom: '1px solid rgba(209,205,199,0.5)',
               borderLeft: '1px solid rgba(209,205,199,0.5)',
               padding: '7.52px 24px 8.48px',
             }}>
          <div className="flex items-center">
            <A href="/" aria-label="Clay home" className="mr-[19.3px] flex items-center" onClick={() => setOpen(null)}>
              <Logo w={72} h={22.5} />
            </A>
            <ul className="flex items-center gap-[4.1px] dt:hidden">
              {NAV_LINKS.map((l) => (
                <NavItem key={l} label={l} hovered={open === l} onEnter={() => enter(l)} />
              ))}
            </ul>
          </div>

          <div className="flex items-center dt:hidden" onMouseEnter={() => setOpen(null)}>
            {/* ⌘K search — 70x35 on the original */}
            {/* .nav_search — 70x35, 6.4px padding, 3.2px gap: two 19x22.2 key caps
                then a 12.8px magnifier */}
            <button type="button" aria-label="Search"
                    className="flex h-[35px] w-[70px] items-center gap-[3.2px] p-[6.4px] text-[12.8px] font-normal leading-[19.2px] text-black">
              <span className="flex h-[22.2px] w-[19px] items-center justify-center">⌘</span>
              <span className="flex h-[22.2px] w-[19px] items-center justify-center">K</span>
              <svg width="12.8" height="12.8" viewBox="0 0 14 14" aria-hidden="true" className="shrink-0">
                <circle cx="6.2" cy="6.2" r="4.3" fill="none" stroke="currentColor" strokeWidth="1.3" />
                <path d="M9.4 9.4 12.2 12.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </button>
            {/* Log in — 61x32, text goes grey on hover like every other line link */}
            <A href="/contact"
               style={{ marginLeft: 0.9 }}
               className="flex h-[32px] w-[61px] items-center justify-center text-[12.8px] font-medium leading-[19.2px] text-black transition-colors duration-300 hover:text-[rgb(123,121,116)]">
              Log in
            </A>
            {/* both CTAs carry a 1px transparent border on the original, which is
                what makes them 38.9 tall rather than 36.9 */}
            <A href="/demo" className="btn btn-oat rounded-btn text-btn font-medium"
               style={{ gap: '6.96px', width: 106.8, height: 38.9, border: '1px solid transparent', padding: '8px 16px', marginLeft: 0.1, letterSpacing: '-0.1392px' }}>
              Get a demo
            </A>
            <A href="/pricing" className="btn btn-dark rounded-btn text-btn font-medium"
               style={{ gap: '6.96px', width: 120.6, height: 38.9, border: '1px solid transparent', padding: '8px 16px', marginLeft: 8, letterSpacing: '-0.1392px' }}>
              Start free trial
            </A>
          </div>

          {/* .nav__menu--toggle — 40x40 */}
          <div className="hidden items-center gap-2 dt:flex">
            <A href="/demo" className="btn btn-oat rounded-btn px-4 py-2 text-btn font-medium">
              Get a demo
            </A>
            <button type="button" onClick={() => setMobile((v) => !v)} aria-label="Toggle menu" aria-expanded={mobile}
                    className="grid h-10 w-10 place-items-center" style={{ background: 'rgb(254,253,251)', borderRadius: '10.08px' }}>
              {mobile ? (
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              ) : (
                <span className="block">
                  <span className="block h-[1.5px] w-[18px] bg-current" />
                  <span className="mt-[5px] block h-[1.5px] w-[18px] bg-current" />
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* .nav__dropdown--main — 1216 wide, top at y=44 so it sits behind the bar,
            growing from 2px to the menu's own height on open */}
        <div ref={panelRef} className="absolute left-0 right-0 top-0 z-0 overflow-hidden bg-white dt:hidden"
             style={{
               height: 2,
               borderRadius: '0 0 24px 24px',
               border: '1px solid rgba(209,205,199,0.5)',
               transition: `height ${PANEL_MS}ms ${LINK_EASE}`,
               visibility: 'hidden',
             }}>
          {NAV_LINKS.filter((l) => NAV_MENUS[l]).map((label) => {
            const pane = NAV_MENUS[label]
            return (
            <div key={label} data-menu={label} style={{ display: 'none' }} className="relative h-full">
              {pane.heads.map((h) => (
                <p key={h.t} className="absolute text-[10px] font-semibold uppercase leading-3 tracking-[0.8px]"
                   style={{ left: h.x - 1, top: h.y - PANEL_TOP, width: pane.colW, color: 'rgb(121,117,109)' }}>
                  {h.t}
                </p>
              ))}

              {pane.items.map((it) => (
                <A key={it.t + it.href} href={it.href} onClick={() => setOpen(null)}
                   className="group absolute flex items-center opacity-100 transition-opacity duration-300 hover:opacity-[0.7]"
                   style={{ left: it.x - 1, top: it.y - PANEL_TOP, width: pane.colW, height: pane.pitch }}>
                  {it.icon && (
                    <span className="mr-5 block shrink-0 transition-transform duration-300 group-hover:scale-[0.8]" style={{ marginLeft: 6 }}>
                      <img src={it.icon} alt="" width={20} height={20} className="h-5 w-5 object-contain" loading="lazy" />
                    </span>
                  )}
                  <span className="block text-[14px] font-[550] leading-[19.6px] tracking-[-0.14px] text-black">
                    {it.t}
                  </span>
                </A>
              ))}

              {pane.promo && (
                <A href={pane.promo.href} onClick={() => setOpen(null)}
                   className="group absolute block overflow-hidden"
                   style={{ left: pane.promo.x - 1, top: pane.promo.y - PANEL_TOP, width: pane.promo.w, height: pane.promo.h, borderRadius: 16 }}>
                  <img src={pane.promo.img} alt=""
                       className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(rgba(0,0,0,0) 38%, rgba(0,0,0,0.72))' }} />
                  <div className="absolute inset-x-4 bottom-4">
                    <p className="text-[12px] font-semibold uppercase leading-[14.4px] tracking-[1.08px] text-white">{pane.promo.eyebrow}</p>
                    <p className="mt-1 text-[16px] font-medium leading-[19.2px] text-white">{pane.promo.title}</p>
                  </div>
                </A>
              )}
            </div>
          )})}
        </div>
      </div>

      {/* Mobile drawer — the original is a fixed panel inset 10px holding an
          accordion row per menu, with the CTAs pinned to the bottom. */}
      {mobile && (
        <div className="fixed inset-0 z-40 hidden p-[10px] pt-0 dt:block">
          <div className="flex h-full flex-col overflow-hidden rounded-b-[16px] bg-white pt-[57px]">
            <div className="flex-1 overflow-y-auto px-4">
              {NAV_LINKS.map((l) => {
                const menu = NAV_MENUS[l]
                const isOpen = section === l
                return (
                  <div key={l}>
                    {menu ? (
                      <>
                        <button type="button" onClick={() => setSection(isOpen ? null : l)} aria-expanded={isOpen}
                                className="flex w-full items-center justify-between py-[14px] text-left text-[16px] font-medium leading-[22px] text-black">
                          {l}
                          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"
                               className="transition-transform duration-300" style={{ transform: isOpen ? 'rotate(90deg)' : 'none' }}>
                            <path d="M6 3.5L10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="pb-4">
                            {groupsOf(menu).map((g) => (
                              <div key={g.h} className="mb-4">
                                <p className="mb-2 text-[10px] font-semibold uppercase leading-3 tracking-[0.8px]" style={{ color: 'rgb(121,117,109)' }}>{g.h}</p>
                                {g.items.map((it) => (
                                  <A key={it.href + it.t} href={it.href} onClick={() => setMobile(false)}
                                     className="flex items-center gap-3 py-[10px] text-[13.92px] font-normal leading-[20px] text-black">
                                    {it.icon && <img src={it.icon} alt="" width={20} height={20} className="h-5 w-5 shrink-0 object-contain" loading="lazy" />}
                                    {it.t}
                                  </A>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <A href={to(l)} onClick={() => setMobile(false)}
                         className="block py-[14px] text-[16px] font-medium leading-[22px] text-black">
                        {l}
                      </A>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="flex flex-col gap-2 border-t border-border-f px-4 py-4">
              <A href="/demo" onClick={() => setMobile(false)}
                 className="btn btn-oat rounded-btn py-3 text-center text-[16px] font-medium">
                Get a demo
              </A>
              <A href="/pricing" onClick={() => setMobile(false)}
                 className="btn btn-dark rounded-btn py-3 text-center text-[16px] font-medium">
                Sign up
              </A>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
