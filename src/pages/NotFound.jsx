import Btn from '../ui/Btn'

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center pt-[168px] text-center">
      <div className="container-clay">
        <p className="text-[12px] font-semibold uppercase leading-[14.4px] tracking-[1.08px]" style={{ color: 'rgb(121,117,109)' }}>404</p>
        <h1 className="mt-4 text-[64px] font-semibold leading-[64px] tracking-[-1.92px] text-black tb:text-[40px] tb:leading-[42px]">
          We couldn’t find that page.
        </h1>
        <div className="mt-10 flex justify-center">
          <Btn href="/" big>Back to home</Btn>
        </div>
      </div>
    </section>
  )
}
