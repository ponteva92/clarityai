import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { CustomCursor } from './components/layout/CustomCursor';
import { AnimatedRoutes } from './components/layout/AnimatedRoutes';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <CustomCursor />
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: '#1A1A1A',
          color: '#F5F5F5',
          border: '1px solid rgba(255,255,255,0.1)',
        }
      }} />
      <div className="flex flex-col min-h-screen bg-brand-bg text-brand-white">
        <Navbar />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}
