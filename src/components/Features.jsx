import FeatureBlock from './FeatureBlock'

const PILLS = ['Data', 'Agents', 'Orchestration', 'Execution']

/* Placeholder call-out copy on the original's type ramp (14/700 lead-in + 14/400 body). */
const Q = (lead, body) => ({ lead, body })

const CARDS = [
  {
    bg: '#F0F8FF', deep: '#001433', activeBg: '#395AFA', idleBg: '#BEDFFE',
    pills: PILLS, pillIndex: 0,
    heading: 'Get data from the most',
    headingAccent: 'complete data marketplace',
    body: 'One contract covers every provider, so you stop stitching vendors together and start working from a single enriched table.',
    video: 'Data-06-16-1000px.webm', still: 'Data-Still-1.avif',
    marks: ['openai-mark', 'intercom-mark', 'figma-mark'],
    quotes: [
      Q('Placeholder Co.', 'tripled its enrichment coverage after consolidating providers.'),
      Q('Example Inc.', 'grew qualified pipeline by continuously researching target accounts.'),
      Q('Sample Ltd.', 'cut its data spend while widening match rates.'),
    ],
    buttons: ['Start free trial', 'Explore data marketplace'],
  },
  {
    bg: '#FFF3ED', deep: '#381005', activeBg: '#B53D0A', idleBg: '#FCC9AB',
    pills: PILLS, pillIndex: 1,
    heading: 'Create agents who mimic',
    headingAccent: 'your best reps',
    body: 'Describe the research a strong rep would do by hand, then let an agent run it across every account, every day.',
    bodyW: 480,
    video: 'Agents-06-16-1000px.webm', still: 'Agents-Still-1.avif',
    marks: ['canva-mark', 'openai-mark', 'pendo-mark'],
    quotes: [
      Q('Placeholder Co.', 'automated pre-call research for its whole sales floor.'),
      Q('Example Inc.', 'saved several hours per rep each week on manual lookups.'),
      Q('Sample Ltd.', 'standardised account briefs across regions.'),
    ],
    buttons: ['Start free trial', 'Explore agents'],
  },
  {
    bg: '#FCFEE2', deep: '#102B03', activeBg: '#808000', idleBg: '#EEF773',
    pills: PILLS, pillIndex: 2,
    heading: 'Orchestrate workflows',
    headingAccent: 'across tools in real time',
    body: 'Connect the systems you already run on and keep records moving between them without waiting on a nightly sync.',
    video: 'Orch-06-16-1000px.webm', still: 'Orch-Still-1.avif',
    marks: ['elevenlabs-mark', 'verkada', 'vanta-mark'],
    quotes: [
      Q('Placeholder Co.', 'raised qualified opportunities by routing on live signals.'),
      Q('Example Inc.', 'doubled warm-lead reply rates with real-time handoffs.'),
      Q('Sample Ltd.', 'retired a nightly batch job entirely.'),
    ],
    buttons: ['Start free trial', 'Explore the GTM data layer'],
  },
  {
    bg: '#FFF0FA', deep: '#46022F', activeBg: '#CC089E', idleBg: '#F8B9E4',
    pills: PILLS, pillIndex: 3,
    heading: 'Launch new plays',
    headingAccent: 'as fast as you have ideas',
    body: 'Build, test, and scale any GTM play you can imagine, then keep the ones that move pipeline.',
    video: 'Execution-06-16-1000px.webm', still: 'Execution-Still-1.avif',
    marks: ['rippling-mark', 'legora-mark', 'lovable-mark'],
    quotes: [
      Q('Placeholder Co.', 'doubled cold-email performance after testing variants weekly.'),
      Q('Example Inc.', 'grew qualified lead volume with a play it shipped in a day.'),
      Q('Sample Ltd.', 'now launches a new segment without engineering help.'),
    ],
    buttons: ['Start free trial', 'Learn more about building plays'],
  },
]

export default function Features() {
  return (
    <section className="relative bg-bg pb-12 pt-16">
      <div className="container-clay">
        {/* .home-feature_list — radius 48, overflow clip so the sticky stack masks */}
        <div className="overflow-clip rounded-feature">
          {CARDS.map((c, i) => (
            <FeatureBlock key={c.heading} card={c} isLast={i === CARDS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
