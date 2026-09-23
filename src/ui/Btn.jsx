import A from './Link'

const BASE = 'btn rounded-btn inline-flex items-center justify-center gap-[6.96px] text-btn font-medium transition-transform'

/** variant: dark (black fill) | soft (#F3F2ED) | ghost (bordered) */
export default function Btn({ href = '/', variant = 'dark', className = '', children, big }) {
  const pad = big ? 'px-6 py-3 text-[16px] leading-6' : 'px-4 py-2'
  // The original never lifts a button on hover — it only darkens the fill.
  const look = { dark: 'btn-dark', soft: 'btn-oat', ghost: 'text-black hover:btn-oat' }[variant]
  const style = variant === 'ghost' ? { border: '1px solid rgba(209,205,199,0.9)' } : undefined
  return (
    <A href={href} className={`${BASE} ${pad} ${look} ${className}`} style={style}>{children}</A>
  )
}
