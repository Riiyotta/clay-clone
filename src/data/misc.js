/** Content for the smaller routes — blog, changelog, FAQ, legal, resources. */

export const POSTS = [
  { slug: 'the-rise-of-the-gtm-engineer', title: 'The rise of the GTM engineer', tag: 'GTM', date: 'Sep 2, 2026', img: '/assets/img/3d-icon-blog.avif',
    excerpt: 'Why the fastest-growing companies are hiring engineers into go-to-market roles, and what those roles actually do all day.' },
  { slug: 'building-your-first-audience', title: 'Building your first audience', tag: 'Product', date: 'Aug 21, 2026', img: '/assets/img/3d-icon-data.avif',
    excerpt: 'A walkthrough of turning scattered CRM and enrichment data into a segment you can actually run a play against.' },
  { slug: 'waterfalls-explained', title: 'Waterfall enrichment, explained', tag: 'Data', date: 'Aug 4, 2026', img: '/assets/img/3d-icon-wire.avif',
    excerpt: 'How chaining providers lifts match rates past what any single vendor can reach, and how to order them.' },
  { slug: 'signals-that-matter', title: 'The signals that actually predict pipeline', tag: 'Research', date: 'Jul 18, 2026', img: '/assets/img/3d-icon-wave.avif',
    excerpt: 'Not every trigger is worth a play. A look at which signals correlate with a reply and which are noise.' },
  { slug: 'agents-in-production', title: 'Running agents in production', tag: 'Engineering', date: 'Jul 1, 2026', img: '/assets/img/3d-icon-glass.avif',
    excerpt: 'Observability, rollbacks, and budgets — what changes when an agent runs against your whole book of business.' },
  { slug: 'inbound-in-five-minutes', title: 'Getting inbound speed-to-lead under five minutes', tag: 'Playbooks', date: 'Jun 12, 2026', img: '/assets/img/3d-icon-inbound.avif',
    excerpt: 'The enrichment and routing setup behind a sub-five-minute response time on every qualified form fill.' },
]

export const CHANGELOG = [
  { date: 'Sep 15, 2026', title: 'Account Agents beta', body: 'Agents that run continuously over an Audience, keep per-account memory, and report only what changed since the last run.' },
  { date: 'Sep 1, 2026', title: 'Claygent Builder versioning', body: 'Prompt history with one-click rollback to any previous version of an agent.' },
  { date: 'Aug 19, 2026', title: 'Google Ads audience sync', body: 'Audiences can now sync directly to Google Ads alongside LinkedIn and Meta.' },
  { date: 'Aug 5, 2026', title: 'Workbook-level credit budgets', body: 'Allocate and cap credit spend per workbook so a single experiment cannot consume a team’s quota.' },
  { date: 'Jul 22, 2026', title: 'Databricks integration', body: 'Native two-way sync with Databricks joins Snowflake, BigQuery, Postgres, and Fivetran.' },
  { date: 'Jul 8, 2026', title: 'Web intent signals', body: 'Track anonymous account-level web intent and trigger workflows from it.' },
]

export const FAQS = [
  { q: 'What is Clay?', a: 'Clay is a go-to-market platform that combines data from 150+ providers, AI agents, signals, and workflow automation in one workspace.' },
  { q: 'How does pricing work?', a: 'Plans include a set number of actions and data credits each month. Actions measure platform usage; data credits buy data and AI from vendors in Clay’s marketplace.' },
  { q: 'Is there a free plan?', a: 'Yes. The Free plan includes unlimited seats and tables, multi-provider waterfalls, and up to 200 rows per table.' },
  { q: 'Do unused credits roll over?', a: 'Credits reset each billing period. Annual plans allocate the full year up front.' },
  { q: 'Can I bring my own data provider API keys?', a: 'Yes — bring your own API key is available on every paid plan and runs inside the same waterfall.' },
  { q: 'Which CRMs does Clay integrate with?', a: 'Salesforce and HubSpot have native two-way sync. Anything else can be connected over the HTTP API.' },
  { q: 'Is Clay SOC 2 compliant?', a: 'Clay is SOC 2 Type II compliant. GDPR, CCPA, ISO 27001, and ISO 42001 are also covered — request documentation in the Trust Center.' },
  { q: 'Do you offer a startup discount?', a: 'Qualifying early-stage companies can apply to the startup program for discounted credits.' },
]

export const SECURITY = [
  { h: 'SOC 2 Type II', p: 'We are SOC 2 Type II compliant. Request our SOC 2 in our Trust Center.' },
  { h: 'GDPR', p: 'Go to market anywhere in the world — let us handle compliance with local laws.' },
  { h: 'CCPA', p: 'Support your customer base with opt out and DNC support.' },
  { h: 'ISO 27001', p: 'Securely connect your CRM and other systems.' },
  { h: 'ISO 42001', p: 'An audited management system for the AI that runs inside Clay.' },
]

export const INVESTORS = ['Sequoia', 'Meritech', 'Capital G', 'First Round', 'Box Group', 'Wellington']

export const PRESS = [
  { outlet: 'The New York Times', kind: 'Article', title: 'Placeholder press headline about a funding round', blurb: 'Placeholder standfirst describing the round and who led it.' },
  { outlet: 'The Wall Street Journal', kind: 'Article', title: 'Placeholder press headline about company culture', blurb: 'Placeholder standfirst for a feature on how the company operates.' },
  { outlet: 'Sequoia Capital', kind: 'Podcast', title: 'Placeholder podcast episode title with the founders', blurb: 'Placeholder description of a long-form conversation about building the company.' },
  { outlet: 'Business press', kind: 'Article', title: 'Placeholder press headline about a secondary sale', blurb: 'Placeholder standfirst about employees selling shares.' },
]

export const PRINCIPLES = [
  { h: 'Negative maintenance', p: 'Go beyond your job to make life easier for others. Kill ambiguity before it slows someone else down.' },
  { h: 'Non-attached action', p: 'Be intentional and adaptable without being trapped in ego. Move quickly, but don’t hold on to being right.' },
]

export const TIMELINE = [
  { year: '2017', label: 'Exploring' },
  { year: '2018', label: 'Building' },
  { year: '2019', label: 'Official launch' },
  { year: '2021', label: 'Series A' },
  { year: '2023', label: 'Series B' },
  { year: '2024', label: 'Series C' },
  { year: '2026', label: 'Series D' },
]

export const ROLES = [
  { team: 'Engineering', title: 'Senior Product Engineer', loc: 'New York, NY' },
  { team: 'Engineering', title: 'Infrastructure Engineer', loc: 'Remote (US)' },
  { team: 'Design', title: 'Product Designer', loc: 'New York, NY' },
  { team: 'Go-to-market', title: 'GTM Engineer', loc: 'New York, NY' },
  { team: 'Go-to-market', title: 'Account Executive, Enterprise', loc: 'Remote (US)' },
  { team: 'Marketing', title: 'Content Lead', loc: 'New York, NY' },
  { team: 'Operations', title: 'Revenue Operations Manager', loc: 'New York, NY' },
  { team: 'Support', title: 'Technical Support Engineer', loc: 'Remote (EU)' },
]

/* ---- /careers: sections measured off the live page ---- */

export const OFFICES = [
  { code: 'NYC', city: 'New York, NYC', tz: '(EDT)', addr: '111 W 19th St, 5th floor, New York, NY 10011',
    blurb: "Our colorful office sits right in the middle of Chelsea, surrounded by the best of New York." },
  { code: 'SF', city: 'San Francisco, CA', tz: '(PDT)', addr: 'Downtown San Francisco, CA',
    blurb: 'Our downtown outpost sits in the heart of the city, surrounded by the energy and creativity of the Bay.' },
  { code: 'LDN', city: 'London, UK', tz: '(GMT+1)', addr: 'Central London, UK',
    blurb: "We recently expanded to the heart of London, and we're just getting started." },
]

/** h3 32/500/35.2/−0.64 over 16/400/22.4 */
export const PERKS = [
  { h: 'Late night dinner', p: "Staying late? We've got you covered. Dinner is taken care of so you can focus on the work, not the logistics." },
  { h: 'Unlimited snacks & drinks', p: "The kitchen is always stocked. Whatever keeps you going, it's probably already here." },
  { h: 'Expensed coffee chats', p: 'Get to know the people you work with, on us. Coffee with a colleague is always a worthwhile use of time.' },
  { h: 'Creative referral program', p: 'Refer someone who joins Clay and you choose the adventure. Past picks: a helicopter over Manhattan.' },
  { h: 'DJ fridays', p: 'We close out the week with good music and a reason to stick around. Fridays have a different energy here.' },
  { h: 'Pop-up treats', p: "Surprises happen here. Good ones. Don't ask, just show up." },
]

/** 20/500/24/−0.2 title over 16/400/22.4 body, two rows of four */
export const BENEFITS = [
  { h: 'Competitive salary and role trajectory', p: 'Your roles, responsibilities, and compensation will grow as we do.' },
  { h: 'Full health coverage', p: 'Fully funded, high quality health, dental & vision coverage options for US Claymates, plus benefits abroad.' },
  { h: 'Lunch & dinner on us', p: 'Free lunch and dinner, every day. Because great work happens on a full stomach.' },
  { h: 'Flexible schedules & PTO', p: 'Work-life balance matters. We encourage everyone to take the time they need to rest and recharge.' },
  { h: 'Socials & retreats', p: 'DJ Fridays, daily team lunches, soccer and board game nights, and a special in-person retreat each year.' },
  { h: 'Onboarding stipend', p: 'We give every new hire a stipend to get whatever equipment and tools make them productive.' },
  { h: 'Flexible in-person culture', p: 'We love the energy of in-person collaboration while also offering the flexibility to work from home.' },
  { h: 'Parental & family benefits', p: 'IVF fertility benefits, egg freezing, and up to 4 months of paid parental leave.' },
]

/** 72/500/79.2/−2.16 numeral, 12/600/1.08 label, 14/400/19.6 body */
export const INTERVIEW = [
  { n: '01', h: 'Intro call', p: 'A first conversation with our team to understand what you are looking for and to tell you how we work.' },
  { n: '02', h: 'Exercise or follow-up call', p: 'This step is all about helping us get to know you even better and giving you insight into what the role involves.' },
  { n: '03', h: 'Onsite interviews', p: 'A deeper set of conversations with the people you would work with most closely, in person where we can.' },
  { n: '04', h: 'Reference checks', p: 'Once we have wrapped up the final interview, you will provide references so we can gather a fuller picture.' },
]

/** /about "Our team" — first names as the original's grid shows them. */
export const TEAM = [
  'Maggie', 'Rahul', 'Clare', 'Callie', 'Ben', 'Suchita',
  'Jessica', 'Eva', 'Ayush', 'Stella', 'Geoffrey', 'Josh',
  'Mark', 'David', 'Neil', 'Yash', 'Greg', 'Blake',
  'Shriya', 'Charlotte', 'Liam', 'Tyler', 'Ian', 'Grant',
]
