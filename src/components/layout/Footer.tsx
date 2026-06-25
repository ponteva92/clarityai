import { Link } from 'react-router-dom';
import { Linkedin, Mail, MapPin, ArrowUp } from 'lucide-react';
import { BrandMark } from '../ui/BrandMark';

export function Footer() {
  return (
    <footer className="relative bg-brand-bg border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Premium top accent glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/60 to-transparent" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2.5 group" aria-label="ClarityAI - etusivu">
              <BrandMark className="w-9 h-9" />
              <span className="font-display font-bold text-xl tracking-tight text-white">
                Clarity<span className="text-brand-cyan">AI</span>
              </span>
            </Link>
            <p className="text-brand-gray text-sm leading-relaxed max-w-xs">
              Verkkosivut ja liidiautomaatiot rakennus-, LVI- ja sähköalan pk-yrityksille. Yksikään liidi ei jää kylmäksi.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/in/heikki-niemimäki" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-gray hover:text-brand-purple hover:bg-white/10 transition-all duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Palvelut</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/palvelut" className="text-brand-gray hover:text-brand-cyan link-underline transition-colors text-sm">Verkkosivut</Link>
              </li>
              <li>
                <Link to="/palvelut" className="text-brand-gray hover:text-brand-cyan link-underline transition-colors text-sm">SoittoVahti</Link>
              </li>
              <li>
                <Link to="/palvelut" className="text-brand-gray hover:text-brand-cyan link-underline transition-colors text-sm">Chatbot</Link>
              </li>
              <li>
                <Link to="/palvelut" className="text-brand-gray hover:text-brand-cyan link-underline transition-colors text-sm">Speed-to-lead ja liidien hallinta</Link>
              </li>
              <li>
                <Link to="/palvelut" className="text-brand-gray hover:text-brand-cyan link-underline transition-colors text-sm">Liidien herätys</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Yritys</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/tietoa-meista" className="text-brand-gray hover:text-brand-purple transition-colors text-sm">Tietoa Minusta</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Yhteystiedot</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-brand-gray text-sm">
                <MapPin className="w-5 h-5 text-brand-cyan shrink-0" />
                <span>Oulun seutu +muu Suomi (Etänä)</span>
              </li>
              <li className="flex items-center gap-3 text-brand-gray text-sm">
                <Mail className="w-5 h-5 text-brand-purple shrink-0" />
                <a href="mailto:clarity.ai@outlook.com" className="hover:text-white transition-colors">clarity.ai@outlook.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-gray/75 text-xs">
            &copy; {new Date().getFullYear()} ClarityAI. Kaikki oikeudet pidätetään.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/tietosuoja" className="text-brand-gray/75 hover:text-white text-xs transition-colors">Tietosuojaseloste</Link>
            <Link to="/kayttoehdot" className="text-brand-gray/75 hover:text-white text-xs transition-colors">Käyttöehdot</Link>
            <Link to="/evasteet" className="text-brand-gray/75 hover:text-white text-xs transition-colors">Evästekäytännöt</Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Takaisin ylös"
              className="group ml-2 w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-brand-gray hover:text-brand-cyan hover:border-brand-cyan/40 hover:shadow-[0_0_18px_rgba(16,185,129,0.25)] transition-all duration-300"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
