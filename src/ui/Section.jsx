/**
 * Page section shell. The original's `.section` is 96px vertical padding with the
 * 95%/1280 container inside; `u-pt-0`/`u-pb-0` variants drop one side.
 */
export function Section({ children, className = '', pt = true, pb = true, bg, id, wide }) {
  return (
    <section
      id={id}
      className={`${pt ? 'py-24 tb:py-16' : 'pt-0 pb-24 tb:pb-16'} ${pb ? '' : '!pb-0'} ${className}`}
      style={bg ? { backgroundColor: bg } : undefined}
    >
      <div className={wide ? 'container-nav' : 'container-clay'}>{children}</div>
    </section>
  )
}

/** 44/500/48.4/−0.88 — the page-level heading token (smaller than home's 48/-1.92). */
export function H2({ children, className = '', center }) {
  return (
    <h2 className={`text-[44px] font-medium leading-[48.4px] tracking-[-0.88px] text-black tb:text-[32px] tb:leading-[36px] ${center ? 'text-center' : ''} ${className}`}>
      {children}
    </h2>
  )
}

/** 12/600/14.4/1.08 uppercase — the eyebrow above most section headings. */
export function Eyebrow({ children, className = '' }) {
  return (
    <p className={`text-[12px] font-semibold uppercase leading-[14.4px] tracking-[1.08px] ${className}`}>
      {children}
    </p>
  )
}

export function Lead({ children, className = '' }) {
  return (
    <p className={`text-[20px] font-normal leading-[28px] tb:text-[16px] tb:leading-[24px] ${className}`}
       style={{ color: 'rgb(85,83,78)' }}>
      {children}
    </p>
  )
}
