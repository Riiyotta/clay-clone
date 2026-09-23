/** Clay wordmark — local asset at public/assets/img/Clay-primary-logo.avif */
export default function Logo({ className = '', tone = 'dark', w = 72, h }) {
  return (
    <img
      src="/assets/img/Clay-primary-logo.avif"
      alt="Clay logo, go to homepage"
      width={w}
      height={h ?? Math.round((w / 509) * 163)}
      className={className}
      style={{ ...(h ? { width: w, height: h } : null), ...(tone === 'light' ? { filter: 'brightness(0) invert(1)' } : null) }}
    />
  )
}
