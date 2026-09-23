import PageHero from '../ui/PageHero'
import Btn from '../ui/Btn'
import A from '../ui/Link'
import { Section, H2, Eyebrow } from '../ui/Section'
import { INVESTORS, PRESS, TIMELINE, TEAM } from '../data/misc'
import { STORY_LIST } from '../data/customers'

export default function About() {
  return (
    <>
      <PageHero
        shape="big"
        title="Welcome to Clay"
        sub="We help every company grow to its full potential. Just like LLMs predict the next word, we think go-to-market should predict the next best action."
        ctas={[{ label: 'Explore open roles', href: '/careers#roles' }]}
      />

      {/* 80/500/80/−3.2 band */}
      <Section>
        <div className="mx-auto max-w-[820px] text-center">
          <h2 className="text-[80px] font-medium leading-[80px] tracking-[-3.2px] text-black dt:text-[56px] dt:leading-[58px] tb:text-[36px] tb:leading-[38px] tb:tracking-[-1.2px]">
            Build any go-to-market play on Clay
          </h2>
          <p className="mx-auto mt-10 max-w-[520px] text-[20px] font-normal leading-[28px] tb:text-[16px] tb:leading-[24px]" style={{ color: 'rgb(85,83,78)' }}>
            People are combining our data, agents, signals, and workflows in hundreds of ways we never planned for.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-4 gap-6 dt:grid-cols-2 tb:grid-cols-1">
          {STORY_LIST.slice(0, 4).map((s) => (
            <A key={s.slug} href={`/customers/${s.slug}`} className="rounded-[32px] p-8 transition-transform hover:-translate-y-1" style={{ background: 'rgb(249,248,246)' }}>
              {s.logo
                ? <img src={s.logo} alt={s.name} className="h-6 w-auto object-contain" loading="lazy" />
                : <span className="block text-[20px] font-semibold leading-6 text-black">{s.name}</span>}
              <p className="mt-8 text-[20px] font-normal leading-[28px] text-black">{s.headline}</p>
            </A>
          ))}
        </div>
      </Section>

      {/* GTM engineers */}
      <Section bg="rgb(249,248,246)">
        <h2 className="text-[80px] font-semibold leading-[80px] tracking-[-2.4px] text-black dt:text-[52px] dt:leading-[54px] tb:text-[34px] tb:leading-[36px] tb:tracking-[-1px]">
          We power GTM engineers
        </h2>
        <p className="mt-8 max-w-[640px] text-[20px] font-normal leading-[28px] tb:text-[16px]" style={{ color: 'rgb(85,83,78)' }}>
          A generation of operators has turned go-to-market into an engineering discipline. Clay is the workspace they build in.
        </p>
        <div className="mt-12">
          <Btn href="/careers#roles" big>Check out open roles</Btn>
        </div>
      </Section>

      {/* our story timeline */}
      <Section>
        <h2 className="text-[96px] font-medium leading-[96px] tracking-[-3.84px] text-black dt:text-[64px] dt:leading-[66px] tb:text-[40px] tb:leading-[42px] tb:tracking-[-1.4px]">
          Our story
        </h2>
        <img src="/assets/img/Clay-Timeline-Updated.avif" alt="Clay's timeline from 2017 to today"
             className="mt-16 w-full object-contain" loading="lazy" />
        <ol className="mt-16 grid grid-cols-7 gap-4 dt:grid-cols-4 tb:grid-cols-2">
          {TIMELINE.map((t) => (
            <li key={t.year} className="border-t pt-4" style={{ borderColor: 'rgba(209,205,199,0.9)' }}>
              <Eyebrow className="tracking-[1.44px]" >{t.year}</Eyebrow>
              <p className="mt-2 text-[12px] font-semibold uppercase leading-[12px] tracking-[1.44px]" style={{ color: 'rgb(85,83,78)' }}>{t.label}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* our team */}
      <Section pt={false}>
        <h2 className="text-[60px] font-semibold leading-[60px] tracking-[-2.4px] text-black dt:text-[44px] dt:leading-[46px] tb:text-[32px] tb:leading-[34px] tb:tracking-[-1px]">
          Our team
        </h2>
        <p className="mt-8 max-w-[640px] text-[20px] font-normal leading-[28px] tb:text-[16px]" style={{ color: 'rgb(85,83,78)' }}>
          Engineers, designers, operators, and a lot of people who were something else entirely before this.
        </p>
        <div className="mt-14 grid grid-cols-6 gap-4 dt:grid-cols-4 tb:grid-cols-3">
          {TEAM.map((n) => (
            <div key={n} className="flex aspect-square items-end rounded-[16px] p-3"
                 style={{ background: 'rgb(244,243,240)' }}>
              <span className="text-[16px] font-medium leading-[22.4px] text-black">{n}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* investors */}
      <Section bg="rgb(249,248,246)">
        <div className="mx-auto max-w-[680px] text-center">
          <h2 className="text-[72px] font-semibold leading-[79.2px] tracking-[-1.44px] text-black dt:text-[48px] dt:leading-[54px] tb:text-[32px] tb:leading-[36px]">
            Backed by world-class investors
          </h2>
          <p className="mx-auto mt-8 max-w-[560px] text-[20px] font-normal leading-[28px] tb:text-[16px]" style={{ color: 'rgb(85,83,78)' }}>
            Helping companies grow autonomously is a long project, and we have partners who are in it for the length of it.
          </p>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
          {INVESTORS.map((i) => (
            <span key={i} className="text-[24px] font-semibold leading-[28.8px] tracking-[-0.48px] text-black">{i}</span>
          ))}
        </div>
      </Section>

      {/* press */}
      <Section>
        <H2 center className="text-[72px] leading-[79.2px] tracking-[-1.44px] dt:text-[48px] dt:leading-[54px]">In the news</H2>
        <div className="mt-16 grid grid-cols-4 gap-8 dt:grid-cols-2 tb:grid-cols-1">
          {PRESS.map((p) => (
            <article key={p.title}>
              <Eyebrow className="text-[#79756D]">{p.kind} — {p.outlet}</Eyebrow>
              <h3 className="mt-4 text-[24px] font-semibold leading-[28.8px] tracking-[-0.48px] text-black">{p.title}</h3>
              <p className="mt-4 text-[16px] font-normal leading-[22.4px]" style={{ color: 'rgb(85,83,78)' }}>{p.blurb}</p>
              <A href="/press" className="mt-6 inline-block text-[16px] font-semibold leading-[22.4px] tracking-[-0.32px] text-black underline-offset-4 hover:underline">Read article</A>
            </article>
          ))}
        </div>
        <div className="mt-14 flex justify-center">
          <Btn href="/press" variant="soft" big>Read more press</Btn>
        </div>
      </Section>
    </>
  )
}
