import { useState } from 'react'

/**
 * .hero-cli — 342.16x48 strip under the buttons, with a panel that reveals on
 * hover of .hero-cli_top (absolute, bottom:-120.5px, so it hangs below).
 */
const ICONS = ['Frame-2147261726', 'Frame-2147261727', 'Frame-2147261728']
const CMD = 'npx create-clay-app@latest'

export default function HeroCli() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard?.writeText(CMD).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div
      className="relative -mb-12 h-12 w-full max-w-[342.16px] rounded-btn"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        className="mt-2 flex h-10 items-center gap-3 rounded-btn transition-colors duration-100"
        style={{ background: open ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0)' }}
      >
        <span className="text-[14px] font-normal leading-[18.2px] text-bg">or install directly with</span>
        <span className="flex items-center gap-1">
          {ICONS.map((i) => (
            <span
              key={i}
              className="grid h-[25.6px] w-[25.6px] place-items-center rounded-[10px]"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            >
              <img src={`/assets/icon/${i}.svg`} alt="" className="h-5 w-5 object-contain" />
            </span>
          ))}
        </span>
      </div>

      {/* hover panel */}
      <div
        className="absolute left-0 w-full overflow-hidden rounded-2xl bg-bg"
        style={{
          bottom: -120.5,
          height: 120.5,
          boxShadow: 'rgba(21,21,24,0.1) 0 12px 36px -8px',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity .3s cubic-bezier(.075,.82,.165,1), transform .3s cubic-bezier(.075,.82,.165,1)',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <div className="flex h-[53.8px] items-center justify-between py-[9.6px] pl-6 pr-[9.6px]">
          <span className="text-[16px] font-medium leading-[22.4px] text-ink">Install the CLI</span>
          <button
            onClick={copy}
            className="flex h-[34.6px] items-center gap-[6.4px] rounded-btn bg-black px-[12.4px] py-[7.2px] text-[14px] font-medium leading-[18.2px] text-white"
            style={{ transition: 'transform .6s cubic-bezier(.19,1,.22,1), background-color .3s cubic-bezier(.075,.82,.165,1)' }}
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <div className="px-2 pb-2">
          <div className="rounded-sm bg-surface px-4 py-[11.2px] font-mono text-[14px] leading-[18.2px] text-ink">
            <span style={{ color: 'rgba(27,26,24,0.75)' }}>$</span> {CMD}
          </div>
        </div>
      </div>
    </div>
  )
}
