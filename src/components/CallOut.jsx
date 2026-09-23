import { useEffect, useState } from 'react'

/**
 * .call-out — three logo chips over a 3-deep stacked quote rotator.
 * Measured: ~3630ms dwell, outgoing 600ms / incoming 300ms, scale(.98) <-> 1.
 * All groups on the page run in lock-step off one shared tick.
 *
 * Quote text is neutral placeholder on the original's exact type ramp
 * (14/400/18.2 body with a 14/700 lead-in) — swap in your own approved copy.
 */
const DWELL = 3630

export default function CallOut({ marks, quotes, accent, row = false }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % quotes.length), DWELL)
    return () => clearInterval(t)
  }, [quotes.length])

  return (
    <div className={row
      ? 'flex w-full flex-row items-start gap-[22px]'
      : 'flex w-full max-w-[400px] flex-col gap-3'}>
      {/* logo chips — 43.2px, 32px pitch via -11.2px margin */}
      <div className={row ? 'flex h-[43.2px] shrink-0 items-center pt-[5.6px]' : 'flex h-[43.2px] items-center'}>
        {marks.map((m, n) => (
          <span
            key={n}
            className="grid h-[43.2px] w-[43.2px] shrink-0 place-items-center rounded-[14px] bg-white"
            style={{ marginRight: '-11.2px', boxShadow: `inset 0 0 0 2px ${accent}`, zIndex: marks.length - n }}
          >
            <img src={`/assets/icon/${m}.svg`} alt="" className="h-6 w-6 object-contain" loading="lazy" />
          </span>
        ))}
      </div>

      {/* stacked quotes — inactive sit at opacity 0 / scale(.98) */}
      <div className={row ? 'grid min-h-[54.6px] w-full' : 'grid min-h-[54.6px]'}>
        {quotes.map((q, n) => (
          <p
            key={n}
            className="col-start-1 row-start-1 text-[14px] font-normal leading-[18.2px] text-ink"
            style={{
              opacity: n === i ? 1 : 0,
              transform: n === i ? 'scale(1)' : 'scale(.98)',
              transition: n === i
                ? 'opacity .3s ease, transform .3s ease'
                : 'opacity .6s ease, transform .6s ease',
            }}
            aria-hidden={n !== i}
          >
            <span className="font-bold">{q.lead}</span> {q.body}
          </p>
        ))}
      </div>
    </div>
  )
}
