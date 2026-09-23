/** Plan cards and comparison matrix, measured from /pricing at 1280. */

export const PLANS = [
  { name: 'Free', price: null, note: 'Free forever', cta: { label: 'Start 14-day trial', href: '/contact' }, head: '#1B1A18',
    features: ['Unlimited seats and tables', 'Run multi-provider waterfalls', 'Run up to 200 rows per table', 'Bring your own API key'] },
  { name: 'Launch', monthly: 149, annual: 134, note: 'Starts at $54/mo, expand anytime', cta: { label: 'Start 14-day trial', href: '/contact' }, sub: { label: 'or buy now', href: '/contact' }, head: '#46022F',
    features: ['Everything in Free', 'Enrich phone numbers', 'Use Claygent for research', 'Integrate with functions', 'Export to sequencers'] },
  { name: 'Growth', monthly: 349, annual: 314, note: 'Starts at $185/mo, expand anytime', cta: { label: 'Start 14-day trial', href: '/contact' }, popular: true, head: '#001433',
    features: ['Everything in Launch', 'Auto-sync & enrich CRM', 'Auto-sync with data warehouse', 'Integrate with any HTTP API', 'Automate any signal via webhook', 'Web intent signals', 'Ad audiences', 'Clay Sequencer', 'Get priority support'] },
  { name: 'Enterprise', price: null, note: 'Custom pricing', cta: { label: 'Get a demo', href: '/contact' }, head: '#102B03',
    features: ['Everything in Growth', 'Sign in with SSO', 'Role-based access control (RBAC)', 'Get dedicated growth strategist', 'Bulk data purchasing', 'Audience import'] },
]

/** ['feature', free, launch, growth, enterprise] — true | false | 'Add-on' */
const G = (h, rows) => ({ h, rows })
export const COMPARE = [
  G('Data enrichment', [
    ['Find and enrich data from 150+ providers', true, true, true, true],
    ['Run multi-provider waterfalls', true, true, true, true],
    ['Bring your own API key', true, true, true, true],
    ['Exclude companies/people from search', false, true, true, true],
    ['Enrich more than 50K records at once', false, false, false, true],
    ['Bulk data purchasing', false, false, false, 'Add-on'],
  ]),
  G('Signals', [
    ['Job change, promotion, and new hire signals', false, true, true, true],
    ['Company news signals', false, true, true, true],
    ['Social listening signals', false, true, true, true],
    ['Web intent signals', false, false, true, true],
    ['Automate any signal via webhooks', false, false, true, true],
  ]),
  G('Integrations', [
    ['HTTP API integrations', false, false, true, true],
    ['Sequencer integrations', false, false, true, true],
    ['Data warehouse sync', false, false, true, true],
    ['CRM two-way sync', false, false, true, true],
  ]),
  G('Workflow orchestration', [
    ['Customize agents with Claygent builder', true, true, true, true],
    ['Workflows on a schedule', false, true, true, true],
    ['Functions', false, true, true, true],
    ['Audience import', false, false, false, true],
  ]),
  G('Administration', [
    ['Unlimited seats and tables', true, true, true, true],
    ['Sign in with SSO', false, false, false, true],
    ['Role-based access control (RBAC)', false, false, false, true],
    ['Dedicated growth strategist', false, false, false, true],
    ['Priority support', false, false, true, true],
  ]),
]
