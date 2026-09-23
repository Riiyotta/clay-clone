import A from '../ui/Link'
/**
 * §8 — updates grid. 9 tracks of 120.89px with 16px gap (9x120.89 + 8x16 = 1216),
 * rows 231.719 / 277.453 / 231.719. Cards are auto-placed in DOM order except the
 * last, which is explicitly at grid-column 7/10, grid-row 2/4.
 *
 * The "conference banner" is not a separate component — it is card 0 using the
 * standard card pattern; the purple wash and purple eyebrow are what set it apart.
 */
const COLS = 'repeat(9, minmax(0, 1fr))' // 9x120.89 + 8x16 = 1216 at 1280
const ROWS = '231.719px 277.453px 231.719px'

/* Tall image-over-text card (0 and 5) */
function TallCard({ span, place, bg, img, eyebrow, eyebrowColor, title, link, href = '/' }) {
  return (
    <A
      href={href}
      className="group flex flex-col overflow-hidden transition-transform duration-300 ease-clay hover:-translate-y-1"
      style={{ ...place, ...(span ? { gridColumn: span.c, gridRow: span.r } : null), background: bg, borderRadius: 24 }}
    >
      <span className="relative block w-full overflow-hidden rounded-lg" style={{ paddingTop: 315.719 }}>
        <img src={`/assets/${img}`} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      </span>
      <span className="flex flex-1 flex-col items-start justify-between gap-[14px] p-6">
        <span className="text-[12px] font-semibold uppercase leading-[14.4px] tracking-[1.08px]" style={{ color: eyebrowColor }}>
          {eyebrow}
        </span>
        <span className="text-[24px] font-normal leading-[31.2px] text-black">{title}</span>
        <span className="flex h-6 items-center gap-1 text-[16px] font-medium leading-6 text-black">
          {link}
          <svg width="19.2" height="19.2" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
            <path d="M5 12h14M12 19l7-7-7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
    </A>
  )
}

/* Wide split card (1, 3) and compact card (2, 4) */
function FlatCard({ span, bg, eyebrow, title, link, img, wide, href = '/' }) {
  return (
    <A
      href={href}
      className="group flex overflow-hidden p-6 transition-transform duration-300 ease-clay hover:-translate-y-1"
      style={{ gridColumn: span.c, gridRow: span.r, background: bg, borderRadius: 24 }}
    >
      <span className={`flex w-full ${wide ? 'flex-row items-center gap-4' : 'flex-col justify-between gap-[14px]'}`}>
        <span className="flex flex-1 flex-col justify-between gap-[14px]">
          <span className="text-[12px] font-semibold uppercase leading-[14.4px] tracking-[1.08px] text-muted">{eyebrow}</span>
          <span className="text-[24px] font-normal leading-[31.2px] text-black">{title}</span>
          <span className="flex h-6 items-center gap-1 text-[16px] font-medium leading-6 text-black">
            {link}
            <svg width="19.2" height="19.2" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
              <path d="M5 12h14M12 19l7-7-7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>
        {wide && img && (
          <span className="relative hidden h-full w-[247px] shrink-0 overflow-hidden rounded-card lg:block">
            <img src={`/assets/${img}`} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          </span>
        )}
      </span>
    </A>
  )
}

export default function Updates() {
  return (
    <section
      className="relative pb-24 pt-16"
      style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0) 35%, rgb(255,255,255))' }}
    >
      <div className="container-clay">
        <div className="flex flex-col gap-8">
          <div className="mx-auto flex max-w-[640px] flex-col items-center gap-[12.8px]">
            <h3 className="text-center text-[48px] font-medium leading-[48px] tracking-[-1.92px] text-black tb:text-[32px] tb:leading-[34px] tb:tracking-[-0.96px]">
              Learn more about GTM engineering
            </h3>
          </div>

          <div
            className="grid gap-4 dt:!grid-cols-2 tb:!grid-cols-1 dt:![grid-template-rows:none]"
            style={{ gridTemplateColumns: COLS, gridTemplateRows: ROWS }}
          >
            <TallCard
              span={{ c: 'span 3', r: 'span 2' }}
              bg="rgb(245,243,255)"
              img="icon/Content-Card.svg"
              eyebrow="Conference"
              eyebrowColor="rgb(161,123,249)"
              title="Sculpt: The go-to-market conference returns in 2026"
              link="Get tickets"
              href="/events"
            />
            <FlatCard
              span={{ c: 'span 6', r: 'span 1' }}
              bg="rgb(244,243,240)"
              eyebrow="University"
              title="Get started with Clay"
              link="Start learning"
              href="/university"
              img="img/69a8c5e3e7848a9f84d7b885_HCUC-Livestream-Asset.avif"
              wide
            />
            <FlatCard
              span={{ c: 'span 3', r: 'span 1' }}
              bg="rgb(252,186,190)"
              eyebrow="Livestream"
              title="How Clay uses Clay"
              link="Watch"
              href="/livestreams"
            />
            <FlatCard
              span={{ c: 'span 4', r: 'span 1' }}
              bg="rgb(244,243,240)"
              eyebrow="Community story"
              title="Placeholder community story headline"
              link="Read story"
              href="/community"
              img="img/community-story.avif"
              wide
            />
            <FlatCard
              span={{ c: 'span 2', r: 'span 1' }}
              bg="rgb(244,243,240)"
              eyebrow="Careers"
              title="Come and join us"
              link="See open roles"
              href="/careers#roles"
            />
            <TallCard
              place={{ gridColumn: '7 / 10', gridRow: '2 / 4' }}
              bg="rgb(240,248,255)"
              img="img/more-clay-4.avif"
              eyebrow="Community story"
              eyebrowColor="rgb(66,158,255)"
              title="Placeholder second community story headline"
              link="Read story"
              href="/community"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
