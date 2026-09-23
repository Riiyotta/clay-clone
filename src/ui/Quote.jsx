/** Pull quote — 28/500/33.6/−0.56 body, 32/500 name, 24/600 role. */
export default function Quote({ text, name, role, avatar }) {
  return (
    <figure className="mx-auto max-w-[860px] text-center">
      <blockquote className="text-[28px] font-medium leading-[33.6px] tracking-[-0.56px] text-black tb:text-[20px] tb:leading-[26px]">
        {text}
      </blockquote>
      <figcaption className="mt-10 flex items-center justify-center gap-4">
        {avatar && <img src={avatar} alt="" className="h-14 w-14 rounded-full object-cover" loading="lazy" />}
        <span className="text-left">
          <span className="block text-[32px] font-medium leading-[35.2px] tracking-[-0.64px] text-black tb:text-[22px]">{name}</span>
          <span className="block text-[24px] font-semibold leading-[28.8px] tracking-[-0.48px] tb:text-[16px]" style={{ color: 'rgb(123,121,116)' }}>{role}</span>
        </span>
      </figcaption>
    </figure>
  )
}
