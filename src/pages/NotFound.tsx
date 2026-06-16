import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Aurora } from '../components/ui/Aurora';
import { usePageMeta } from '../hooks/usePageMeta';

export function NotFound() {
  usePageMeta({ title: 'Sivua ei löytynyt (404)' });

  return (
    <div className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden">
      <Aurora />
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="text-center relative z-10 px-6">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[9rem] md:text-[14rem] leading-none font-display font-bold text-gradient-animated mb-2 select-none"
        >
          404
        </motion.h1>
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="font-mono text-brand-cyan text-sm tracking-[0.3em] uppercase mb-8"
        >
          // route_not_found
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-display font-bold text-white mb-6"
        >
          Sivua ei löytynyt
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-brand-gray text-lg mb-10 max-w-md mx-auto"
        >
          Etsimääsi sivua ei ole olemassa tai se on siirretty. Tekoälymme ei löytänyt tätä reittiä.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-cyan/40 hover:shadow-[0_0_24px_rgba(0,245,255,0.2)] transition-all duration-300 font-medium text-white group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Palaa Etusivulle
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
