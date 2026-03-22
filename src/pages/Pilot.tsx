import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, Server, PenTool, ArrowRight, MessageSquare, ChevronDown, Search, ArrowLeft, GripVertical } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';

// --- Types & Schemas ---
const formSchema = z.object({
  name: z.string().min(2, 'Nimi on liian lyhyt'),
  company: z.string().min(2, 'Yrityksen nimi on liian lyhyt'),
  phone: z.string().regex(/^(\+358|0)[45]\d{7,8}$/, 'Tarkista puhelinnumero (esim. 040 123 4567)'),
  email: z.string().email('Tarkista sähköpostiosoite'),
  honeypot: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

// --- Spotlight Component ---
const Spotlight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300" 
      style={{ 
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,212,255,0.03), transparent 40%)` 
      }} 
    />
  );
};

// --- Magnetic Button ---
const MagneticButton = ({ children, onClick, className }: { children: React.ReactNode, onClick?: () => void, className?: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

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
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 200 } },
    hidden: { opacity: 0, y: 20, transition: { type: "spring", damping: 12, stiffness: 200 } },
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
          {letter === " " ? "\u00A0" : letter}
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
      className="relative w-full h-[500px] md:h-[400px] rounded-3xl overflow-hidden select-none bg-slate-900 border border-slate-800 cursor-ew-resize shadow-2xl group"
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
      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center p-8 md:p-12 grayscale opacity-50 bg-slate-950">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-xl font-bold text-slate-500 uppercase tracking-wider font-serif">Ennen</div>
          <ul className="space-y-4">
            {[
              'Vanhentuneet, hitaat nettisivut',
              'Asiakkaat soittavat samoista perusasioista',
              'Tarjouspyyntöjen manuaalinen käsittely',
              'Verkkosivut eivät tuota uusia liidejä',
              'Aikaa kuluu "toimisto-hommiin"'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-400">
                <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-slate-600 rounded-full" />
                </div>
                <span className="text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* After Layer (Top, clipped) */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-cyan-950/40 to-slate-900 flex flex-col md:flex-row items-center justify-center p-8 md:p-12"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <div className="w-full max-w-sm space-y-6">
          <div className="text-xl font-bold text-cyan-400 uppercase tracking-wider drop-shadow-[0_0_10px_rgba(0,212,255,0.5)] font-serif">Jälkeen</div>
          <ul className="space-y-4">
            {[
              'Modernit, nopeat ja luotettavat sivut',
              'AI-chatbot vastaa peruskysymyksiin 24/7',
              'Automaattinen liidien keruu ja karsinta',
              'Sivusto toimii aktiivisena myyjänäsi',
              'Vapautunut aika tuottavaan työhön'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-100">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="font-medium text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_15px_rgba(0,212,255,0.8)] group-hover:shadow-[0_0_25px_rgba(0,212,255,1)] transition-shadow duration-300"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-slate-100 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center group-hover:scale-110 transition-all duration-300">
          <div className="absolute inset-0 rounded-full bg-cyan-400 opacity-0 group-hover:animate-ping group-hover:opacity-40 transition-opacity duration-300" />
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400 opacity-0 group-hover:opacity-100 scale-150 group-hover:scale-110 transition-all duration-300" />
          <GripVertical className="w-5 h-5 text-slate-900 relative z-10" />
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
export function Pilot() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  // FAQ State
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  
  const faqs = [
    { question: 'Miksi näin halvalla?', answer: 'Kyseessä on pilottihanke, jonka tavoitteena on kerätä referenssejä ja testata uutta tekoälyavusteista tuotantomalliamme rakennusalalla.' },
    { question: 'Mitä jos en ole tyytyväinen?', answer: 'Pilottiin ei sisälly pitkää sitoutumista. Jos et ole tyytyväinen ensimmäisen kuukauden jälkeen, voit lopettaa palvelun ilman lisäkuluja. Selkeä rajaus ja riskitön kokeilu.' },
    { question: 'Sopiiko pienelle yritykselle?', answer: 'Kyllä, tämä on suunniteltu erityisesti 1-25 henkilön rakennusalan pk-yrityksille, jotka haluavat modernisoida verkkonäkyvyytensä nopeasti ja kustannustehokkaasti.' },
    { question: 'Tarvitaanko teknistä osaamista?', answer: 'Ei lainkaan. Me hoidamme kaiken teknisen toteutuksen, tekoälyn integroinnin ja ylläpidon puolestasi.' }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    
    try {
      const formspreeId = import.meta.env.VITE_FORMSPREE_ID || 'xjgaddeq'; // User's Formspree ID
      
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Nimi: data.name,
          Yritys: data.company,
          Puhelin: data.phone,
          Sähköposti: data.email,
          Viesti: 'Uusi hakemus Pilotti-ohjelmaan!'
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        localStorage.removeItem('pilotFormData');
        toast.success('Hakemus lähetetty onnistuneesti!');
        
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#00D4FF', '#F1F5F9', '#334155']
        });
      } else {
        const errorData = await response.json();
        if (Object.hasOwn(errorData, 'errors')) {
          toast.error(errorData.errors.map((e: any) => e.message).join(', '));
        } else {
          toast.error('Jotain meni pieleen. Yritä uudelleen.');
        }
      }
    } catch (error) {
      toast.error('Verkkovirhe. Tarkista internetyhteytesi ja yritä uudelleen.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-cyan-400 selection:text-slate-900 overflow-hidden relative">
      <Spotlight />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20 px-6 md:px-12 overflow-hidden">
        {/* Animated Background Particles */}
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,212,255,0.1)_0%,transparent_60%)]"
          style={{ y: backgroundY }}
        />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto relative z-10 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 text-sm font-medium mb-8 shadow-[0_0_20px_rgba(0,212,255,0.15)] backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Vain 5 paikkaa jäljellä
          </motion.div>

          <h1 className="text-[40px] md:text-[72px] font-serif font-bold mb-6 leading-tight tracking-tight">
            Pilottihaku: 5 paikkaa moderneille <br className="hidden md:block" />
            <TypewriterText 
              text="AI-nettisivuille" 
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(0,212,255,0.3)]"
            />
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto font-light"
          >
            Rakennusalan yrityksille. 299€. Toteutus 1-3 päivässä.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="flex justify-center"
          >
            <MagneticButton 
              onClick={() => document.getElementById('yhteystiedot')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-cyan-400 text-slate-900 font-bold text-lg hover:bg-slate-100 hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] transition-all duration-300"
            >
              Varaa ilmainen kartoitus
              <ArrowRight className="w-5 h-5" />
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section className="py-24 px-6 md:px-12 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl md:text-5xl font-serif font-bold mb-16 text-center"
          >
            Mitä pilotti sisältää?
          </motion.h2>
          
          <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pb-8 md:pb-0 snap-x snap-mandatory hide-scrollbar">
            {[
              { title: 'Suunnittelu & toteutus', icon: PenTool, desc: 'Moderni, konvertoiva ja mobiilioptimoitu ulkoasu yrityksellesi.' },
              { title: 'AI-chatbot integraatio', icon: MessageSquare, desc: 'Älykäs asiakaspalvelija, joka vastaa kysymyksiin 24/7 ja kerää liidejä.' },
              { title: 'Hosting & ylläpito (1kk)', icon: Server, desc: 'Nopeat palvelimet, SSL-varmenne ja tekninen ylläpito ensimmäisen kuukauden ajan.' },
              { title: 'Nopea toteutus (1-3 pv)', icon: Clock, desc: 'Sivustosi on julkaisuvalmis jopa muutamassa päivässä aloituspalaverista.' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="min-w-[280px] md:min-w-0 snap-center bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-8 rounded-3xl hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,212,255,0.05)] hover:border-cyan-400/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-400/20 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-serif tracking-wide text-slate-100">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Comparison */}
      <section className="py-32 px-6 md:px-12 relative">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Muutos, jonka huomaat</h2>
            <p className="text-slate-400 text-lg">Vedä liukusäädintä nähdäksesi eron</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <BeforeAfterSlider />
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-32 px-6 md:px-12 bg-slate-950/50 relative">
        <div className="container mx-auto max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold mb-12 text-center"
          >
            Usein kysytyt kysymykset
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mb-12"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Etsi kysymyksiä..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-slate-100 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
            />
          </motion.div>
          
          <div className="space-y-4">
            <AnimatePresence>
              {filteredFaqs.length > 0 ? filteredFaqs.map((faq, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-slate-600 transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <span className="text-lg md:text-xl font-bold font-serif pr-8">{faq.question}</span>
                    <ChevronDown className={`w-6 h-6 text-cyan-400 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="px-6 md:px-8 overflow-hidden"
                      >
                        <p className="text-slate-400 leading-relaxed text-base md:text-lg pb-6 md:pb-8">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )) : (
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="text-center text-slate-500 py-8"
                >
                  Ei tuloksia haulla "{searchQuery}"
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Advanced Contact Form */}
      <section id="yhteystiedot" className="py-32 px-6 md:px-12 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto max-w-2xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-8 md:p-16 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
            
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Hae mukaan pilottiin</h2>
              <p className="text-cyan-400 font-medium tracking-wide">Palvelemme rakennusalan pk-yrityksiä (1-25 hlö)</p>
            </div>

            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-cyan-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-serif">Kiitos hakemuksesta!</h3>
                <p className="text-slate-400">Olemme sinuun yhteydessä 24 tunnin kuluessa.</p>
              </motion.div>
            ) : (
              <form className="space-y-8" onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Progress Indicator */}
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className={`w-3 h-3 rounded-full transition-colors ${step >= 1 ? 'bg-cyan-400 shadow-[0_0_10px_rgba(0,212,255,0.5)]' : 'bg-slate-700'}`} />
                  <div className={`w-12 h-0.5 transition-colors ${step >= 2 ? 'bg-cyan-400' : 'bg-slate-700'}`} />
                  <div className={`w-3 h-3 rounded-full transition-colors ${step >= 2 ? 'bg-cyan-400 shadow-[0_0_10px_rgba(0,212,255,0.5)]' : 'bg-slate-700'}`} />
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
                          className={`peer w-full bg-transparent border-b-2 ${errors.name ? 'border-red-500' : 'border-slate-600'} px-0 py-3 text-slate-100 placeholder-transparent focus:outline-none focus:border-cyan-400 transition-colors`}
                          placeholder="Nimi"
                        />
                        <label 
                          htmlFor="name" 
                          className="absolute left-0 -top-3.5 text-sm text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-cyan-400"
                        >
                          Nimi
                        </label>
                        {errors.name && <p className="text-red-500 text-xs mt-1 absolute -bottom-5">{errors.name.message}</p>}
                      </div>

                      {/* Yritys */}
                      <div className="relative">
                        <input 
                          type="text" 
                          id="company"
                          {...register('company')}
                          className={`peer w-full bg-transparent border-b-2 ${errors.company ? 'border-red-500' : 'border-slate-600'} px-0 py-3 text-slate-100 placeholder-transparent focus:outline-none focus:border-cyan-400 transition-colors`}
                          placeholder="Yritys"
                        />
                        <label 
                          htmlFor="company" 
                          className="absolute left-0 -top-3.5 text-sm text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-cyan-400"
                        >
                          Yritys
                        </label>
                        {errors.company && <p className="text-red-500 text-xs mt-1 absolute -bottom-5">{errors.company.message}</p>}
                      </div>

                      <button 
                        type="button"
                        onClick={nextStep}
                        className="w-full py-4 rounded-2xl bg-cyan-400 text-slate-900 font-bold text-lg hover:bg-slate-100 hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all duration-300 mt-8 flex items-center justify-center gap-2"
                      >
                        Seuraava vaihe
                        <ArrowRight className="w-5 h-5" />
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
                          className={`peer w-full bg-transparent border-b-2 ${errors.phone ? 'border-red-500' : 'border-slate-600'} px-0 py-3 text-slate-100 placeholder-transparent focus:outline-none focus:border-cyan-400 transition-colors`}
                          placeholder="Puhelin"
                        />
                        <label 
                          htmlFor="phone" 
                          className="absolute left-0 -top-3.5 text-sm text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-cyan-400"
                        >
                          Puhelin
                        </label>
                        {errors.phone && <p className="text-red-500 text-xs mt-1 absolute -bottom-5">{errors.phone.message}</p>}
                      </div>

                      {/* Sähköposti */}
                      <div className="relative">
                        <input 
                          type="email" 
                          id="email"
                          {...register('email')}
                          className={`peer w-full bg-transparent border-b-2 ${errors.email ? 'border-red-500' : 'border-slate-600'} px-0 py-3 text-slate-100 placeholder-transparent focus:outline-none focus:border-cyan-400 transition-colors`}
                          placeholder="Sähköposti"
                        />
                        <label 
                          htmlFor="email" 
                          className="absolute left-0 -top-3.5 text-sm text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-cyan-400"
                        >
                          Sähköposti
                        </label>
                        {errors.email && <p className="text-red-500 text-xs mt-1 absolute -bottom-5">{errors.email.message}</p>}
                      </div>

                      <div className="flex gap-4 mt-8">
                        <button 
                          type="button"
                          onClick={() => setStep(1)}
                          className="px-6 py-4 rounded-2xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition-colors flex items-center justify-center"
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button 
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 py-4 rounded-2xl bg-cyan-400 text-slate-900 font-bold text-lg hover:bg-slate-100 hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <span className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <>
                              Lähetä hakemus
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
