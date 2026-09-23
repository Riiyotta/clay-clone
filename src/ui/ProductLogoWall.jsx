import { useState } from 'react'

/**
 * The customer logo wall that follows five of the product heroes. Measured at
 * 1280: 10 columns of 107.2×60.3 with a 16px gap (123.2 pitch), two rows 76.3
 * apart, logos object-fit: contain. Hovering a logo that carries a story reveals a
 * 343-wide coloured card (r12) whose bottom sits at the logo's vertical centre.
 *
 * Card copy is neutral placeholder text on the original's geometry — the original
 * carries named testimonials, which this build does not reproduce (HANDOFF §4).
 */
const I = (n) => `/assets/img/${n}`
const LOGOS = [
  { n: 'Canva', src: I('Canva-logo.png'), card: { bg: 'rgb(6,103,217)', tag: 'Hackathon', h: 169 } },
  { n: 'HubSpot', src: I('hubspot.svg') },
  { n: 'Vanta', src: I('img-logo-vanta.svg'), card: { bg: 'rgb(139,4,92)', tag: 'Case study', h: 193 } },
  { n: 'Intercom', src: I('img-logo-intercom.svg'), card: { bg: 'rgb(0,88,112)', tag: 'Case study', h: 214 } },
  { n: 'Google', src: I('Google-logo.svg'), card: { bg: 'rgb(221,44,83)', tag: 'Hackathon', h: 190 } },
  { n: 'OpenAI', src: I('OpenAI-logo.svg'), card: { bg: 'rgb(0,88,112)', tag: 'Case study', h: 256 } },
  { n: 'ElevenLabs', src: I('ElevenLabs.svg'), card: { bg: 'rgb(7,138,82)', tag: 'Case study', h: 214 } },
  { n: 'Cursor', src: I('cursor-logo.svg') },
  { n: 'Anthropic', src: I('img-logo-anthropic.svg'), card: { bg: 'rgb(195,78,27)', tag: 'Case study', h: 214 } },
  { n: 'Stripe', src: I('stripe-logo.svg') },
  { n: 'Ramp', src: I('img-logo-ramp.svg') },
  { n: 'Rippling', src: I('67cf030c_Frame.svg'), card: { bg: 'rgb(7,138,82)', tag: 'Case study', h: 277 } },
  { n: 'Notion', src: I('img-logo-notion.svg') },
  { n: 'Customer', src: I('67c5da60_Frame.svg') },
  { n: 'Uber', src: I('uber_logo.avif') },
  { n: 'Figma', src: I('figma.svg'), card: { bg: 'rgb(69,1,46)', tag: 'Case study', h: 214 } },
  { n: 'Workday', src: I('worday-new.svg') },
  { n: 'Verkada', src: I('img-logo-verkada.svg') },
  { n: 'Okta', src: I('Okta-logo.svg') },
  { n: 'Klaviyo', src: I('klav.svg') },
]

function Card({ l, col }) {
  // cards near the right edge open leftwards so they stay inside the container
  const alignRight = col >= 7
  return (
    <div
      className="pointer-events-none absolute z-20 flex w-[343px] flex-col justify-end rounded-[12px] p-4 text-white"
      style={{ background: l.card.bg, height: l.card.h, bottom: '50%', [alignRight ? 'right' : 'left']: 0 }}
    >
      <p className="text-[14px] font-normal leading-[21px] tracking-[-0.14px]">
        Placeholder testimonial about how {l.n} runs its go-to-market on Clay.
      </p>
      <p className="mt-3 text-[14px] font-semibold leading-[21px] tracking-[-0.14px]">{l.card.tag}</p>
    </div>
  )
}

export default function ProductLogoWall({ pb = 96 }) {
  const [hover, setHover] = useState(-1)
  return (
    <section style={{ paddingBottom: pb }} aria-label="Customers">
      <div className="container-clay">
        <ul className="grid grid-cols-10 gap-4 dt:grid-cols-5 tb:grid-cols-4 mb:grid-cols-3">
          {LOGOS.map((l, i) => (
            <li key={l.n + i} className="relative h-[60.3px]"
                onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)}>
              {l.card && hover === i && <Card l={l} col={i % 10} />}
              <img src={l.src} alt={l.n} loading="lazy"
                   className="relative z-10 h-full w-full object-contain transition-opacity duration-200"
                   style={{ opacity: hover !== -1 && hover !== i ? 0.5 : 1 }} />
              {l.card && (
                <span className="absolute left-1/2 top-[52px] z-10 -translate-x-1/2 whitespace-nowrap text-[9.6px] font-semibold leading-[14.4px] tracking-[-0.1px]"
                      style={{ color: 'rgb(56,89,249)', opacity: hover === i ? 1 : 0, transition: 'opacity .2s' }}>
                  {l.card.tag}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
