/**
 * Product-page heroes, measured on clay.com at 1280. Every `y` is the original's
 * page-y (the sticky nav occupies 0–102.8). `first` is the y of the first element
 * in the copy stack; `end` is where the next section begins.
 *
 * Plates in /assets/img/hero/ were captured from the original at 2x with the
 * original's own copy hidden — see PROCESS.md §12.
 */
const HERO = (n) => `/assets/img/hero/${n}`
const MUTED = 'rgba(27,26,24,0.75)'
const SIGNUP = '/pricing'
const DEMO = '/demo'

export const PRODUCT_HEROES = {
  audiences: {
    first: 158.8,
    h1: { y: 158.8, size: 88, w: 957, lines: ['Centralize your GTM data'] },
    sub: { y: 270.8, size: 24, w: 704, lines: ['Audiences connects your CRM, data warehouse, signals, and', '200+ enrichment providers into a unified data layer inside Clay.'] },
    plate: { src: HERO('audiences.jpg'), y: 365, w: 1216, h: 509 },
    end: 960.2, logoWall: true,
  },

  signals: {
    card: { color: 'rgb(249,248,246)', top: 118.8, bottom: 982.8 },
    first: 142.8,
    gif: { src: '/assets/img/Signals-Dish_gif_optimize.gif', y: 142.8 },
    h1: { y: 200.8, size: 64, w: 920.7, lines: ['Track signals your competitors', "aren't even looking for yet"] },
    sub: { y: 352.8, size: 20, w: 920.7, lines: ["Beat the market by tracking custom signals others aren't looking for — and enriching every signal", 'with context they’re lacking.'] },
    btns: { y: 428.8, items: [{ t: 'Start for free today', href: SIGNUP }] },
    plate: { src: HERO('signals.jpg'), y: 470, w: 1216, h: 513 },
    end: 1054.8, logoWall: true, logoWallPb: 0,
  },

  'waterfall-enrichment': {
    band: { color: 'rgb(249,248,246)', from: 102.8, to: 1006.5 },
    first: 150.8,
    h1: { y: 150.8, size: 64, w: 1216, lines: ['Why use one contact database when you', 'can use them all?'] },
    sub: { y: 294.8, size: 20, w: 851.2, lines: ['Stop relying on one tool to find emails and phone numbers. With waterfall enrichment, you', 'can access 150+ databases to maximize your coverage of contact info — or any other data', 'point.'] },
    btns: { y: 398.8, items: [{ t: 'Start building for free', href: SIGNUP }, { t: 'Watch lesson', href: '/university', kind: 'light' }] },
    plate: { src: '/assets/img/waterfall.webp', y: 489.8, w: 1214, h: 491.7, alt: 'Waterfall enrichment across multiple data providers' },
    end: 1092.8, logoWall: true, logoWallPb: 0,
  },

  claygent: {
    first: 166.8,
    h1: { y: 166.8, size: 88, w: 960, lines: ['Build agents for', 'any GTM task'] },
    sub: { y: 374.8, size: 24, w: 640, color: MUTED, lines: ['Run GTM agents that reason over your data,', 'and see exactly why they do what they do.'] },
    plate: { src: HERO('claygent.jpg'), y: 478.9, w: 1216, h: 601.1 },
    end: 1080,
  },

  'account-agents': {
    first: 166.8,
    h1: { y: 166.8, size: 88, w: 960, lines: ['Put an expert agent', 'on every account'] },
    sub: { y: 374.8, size: 24, w: 800, color: MUTED, lines: ['Account Agents use AI to reason over everything you know about on', 'an account, decide the next best action, and remember what they', 'learned — so every GTM play starts from the full account context.'] },
    btns: { y: 488.3, items: [{ t: 'Try Account Agents', href: SIGNUP, big: true }, { t: 'Get a demo', href: DEMO, kind: 'light', big: true }] },
    plate: { src: HERO('account-agents.jpg'), y: 615, w: 1216, h: 558 },
    end: 1173,
  },

  'agent-plugin': {
    first: 153.8,
    eyebrow: { t: 'Agent plugin', y: 153.8, h: 20.4, bg: 'rgb(238,233,223)', color: 'rgb(54,52,48)' },
    h1: { y: 192.2, size: 72, w: 802.7, lines: ['Build on Clay with any', { t: 'coding agent', color: 'rgb(133,129,122)' }] },
    sub: { y: 360.2, size: 20, w: 802.7, lines: ["Use Clay's API to build Clay data, workflows, and governance directly into your GTM", 'system. Build in Clay directly via a coding agent with CLI. Available on Mac and Linux', 'during open beta.'] },
    pill: { src: HERO('agent-plugin-pill.png'), y: 473.2, w: 365.7, h: 32 },
    plate: { src: HERO('agent-plugin.jpg'), y: 538.2, w: 1280, h: 471.9, full: true },
    end: 1106,
  },

  mcp: {
    first: 153.8,
    eyebrow: { t: 'Clay MCP', y: 153.8, h: 20.4, bg: 'rgb(190,224,255)', color: 'rgb(1,65,141)' },
    h1: { y: 192.2, size: 72, w: 1009.3, lines: ['Give reps the best prospecting', 'data in their AI tools'] },
    sub: { y: 360.2, size: 20, w: 706.5, lines: ['Bring data from 200+ providers and Ops-managed workflows into one place', 'in the tools reps already use. Find contacts, get emails and phone numbers,', 'and push to sequences—all in natural language.'] },
    plate: { src: HERO('mcp.jpg'), y: 458, w: 1216, h: 661 },
    end: 1165.8,
  },

  workflows: {
    layout: 'overlay',
    band: { color: 'rgb(244,243,240)', from: 0, to: 1003 },
    first: 240,
    eyebrow: { t: 'Workflows', y: 240, h: 33.6, padX: 16, bg: 'rgb(209,205,199)', color: '#000' },
    h1: { y: 305.6, size: 88, w: 1140, lines: ['Build visual-first workflows', 'on your living GTM data layer'] },
    sub: { y: 513.6, size: '20t', w: 560, color: MUTED, lines: ['Create GTM systems in minutes, no code required. Share,', 'troubleshoot, and perfect workflows in one place with', 'unlimited scale and complexity.'] },
    btns: { y: 615.6, items: [{ t: 'Start building for free', href: SIGNUP }] },
    plate: { src: HERO('workflows.jpg'), w: 1280, h: 1003 },
    end: 1003,
  },

  functions: {
    card: { color: 'rgb(250,225,136)', top: 118.8, bottom: 848.5 },
    first: 182.8,
    h1: { y: 182.8, size: 64, w: 958.6, lines: ['Build your workflows once—apply', 'them everywhere'] },
    sub: { y: 326.8, size: 20, w: 958.6, lines: ['Codify the GTM logic that is custom to your business, centralize it, and scale it across every table and', "audience in Clay. Your best logic becomes your org's default."] },
    btns: { y: 402.8, items: [{ t: 'Try Functions', href: SIGNUP }] },
    plate: { src: HERO('functions.jpg'), y: 446, w: 1216, h: 403 },
    end: 1030.9, logoWall: true, logoWallPb: 0,
  },

  'ai-formatting': {
    layout: 'dark',
    band: { color: 'rgb(67,20,7)', from: 102.8, to: 1085.8 },
    first: 198.8,
    h1: { y: 198.8, size: 64, w: 906, color: '#fff', lines: ['Use AI formulas to conditionally', 'run any workflow'] },
    sub: { y: 350.8, size: 20, w: 906, color: '#fff', lines: ["Different accounts and leads require different enrichment steps. Use Clay's AI formula maker to", 'conditionally run workflows - using plain English language.'] },
    btns: { y: 328.8, items: [{ t: 'Start for free today', href: SIGNUP, kind: 'light' }, { t: 'Watch demo', href: '/university', kind: 'ghostWhite' }] },
    plate: { src: HERO('ai-formula.jpg'), y: 470, w: 1280, h: 615 },
    end: 1220.2, logoWall: true, logoWallPb: 0,
  },

  ads: {
    first: 150.8,
    gif: { src: '/assets/img/ads-clay.png', y: 150.8, w: 40, h: 32.4, radius: 0 },
    h1: { y: 199.1, size: 72, w: 1009.3, lines: ['Focus ad spend on', 'the right people'] },
    sub: { y: 367.1, size: 20, w: 706.5, lines: ['Clay Ads builds targeted, always-on ad audiences from your unified first- and', 'third-party data. Boost match rates by enriching hashed emails across', 'multiple providers. Get higher-quality leads at a lower cost per lead, and more', 'ROI on your ad spend.'] },
    btns: { y: 499.1, items: [{ t: 'Start using Clay Ads', href: SIGNUP }] },
    plate: { video: '/assets/video/ClayAds.mp4', y: 565.1, w: 1216, h: 501.6 },
    end: 1114.8,
  },

  sequencer: {
    layout: 'split',
    band: { color: 'rgb(244,243,240)' },
    eyebrow: { t: 'Sequencer', y: 150.8, h: 33.6, padX: 16, bg: 'rgb(255,119,20)', color: 'rgb(254,253,251)' },
    h1: { y: 216.3, x: 128, size: 88, w: 800, lines: ['Run cold outbound', 'where your data', 'already lives'] },
    sub: { y: 668, size: '20t', w: 358.4, color: MUTED, lines: ['Reach new leads by combining lead', 'sourcing and enrichment with cold', 'email sequencing in Clay. Reply with', 'messaging from the most recent and', 'relevant context.'] },
    // measured at the project's standard 1280x900; the original's left column is
    // viewport-height dependent and drifts to y842 on very tall windows
    btns: { y: 818, items: [{ t: 'Build with Sequencer', href: SIGNUP }] },
    plate: { src: HERO('sequencer.jpg'), y: 440, w: 730, h: 622 },
    end: 1156.3,
  },

  sculptor: {
    layout: 'plateCard',
    h1: { lines: ['Meet Sculptor'] },
    plate: { src: HERO('sculptor.jpg'), y: 102.8, w: 1216, h: 448, alt: 'Meet Sculptor — Going to market just got easier.' },
    btns: { y: 484.5, items: [{ t: 'Sign up', href: SIGNUP }, { t: 'Watch demo', href: '/livestreams', kind: 'white', icon: 'play' }] },
    end: 647,
  },

  integrations: {
    layout: 'overlay',
    band: { color: 'rgb(243,242,237)', from: 102.8, to: 757.5 },
    first: 249.6,
    h1: { y: 249.6, size: 72, w: 631, lines: ['Explore our', 'growing library', 'of integrations'] },
    sub: { y: 489.6, size: 20, w: 631, lines: ['Browse through all the integrations you can connect', 'to Clay in seconds and discover what you can do!'] },
    btns: { y: 569.6, items: [{ t: 'Browse by datapoint', href: '/integrations' }] },
    plate: { src: HERO('integrations.jpg'), w: 1280, h: 655 },
    end: 757.5,
  },
}
