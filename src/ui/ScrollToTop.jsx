import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Webflow restores to the top on navigation; react-router does not. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) return el.scrollIntoView({ behavior: 'smooth' })
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}
