import { useParams } from 'react-router-dom'
import PageHero from '../ui/PageHero'
import FeatureRows from '../ui/FeatureRows'
import CardGrid from '../ui/CardGrid'
import Quote from '../ui/Quote'
import Btn from '../ui/Btn'
import A from '../ui/Link'
import { Section, H2 } from '../ui/Section'
import { USE_CASES, SOLUTIONS } from '../data/usecases'
import NotFound from './NotFound'

export default function UseCasePage({ kind = 'use-case', slug: fixed }) {
  const { slug } = useParams()
  const u = (kind === 'solution' ? SOLUTIONS : USE_CASES)[fixed || slug]
  if (!u) return <NotFound />

  return (
    <>
      <PageHero
        shape="left"
        title={u.title}
        sub={u.sub}
        ctas={[{ label: 'Get a demo', href: '/contact' }, { label: 'Start free trial', href: '/pricing', variant: 'soft' }]}
      />

      {/* centred intro — h2 44/500/48.4/−0.88 over 16/400/22.4, 969 wide */}
      <Section>
        <div className="mx-auto max-w-[969px] text-center">
          <H2>{u.intro.h}</H2>
          <p className="mt-6 text-[16px] font-normal leading-[22.4px]" style={{ color: 'rgb(85,83,78)' }}>{u.intro.p}</p>
        </div>
        <div className="mt-14">
          <CardGrid cards={u.cards} />
        </div>
      </Section>

      {u.quote && (
        <Section bg="rgb(249,248,246)">
          <Quote {...u.quote} />
        </Section>
      )}

      {u.story && (
        <Section>
          <div className="rounded-[48px] px-16 py-20 tb:px-8 tb:py-12" style={{ background: 'rgb(243,242,237)' }}>
            {u.story.logo ? (
              <img src={u.story.logo} alt={u.story.name} className="h-[60px] w-auto object-contain tb:h-10" loading="lazy" />
            ) : (
              <h2 className="text-[60px] font-semibold leading-[60px] tracking-[-2.4px] text-black tb:text-[36px] tb:leading-[38px] tb:tracking-[-1.2px]">
                {u.story.name}
              </h2>
            )}
            <ul className="mt-10 flex flex-col gap-4">
              {u.story.stats.map((s) => (
                <li key={s} className="text-[16px] font-normal leading-6" style={{ color: 'rgb(85,83,78)' }}>{s}</li>
              ))}
            </ul>
            <A href={u.story.href} className="mt-10 inline-block text-[16px] font-medium leading-6 tracking-[-0.16px] text-black underline-offset-4 hover:underline">
              Read the {u.story.name} case study
            </A>
          </div>
        </Section>
      )}

      <Section pt={!u.story}>
        <FeatureRows rows={u.rows} size="sm" />
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
