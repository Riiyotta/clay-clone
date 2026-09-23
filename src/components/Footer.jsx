/**
 * §9 — footer. CTA band over a looping film, then an oat panel (radius 48 48 0 0)
 * holding a repeat(5,192px) link grid with 24px/40px gaps, and a three-cell credit
 * bar split 290.125 / 507.734 / 290.141.
 */
import A from '../ui/Link'
import { to } from '../lib'

const COL = (heading, links) => ({ heading, links })

const ROW1 = [
  COL('Use cases', ['Automated inbound', 'Account research', 'ABM', 'PLG assist', 'Rep assist', 'Reverse ETL', 'Outbound', 'CRM Enrichment', 'TAM Sourcing']),
  COL('Product', ['Claygent AI', 'Account Agents', 'Sculptor', 'Ads', 'Sequencer', 'Multi-provider data enrichment', 'Audiences', 'Signals', 'Workflows', 'Functions', 'Integrations', 'Pricing', 'Changelog']),
  COL('Blog', ['The rise of the GTM engineer', 'Placeholder post title one', 'Placeholder post title two', 'Placeholder longer post title that wraps']),
  COL('Resources', ['Get started lesson', 'University', 'Use case templates', 'Partner programs', 'Community', 'FAQ']),
  COL('Company', ['Contact us', 'About', 'Careers', 'Jobs', 'Integrate with Clay', 'Status']),
]

const ROW2_CUSTOMERS = COL('Customers', ['OpenAI', 'Vanta', 'Verkada', 'Sendoso', 'Anthropic', 'Coverflex', 'Rippling', 'Case studies'])
const ROW2_LEGAL = COL('Legal', ['Privacy policy', 'Terms of service', 'Do not sell my data'])

function List({ col }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[12px] font-semibold uppercase leading-[13.2px] tracking-[1.44px] text-black">
        {col.heading}
      </h3>
      <ul className="mb-5 flex flex-col gap-[10px]">
        {col.links.map((l, i) => (
          <li key={`${col.heading}-${i}`} className="leading-[17.6px]">
            <A
              href={to(l)}
              className="text-[14px] font-normal leading-[15.4px] hover:text-black"
              style={{ color: 'rgb(85,83,78)', transition: 'color .1s ease-out' }}
            >
              {l}
            </A>
          </li>
        ))}
      </ul>
    </div>
  )
}

const SOCIALS = [
  { n: 'LinkedIn', d: 'M4.98 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05C21.3 8.65 22 11 22 14.2V21h-4v-6c0-1.43-.03-3.27-2-3.27-2 0-2.3 1.56-2.3 3.17V21h-4z' },
  { n: 'YouTube', d: 'M22.5 7.2a2.6 2.6 0 0 0-1.83-1.84C19.05 4.92 12 4.92 12 4.92s-7.05 0-8.67.44A2.6 2.6 0 0 0 1.5 7.2C1.06 8.82 1.06 12 1.06 12s0 3.18.44 4.8a2.6 2.6 0 0 0 1.83 1.84c1.62.44 8.67.44 8.67.44s7.05 0 8.67-.44a2.6 2.6 0 0 0 1.83-1.84c.44-1.62.44-4.8.44-4.8s0-3.18-.44-4.8ZM9.75 15.02V8.98L15 12l-5.25 3.02Z' },
  { n: 'X', d: 'M17.5 3h3l-6.6 7.55L21.8 21h-5.9l-4.3-5.6L6.6 21H3.6l7-8.03L2.6 3h6l3.9 5.15L17.5 3Z' },
]

export default function Footer() {
  return (
    <footer
      className="relative flex flex-col items-center"
      style={{
        backgroundColor: 'rgb(255,253,249)',
        backgroundImage: 'linear-gradient(rgb(255,255,255), rgb(255,253,249) 15%)',
      }}
    >
      {/* CTA band — 640 wide, padding-top 80, margin-bottom -48 */}
      <div className="relative z-[2] mb-[-48px] flex w-full max-w-[640px] flex-col items-center justify-center pt-20 text-center tb:px-6">
        <h2 className="mb-[17.6px] text-[44px] font-medium leading-[48.4px] tracking-[-0.88px] text-black tb:text-[32px] tb:leading-[36px]">
          Turn your growth ideas into reality today
        </h2>
        <p className="mb-4 text-[16px] font-normal leading-[22.4px] text-black">
          Start for free today. No credit card required.
        </p>
        <div className="flex h-[42px] flex-row justify-center gap-2">
          <A
            href="/pricing"
            className="btn inline-flex items-center gap-2 rounded-btn bg-black px-4 py-2 text-[16px] font-medium leading-6 tracking-[-0.16px] text-white transition-transform"
            style={{ border: '1px solid transparent' }}
          >
            Start free trial
            <span className="block h-4 w-4 overflow-hidden">
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3.5 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </A>
          <A
            href="/contact"
            className="btn inline-flex items-center gap-2 rounded-btn bg-white px-4 py-2 text-[16px] font-medium leading-6 tracking-[-0.16px] text-black transition-transform"
            style={{ border: '1px solid rgb(0,0,0)' }}
          >
            Get a demo
          </A>
        </div>
      </div>

      {/* film spans the whole footer stack; the 384px spacer reserves the
          visible band above the oat panel, which sits on top at z-2 */}
      <div className="relative w-full">
        <div className="absolute inset-x-0 top-0 overflow-hidden" style={{ height: 1338.8 }}>
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/assets/video/Footer-05-29-Lossy-0001-0060.mp4"
            data-lazy loop muted playsInline preload="none"
            style={{ background: 'rgb(255,255,255)' }}
            aria-hidden="true"
          />
          <span className="video-poster">
            <img src="/assets/img/Footer-Still-1-.avif" alt="" className="h-full w-full object-cover" loading="lazy" />
          </span>
        </div>
        <div style={{ height: 384 }} />
      </div>

      {/* oat panel */}
      <div className="container-clay relative z-[2]">
        <div
          className="flex flex-col gap-16 px-12 pt-12 dt:px-6"
          style={{ background: 'rgb(244,243,240)', borderRadius: '48px 48px 0 0' }}
        >
          <div
            className="grid dt:!grid-cols-2 tb:!grid-cols-1 dt:![grid-template-rows:none]"
            style={{
              gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
              gridTemplateRows: '415.516px 259.953px',
              gap: '24px 40px',
              maxWidth: 1120,
            }}
          >
            {ROW1.map((c) => <div key={c.heading} className="flex flex-col items-start gap-12"><List col={c} /></div>)}
            <List col={ROW2_CUSTOMERS} />
            <div className="dt:hidden" style={{ gridColumn: '5 / 6', gridRow: '2 / 3' }}>
              <List col={ROW2_LEGAL} />
            </div>
            <div className="hidden dt:block"><List col={ROW2_LEGAL} /></div>
          </div>

          {/* credit bar */}
          <div
            className="grid items-center gap-4 py-12 dt:!grid-cols-1 dt:justify-items-center dt:gap-6 dt:text-center"
            style={{
              gridTemplateColumns: '290.125fr 507.734fr 290.141fr',
              maxWidth: 1120,
              borderTop: '1px solid rgba(209,205,199,0.5)',
            }}
          >
            <A href="/" aria-label="Clay home">
              <img src="/assets/img/Clay-primary-logo.avif" alt="Clay" width={128} height={41} className="h-[40.98px] w-32 object-cover" />
            </A>

            <div className="flex flex-col items-center justify-center gap-[1.6px]">
              <p className="text-[16px] font-normal leading-[22.4px] text-black">
                Unaffiliated clone · built for local development
              </p>
              <p className="text-[16px] font-semibold leading-[22.4px] text-black">
                Not associated with Clay Labs Inc.
              </p>
            </div>

            <div className="flex flex-row items-center justify-end gap-2 dt:justify-center">
              {SOCIALS.map((s) => (
                <A
                  key={s.n}
                  href={to(s.n)}
                  title={s.n}
                  aria-label={s.n}
                  className="grid h-10 w-10 place-items-center rounded-[10px] transition-opacity hover:opacity-70"
                  style={{ background: 'rgb(209,205,199)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-black" aria-hidden="true">
                    <path d={s.d} />
                  </svg>
                </A>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
