/**
 * Product-page bodies, section by section, measured on clay.com at 1280.
 * Copy is the original's, verbatim. Rendered by src/ui/product/Sections.jsx.
 */
import { cropSection } from '../ui/product/ArtSection'
import claygentArt from './art/claygent.json'
import claygentFaq from './art/claygent-faq.json'
import claygentStack from './art/claygent-stack.json'
import signalsArt from './art/signals.json'
import signalsSf from './art/signals-sf.json'
import waterfallArt from './art/waterfall-enrichment.json'
import agentPluginArt from './art/agent-plugin.json'
import mcpArt from './art/mcp.json'
import workflowsArt from './art/workflows.json'
import functionsArt from './art/functions.json'
import functionsSf from './art/functions-sf.json'
import aiFormulaArt from './art/ai-formatting.json'
import aiFormulaSf from './art/ai-formatting-sf.json'
import adsArt from './art/ads.json'
import sequencerArt from './art/sequencer.json'
import sculptorArt from './art/sculptor.json'
import sculptorSf from './art/sculptor-sf.json'
import aaArt from './art/account-agents.json'
import aaFaq from './art/account-agents-faq.json'
import aaStack from './art/account-agents-stack.json'

/* An FAQ block from a faq.js extraction. */
const FAQ = (f, o = {}) => ({ type: 'Faq', heading: f.heading.lines, items: f.answers.map((a) => ({ q: a.q, html: a.html })), ...o })

/**
 * Assemble a page body from an automated scroll-then-capture pass (scrollcap.js):
 * captured sections render as ArtSections; a section flagged as an FAQ becomes the
 * interactive accordion (sized to the captured section); a section replaced by a
 * stack capture becomes StackedCards.
 */
export const AUTO = (art, { faq, stack, replace = {}, sticky = [] } = {}) => {
  const used = new Set()
  return art.flatMap((sec) => {
  // splice a sticky-feature block into the captured section that contains it
  // the block must sit wholly inside this section, so a block starting on a boundary is spliced once
  // splice at the position recorded by the section's own capture run — only into the
  // section that wholly contains the block, and only once
  const at = (sec.sf || []).find((w) => w.y >= -1 && w.y + w.h <= sec.h + 1)
  const sf = at && sticky.find((b) => Math.abs(b.h - at.h) < 4 && !used.has(b))
  if (sf) {
    used.add(sf)
    const a = at.y, z = a + at.h
    return [a > 1 && cropSection(sec, 0, a), sf, sec.h - z > 1 && cropSection(sec, z, sec.h)].filter(Boolean)
  }
  if (replace[sec.name]) return [replace[sec.name]]
  if (stack && stack.at === sec.name) return [stack.spec]
  if (sec.faq && faq) {
    // size the accordion to the captured section: pad below the last question row
    const qs = [...sec.texts, ...(sec.layers || []).flatMap((L) => L.texts)].filter((t) => t.f.size === 24)
    const last = qs.sort((a, b) => b.y - a.y)[0]
    const bottom = last ? last.y + last.lines.length * 31.2 + 24 : sec.h - 96
    return [FAQ(faq, { pt: 48, pb: Math.max(24, Math.round(sec.h - bottom)) })]
  }
  return [sec]
  })
}

const I = (n) => `/assets/img/${n}`
const DEMO = { t: 'Get a demo', href: '/demo' }

/* The page background the original paints behind each product page. */
export const PAGE_BG = {
  audiences: 'rgb(249,248,246)',
  signals: '#fff',
  'waterfall-enrichment': 'rgb(249,248,246)',
  claygent: 'rgb(254,253,251)',
  'account-agents': 'rgb(254,253,251)',
  'agent-plugin': 'rgb(249,248,246)',
  mcp: '#fff',
  workflows: '#fff',
  functions: '#fff',
  'ai-formatting': '#fff',
  ads: '#fff',
  sequencer: 'rgb(244,243,240)',
  sculptor: '#fff',
  integrations: 'rgb(243,242,237)',
}

export const PRODUCT_BODIES = {
  audiences: [
    {
      type: 'QuoteCard',
      band: 'rgb(249,248,246)',
      img: I('69c3f17b2bb72e117fe165bb_Figma-(1).webp'),
      alt: 'Figma',
      eyebrow: 'Figma',
      quote: ['"Clay has become the orchestration layer for', 'everything GTM. Salesforce for record-keeping,', 'Snowflake for product data, and Clay for turning it', 'all into automated action.”'],
      name: 'Kyle Ketchum',
      role: 'Marketing Operations, Tech & Systems',
      btn: { t: 'Read about Figma using Audiences', href: '/customers' },
    },
    {
      type: 'StickyFeatures',
      panels: [
        {
          img: I('414b806de774344b8139c242ac6fced5_ABM.avif'),
          h: ['Access all your GTM', 'context in one place'],
          p: ['Import millions of records from your CRM and data warehouse into', 'Clay, then layer on enrichments and signals from 200+ providers.', 'Get a unified view of every account and contact.'],
          btn: DEMO,
        },
        {
          img: I('Audiences02.webp'),
          h: ['Build dynamic, reusable', 'Audiences'],
          p: ['Create audiences like warm leads or re-engaged accounts with', 'simple filters. Records automatically stay updated as your data', 'changes. No scheduled refreshes, manual exports, or outdated', 'customer and prospect lists.'],
          btn: DEMO,
        },
        {
          img: I('fb727d42b61acfd7418e75ec51235e9f_ABM3.avif'),
          h: ['Reach the same person', 'across every channel'],
          p: ['Unify duplicate records into a single customer profile. Build an', 'audience once, then automatically tailor your ads, direct mail, and', 'warm outbound campaigns to reach them across every channel.', 'Keep your marketing & sales outreach in-sync.'],
          btn: DEMO,
        },
      ],
    },
    {
      type: 'UseCaseGrid',
      h: ['Use cases to build', 'on Audiences'],
      p: ['Build and scale your most creative plays on top', 'of a unified data foundation. Work across', 'millions of prospect and customer records.'],
      groups: [
        {
          eyebrow: 'RevOps & GTM Engineering', bg: 'rgb(238,247,115)', square: 'rgb(16,43,3)',
          cards: [
            { t: 'CRM enrichment at full scale', p: ["Import your entire CRM. Enrich", "every record and add buyer", "intent data. Write clean, current", "data back. Automatic syncs keep", "the CRM up-to-date without", "manual entry."], link: 'Get a demo', href: '/demo' },
            { t: 'Signal-based account\nprioritization', p: ["Detect buying signals on target", "accounts and move them into", "the right priority tier instantly.", "Act when the timing is right."], link: 'Explore Account and\nlead scoring', href: '/signals' },
            { t: 'TAM sourcing and list building', p: ["Continuously surface net-new", "accounts matching your ICP.", "Suppress what's already in your", "CRM. Always work from a clean,", "deduplicated list of accounts", "and contacts."], link: 'TAM sourcing in Clay', href: '/use-cases/tam-sourcing' },
          ],
        },
        {
          eyebrow: 'Growth Marketing', bg: 'rgb(190,223,254)', square: 'rgb(0,20,51)',
          cards: [
            { t: 'Automated ad targeting across\nplatforms', p: ["Create enriched audiences from", "your first party data sources and", "automatically sync them to", "LinkedIn, Meta, and Google"], link: 'Explore Ads in Clay', href: '/ads' },
            { t: 'Rep-attributed outbound', p: ["Build sequences that fire", "automatically when contacts", "enter an Audience or a segment.", "Craft every email using full", "context: account details,", "touchpoint history, and buying", "signals."], link: 'Explore Outbound', href: '/use-cases/outbound' },
            { t: 'Signal-tracking across accounts\n& contacts', p: ["Track job changes, web intent,", "and tech stack changes across", "millions of records. When the", "right signal fires, Audiences", "creates enriched records and", "routes them to the right", "workflow or rep automatically."], link: 'Discover Signals', href: '/signals' },
          ],
        },
      ],
    },
    {
      type: 'IntegrationsStrip',
      label: 'Integrations',
      h: 'Import millions of records',
      logos: [
        { src: I('salesforce.svg'), alt: 'Salesforce', w: 54.4 },
        { src: I('snowflake.svg'), alt: 'Snowflake', w: 47.8 },
        { src: I('clay-how-hubspot-icon.svg'), alt: 'HubSpot' },
        { src: I('google_bigquery_logo_icon_168150-(2).svg'), alt: 'BigQuery' },
        { src: I('Gong_idnaeh32xQ_0.svg'), alt: 'Gong', w: 44.3 },
      ],
      btn: DEMO,
    },
    {
      type: 'CourseCta',
      icon: I('Audiences.webp'),
      h: ['Get started on Clay', 'University'],
      btn: { t: 'Check out the course', href: '/university' },
      img: I('ABM.avif'),
    },
  ],

  claygent: [
    ...claygentArt.map((sec) => (sec.name === 'features' ? claygentStack : sec)),
    FAQ(claygentFaq),
  ],

  'account-agents': AUTO(aaArt, { faq: aaFaq, stack: { at: 's3', spec: aaStack } }),

  /* scroll-then-capture pass (scrollcap.js) */
  signals: AUTO(signalsArt, { sticky: signalsSf }),
  'waterfall-enrichment': AUTO(waterfallArt),
  'agent-plugin': AUTO(agentPluginArt),
  mcp: AUTO(mcpArt),
  workflows: AUTO(workflowsArt),
  functions: AUTO(functionsArt, { sticky: functionsSf }),
  'ai-formatting': AUTO(aiFormulaArt, { sticky: aiFormulaSf }),
  ads: AUTO(adsArt),
  sequencer: AUTO(sequencerArt),
  sculptor: AUTO(sculptorArt, { sticky: sculptorSf }),
}
