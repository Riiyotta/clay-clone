import A from './Link'

/**
 * Alternating media/copy rows. Product pages use h3 48/500/48/−1.92 in a 438
 * column; use-case pages use h2 44/500/48.4/−1.32 in a 552 column.
 */
export default function FeatureRows({ rows, size = 'lg' }) {
  const head = size === 'lg'
    ? 'text-[48px] font-medium leading-[48px] tracking-[-1.92px] tb:text-[32px] tb:leading-[34px] tb:tracking-[-1px]'
    : 'text-[44px] font-medium leading-[48.4px] tracking-[-1.32px] tb:text-[30px] tb:leading-[34px] tb:tracking-[-1px]'
  const body = size === 'lg'
    ? 'text-[20px] leading-[26px] tb:text-[16px] tb:leading-[24px]'
    : 'text-[16px] leading-[22.4px]'

  return (
    <div className="flex flex-col gap-[120px] tb:gap-16">
      {rows.map((r, i) => (
        <div key={r.title} className="grid grid-cols-2 items-center gap-16 dt:grid-cols-1 dt:gap-8">
          <div className={i % 2 ? 'dt:order-1' : 'order-2 dt:order-1'}>
            <h3 className={`${head} max-w-[552px] text-black`}>{r.title}</h3>
            <p className={`mt-6 max-w-[552px] font-normal ${body}`} style={{ color: 'rgb(85,83,78)' }}>{r.body}</p>
            {r.link && (
              <A href={r.link.href} className="mt-8 inline-flex items-center gap-1.5 text-[16px] font-normal leading-6 text-black underline-offset-4 hover:underline">
                {r.link.label}
                <svg width="14" height="14" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </A>
            )}
          </div>
          <div className={`${i % 2 ? 'order-2 dt:order-2' : 'dt:order-2'} overflow-hidden rounded-[32px]`}
               style={{ background: r.tint || 'rgb(243,242,237)' }}>
            {r.img && <img src={r.img} alt="" className="h-full w-full object-cover" loading="lazy" />}
          </div>
        </div>
      ))}
    </div>
  )
}
