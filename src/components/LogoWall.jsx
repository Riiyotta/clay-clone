import A from '../ui/Link'
/**
 * §2 — social-proof marquee.
 *
 * An oat card (#F4F3F0, radius 48) pulled up 228px so it overlaps the hero; the
 * negative margin is what collapses the section box to h 508. Inside, a 1216x264
 * clip box holds 3 copies of a 2231px grid: 15 explicit column tracks, three 80px
 * rows, 12px gap (92px row pitch). The mosaic comes entirely from per-card spans —
 * there is no row stagger. Track scrolls left at exactly 24px/s => 92.96s period.
 *
 * Stat figures and quotes are neutral placeholders on the original's type ramp.
 */
const COLS =
  '139.766px 96.2344px 193.625px 91.7656px 157.234px 136px 147.328px 132.438px ' +
  '76.3125px 76.3125px 160.797px 160.797px 160.797px 160.797px 160.797px'

const Q = 'quote'
const S = 'stat'

// [logo, colStart, colSpan, rowStart, rowSpan, logoH, kind, payload]
const CARDS = [
  ['stripe', 1, 1, 1, 1, 32],
  ['openai', 1, 2, 2, 2, 32, Q, { w: 208, t: 'Placeholder customer quote on the original’s 12/15.6 ramp.' }],
  ['snapchat-logo-svgrepo-com', 2, 1, 1, 1, 32],
  ['figma', 3, 3, 1, 1, 32, Q, { w: 328, inline: true, t: 'Placeholder inline quote sitting beside the mark.' }],
  ['cursor', 3, 1, 2, 1, 32],
  ['intercom', 3, 3, 3, 1, 32, S, { inline: true, n: '+140%', c: 'outbound pipeline' }],
  ['ups-logo', 4, 1, 2, 1, 32],
  ['hubspot', 5, 1, 2, 1, 32],
  ['vanta', 6, 1, 1, 2, 36, S, { col: true, n: '80%+', c: 'enrichment coverage' }],
  ['Canva', 6, 1, 3, 1, 32],
  ['Perplexity', 7, 1, 1, 1, 25],
  ['anthropic', 7, 2, 2, 2, 24, Q, { w: 224, title: ['All inbound', 'qualified and scored with Clay'], t: 'Placeholder stacked quote.' }],
  ['Notion', 8, 1, 1, 1, 32],
  ['google', 9, 4, 1, 1, 32, Q, { w: 352, inline: true, t: 'Placeholder inline quote on the widest card in the track.' }],
  ['rippling', 9, 3, 2, 1, 32, S, { inline: true, n: '2x', c: 'demos from cold email' }],
  ['okta', 11, 1, 3, 1, 32],
  ['verkada', 12, 2, 2, 1, 32, S, { inline: true, n: '3x', c: 'reply rate' }],
  ['workday', 13, 1, 1, 1, 32],
  ['uber', 9, 2, 3, 1, 32],
  ['elevenlabs', 12, 2, 3, 1, 32, S, { inline: true, n: '+50%', c: 'SQLs' }],
  ['EBay_logo', 14, 1, 'auto', 1, 32],
  ['ramp', 14, 2, 1, 2, 28.8, Q, { w: 293.6, t: 'Placeholder stacked quote on a two-row card.' }],
  ['d31cb39379d4cd50ef5df65fc3ab58ac_Siemens-logo', 15, 1, 3, 1, 32],
]

function Stat({ n, c, col }) {
  return (
    <span className={`flex ${col ? 'flex-col items-start gap-0' : 'flex-row items-center gap-2'}`}>
      <span className="text-[23.2px] font-medium leading-[30.16px] text-black">{n}</span>
      <span className="text-[9.6px] font-medium uppercase leading-[11.04px] text-black">{c}</span>
    </span>
  )
}

function Card({ d }) {
  const [logo, cs, csp, rs, rsp, lh, kind, p] = d
  const tall = rsp === 2
  const inline = p?.inline
  return (
    <div
      className="flex gap-4 overflow-hidden rounded-card bg-bg px-5 py-4"
      style={{
        gridColumn: `${cs} / span ${csp}`,
        gridRow: `${rs} / span ${rsp}`,
        borderTop: '1px solid #fff',
        borderBottom: '1px solid rgba(123,121,116,.15)',
        flexDirection: inline ? 'row' : 'column',
        alignItems: inline ? 'center' : (kind ? 'flex-start' : 'center'),
        justifyContent: kind ? 'space-between' : 'center',
        ...(p?.col ? { minWidth: '8.5rem' } : null),
      }}
    >
      <span className="flex shrink-0 items-center" style={{ height: lh }}>
        <img src={`/assets/icon/${logo}.svg`} alt="" className="h-full w-auto object-cover" loading="lazy" />
      </span>

      {kind === Q && (
        <span className="flex flex-col gap-[5.6px]" style={{ width: p.w }}>
          {p.title && (
            <span className="mb-[4.8px] flex flex-col gap-[3.2px]">
              <span className="text-[20px] font-medium leading-[26px] text-black">{p.title[0]}</span>
              <span className="text-[9.6px] font-medium uppercase leading-[9.6px] text-black">{p.title[1]}</span>
            </span>
          )}
          <span className="text-[12px] font-normal leading-[15.6px] text-black">{p.t}</span>
        </span>
      )}
      {kind === S && <Stat {...p} />}
    </div>
  )
}

function Track() {
  return (
    <div
      className="absolute left-0 top-0 grid h-[264px] pl-3"
      style={{ width: 2231, gridTemplateColumns: COLS, gridTemplateRows: '80px 80px 80px', gap: 12 }}
    >
      {CARDS.map((d, i) => <Card key={i} d={d} />)}
    </div>
  )
}

export default function LogoWall() {
  return (
    <section className="relative z-10 pb-16">
      <div className="container-clay">
        <div
          className="flex flex-col justify-between gap-8 py-12
                     dt:-mt-12 dt:rounded-[40px] dt:py-10
                     tb:-mt-[90px] tb:rounded-[28px] tb:py-7
                     mb:-mt-12 mb:rounded-[28px] mb:py-7"
          style={{ marginTop: -228, background: '#F4F3F0', borderRadius: 48 }}
        >
          {/* 720px centred intro column */}
          <p className="mx-auto max-w-[720px] px-6 text-center text-[20px] font-normal leading-[26px] text-black tb:text-[17px] tb:leading-[23px]">
            Trusted by more than 500,000 leading GTM teams of all sizes. Inspired by our{' '}
            <A href="/customers" className="font-semibold underline-offset-2 hover:underline">customers</A>. Built with{' '}
            <A href="/about" className="font-semibold underline-offset-2 hover:underline">love</A>.
          </p>

          {/* clip box */}
          <div className="relative h-[264px] overflow-hidden">
            <div className="relative h-full animate-marquee" style={{ width: 2231 * 3 }}>
              <Track />
              <div className="absolute left-[2231px] top-0"><Track /></div>
              <div className="absolute left-[4462px] top-0"><Track /></div>
            </div>

            {/* edge fades — gradient divs at 20% of the clip box (15% at <=991) */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-[20%] dt:w-[15%]"
                 style={{ background: 'linear-gradient(270deg, rgba(244,243,240,0), rgb(244,243,240))' }} />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-[5] w-[20%] dt:w-[15%]"
                 style={{ background: 'linear-gradient(270deg, rgb(244,243,240), rgba(244,243,240,0))' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
