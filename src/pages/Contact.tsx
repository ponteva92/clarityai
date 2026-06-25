import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle2, Info } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Reveal } from '../components/ui/Reveal';
import { Spotlight } from '../components/ui/Spotlight';
import { Select } from '../components/ui/Select';
import { Tooltip } from '../components/ui/Tooltip';
import { usePageMeta } from '../hooks/usePageMeta';
import { submitLead } from '../lib/forms';

export function Contact() {
  usePageMeta({
    title: 'Yhteystiedot: varaa ilmainen kartoitus',
    description: 'Varaa ilmainen 30 minuutin kartoitus tai lähetä viesti. Vastaan jokaiseen yhteydenottoon 24 tunnin sisällä. Oulu + koko Suomi etänä.',
  });

  const location = useLocation();
  const reduce = useReducedMotion();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    interest: 'verkkosivut',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

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
    setFallbackUrl(null);

    const result = await submitLead({
      formType: 'yhteydenotto',
      nimi: formState.name,
      sahkoposti: formState.email,
      yritys: formState.company || 'Ei ilmoitettu',
      kiinnostus: formState.interest,
      viesti: formState.message,
      lahde: 'clarityai.fi - yhteydenottolomake',
      aikaleima: new Date().toISOString(),
    });

    if (result.ok) {
      setIsSuccess(true);
      toast.success('Kiitos viestistäsi, vastaan 24 tunnin sisällä.');
      setTimeout(() => {
        setIsSuccess(false);
        setFormState({ name: '', email: '', company: '', message: '', interest: 'strategy' });
      }, 3000);
    } else {
      // Webhook unreachable — never drop the lead. Offer one-click email instead.
      setFallbackUrl(result.mailtoUrl);
      toast('Viimeistele lähetys sähköpostitse, avasin valmiin viestin.', { icon: '✉️' });
      window.location.href = result.mailtoUrl;
    }
    setIsSubmitting(false);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen relative overflow-hidden">
      <Spotlight />
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-cyan/10 blur-[150px] rounded-full pointer-events-none animate-aurora" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none animate-aurora" style={{ animationDelay: '-8s' }} />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="mb-24 flex justify-center">
          <SectionHeading
            as="h1"
            eyebrow="Yhteystiedot"
            title={<>Aloitetaan <span className="text-gradient">yhteistyö</span></>}
            subtitle="Olitpa vasta miettimässä mistä aloittaa tai valmis ottamaan liidit kiinni, vastaan jokaiseen viestiin 24 tunnin sisällä. Ilmainen kartoitus, ei myyntipuhetta."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Contact Info */}
          <Reveal direction="left" className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="text-3xl font-display font-bold mb-8 text-white">Ota yhteyttä</h2>
              <p className="text-brand-gray leading-relaxed mb-10">
                Soita, laita sähköpostia tai täytä lomake, kumpi tahansa käy. Vastaan kaikkiin
                tiedusteluihin 24 tunnin kuluessa, tai varaa suoraan ilmainen 30 minuutin kartoitus
                kalenteristani. Ensimmäinen keskustelu on aina maksuton ja sitoumukseton.
              </p>
              
              <motion.div
                className="space-y-8"
                initial={reduce ? false : 'hidden'}
                whileInView={reduce ? undefined : 'visible'}
                viewport={{ once: true, margin: '-80px' }}
                variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
              >
                {[
                  {
                    icon: MapPin,
                    title: 'Sijainti',
                    hint: 'Toimin Oulun seudulla, mutta palvelen koko Suomea etänä, joten sijainti ei ole este.',
                    value: <p className="text-brand-gray">Oulun seutu +muu Suomi (Etänä)</p>,
                  },
                  {
                    icon: Mail,
                    title: 'Sähköposti',
                    hint: 'Luen sähköpostit päivittäin ja vastaan jokaiseen viestiin 24 tunnin sisällä.',
                    value: (
                      <a href="mailto:clarity.ai@outlook.com" className="text-brand-gray hover:text-white transition-colors">
                        clarity.ai@outlook.com
                      </a>
                    ),
                  },
                  {
                    icon: Phone,
                    title: 'Puhelin',
                    hint: 'Soita tai laita viestiä. Jos en ehdi vastata heti, soitan takaisin samana päivänä.',
                    value: (
                      <a href="tel:+358465901602" className="text-brand-gray hover:text-white transition-colors">
                        +358 46 5901602
                      </a>
                    ),
                  },
                ].map((row) => (
                  <motion.div
                    key={row.title}
                    variants={{
                      hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
                      visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                    }}
                    className="group relative flex items-start gap-6 pr-9"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-cyan/10 group-hover:border-brand-cyan/30 transition-colors">
                      <row.icon className="w-6 h-6 text-brand-cyan" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{row.title}</h3>
                      {row.value}
                    </div>
                    <div className="absolute top-0 right-0">
                      <Tooltip content={row.hint} side="left">
                        <span className="grid place-items-center w-7 h-7 rounded-full border border-white/10 text-brand-gray/70 hover:text-brand-cyan hover:border-brand-cyan/40 transition-colors">
                          <Info className="w-3.5 h-3.5" />
                        </span>
                      </Tooltip>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Abstract Oulu Map Graphic */}
            <div className="relative w-full aspect-square max-w-[400px] mx-auto opacity-60 hover:opacity-100 transition-opacity duration-700 mt-12">
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          </Reveal>

          {/* Contact Form */}
          <Reveal direction="right" className="lg:col-span-7">
            <div id="laheta-viesti" className="glass-card border-beam p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden scroll-mt-32">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-amber opacity-50" />
              
              <h2 className="text-3xl font-display font-bold mb-8 text-white">Lähetä viesti</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
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
                  <Select
                    ariaLabel="Mistä olet kiinnostunut?"
                    value={formState.interest}
                    onValueChange={(v) => setFormState({ ...formState, interest: v })}
                    options={[
                      { value: 'verkkosivut', label: 'Verkkosivut' },
                      { value: 'soittovahti', label: 'SoittoVahti (vastaamaton puhelu tekstiviestiksi)' },
                      { value: 'chatbot', label: 'Chatbot verkkosivulle' },
                      { value: 'speed-to-lead', label: 'Speed-to-lead ja liidien hallinta' },
                      { value: 'heratys', label: 'Liidien herätys-automaatio' },
                      { value: 'other', label: 'Muu tai en ole varma' },
                    ]}
                  />
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
                      : 'bg-gradient-to-r from-brand-cyan to-brand-purple text-white hover:opacity-90 shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : isSuccess ? (
                    <>Viesti lähetetty <CheckCircle2 className="w-5 h-5" /></>
                  ) : (
                    <>Lähetä viesti <Send className="w-5 h-5" /></>
                  )}
                </button>
                
                {fallbackUrl && (
                  <div className="mt-4 p-4 rounded-xl bg-brand-amber/10 border border-brand-amber/30 text-center">
                    <p className="text-sm text-white mb-3">
                      Automaattinen lähetys ei juuri nyt onnistunut. Klikkaa alta, niin avaan valmiiksi täytetyn sähköpostin, jolla viestisi tavoittaa minut varmasti.
                    </p>
                    <a
                      href={fallbackUrl}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-amber text-black font-bold text-sm hover:bg-brand-amber/90 transition-colors"
                    >
                      Lähetä sähköpostilla <Send className="w-4 h-4" />
                    </a>
                  </div>
                )}

                <p className="text-xs text-brand-gray/75 text-center mt-4">
                  Lähettämällä lomakkeen hyväksyt <Link to="/tietosuoja" className="underline hover:text-white">tietosuojaselosteeni</Link>.
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
