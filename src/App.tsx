import { BrowserRouter as Router } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { AnimatedRoutes } from './components/layout/AnimatedRoutes';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <ScrollToTop />
        <ScrollProgress />
        {/* Deep ambient mesh-gradient + film-grain texture for tactile depth.
            The wrapper below is intentionally transparent (body paints brand-bg)
            so these fixed layers remain visible behind the content. */}
        <div className="mesh-bg" aria-hidden />
        <div className="grain-overlay" aria-hidden />
        <div className="vignette-overlay" aria-hidden />
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: '#1A1A1A',
            color: '#F5F5F5',
            border: '1px solid rgba(255,255,255,0.1)',
          }
        }} />
        <div className="flex flex-col min-h-screen text-brand-white">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-brand-cyan focus:px-4 focus:py-2 focus:font-semibold focus:text-brand-bg"
          >
            Siirry sisältöön
          </a>
          <Navbar />
          <main id="main-content" className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </MotionConfig>
  );
}
