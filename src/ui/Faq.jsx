import { useState } from 'react'

/** h4 24/400/31.2 question, 16/400/22.4 answer, hairline rows. */
export default function Faq({ items, heading = 'FAQ' }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="grid grid-cols-[320px_1fr] gap-16 dt:grid-cols-1 dt:gap-8">
      <h2 className="text-[48px] font-medium leading-[48px] tracking-[-1.92px] text-black tb:text-[32px] tb:leading-[34px]">
        {heading}
      </h2>
      <div className="max-w-[640px]">
        {items.map((it, i) => (
          <div key={it.q} style={{ borderTop: '1px solid rgba(209,205,199,0.7)' }}>
            <button
              type="button"
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
              className="flex w-full items-start justify-between gap-6 py-6 text-left"
            >
              <span className="text-[24px] font-normal leading-[31.2px] text-black tb:text-[18px] tb:leading-[24px]">{it.q}</span>
              <span className="mt-2 shrink-0 transition-transform duration-200" style={{ transform: open === i ? 'rotate(45deg)' : 'none' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            {open === i && (
              <p className="pb-6 text-[16px] font-normal leading-[22.4px]" style={{ color: 'rgb(85,83,78)' }}>{it.a}</p>
            )}
          </div>
        ))}
        <div style={{ borderTop: '1px solid rgba(209,205,199,0.7)' }} />
      </div>
    </div>
  )
}
