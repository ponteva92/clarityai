import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { MagneticButton } from '../ui/MagneticButton';
import { BrandMark } from '../ui/BrandMark';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: 'Etusivu', path: '/' },
  { name: 'Palvelut', path: '/palvelut' },
  { name: 'Pilotti', path: '/pilotti' },
  { name: 'Tietoa Minusta', path: '/tietoa-meista' },
  { name: 'Yhteystiedot', path: '/yhteystiedot' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out',
        isScrolled
          ? 'py-3 glass border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
          : 'py-6 bg-transparent'
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="relative z-10 flex items-center gap-2.5 group" aria-label="ClarityAI — etusivu">
          <BrandMark className="w-9 h-9" />
          <span className="font-display font-bold text-xl tracking-tight">
            Clarity<span className="text-brand-cyan">AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-brand-cyan relative',
                location.pathname === link.path ? 'text-white' : 'text-brand-gray'
              )}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-brand-cyan rounded-full"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
          <MagneticButton
            data-cal-namespace="konsultaattio"
            data-cal-link="heikki-niemimaki-09cgi0/konsultaattio"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            className="ml-4 px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-cyan/15 to-brand-purple/15 hover:from-brand-cyan/25 hover:to-brand-purple/25 border border-brand-cyan/30 hover:shadow-[0_0_24px_rgba(0,245,255,0.25)] transition-all duration-300 text-sm font-medium flex items-center gap-2 group"
          >
            Varaa ilmainen konsultaatio
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden relative z-10 p-2 text-brand-gray hover:text-white transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 glass border-b border-white/10 py-6 px-6 flex flex-col gap-4 md:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-lg font-medium py-2 transition-colors',
                  location.pathname === link.path ? 'text-brand-cyan' : 'text-brand-gray hover:text-white'
                )}
              >
                {link.name}
              </Link>
            ))}
            <button
              data-cal-namespace="konsultaattio"
              data-cal-link="heikki-niemimaki-09cgi0/konsultaattio"
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              className="mt-4 px-6 py-3 w-full rounded-xl bg-gradient-to-r from-brand-cyan/20 to-brand-purple/20 border border-brand-cyan/30 text-center font-medium text-white flex items-center justify-center gap-2"
            >
              Varaa ilmainen konsultaatio
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
