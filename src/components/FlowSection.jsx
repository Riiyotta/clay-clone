import { useEffect, useRef, useState } from 'react'

/**
 * §3 — "GTM engineers build on Clay".
 *
 * Measured off the original at 1280:
 *   h2       x320 y1416 640x144   72/500/72/-2.16px, CENTRED
 *   caption  16/400/24 black, centred, rotates with the tab
 *   strip    x81 y1668 1118x44, overflow hidden, 5 track copies, 8px gap;
 *            translateX centres the active pill on the viewport centre
 *   pills    h44, radius 12, padding 10px 16px, 16/500/24
 *            idle #F4F3F0 / #1B1A18 ; active = that tab's accent
 *   stage    x32 y1712 1216x543.4, radius 48
 *   shade    bottom 244.5px, linear-gradient(transparent -> accent) at 0.3,
 *            radius 0 0 30 30, over a white gradient
 *   dwell    9150ms; outgoing card fades ~400ms while incoming snaps in
 */
const PLAYS = [
  { tab: 'TAM Sourcing',       w: 133.7, pill: '#AAEBFD', panel: '#3BD3FD',
    cap: 'Find every account in your TAM in one place.',
    layers: [ { s: 'case-1',      dx: 0,     dy: 48,    z: 1 },
              { s: 'case-2',      dx: 0,     dy: 48,    z: 10 } ] },
  { tab: 'Automated Inbound',  w: 179.4, pill: '#EEF773', panel: '#CBD810',
    cap: 'Enrich, score, and route every lead to the right rep in minutes.',
    layers: [ { s: 'case-11',     dx: 0,     dy: 24,    z: 1 },
              { s: 'case-13',     dx: 36,    dy: 40,    z: 10 },
              { s: 'case-12',     dx: -36,   dy: -8,    z: 11 } ] },
  { tab: 'Lead Scoring',       w: 128.2, pill: '#C8BBFB', panel: '#A17BF9',
    cap: 'Score every account against your own fit criteria.',
    layers: [ { s: 'case-5',      dx: 0,     dy: 48,    z: 1 },
              { s: 'case-7',      dx: 36,    dy: 108,   z: 10 },
              { s: 'case-6',      dx: -36,   dy: 112,   z: 11 } ] },
  { tab: 'Automated Outbound', w: 193.8, pill: '#FCC9AB', panel: '#FF7714',
    cap: 'Send research-backed outbound at scale.',
    layers: [ { s: 'case-8',      dx: 0,     dy: 24,    z: 1 },
              { s: 'case-10',     dx: 36,    dy: 32,    z: 10 },
              { s: 'case-9',      dx: -36,   dy: 107.2, z: 11 } ] },
  { tab: 'CRM Enrichment',     w: 156.2, pill: '#BEDFFE', panel: '#BEDFFE',
    cap: 'Keep every CRM record complete and current.',
    layers: [ { s: 'replace-crm', dx: 0,     dy: 24,    z: 1 },
              { s: 'case-4',      dx: -42.5, dy: 24,    z: 10 } ] },
  { tab: 'Launch Ads',         w: 117.3, pill: '#FCBABE', panel: '#FB4450',
    cap: 'Build and sync ad audiences from live data.',
    layers: [ { s: 'case-21',     dx: 0,     dy: 24,    z: 1 },
              { s: 'case-23',     dx: 36,    dy: 24,    z: 10 },
              { s: 'case-22',     dx: -36,   dy: 206.4, z: 11 } ] },
  { tab: 'Rep Productivity',   w: 153.0, pill: '#F8B9E4', panel: '#FF70D2',
    cap: 'Give every rep the next best account to work.',
    layers: [ { s: 'case-14',     dx: 0,     dy: 24,    z: 1 },
              { s: 'case-16',     dx: 36,    dy: 24,    z: 10 },
              { s: 'case-15',     dx: -36,   dy: 0,     z: 11 } ] },
]

const GAP = 8
const COPY_W = PLAYS.reduce((a, p) => a + p.w, 0) + PLAYS.length * GAP // 1117.6
const COPIES = 5
const MIDDLE = 2 // the copy the active pill is centred from
const STRIP_W = 1118
const DWELL = 9150

// centre of pill i inside one copy
const centreOf = (i) =>
  PLAYS.slice(0, i).reduce((a, p) => a + p.w + GAP, 0) + PLAYS[i].w / 2

export default function FlowSection() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    if (paused) return
    timer.current = setTimeout(() => setActive((a) => (a + 1) % PLAYS.length), DWELL)
    return () => clearTimeout(timer.current)
  }, [active, paused])

  const shift = STRIP_W / 2 - (MIDDLE * COPY_W + centreOf(active))
  const cur = PLAYS[active]

  return (
    <section
      className="relative pb-16 pt-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-clay">
        {/* heading — centred, 640 wide */}
        <h2 className="mx-auto max-w-[640px] text-center text-[72px] font-medium leading-[72px] tracking-[-2.16px] text-black
                       dt:text-[56px] dt:leading-[56px] dt:tracking-[-1.68px]
                       tb:text-[40px] tb:leading-[42px] tb:tracking-[-1.2px]">
          GTM engineers build on Clay
        </h2>

        {/* caption + tab strip, 32px grid gap */}
        <div className="mt-6 grid gap-8">
          <div className="mx-auto flex h-[52px] w-full max-w-[544px] items-center justify-center">
            <p className="text-center text-[20px] font-normal leading-[26px] text-black">{cur.cap}</p>
          </div>

          <div className="relative mx-auto h-11 w-full max-w-[1118px] overflow-hidden">
            <div
              className="absolute left-0 top-0 flex h-11 items-center"
              style={{
                gap: GAP,
                width: COPY_W * COPIES,
                transform: `translateX(${shift}px)`,
                transition: 'transform 750ms cubic-bezier(.19,1,.22,1)',
              }}
            >
              {Array.from({ length: COPIES }).flatMap((_, c) =>
                PLAYS.map((p, i) => {
                  const isActive = c === MIDDLE && i === active
                  return (
                    <button
                      key={`${c}-${i}`}
                      onClick={() => setActive(i)}
                      style={{
                        width: p.w,
                        background: isActive ? p.pill : '#F4F3F0',
                        color: '#1B1A18',
                        transition: 'color .15s linear, background-color .15s linear',
                      }}
                      className="h-11 shrink-0 whitespace-nowrap rounded-btn px-4 py-[10px] text-[16px] font-medium leading-6"
                    >
                      {p.tab}
                    </button>
                  )
                }),
              )}
            </div>
          </div>
        </div>

        {/* card stage — each slide is a composite: a coloured panel (r32) with
            texture, then 2-3 UI screenshots stacked at measured offsets */}
        <div className="relative mt-0 overflow-hidden pb-6">
          <div className="relative w-full" style={{ aspectRatio: '1216 / 543.1' }}>
            {PLAYS.map((p, i) => (
              <div
                key={p.tab}
                className="absolute inset-0"
                style={{
                  opacity: i === active ? 1 : 0,
                  transition: i === active ? 'none' : 'opacity 400ms ease',
                  zIndex: i === active ? 2 : 1,
                  pointerEvents: i === active ? 'auto' : 'none',
                }}
              >
                {/* coloured panel, 392/543 of the stage height, radius 32 */}
                <div
                  className="absolute inset-x-0 overflow-hidden rounded-[32px]"
                  style={{ top: '32.2%', height: '72.2%', background: p.panel }}
                >
                  <div className="absolute inset-0 mix-blend-overlay"
                       style={{ backgroundImage: 'url(/assets/img/Clay-overlay.avif)', backgroundSize: 'cover', opacity: 0.85 }} />
                  <div className="absolute inset-0 mix-blend-overlay"
                       style={{ backgroundImage: 'url(/assets/img/Noise.avif)', backgroundRepeat: 'repeat', opacity: 0.35 }} />
                </div>

                {/* stacked UI screenshots */}
                {p.layers.map((l) => (
                  <img
                    key={l.s}
                    src={`/assets/img/${l.s}.avif`}
                    alt=""
                    className="absolute left-0 top-0 w-full"
                    style={{
                      transform: `translate(${l.dx}px, ${l.dy}px)`,
                      zIndex: l.z,
                      aspectRatio: '1216 / 543.1',
                      objectFit: 'contain',
                    }}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                ))}

                {/* white wash then the accent wash, bottom 45% */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[20] h-[45%]"
                     style={{ background: 'linear-gradient(rgba(255,255,255,0), #fff)', borderRadius: '0 0 30px 30px' }} />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[21] h-[45%]"
                     style={{ background: `linear-gradient(rgba(255,255,255,0), ${p.panel})`, opacity: 0.3, borderRadius: '0 0 30px 30px' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
