/**
 * Canonical label → path map. Navbar and Footer render from label lists, so this
 * is the single place a link text is bound to a route. Anything not listed here
 * resolves to `/` rather than a dead `#`.
 */
export const PATH = {
  /* product */
  'Audiences': '/audiences',
  'Data marketplace': '/integrations',
  'Signals and Intent': '/signals',
  'Signals': '/signals',
  'Waterfall': '/waterfall-enrichment',
  'Multi-provider data enrichment': '/waterfall-enrichment',
  'Claygents': '/claygent',
  'Claygent AI': '/claygent',
  'Account Agents': '/account-agents',
  'Agent plugin CLI/API': '/agent-plugin',
  'MCP for reps': '/mcp',
  'Workflows': '/workflows',
  'Functions': '/functions',
  'AI formatting': '/ai-formula',
  'Ads': '/ads',
  'Sequencer': '/sequencer',
  'Sculptor': '/sculptor',
  'Integrations': '/integrations',
  'Integrate with Clay': '/partners/integrations',
  'Pricing': '/pricing',
  'Changelog': '/changelog',

  /* use cases + solutions */
  'CRM enrichment': '/use-cases/crm-enrichment',
  'CRM Enrichment': '/use-cases/crm-enrichment',
  'TAM sourcing': '/use-cases/tam-sourcing',
  'TAM Sourcing': '/use-cases/tam-sourcing',
  'Territory planning': '/use-cases/territory-planning',
  'Reverse ETL': '/use-cases/reverse-etl',
  'Outbound': '/use-cases/outbound',
  'Automated inbound': '/use-cases/inbound-enrichment',
  'PLG assist': '/use-cases/plg-assist',
  'ABM': '/use-cases/abm',
  'Rep prospecting': '/use-cases/rep-prospecting',
  'Account research': '/use-cases/account-research',
  'Rep assist': '/use-cases/rep-assist',
  'GTM Ops': '/clay-for-gtm-ops',
  'Marketing': '/clay-for-marketing',
  'Sales': '/clay-for-sales',
  'Enterprise': '/enterprise',
  'Startup': '/clay-for-startups',

  /* resources */
  'University': '/university',
  'Get started lesson': '/university',
  'Guides': '/guides',
  'Livestreams': '/livestreams',
  'Cohort live classes': '/cohort-classes',
  'Clay community': '/community',
  'Community': '/community',
  'Slack': '/slack',
  'Live events': '/events',
  'Startup program': '/clay-for-startups',
  'Campus ambassadors': '/clay-campus-ambassadors',
  'Find Clay experts': '/experts',
  'GTM Engineer job board': '/job-board',
  'Jobs': '/jobs',
  'Use case templates': '/templates',
  'Become a partner': '/partners',
  'Partner programs': '/partners',
  'Solution partners': '/partners/solutions',
  'Integration partners': '/partners/integrations',
  'Private Equity': '/clay-for-private-equity',
  'FAQ': '/faq',
  'Status': '/status',

  /* company */
  'About': '/about',
  'Careers': '/careers',
  'Open roles': '/jobs',
  'Blog': '/blog',
  'Contact': '/contact',
  'Get a demo': '/demo',
  'Contact us': '/contact',
  'Press': '/press',
  'LinkedIn': 'https://www.linkedin.com/company/clay-run',
  'YouTube': 'https://www.youtube.com/@clay-gtm',
  'X': 'https://x.com/clay_gtm',

  /* customers */
  'Customers': '/customers',
  'Case studies': '/customers',
  'OpenAI': '/customers/open-ai',
  'Vanta': '/customers/vanta',
  'Verkada': '/customers/verkada',
  'Sendoso': '/customers/sendoso',
  'Anthropic': '/customers/anthropic',
  'Coverflex': '/customers/coverflex',
  'Rippling': '/customers/rippling',
  'Mistral AI': '/customers/mistral-ai',
  'Intercom': '/customers/intercom',
  'Regency Supply': '/customers/regency-supply',

  /* legal */
  'Privacy policy': '/privacy',
  'Terms of service': '/terms-of-service',
  'Do not sell my data': '/do-not-sell',

  /* blog posts referenced by title in the footer */
  'The rise of the GTM engineer': '/blog/the-rise-of-the-gtm-engineer',
}

export const to = (label) => PATH[label] || '/'
export const isExternal = (href) => /^https?:/.test(href)
