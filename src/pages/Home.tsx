import { Suspense, lazy, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
const Background3D = lazy(() =>
  import('../components/3d/Background3D').then((m) => ({ default: m.Background3D }))
);
import { ArrowRight, BrainCircuit, BarChart3, MessageSquare, Zap, ShieldCheck, Globe, Users, CheckCircle2, Loader2, Search, Terminal, Workflow, LineChart, Sparkles, HardHat, Wrench, Building2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Aurora } from '../components/ui/Aurora';
import { Marquee } from '../components/ui/Marquee';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Reveal } from '../components/ui/Reveal';
import { MagneticButton } from '../components/ui/MagneticButton';
import { StickyScroll, type StickyItem } from '../components/ui/StickyScroll';
import { GlowGrid, GlowCard } from '../components/ui/GlowCard';
import { ScrollRevealText } from '../components/ui/ScrollRevealText';
import { Parallax } from '../components/ui/Parallax';
import { KineticText } from '../components/ui/KineticText';
import { TiltCard } from '../components/ui/TiltCard';
import { HeroLogo } from '../components/ui/HeroLogo';
import { usePageMeta } from '../hooks/usePageMeta';
import { calBookingProps } from '../lib/cal';

// --- Reusable "techy" window chrome for the sticky-scroll visuals ---
function MockWindow({ label, accent, children }: { label: string; accent: string; children: React.ReactNode }) {
  return (
    <div className="glass-card rounded-3xl border border-white/10 overflow-hidden h-full shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-white/[0.02]">
        <span className="w-3 h-3 rounded-full bg-red-400/70" />
        <span className="w-3 h-3 rounded-full bg-amber-400/70" />
        <span className="w-3 h-3 rounded-full bg-emerald-400/70" />
        <span className={`ml-3 text-xs font-mono ${accent}`}>{label}</span>
      </div>
      <div className="p-6 md:p-8 h-[calc(100%-49px)]">{children}</div>
    </div>
  );
}

const processSteps: StickyItem[] = [
  {
    title: 'Kartoitus & Strategia',
    description: 'Analysoin nykytilanteen ja tunnistan suurinta arvoa tuottavat tekoälykohteet. Luon selkeän tiekartan ilman teknistä jargonia.',
    icon: <Search className="w-5 h-5" />,
    visual: (
      <MockWindow label="scan_opportunities.ai" accent="text-brand-cyan">
        <div className="space-y-3 font-mono text-sm">
          <div className="text-brand-gray">{'>'} Skannataan prosesseja…</div>
          {['Tarjouspyyntöjen käsittely', 'Asiakaspalvelun rutiinit', 'Raportointi & datansiirto', 'Laskutus ja kuittaukset'].map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.2, repeat: Infinity, repeatType: 'reverse', repeatDelay: 3, duration: 0.4 }}
              className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
            >
              <span className="text-white/90">{t}</span>
              <span className="text-brand-cyan text-xs">+{40 + i * 15}% potentiaali</span>
            </motion.div>
          ))}
        </div>
      </MockWindow>
    ),
  },
  {
    title: 'Proof of Concept',
    description: 'Rakennan nopean prototyypin varmistaakseni teknisen toteutettavuuden ja liiketoiminta-arvon ennen suuria investointeja.',
    icon: <Terminal className="w-5 h-5" />,
    visual: (
      <MockWindow label="prototype.ts" accent="text-brand-purple">
        <div className="space-y-2 font-mono text-sm leading-relaxed">
          <div><span className="text-brand-purple">const</span> <span className="text-white">agent</span> = <span className="text-brand-cyan">createAgent</span>({'{'}</div>
          <div className="pl-5 text-white/80">role: <span className="text-brand-amber">"asiakaspalvelu"</span>,</div>
          <div className="pl-5 text-white/80">tools: [<span className="text-brand-amber">"crm"</span>, <span className="text-brand-amber">"kalenteri"</span>],</div>
          <div className="pl-5 text-white/80">kieli: <span className="text-brand-amber">"fi"</span></div>
          <div>{'}'});</div>
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="mt-4 flex items-center gap-2 text-emerald-400"
          >
            <CheckCircle2 className="w-4 h-4" /> Prototyyppi pystyssä 48 h
          </motion.div>
        </div>
      </MockWindow>
    ),
  },
  {
    title: 'Kehitys & Integraatio',
    description: 'Toteutan tuotantovalmiin ratkaisun ja integroin sen saumattomasti olemassa oleviin järjestelmiisi — ilman ihmisen kosketusta.',
    icon: <Workflow className="w-5 h-5" />,
    visual: (
      <MockWindow label="integrations.flow" accent="text-emerald-400">
        <div className="h-full flex flex-col items-center justify-center gap-6">
          <div className="flex items-center gap-4">
            {['CRM', 'AI', 'Kalenteri'].map((n, i) => (
              <div key={n} className="flex items-center gap-4">
                <motion.div
                  animate={{ boxShadow: ['0 0 0px rgba(0,245,255,0)', '0 0 24px rgba(0,245,255,0.5)', '0 0 0px rgba(0,245,255,0)'] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  className="w-20 h-20 rounded-2xl glass border border-brand-cyan/30 flex items-center justify-center text-sm font-mono text-white"
                >
                  {n}
                </motion.div>
                {i < 2 && (
                  <motion.div
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
                    className="w-8 h-px bg-gradient-to-r from-brand-cyan to-brand-purple"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-brand-gray font-mono text-xs">data → automaattisesti → oikeaan paikkaan</div>
        </div>
      </MockWindow>
    ),
  },
  {
    title: 'Koulutus & Skaalaus',
    description: 'Koulutan tiimisi käyttämään uusia työkaluja ja autan skaalaamaan ratkaisun koko organisaatioon mitattavin tuloksin.',
    icon: <LineChart className="w-5 h-5" />,
    visual: (
      <MockWindow label="growth.metrics" accent="text-brand-amber">
        <div className="h-full flex flex-col justify-end gap-4">
          <div className="flex items-end justify-between gap-3 h-40">
            {[30, 45, 40, 62, 78, 95].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 rounded-t-lg bg-gradient-to-t from-brand-cyan/30 to-brand-purple"
              />
            ))}
          </div>
          <div className="flex items-center justify-between text-xs font-mono text-brand-gray border-t border-white/10 pt-3">
            <span>tuottavuus</span>
            <span className="text-emerald-400">↑ jatkuva kasvu</span>
          </div>
        </div>
      </MockWindow>
    ),
  },
];

export function Home() {
  usePageMeta({
    title: 'Tekoälyratkaisut & AI-automaatio pk-yrityksille',
    description: 'Tekoälyautomaatiot, älykkäät chatbotit ja konvertoivat verkkosivut suomalaisille pk-yrityksille. Säästä kymmeniä tunteja viikossa ja kasvata myyntiä. Toteutus jopa 3 päivässä.',
  });

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const [promptInputText, setPromptInputText] = useState('');
  const [promptIsAnalyzing, setPromptIsAnalyzing] = useState(false);
  const [promptResults, setPromptResults] = useState<any>(null);

  const [roiInputText, setRoiInputText] = useState('Verkkosivu');
  const [roiIsAnalyzing, setRoiIsAnalyzing] = useState(false);
  const [roiResults, setRoiResults] = useState<any>(null);

  const handlePromptAnalyze = () => {
    if (!promptInputText.trim()) return;
    setPromptIsAnalyzing(true);
    setPromptResults(null);

    setTimeout(() => {
      const length = promptInputText.length;
      setPromptResults({
        score: length > 40 ? 85 : 45,
        improvements: length > 40
          ? ['Määrittele tarkempi kohdeyleisö', 'Lisää toivottu äänensävy (tone of voice)']
          : ['Prompti on liian lyhyt', 'Lisää kontekstia ja taustatietoa', 'Määrittele haluttu lopputuloksen formaatti'],
        strengths: length > 40
          ? ['Selkeä perusajatus', 'Hyvä kieli']
          : ['Ytimekäs'],
        suggestion: length > 40
          ? `Toimi asiantuntevana copywriterina. ${promptInputText}. Kohdeyleisönä on [määrittele], ja äänensävyn tulee olla ammattimainen mutta innostava.`
          : `Toimi roolissa [X] ja tee [Y]. Konteksti on [Z]. Haluan lopputuloksen muodossa [W].`
      });
      setPromptIsAnalyzing(false);
    }, 1500);
  };

  const handleRoiAnalyze = () => {
    if (!roiInputText.trim()) return;
    setRoiIsAnalyzing(true);
    setRoiResults(null);

    setTimeout(() => {
      const services: Record<string, any> = {
        'Verkkosivu': { price: '299 - 999 € + 20 - 99 € / kk', roi: '150 - 250 %', reason: 'Moderni, nopea ja konvertoiva verkkosivu tuo uusia liidejä ja asiakkaita kellon ympäri, maksaen itsensä nopeasti takaisin.' },
        'Chatbot': { price: '199 - 499 € + 20 - 60 € / kk', roi: '200 - 400 %', reason: 'Vähentää asiakaspalvelun rutiinikysymyksiä jopa 50 % ja palvelee asiakkaita välittömästi 24/7, parantaen asiakaskokemusta.' },
        'Tekoälyautomaatio': { price: '199 - 999 € + 19 - 59 € / kk', roi: '300 - 600 %', reason: 'Säästää asiantuntijoiden aikaa kymmeniä tunteja kuukaudessa automatisoimalla manuaaliset rutiinit ja datan käsittelyn.' },
        'PWA sovellus': { price: '499 - 1999 € + 49 - 149 € / kk', roi: '150 - 300 %', reason: 'Sitouttaa asiakkaita paremmin, mahdollistaa push-ilmoitukset ja tarjoaa natiivisovelluksen kaltaisen kokemuksen ilman sovelluskauppojen kuluja.' }
      };

      const selected = services[roiInputText] || services['Verkkosivu'];

      setRoiResults({
        service: roiInputText || 'Verkkosivu',
        price: selected.price,
        roi: selected.roi,
        reason: selected.reason
      });
      setRoiIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 pb-32 px-6 md:px-12">
        <Aurora />
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <Suspense fallback={null}>
          <Background3D />
        </Suspense>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-6 items-center">
            {/* LEFT — copy */}
            <motion.div
              style={{ y, opacity }}
              className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-brand-cyan/20 text-brand-cyan text-sm font-medium mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                Tekoälyratkaisut suomalaisille pk-yrityksille
              </motion.div>

              <h1 className="text-5xl md:text-7xl lg:text-[3.7rem] xl:text-[4.6rem] font-display font-bold tracking-[-0.045em] leading-[0.98] mb-8">
                {['Tekoäly, Joka', 'Mullistaa', 'Liiketoimintasi'].map((line, i) => (
                  <span key={line} className="mask-reveal">
                    <motion.span
                      className="block pb-[0.12em]"
                      initial={{ y: '115%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1, delay: 0.15 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {i === 1 ? <span className="text-gradient-animated">{line}</span> : line}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg md:text-xl text-brand-gray max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed"
              >
                Rakennan pk-yrityksille tekoälyautomaatiot, älykkäät chatbotit ja konvertoivat
                verkkosivut, jotka säästävät kymmeniä tunteja viikossa — ja muuttavat hukatun ajan
                myynniksi. Ei konsulttijargonia. Vain toimivia koneistoja, jotka tuottavat
                <span className="text-white font-medium"> mitattavaa tulosta.</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5"
              >
                <MagneticButton
                  onClick={() => {
                    document.getElementById('ai-showcase')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="relative group px-8 py-4 rounded-2xl bg-white text-brand-bg font-semibold text-lg overflow-hidden w-full sm:w-auto text-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors duration-500">
                    Kokeile AI-Analyysiä Ilmaiseksi
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </MagneticButton>

                <Link
                  to="/yhteystiedot#laheta-viesti"
                  className="px-8 py-4 rounded-2xl glass hover:bg-white/10 border border-white/10 transition-all duration-300 font-semibold text-lg w-full sm:w-auto text-center flex items-center justify-center gap-2"
                >
                  Ota yhteyttä
                </Link>
              </motion.div>
            </motion.div>

            {/* RIGHT — interactive logo */}
            <div className="relative flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:block absolute top-[6%] right-[2%] z-20 pointer-events-none"
              >
                <Parallax offset={60}>
                  <div className="glass-card shadow-pop rounded-2xl px-5 py-4 animate-float-slow">
                    <div className="text-3xl font-display font-bold text-gradient">+300%</div>
                    <div className="text-xs text-brand-gray mt-1">enemmän liidejä</div>
                  </div>
                </Parallax>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:block absolute bottom-[6%] left-[0%] z-20 pointer-events-none"
              >
                <Parallax offset={-70}>
                  <div className="glass-card shadow-pop rounded-2xl px-5 py-4 animate-float-slow" style={{ animationDelay: '-3s' }}>
                    <div className="flex items-center gap-2 text-brand-cyan text-sm font-mono">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      AI aktiivinen 24/7
                    </div>
                    <div className="text-xs text-brand-gray mt-1">automaatio käynnissä</div>
                  </div>
                </Parallax>
              </motion.div>

              <HeroLogo />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-brand-gray uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-brand-gray/50 to-transparent" />
        </motion.div>
      </section>

      {/* Trust / capability marquee */}
      <section className="relative z-10 py-10 border-y border-white/5 bg-brand-bg/60">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-brand-gray/60 mb-6">Teknologiat & osaaminen</p>
        <Marquee
          duration={40}
          items={['React', 'OpenAI', 'Python', 'Automaatio', 'RPA', 'GDPR-yhteensopiva', 'Node.js', 'Chatbotit', 'Integraatiot', 'Pilvi (AWS · GCP · Azure)', 'Datatiede', 'PWA'].map((t) => (
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-white/10 text-brand-gray text-sm font-mono">
              <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
              {t}
            </span>
          ))}
        />
      </section>

      {/* Stats band */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6 md:px-12">
          <GlowGrid className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: 3, suffix: ' pv', label: 'Toteutus jopa kolmessa päivässä' },
              { value: 24, suffix: '/7', label: 'Tekoäly palvelee tauotta' },
              { value: 600, suffix: ' %', label: 'ROI parhaimmillaan' },
              { value: 10, suffix: '+ h', label: 'Säästöä viikossa rutiineista' },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.08} className="h-full">
                <TiltCard className="h-full" max={11} lift={8}>
                  <GlowCard className="rounded-3xl p-8 text-center h-full">
                    <div className="text-4xl md:text-5xl font-display font-bold text-gradient mb-3 tilt-layer">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-brand-gray text-sm leading-relaxed">{stat.label}</div>
                  </GlowCard>
                </TiltCard>
              </Reveal>
            ))}
          </GlowGrid>
        </div>
      </section>

      {/* Cinematic statement band */}
      <section className="relative z-10 py-28 md:py-40">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <span className="block text-xs font-mono uppercase tracking-[0.3em] text-brand-cyan mb-8">Manifesti</span>
          <ScrollRevealText
            text="Tekoäly ei vie töitäsi. Mutta kilpailijasi, joka automatisoi rutiininsa, vie asiakkaasi. Minä rakennan koneiston, joka tekee työn puolestasi — hiljaa, taukoamatta ja virheettä."
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-[-0.03em] leading-[1.08]"
          />
        </div>
      </section>

      {/* Kinetic oversized statement band — signature kinetic typography */}
      <section className="relative z-10 py-10 md:py-14 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent" />
        <KineticText text="AUTOMAATIO · TEKOÄLY · TULOSTA · " />
      </section>

      {/* Sticky-scroll process */}
      <section className="relative z-10">
        <div className="container mx-auto px-6 md:px-12 pt-12 pb-0">
          <SectionHeading
            eyebrow="Näin se toimii"
            title={<>Strategiasta tuotantoon — <span className="text-gradient">selkeästi</span></>}
            subtitle="Läpinäkyvä, ketterä prosessi joka tuottaa tuloksia nopeasti ja riskittömästi. Vieritä alas."
          />
        </div>
        <StickyScroll items={processSteps} />
      </section>

      {/* Interactive AI Showcase */}
      <section id="ai-showcase" className="pt-4 pb-32 relative z-10 bg-brand-bg">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-16">
            <SectionHeading
              eyebrow="Live-demo"
              title={<>Koe Tekoälyn Voima <span className="text-gradient">Juuri Nyt</span></>}
              subtitle="Testaa interaktiivisia demojamme ja näe, miten tekoäly voi ratkaista yrityksesi haasteita reaaliajassa."
            />
          </div>

          <div className="glass-card rounded-3xl p-2 md:p-8 border border-white/10 relative">
            {/* Pulse glow divider */}
            <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-white/10 to-transparent z-10 pointer-events-none">
              {/* Moving laser line */}
              <motion.div
                animate={{
                  top: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 4,
                  ease: "linear",
                  repeat: Infinity
                }}
                className="absolute left-1/2 -translate-x-1/2 w-[2px] h-16 bg-gradient-to-b from-transparent via-brand-cyan to-transparent"
              />
              {/* Center glowing orb */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="absolute inset-0 bg-brand-cyan rounded-full blur-[20px] opacity-60 animate-pulse" style={{ width: '70px', height: '70px', left: '-35px', top: '-35px' }}></div>
                <div className="absolute inset-0 bg-brand-purple rounded-full blur-[10px] opacity-60 animate-pulse" style={{ width: '40px', height: '40px', left: '-20px', top: '-20px', animationDelay: '0.5s' }}></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_#fff,0_0_20px_#0ff]"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative z-20">
              {/* Prompt Analyzer */}
              <div className="bg-black/40 rounded-2xl border border-white/5 p-6 md:p-8 relative overflow-hidden flex flex-col min-h-[350px]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-cyan to-brand-purple opacity-50" />

                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-brand-cyan" />
                    <h3 className="font-semibold text-white">Prompt Analyzer</h3>
                  </div>
                  <div className="text-xs font-mono text-brand-gray bg-white/5 px-3 py-1 rounded-full">
                    prompt_analyzer.ts
                  </div>
                </div>

                <div className="space-y-6 font-mono text-sm flex-1">
                  <div className="flex gap-3 items-center bg-black/50 p-2 rounded-xl border border-white/10 focus-within:border-brand-cyan/50 focus-within:bg-black/80 transition-all shadow-inner">
                    <span className="text-brand-cyan shrink-0 pl-2 font-bold">&gt;</span>
                    <input
                      type="text"
                      value={promptInputText}
                      onChange={(e) => setPromptInputText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handlePromptAnalyze()}
                      placeholder="Syötä prompti (esim. 'Kirjoita blogipostaus')..."
                      className="bg-transparent border-none outline-none text-white w-full placeholder:text-brand-gray/50 focus:ring-0"
                    />
                    <button
                      onClick={handlePromptAnalyze}
                      disabled={promptIsAnalyzing || !promptInputText.trim()}
                      className="px-5 py-2 bg-brand-cyan text-black rounded-lg hover:bg-brand-cyan/90 hover:shadow-[0_0_15px_rgba(0,245,255,0.4)] disabled:opacity-50 disabled:hover:shadow-none transition-all font-sans font-bold text-xs uppercase tracking-wider shrink-0"
                    >
                      Aja
                    </button>
                  </div>

                  {promptInputText && (promptResults || promptIsAnalyzing) && (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-white break-words">
                      "{promptInputText}"
                    </div>
                  )}

                  {(promptIsAnalyzing || promptResults) && (
                    <div className="flex gap-4">
                      <span className="text-brand-purple shrink-0">AI</span>
                      <div className="space-y-4 w-full">
                        {promptIsAnalyzing ? (
                          <div className="flex items-center gap-3 text-brand-gray">
                            <Loader2 className="w-4 h-4 animate-spin text-brand-cyan" />
                            Analysoidaan...
                          </div>
                        ) : promptResults ? (
                          <>
                            <p className="text-brand-gray">Prompti analysoitu. Tässä palaute:</p>
                            <div className="grid grid-cols-1 gap-4 mt-4">
                              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                <div className="text-xs text-brand-gray mb-2">Promptin arvosana</div>
                                <div className="flex items-center gap-4">
                                  <div className="text-3xl font-bold text-brand-cyan">{promptResults.score}/100</div>
                                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className={`h-full ${promptResults.score > 70 ? 'bg-green-400' : 'bg-brand-amber'}`} style={{ width: `${promptResults.score}%` }} />
                                  </div>
                                </div>
                              </div>
                              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                <div className="text-xs text-brand-amber mb-2 font-semibold">Missä on parannettavaa</div>
                                <ul className="list-disc list-inside text-white/80 text-sm space-y-1">
                                  {promptResults.improvements.map((item: string, i: number) => <li key={i}>{item}</li>)}
                                </ul>
                              </div>
                              <div className="p-4 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20">
                                <div className="text-xs text-brand-cyan mb-2 font-semibold">Parannettu ehdotus</div>
                                <div className="text-white text-sm italic">"{promptResults.suggestion}"</div>
                              </div>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ROI Predictor */}
              <div className="bg-black/40 rounded-2xl border border-white/5 p-6 md:p-8 relative overflow-hidden flex flex-col min-h-[350px]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-purple to-brand-amber opacity-50" />

                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-brand-purple" />
                    <h3 className="font-semibold text-white">ROI Predictor</h3>
                  </div>
                  <div className="text-xs font-mono text-brand-gray bg-white/5 px-3 py-1 rounded-full">
                    roi_calc.rs
                  </div>
                </div>

                <div className="space-y-6 font-mono text-sm flex-1">
                  <div className="flex gap-3 items-center bg-black/50 p-2 rounded-xl border border-white/10 focus-within:border-brand-purple/50 focus-within:bg-black/80 transition-all shadow-inner relative">
                    <span className="text-brand-purple shrink-0 pl-2 font-bold">&gt;</span>
                    <select
                      value={roiInputText}
                      onChange={(e) => setRoiInputText(e.target.value)}
                      className="bg-transparent border-none outline-none text-white w-full focus:ring-0 appearance-none cursor-pointer relative z-10"
                    >
                      <option value="Verkkosivu" className="bg-brand-bg text-white">Verkkosivu</option>
                      <option value="Chatbot" className="bg-brand-bg text-white">Asiakaspalvelu Chatbot</option>
                      <option value="Tekoälyautomaatio" className="bg-brand-bg text-white">Tekoälyautomaatio</option>
                      <option value="PWA sovellus" className="bg-brand-bg text-white">PWA Sovellus</option>
                    </select>
                    {/* Custom dropdown arrow */}
                    <div className="absolute right-[85px] pointer-events-none text-brand-purple/70">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                    <button
                      onClick={handleRoiAnalyze}
                      disabled={roiIsAnalyzing || !roiInputText.trim()}
                      className="px-5 py-2 bg-brand-purple text-white rounded-lg hover:bg-brand-purple/90 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] disabled:opacity-50 disabled:hover:shadow-none transition-all font-sans font-bold text-xs uppercase tracking-wider shrink-0 z-20"
                    >
                      Aja
                    </button>
                  </div>

                  {roiInputText && (roiResults || roiIsAnalyzing) && (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-white break-words">
                      Valittu palvelu: {roiInputText}
                    </div>
                  )}

                  {(roiIsAnalyzing || roiResults) && (
                    <div className="flex gap-4">
                      <span className="text-brand-purple shrink-0">AI</span>
                      <div className="space-y-4 w-full">
                        {roiIsAnalyzing ? (
                          <div className="flex items-center gap-3 text-brand-gray">
                            <Loader2 className="w-4 h-4 animate-spin text-brand-purple" />
                            Lasketaan...
                          </div>
                        ) : roiResults ? (
                          <>
                            <p className="text-brand-gray">Arvioitu tuotto palvelulle: <span className="text-white font-semibold">{roiResults.service}</span></p>
                            <div className="grid grid-cols-1 gap-4 mt-4">
                              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                <div className="text-xs text-brand-gray mb-1">Esimerkkihinta</div>
                                <div className="text-2xl text-white font-bold mb-2">{roiResults.price}</div>
                                <div className="text-[10px] text-brand-gray/60 leading-tight">Asennusmaksu + kuukausittainen ylläpito.</div>
                              </div>
                              <div className="p-4 rounded-xl bg-brand-purple/10 border border-brand-purple/20">
                                <div className="text-xs text-brand-purple mb-1">Arvioitu ROI</div>
                                <div className="text-2xl text-green-400 font-bold mb-2">{roiResults.roi}</div>
                                <div className="text-[10px] text-brand-purple/60 leading-tight">Sijoitetun pääoman tuotto ensimmäisen vuoden aikana.</div>
                              </div>
                              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                <div className="text-xs text-brand-amber mb-1 font-semibold">ROI Perustelu</div>
                                <div className="text-sm text-white/90 leading-relaxed">{roiResults.reason}</div>
                              </div>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-xl text-brand-gray mb-8">Haluatko nähdä, miten nämä työkalut voisivat toimia sinun yrityksessäsi?</p>
            <button
              type="button"
              {...calBookingProps}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-cyan text-black font-bold text-lg hover:bg-white hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] hover:scale-[1.03] active:scale-95 transition-all duration-300"
            >
              Varaa ilmainen konsultaatio
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Value Proposition Matrix */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-20">
            <SectionHeading
              eyebrow="Miksi minä"
              title={<>Miksi Valita <span className="text-gradient">Minut</span>?</>}
              subtitle="Yhdistän syvän teknisen osaamisen liiketoiminnan ymmärrykseen. Tuloksena on ratkaisuja, jotka tuottavat mitattavaa arvoa."
            />
          </div>

          {/* Asymmetrical bento — one tall feature cell, stacked side cells, base row of three */}
          <GlowGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:auto-rows-[minmax(190px,auto)]">
            {[
              { title: 'Älykäs Automaatio', desc: 'Tarjouspyynnöt, tilausvahvistukset ja datansiirto hoituvat ilman ihmisen kosketusta. Vapautat tiimisi rutiineista tuottavaan, laskutettavaan työhön — ja lopetat rahan polttamisen paperisotaan.', icon: Zap, color: 'from-brand-cyan to-blue-500', span: 'lg:col-span-7 lg:row-span-2', feature: true, bullets: ['Tarjoukset & tilausvahvistukset', 'CRM- ja kalenteri-integraatiot', 'Sähköpostien luokittelu ja reititys'] },
              { title: 'Päätöksiä Tukeva Data', desc: 'Muutan hajallaan olevan datan selkeiksi oivalluksiksi. Näet reaaliajassa, mikä tuottaa — ja mikä syö katetta.', icon: BarChart3, color: 'from-brand-purple to-pink-500', span: 'lg:col-span-5' },
              { title: 'Tietoturva Sisäänrakennettuna', desc: 'Yritystason tietoturva ja GDPR-yhteensopivuus jokaisessa ratkaisussa. Datasi pysyy sinun hallinnassasi.', icon: ShieldCheck, color: 'from-emerald-400 to-teal-500', span: 'lg:col-span-5' },
              { title: 'Skaalautuu Kanssasi', desc: 'Järjestelmät, jotka kestävät kasvun — yhdestä työkalusta koko organisaation koneistoksi.', icon: Globe, color: 'from-brand-amber to-orange-500', span: 'lg:col-span-4' },
              { title: 'Käyttäjät Rakastavat', desc: 'Intuitiiviset, nopeat käyttöliittymät, jotka tiimi ottaa käyttöön ilman koulutusviikkoja.', icon: Users, color: 'from-blue-400 to-indigo-500', span: 'lg:col-span-4' },
              { title: 'Kehittyy Jatkuvasti', desc: 'Tekoäly oppii datastasi ja paranee käytössä — investointisi kasvaa ajan myötä.', icon: BrainCircuit, color: 'from-rose-400 to-red-500', span: 'lg:col-span-4' },
            ].map((feature, i) => (
              <Reveal key={i} delay={i * 0.05} className={feature.span}>
                <GlowCard className={`group rounded-3xl p-8 h-full flex flex-col ${feature.feature ? 'shadow-pop md:p-10 justify-between' : ''}`}>
                  <div>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg shadow-black/50 group-hover:scale-110 group-hover:shadow-[0_0_24px_rgba(255,255,255,0.3)] transition-all duration-300`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className={`font-bold mb-3 text-white group-hover:text-brand-cyan transition-colors ${feature.feature ? 'text-3xl md:text-4xl font-display tracking-tight' : 'text-xl'}`}>{feature.title}</h3>
                    <p className={`text-brand-gray leading-relaxed ${feature.feature ? 'text-lg max-w-xl' : ''}`}>{feature.desc}</p>
                  </div>
                  {feature.bullets && (
                    <ul className="mt-8 grid sm:grid-cols-2 gap-3">
                      {feature.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm text-white/80">
                          <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </GlowCard>
              </Reveal>
            ))}
          </GlowGrid>
        </div>
      </section>

      {/* Who is this for */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-16">
            <SectionHeading
              eyebrow="Kenelle"
              title={<>Tehty <span className="text-gradient">tekijöiden</span> arkeen</>}
              subtitle="Erikoisalani on rakennus-, LVI-, sähkö- ja talotekniikka-alan pk-yritykset, jotka hukkaavat tunteja paperisotaan. Mutta jokainen suomalainen pk-yritys, joka haluaa kasvaa tekoälyllä, on tervetullut."
            />
          </div>

          <GlowGrid className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: HardHat, label: 'Rakennus & remontti', desc: 'Tarjoukset, aikataulut ja työmaaviestintä kuntoon.' },
              { icon: Wrench, label: 'LVI & talotekniikka', desc: 'Huoltopyynnöt ja tilaukset automaattisesti oikeaan paikkaan.' },
              { icon: Zap, label: 'Sähköurakointi', desc: 'Vähemmän toimistotyötä, enemmän laskutettavia tunteja.' },
              { icon: Building2, label: 'Palvelualan pk-yritykset', desc: 'Chatbotit ja verkkosivut, jotka myyvät puolestasi.' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <GlowCard className="h-full p-7 rounded-3xl text-center group transition-all duration-500">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:border-brand-cyan/40 group-hover:bg-brand-cyan/10 transition-all duration-300">
                    <item.icon className="w-7 h-7 text-brand-cyan group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.label}</h3>
                  <p className="text-sm text-brand-gray leading-relaxed">{item.desc}</p>
                </GlowCard>
              </Reveal>
            ))}
          </GlowGrid>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <div className="mb-14 flex justify-center">
            <SectionHeading
              eyebrow="Usein kysyttyä"
              title={<>Kysymyksiä? <span className="text-gradient">Vastauksia.</span></>}
            />
          </div>

          <div className="space-y-4">
            {[
              { q: 'Mitä tekoälyautomaatio maksaa pk-yritykselle?', a: 'Aloitusprojektit alkavat muutamasta sadasta eurosta, ja kuukausiylläpito tyypillisesti 19–149 €/kk ratkaisun laajuudesta riippuen. Kerron aina hinnan etukäteen — ei piilokuluja, ei yllätyksiä.' },
              { q: 'Tarvitsenko teknistä osaamista?', a: 'Et lainkaan. Hoidan suunnittelun, toteutuksen, integraatiot ja ylläpidon puolestasi. Sinä keskityt liiketoimintaan, minä koneistoihin.' },
              { q: 'Kuinka nopeasti saan tuloksia?', a: 'Verkkosivut ja kevyet automaatiot syntyvät jopa 1–3 päivässä. Laajemmat integraatiot rakennetaan vaiheittain, ja näet arvon jo prototyyppivaiheessa.' },
              { q: 'Sopiiko tämä juuri minun alalleni?', a: 'Olen erikoistunut rakennus-, LVI- ja sähköalaan, mutta sama logiikka toimii kaikilla aloilla, joilla manuaalinen rutiini syö aikaa. Varaa ilmainen kartoitus, niin katsotaan yhdessä.' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <details className="group glass-card gloss border-gradient-hover rounded-2xl overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-white">{item.q}</h3>
                    <Plus className="w-5 h-5 text-brand-cyan shrink-0 transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <div className="px-6 pb-6 -mt-1 text-brand-gray leading-relaxed">{item.a}</div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="glass-card rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <Aurora />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-cyan/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">Lakkaa Polttamasta Aikaa. <span className="text-gradient">Aloita Tänään.</span></h2>
              <p className="text-xl text-brand-gray mb-12">Varaa ilmainen 30 minuutin kartoitus. Käymme läpi yrityksesi suurimmat aikasyöpöt ja näytän konkreettisesti, mitä tekoäly voisi automatisoida — ilman sitoutumista, ilman riskiä.</p>

              <MagneticButton
                data-cal-namespace="konsultaattio"
                data-cal-link="heikki-niemimaki-09cgi0/konsultaattio"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl bg-white text-brand-bg font-bold text-xl hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(0,245,255,0.3)]"
              >
                Varaa Aika Nyt
                <ArrowRight className="w-6 h-6" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
