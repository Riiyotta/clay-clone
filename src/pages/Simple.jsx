import PageHero from '../ui/PageHero'
import Faq from '../ui/Faq'
import A from '../ui/Link'
import Btn from '../ui/Btn'
import { Section, Eyebrow } from '../ui/Section'
import { CHANGELOG, FAQS } from '../data/misc'

export function Changelog() {
  return (
    <>
      <PageHero shape="left" eyebrow="Changelog" title="What shipped recently"
        sub="Everything new in Clay, newest first." />
      <Section>
        <div className="mx-auto max-w-[760px]">
          {CHANGELOG.map((c) => (
            <article key={c.title} className="grid grid-cols-[140px_1fr] gap-10 py-10 tb:grid-cols-1 tb:gap-4"
                     style={{ borderTop: '1px solid rgba(209,205,199,0.7)' }}>
              <Eyebrow className="pt-2 text-[#79756D]">{c.date}</Eyebrow>
              <div>
                <h2 className="text-[24px] font-semibold leading-[28.8px] tracking-[-0.48px] text-black">{c.title}</h2>
                <p className="mt-3 text-[16px] font-normal leading-[22.4px]" style={{ color: 'rgb(85,83,78)' }}>{c.body}</p>
              </div>
            </article>
          ))}
          <div style={{ borderTop: '1px solid rgba(209,205,199,0.7)' }} />
        </div>
      </Section>
    </>
  )
}

export function FaqPage() {
  return (
    <>
      <PageHero shape="left" title="Frequently asked questions" sub="The questions we get most often about plans, data, and security." />
      <Section><Faq items={FAQS} heading="FAQ" /></Section>
    </>
  )
}

/** Legal pages — a single measure column of headed clauses. */
export function Legal({ title, updated, clauses }) {
  return (
    <>
      <PageHero shape="left" title={title} sub={`Last updated ${updated}`} />
      <Section>
        <div className="mx-auto max-w-[720px]">
          {clauses.map((c) => (
            <section key={c.h} className="mb-12">
              <h2 className="text-[24px] font-semibold leading-[28.8px] tracking-[-0.48px] text-black">{c.h}</h2>
              <p className="mt-4 text-[16px] font-normal leading-[24px]" style={{ color: 'rgb(85,83,78)' }}>{c.p}</p>
            </section>
          ))}
          <p className="text-[16px] font-normal leading-[24px]" style={{ color: 'rgb(85,83,78)' }}>
            Questions about this policy? <A href="/contact" className="text-black underline underline-offset-4">Contact us</A>.
          </p>
        </div>
      </Section>
    </>
  )
}

/**
 * Resource / community / partner routes. They share one shape on the original:
 * left hero, a short intro, a 3-up card row, and the CTA band.
 */
export function Simple({ eyebrow, title, sub, cards = [], cta = true }) {
  return (
    <>
      <PageHero shape="left" eyebrow={eyebrow} title={title} sub={sub}
        ctas={[{ label: 'Start free trial', href: '/pricing' }, { label: 'Get a demo', href: '/contact', variant: 'soft' }]} />
      {cards.length > 0 && (
        <Section>
          <div className="grid grid-cols-3 gap-8 dt:grid-cols-2 tb:grid-cols-1">
            {cards.map((c) => (
              <div key={c.title} className="rounded-[32px] p-8" style={{ background: 'rgb(249,248,246)' }}>
                <h2 className="text-[24px] font-semibold leading-[28.8px] tracking-[-0.48px] text-black">{c.title}</h2>
                <p className="mt-4 text-[16px] font-normal leading-[22.4px]" style={{ color: 'rgb(85,83,78)' }}>{c.body}</p>
              </div>
            ))}
          </div>
        </Section>
      )}
      {cta && (
        <Section pt={cards.length === 0}>
          <div className="flex flex-col items-center gap-8 text-center">
            <h2 className="max-w-[640px] text-[44px] font-medium leading-[48.4px] tracking-[-0.88px] text-black tb:text-[30px] tb:leading-[34px]">
              Turn your growth ideas into reality today
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Btn href="/pricing" big>Start free trial</Btn>
              <Btn href="/contact" variant="soft" big>Get a demo</Btn>
            </div>
          </div>
        </Section>
      )}
    </>
  )
}
