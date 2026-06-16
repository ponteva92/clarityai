import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BrainCircuit, CheckCircle2, ArrowRight, Bot, GraduationCap, Workflow, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Reveal } from '../components/ui/Reveal';
import { GlowGrid, GlowCard } from '../components/ui/GlowCard';
import { Aurora } from '../components/ui/Aurora';
import { KineticText } from '../components/ui/KineticText';
import { usePageMeta } from '../hooks/usePageMeta';
import { calBookingProps } from '../lib/cal';

const services = [
  {
    id: 'strategy',
    title: 'AI-Strategia & Konsultointi',
    description: 'Kartoitan yrityksesi suurimmat aikasyöpöt ja piilevät kasvupaikat, ja rakennan niistä konkreettisen tekoälytiekartan. En myy teknologiaa teknologian vuoksi — ratkaisen liiketoimintaongelmia, joilla on euromääräinen vaikutus.',
    icon: BrainCircuit,
    color: 'from-brand-cyan to-blue-500',
    iconAnimation: 'group-hover:scale-110 group-hover:rotate-6 transition-all duration-300',
    continuousAnimation: { y: [0, -3, 0], scale: [1, 1.02, 1] },
    continuousTransition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
    features: ['Liiketoiminnan nykytila-analyysi', 'AI-kypsyysarviointi', 'Use case -tunnistus ja priorisointi', 'ROI-laskelmat ja business case'],
  },
  {
    id: 'chatbots',
    title: 'Älykkäät Chatbotit',
    description: 'Rakennan chatbotteja, jotka vastaavat asiakkaiden peruskysymyksiin, keräävät liidejä ja varaavat aikoja — 24/7, ilman taukoja. Lopeta saman kysymyksen toistuva selittäminen ja anna tekoälyn hoitaa rutiinit.',
    icon: Bot,
    color: 'from-brand-purple to-pink-500',
    iconAnimation: 'group-hover:-translate-y-2 group-hover:scale-110 transition-all duration-300',
    continuousAnimation: { y: [0, -4, 0] },
    continuousTransition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const, delay: 0.5 },
    features: ['Asiakaspalvelubotit', 'Sisäiset HR- ja IT-botit', 'Integraatiot olemassa oleviin järjestelmiin', 'Monikielinen tuki'],
  },
  {
    id: 'courses',
    title: 'Tekoälykoulutukset',
    description: 'Koulutan tiimisi käyttämään tekoälyä tehokkaasti jo huomenna — ilman teknistä taustaa. Käytännönläheiset työpajat, joissa opitaan oikeita työnkulkuja, ei teoriaa. Tulokset näkyvät heti arjessa.',
    icon: GraduationCap,
    color: 'from-brand-amber to-orange-500',
    iconAnimation: 'group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300',
    continuousAnimation: { rotate: [0, 3, -3, 0] },
    continuousTransition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const, delay: 1 },
    features: ['Tekoälyn perusteet', 'ChatGPT tehokäyttö', 'Työkalujen soveltaminen arjessa', 'Räätälöidyt työpajat'],
  },
  {
    id: 'automation',
    title: 'Älykäs Prosessiautomaatio',
    description: 'Yhdistän ohjelmistorobotiikan (RPA) tekoälyyn ja automatisoin myös päätöksentekoa vaativat prosessit. Laskut, tarjoukset ja tietojen siirto järjestelmästä toiseen hoituvat itsestään — säästät kymmeniä tunteja kuukaudessa.',
    icon: Workflow,
    color: 'from-emerald-400 to-teal-500',
    iconAnimation: 'group-hover:scale-110 transition-all duration-300',
    continuousAnimation: { rotate: [0, 5, -5, 0] },
    continuousTransition: { duration: 8, repeat: Infinity, ease: "easeInOut" as const, delay: 0.2 },
    features: ['Laskujen ja kuittien automaattinen käsittely', 'Sähköpostien luokittelu ja reititys', 'Raportoinnin automatisointi', 'Järjestelmäintegraatiot'],
  },
  {
    id: 'dev',
    title: 'AI-Sovellus- & Verkkokehitys',
    description: 'Rakennan modernit, salamannopeat verkkosivut ja tekoälyä hyödyntävät sovellukset, jotka konvertoivat kävijät asiakkaiksi. Full-stack-toteutus suunnittelusta julkaisuun — sivusto, joka toimii aktiivisena myyjänäsi.',
    icon: Terminal,
    color: 'from-rose-400 to-red-500',
    iconAnimation: 'group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300',
    continuousAnimation: { opacity: [1, 0.85, 1], scale: [1, 1.02, 1] },
    continuousTransition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const, delay: 0.8 },
    features: ['Full-stack web-kehitys (React, Node.js)', 'API-suunnittelu ja toteutus', 'Pilviarkkitehtuuri (AWS, GCP, Azure)', 'Käyttöliittymäsuunnittelu (UI/UX)'],
  },
];

const phases = [
  { step: '01', title: 'Kartoitus & Strategia', desc: 'Analysoin nykytilanteen ja tunnistan suurimman arvon tuottavat tekoälykohteet. Luon selkeän tiekartan.' },
  { step: '02', title: 'Proof of Concept (PoC)', desc: 'Rakennan nopean prototyypin varmistaakseni teknisen toteutettavuuden ja liiketoiminta-arvon ennen suuria investointeja.' },
  { step: '03', title: 'Kehitys & Integraatio', desc: 'Toteutan tuotantovalmiin ratkaisun ja integroin sen saumattomasti olemassa oleviin järjestelmiisi.' },
  { step: '04', title: 'Koulutus & Skaalaus', desc: 'Koulutan tiimisi käyttämään uusia työkaluja ja autan skaalaamaan ratkaisun koko organisaatioon.' },
];

export function Services() {
  usePageMeta({
    title: 'Palvelut — AI-automaatio, chatbotit & verkkokehitys',
    description: 'AI-strategia, älykkäät chatbotit, prosessiautomaatio (RPA), tekoälykoulutukset ja konvertoiva verkkokehitys pk-yrityksille. Strategiasta tuotantoon yhdeltä luukulta.',
  });

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="pt-32 pb-20 min-h-screen relative">
      <Aurora className="opacity-50" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="mb-24 flex justify-center">
          <SectionHeading
            as="h1"
            eyebrow="Palvelut"
            title={<>Tekoälyratkaisut, Jotka <span className="text-gradient">Muuttavat Pelin</span></>}
            subtitle="Strategiasta tuotantoon — yhdeltä luukulta. Rakennan AI-automaatiot, chatbotit ja sovellukset, jotka säästävät aikaa, kasvattavat myyntiä ja maksavat itsensä takaisin. Jokainen ratkaisu räätälöidään yrityksesi todellisiin haasteisiin."
          />
        </div>

        {/* Services Grid */}
        <GlowGrid className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.08}>
              <GlowCard className="shadow-pop p-8 md:p-12 rounded-[2.5rem] transition-colors duration-500 group h-full">
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${service.color} opacity-10 blur-[80px] group-hover:opacity-30 transition-opacity duration-500`} />

                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-8 shadow-lg shadow-black/50`}>
                    <motion.div
                      animate={service.continuousAnimation}
                      transition={service.continuousTransition}
                      className="flex items-center justify-center w-full h-full"
                    >
                      <service.icon className={`w-8 h-8 text-white transform ${service.iconAnimation}`} />
                    </motion.div>
                  </div>

                  <h2 className="text-3xl font-display font-bold mb-4 text-white group-hover:text-brand-cyan transition-colors">{service.title}</h2>
                  <p className="text-brand-gray text-lg leading-relaxed mb-8">{service.description}</p>

                  <div className="space-y-4 mb-10">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                        <span className="text-white/90">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <button
                      type="button"
                      {...calBookingProps}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-cyan/10 text-brand-cyan font-semibold hover:bg-brand-cyan hover:text-black transition-all duration-300 group/btn"
                    >
                      Varaa ilmainen konsultaatio
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    <Link
                      to="/yhteystiedot#laheta-viesti"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white/70 font-medium hover:bg-white/5 hover:text-white transition-all duration-300"
                    >
                      Kysy lisää
                    </Link>
                  </div>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </GlowGrid>

        {/* Kinetic oversized statement band — full-bleed */}
        <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen mb-24 md:mb-28 py-10 md:py-14 overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent" />
          <KineticText text="STRATEGIA · CHATBOTIT · AUTOMAATIO · KOULUTUS · KEHITYS · " duration={38} />
        </div>

        {/* Process Section */}
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-16">
            <SectionHeading
              title={<>Neljä vaihetta strategiasta <span className="text-gradient">tuotantoon</span></>}
              subtitle="Läpinäkyvä ja ketterä prosessi, joka tuottaa tulokset nopeasti ja riskittömästi — näet arvon jo prototyyppivaiheessa, et vasta lopussa."
            />
          </div>

          <div ref={timelineRef} className="relative">
            {/* Track */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />
            {/* Scroll-linked fill */}
            <motion.div
              style={{ scaleY: lineScale }}
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-brand-cyan via-brand-purple to-brand-amber md:-translate-x-1/2 shadow-[0_0_12px_rgba(0,245,255,0.5)]"
            />

            {phases.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col md:flex-row items-center gap-8 mb-16 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="w-16 h-16 rounded-full bg-brand-bg border-2 border-brand-cyan flex items-center justify-center text-xl font-bold text-brand-cyan z-10 shrink-0 absolute left-0 md:relative md:left-auto shadow-[0_0_20px_rgba(0,245,255,0.3)]">
                  {phase.step}
                </div>

                <div className={`ml-24 md:ml-0 glass-card p-8 rounded-3xl flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <h3 className="text-2xl font-bold mb-4 text-white">{phase.title}</h3>
                  <p className="text-brand-gray leading-relaxed">{phase.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Reveal className="mt-32 max-w-4xl mx-auto">
          <div className="text-center glass-card p-12 rounded-[3rem] border border-brand-cyan/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/10 to-brand-purple/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Mikä Näistä Ratkaisisi Sinun Pullonkaulasi?</h2>
              <p className="text-xl text-brand-gray mb-10 max-w-2xl mx-auto">
                Et ole varma mistä aloittaa? Varaa ilmainen 30 minuutin kartoitus. Käymme läpi prosessisi ja tunnistan suurimman arvon tuottavan ensiaskeleen — ilman sitoutumista.
              </p>
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
        </Reveal>
      </div>
    </div>
  );
}
