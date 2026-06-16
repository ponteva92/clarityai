import { BrowserRouter as Router } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { CustomCursor } from './components/layout/CustomCursor';
import { AnimatedRoutes } from './components/layout/AnimatedRoutes';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <ScrollToTop />
        <ScrollProgress />
        <CustomCursor />
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
          <Navbar />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </MotionConfig>
  );
}
