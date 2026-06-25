import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, PenTool, ArrowRight, MessageSquare, ArrowLeft, GripVertical, ShieldCheck, Zap, Gauge, Info } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import { Aurora } from '../components/ui/Aurora';
import { Spotlight } from '../components/ui/Spotlight';
import { MagneticButton } from '../components/ui/MagneticButton';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { GlowGrid, GlowCard } from '../components/ui/GlowCard';
import { Parallax } from '../components/ui/Parallax';
import { TiltCard } from '../components/ui/TiltCard';
import { FaqAccordion } from '../components/ui/Accordion';
import { Tooltip } from '../components/ui/Tooltip';
import { usePageMeta } from '../hooks/usePageMeta';
import { submitLead } from '../lib/forms';

// --- Types & Schemas ---
const formSchema = z.object({
  name: z.string().min(2, 'Nimi on liian lyhyt'),
  company: z.string().min(2, 'Yrityksen nimi on liian lyhyt'),
  // Normalise common formatting (spaces, dashes, parentheses, NBSP) before
  // validating, then accept any Finnish mobile or landline number. The old
  // strict pattern rejected the exact spaced format shown in the example.
  phone: z
    .string()
    .refine(
      (v) => /^(\+358|0)\d{6,11}$/.test(v.replace(/[\s\-()./]/g, '')),
      'Tarkista puhelinnumero (esim. 040 1234567)'
    ),
  email: z.string().email('Tarkista sähköpostiosoite'),
  honeypot: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

// --- Typewriter Effect ---
const TypewriterText = ({ text, className }: { text: string, className?: string }) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 * i },
    }),
  };

  const child = {
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, damping: 12, stiffness: 200 } },
    hidden: { opacity: 0, y: 20, transition: { type: "spring" as const, damping: 12, stiffness: 200 } },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index} className="inline-block">
          {letter === " " ? " " : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

// --- Before/After Slider ---
const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const stopDragging = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', stopDragging);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', stopDragging);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', stopDragging);
    };
  }, [isDragging]);

  return (
    <div
      className="relative w-full h-[500px] md:h-[400px] rounded-2xl overflow-hidden select-none glass-card border border-white/10 cursor-ew-resize shadow-premium group"
      ref={containerRef}
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      {/* Before Layer (Bottom) */}
      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center p-8 md:p-12 grayscale opacity-50 bg-black/40">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-xl font-display font-bold text-brand-gray uppercase tracking-[0.2em]">Ennen</div>
          <ul className="space-y-4">
            {[
              'Vastaamattomat puhelut menevät kilpailijalle',
              'Liideihin vastataan vasta illalla, jos silloinkaan',
              'Tarjouspyynnöt unohtuvat sähköpostiin',
              'Vanha verkkosivu ei tuota yhtään yhteydenottoa',
              'Aikaa palaa toimistohommiin työn sijaan'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-brand-gray">
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                </div>
                <span className="text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* After Layer (Top, clipped) */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand-cyan/12 via-brand-purple/5 to-transparent flex flex-col md:flex-row items-center justify-center p-8 md:p-12"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <div className="w-full max-w-sm space-y-6">
          <div className="text-xl font-display font-bold text-brand-cyan uppercase tracking-[0.2em] drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]">Jälkeen</div>
          <ul className="space-y-4">
            {[
              'Moderni, nopea sivu, joka kerää liidit',
              'SoittoVahti vastaa jokaiseen vastaamattomaan puheluun',
              'Hälytys uudesta liidistä heti puhelimeesi',
              'Kaikki yhteydenotot yhdessä näkymässä',
              'Vapautunut aika menee itse työhön'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-white">
                <CheckCircle2 className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                <span className="font-medium text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-px bg-brand-cyan shadow-[0_0_15px_rgba(16,185,129,0.8)] group-hover:shadow-[0_0_25px_rgba(16,185,129,1)] transition-shadow duration-300"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center group-hover:scale-110 transition-all duration-300">
          <div className="absolute inset-0 rounded-full bg-brand-cyan opacity-0 group-hover:animate-ping group-hover:opacity-40 transition-opacity duration-300" />
          <div className="absolute inset-0 rounded-full border-2 border-brand-cyan opacity-0 group-hover:opacity-100 scale-150 group-hover:scale-110 transition-all duration-300" />
          <GripVertical className="w-5 h-5 text-brand-bg relative z-10" />
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
export function Pilot() {
  usePageMeta({
    title: 'Pilottiohjelma: liidikone rakennusalalle',
    description: 'Rajattu pilotti: 5 paikkaa rakennus-, LVI- ja sähköalan yrityksille. Verkkosivu, SoittoVahti ja speed-to-lead -hälytykset. Toteutus 1-3 päivässä, ei pitkää sitoutumista.',
  });

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // FAQ content (4 items, no search needed)
  const faqs = [
    { question: 'Miksi näin halvalla?', answer: 'Kyseessä on rajattu pilotti, jonka tavoitteena on kerätä referenssejä ja hioa tuotantomalli rakennusalalla. Sinä saat täyden hyödyn murto-osalla normaalihinnasta, minä saan vahvan referenssin. Win-win, mutta vain viidelle ensimmäiselle.' },
    { question: 'Mitä jos en ole tyytyväinen?', answer: 'Pilottiin ei sisälly pitkää sitoutumista. Jos et ole tyytyväinen ensimmäisen kuukauden jälkeen, voit lopettaa palvelun ilman lisäkuluja. Selkeä rajaus, läpinäkyvä hinta ja riskitön kokeilu, juuri niin kuin kuuluukin.' },
    { question: 'Sopiiko pienelle yritykselle?', answer: 'Kyllä. Tämä on suunniteltu nimenomaan 1-25 hengen rakennus-, LVI- ja sähköalan yrityksille, jotka haluavat lisää vastattuja liidejä nopeasti ja kustannustehokkaasti, ilman raskasta IT-projektia.' },
    { question: 'Tarvitaanko teknistä osaamista?', answer: 'Ei lainkaan. Hoidan kaiken teknisen toteutuksen, SoittoVahdin käyttöönoton, integraatiot ja ylläpidon. SoittoVahti toimii nykyisellä numerollasi, eikä vaadi uutta laitetta tai sovellusta.' }
  ];

  // Form State
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, trigger, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched'
  });

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('pilotFormData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      Object.keys(parsed).forEach(key => {
        setValue(key as keyof FormData, parsed[key]);
      });
    }
  }, [setValue]);

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem('pilotFormData', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const nextStep = async () => {
    const fieldsToValidate = step === 1 ? ['name', 'company'] as const : ['phone', 'email'] as const;
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setStep(2);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (data.honeypot) return; // Spam protection

    const result = await submitLead({
      formType: 'pilotti',
      nimi: data.name,
      yritys: data.company,
      puhelin: data.phone.replace(/[\s\-()./]/g, ''),
      sahkoposti: data.email,
      viesti: 'Uusi hakemus pilottiohjelmaan',
      lahde: 'clarityai.fi - pilottilomake',
      aikaleima: new Date().toISOString(),
    });

    if (result.ok) {
      setIsSuccess(true);
      localStorage.removeItem('pilotFormData');
      toast.success('Hakemus lähetetty. Olen yhteydessä 24 tunnin kuluessa.');

      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10b981', '#059669', '#fafafa']
      });
    } else {
      // Webhook unreachable — never drop the application. Open prefilled email.
      localStorage.removeItem('pilotFormData');
      toast('Viimeistele hakemus sähköpostitse, avasin valmiin viestin.', { icon: '✉️' });
      window.location.href = result.mailtoUrl;
    }
  };

  return (
    <div className="min-h-screen overflow-hidden relative">
      <Spotlight />

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center pt-24 pb-20 px-6 md:px-12 overflow-hidden">
        <Aurora />
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        {/* Parallax ambient wash */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.10)_0%,transparent_60%)] pointer-events-none"
          style={{ y: backgroundY }}
        />

        {/* Floating premium price chip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block absolute top-[24%] right-[7%] z-20 pointer-events-none"
        >
          <Parallax offset={60}>
            <div className="glass-card shadow-pop rounded-2xl px-5 py-4 animate-float-slow text-center">
              <div className="text-3xl font-display font-bold text-gradient">Kysy hintaa</div>
              <div className="text-xs text-brand-gray mt-1">läpinäkyvä hinta, ei yllätyksiä</div>
            </div>
          </Parallax>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block absolute bottom-[20%] left-[6%] z-20 pointer-events-none"
        >
          <Parallax offset={-80}>
            <div className="glass-card shadow-pop rounded-2xl px-5 py-4 animate-float-slow" style={{ animationDelay: '-3s' }}>
              <div className="flex items-center gap-2 text-brand-cyan text-sm font-mono">
                <Zap className="w-4 h-4" />
                Toimitus 1-3 päivässä
              </div>
              <div className="text-xs text-brand-gray mt-1">aloituspalaverista julkaisuun</div>
            </div>
          </Parallax>
        </motion.div>

        <div className="container mx-auto relative z-10 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-cyan/20 text-brand-cyan text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
            Pilottiohjelma · Vain 5 paikkaa jäljellä
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-[5.25rem] font-display font-bold mb-8 leading-[0.95] tracking-[-0.04em]">
            5 pilottipaikkaa <br className="hidden md:block" />
            <TypewriterText
              text="liidikoneelle"
              className="text-gradient-animated"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-2xl text-brand-gray mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Liidikone rakennusalan pk-yrityksille: konvertoiva verkkosivu, SoittoVahti ja
            speed-to-lead -hälytykset.{' '}
            <span className="text-white font-semibold">Kysy hintaa</span>, toteutus 1-3 päivässä,
            ilman piilokuluja ja pitkää sitoutumista.{' '}
            <span className="text-white font-medium">Yksikään liidi ei jää kylmäksi.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="flex flex-col sm:flex-row justify-center items-center gap-5"
          >
            <MagneticButton
              onClick={() => document.getElementById('yhteystiedot')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative group px-8 py-4 rounded-2xl bg-white text-brand-bg font-semibold text-lg overflow-hidden w-full sm:w-auto text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors duration-500">
                Varaa paikkasi pilottiin
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </MagneticButton>
            <a
              href="#mita-sisaltaa"
              onClick={(e) => { e.preventDefault(); document.getElementById('mita-sisaltaa')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-8 py-4 rounded-2xl glass hover:bg-white/10 border border-white/10 transition-all duration-300 font-semibold text-lg w-full sm:w-auto text-center flex items-center justify-center gap-2"
            >
              Mitä se sisältää?
            </a>
          </motion.div>

        </div>
      </section>

      {/* Trust band — directly below the hero, not inside it */}
      <section className="relative z-10 px-6 md:px-12 pt-2 pb-10">
        <div className="container mx-auto max-w-5xl flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-brand-gray/80">
          <span className="inline-flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-brand-cyan" /> Ei pitkää sitoutumista</span>
          <span className="inline-flex items-center gap-2"><Zap className="w-4 h-4 text-brand-cyan" /> Toimitus 1-3 päivässä</span>
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section id="mita-sisaltaa" className="py-24 md:py-32 px-6 md:px-12 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-center mb-16">
            <SectionHeading
              eyebrow="Pilottipaketti"
              title={<>Mitä pilotti <span className="text-gradient">sisältää?</span></>}
              subtitle="Kaikki mitä tarvitset, jotta yksikään liidi ei jää kiinni ottamatta. Yhdellä kiinteällä hinnalla, ilman piilokuluja tai jälkilaskutusta."
            />
          </div>

          <GlowGrid className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pb-8 md:pb-0 snap-x snap-mandatory hide-scrollbar">
            {[
              { title: 'Konvertoiva verkkosivu', icon: PenTool, desc: 'Moderni, mobiilioptimoitu sivu, joka on suunniteltu muuttamaan kävijä yhteydenotoksi. Ei mallipohjafiilistä, vaan premium-luokan ensivaikutelma.', hint: 'Suunniteltu, koodattu ja optimoitu juuri sinun palveluillesi, ei valmis teema.' },
              { title: 'SoittoVahti numeroosi', icon: MessageSquare, desc: 'Vastaamaton puhelu muuttuu tekstiviestiksi sekunneissa, jotta asiakas ei ehdi soittaa kilpailijalle.', hint: 'Toimii nykyisellä numerollasi, ei uutta SIM-korttia eikä erillistä sovellusta.' },
              { title: 'Speed-to-lead -hälytykset', icon: Gauge, desc: 'Hälytys jokaisesta uudesta liidistä ja kaikki yhteydenotot yhdessä näkymässä, jossa mikään ei jää roikkumaan.', hint: 'Hälytys puhelimeesi heti, kun liidi saapuu, joten ehdit vastata ensimmäisenä.' },
              { title: 'Hosting & nopea toteutus', icon: Clock, desc: 'Hosting, SSL ja tekninen ylläpito ensimmäisen kuukauden ajan. Koko paketti pystyssä 1-3 päivässä aloituspalaverista.', hint: 'Hosting, SSL-sertifikaatti ja ylläpito ensimmäisen kuukauden ajan kuuluvat hintaan.' }
            ].map((feature, i) => (
              <Reveal key={i} delay={i * 0.08} className="min-w-[280px] md:min-w-0 snap-center">
                <TiltCard className="h-full" max={10} lift={8}>
                  <GlowCard className="group border-beam relative h-full p-8 rounded-3xl transition-all duration-500">
                    <div className="absolute top-5 right-5 z-10 tilt-layer">
                      <Tooltip content={feature.hint}>
                        <span className="grid place-items-center w-7 h-7 rounded-full border border-white/10 text-brand-gray/70 hover:text-brand-cyan hover:border-brand-cyan/40 transition-colors">
                          <Info className="w-3.5 h-3.5" />
                        </span>
                      </Tooltip>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-brand-cyan/40 group-hover:bg-brand-cyan/10 transition-all duration-300 tilt-layer">
                      <feature.icon className="w-7 h-7 text-brand-cyan" />
                    </div>
                    <h3 className="text-xl font-display font-bold mb-3 text-white group-hover:text-brand-cyan transition-colors">{feature.title}</h3>
                    <p className="text-brand-gray leading-relaxed text-sm md:text-base">{feature.desc}</p>
                  </GlowCard>
                </TiltCard>
              </Reveal>
            ))}
          </GlowGrid>
        </div>
      </section>

      {/* Interactive Comparison */}
      <section className="py-24 md:py-32 px-6 md:px-12 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <div className="flex justify-center mb-16">
            <SectionHeading
              title={<>Muutos, jonka <span className="text-gradient">huomaat heti</span></>}
              subtitle="Vedä liukusäädintä ja näe, mitä päivitetty, tekoälyä hyödyntävä sivusto tekee arjellesi."
            />
          </div>

          <Reveal>
            <BeforeAfterSlider />
          </Reveal>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-24 md:py-32 px-6 md:px-12 relative z-10">
        <div className="container mx-auto max-w-3xl">
          <div className="flex justify-center mb-12">
            <SectionHeading
              title={<>Kysymyksiä? <span className="text-gradient">Vastauksia.</span></>}
            />
          </div>

          <Reveal>
            <FaqAccordion items={faqs.map((f) => ({ q: f.question, a: f.answer }))} />
          </Reveal>
        </div>
      </section>

      {/* Advanced Contact Form */}
      <section id="yhteystiedot" className="py-24 md:py-32 px-6 md:px-12 relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-cyan/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-2xl relative z-10">
          <Reveal>
            <div className="glass-card border-beam border border-white/10 p-8 md:p-16 rounded-3xl shadow-premium relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-cyan to-transparent opacity-60" />

              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">Hae mukaan pilottiin</h2>
                <p className="text-brand-cyan font-medium tracking-wide">Rakennus-, LVI- ja sähköalan pk-yrityksille (1-25 hlö)</p>
              </div>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-brand-cyan/15 border border-brand-cyan/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-brand-cyan" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4 text-white">Kiitos hakemuksesta.</h3>
                  <p className="text-brand-gray">Olen sinuun yhteydessä 24 tunnin kuluessa.</p>
                </motion.div>
              ) : (
                <form className="space-y-8" onSubmit={handleSubmit(onSubmit)} noValidate>
                  {/* Progress Indicator */}
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className={`w-3 h-3 rounded-full transition-colors ${step >= 1 ? 'bg-brand-cyan shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-white/15'}`} />
                    <div className={`w-12 h-0.5 transition-colors ${step >= 2 ? 'bg-brand-cyan' : 'bg-white/15'}`} />
                    <div className={`w-3 h-3 rounded-full transition-colors ${step >= 2 ? 'bg-brand-cyan shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-white/15'}`} />
                  </div>

                  {/* Honeypot */}
                  <input type="text" {...register('honeypot')} className="hidden" tabIndex={-1} autoComplete="off" />

                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-8"
                      >
                        {/* Nimi */}
                        <div className="relative">
                          <input
                            type="text"
                            id="name"
                            {...register('name')}
                            className={`peer w-full bg-transparent border-b-2 ${errors.name ? 'border-red-500' : 'border-white/15'} px-0 py-3 text-white placeholder-transparent focus:outline-none focus:border-brand-cyan transition-colors`}
                            placeholder="Nimi"
                          />
                          <label
                            htmlFor="name"
                            className="absolute left-0 -top-3.5 text-sm text-brand-gray transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-brand-gray peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-brand-cyan"
                          >
                            Nimi
                          </label>
                          {errors.name && <p className="text-red-400 text-xs mt-1 absolute -bottom-5">{errors.name.message}</p>}
                        </div>

                        {/* Yritys */}
                        <div className="relative">
                          <input
                            type="text"
                            id="company"
                            {...register('company')}
                            className={`peer w-full bg-transparent border-b-2 ${errors.company ? 'border-red-500' : 'border-white/15'} px-0 py-3 text-white placeholder-transparent focus:outline-none focus:border-brand-cyan transition-colors`}
                            placeholder="Yritys"
                          />
                          <label
                            htmlFor="company"
                            className="absolute left-0 -top-3.5 text-sm text-brand-gray transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-brand-gray peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-brand-cyan"
                          >
                            Yritys
                          </label>
                          {errors.company && <p className="text-red-400 text-xs mt-1 absolute -bottom-5">{errors.company.message}</p>}
                        </div>

                        <button
                          type="button"
                          onClick={nextStep}
                          className="group/btn w-full py-4 rounded-2xl bg-brand-cyan text-brand-bg font-bold text-lg hover:bg-white hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300 mt-8 flex items-center justify-center gap-2 will-change-transform active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
                        >
                          Seuraava vaihe
                          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </button>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-8"
                      >
                        {/* Puhelin */}
                        <div className="relative">
                          <input
                            type="tel"
                            id="phone"
                            {...register('phone')}
                            className={`peer w-full bg-transparent border-b-2 ${errors.phone ? 'border-red-500' : 'border-white/15'} px-0 py-3 text-white placeholder-transparent focus:outline-none focus:border-brand-cyan transition-colors`}
                            placeholder="Puhelin"
                          />
                          <label
                            htmlFor="phone"
                            className="absolute left-0 -top-3.5 text-sm text-brand-gray transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-brand-gray peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-brand-cyan"
                          >
                            Puhelin
                          </label>
                          {errors.phone && <p className="text-red-400 text-xs mt-1 absolute -bottom-5">{errors.phone.message}</p>}
                        </div>

                        {/* Sähköposti */}
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            {...register('email')}
                            className={`peer w-full bg-transparent border-b-2 ${errors.email ? 'border-red-500' : 'border-white/15'} px-0 py-3 text-white placeholder-transparent focus:outline-none focus:border-brand-cyan transition-colors`}
                            placeholder="Sähköposti"
                          />
                          <label
                            htmlFor="email"
                            className="absolute left-0 -top-3.5 text-sm text-brand-gray transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-brand-gray peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-brand-cyan"
                          >
                            Sähköposti
                          </label>
                          {errors.email && <p className="text-red-400 text-xs mt-1 absolute -bottom-5">{errors.email.message}</p>}
                        </div>

                        <div className="flex gap-4 mt-8">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="group/back px-6 py-4 rounded-2xl glass border border-white/10 text-brand-gray font-bold hover:bg-white/10 hover:text-white transition-all duration-300 flex items-center justify-center will-change-transform active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
                          >
                            <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover/back:-translate-x-1" />
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group/submit flex-1 py-4 rounded-2xl bg-brand-cyan text-brand-bg font-bold text-lg hover:bg-white hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2 will-change-transform active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
                          >
                            {isSubmitting ? (
                              <span className="w-6 h-6 border-2 border-brand-bg border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <>
                                Lähetä hakemus
                                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/submit:translate-x-1" />
                              </>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
