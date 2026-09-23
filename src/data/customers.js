/**
 * Customer stories. Per the project convention (see HANDOFF §4), the original's
 * attributed performance claims and testimonial quotes are replaced with neutral
 * placeholder copy on the original's exact geometry and type metrics.
 */
/** `logo: null` means no downloaded mark exists — the card renders a wordmark. */
const S = (slug, name, logo, o) => [slug, { slug, name, logo: logo && `/assets/icon/${logo}`, ...o }]

export const STORIES = Object.fromEntries([
  S('open-ai', 'OpenAI', 'openai.svg', {
    industry: 'Artificial intelligence research and deployment',
    hq: 'San Francisco', site: 'https://openai.com',
    lede: 'A placeholder summary of how this team rebuilt inbound enrichment on Clay.',
    headline: 'Placeholder headline about rebuilding enrichment coverage',
    sections: [
      { h: 'Doubling inbound lead enrichment rates', p: 'Placeholder narrative describing the move from a single-source enrichment model to a multi-provider waterfall, and what that changed for the team day to day.' },
      { h: 'Custom GTM research at scale', p: 'Placeholder narrative describing how research agents were used to mimic and augment a manual research process that previously did not scale.' },
      { h: 'Helping sellers research on demand', p: 'Placeholder narrative describing enrichment surfaced directly inside the CRM so sellers never leave the record they are working.' },
    ],
    impact: [
      'Placeholder impact statement about enrichment coverage',
      'Placeholder impact statement about consistent weekly usage across the team',
      'Placeholder impact statement about iterating on enrichment strategy without disrupting sellers',
      'Placeholder impact statement about scaling from single-source to multi-source data',
    ],
  }),
  S('vanta', 'Vanta', 'vanta.svg', { industry: 'Security and compliance automation', hq: 'San Francisco' }),
  S('verkada', 'Verkada', 'verkada.svg', { industry: 'Cloud-managed physical security', hq: 'San Mateo' }),
  S('sendoso', 'Sendoso', null, { industry: 'Gifting and direct mail', hq: 'San Francisco' }),
  S('anthropic', 'Anthropic', 'anthropic.svg', { industry: 'AI safety and research', hq: 'San Francisco' }),
  S('coverflex', 'Coverflex', null, { industry: 'Compensation and benefits', hq: 'Lisbon' }),
  S('rippling', 'Rippling', 'rippling.svg', { industry: 'Workforce management', hq: 'San Francisco' }),
  S('mistral-ai', 'Mistral AI', 'mistralai.svg', { industry: 'Frontier AI models', hq: 'Paris' }),
  S('intercom', 'Intercom', 'intercom.svg', { industry: 'Customer communications', hq: 'San Francisco' }),
  S('regency-supply', 'Regency Supply', null, { industry: 'Industrial distribution', hq: 'Cleveland' }),
])

/** Filled in for every story so the index and story pages share one source. */
for (const s of Object.values(STORIES)) {
  s.headline ||= `Placeholder customer headline for ${s.name}`
  s.lede ||= 'A placeholder summary of this customer’s go-to-market motion on Clay.'
  s.sections ||= [
    { h: 'The challenge', p: 'Placeholder narrative describing the go-to-market problem this team set out to solve.' },
    { h: 'The build', p: 'Placeholder narrative describing the enrichment, agents, and workflows they put together in Clay.' },
    { h: 'The result', p: 'Placeholder narrative describing what changed once the play was running.' },
  ]
  s.impact ||= ['Placeholder impact statement one', 'Placeholder impact statement two', 'Placeholder impact statement three']
  s.site ||= null
}

export const STORY_LIST = Object.values(STORIES)
