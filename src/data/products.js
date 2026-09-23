/**
 * Product pages. Shape mirrors /claygent as measured: centred 88px hero, an
 * intro band (72/500/72/−2.16 + 20/400/26), alternating 48px feature rows, and
 * an FAQ accordion. Images are drawn from the downloaded asset set.
 */
const IMG = (n) => `/assets/img/${n}`

export const PRODUCTS = {
  claygent: {
    hero: IMG('claygent-hero-7.avif'),
    title: 'Build agents for any GTM task',
    sub: 'Run GTM agents that reason over your data, and see exactly why they do what they do.',
    eyebrow: 'Claygent',
    intro: {
      h: 'Agents built on your entire GTM context',
      p: 'Research accounts, iterate on prompts in real time, and monitor your book of business — all against the data you already have in Clay.',
    },
    rows: [
      { title: 'Find unique data no provider has', img: IMG('Agents-Still-1.avif'),
        body: 'Point Claygent at any manual GTM task like company research, lead qualification, or competitor tracking, and it will go find the answer on the open web.',
        link: { label: 'Get started with Claygent', href: '/pricing' } },
      { title: 'Test and iterate on prompts', img: IMG('claygent-hero-7.avif'),
        body: 'Describe what you want in natural language, test against real data, and roll back to any previous version of a prompt whenever a change makes results worse.',
        link: { label: 'Iterate in Claygent Builder', href: '/workflows' } },
      { title: 'Glass box, not black box', img: IMG('Data-Still-1.avif'),
        body: 'Every agent decision in Clay comes with a full reasoning trace. For agents running across a whole segment, you can audit what changed and why on any account.',
        link: { label: 'Agent observability in Audiences', href: '/audiences' } },
      { title: 'Up-to-date account intelligence for your book of business', img: IMG('Claymation.avif'),
        body: 'Account Agents run continuously over an audience, tracking what changed since the last run instead of starting from scratch every time.',
        link: { label: 'Try out Account Research Agents', href: '/account-agents' } },
    ],
    howTo: {
      h: 'How to create your first agent in Clay',
      p: 'Create custom agents by describing your task, connecting tools, and deploying them across a segment.',
      steps: [
        { h: 'Describe the task', p: 'Write the research or qualification job in plain language and pick the agent type that fits.' },
        { h: 'Connect tools and data', p: 'Give the agent the providers, CRM objects, and audiences it should reason over.' },
        { h: 'Test, deploy, observe', p: 'Run it against real rows, read the reasoning trace, then roll it out across the segment.' },
      ],
    },
    faqHeading: 'FAQs about agents in Clay',
    faq: [
      { q: 'What is a Claygent?', a: 'Claygents are agents in Clay that perform tasks on your behalf. They take inputs from your table or audience, research against the web and your connected systems, and write structured results back.' },
      { q: 'How do I know which Claygent to use?', a: 'When you build a Claygent you choose the type that fits the job: general-purpose Claygents that run in Tables and Workflows, or Account Agents that run in Audiences and Workflows across every account in a segment.' },
      { q: 'Why would I use Account Agents?', a: 'Account Agents run over Audiences and add persistent memory, automatic writes back to your CRM or warehouse, and no cell-size or row limits.' },
      { q: 'What are the main use cases for Claygent?', a: 'Account research and meeting prep, discovery of bespoke data, scoring and qualification on large prospect lists, and personalised outbound at scale.' },
      { q: 'When do I use Claygent vs. “Use AI” in a table?', a: '“Use AI” is for offline tasks like content generation. Claygent is for tasks that need live research or reasoning over connected data.' },
      { q: 'How much do agents in Clay cost?', a: 'Claygents in tables are available on all plan tiers. Customers are charged on the actual complexity and token usage of each run rather than a flat per-row fee.' },
    ],
  },

  'account-agents': {
    eyebrow: 'Account Agents',
    title: 'Agents that watch every account, continuously',
    sub: 'Give every account in your segment its own researcher that keeps working between your runs.',
    intro: { h: 'Always-on account intelligence', p: 'Account Agents run over an Audience, remember what they found last time, and surface only what changed.' },
    rows: [
      { title: 'Persistent memory per account', img: IMG('Agents-Still-1.avif'), body: 'Unlike one-shot prompts, Account Agents track state across runs so you see deltas, not duplicates.' },
      { title: 'Writes back automatically', img: IMG('CRMnav.avif'), body: 'Approved findings flow straight into your CRM or warehouse without a manual export step.', link: { label: 'See CRM enrichment', href: '/use-cases/crm-enrichment' } },
      { title: 'Governed in one place', img: IMG('Audiences.webp'), body: 'Audiences gives you a single surface to see, budget, and control every agent running across your book of business.', link: { label: 'Explore Audiences', href: '/audiences' } },
    ],
    faq: [
      { q: 'Are Account Agents generally available?', a: 'Account Agents are in beta and available on Growth and Enterprise plans.' },
      { q: 'How are Account Agents billed?', a: 'One action is charged per account run, plus variable data credits for the providers used.' },
    ],
  },

  audiences: {
    eyebrow: 'Audiences',
    title: 'Centralize your first and third party data',
    sub: 'One place to define the segments your whole GTM motion runs on.',
    intro: { h: 'Segments that stay current', p: 'Combine enrichments, signals, and CRM data to create high-intent audiences in one place.' },
    rows: [
      { title: 'Build segments from any source', img: IMG('Audiences.webp'), body: 'Pull from Clay’s people and company sources, your CRM, or your warehouse, and keep them in sync automatically.' },
      { title: 'Route audiences anywhere', img: IMG('Clay-Ads.png'), body: 'Send a segment to ads, sequencers, or your data warehouse without rebuilding the list each time.', link: { label: 'Sync ad audiences', href: '/ads' } },
    ],
    faq: [{ q: 'Which plans include Audiences?', a: 'Audience import is included from the Growth plan upwards.' }],
  },

  signals: {
    eyebrow: 'Signals',
    title: 'Find and act on buying signals',
    sub: 'Track job changes, promotions, hiring, funding, news, and web intent — then trigger the play.',
    intro: { h: 'Timing matters as much as the message', p: 'Use the signals library to reach prospects at the moment something changed on their side.' },
    rows: [
      { title: 'A library of first and third party signals', img: IMG('Data-Still-1.avif'), body: 'Job change, promotion, new hire, company news, and social listening signals, all available from one catalogue.' },
      { title: 'Automate any signal via webhook', img: IMG('Automation.avif'), body: 'Pipe a custom signal into Clay from any system and let it start a workflow the moment it fires.', link: { label: 'See Workflows', href: '/workflows' } },
    ],
    faq: [{ q: 'Do signals cost extra?', a: 'Core signals are included from the Launch plan; web intent signals are available on Growth and above.' }],
  },

  'waterfall-enrichment': {
    eyebrow: 'Waterfall',
    title: 'Multi-provider enrichment with the best coverage',
    sub: 'Combine 150+ data providers into one waterfall and only pay for the hit that lands.',
    intro: { h: 'One waterfall, every provider', p: 'Run providers in the order you choose and stop as soon as a match is found.' },
    rows: [
      { title: 'Coverage no single provider reaches', img: IMG('Data-Still-1.avif'), body: 'Chain providers so a miss from one falls through to the next, lifting match rates well past any single vendor.' },
      { title: 'Bring your own API key', img: IMG('Automation.avif'), body: 'Already have a contract with a provider? Plug your key in and Clay will use it inside the waterfall.' },
    ],
    faq: [{ q: 'Am I charged for a miss?', a: 'No. Waterfalls only consume credits on a successful match.' }],
  },

  workflows: {
    eyebrow: 'Workflows',
    title: 'Automate and scale your GTM plays',
    sub: 'Chain enrichment, agents, and execution into a play that runs itself.',
    intro: { h: 'From idea to running play', p: 'Build the sequence once and let it run on a schedule or on a signal.' },
    rows: [
      { title: 'Compose any sequence of steps', img: IMG('Automation.avif'), body: 'Enrich, branch, score, and route in a single workflow, with the whole run visible end to end.' },
      { title: 'Trigger on anything', img: IMG('Execution-Still-1.avif'), body: 'Start a workflow on a schedule, a signal, a webhook, or a change in your CRM.', link: { label: 'Browse signals', href: '/signals' } },
    ],
    faq: [{ q: 'Can workflows call my own services?', a: 'Yes — HTTP API integrations let a workflow call any endpoint you control.' }],
  },

  functions: {
    eyebrow: 'Functions',
    title: 'Custom logic without leaving Clay',
    sub: 'Write the transformation you need and reuse it across every table and workflow.',
    intro: { h: 'Your logic, everywhere', p: 'Functions turn one-off formulas into building blocks your whole team can reuse.' },
    rows: [
      { title: 'Describe it, then refine it', img: IMG('Automation.avif'), body: 'Describe the transformation in natural language, review the generated function, and edit it directly.' },
      { title: 'Reusable across the workspace', img: IMG('Agents-Still-1.avif'), body: 'Publish a function once and call it from any table, workflow, or audience.' },
    ],
    faq: [{ q: 'Do functions consume credits?', a: 'Functions themselves are free; only the enrichments they call consume credits.' }],
  },

  ads: {
    eyebrow: 'Ads',
    title: 'Sync targeted ad audiences from live data',
    sub: 'Push the segments you already built in Clay straight to LinkedIn, Meta, and Google.',
    intro: { h: 'Ads that follow your data', p: 'Build and sync ad audiences from live data instead of stale CSV exports.' },
    rows: [
      { title: 'Build the audience once', img: IMG('Clay-Ads.png'), body: 'Define the segment in Clay and let it stay in sync with the ad platform as accounts qualify in and out.' },
      { title: 'Measure against pipeline', img: IMG('Execution-Still-1.avif'), body: 'Because the audience is defined on your own data, you can tie spend back to the accounts it reached.' },
    ],
    faq: [{ q: 'Which ad platforms are supported?', a: 'LinkedIn and Meta are supported today, with Google available on Growth and above.' }],
  },

  sequencer: {
    eyebrow: 'Sequencer',
    title: 'Send from Clay, or from the tool you already use',
    sub: 'Use Clay’s native sequencer or export to Outreach, Instantly, Smartlead, and more.',
    intro: { h: 'Built-in or bring your own', p: 'Build the campaign in Clay and integrate it with any multi-channel sequencer you already run.' },
    rows: [
      { title: 'Native sending', img: IMG('Execution-Still-1.avif'), body: 'Write, schedule, and send from inside Clay with the enrichment context attached to every message.' },
      { title: 'Export to your stack', img: IMG('CRMnav.avif'), body: 'Existing sequencer? Push the enriched, prioritised list to it directly.', link: { label: 'See integrations', href: '/integrations' } },
    ],
    faq: [{ q: 'Is the sequencer included?', a: 'The Clay sequencer and sequencer integrations are available from the Growth plan.' }],
  },

  sculptor: {
    eyebrow: 'Sculptor',
    title: 'Design the play, not the plumbing',
    sub: 'A visual surface for shaping how data moves through your go-to-market motion.',
    intro: { h: 'Shape the motion', p: 'Lay out sources, agents, and destinations, then watch real records flow through them.' },
    rows: [
      { title: 'See the whole motion at once', img: IMG('Automation.avif'), body: 'Every source, transformation, and destination on one canvas instead of scattered across tabs.' },
      { title: 'Change it live', img: IMG('Agents-Still-1.avif'), body: 'Adjust a step and see the effect on real records before you commit the change.' },
    ],
    faq: [{ q: 'Is Sculptor available today?', a: 'Sculptor is rolling out to Enterprise workspaces.' }],
  },

  mcp: {
    eyebrow: 'Clay MCP',
    title: 'Give reps the best prospecting data in their AI tools',
    sub: 'Clay’s MCP server puts your enrichment and signals inside the assistants your reps already use.',
    intro: { h: 'Prospecting data where reps work', p: 'Connect Clay to any MCP-capable client and query your own data conversationally.' },
    rows: [
      { title: 'One connection, every client', img: IMG('Agents-Still-1.avif'), body: 'Point an MCP-capable assistant at Clay and it can look up accounts, people, and signals on demand.' },
      { title: 'Governed by your workspace', img: IMG('Data-Still-1.avif'), body: 'Access follows the same role-based permissions and credit budgets as the rest of your workspace.' },
    ],
    faq: [{ q: 'Which clients work with Clay MCP?', a: 'Any client that speaks the Model Context Protocol, including Claude and Cursor.' }],
  },

  'agent-plugin': {
    eyebrow: 'Agent plugin',
    title: 'Build in Clay directly via a coding agent',
    sub: 'A CLI and API surface for teams who would rather write the play than click it.',
    intro: { h: 'Clay as code', p: 'Define tables, workflows, and agents in version control and deploy them like any other change.' },
    rows: [
      { title: 'CLI-first workflow', img: IMG('Automation.avif'), body: 'Scaffold, run, and deploy Clay resources from your terminal or CI pipeline.' },
      { title: 'Full API coverage', img: IMG('Agents-Still-1.avif'), body: 'Everything the UI can do is available over the API, so a coding agent can build alongside you.' },
    ],
    faq: [{ q: 'Where are the API docs?', a: 'API and CLI reference are published in the Clay developer documentation.' }],
  },

  'ai-formatting': {
    path: '/ai-formula',          // the original's own route for this page
    eyebrow: 'AI formatting',
    title: 'Clean, normalise, and shape data with AI',
    sub: 'Turn messy free-text fields into the structure your systems expect.',
    intro: { h: 'Structure from mess', p: 'Describe the format you want and let Clay normalise every record to it.' },
    rows: [
      { title: 'Normalise anything', img: IMG('Data-Still-1.avif'), body: 'Job titles, company names, addresses, and industries normalised to one consistent vocabulary.' },
      { title: 'Consistent before it lands', img: IMG('CRMnav.avif'), body: 'Formatting runs before the write-back, so your CRM never sees the messy version.' },
    ],
    faq: [{ q: 'Does formatting use credits?', a: 'AI formatting is billed as an action, not as data credits.' }],
  },

  integrations: {
    eyebrow: 'Integrations',
    title: 'Connect Clay to your entire tech stack',
    sub: 'Native integrations with your CRM, warehouse, sequencers, and 150+ data providers.',
    intro: { h: 'Everything talks to everything', p: 'Clay has native integrations with Snowflake, Fivetran, Postgres, Databricks, and BigQuery, plus HTTP API access to anything else.' },
    rows: [
      { title: 'Warehouses and CRMs', img: IMG('CRMnav.avif'), body: 'Auto-sync with your data warehouse and keep your CRM enriched in both directions.', link: { label: 'CRM enrichment', href: '/use-cases/crm-enrichment' } },
      { title: 'Any HTTP API', img: IMG('Automation.avif'), body: 'If it has an endpoint, Clay can call it — no connector required.' },
    ],
    faq: [{ q: 'Which plans include warehouse sync?', a: 'Warehouse auto-sync is available on Growth and Enterprise plans.' }],
  },
}
