import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, ArrowRight, Calendar, MessageSquare, Video, CheckCircle2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Contact() {
  const location = useLocation();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    interest: 'strategy',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (location.hash === '#laheta-viesti') {
      setTimeout(() => {
        document.getElementById('laheta-viesti')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formsubmit.co/ajax/heikki.niemimaki@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Nimi: formState.name,
          Sähköposti: formState.email,
          Yritys: formState.company || 'Ei ilmoitettu',
          Kiinnostus: formState.interest,
          Viesti: formState.message,
          _subject: 'Uusi yhteydenotto verkkosivuilta!'
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSuccess(false);
          setFormState({ name: '', email: '', company: '', message: '', interest: 'strategy' });
        }, 3000);
      } else {
        alert('Viestin lähetys epäonnistui. Yritä myöhemmin uudelleen.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Viestin lähetys epäonnistui. Yritä myöhemmin uudelleen.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-cyan/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold mb-8"
          >
            Aloitetaan <span className="text-gradient">Yhteistyö</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-brand-gray leading-relaxed"
          >
            Olitpa vasta miettimässä tekoälyn mahdollisuuksia tai etsimässä toteuttajaa 
            monimutkaiselle koneoppimismallille, olen valmiina auttamaan.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="text-3xl font-display font-bold mb-8 text-white">Ota Yhteyttä</h2>
              <p className="text-brand-gray leading-relaxed mb-10">
                Vastaan kaikkiin tiedusteluihin 24 tunnin kuluessa. 
                Voit myös varata suoraan ajan kalenteristani.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-cyan/10 group-hover:border-brand-cyan/30 transition-colors">
                    <MapPin className="w-6 h-6 text-brand-cyan" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Sijainti</h3>
                    <p className="text-brand-gray">Oulun seutu +muu Suomi (Etänä)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-purple/10 group-hover:border-brand-purple/30 transition-colors">
                    <Mail className="w-6 h-6 text-brand-purple" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Sähköposti</h3>
                    <a href="mailto:clarity.ai@outlook.com" className="text-brand-gray hover:text-white transition-colors">clarity.ai@outlook.com</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-amber/10 group-hover:border-brand-amber/30 transition-colors">
                    <Phone className="w-6 h-6 text-brand-amber" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Puhelin</h3>
                    <a href="tel:+358465901602" className="text-brand-gray hover:text-white transition-colors">+358 46 5901602</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Abstract Oulu Map Graphic */}
            <div className="relative w-full aspect-square max-w-[400px] mx-auto opacity-60 hover:opacity-100 transition-opacity duration-700 mt-12">
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,245,255,0.3)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Stylized Oulu Region Outline */}
                <path 
                  d="M20,90 C25,70 20,50 35,35 C50,20 80,15 110,20 C140,25 170,40 180,70 C190,100 175,140 140,160 C105,180 60,175 40,150 C20,125 15,110 20,90 Z" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  className="text-brand-cyan"
                  strokeDasharray="4 4"
                />
                {/* Coastline highlight (West side) */}
                <path 
                  d="M20,90 C25,70 20,50 35,35" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  className="text-brand-cyan"
                />
                {/* Inner topographic lines */}
                <path d="M40,90 C45,75 40,60 50,50 C60,40 80,35 100,40" stroke="currentColor" strokeWidth="0.5" className="text-brand-cyan/50" />
                <path d="M60,90 C65,80 60,70 70,60" stroke="currentColor" strokeWidth="0.5" className="text-brand-cyan/30" />
                
                {/* City Center (Oulu) */}
                <circle cx="35" cy="75" r="3" className="fill-brand-cyan" />
                <circle cx="35" cy="75" r="12" className="stroke-brand-cyan" strokeWidth="1" fill="none">
                  <animate attributeName="r" values="3;25" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0" dur="3s" repeatCount="indefinite" />
                </circle>
                <text x="45" y="78" className="fill-brand-cyan text-[10px] font-mono tracking-widest font-bold">OULU</text>
                
                {/* Connection lines to tech nodes (representing network/AI) */}
                <circle cx="120" cy="50" r="1.5" className="fill-brand-purple" />
                <path d="M35,75 L120,50" stroke="currentColor" strokeWidth="0.5" className="text-brand-purple/40" strokeDasharray="2 2" />
                
                <circle cx="140" cy="110" r="1.5" className="fill-brand-purple" />
                <path d="M35,75 L140,110" stroke="currentColor" strokeWidth="0.5" className="text-brand-purple/40" strokeDasharray="2 2" />
                
                <circle cx="80" cy="140" r="1.5" className="fill-brand-purple" />
                <path d="M35,75 L80,140" stroke="currentColor" strokeWidth="0.5" className="text-brand-purple/40" strokeDasharray="2 2" />
              </svg>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div id="laheta-viesti" className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/10 relative overflow-hidden scroll-mt-32">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-amber opacity-50" />
              
              <h2 className="text-3xl font-display font-bold mb-8 text-white">Lähetä Viesti</h2>
              
              <form action="https://formsubmit.co/heikki.niemimaki@gmail.com" method="POST" className="space-y-6">
                <input type="hidden" name="_next" value={window.location.href} />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="Uusi yhteydenotto verkkosivuilta!" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-brand-gray">Nimi</label>
                    <input
                      type="text"
                      id="name"
                      name="Nimi"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 focus:border-transparent transition-all"
                      placeholder="Matti Meikäläinen"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-brand-gray">Sähköposti</label>
                    <input
                      type="email"
                      id="email"
                      name="Sähköposti"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 focus:border-transparent transition-all"
                      placeholder="matti@yritys.fi"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-brand-gray">Yritys</label>
                  <input
                    type="text"
                    id="company"
                    name="Yritys"
                    value={formState.company}
                    onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 focus:border-transparent transition-all"
                    placeholder="Yritys Oy"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="interest" className="text-sm font-medium text-brand-gray">Mistä olet kiinnostunut?</label>
                  <div className="relative">
                    <select
                      id="interest"
                      name="Kiinnostus"
                      value={formState.interest}
                      onChange={(e) => setFormState({ ...formState, interest: e.target.value })}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 focus:border-transparent transition-all cursor-pointer"
                    >
                      <option value="strategy">AI-Strategia & Konsultointi</option>
                      <option value="chatbots">Räätälöidyt Chatbotit</option>
                      <option value="courses">Alkeiskurssit</option>
                      <option value="automation">Älykäs Prosessiautomaatio</option>
                      <option value="dev">AI-Sovelluskehitys</option>
                      <option value="other">Muu</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-brand-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-brand-gray">Viesti</label>
                  <textarea
                    id="message"
                    name="Viesti"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 focus:border-transparent transition-all resize-none"
                    placeholder="Kerro lyhyesti haasteestasi tai tarpeestasi..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                    isSuccess 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gradient-to-r from-brand-cyan to-brand-purple text-white hover:opacity-90 shadow-[0_0_30px_rgba(0,245,255,0.2)] hover:shadow-[0_0_40px_rgba(0,245,255,0.4)]'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : isSuccess ? (
                    <>Viesti Lähetetty <CheckCircle2 className="w-5 h-5" /></>
                  ) : (
                    <>Lähetä Viesti <Send className="w-5 h-5" /></>
                  )}
                </button>
                
                <p className="text-xs text-brand-gray/60 text-center mt-4">
                  Lähettämällä lomakkeen hyväksyt <Link to="/tietosuoja" className="underline hover:text-white">tietosuojaselosteeni</Link>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
