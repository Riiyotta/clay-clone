import A from '../ui/Link'
import CallOut from './CallOut'

/**
 * §6 — Reps. Measured off the original at 1280 (y offsets are section-relative):
 *   section  1280x912.6, padding 48 top / 112 bottom, content inset x80 w1120
 *   eyebrow  ry48  x80  w1120 h18   12/600/18/3px uppercase #008BAD
 *   h3       ry82  x80  544x96      48/500/48/-1.92 #1B1A18 + #008BAD accent run
 *   link     ry194 x80  ~124x24     16/400/24 underlined
 *   body     ry86  x704 496x78      20/400/26 #1B1A18 (right column, pad-top 4)
 *   callout  ry194 x704 496x54.6    chips 96x43.2 + 378-wide rotating quote
 *   video    ry296.5 x80 1120x504
 *
 * Quote copy is neutral placeholder on the original's exact type ramp
 * (14/400/18.2 with a 14/700 lead-in), per the project's copy convention.
 */
const QUOTES = [
  { lead: 'Placeholder —', body: 'a two-line customer note sits here, on the original’s type ramp. Swap in your own approved copy.' },
  { lead: 'Placeholder —', body: 'second rotation slot, sized to the same 378-wide, three-line measure as the first.' },
  { lead: 'Placeholder —', body: 'third rotation slot. The chips, dwell and cross-fade match the original; the words do not.' },
]

export default function Reps() {
  return (
    <section className="relative overflow-hidden pb-28 pt-12">
      <div className="container-clay">
        {/* content inset 48px inside the 1216 container => x80 w1120 */}
        <div className="px-12 dt:px-0">
          {/* text block — 216.6 tall incl. its 16px trailing pad */}
          <div className="pb-4">
            <p className="text-[12px] font-semibold uppercase leading-[18px] tracking-[3px]" style={{ color: '#008BAD' }}>
              GTM Infrastructure
            </p>

            <div className="mt-4 grid grid-cols-[544px_496px] gap-x-20 dt:grid-cols-1 dt:gap-y-6">
              <div>
                <h3 className="text-[48px] font-medium leading-[48px] tracking-[-1.92px] text-ink tb:text-[32px] tb:leading-[32px] tb:tracking-[-1.28px]">
                  Build systems that make{' '}
                  <span style={{ color: '#008BAD' }}>reps more productive</span>
                </h3>
                <A
                  href="/pricing"
                  className="mt-4 inline-block text-[16px] font-normal leading-6 text-ink underline decoration-[1.6px] underline-offset-4"
                >
                  Start free trial
                </A>
              </div>

              {/* right column: 82-tall body block, 30px gap, 54.6-tall callout */}
              <div className="flex flex-col gap-[30px] dt:max-w-[496px]">
                <p className="pt-1 text-[20px] font-normal leading-[26px] text-ink">
                  Reps can self-serve the best prospecting data, with full account context already
                  attached to the record they are working.
                </p>
                <CallOut row marks={['terrappin-mark', 'pendo-mark', 'hex-mark']} quotes={QUOTES} accent="#F4F3F0" />
              </div>
            </div>
          </div>

          {/* 1120x504 film, 32px below the text block */}
          <div className="relative mt-8 w-full overflow-hidden rounded-lg">
            <div className="relative w-full" style={{ aspectRatio: '1120 / 504' }}>
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src="/assets/video/Reps-06-16-1500px.webm"
                data-lazy loop muted playsInline preload="none"
              />
              <span className="video-poster">
                <img src="/assets/img/Reps-Still-1.avif" alt="" className="h-full w-full object-cover" loading="lazy" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
