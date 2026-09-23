import HeroField from './HeroField'
import HeroCli from './HeroCli'
import A from '../ui/Link'

/**
 * §1 Hero — 1280x1072 (min-height 832). Content is a two-column row anchored to
 * the BOTTOM of the green field: .home-hero_intro sits at y=596, 1216x248, with
 * padding 0 48px 72px and margin-bottom 228px.
 *
 * Section height by breakpoint: 1072 (>=992) / 736 (991-768) / 704 (767-480) / 640 (<=479).
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[832px] flex-col justify-end overflow-hidden bg-green
                 mb:h-[640px] mb:min-h-0 tb:h-[704px] tb:min-h-0 dt:h-[736px] dt:min-h-0 lg:h-[1072px]"
    >
      <HeroField />

      <div className="container-clay relative z-10">
        <div
          className="mb-[228px] flex flex-row items-end gap-4 px-12 pb-[72px]
                     dt:mb-0 dt:flex-col dt:items-stretch dt:gap-6 dt:px-10 dt:pb-8
                     tb:gap-4 tb:px-7 tb:pb-8"
        >
          {/* Left — title, max-width 720 */}
          <div className="flex flex-1 flex-col gap-[14px]">
            <h1
              className="max-w-[720px] text-[88px] leading-[88px] tracking-[-3.52px] text-bg
                         dt:max-w-[560px] tb:max-w-[400px] mb:max-w-[320px]
                         dt:text-[64px] dt:leading-[64px] dt:tracking-[-2.56px]
                         tb:text-[48px] tb:leading-[48px] tb:tracking-[-1.92px]
                         mb:text-[41.6px] mb:leading-[41.6px] mb:tracking-[-1.664px]"
              style={{ fontWeight: 575 }}
            >
              Build systems to grow revenue
            </h1>
          </div>

          {/* Right — .u-stack-md, 342.16 wide, gap 24 */}
          <div className="flex w-[342.16px] shrink-0 flex-col gap-6 dt:w-full">
            <p className="max-w-[320px] text-[24px] font-normal leading-[31.2px] text-bg tb:text-[18px] tb:leading-[26px]">
              Infrastructure to get any data, run agentic workflows, and launch GTM plays.
            </p>

            <div className="flex flex-col">
              <div className="flex h-[47px] flex-row gap-[10px]">
                <A
                  href="/pricing"
                  className="btn inline-flex items-center gap-[9px] rounded-btn bg-white px-[18px] py-[9px]
                             text-[18px] font-medium leading-[27px] tracking-[-0.18px] text-black
                             transition-transform duration-200 ease-clay"
                  style={{ border: '1px solid transparent' }}
                >
                  Start free trial
                  <span className="block h-[18px] w-4 overflow-hidden">
                    <svg width="16" height="18" viewBox="0 0 16 18" aria-hidden="true">
                      <path d="M5 12.5 10.5 7M6 7h4.5v4.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </A>
                <A
                  href="/contact"
                  className="btn inline-flex items-center gap-[9px] rounded-btn px-[18px] py-[9px]
                             text-[18px] font-medium leading-[27px] tracking-[-0.18px] text-black
                             transition-transform duration-200 ease-clay"
                  style={{ background: '#CBD810', border: '1px solid transparent' }}
                >
                  Get a demo
                  <span className="block h-[18px] w-4 overflow-hidden">
                    <svg width="16" height="18" viewBox="0 0 16 18" aria-hidden="true">
                      <path d="M5 12.5 10.5 7M6 7h4.5v4.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </A>
              </div>

              <HeroCli />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
