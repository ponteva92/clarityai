import { Suspense, lazy } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
const Background3D = lazy(() =>
  import('../components/3d/Background3D').then((m) => ({ default: m.Background3D }))
);
import {
  ArrowRight, CheckCircle2, Video, Terminal, Workflow, LineChart, Gauge,
  PhoneCall, PhoneMissed, BellRing, HardHat, Wrench, Zap, Building2, Rocket, BadgeEuro,
  Info, MessageSquareText,
} from 'lucide-react';
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
import { TiltCard } from '../components/ui/TiltCard';
import { HeroLogo } from '../components/ui/HeroLogo';
import { SpeedToLeadDemo } from '../components/ui/SpeedToLeadDemo';
import { FaqAccordion } from '../components/ui/Accordion';
import { Tooltip } from '../components/ui/Tooltip';
import { Dialog } from '../components/ui/Dialog';
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

// Stat-card metric explanations, surfaced via an Info tooltip in each card corner.
const statTips = [
  'SoittoVahti seuraa numeroasi vuorokauden ympäri, myös viikonloppuisin ja pyhinä.',
  'Tutkimusten mukaan alle viidessä minuutissa vastattu liidi muuttuu kaupaksi moninkertaisesti todennäköisemmin.',
  'Heti kun puhelu jää vastaamatta, asiakas saa automaattisen tekstiviestin sekunneissa.',
  'Toimiva pilotti numerossasi muutamassa päivässä, jotta näet hyödyn ennen kuin sitoudut.',
];

// Numbered explainer for the missed-call -> SMS flow, shown in a Dialog.
const flowSteps = [
  {
    title: 'Puhelu jää vastaamatta',
    desc: 'Olet katolla, kaivannossa tai toisessa puhelussa. Asiakkaan soitto jää vastaamatta, kuten ennenkin.',
  },
  {
    title: 'SoittoVahti reagoi sekunneissa',
    desc: 'Järjestelmä huomaa vastaamattoman puhelun heti ja lähettää asiakkaalle automaattisen tekstiviestin nimissäsi.',
  },
  {
    title: 'Asiakas saa vastauksen heti',
    desc: '"Hei, emme ehtineet vastata, mutta hoidamme asian. Miten voimme auttaa?" Asiakas tuntee tulleensa huomatuksi eikä soita kilpailijalle.',
  },
  {
    title: 'Keskustelu jatkuu puhelimessasi',
    desc: 'Asiakkaan vastaus tulee suoraan omaan puhelimeesi, ja saat hälytyksen jokaisesta liidistä. Jatkat siitä, kun ehdit.',
  },
];

function HowItWorksDialog({ trigger }: { trigger: React.ReactElement }) {
  return (
    <Dialog
      trigger={trigger}
      title="Näin SoittoVahti toimii"
      description="Vastaamattomasta puhelusta vastattuun liidiin, ilman että nostat sormeakaan."
    >
      <ol className="mt-2 divide-y divide-white/10">
        {flowSteps.map((step, i) => (
          <li key={step.title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
            <span className="shrink-0 mt-0.5 w-8 h-8 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan font-display font-bold text-sm inline-flex items-center justify-center">
              {i + 1}
            </span>
            <div>
              <h4 className="text-white font-semibold mb-1">{step.title}</h4>
              <p className="text-sm text-brand-gray leading-relaxed">{step.desc}</p>
            </div>
          </li>
        ))}
      </ol>
      <button
        type="button"
        {...calBookingProps}
        className="group mt-8 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-cyan text-black font-bold w-full sm:w-auto hover:bg-white hover:shadow-[0_0_30px_rgba(16,185,129,0.45)] active:scale-[0.98] transition-all duration-300"
      >
        Varaa ilmainen kartoitus
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </Dialog>
  );
}

// Integration tools the lead engine plugs into (real Simple Icons logos).
const integrations = [
  { slug: 'googlecalendar', name: 'Google Calendar' },
  { slug: 'whatsapp', name: 'WhatsApp' },
  { slug: 'gmail', name: 'Gmail' },
  { slug: 'hubspot', name: 'HubSpot' },
  { slug: 'pipedrive', name: 'Pipedrive' },
  { slug: 'zapier', name: 'Zapier' },
  { slug: 'make', name: 'Make' },
  { slug: 'telegram', name: 'Telegram' },
];

const processSteps: StickyItem[] = [
  {
    title: 'Kartoitus videopalaverissa',
    description: '30 minuutin palaveri, jossa katsotaan mistä liidit vuotavat. Saat selkeän kuvan tilanteesta ja konkreettisen ensiaskeleen, et myyntipuhetta.',
    icon: <Video className="w-5 h-5" />,
    visual: (
      <MockWindow label="kartoitus.call" accent="text-brand-cyan">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-video rounded-xl bg-white/5 border border-white/10 flex items-end p-2">
              <span className="text-xs text-brand-gray">Sinä</span>
            </div>
            <div className="aspect-video rounded-xl bg-brand-cyan/10 border border-brand-cyan/25 flex items-end p-2">
              <span className="text-xs text-brand-cyan">Heikki</span>
            </div>
          </div>
          <div className="space-y-2 font-mono text-sm">
            <div className="text-brand-gray">{'>'} Mistä liidit vuotavat?</div>
            {['Vastaamattomat puhelut', 'Hidas reagointi liideihin', 'Tarjoukset jäävät roikkumaan'].map((t, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.25, repeat: Infinity, repeatType: 'reverse', repeatDelay: 3, duration: 0.4 }}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5"
              >
                <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
                <span className="text-white/90">{t}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </MockWindow>
    ),
  },
  {
    title: 'Suunnitelma ja MVP',
    description: 'Piirrän liidipolkusi ja rakennan toimivan pilotin nopeasti. Usein SoittoVahti on livenä numerossasi jo päivissä, jotta näet hyödyn ennen kuin maksat täydestä.',
    icon: <Terminal className="w-5 h-5" />,
    visual: (
      <MockWindow label="soittovahti.live" accent="text-brand-purple">
        <div className="space-y-3 font-mono text-sm leading-relaxed">
          <div className="text-brand-gray">{'>'} Kytketään SoittoVahti numeroon +358 ********</div>
          <div className="rounded-xl bg-brand-cyan/10 border border-brand-cyan/25 p-3 text-white/90 not-italic">
            "Hei! Emme ehtineet vastata, mutta hoidamme asian. Miten voimme auttaa?"
          </div>
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="mt-2 flex items-center gap-2 text-emerald-400"
          >
            <CheckCircle2 className="w-4 h-4" /> Livenä 48 tunnissa
          </motion.div>
        </div>
      </MockWindow>
    ),
  },
  {
    title: 'Käyttöönotto ja integraatiot',
    description: 'Kytken puhelimen, lomakkeet ja kalenterin tai CRM:n yhteen, niin tekstiviestit, hälytykset ja speed-to-lead toimivat tuotannossa ilman että opettelet mitään.',
    icon: <Workflow className="w-5 h-5" />,
    visual: (
      <MockWindow label="integraatiot.flow" accent="text-emerald-400">
        <div className="h-full flex flex-col items-center justify-center gap-6">
          <div className="flex items-center gap-4">
            {['Soitto', 'SoittoVahti', 'Kalenteri'].map((n, i) => (
              <div key={n} className="flex items-center gap-4">
                <motion.div
                  animate={{ boxShadow: ['0 0 0px rgba(16,185,129,0)', '0 0 24px rgba(16,185,129,0.5)', '0 0 0px rgba(16,185,129,0)'] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  className="w-20 h-20 rounded-2xl glass border border-brand-cyan/30 flex items-center justify-center text-xs font-mono text-white text-center px-1"
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
          <div className="text-brand-gray font-mono text-xs">liidi → vastattu → kalenteriin</div>
        </div>
      </MockWindow>
    ),
  },
  {
    title: 'Optimointi ja raportointi',
    description: 'Mittaan vastausajat, pelastetut puhelut ja varatut työt. Hiomme järjestelmää kuukausittain, jotta jokaisesta liidistä otetaan enemmän irti.',
    icon: <LineChart className="w-5 h-5" />,
    visual: (
      <MockWindow label="raportti.metrics" accent="text-brand-cyan">
        <div className="h-full flex flex-col justify-end gap-4">
          <div className="flex items-end justify-between gap-3 h-40">
            {[28, 40, 52, 63, 80, 96].map((h, i) => (
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
            <span>pelastetut puhelut</span>
            <span className="text-emerald-400">↑ joka kuukausi</span>
          </div>
        </div>
      </MockWindow>
    ),
  },
];

export function Home() {
  usePageMeta({
    title: 'Liidikone pk-yrityksille: vastaa ensimmäisenä ja voita kauppa',
    description: 'Verkkosivut, vastaamattomien puheluiden SoittoVahti ja speed-to-lead -automaatio rakennus-, LVI- ja sähköalan yrityksille. Yksikään liidi ei jää kylmäksi.',
  });

  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

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
              <div className="mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-brand-cyan/20 text-brand-cyan text-sm font-medium"
                >
                  <Gauge className="w-4 h-4" />
                  Liidikone rakennusalan tekijöille
                </motion.div>
                <motion.span
                  aria-hidden
                  initial={reduce ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-4 block h-px w-32 origin-left bg-gradient-to-r from-brand-cyan/70 to-transparent mx-auto lg:mx-0"
                />
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-[3.9rem] xl:text-[4.7rem] font-display font-bold tracking-[-0.045em] leading-[1.02] mb-8">
                {['Vastaa ensimmäisenä.', 'Voita kauppa.'].map((line, i) => (
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
                Verkkosivut, vastaamattomien puheluiden tekstiviestit ja speed-to-lead -automaatio
                rakennus-, LVI- ja sähköalan tekijöille.
                <span className="text-white font-medium"> Yksikään liidi ei jää kylmäksi.</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5"
              >
                <MagneticButton
                  onClick={() => {
                    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="relative group px-8 py-4 rounded-2xl bg-white text-brand-bg font-semibold text-lg overflow-hidden w-full sm:w-auto text-center transition-transform active:scale-[0.98]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors duration-500">
                    Kokeile live-demoa
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </MagneticButton>

                <button
                  type="button"
                  {...calBookingProps}
                  className="px-8 py-4 rounded-2xl glass hover:bg-white/10 border border-white/10 transition-all duration-300 font-semibold text-lg w-full sm:w-auto text-center flex items-center justify-center gap-2"
                >
                  Varaa ilmainen kartoitus
                </button>
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
                  <Tooltip content="Tavoite on yksinkertainen: jokainen ohi mennyt puhelu otetaan kiinni, ettei yksikään asiakas jää ilman vastausta." side="left">
                    <span className="glass-card shadow-pop rounded-2xl px-5 py-4 animate-float-slow text-center block pointer-events-auto">
                      <span className="block text-3xl font-display font-bold text-gradient">0</span>
                      <span className="block text-xs text-brand-gray mt-1">menetettyä soittoa</span>
                    </span>
                  </Tooltip>
                </Parallax>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:block absolute bottom-[6%] left-[0%] z-20 pointer-events-none"
              >
                <Parallax offset={-70}>
                  <Tooltip content="Päivystää myös öisin, viikonloppuisin ja pyhinä. Asiakas saa tekstiviestin sekunneissa, vaikka et itse pääse vastaamaan." side="right">
                    <span className="glass-card shadow-pop rounded-2xl px-5 py-4 animate-float-slow block pointer-events-auto" style={{ animationDelay: '-3s' }}>
                      <span className="flex items-center gap-2 text-brand-cyan text-sm font-mono">
                        <PhoneCall className="w-4 h-4" />
                        SoittoVahti päivystää 24/7
                      </span>
                      <span className="block text-xs text-brand-gray mt-1">vastaa, kun et itse ehdi</span>
                    </span>
                  </Tooltip>
                </Parallax>
              </motion.div>

              <HeroLogo />
            </div>
          </div>
        </div>

      </section>

      {/* Integration logo wall — directly under the hero */}
      <section className="relative z-10 py-10 border-y border-white/5 bg-brand-bg/60">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-brand-gray/60 mb-7">Kytkeytyy työkaluihin, joita jo käytät</p>
        <Marquee
          duration={36}
          items={integrations.map((tool) => (
            <div className="px-8 flex items-center">
              <img
                src={`https://cdn.simpleicons.org/${tool.slug}/9ca3af`}
                alt={tool.name}
                loading="lazy"
                className="h-7 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        />
      </section>

      {/* Stats band */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6 md:px-12">
          <GlowGrid className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: 24, suffix: '/7', label: 'SoittoVahti valvoo puheluitasi tauotta' },
              { value: 5, suffix: ' min', label: 'Reagoi tämän rajan sisällä ja moninkertaista kaupat' },
              { value: 8, suffix: ' s', label: 'Vastaamaton puhelu muuttuu tekstiviestiksi' },
              { value: 3, suffix: ' pv', label: 'Pilotti pystyssä päivissä, ei kuukausissa' },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.08} className="h-full">
                <TiltCard className="h-full" max={11} lift={8}>
                  <GlowCard className="relative rounded-3xl p-8 text-center h-full">
                    <span className="absolute top-4 right-4 z-10 text-brand-gray/50 hover:text-brand-cyan transition-colors">
                      <Tooltip content={statTips[i]}>
                        <Info className="w-4 h-4" aria-label={`Lisätietoa: ${stat.label}`} />
                      </Tooltip>
                    </span>
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
          <ScrollRevealText
            text="Asiakas ei odota. Hän soittaa kolmelle tekijälle ja valitsee sen, joka vastaa ensimmäisenä. Sillä välin sinä olet katolla, kädet täynnä. Minä rakennan koneiston, joka vastaa puolestasi sekunneissa."
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-[-0.03em] leading-[1.08]"
          />
        </div>
      </section>

      {/* Sticky-scroll process */}
      <section className="relative z-10">
        <div className="container mx-auto px-6 md:px-12 pt-12 pb-0">
          <SectionHeading
            align="left"
            eyebrow="Näin se toimii"
            title={<>Kartoituksesta <span className="text-gradient">tuloksiin</span></>}
            subtitle="Kevyt ja läpinäkyvä prosessi. Yksi videopalaveri riittää alkuun, ja näet hyödyn jo pilottivaiheessa."
          />
        </div>
        <StickyScroll items={processSteps} />
      </section>

      {/* Interactive Speed-to-lead demo */}
      <section id="demo" className="pt-4 pb-32 relative z-10 bg-brand-bg">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-12">
            <SectionHeading
              align="left"
              title={<>Katso, mitä yksi vastaamaton puhelu <span className="text-gradient">maksaa</span></>}
              subtitle="Klikkaa ja katso saman liidin kaksi kohtaloa rinnakkain. Toisessa ehdit menettää kaupan, toisessa SoittoVahti pelastaa sen sekunneissa."
            />
            <HowItWorksDialog
              trigger={
                <button
                  type="button"
                  className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand-cyan/90 hover:text-brand-cyan transition-colors"
                >
                  <MessageSquareText className="w-4 h-4" />
                  Näin SoittoVahti toimii
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              }
            />
          </div>

          <div className="border-beam rounded-2xl">
            <SpeedToLeadDemo />
          </div>

          <div className="mt-14 text-center">
            <p className="text-xl text-brand-gray mb-8">Haluatko tämän omaan numeroosi?</p>
            <button
              type="button"
              {...calBookingProps}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-cyan text-black font-bold text-lg hover:bg-white hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-[1.03] active:scale-95 transition-all duration-300"
            >
              Varaa ilmainen kartoitus
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
              align="left"
              title={<>Miksi valita <span className="text-gradient">minut</span>?</>}
              subtitle="En myy tekoälyhypeä. Rakennan koneiston, joka tuo lisää töitä ja varmistaa, ettei yksikään liidi jää roikkumaan."
            />
          </div>

          {/* Asymmetrical bento — one tall feature cell, stacked side cells, base row of three */}
          <GlowGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:auto-rows-[minmax(190px,auto)]">
            {[
              { title: 'Vastaus, kun et itse ehdi', desc: 'Vastaamaton puhelu muuttuu tekstiviestiksi sekunneissa, ja jokainen uusi liidi hälyttää suoraan puhelimeesi. Asiakas saa vastauksen heti, vaikka sinä olisit katolla tai kaivannossa.', icon: PhoneCall, span: 'lg:col-span-7 lg:row-span-2', feature: true, bullets: ['Vastaamaton puhelu muuttuu tekstiviestiksi', 'Hälytys jokaisesta uudesta liidistä', 'Kaikki yhteydenotot yhdessä putkessa'] },
              { title: 'Nolla menetettyä soittoa', desc: 'Jokainen ohi mennyt puhelu otetaan kiinni automaattisesti, ennen kuin asiakas ehtii soittaa seuraavalle.', icon: PhoneMissed, span: 'lg:col-span-5' },
              { title: 'Kuolleet liidit hereille', desc: 'Vanhat tarjouspyynnöt ja vastaamatta jääneet asiakkaat herätetään ajoitetuilla viesteillä. Uutta kauppaa listasta, joka oli jo unohdettu.', icon: BellRing, span: 'lg:col-span-5' },
              { title: 'Rakennettu tekijöille', desc: 'Erikoisalana rakennus-, LVI- ja sähköala. Ei konsulttijargonia, vaan työkaluja, jotka toimivat arjessa.', icon: HardHat, span: 'lg:col-span-4' },
              { title: 'Näet hyödyn päivissä', desc: 'SoittoVahti voi olla livenä numerossasi jo päivissä. Pelastetut puhelut näkyvät heti, ei kuukausien projektia.', icon: Rocket, span: 'lg:col-span-4' },
              { title: 'Läpinäkyvä hinta', desc: 'Kerron hinnan etukäteen, ei piilokuluja eikä pitkää sitoutumista. Kokeile ja jatka vain, jos se tuottaa.', icon: BadgeEuro, span: 'lg:col-span-4' },
            ].map((feature, i) => (
              <Reveal key={i} delay={i * 0.08} className={feature.span}>
                <GlowCard className={`group rounded-3xl p-8 h-full flex flex-col ${feature.feature ? 'border-beam shadow-pop md:p-10 justify-between' : ''}`}>
                  <div>
                    <div className="w-14 h-14 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center mb-6 group-hover:bg-brand-cyan/15 group-hover:border-brand-cyan/40 transition-all duration-300">
                      <feature.icon className="w-7 h-7 text-brand-cyan" />
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
              align="left"
              title={<>Tehty <span className="text-gradient">tekijöiden</span> arkeen</>}
              subtitle="Erikoisalani on rakennus-, LVI-, sähkö- ja talotekniikka-alan pk-yritykset, joilla puhelin soi kesken työn. Mutta jokainen suomalainen pk-yritys, joka ei halua menettää liidejä, on tervetullut."
            />
          </div>

          <GlowGrid className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: HardHat, label: 'Rakennus & remontti', desc: 'Vastaamattomat tarjouspyynnöt kiinni, vaikka olisit työmaalla.' },
              { icon: Wrench, label: 'LVI & talotekniikka', desc: 'Päivystyssoitot ja huoltopyynnöt eivät jää roikkumaan.' },
              { icon: Zap, label: 'Sähköurakointi', desc: 'Jokainen soitto vastattu, vähemmän ohi mennyttä kauppaa.' },
              { icon: Building2, label: 'Palvelualan pk-yritykset', desc: 'Verkkosivut ja automaatiot, jotka myyvät puolestasi.' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <GlowCard className="h-full p-7 rounded-3xl text-center group transition-transform duration-300 hover:-translate-y-1">
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
              title={<>Kysymyksiä? <span className="text-gradient">Vastauksia.</span></>}
            />
          </div>

          <Reveal>
            <FaqAccordion
              items={[
                { q: 'Mitä tämä maksaa pk-yritykselle?', a: 'Verkkosivut ja kevyet automaatiot alkavat muutamasta sadasta eurosta, ja kuukausiylläpito tyypillisesti 19-149 euroa kuussa laajuudesta riippuen. Kerron hinnan aina etukäteen, ei piilokuluja eikä yllätyksiä.' },
                { q: 'Toimiiko SoittoVahti minun puhelimellani?', a: 'Kyllä. Se toimii nykyisen numerosi kanssa, eikä vaadi uutta laitetta tai sovellusta. Vastaamatta jäänyt puhelu laukaisee tekstiviestin, ja keskustelu jatkuu normaalisti omassa puhelimessasi.' },
                { q: 'Tarvitsenko teknistä osaamista?', a: 'Et lainkaan. Hoidan suunnittelun, toteutuksen, integraatiot ja ylläpidon puolestasi. Sinä saat lisää vastattuja liidejä, et uutta opeteltavaa.' },
                { q: 'Kuinka nopeasti näen tuloksia?', a: 'SoittoVahti voi olla livenä numerossasi jo päivissä, ja pelastetut puhelut näkyvät heti. Verkkosivut ja laajemmat automaatiot rakennetaan vaiheittain, ja näet arvon jo pilottivaiheessa.' },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="glass-card rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            <Aurora />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-cyan/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">Lakkaa menettämästä liidejä. <span className="text-gradient">Aloita tänään.</span></h2>
              <p className="text-xl text-brand-gray mb-12">Varaa ilmainen 30 minuutin kartoitus. Käymme läpi mistä liidit vuotavat ja näytän, mitä saisit kiinni jo ensi viikolla. Ilman sitoutumista, ilman riskiä.</p>

              <MagneticButton
                {...calBookingProps}
                className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl bg-white text-brand-bg font-bold text-xl hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
              >
                Varaa ilmainen kartoitus
                <ArrowRight className="w-6 h-6" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
