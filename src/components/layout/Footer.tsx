import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-brand-bg border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-cyan to-brand-purple flex items-center justify-center">
                <div className="w-3 h-3 bg-brand-bg rounded-sm group-hover:scale-50 transition-transform duration-300" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                Clarity<span className="text-brand-cyan">AI</span>
              </span>
            </Link>
            <p className="text-brand-gray text-sm leading-relaxed max-w-xs">
              Tekoälyratkaisuja, jotka mullistavat liiketoimintasi. Suomalaista huippuosaamista, globaalia vaikuttavuutta.
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
                <Link to="/palvelut" className="text-brand-gray hover:text-brand-cyan transition-colors text-sm">AI-Strategia & Konsultointi</Link>
              </li>
              <li>
                <Link to="/palvelut" className="text-brand-gray hover:text-brand-cyan transition-colors text-sm">Räätälöidyt Chatbotit</Link>
              </li>
              <li>
                <Link to="/palvelut" className="text-brand-gray hover:text-brand-cyan transition-colors text-sm">Alkeiskurssit</Link>
              </li>
              <li>
                <Link to="/palvelut" className="text-brand-gray hover:text-brand-cyan transition-colors text-sm">Älykäs Prosessiautomaatio</Link>
              </li>
              <li>
                <Link to="/palvelut" className="text-brand-gray hover:text-brand-cyan transition-colors text-sm">AI-Sovelluskehitys</Link>
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
          <p className="text-brand-gray/60 text-xs">
            &copy; {new Date().getFullYear()} ClarityAI. Kaikki oikeudet pidätetään.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/tietosuoja" className="text-brand-gray/60 hover:text-white text-xs transition-colors">Tietosuojaseloste</Link>
            <Link to="/kayttoehdot" className="text-brand-gray/60 hover:text-white text-xs transition-colors">Käyttöehdot</Link>
            <Link to="/evasteet" className="text-brand-gray/60 hover:text-white text-xs transition-colors">Evästekäytännöt</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
