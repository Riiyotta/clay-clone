import { useRef, useState } from 'react'

/**
 * §7 — customer slider. Measured: section 1280x775.1.
 *   h3      x360 y6818.5 560x96, 48/500/48/-1.92, CENTRED
 *   wrap    x32 1216x519.1 ; slider x80 1120x519.1 (z5)
 *   slides  896x504, radius 32, pitch 904, z 90/100/90,
 *           neighbours peeking at both edges
 * Drag-driven only — no autoplay, no arrows, no dots.
 * Headlines are neutral placeholders on the original's type ramp.
 */
const SLIDES = [
  { media: 'video-clay-ph.avif', title: 'Placeholder customer headline for the first case study' },
  { media: 'v-logo-ph.avif',     title: 'Placeholder customer headline for the second case study', film: true },
  { media: 'hex.avif',           title: 'Placeholder customer headline for the third case study' },
]

const PITCH = 904

export default function Customers() {
  const [i, setI] = useState(1)
  const drag = useRef(null)

  const go = (n) => setI(Math.max(0, Math.min(SLIDES.length - 1, n)))

  return (
    <section className="relative overflow-hidden pb-16 pt-16">
      <div className="container-clay overflow-x-clip">
        <h3 className="mx-auto max-w-[560px] text-center text-[48px] font-medium leading-[48px] tracking-[-1.92px] text-black
                       tb:text-[32px] tb:leading-[32px] tb:tracking-[-1.28px]">
          Hear from the teams that grow with Clay
        </h3>

        <div
          className="relative mt-10 h-[504px] select-none overflow-hidden pb-[7px] box-content"
          onPointerDown={(e) => { drag.current = e.clientX }}
          onPointerUp={(e) => {
            if (drag.current == null) return
            const d = e.clientX - drag.current
            if (Math.abs(d) > 60) go(i + (d < 0 ? 1 : -1))
            drag.current = null
          }}
        >
          {SLIDES.map((s, n) => {
            const off = (n - i) * PITCH
            const centre = n === i
            return (
              <div
                key={n}
                onClick={() => !centre && go(n)}
                className="absolute top-0 overflow-hidden rounded-[32px] bg-ink"
                style={{
                  width: 896, height: 504,
                  left: '50%',
                  transform: `translateX(calc(-50% + ${off}px))`,
                  transition: 'transform 600ms cubic-bezier(.19,1,.22,1)',
                  zIndex: centre ? 100 : 90,
                  cursor: centre ? 'grab' : 'pointer',
                }}
              >
                {centre && s.film ? (
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    src="/assets/video/euro_case_study_final_v1_-2-_-1-_v1-1080p-.mp4"
                    poster={`/assets/img/${s.media}`}
                    muted playsInline preload="metadata"
                  />
                ) : (
                  <img src={`/assets/img/${s.media}`} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                )}

                {/* dark wash + white caption */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(rgba(0,0,0,0) 45%, rgba(0,0,0,0.62))' }} />
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-10 pb-10 text-center">
                  <p className="max-w-[352px] text-[24px] font-normal leading-[31.2px] text-bg">{s.title}</p>
                  <span className="inline-flex items-center gap-2 text-[16px] font-medium leading-6 text-bg underline decoration-[1.5px] underline-offset-4">
                    Read case study
                    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                      <path d="M2.5 7h9M8 3.5 11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
