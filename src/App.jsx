import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import useVideoAutoplay from './hooks/useVideoAutoplay'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './ui/ScrollToTop'

import Home from './pages/Home'
import Pricing from './pages/Pricing'
import About from './pages/About'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import ProductPage from './pages/ProductPage'
import UseCasePage from './pages/UseCasePage'
import { CustomersIndex, CustomerStory } from './pages/Customers'
import { BlogIndex, BlogPost, BlogTag, ChangelogEntry, LivestreamEntry } from './pages/Blog'
import { Changelog, FaqPage, Legal, Simple } from './pages/Simple'
import NotFound from './pages/NotFound'
import CapturedPage, { CAPTURED_KEYS, pathOf } from './pages/CapturedPage'
import { SIMPLE, PRIVACY, TERMS } from './data/simple'
import { PRODUCTS } from './data/products'
import { SOLUTIONS } from './data/usecases'

export default function App() {
  const { pathname } = useLocation()
  // Re-arm the lazy-video observer whenever the route changes; each page mounts
  // its own <video> nodes.
  useVideoAutoplay(pathname)

  return (
    <div className="relative min-h-screen bg-bg">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* pages rebuilt by the scroll-then-capture pass — listed first so they take
              precedence over the older template routes for the same path */}
          {CAPTURED_KEYS.map((k) => (
            <Route key={k} path={pathOf(k)} element={<CapturedPage k={k} />} />
          ))}

          {/* product — a few carry their own path on the original (e.g. /ai-formula) */}
          {Object.entries(PRODUCTS).map(([slug, p]) => (
            <Route key={slug} path={p.path || `/${slug}`} element={<ProductPage slug={slug} />} />
          ))}

          {/* use cases */}
          <Route path="/use-cases/:slug" element={<UseCasePage kind="use-case" />} />

          {/* solutions — the original does NOT namespace these under /solutions */}
          {Object.entries(SOLUTIONS).map(([slug, s]) => (
            <Route key={slug} path={s.path} element={<UseCasePage kind="solution" slug={slug} />} />
          ))}

          {/* customers */}
          <Route path="/customers" element={<CustomersIndex />} />
          <Route path="/customers/:slug" element={<CustomerStory />} />

          {/* content */}
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/blog-tag/:tag" element={<BlogTag />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/changelog/:slug" element={<ChangelogEntry />} />
          <Route path="/livestreams/:slug" element={<LivestreamEntry />} />
          <Route path="/faq" element={<FaqPage />} />
          {/* the original 301s this legacy URL */}
          <Route path="/about-old" element={<Navigate to="/about" replace />} />

          {/* company */}
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />

          {/* legal */}
          <Route path="/privacy" element={<Legal title="Privacy policy" updated="September 1, 2026" clauses={PRIVACY} />} />
          <Route path="/terms-of-service" element={<Legal title="Terms of service" updated="September 1, 2026" clauses={TERMS} />} />

          {/* resources, partners, and the remaining marketing routes */}
          {Object.entries(SIMPLE).map(([path, props]) => (
            <Route key={path} path={path} element={<Simple {...props} />} />
          ))}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {/* some captured pages (press, contact, demo) have no footer; customer stories
          sit 80px lower — CapturedPage sets these on <html> */}
      <div style={{ marginTop: 'var(--footer-spacer, 0px)' }} aria-hidden="true" />
      <Footer />
    </div>
  )
}
