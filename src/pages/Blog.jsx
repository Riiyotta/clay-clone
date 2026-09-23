import { useParams } from 'react-router-dom'
import PageHero from '../ui/PageHero'
import A from '../ui/Link'
import { Section, Eyebrow } from '../ui/Section'
import { POSTS } from '../data/misc'

/** Title-case a URL slug: "clay-mcp-in-codex" -> "Clay mcp in codex". */
const fromSlug = (slug) => {
  const w = slug.replace(/[-_]+/g, ' ').trim()
  return w.charAt(0).toUpperCase() + w.slice(1)
}

export function BlogIndex({ tag } = {}) {
  // /blog-tag/<tag> renders this same index narrowed to a tag we carry
  const pool = tag ? POSTS.filter((p) => p.tag.toLowerCase() === tag.toLowerCase()) : POSTS
  const [lead, ...rest] = pool.length ? pool : POSTS
  return (
    <>
      <PageHero shape="left" eyebrow={tag ? `Blog · ${tag}` : 'Blog'} title="Ideas from the GTM engineering community"
        sub="Playbooks, product deep dives, and research from the team and the people building on Clay." />
      <Section>
        <A href={`/blog/${lead.slug}`} className="grid grid-cols-2 gap-12 rounded-[48px] p-10 transition-transform hover:-translate-y-1 dt:grid-cols-1" style={{ background: 'rgb(249,248,246)' }}>
          <img src={lead.img} alt="" className="aspect-[4/3] w-full rounded-[32px] object-cover" loading="lazy" />
          <div className="flex flex-col justify-center">
            <Eyebrow className="text-[#79756D]">{lead.tag} · {lead.date}</Eyebrow>
            <h2 className="mt-6 text-[44px] font-medium leading-[48.4px] tracking-[-0.88px] text-black tb:text-[28px] tb:leading-[32px]">{lead.title}</h2>
            <p className="mt-6 text-[16px] font-normal leading-[22.4px]" style={{ color: 'rgb(85,83,78)' }}>{lead.excerpt}</p>
          </div>
        </A>

        <div className="mt-16 grid grid-cols-3 gap-10 dt:grid-cols-2 tb:grid-cols-1">
          {rest.map((p) => (
            <A key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col">
              <img src={p.img} alt="" className="aspect-[4/3] w-full rounded-[24px] object-cover" loading="lazy" />
              <Eyebrow className="mt-6 text-[#79756D]">{p.tag} · {p.date}</Eyebrow>
              <h3 className="mt-3 text-[24px] font-semibold leading-[28.8px] tracking-[-0.48px] text-black group-hover:underline">{p.title}</h3>
              <p className="mt-3 text-[16px] font-normal leading-[22.4px]" style={{ color: 'rgb(85,83,78)' }}>{p.excerpt}</p>
            </A>
          ))}
        </div>
      </Section>
    </>
  )
}

export function BlogPost() {
  const { slug } = useParams()
  // The captured index pages link out to every published article. Those are the
  // original's editorial content and are not reproduced here — an unknown slug gets
  // the article template with its title read off the URL, not a 404.
  const p = POSTS.find((x) => x.slug === slug) || { slug, title: fromSlug(slug), tag: 'Article', date: '', img: POSTS[0].img, excerpt: '' }
  return (
    <>
      <section className="pt-[168px] tb:pt-[132px]">
        <div className="container-clay mx-auto max-w-[760px]">
          <A href="/blog" className="text-[12.8px] leading-[19.2px]" style={{ color: 'rgb(85,83,78)' }}>← All posts</A>
          <Eyebrow className="mt-10 text-[#79756D]">{p.date ? `${p.tag} · ${p.date}` : p.tag}</Eyebrow>
          <h1 className="mt-4 text-[57.6px] font-semibold leading-[57.6px] tracking-[-2.304px] text-black tb:text-[34px] tb:leading-[38px] tb:tracking-[-1.2px]">{p.title}</h1>
          <img src={p.img} alt="" className="mt-12 aspect-[16/9] w-full rounded-[32px] object-cover" />
        </div>
      </section>
      <Section>
        <div className="mx-auto max-w-[720px]">
          {p.excerpt && <p className="text-[21.12px] font-normal leading-[29.568px]" style={{ color: 'rgb(85,83,78)' }}>{p.excerpt}</p>}
          <p className="mt-8 text-[21.12px] font-normal leading-[29.568px]" style={{ color: 'rgb(85,83,78)' }}>
            Placeholder article body on the original’s type metrics. Swap in the published copy when it is available; the
            layout, measure, and rhythm here match the original article template.
          </p>
          <p className="mt-8 text-[21.12px] font-normal leading-[29.568px]" style={{ color: 'rgb(85,83,78)' }}>
            Placeholder second paragraph continuing the article at the same measure, so line length and vertical rhythm
            can be verified against the original without reproducing its editorial content.
          </p>
        </div>
      </Section>
    </>
  )
}

/** A changelog entry. Same treatment as BlogPost: template, not the original's copy. */
export function ChangelogEntry() {
  const { slug } = useParams()
  return (
    <>
      <section className="pt-[168px] tb:pt-[132px]">
        <div className="container-clay mx-auto max-w-[760px]">
          <A href="/changelog" className="text-[12.8px] leading-[19.2px]" style={{ color: 'rgb(85,83,78)' }}>← All updates</A>
          <Eyebrow className="mt-10 text-[#79756D]">Changelog</Eyebrow>
          <h1 className="mt-4 text-[57.6px] font-semibold leading-[57.6px] tracking-[-2.304px] text-black tb:text-[34px] tb:leading-[38px] tb:tracking-[-1.2px]">{fromSlug(slug)}</h1>
        </div>
      </section>
      <Section>
        <div className="mx-auto max-w-[720px]">
          <p className="text-[21.12px] font-normal leading-[29.568px]" style={{ color: 'rgb(85,83,78)' }}>
            Placeholder entry body on the original’s type metrics. The release notes themselves are
            Clay’s editorial content and are not reproduced in this rebuild.
          </p>
        </div>
      </Section>
    </>
  )
}

/** /blog-tag/<tag> — the index, filtered where the tag matches one we carry. */
export function BlogTag() {
  const { tag } = useParams()
  return <BlogIndex tag={fromSlug(tag)} />
}

/** /livestreams/<slug> — a recording's page. Template only; the sessions themselves
 *  are Clay's own events and their content is not reproduced here. */
export function LivestreamEntry() {
  const { slug } = useParams()
  return (
    <>
      <section className="pt-[168px] tb:pt-[132px]">
        <div className="container-clay mx-auto max-w-[760px]">
          <A href="/livestreams" className="text-[12.8px] leading-[19.2px]" style={{ color: 'rgb(85,83,78)' }}>← All livestreams</A>
          <Eyebrow className="mt-10 text-[#79756D]">Livestream</Eyebrow>
          <h1 className="mt-4 text-[57.6px] font-semibold leading-[57.6px] tracking-[-2.304px] text-black tb:text-[34px] tb:leading-[38px] tb:tracking-[-1.2px]">{fromSlug(slug)}</h1>
          <div className="mt-12 aspect-video w-full rounded-[32px]" style={{ background: 'rgb(238,236,232)' }} />
        </div>
      </section>
      <Section>
        <div className="mx-auto max-w-[720px]">
          <p className="text-[21.12px] font-normal leading-[29.568px]" style={{ color: 'rgb(85,83,78)' }}>
            Placeholder session description on the original’s type metrics. The recording and its
            write-up are Clay’s content and are not reproduced in this rebuild.
          </p>
        </div>
      </Section>
    </>
  )
}
