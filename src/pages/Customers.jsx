import { useParams } from 'react-router-dom'
import PageHero from '../ui/PageHero'
import Btn from '../ui/Btn'
import A from '../ui/Link'
import { Section, H2, Eyebrow } from '../ui/Section'
import { STORIES, STORY_LIST } from '../data/customers'
import NotFound from './NotFound'

/* Marks available locally for the trusted-by wall. */
const TRUST_LOGOS = [
  'openai.svg', 'anthropic.svg', 'intercom.svg', 'vanta.svg', 'verkada.svg',
  'rippling.svg', 'mistralai.svg', 'figma.svg', 'canva-mark.svg', 'hubspot.svg',
]

/** Some customers have no downloaded logo file; those fall back to a wordmark. */
function Mark({ s, className = '' }) {
  if (s.logo) return <img src={s.logo} alt={s.name} className={`${className} w-auto self-start object-contain`} loading="lazy" />
  return <span className={`${className} flex items-center text-[22px] font-semibold tracking-[-0.44px] text-black`}>{s.name}</span>
}

export function CustomersIndex() {
  return (
    <>
      <section className="pt-[168px] tb:pt-[132px]">
        <div className="container-clay grid grid-cols-[1fr_380px] items-end gap-12 dt:grid-cols-1">
          <h1 className="text-[72px] font-medium leading-[72px] tracking-[-2.16px] text-black dt:text-[48px] dt:leading-[50px] tb:text-[34px] tb:leading-[36px] tb:tracking-[-1.2px]">
            Built with love. Inspired by our customers
          </h1>
          <p className="text-[18px] font-normal leading-[25.2px] tracking-[-0.36px]" style={{ color: 'rgb(85,83,78)' }}>
            Leverage 200+ data providers and AI agents to enrich, prioritize, and activate every account in your market.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-3 gap-8 dt:grid-cols-2 tb:grid-cols-1">
          {STORY_LIST.map((s) => (
            <A key={s.slug} href={`/customers/${s.slug}`}
               className="flex flex-col rounded-[32px] p-8 transition-transform hover:-translate-y-1"
               style={{ background: 'rgb(249,248,246)' }}>
              <Mark s={s} className="h-7" />
              <h2 className="mt-10 text-[32px] font-semibold leading-[38.4px] tracking-[-0.64px] text-black tb:text-[24px] tb:leading-[30px]">
                {s.headline}
              </h2>
              <p className="mt-auto pt-8 text-[14px] font-normal leading-[19.6px]" style={{ color: 'rgb(123,121,116)' }}>{s.industry}</p>
            </A>
          ))}
        </div>
      </Section>

      {/* trusted-by band — the original closes the index with a logo wall */}
      <Section bg="rgb(249,248,246)">
        <h2 className="mx-auto max-w-[760px] text-center text-[48px] font-medium leading-[48px] tracking-[-1.92px] text-black tb:text-[30px] tb:leading-[34px]">
          Trusted by more than 500,000+ leading GTM teams of all sizes
        </h2>
        <div className="mt-14 grid grid-cols-5 items-center gap-8 dt:grid-cols-3 tb:grid-cols-2">
          {TRUST_LOGOS.map((l) => (
            <img key={l} src={`/assets/icon/${l}`} alt="" loading="lazy"
                 className="h-7 w-full object-contain opacity-70" />
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-col items-center gap-8 text-center">
          <H2 center className="max-w-[640px]">Turn your growth ideas into reality today</H2>
          <div className="flex flex-wrap justify-center gap-3">
            <Btn href="/pricing" big>Start free trial</Btn>
            <Btn href="/contact" variant="soft" big>Get a demo</Btn>
          </div>
        </div>
      </Section>
    </>
  )
}

export function CustomerStory() {
  const { slug } = useParams()
  const s = STORIES[slug]
  if (!s) return <NotFound />

  return (
    <>
      <section className="pt-[168px] tb:pt-[132px]">
        <div className="container-clay">
          <A href="/customers" className="text-[12.8px] font-normal leading-[19.2px]" style={{ color: 'rgb(85,83,78)' }}>← All customers</A>
          <Mark s={s} className="mt-10 h-9" />
          <h1 className="mt-10 max-w-[840px] text-[32px] font-semibold leading-[35.2px] tracking-[-1.28px] text-black tb:text-[24px] tb:leading-[28px]">
            {s.headline}
          </h1>
        </div>
      </section>

      {/* opening pull-quote — 32/500/35.2/-0.64 on the original */}
      <Section pb={false}>
        <blockquote className="mx-auto max-w-[840px] text-center text-[32px] font-medium leading-[35.2px] tracking-[-0.64px] text-black tb:text-[22px] tb:leading-[27px]">
          {s.pullQuote || `Placeholder pull quote from the ${s.name} team about what changed once the play was running.`}
        </blockquote>
      </Section>

      <Section>
        <div className="grid grid-cols-[260px_1fr] gap-16 dt:grid-cols-1 dt:gap-10">
          {/* at-a-glance rail */}
          <aside className="flex flex-col gap-8">
            <div>
              <Eyebrow className="text-[#79756D]">At a glance</Eyebrow>
              <p className="mt-4 text-[16px] font-normal leading-[22.4px]" style={{ color: 'rgb(85,83,78)' }}>{s.lede}</p>
            </div>
            <div>
              <Eyebrow className="text-[#79756D]">Industry</Eyebrow>
              <p className="mt-2 text-[16px] font-normal leading-[22.4px] text-black">{s.industry}</p>
            </div>
            <div>
              <Eyebrow className="text-[#79756D]">Headquarters</Eyebrow>
              <p className="mt-2 text-[16px] font-normal leading-[22.4px] text-black">{s.hq}</p>
            </div>
            {s.site && (
              <A href={s.site} className="text-[12.8px] font-normal leading-[19.2px] text-black underline-offset-4 hover:underline">Visit {s.name} ↗</A>
            )}
          </aside>

          {/* body — 21.12/400/29.568 narrative, 38.72/500 section heads */}
          <article className="max-w-[720px]">
            {s.sections.map((sec) => (
              <section key={sec.h} className="mb-14">
                <h2 className="text-[38.72px] font-medium leading-[42.592px] tracking-[-0.7744px] text-black tb:text-[26px] tb:leading-[30px]">{sec.h}</h2>
                <p className="mt-6 text-[21.12px] font-normal leading-[29.568px] tb:text-[17px] tb:leading-[26px]" style={{ color: 'rgb(85,83,78)' }}>{sec.p}</p>
              </section>
            ))}

            <h2 className="text-[38.72px] font-medium leading-[42.592px] tracking-[-0.7744px] text-black tb:text-[26px] tb:leading-[30px]">Impact highlights</h2>
            <ul className="mt-6 flex list-disc flex-col gap-4 pl-6">
              {s.impact.map((i, n) => (
                <li key={n} className="text-[17.6px] font-medium leading-[26.4px]" style={{ color: 'rgb(85,83,78)' }}>{i}</li>
              ))}
            </ul>
          </article>
        </div>
      </Section>

      {/* closing narrative band */}
      <Section pt={false}>
        <div className="mx-auto max-w-[720px]">
          <h2 className="text-[38.72px] font-medium leading-[42.592px] tracking-[-0.7744px] text-black tb:text-[26px] tb:leading-[30px]">
            How Clay continues to accelerate {s.name}&rsquo;s GTM motion
          </h2>
          <p className="mt-6 text-[21.12px] font-normal leading-[29.568px] tb:text-[17px] tb:leading-[26px]" style={{ color: 'rgb(85,83,78)' }}>
            Placeholder closing narrative describing how the team keeps iterating on the play, what they are building
            next, and where Clay sits in the stack today.
          </p>
        </div>
      </Section>

      {/* explore more customers */}
      <Section bg="rgb(249,248,246)">
        <H2 className="text-[32px] leading-[35.2px] tracking-[-0.64px]">Explore more customers</H2>
        <div className="mt-12 grid grid-cols-3 gap-8 dt:grid-cols-2 tb:grid-cols-1">
          {STORY_LIST.filter((x) => x.slug !== s.slug).slice(0, 3).map((x) => (
            <A key={x.slug} href={`/customers/${x.slug}`}
               className="flex flex-col rounded-[32px] bg-white p-8 transition-transform hover:-translate-y-1">
              <Mark s={x} className="h-6" />
              <h3 className="mt-8 text-[24px] font-semibold leading-[28.8px] tracking-[-0.48px] text-black">{x.headline}</h3>
              <p className="mt-auto pt-6 text-[14px] font-normal leading-[19.6px]" style={{ color: 'rgb(123,121,116)' }}>{x.industry}</p>
            </A>
          ))}
        </div>
        <div className="mt-12">
          <Btn href="/customers" variant="soft" big>See all customers</Btn>
        </div>
      </Section>

      {/* product CTA the original closes on — 60/600/60/-2.4 */}
      <Section>
        <div className="rounded-[48px] px-16 py-20 text-center tb:px-8 tb:py-12" style={{ background: 'rgb(243,242,237)' }}>
          <h2 className="mx-auto max-w-[720px] text-[60px] font-semibold leading-[60px] tracking-[-2.4px] text-black dt:text-[44px] dt:leading-[46px] tb:text-[32px] tb:leading-[34px] tb:tracking-[-1px]">
            Streamline data enrichment
          </h2>
          <p className="mx-auto mt-8 max-w-[560px] text-[28px] font-normal leading-[33.6px] tb:text-[18px] tb:leading-[24px]" style={{ color: 'rgb(85,83,78)' }}>
            Leverage 100+ data sources and an AI agent with 140M monthly runs.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Btn href="/pricing" big>Start free trial</Btn>
            <Btn href="/contact" variant="soft" big>Get a demo</Btn>
          </div>
        </div>
      </Section>
    </>
  )
}
