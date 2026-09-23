/**
 * Use-case + solution pages. Shape mirrors /use-cases/outbound: left 57.6px
 * hero, a centred intro band, a 3-up card row, a pull quote, a stat block, and
 * alternating 44px feature rows.
 */
const IMG = (n) => `/assets/img/${n}`

const U = (slug, o) => [slug, { slug, ...o }]

export const USE_CASES = Object.fromEntries([
  U('outbound', {
    title: 'AI outbound that scales your best rep’s personalization',
    sub: 'Turn every sales rep into your best rep. Automate as much manual research and list building as you can.',
    intro: {
      h: 'An end-to-end outbound solution',
      p: 'True buyer intent isn’t revealed in a single moment. Audiences turns scattered signals into one prioritised list your reps can actually work.',
    },
    cards: [
      { title: 'Intelligently find and prioritize leads', body: 'Find leads and score them. Get granular with your scoring criteria so reps always start at the top of the list.' },
      { title: 'Deliver personalized messaging at the right time', body: 'Leverage intent signals to identify when prospects are ready to engage, and combine them with the research you already have.' },
      { title: 'Integrate with your existing sequencers or use ours', body: 'Export directly to email and multi-channel sequencers such as Outreach, Instantly, and Smartlead — or send from Clay.' },
    ],
    quote: {
      text: 'We use Clay for hyper-personalized outreach, identifying winnable closed-lost accounts and reaching them with a reason to talk again.',
      name: 'Ali Spinelli', role: 'VP Revenue Operations at PandaDoc',
    },
    story: { name: 'Oyster', logo: '/assets/img/oyster.webp', stats: ['$34K in new pipeline generated from previously untapped accounts', '4x increase in accounts reached via intent-based outbound'], href: '/customers' },
    rows: [
      { title: 'Build lead lists and prioritize high-impact accounts', img: IMG('buildleadlists_outbound.avif'), body: 'Pull leads from Clay’s people and company sources or import from your CRM, then score them on criteria that are specific to your business.' },
      { title: 'Personalize messages with first and third party data', img: IMG('05bc9f3b88940df8c2b1a3ecab0c32f7_personalizemessages_outbound.avif'), body: 'Every message can draw on the enrichment, signals, and account research already attached to the record.' },
      { title: 'Trigger outreach with buying signals like web intent', img: IMG('4cdb350b1f2bda750751f972cf14fc9c_triggeroutrach_outbound.avif'), body: 'Timing matters as much as the message. Use our signals library to reach prospects when something on their side has changed.' },
      { title: "Connect existing sequencers or use Clay's built-in tool", img: IMG('connectexistingsequences_outbound.avif'), body: 'Build your outbound campaign in Clay and integrate it directly with any multi-channel sequencer you already run.' },
    ],
  }),

  U('inbound-enrichment', {
    title: 'Automated inbound that routes the right leads instantly',
    sub: 'Enrich every form fill in seconds so good-fit leads reach a rep before they cool off.',
    intro: { h: 'Qualify inbound the moment it lands', p: 'Every signup, demo request, and form fill is enriched, scored, and routed automatically.' },
    cards: [
      { title: 'Enrich on submit', body: 'Company, headcount, funding, and tech stack attached before the record reaches your CRM.' },
      { title: 'Score against your ICP', body: 'Rank inbound against the same criteria your outbound motion uses.' },
      { title: 'Route without delay', body: 'Assign to the right rep or sequence in seconds, not on tomorrow’s batch job.' },
    ],
    quote: { text: 'Inbound used to sit overnight before anyone looked at it. Now the good ones are in a rep’s queue before the tab is closed.', name: 'GTM Operations lead', role: 'Clay customer' },
    rows: [
      { title: 'Enrich every form fill in seconds', img: IMG('Clay-Inbound.png'), body: 'A webhook from your form kicks off enrichment and scoring, then writes the result straight back.' },
      { title: 'Send only qualified leads to reps', img: IMG('Clay-Lead.png'), body: 'Low-fit signups go to nurture automatically so reps spend their time on the accounts that matter.' },
    ],
  }),

  U('account-research', {
    title: 'Account research your reps actually read',
    sub: 'Give every account a living brief instead of a stale one-pager.',
    intro: { h: 'Context before every call', p: 'Agents research each account continuously and surface what changed since the last touch.' },
    cards: [
      { title: 'Always current', body: 'Research refreshes on a schedule instead of the day the list was built.' },
      { title: 'Sourced and traceable', body: 'Every claim comes with the source the agent used to find it.' },
      { title: 'Where reps work', body: 'Briefs land in the CRM record, not in a separate tool nobody opens.' },
    ],
    rows: [
      { title: 'Research that keeps itself current', img: IMG('Agents-Still-1.avif'), body: 'Account Agents re-run over your segment and report only the deltas.' },
      { title: 'Meeting prep in one place', img: IMG('Claymation.avif'), body: 'News, hiring, funding, and prior touches collapsed into a single brief on the account.' },
    ],
  }),

  U('abm', {
    title: 'ABM that targets accounts, not guesses',
    sub: 'Build the target account list from your own data and keep every channel pointed at it.',
    intro: { h: 'One list, every channel', p: 'Define the account list once and sync it to ads, sequencers, and your CRM.' },
    cards: [
      { title: 'Define the list from data', body: 'Firmographics, signals, and product usage combined into one target account list.' },
      { title: 'Keep every channel in sync', body: 'Ads, outbound, and sales all work the same list without manual exports.' },
      { title: 'Measure by account', body: 'Report on reach and pipeline at the account level, not the lead level.' },
    ],
    rows: [
      { title: 'Build the target account list', img: IMG('Audiences.webp'), body: 'Combine enrichment, intent, and CRM history into a segment that updates itself.' },
      { title: 'Sync it everywhere at once', img: IMG('Clay-Ads.png'), body: 'Push the same audience to LinkedIn, Meta, and your sequencer in one step.' },
    ],
  }),

  U('plg-assist', {
    title: 'PLG assist: find the signups worth a human',
    sub: 'Surface the self-serve accounts that are ready for sales before they churn or plateau.',
    intro: { h: 'Product signals, sales follow-up', p: 'Combine product usage with firmographics to find product-qualified accounts.' },
    cards: [
      { title: 'Product-qualified accounts', body: 'Roll usage up from user to account so reps see the whole picture.' },
      { title: 'Expansion triggers', body: 'Catch seat growth, limit hits, and feature adoption as they happen.' },
      { title: 'No manual triage', body: 'The list reaches the rep already scored and enriched.' },
    ],
    rows: [
      { title: 'Roll usage up to the account', img: IMG('Audiences.webp'), body: 'Individual signups become an account-level score reps can act on.' },
      { title: 'Trigger the play automatically', img: IMG('Automation.avif'), body: 'A usage threshold starts the workflow, enriches the account, and notifies the owner.' },
    ],
  }),

  U('rep-assist', {
    title: 'Rep assist: prospecting data inside the rep’s tools',
    sub: 'Put Clay’s research where reps already spend their day.',
    intro: { h: 'No new tab to open', p: 'Reps ask for an account in their assistant or CRM and get Clay’s answer back.' },
    cards: [
      { title: 'In the CRM', body: 'Enriched fields and briefs land on the record itself.' },
      { title: 'In the assistant', body: 'Clay MCP exposes your data to the AI tools reps already use.' },
      { title: 'Under your controls', body: 'Access follows workspace roles and credit budgets.' },
    ],
    rows: [
      { title: 'Prospecting data in any AI tool', img: IMG('Agents-Still-1.avif'), body: 'Clay MCP gives reps live access to your enrichment and signals from their assistant.' },
      { title: 'Enrichment on the CRM record', img: IMG('CRMnav.avif'), body: 'No exports — the fields reps need are already on the account when they open it.' },
    ],
  }),

  U('rep-prospecting', {
    title: 'Rep prospecting without the manual list building',
    sub: 'Reps get a prioritised, enriched list every morning instead of building one.',
    intro: { h: 'Lists that build themselves', p: 'Territory rules, ICP scoring, and signals combine into a queue that refreshes daily.' },
    cards: [
      { title: 'Daily refresh', body: 'New accounts enter the queue as they qualify in.' },
      { title: 'Ranked by likelihood', body: 'Scoring puts the best accounts at the top, every day.' },
      { title: 'Fully enriched', body: 'Contacts, context, and a reason to reach out are already attached.' },
    ],
    rows: [
      { title: 'A queue, not a spreadsheet', img: IMG('Clay-Lead.png'), body: 'The list is a live segment, so it reorders itself as signals fire.' },
      { title: 'Personalisation already attached', img: IMG('Clay-Rep.png'), body: 'Each account arrives with the research needed to write the first message.' },
    ],
  }),

  U('reverse-etl', {
    title: 'Reverse ETL from your warehouse into the GTM stack',
    sub: 'Move modelled data out of the warehouse and into the tools that act on it.',
    intro: { h: 'Warehouse to action', p: 'Clay has native integrations with Snowflake, Fivetran, Postgres, Databricks, and BigQuery.' },
    cards: [
      { title: 'Native warehouse sync', body: 'Read from and write back to your warehouse on a schedule.' },
      { title: 'Enrich in transit', body: 'Add third-party data on the way out instead of modelling it upstream.' },
      { title: 'Land it anywhere', body: 'CRM, ads, sequencers, or any HTTP endpoint you control.' },
    ],
    rows: [
      { title: 'Sync both directions', img: IMG('CRMnav.avif'), body: 'Modelled segments flow out; engagement and enrichment flow back in.' },
      { title: 'Enrich on the way', img: IMG('Data-Still-1.avif'), body: 'Waterfall enrichment runs mid-pipeline so the destination gets complete records.' },
    ],
  }),

  U('crm-enrichment', {
    title: 'Keep your CRM clean with the highest quality data',
    sub: 'Auto-sync and enrich every account and contact, in both directions.',
    intro: { h: 'A CRM you can trust again', p: 'Waterfall enrichment fills the gaps and keeps records current without a manual import.' },
    cards: [
      { title: 'Fill the gaps', body: 'Multi-provider waterfalls lift match rates well past any single vendor.' },
      { title: 'Stay current', body: 'Scheduled re-enrichment catches job changes and company moves.' },
      { title: 'Normalise everything', body: 'AI formatting gives you one consistent vocabulary across the whole object.' },
    ],
    rows: [
      { title: 'Two-way sync with your CRM', img: IMG('Clay-CRM.png'), body: 'Read the records you have, enrich them, and write the result back on a schedule.' },
      { title: 'Deduplicate and normalise', img: IMG('Clay-Automated.png'), body: 'Merge duplicates and standardise fields before anything lands.' },
    ],
  }),

  U('tam-sourcing', {
    title: 'Source your entire TAM, not just the part you bought',
    sub: 'Build the full addressable market from scratch and keep it fresh.',
    intro: { h: 'Build the market, then work it', p: 'Combine Clay’s company sources with your own criteria to map every account you could sell to.' },
    cards: [
      { title: 'Every account, not a sample', body: 'Source from Clay’s people and company data instead of a single static list.' },
      { title: 'Your definition of fit', body: 'Encode ICP rules once and apply them to the whole market.' },
      { title: 'Refreshed continuously', body: 'New companies enter the TAM as they meet your criteria.' },
    ],
    rows: [
      { title: 'Map the whole market', img: IMG('Clay-Tam.png'), body: 'Source, dedupe, and enrich every account that fits your definition.' },
      { title: 'Segment it for each motion', img: IMG('Audiences.webp'), body: 'Slice the TAM into audiences for ads, outbound, and partner motions.' },
    ],
  }),

  U('territory-planning', {
    title: 'Territory planning on data, not on last year’s map',
    sub: 'Balance books of business against the market as it actually is.',
    intro: { h: 'Fair books, fewer disputes', p: 'Plan territories against the sourced TAM rather than a stale CRM extract.' },
    cards: [
      { title: 'Plan on the real TAM', body: 'Territories drawn against every account, not only the ones already in the CRM.' },
      { title: 'Balance by potential', body: 'Weight by segment, headcount, or spend rather than raw account count.' },
      { title: 'Re-cut without a project', body: 'Re-run the plan when the market or the team changes.' },
    ],
    rows: [
      { title: 'Model the split before you commit', img: IMG('Audiences.webp'), body: 'Try several cuts against the same market data and compare the resulting books.' },
      { title: 'Push the result to the CRM', img: IMG('CRMnav.avif'), body: 'Ownership updates flow back automatically once the plan is approved.' },
    ],
  }),
])

export const SOLUTIONS = Object.fromEntries([
  U('gtm-ops', {
    path: '/clay-for-gtm-ops',
    title: 'The system of record for GTM operations',
    sub: 'One place to build, govern, and measure every go-to-market play.',
    intro: { h: 'Own the whole motion', p: 'Data, agents, and execution in a single workspace your team controls.' },
    cards: [
      { title: 'One data layer', body: 'Enrichment, signals, and CRM data unified instead of scattered across tools.' },
      { title: 'Governed access', body: 'Role-based access control with workbook-level credit budgets.' },
      { title: 'Measurable plays', body: 'Every play is a workflow you can audit and attribute.' },
    ],
    rows: [
      { title: 'Consolidate the stack', img: IMG('Automation.avif'), body: 'Replace a stack of point tools with one workspace your team can actually maintain.' },
      { title: 'Control spend per team', img: IMG('Data-Still-1.avif'), body: 'Budget credits by workbook so one experiment cannot consume the quarter.' },
    ],
  }),
  U('marketing', {
    path: '/clay-for-marketing',
    title: 'Marketing that targets accounts, not cookies',
    sub: 'Build audiences from your own data and sync them to every channel.',
    intro: { h: 'Own your audience', p: 'Define the segment in Clay and keep ads, email, and web aligned to it.' },
    cards: [
      { title: 'First-party audiences', body: 'Built from your CRM and product data, not a third-party pixel.' },
      { title: 'Synced everywhere', body: 'One definition pushed to LinkedIn, Meta, and Google.' },
      { title: 'Attributable', body: 'Report on the accounts the spend actually reached.' },
    ],
    rows: [
      { title: 'Audiences from your own data', img: IMG('Audiences.webp'), body: 'Combine enrichment, intent, and product usage into a segment that stays current.' },
      { title: 'Sync to every ad platform', img: IMG('Clay-Ads.png'), body: 'The same audience, live, in each channel.' },
    ],
  }),
  U('sales', {
    path: '/clay-for-sales',
    title: 'Sales teams that start every day at the top of the list',
    sub: 'Prioritised, enriched, and ready — before the first call.',
    intro: { h: 'Less admin, more selling', p: 'Research, scoring, and list building handled before the rep logs in.' },
    cards: [
      { title: 'Prioritised queue', body: 'Accounts ranked by fit and timing every morning.' },
      { title: 'Research attached', body: 'A current brief on every account in the queue.' },
      { title: 'In their tools', body: 'Everything lands in the CRM and the assistant reps already use.' },
    ],
    rows: [
      { title: 'A queue that reorders itself', img: IMG('Clay-Lead.png'), body: 'Signals move accounts up the list as they get warmer.' },
      { title: 'Context on every record', img: IMG('Clay-Rep.png'), body: 'Reps open an account and the reason to reach out is already there.' },
    ],
  }),
  U('enterprise', {
    path: '/enterprise',
    title: 'Enterprise-grade data operations',
    sub: 'SSO, RBAC, credit budgets, and a dedicated growth strategist.',
    intro: { h: 'Built for scale and control', p: 'Everything a large GTM org needs to run Clay across many teams safely.' },
    cards: [
      { title: 'SSO and RBAC', body: 'Sign in with SSO, with workbook-level roles and viewer permissions.' },
      { title: 'Budgeted credits', body: 'Allocate spend per team and cap it where you need to.' },
      { title: 'Dedicated support', body: 'A growth strategist and priority support on every Enterprise plan.' },
    ],
    rows: [
      { title: 'Security and compliance', img: IMG('Data-Still-1.avif'), body: 'SOC 2 Type II, GDPR, CCPA, ISO 27001, and ISO 42001.' },
      { title: 'Scale without surprises', img: IMG('Automation.avif'), body: 'Bulk data purchasing and budgeted credits keep large deployments predictable.' },
    ],
  }),
  U('startup', {
    path: '/clay-for-startups',
    title: 'Startups: run a GTM motion before you hire the team',
    sub: 'Discounted credits and templates for early-stage companies.',
    intro: { h: 'Punch above your headcount', p: 'One operator with Clay can run the motion a whole team used to.' },
    cards: [
      { title: 'Startup pricing', body: 'Discounted credits for qualifying early-stage companies.' },
      { title: 'Templates to start from', body: 'Proven plays you can copy instead of designing from scratch.' },
      { title: 'Community support', body: 'A Slack community of GTM engineers solving the same problems.' },
    ],
    rows: [
      { title: 'Start from a template', img: IMG('Automation.avif'), body: 'Copy a working play and adapt it to your ICP in an afternoon.' },
      { title: 'Grow into the platform', img: IMG('Audiences.webp'), body: 'The same workspace scales from one operator to a full GTM org.' },
    ],
  }),
])
