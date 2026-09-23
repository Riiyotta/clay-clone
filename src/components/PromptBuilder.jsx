import { useState } from 'react'
import useTypewriter from '../hooks/useTypewriter'

/* The three example queries the placeholder cycles through, one per chip.
   Clicking a chip jumps the typewriter to that string and restarts the cycle. */
const STRINGS = [
  'Find phone numbers for controllers or accounting directors in the US or UK with 100-1,000 employees',
  'Find companies with 30+ sales reps, $10M+ in revenue, and a free trial button on their website',
  'Find companies with 3+ open roles that mention international expansion in the job descriptions',
]

const CHIPS = ['Find people data', 'Find company data', 'Find jobs data']

export default function PromptBuilder() {
  const { text: placeholder, index: strIndex, jumpTo } = useTypewriter(STRINGS)
  const [value, setValue] = useState('')

  return (
    <section className="relative bg-bg">
      <div className="container-clay py-[112px] tb:py-4 mb:px-2 mb:py-4">
        <h3 className="text-center text-[48px] font-medium leading-[48px] tracking-[-1.92px] text-black tb:text-[32px] tb:leading-[34px] tb:tracking-[-0.96px]">
          What do you want to build?
        </h3>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative mx-auto mt-6 flex w-full max-w-[640px] flex-col justify-between"
        >
          {/* .home-action_wrap + the pulsing .home-action_scale card behind the textarea */}
          <div className="relative flex h-40 flex-col justify-center">
            <div
              className="absolute inset-0 animate-pulse-scale bg-white"
              style={{
                borderRadius: '23.2px',
                boxShadow: 'rgba(0,0,0,.12) 0 12px 24px -12px, rgba(209,205,199,.6) 0 0 0 1px inset',
                transition: 'box-shadow .5s cubic-bezier(.19,1,.22,1)',
              }}
            />
            <textarea
              rows={2}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
              aria-label="Describe what you want to build"
              className="relative z-[5] m-2 min-h-[144px] resize-none rounded-[20px] border-none bg-white
                         px-4 pb-4 pt-[11.2px] text-[16px] leading-[20.8px] tracking-[-0.01em] text-ink outline-none
                         placeholder:text-ink"
            />
          </div>

          {/* chip row — static, plus the 48x40 submit */}
          <div
            className="relative z-[5] mx-5 flex items-center justify-between gap-[10px] p-[11.2px]"
            style={{ background: 'rgb(244,243,240)', borderRadius: '0 0 23.2px 23.2px' }}
          >
            <div className="no-scrollbar -my-[11.2px] -ml-[11.2px] flex items-center gap-2 overflow-auto p-[11.2px]">
              {CHIPS.map((c, ci) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => jumpTo(ci)}
                  aria-pressed={ci === strIndex}
                  className="h-[40.19px] shrink-0 whitespace-nowrap rounded-btn px-4 text-[16px] font-medium leading-6"
                  style={{
                    background: 'rgb(254,253,251)',
                    color: 'rgb(123,121,116)',
                    border: ci === strIndex ? '1.5px solid #2B5CE6' : '1px solid rgba(123,121,116,.15)',
                    borderTop: ci === strIndex ? '1.5px solid #2B5CE6' : '1px solid #fff',
                    transition: 'color .15s linear, background-color .15s linear, border-color .2s linear',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>

            <button
              type="submit"
              className="grid h-10 w-12 shrink-0 place-items-center rounded-btn"
              style={{ background: 'rgb(27,26,24)', color: 'rgb(254,253,251)' }}
            >
              <span className="sr-only">Submit</span>
              <svg width="19.2" height="19.2" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12H19M12 19L19 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
