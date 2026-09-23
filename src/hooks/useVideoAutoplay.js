import { useEffect } from 'react'

/**
 * IntersectionObserver #1 of the two the original registers.
 *
 * Starts each `.video-bg__video` 200px before it enters the viewport, once, and
 * cross-fades its sibling poster out over 300ms once the video actually paints.
 * The original ships `preload="none"` and relies on this, so the films are never
 * fetched for sections the visitor doesn't reach.
 */
export default function useVideoAutoplay(key) {
  useEffect(() => {
    const vids = [...document.querySelectorAll('video[data-lazy]')]
    if (!vids.length) return

    const reveal = (v) => {
      const poster = v.parentElement?.querySelector('.video-poster')
      if (poster) poster.dataset.playing = 'true'
    }

    if (!('IntersectionObserver' in window)) {
      vids.forEach((v) => { v.play?.().catch(() => {}); reveal(v) })
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const v = e.target
          io.unobserve(v) // once: true
          v.preload = 'auto'
          const onReady = () => reveal(v)
          if (v.readyState >= 3) onReady()
          else v.addEventListener('playing', onReady, { once: true })
          v.play?.().catch(() => {})
        })
      },
      { rootMargin: '200px', threshold: 0 },
    )

    vids.forEach((v) => io.observe(v))
    return () => io.disconnect()
    // `key` is the current pathname — each route mounts its own <video> nodes.
  }, [key])
}
