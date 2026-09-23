import Btn from './Btn'
import { Eyebrow } from './Section'

/**
 * Sub-page hero. Three measured shapes on the original:
 *  - `big`    120/600/121.2/−4.8 centred (about, careers)
 *  - `centre`  88/575/88/−3.52   centred, 960 cap (product pages)
 *  - `left`   57.6/600/57.6/−2.304 left, 596 cap (use-cases, pricing, contact)
 */
const SHAPE = {
  big: 'text-[120px] font-semibold leading-[121.2px] tracking-[-4.8px] dt:text-[80px] dt:leading-[82px] dt:tracking-[-3px] tb:text-[52px] tb:leading-[54px] tb:tracking-[-1.8px]',
  centre: 'text-[88px] font-[575] leading-[88px] tracking-[-3.52px] dt:text-[64px] dt:leading-[64px] dt:tracking-[-2.4px] tb:text-[44px] tb:leading-[46px] tb:tracking-[-1.5px]',
  left: 'text-[57.6px] font-semibold leading-[57.6px] tracking-[-2.304px] dt:text-[48px] dt:leading-[48px] tb:text-[36px] tb:leading-[38px] tb:tracking-[-1.2px]',
  // /careers measures 120/600/120/-3.6 — tighter leading than `big`
  bigTight: 'text-[120px] font-semibold leading-[120px] tracking-[-3.6px] dt:text-[80px] dt:leading-[80px] dt:tracking-[-2.4px] tb:text-[52px] tb:leading-[54px] tb:tracking-[-1.6px]',
  // /contact measures 64/600/64/-1.92 in an 800-wide centred band
  mid: 'text-[64px] font-semibold leading-[64px] tracking-[-1.92px] dt:text-[52px] dt:leading-[54px] tb:text-[38px] tb:leading-[40px] tb:tracking-[-1.2px]',
}

export default function PageHero({
  shape = 'left', eyebrow, title, sub, ctas = [], media, bg = 'transparent', children,
  pt, pb, band, tone = 'dark', texture,
}) {
  const centred = shape !== 'left' && shape !== 'mid'
  const light = tone === 'light'
  const cap = shape === 'mid' ? 'max-w-none' : centred ? 'mx-auto max-w-[960px]' : 'max-w-[596px]'
  return (
    <section
      className={`relative ${pt == null ? 'pt-[168px] tb:pt-[132px]' : 'tb:!pt-[132px]'}`}
      style={{ backgroundColor: bg, paddingTop: pt, paddingBottom: pb }}
    >
      {/* the original's hero band is a paper texture, not a flat fill */}
      {texture && (
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <img src={texture} alt="" className="h-full w-full object-cover" loading="lazy" />
        </span>
      )}
      <div className="relative">
      <div
        className={`container-clay ${centred ? 'text-center' : ''}`}
        style={band ? { maxWidth: band, width: '100%' } : undefined}
      >
        {eyebrow && <Eyebrow className={`mb-4 ${light ? 'text-white/70' : 'text-[#79756D]'}`}>{eyebrow}</Eyebrow>}
        <h1 className={`${SHAPE[shape]} ${light ? 'text-white' : 'text-black'} ${cap}`}>
          {title}
        </h1>
        {sub && (
          <p className={`mt-6 text-[20px] font-normal leading-[28px] tb:text-[16px] tb:leading-[24px] ${centred ? 'mx-auto max-w-[640px] text-[24px] leading-[31.2px] tb:text-[18px]' : shape === 'mid' ? 'max-w-[640px]' : 'max-w-[440px]'}`}
             style={{ color: light ? 'rgba(255,255,255,.72)' : 'rgb(85,83,78)' }}>
            {sub}
          </p>
        )}
        {ctas.length > 0 && (
          <div className={`mt-10 flex flex-wrap items-center gap-3 ${centred ? 'justify-center' : ''}`}>
            {ctas.map((c) => (
              <Btn key={c.label} href={c.href} variant={c.variant || 'dark'} big>{c.label}</Btn>
            ))}
          </div>
        )}
        {children}
        {media && (
          <div className="mt-16 overflow-hidden rounded-[32px]">
            <img src={media} alt="" className="w-full object-cover" loading="lazy" />
          </div>
        )}
      </div>
      </div>
    </section>
  )
}
