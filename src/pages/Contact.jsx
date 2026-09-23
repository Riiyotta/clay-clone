import PageHero from '../ui/PageHero'
import A from '../ui/Link'

/**
 * The original /contact is deliberately minimal — a 64/600/64/−1.92 heading and a
 * single 20/400/28 paragraph, total page height 900px. Nothing else on the page.
 */
export default function Contact() {
  return (
    <PageHero shape="mid" band={800} title="Get in touch with Clay.">
      <p className="mt-6 max-w-[560px] text-[20px] font-normal leading-[28px] tb:text-[16px] tb:leading-[24px]"
         style={{ color: 'rgb(85,83,78)' }}>
        Please log in to your Clay account and click the{' '}
        <span className="font-medium text-black">?</span> icon in the top navigation bar to reach our support team
        fastest. For anything else, email{' '}
        <A href="mailto:support@clay.com" className="text-black underline underline-offset-4">support@clay.com</A>.
      </p>
    </PageHero>
  )
}
