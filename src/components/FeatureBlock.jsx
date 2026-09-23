import CallOut from './CallOut'
import A from '../ui/Link'

/**
 * One .home-feature_theme — position:sticky, top:72px, margin-bottom:-48px.
 * Inner item is 771px tall with padding-bottom:48px, so 723px shows and the
 * next card's 48px radius peeks underneath. Pure CSS: no JS, no opacity, no scale.
 */
export default function FeatureBlock({ card, isLast }) {
  const { bg, pills, pillIndex, activeBg, idleBg, deep, heading, headingAccent, body, bodyW, video, still, marks, quotes, buttons } = card

  return (
    <div
      className="sticky top-[72px] -mb-12 overflow-hidden pb-12 dt:pb-0 lg:min-h-[771px]"
      style={{
        background: bg,
        borderRadius: isLast ? '0 0 48px 48px' : '48px 48px 0 0',
      }}
    >
      <div className="grid dt:grid-cols-1 lg:grid-cols-[1fr_1fr]">
        {/* Left column — 608x723, padding 48 0 64 48 */}
        <div
          className={`flex flex-col justify-between gap-8 p-12 pb-16 pr-0 dt:gap-16 dt:p-10 dt:pb-14 tb:gap-12 tb:p-5 tb:pb-11 ${
            isLast ? 'lg:pb-12' : ''
          }`}
        >
          <div className="flex max-w-[560px] flex-col gap-4">
            {/* pill strip — active pill in front (z10), 3 collapsed 68px stubs
                behind it stepping right at 15.2px pitch (z2) */}
            <div className="relative flex h-8 items-center">
              <span
                className="relative z-10 inline-flex h-8 items-center rounded-[1600px] px-3"
                style={{ background: activeBg }}
              >
                <span className="whitespace-nowrap text-[12px] font-semibold uppercase leading-[18px] tracking-[3px] text-white">
                  {pills[pillIndex]}
                </span>
              </span>
              {[0, 1, 2].map((n) => (
                <span
                  key={n}
                  className="absolute top-0 z-[2] h-8 w-[68px] rounded-[1600px]"
                  style={{ left: 14.3 + n * 15.2, background: idleBg }}
                  aria-hidden="true"
                />
              ))}
            </div>

            <div className="flex max-w-[560px] flex-col gap-5">
              <h3
                className="max-w-[560px] text-[48px] font-medium leading-[48px] tracking-[-1.92px] tb:text-[32px] tb:leading-[32px] tb:tracking-[-1.28px]"
                style={{ color: deep }}
              >
                {heading}{' '}
                <span style={{ color: activeBg }}>{headingAccent}</span>
              </h3>
              <p className="text-[16px] font-normal leading-[22.4px]" style={{ color: deep, maxWidth: bodyW || 448 }}>{body}</p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <CallOut marks={marks} quotes={quotes} accent={idleBg} />
            <div className="flex h-[42px] flex-wrap gap-[10px]">
              <A
                href="/pricing"
                className="btn inline-flex items-center gap-2 rounded-btn px-4 py-2 text-[16px] font-medium leading-6 tracking-[-0.16px] text-white transition-transform"
                style={{ background: activeBg }}
              >
                {buttons[0]}
              </A>
              <A
                href="/contact"
                className="btn inline-flex items-center gap-2 rounded-btn bg-white px-4 py-2 text-[16px] font-medium leading-6 tracking-[-0.16px] transition-transform"
                style={{ color: deep }}
              >
                {buttons[1]}
              </A>
            </div>
          </div>
        </div>

        {/* Right column — 608x723, padding 24; media 560x675 radius 24 */}
        <div className="p-6 dt:px-5 dt:pb-5 dt:pt-0">
          <div
            className="relative h-full min-h-full overflow-hidden rounded-lg bg-white dt:rounded-2xl tb:rounded-[14px]"
            style={{ aspectRatio: '560 / 675' }}
          >
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={`/assets/video/${video}`}
              data-lazy
              loop
              muted
              playsInline
              preload="none"
            />
            <span className="video-poster">
              <img src={`/assets/img/${still}`} alt="" className="h-full w-full object-cover" loading="lazy" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
