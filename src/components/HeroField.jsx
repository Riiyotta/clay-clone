/**
 * Hero backdrop, back-to-front exactly as the original layers it:
 *   1. video      absolute inset 0, 1280x1072, intrinsic 3000x1500, object-cover,
 *                 preload="metadata", 17.14s loop
 *   2. poster     sibling img, object-cover, translateY(-53.6px), cross-fades out
 *                 over 300ms once the video paints (IO #1, 200px rootMargin)
 *   3. shade      absolute top:892px, 1280x180, transparent -> #fff
 * There is no colour-tint overlay on the original.
 */
export default function HeroField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-green" aria-hidden="true">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/assets/video/Hero-06-02-Lossy-0001-0240.mp4"
        data-lazy
        loop
        muted
        playsInline
        preload="metadata"
      />
      <span className="video-poster">
        <img
          src="/assets/img/hero-still_v3.avif"
          alt=""
          className="h-full w-full object-cover"
          style={{ transform: 'translateY(-53.6px)' }}
          loading="eager"
        />
      </span>

      {/* .home-hero_shade — fades the green into the page below */}
      <div
        className="absolute left-0 h-[180px] w-full"
        style={{ top: 892, background: 'linear-gradient(rgba(255,255,255,0), #fff)' }}
      />
    </div>
  )
}
