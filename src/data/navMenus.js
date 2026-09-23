/**
 * The original's nav panels, measured at 1280 (scratchpad/navicons.js).
 *   panel        1216 x 328, x=32 — coordinates below are panel-relative
 *   headings     10/600/12, 0.8px tracking, uppercase rgb(121,117,109), y=125
 *   item rows    219.3 wide, pitch 41.9 (Product/Company) or 29.5, first row y=147
 *   icon         20x20 at item x+6, title 14/550/19.6 at item x+40
 *   promo card   294.4 x 224 at x=899.4, radius 16
 */
export const NAV_MENUS = {
  Product: {
    h: 328, colW: 219.3, pitch: 41.9,
    heads: [{ t: 'DATA INFRASTRUCTURE', x: 22.2, y: 125 }, { t: 'AGENTS', x: 241.5, y: 125 }, { t: 'ORCHESTRATION', x: 460.8, y: 125 }, { t: 'EXECUTION', x: 680.1, y: 125 }],
    items: [
      { t: 'Audiences', href: '/audiences', x: 22.2, y: 147, icon: '/assets/img/nav/Audiences.webp' },
      { t: 'Data marketplace', href: '/integrations', x: 22.2, y: 188.9, icon: '/assets/img/nav/3d-icon-wire.avif' },
      { t: 'Signals and Intent', href: '/signals', x: 22.2, y: 230.8, icon: '/assets/img/nav/Signals_satellite_dish_monitor.png' },
      { t: 'Waterfall', href: '/waterfall-enrichment', x: 22.2, y: 272.7, icon: '/assets/img/nav/3d-icon-wave.avif' },
      { t: 'Claygents', href: '/claygent', x: 241.5, y: 147, icon: '/assets/img/nav/Claygent_Claymation.png' },
      { t: 'Account Agents', href: '/account-agents', x: 241.5, y: 188.9, icon: '/assets/img/nav/Automation.avif' },
      { t: 'Agent plugin CLI/API', href: '/agent-plugin', x: 241.5, y: 230.8, icon: '/assets/img/nav/3d-icon-changelog.avif' },
      { t: 'MCP for reps', href: '/mcp', x: 241.5, y: 272.7, icon: '/assets/img/nav/3d-icon-link.avif' },
      { t: 'Workflows', href: '/workflows', x: 460.8, y: 147, icon: '/assets/img/nav/Workflows.avif' },
      { t: 'Functions', href: '/functions', x: 460.8, y: 188.9, icon: '/assets/img/nav/functions.png' },
      { t: 'AI formatting', href: '/ai-formula', x: 460.8, y: 230.8, icon: '/assets/img/nav/3d-icon-data.avif' },
      { t: 'Ads', href: '/ads', x: 680.1, y: 147, icon: '/assets/img/nav/ads-icon_1.png' },
      { t: 'Sequencer', href: '/sequencer', x: 680.1, y: 188.9, icon: '/assets/img/nav/image.webp' },
    ],
    promo: { x: 899.4, y: 125, w: 294.4, h: 224, href: '/mcp', img: '/assets/img/nav/MCP.jpg',
             eyebrow: 'CLAY MCP', title: 'Give reps the best prospecting data in their AI tools' },
  },
  Solutions: {
    h: 328, colW: 219.3, pitch: 29.5,
    heads: [{ t: 'DATA FOUNDATIONS', x: 22.2, y: 125 }, { t: 'PIPELINE GENERATION', x: 241.5, y: 125 }, { t: 'REP PRODUCTIVITY', x: 460.8, y: 125 }, { t: 'DEPARTMENT', x: 680.1, y: 125 }],
    items: [
      { t: 'CRM enrichment', href: '/use-cases/crm-enrichment', x: 22.2, y: 147, icon: '/assets/img/nav/RevOps.avif' },
      { t: 'TAM sourcing', href: '/use-cases/tam-sourcing', x: 22.2, y: 176.5, icon: '/assets/img/nav/tam.webp' },
      { t: 'Territory planning', href: '/use-cases/territory-planning', x: 22.2, y: 206, icon: '/assets/img/nav/terrplanning.webp' },
      { t: 'Reverse ETL', href: '/use-cases/reverse-etl', x: 22.2, y: 235.5, icon: '/assets/img/nav/etl.avif' },
      { t: 'Outbound', href: '/use-cases/outbound', x: 241.5, y: 147, icon: '/assets/img/nav/3d-icon-outbound.avif' },
      { t: 'Automated inbound', href: '/use-cases/inbound-enrichment', x: 241.5, y: 176.5, icon: '/assets/img/nav/3d-icon-inbound.avif' },
      { t: 'PLG assist', href: '/use-cases/plg-assist', x: 241.5, y: 206, icon: '/assets/img/nav/plg_assist.webp' },
      { t: 'ABM', href: '/use-cases/abm', x: 241.5, y: 235.5, icon: '/assets/img/nav/3d-icon-blog.avif' },
      { t: 'Rep prospecting', href: '/use-cases/rep-prospecting', x: 460.8, y: 147, icon: '/assets/img/nav/prospecting.webp' },
      { t: 'Account research', href: '/use-cases/account-research', x: 460.8, y: 176.5, icon: '/assets/img/nav/3d-icon-glass.avif' },
      { t: 'Rep assist', href: '/use-cases/rep-assist', x: 460.8, y: 206, icon: '/assets/img/nav/Loop.avif' },
      { t: 'GTM Ops', href: '/clay-for-gtm-ops', x: 680.1, y: 147, icon: '/assets/img/nav/piechart.avif' },
      { t: 'Marketing', href: '/clay-for-marketing', x: 680.1, y: 176.5, icon: '/assets/img/nav/marketing.webp' },
      { t: 'Sales', href: '/clay-for-sales', x: 680.1, y: 206, icon: '/assets/img/nav/sales.avif' },
      { t: 'Enterprise', href: '/enterprise', x: 680.1, y: 235.5, icon: '/assets/img/nav/ent.avif' },
      { t: 'Startup', href: '/clay-for-startups', x: 680.1, y: 265, icon: '/assets/img/nav/startups.avif' },
    ],
    promo: { x: 899.4, y: 125, w: 294.4, h: 224, href: '/customers/intercom', img: '/assets/img/nav/intercom.avif',
             eyebrow: 'INTERCOM', title: 'Grew their outbound-sourced pipeline by +140%' },
  },
  Resources: {
    h: 328, colW: 219.3, pitch: 29.5,
    heads: [{ t: 'LEARN TO BUILD ON CLAY', x: 22.2, y: 125 }, { t: 'CONNECT WITH GTM ENGINEERS', x: 241.5, y: 125 }, { t: 'WORK WITH GTM ENGINEERS', x: 460.8, y: 125 }, { t: 'PARTNER WITH CLAY', x: 680.1, y: 125 }],
    items: [
      { t: 'University', href: 'https://university.clay.com/', x: 22.2, y: 147, icon: '/assets/img/nav/prospecting.webp' },
      { t: 'Guides', href: '/guides', x: 22.2, y: 176.5, icon: '/assets/img/nav/Loop.avif' },
      { t: 'Livestreams', href: '/livestreams', x: 22.2, y: 206, icon: '/assets/img/nav/agencies.avif' },
      { t: 'Cohort live classes', href: 'https://university.clay.com/cohorts', x: 22.2, y: 235.5, icon: '/assets/img/nav/Claymation.avif' },
      { t: 'Clay community', href: 'https://community.clay.com/', x: 241.5, y: 147, icon: '/assets/img/nav/prospecting.webp' },
      { t: 'Slack', href: 'https://www.clay.com/slack-community', x: 241.5, y: 176.5, icon: '/assets/img/nav/Audiences.webp' },
      { t: 'Live events', href: 'https://luma.com/claylive?k=c', x: 241.5, y: 206, icon: '/assets/img/nav/3d-icon-glass.avif' },
      { t: 'Startup program', href: '/clay-for-startups', x: 241.5, y: 235.5, icon: '/assets/img/nav/prospecting.webp' },
      { t: 'Campus ambassadors', href: '/clay-campus-ambassadors', x: 241.5, y: 265, icon: '/assets/img/nav/prospecting.webp' },
      { t: 'Find Clay experts', href: '/experts', x: 460.8, y: 147, icon: '/assets/img/nav/clay1x1.avif' },
      { t: 'Link long form description will go in this slot here.', href: '/job-board', x: 460.8, y: 176.5, icon: '/assets/img/nav/SDR.avif' },
      { t: 'Become a partner', href: '/partners', x: 680.1, y: 147, icon: '/assets/img/nav/3d-icon-glass.avif' },
      { t: 'Solution partners', href: '/partners/solutions', x: 680.1, y: 176.5, icon: '/assets/img/nav/prospecting.webp' },
      { t: 'Integration partners', href: '/partners/integrations', x: 680.1, y: 206, icon: '/assets/img/nav/Audiences.webp' },
      { t: 'Private Equity', href: '/clay-for-private-equity', x: 680.1, y: 235.5, icon: '/assets/img/nav/Loop.avif' },
    ],
    promo: { x: 899.4, y: 125, w: 294.4, h: 224, href: 'https://www.clay.com/blog/sandra-uche', img: '/assets/img/nav/Untitled_design_(1).avif',
             eyebrow: 'CLAY COMMUNITY', title: 'Placeholder community story headline' },
  },
  Company: {
    h: 328, colW: 292.4, pitch: 41.9,
    heads: [{ t: 'OUR COMPANY', x: 22.2, y: 125 }, { t: 'GET IN TOUCH', x: 314.6, y: 125 }, { t: 'SOCIALS', x: 607, y: 125 }],
    items: [
      { t: 'About', href: '/about', x: 22.2, y: 147, icon: '/assets/img/nav/Heart_Tricolor.png' },
      { t: 'Careers', href: '/careers', x: 22.2, y: 188.9, icon: '/assets/img/nav/Signal_Title_Change.png' },
      { t: 'Open roles', href: '/jobs', x: 22.2, y: 230.8, icon: '/assets/img/nav/Signal_Jobs.png' },
      { t: 'Blog', href: '/blog', x: 22.2, y: 272.7, icon: '/assets/img/nav/startups.avif' },
      { t: 'Contact', href: '/contact', x: 314.6, y: 147, icon: '/assets/img/nav/Chat_B.png' },
      { t: 'Press', href: '/press', x: 314.6, y: 188.9, icon: '/assets/img/nav/Signal_News.png' },
      { t: 'LinkedIn', href: 'https://www.linkedin.com/company/grow-with-clay/', x: 607, y: 147, icon: '/assets/img/nav/Linkedin.png' },
      { t: 'YouTube', href: 'https://www.youtube.com/@GrowWithClay', x: 607, y: 188.9, icon: '/assets/img/nav/Youtube.png' },
    ],
    promo: { x: 899.4, y: 125, w: 294.4, h: 224, href: 'https://www.nytimes.com/2026/01/28/business/dealbook/clay-start-up-tender-offers.html?unlocked_article_code=1.H1A.LBNX.YbS98P3kIG8Q&smid=url-share', img: '/assets/img/nav/company-ads-v0.avif',
             eyebrow: 'ARTICLE – NY TIMES', title: 'Clay allows employees to sell shares at a $5b valuation.' },
  },
}

export const NAV_LINKS = ['Product', 'Solutions', 'Resources', 'Company', 'Pricing']

/** Measured label widths: the box is this + 8px padding each side. */
export const LABEL_W = { Product: 51.4, Solutions: 59.9, Resources: 66.8, Company: 61.9, Pricing: 44.8 }
