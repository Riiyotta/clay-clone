import { Fragment, useState } from 'react'
import PageHero from '../ui/PageHero'
import Faq from '../ui/Faq'
import Btn from '../ui/Btn'
import A from '../ui/Link'
import { Section, H2 } from '../ui/Section'
import { PLANS, COMPARE } from '../data/pricing'
import { FAQS, SECURITY } from '../data/misc'
import { STORY_LIST } from '../data/customers'

const Tick = ({ v }) =>
  v === true ? <span className="text-black">Included</span>
  : v === false ? <span style={{ color: 'rgb(153,150,144)' }}>Not included &ndash;</span>
  : <span className="text-black">{v}</span>

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <>
      <PageHero shape="left" title="Flexible pricing that fits you"
        sub="Start free, then pay for the actions and data credits you actually use." />

      <Section>
        <div className="mb-10 flex items-center justify-between gap-6 tb:flex-col tb:items-start">
          <H2>Plans</H2>
          {/* 174px segmented toggle, 14/500 */}
          <div className="flex rounded-btn p-1" style={{ background: '#F3F2ED' }}>
            {[['Monthly', false], ['Annual ∙ Save 10%', true]].map(([label, val]) => (
              <button key={label} type="button" onClick={() => setAnnual(val)} aria-pressed={annual === val}
                className="w-[174px] rounded-btn py-2 text-[14px] font-medium leading-[14px] transition-colors tb:w-auto tb:px-4"
                style={{ background: annual === val ? '#fff' : 'transparent', color: '#000' }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-[44px] dt:grid-cols-2 tb:grid-cols-1 tb:gap-6">
          {PLANS.map((p) => (
            <div key={p.name} className="flex flex-col overflow-hidden rounded-[32px]"
                 style={{ border: '1px solid rgba(209,205,199,0.7)', background: '#fff' }}>
              <div className="px-7 py-6" style={{ background: p.head }}>
                <h3 className="text-[18px] font-semibold leading-[19.8px] tracking-[-0.36px] text-white">{p.name}</h3>
                <p className="mt-6 text-[32px] font-medium leading-[34px] tracking-[-0.64px] text-white">
                  {p.monthly ? `$${annual ? p.annual : p.monthly}` : p.name === 'Free' ? '$0' : 'Custom'}
                  {p.monthly && <span className="text-[14px] font-normal">/mo</span>}
                </p>
                <p className="mt-2 text-[11.2px] font-normal leading-[15.68px] text-white/80">{p.note}</p>
              </div>
              <ul className="flex flex-1 flex-col gap-3 px-7 py-7">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2 text-[12px] font-medium leading-[16.8px] text-black">
                    <svg width="14" height="14" viewBox="0 0 16 16" className="mt-[2px] shrink-0" aria-hidden="true">
                      <path d="M3 8.5l3.2 3.2L13 5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col items-center gap-2 px-7 pb-7">
                <A href={p.cta.href} className={`btn w-full rounded-btn py-3 text-center text-[16px] font-medium leading-6 tracking-[-0.16px] ${p.popular ? 'btn-dark' : 'btn-oat'}`}>
                  {p.cta.label}
                </A>
                {p.sub && <A href={p.sub.href} className="text-[16px] font-medium leading-6 tracking-[-0.16px] text-black underline-offset-4 hover:underline">{p.sub.label}</A>}
              </div>
            </div>
          ))}
        </div>

        <A href="#compare"
           className="mt-14 block w-full rounded-btn py-4 text-center text-[14px] font-normal leading-[21px] text-black"
           style={{ border: '1px solid rgba(209,205,199,0.9)' }}>
          See full plan comparison
        </A>
      </Section>

      <Section pt={false} id="compare">
          <h3 className="mb-10 text-[32px] font-semibold leading-[35.2px] tracking-[-0.64px] text-black">Compare plans</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] text-left text-[13px] leading-[19.5px]">
              <thead>
                <tr>
                  <th className="w-[256px] py-4 font-normal text-black">Feature</th>
                  {PLANS.map((p) => <th key={p.name} className="w-[216px] py-4 font-semibold text-black">{p.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((g) => (
                  <Fragment key={g.h}>
                    <tr>
                      <th colSpan={5} className="pt-10 pb-4 text-[13px] font-semibold text-black" style={{ borderBottom: '1px solid rgba(209,205,199,0.7)' }}>
                        {g.h}
                      </th>
                    </tr>
                    {g.rows.map((r) => (
                      <tr key={r[0]} style={{ borderBottom: '1px solid rgba(209,205,199,0.4)' }}>
                        <th className="py-3 pr-6 font-normal" style={{ color: 'rgb(85,83,78)' }}>{r[0]}</th>
                        {r.slice(1).map((v, i) => <td key={i} className="py-3"><Tick v={v} /></td>)}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
      </Section>

      {/* usage-based pricing explainer */}
      <Section pt={false}>
        <div className="rounded-[48px] px-16 py-16 text-center tb:px-8" style={{ background: 'rgb(249,248,246)' }}>
          <h3 className="text-[32px] font-medium leading-[35.2px] tracking-[-0.64px] text-black">Usage-based pricing</h3>
          <p className="mx-auto mt-6 max-w-[461px] text-[16px] font-normal leading-[22.4px] text-black">
            Actions measure platform usage: enrichment &amp; GTM execution.
          </p>
          <p className="mx-auto mt-2 max-w-[461px] text-[16px] font-normal leading-[22.4px] text-black">
            Data credits buy data &amp; AI from vendors in Clay’s marketplace.
          </p>
          <img src="/assets/img/93c2beb9.webp" alt="Which features consume Actions and which do not"
               className="mx-auto mt-12 w-full max-w-[754px] object-contain" loading="lazy" />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Btn href="/pricing" big>Start 14-day trial</Btn>
            <Btn href="/demo" variant="soft" big>Get a demo</Btn>
          </div>
        </div>
      </Section>

      {/* customers band — the original runs case-study cards here */}
      <Section pt={false}>
        <H2>Customers</H2>
        <div className="mt-12 grid grid-cols-4 gap-8 dt:grid-cols-2 tb:grid-cols-1">
          {STORY_LIST.slice(0, 4).map((c) => (
            <A key={c.slug} href={`/customers/${c.slug}`}
               className="flex flex-col rounded-[32px] p-8 transition-transform hover:-translate-y-1"
               style={{ background: 'rgb(249,248,246)' }}>
              <h3 className="text-[32px] font-semibold leading-[35.2px] tracking-[-0.64px] text-black tb:text-[24px] tb:leading-[28px]">
                {c.name} case study
              </h3>
              <p className="mt-auto pt-8 text-[14px] font-normal leading-[19.6px]" style={{ color: 'rgb(123,121,116)' }}>{c.industry}</p>
            </A>
          ))}
        </div>
      </Section>

      {/* security */}
      <Section>
        <h2 className="mx-auto max-w-[700px] text-center text-[60px] font-semibold leading-[60px] tracking-[-2.4px] text-black dt:text-[44px] dt:leading-[46px] tb:text-[32px] tb:leading-[34px] tb:tracking-[-1px]">
          Backed by enterprise-grade security and scale
        </h2>
        <div className="mt-14 grid grid-cols-5 gap-8 dt:grid-cols-3 tb:grid-cols-1">
          {SECURITY.map((s) => (
            <div key={s.h}>
              <h3 className="text-[16px] font-medium leading-[19.2px] tracking-[-0.32px] text-black">{s.h}</h3>
              <p className="mt-3 text-[12.8px] font-normal leading-[17.92px]" style={{ color: 'rgb(85,83,78)' }}>{s.p}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section pt={false}>
        <Faq items={FAQS} heading="FAQ" />
      </Section>
    </>
  )
}
