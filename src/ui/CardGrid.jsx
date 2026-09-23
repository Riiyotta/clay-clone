/** 3-up card row — h3 24/600/28.8/−0.48, p 16/400/22.4. */
const COLS = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' }

export default function CardGrid({ cards, cols = 3 }) {
  return (
    <div className={`grid gap-8 ${COLS[cols]} dt:!grid-cols-2 tb:!grid-cols-1`}>
      {cards.map((c) => (
        <div key={c.title} className="rounded-[32px] p-8" style={{ background: c.tint || 'rgb(249,248,246)' }}>
          {c.icon && <img src={c.icon} alt="" width={48} height={48} className="mb-6 h-12 w-12 object-contain" loading="lazy" />}
          <h3 className="text-[24px] font-semibold leading-[28.8px] tracking-[-0.48px] text-black">{c.title}</h3>
          <p className="mt-4 text-[16px] font-normal leading-[22.4px]" style={{ color: 'rgb(85,83,78)' }}>{c.body}</p>
        </div>
      ))}
    </div>
  )
}
