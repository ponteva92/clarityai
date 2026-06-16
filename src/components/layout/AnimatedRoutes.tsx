import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home } from '../../pages/Home';
import { Services } from '../../pages/Services';
import { About } from '../../pages/About';
import { Contact } from '../../pages/Contact';
import { Pilot } from '../../pages/Pilot';
import { Privacy, Terms, Cookies } from '../../pages/Legal';
import { NotFound } from '../../pages/NotFound';
import { PageTransition } from './PageTransition';

export function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/palvelut" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/tietoa-meista" element={<PageTransition><About /></PageTransition>} />
        <Route path="/yhteystiedot" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/pilotti" element={<PageTransition><Pilot /></PageTransition>} />
        <Route path="/tietosuoja" element={<PageTransition><Privacy /></PageTransition>} />
        <Route path="/kayttoehdot" element={<PageTransition><Terms /></PageTransition>} />
        <Route path="/evasteet" element={<PageTransition><Cookies /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}
