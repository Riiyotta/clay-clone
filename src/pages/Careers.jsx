import PageHero from '../ui/PageHero'
import { Section, H2, Eyebrow } from '../ui/Section'
import A from '../ui/Link'
import { PRINCIPLES, ROLES, OFFICES, PERKS, BENEFITS, INTERVIEW } from '../data/misc'
import Btn from '../ui/Btn'

export default function Careers() {
  const teams = [...new Set(ROLES.map((r) => r.team))]
  return (
    <>
      <PageHero
        shape="bigTight"
        eyebrow="Careers at Clay"
        title="Build with us"
        sub="We help every company reach its full potential. Just as LLMs predict the next word, we think go-to-market should predict the next best action."
        ctas={[{ label: 'Explore open roles', href: '#roles' }]}
        bg="rgb(16,43,2)"
        texture="/assets/img/Career-Hero-Texturelabs_Paper.avif"
        tone="light"
        pt={212}
        pb={120}
      />

      <Section>
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="text-[72px] font-medium leading-[72px] tracking-[-2.16px] text-black dt:text-[48px] dt:leading-[50px] tb:text-[34px] tb:leading-[36px] tb:tracking-[-1.2px]">
            What we’re all about
          </h2>
          <p className="mx-auto mt-8 max-w-[600px] text-[20px] font-normal leading-[28px] tb:text-[16px]" style={{ color: 'rgb(85,83,78)' }}>
            Kindness and creativity run deep at Clay. We care about bringing out the brightest version of the people who work here.
          </p>
        </div>

        <div className="mx-auto mt-20 max-w-[640px]">
          <Eyebrow className="text-[#79756D]">Operating principles</Eyebrow>
          {PRINCIPLES.map((p) => (
            <div key={p.h} className="mt-10">
              <h3 className="text-[24px] font-semibold leading-[28.8px] tracking-[-0.48px] text-black">{p.h}</h3>
              <p className="mt-3 text-[16px] font-normal leading-[22.4px]" style={{ color: 'rgb(85,83,78)' }}>{p.p}</p>
            </div>
          ))}
          <p className="mt-10 text-[16px] font-normal leading-[22.4px]" style={{ color: 'rgb(85,83,78)' }}>
            How we operate follows from those two principles. We act on our best judgement and expect the same of everyone here.
          </p>
        </div>
      </Section>

      <Section bg="rgb(249,248,246)">
        <h2 className="text-[120px] font-semibold leading-[121.2px] tracking-[-4.8px] text-black dt:text-[72px] dt:leading-[74px] tb:text-[40px] tb:leading-[42px] tb:tracking-[-1.4px]">
          We embrace our zones of genius
        </h2>
      </Section>

      {/* Offices — 120/600/121.2/−4.8 heading, then a card per location */}
      <Section>
        <h2 className="text-[120px] font-semibold leading-[121.2px] tracking-[-4.8px] text-black dt:text-[72px] dt:leading-[74px] tb:text-[40px] tb:leading-[42px] tb:tracking-[-1.4px]">
          Offices
        </h2>
        <div className="mt-16 grid grid-cols-3 gap-8 dt:grid-cols-1">
          {OFFICES.map((o) => (
            <div key={o.code} className="flex flex-col rounded-[32px] p-8" style={{ background: 'rgb(249,248,246)' }}>
              <span className="text-[8px] font-medium uppercase leading-[8px]" style={{ color: 'rgb(123,121,116)' }}>{o.code}</span>
              <p className="mt-6 text-[16px] font-semibold uppercase leading-4 tracking-[0.16px] text-black">{o.city}</p>
              <p className="mt-2 text-[12.96px] font-normal leading-[18.144px] tracking-[-0.1296px]" style={{ color: 'rgb(85,83,78)' }}>{o.addr}</p>
              <p className="mt-6 text-[15.04px] font-medium leading-[20.1536px]" style={{ color: 'rgb(85,83,78)' }}>{o.blurb}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Collective effervescence — the perks strip */}
      <Section bg="rgb(249,248,246)">
        <Eyebrow className="text-[#79756D]">Life at Clay</Eyebrow>
        <h2 className="mt-6 text-[72px] font-medium leading-[72px] tracking-[-2.16px] text-black dt:text-[48px] dt:leading-[50px] tb:text-[34px] tb:leading-[36px] tb:tracking-[-1.2px]">
          Collective effervescence
        </h2>
        <div className="mt-16 grid grid-cols-2 gap-x-16 gap-y-12 dt:grid-cols-1">
          {PERKS.map((k) => (
            <div key={k.h}>
              <h3 className="text-[32px] font-medium leading-[35.2px] tracking-[-0.64px] text-black tb:text-[24px] tb:leading-[28px]">{k.h}</h3>
              <p className="mt-3 text-[16px] font-normal leading-[22.4px]" style={{ color: 'rgb(85,83,78)' }}>{k.p}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Our benefits — 4-up, two rows */}
      <Section>
        <div className="grid grid-cols-[1fr_640px] gap-16 dt:grid-cols-1 dt:gap-8">
          <h2 className="text-[72px] font-medium leading-[72px] tracking-[-2.16px] text-black dt:text-[48px] dt:leading-[50px] tb:text-[34px] tb:leading-[36px] tb:tracking-[-1.2px]">
            Our benefits
          </h2>
          <p className="self-end text-[16px] font-normal leading-[22.4px]" style={{ color: 'rgb(85,83,78)' }}>
            Software gets its leverage from the people building it. So we try to give everyone here what they need to do
            the best work of their career.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-4 gap-8 dt:grid-cols-2 tb:grid-cols-1">
          {BENEFITS.map((bn) => (
            <div key={bn.h}>
              <p className="text-[20px] font-medium leading-6 tracking-[-0.2px] text-black">{bn.h}</p>
              <p className="mt-3 text-[16px] font-normal leading-[22.4px]" style={{ color: 'rgb(85,83,78)' }}>{bn.p}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Play Pot — the creative grant band */}
      <Section bg="rgb(249,248,246)">
        <Eyebrow className="text-[#79756D]">A creative grant program</Eyebrow>
        <h2 className="mt-6 max-w-[900px] text-[44px] font-medium leading-[48.4px] tracking-[-0.88px] text-black tb:text-[30px] tb:leading-[34px]">
          We believe the best builders are multi-dimensional, so we created Play Pot
        </h2>
        <p className="mt-8 max-w-[640px] text-[16px] font-normal leading-[22.4px]" style={{ color: 'rgb(85,83,78)' }}>
          A grant anyone here can apply for to fund a project outside their job — a record, a short film, a marathon, a
          side business. We back the whole person, not just the role.
        </p>
      </Section>

      {/* Interview process — 4 numbered steps */}
      <Section>
        <div className="text-center">
          <Eyebrow className="text-[#79756D]">What to expect</Eyebrow>
          <h2 className="mx-auto mt-6 text-[72px] font-medium leading-[72px] tracking-[-2.16px] text-black dt:text-[48px] dt:leading-[50px] tb:text-[34px] tb:leading-[36px] tb:tracking-[-1.2px]">
            Interview process
          </h2>
          <p className="mx-auto mt-8 max-w-[640px] text-[18px] font-normal leading-[25.2px] tracking-[-0.36px]" style={{ color: 'rgb(85,83,78)' }}>
            We would love to get to know you better, and for you to learn about us too. Here is what you can typically expect.
          </p>
          <div className="mt-10 flex justify-center">
            <Btn href="#roles" big>See open roles</Btn>
          </div>
        </div>
        <div className="mt-20 grid grid-cols-4 gap-8 dt:grid-cols-2 tb:grid-cols-1">
          {INTERVIEW.map((st) => (
            <div key={st.n} className="border-t pt-6" style={{ borderColor: 'rgba(209,205,199,0.9)' }}>
              <p className="text-[72px] font-medium leading-[79.2px] tracking-[-2.16px] text-black">{st.n}</p>
              <p className="mt-6 text-[12px] font-semibold uppercase leading-[14.4px] tracking-[1.08px] text-black">{st.h}</p>
              <p className="mt-3 text-[14px] font-normal leading-[19.6px] tracking-[-0.14px]" style={{ color: 'rgb(85,83,78)' }}>{st.p}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="roles">
        <H2>Open roles</H2>
        <div className="mt-12 flex flex-col">
          {teams.map((t) => (
            <div key={t} className="py-8" style={{ borderTop: '1px solid rgba(209,205,199,0.7)' }}>
              <Eyebrow className="text-[#79756D]">{t}</Eyebrow>
              <ul className="mt-6 flex flex-col gap-4">
                {ROLES.filter((r) => r.team === t).map((r) => (
                  <li key={r.title} className="flex items-center justify-between gap-6 tb:flex-col tb:items-start tb:gap-1">
                    <A href="/jobs" className="text-[24px] font-medium leading-[28.8px] tracking-[-0.48px] text-black underline-offset-4 hover:underline tb:text-[18px]">
                      {r.title}
                    </A>
                    <span className="text-[16px] font-normal leading-6" style={{ color: 'rgb(85,83,78)' }}>{r.loc}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(209,205,199,0.7)' }} />
        </div>
      </Section>
    </>
  )
}
