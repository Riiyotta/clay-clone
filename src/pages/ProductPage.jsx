import { useParams } from 'react-router-dom'
import PageHero from '../ui/PageHero'
import FeatureRows from '../ui/FeatureRows'
import Faq from '../ui/Faq'
import Btn from '../ui/Btn'
import { Section } from '../ui/Section'
import Quote from '../ui/Quote'
import CardGrid from '../ui/CardGrid'
import { Eyebrow } from '../ui/Section'
import { PRODUCTS } from '../data/products'
import { PRODUCT_HEROES } from '../data/productHeroes'
import ProductHero from '../ui/ProductHero'
import ProductLogoWall from '../ui/ProductLogoWall'
import ProductBody from '../ui/product/Sections'
import { PRODUCT_BODIES, PAGE_BG } from '../data/productBodies'
import NotFound from './NotFound'

/* Generic three-step how-to, used where a product has no bespoke one. */
const DEFAULT_STEPS = [
  { h: 'Describe the task', p: 'Say what you want in plain language and let Clay turn it into a runnable step.' },
  { h: 'Connect your data', p: 'Point it at the audiences, CRM objects, and providers you already have in the workspace.' },
  { h: 'Deploy and monitor', p: 'Run it across a segment, watch the reasoning trace, and roll back any change that makes results worse.' },
]

/* Customer voice on the original's geometry; the attributed claims are replaced
   with neutral placeholder copy per the project convention (HANDOFF §4). */
const VOICES = [
  { q: 'Placeholder customer quote about the impact this part of Clay had on their go-to-market motion.', role: 'GTM Operations lead' },
  { q: 'Placeholder customer quote about replacing manual work at scale and what the team does instead now.', role: 'Head of Growth' },
  { q: 'Placeholder customer quote about research that would otherwise have taken the team months.', role: 'Revenue Operations manager' },
]

export default function ProductPage({ slug: fixed }) {
  const { slug } = useParams()
  const key = fixed || slug
  const p = PRODUCTS[key]
  if (!p) return <NotFound />
  const hero = PRODUCT_HEROES[key]
  const body = PRODUCT_BODIES[key]

  // Pages rebuilt from measurement render their own body; the rest still use the
  // generic template below until they are measured.
  if (hero && body) {
    return (
      <div style={{ background: PAGE_BG[key] }}>
        <ProductHero spec={hero} />
        {hero.logoWall && <ProductLogoWall pb={hero.logoWallPb ?? 96} />}
        <ProductBody sections={body} />
      </div>
    )
  }

  return (
    <div style={{ background: PAGE_BG[key] }}>
      {hero ? (
        <>
          <ProductHero spec={hero} />
          {hero.logoWall && <ProductLogoWall />}
        </>
      ) : (
        <PageHero
          shape="centre"
          eyebrow={p.eyebrow}
          title={p.title}
          sub={p.sub}
          ctas={[{ label: 'Start free trial', href: '/pricing' }, { label: 'Get a demo', href: '/demo', variant: 'soft' }]}
          media={p.hero}
        />
      )}

      {/* intro band — 72/500/72/−2.16 heading over a 20/400/26 lead */}
      <Section>
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="text-[72px] font-medium leading-[72px] tracking-[-2.16px] text-black dt:text-[52px] dt:leading-[54px] tb:text-[36px] tb:leading-[38px] tb:tracking-[-1.2px]">
            {p.intro.h}
          </h2>
          <p className="mx-auto mt-8 max-w-[480px] text-[20px] font-normal leading-[26px] tb:text-[16px] tb:leading-[24px]" style={{ color: 'rgb(85,83,78)' }}>
            {p.intro.p}
          </p>
        </div>
      </Section>

      <Section pt={false}>
        <FeatureRows rows={p.rows} size="lg" />
      </Section>

      {/* how-to band — 48/500/48/-1.92 heading with a 368 lead beside it */}
      <Section bg="rgb(249,248,246)">
        <div className="grid grid-cols-[448px_1fr] items-start gap-16 dt:grid-cols-1 dt:gap-8">
          <h2 className="text-[48px] font-medium leading-[48px] tracking-[-1.92px] text-black tb:text-[32px] tb:leading-[34px]">
            {p.howTo?.h || `How to get started with ${p.eyebrow}`}
          </h2>
          <p className="max-w-[368px] text-[20px] font-normal leading-[26px] tb:text-[16px] tb:leading-[24px]" style={{ color: 'rgb(85,83,78)' }}>
            {p.howTo?.p || 'Describe the task, connect the data you already have, and deploy it across your workspace.'}
          </p>
        </div>
        <div className="mt-14">
          <CardGrid cards={(p.howTo?.steps || DEFAULT_STEPS).map((st, i) => ({
            title: `${i + 1}. ${st.h}`, body: st.p, tint: '#fff',
          }))} />
        </div>
      </Section>

      {/* customer voice — 48/500/48/-1.92 heading over a 3-up of quotes */}
      <Section>
        <h2 className="mx-auto max-w-[480px] text-center text-[48px] font-medium leading-[48px] tracking-[-1.92px] text-black tb:text-[32px] tb:leading-[34px]">
          What our customers say about us
        </h2>
        <div className="mt-14 grid grid-cols-3 gap-8 dt:grid-cols-1">
          {VOICES.map((v) => (
            <figure key={v.role} className="flex h-full flex-col rounded-[32px] p-8" style={{ background: 'rgb(249,248,246)' }}>
              <blockquote className="text-[20px] font-normal leading-[28px] text-black tb:text-[16px] tb:leading-[24px]">{v.q}</blockquote>
              <figcaption className="mt-auto pt-8 text-[14px] font-normal leading-[19.6px]" style={{ color: 'rgb(123,121,116)' }}>{v.role}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section bg="rgb(249,248,246)">
        <Faq items={p.faq} heading={p.faqHeading || `FAQs about ${p.eyebrow}`} />
      </Section>

      <Section>
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
    </div>
  )
}
