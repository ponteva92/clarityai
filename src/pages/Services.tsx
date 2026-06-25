import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Globe, MessageSquare, Bot, Gauge, BellRing, PhoneMissed, PhoneOutgoing, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Reveal } from '../components/ui/Reveal';
import { GlowGrid, GlowCard } from '../components/ui/GlowCard';
import { Aurora } from '../components/ui/Aurora';
import { KineticText } from '../components/ui/KineticText';
import { Tooltip } from '../components/ui/Tooltip';
import { Dialog } from '../components/ui/Dialog';
import { usePageMeta } from '../hooks/usePageMeta';
import { calBookingProps } from '../lib/cal';

const services = [
  {
    id: 'verkkosivut',
    title: 'Verkkosivut, jotka tuovat liidejä',
    description:
      'Rakennan nopeat, mobiilioptimoidut sivut, joilla on yksi tehtävä: muuttaa kävijä yhteydenotoksi. Selkeä viesti, näkyvä puhelinnumero ja lomake, joka ei karkota ketään. Ei mallipohjafiilistä vaan ensivaikutelma, joka näyttää brändistäsi premium-luokan.',
    icon: Globe,
    continuousAnimation: { y: [0, -3, 0], scale: [1, 1.02, 1] },
    continuousTransition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const },
    features: [
      'Latautuu alle kahdessa sekunnissa, myös mobiilissa',
      'Suunniteltu konvertoimaan: selkeät napit, lomakkeet, puhelinnumero',
      'Hakukoneystävällinen tekninen pohja',
      'Julkaisuvalmis päivissä, ei kuukausissa',
    ],
  },
  {
    id: 'soittovahti',
    title: 'SoittoVahti: vastaamaton puhelu kiinni',
    description:
      'Et ehdi aina puhelimeen työmaalla, ja jokainen vastaamaton soitto on raha, joka soittaa seuraavaksi kilpailijalle. SoittoVahti lähettää vastaamatta jääneeseen numeroon tekstiviestin sekunneissa: "Emme ehtineet vastata, miten voimme auttaa?" Asiakas pysyy sinun, vaikka kätesi olisivat täynnä.',
    icon: MessageSquare,
    continuousAnimation: { y: [0, -4, 0] },
    continuousTransition: { duration: 5, repeat: Infinity, ease: 'easeInOut' as const, delay: 0.5 },
    features: [
      'Automaattinen tekstiviesti jokaiseen vastaamattomaan puheluun',
      'Viesti lähtee sekunneissa, vuorokauden ympäri',
      'Räätälöity yrityksesi nimellä ja äänellä',
      'Keskustelu jatkuu suoraan omassa puhelimessasi',
    ],
  },
  {
    id: 'chatbot',
    title: 'Chatbot, joka muuttaa kävijät liideiksi',
    description:
      'Suurin osa verkkosivujen kävijöistä lähtee ottamatta koskaan yhteyttä. Chatbot tarttuu heihin heti: vastaa hinnan, alueen ja aikataulun kysymyksiin, kysyy työn tiedot ja ottaa talteen puhelinnumeron, ennen kuin kävijä ehtii sulkea välilehden. Se tekee töitä myös keskellä yötä, kun sinä nukut, ja antaa sinulle valmiiksi esikarsittuja yhteydenottoja, ei tyhjiä kyselyitä.',
    icon: Bot,
    continuousAnimation: { y: [0, -4, 0] },
    continuousTransition: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' as const, delay: 0.4 },
    features: [
      'Vastaa hinta-, alue- ja aikataulukysymyksiin heti, 24/7',
      'Ottaa talteen puhelinnumeron ja työn tiedot',
      'Karsii uteliaat ja ohjaa oikeat liidit kalenteriisi',
      'Räätälöity yrityksesi palveluilla ja äänellä',
    ],
  },
  {
    id: 'speed-to-lead',
    title: 'Speed-to-lead ja liidien hallinta',
    description:
      'Tutkimusten mukaan ensimmäisenä vastannut tekijä voittaa valtaosan kaupoista, ja minuuteissa reagointi moninkertaistaa kaupan todennäköisyyden tunteihin verrattuna. Rakennan järjestelmän, joka hälyttää uudesta liidistä heti ja kerää kaikki yhteydenotot (puhelut, lomakkeet, sähköpostit) yhteen näkymään, jossa mikään ei jää roikkumaan.',
    icon: Gauge,
    continuousAnimation: { rotate: [0, 4, -4, 0] },
    continuousTransition: { duration: 8, repeat: Infinity, ease: 'easeInOut' as const, delay: 0.2 },
    features: [
      'Hälytys uudesta liidistä heti puhelimeesi',
      'Kaikki liidit yhdessä putkessa: puhelut, lomakkeet, sähköpostit',
      'Automaattiset muistutukset, ettei yksikään yhteydenotto unohdu',
      'Selkeä tilanne: kuka on hoidettu, kuka odottaa',
    ],
  },
  {
    id: 'heratys',
    title: 'Liidien herätys: kuolleet liidit takaisin',
    description:
      'CRM:ssäsi ja sähköpostissasi makaa rahaa: vanhoja tarjouspyyntöjä, joihin ei koskaan palattu, ja asiakkaita, jotka eivät vastanneet. Herätys-automaatio ottaa heihin uudelleen yhteyttä ajoitetuilla, henkilökohtaisen kuuloisilla viesteillä ja ohjaa kiinnostuneet takaisin kalenteriisi. Vanhasta listasta tulee uusia töitä, ilman että nostat puhelinta.',
    icon: BellRing,
    continuousAnimation: { rotate: [0, 8, -8, 0] },
    continuousTransition: { duration: 5, repeat: Infinity, ease: 'easeInOut' as const, delay: 0.8 },
    features: [
      'Vanhat tarjouspyynnöt ja liidit aktivoidaan uudelleen',
      'Ajoitetut, henkilökohtaisen kuuloiset viestisarjat',
      'Kiinnostuneet ohjautuvat suoraan kalenteriisi',
      'Uutta kauppaa listasta, joka oli jo kuollut',
    ],
  },
];

const phases = [
  {
    step: '01',
    title: 'Kartoitus videopalaverissa',
    desc: '30 minuutin palaveri, jossa katsotaan mistä liidit vuotavat: vastaamattomat puhelut, hitaat vastaukset, CRM:ään unohtuneet tarjouspyynnöt. Saat selkeän kuvan, et myyntipuhetta.',
    detail: 'Kesto noin 30 min videolla. Et tarvitse mitään valmiiksi, riittää että kerrot miten liidit nyt tulevat.',
  },
  {
    step: '02',
    title: 'Suunnitelma ja MVP',
    desc: 'Piirrän liidipolkusi ja rakennan toimivan pilotin nopeasti. Usein SoittoVahti on livenä numerossasi jo päivissä, jotta näet hyödyn ennen kuin maksat täydestä.',
    detail: 'Tyypillisesti SoittoVahti on testattavissa omassa numerossasi muutamassa päivässä.',
  },
  {
    step: '03',
    title: 'Käyttöönotto ja integraatiot',
    desc: 'Kytken puhelimen, lomakkeet ja kalenterin tai CRM:n yhteen. Tekstiviestit, hälytykset ja speed-to-lead toimivat tuotannossa, ilman että sinun tarvitsee opetella mitään.',
    detail: 'Kytken puhelimen, lomakkeet ja kalenterin tai CRM:n yhteen putkeen. Sinun ei tarvitse opetella uutta työkalua.',
  },
  {
    step: '04',
    title: 'Optimointi ja raportointi',
    desc: 'Mittaan vastausajat, pelastetut puhelut ja varatut työt. Hiomme järjestelmää kuukausittain, jotta jokaisesta liidistä otetaan enemmän irti.',
    detail: 'Näet kuukausittain konkreettisesti: vastausajat, pelastetut puhelut ja kalenteriin varatut työt.',
  },
];

/** Concrete before/after mini-story shown inside the SoittoVahti "Esimerkki" dialog. */
function SoittoVahtiStory() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-center gap-2 mb-3 text-white/80">
          <PhoneMissed className="w-4 h-4 text-brand-cyan shrink-0" />
          <span className="text-sm font-semibold uppercase tracking-wide">Ilman SoittoVahtia</span>
        </div>
        <p className="text-sm md:text-base leading-relaxed">
          Olet polvillasi kytkemässä lämmityskaivoa, kädet täynnä. Tuntematon numero soittaa kahdesti
          ja vaikenee. Illalla muistat soittaa takaisin, mutta asiakas vastaa lyhyesti: "Kiitos, saatiin
          jo toinen tekijä." Hän ei jäänyt odottamaan, koska joku muu vastasi ensin.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden />

      <div className="rounded-2xl border border-brand-cyan/25 bg-brand-cyan/[0.06] p-5">
        <div className="flex items-center gap-2 mb-3 text-white">
          <PhoneOutgoing className="w-4 h-4 text-brand-cyan shrink-0" />
          <span className="text-sm font-semibold uppercase tracking-wide">SoittoVahdin kanssa</span>
        </div>
        <p className="text-sm md:text-base leading-relaxed">
          Sama puhelu jää vastaamatta, mutta sekunneissa asiakkaan puhelimeen kilahtaa viesti:
          "Hei, tässä Rakennus Aalto. Emme päässeet juuri nyt vastaamaan, mutta autamme mielellämme.
          Mistä on kyse?" Asiakas kertoo työnsä tekstillä, sinä vastaat tauolla, ja keikka on sinun.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden />

      <p className="text-sm text-brand-gray">
        Ero ei ole tekniikassa vaan ajassa. Asiakas valitsee sen, joka vastaa ensimmäisenä, ja viesti
        lähtee silloinkin kun sinä et ehdi.
      </p>

      <button
        type="button"
        {...calBookingProps}
        className="group inline-flex w-full items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-cyan text-black font-bold hover:bg-white hover:shadow-[0_0_24px_rgba(16,185,129,0.4)] transition-all duration-300"
      >
        Varaa ilmainen kartoitus
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}

export function Services() {
  usePageMeta({
    title: 'Palvelut: verkkosivut, chatbot, SoittoVahti ja speed-to-lead',
    description:
      'Verkkosivut, chatbot, vastaamattomien puheluiden SoittoVahti, speed-to-lead ja liidien herätys rakennus-, LVI- ja sähköalan pk-yrityksille. Yksikään liidi ei jää kylmäksi.',
  });

  const reduce = useReducedMotion();

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
            title={<>Viisi palvelua, yksi lupaus: <span className="text-gradient">yksikään liidi ei jää kylmäksi</span></>}
            subtitle="Verkkosivut ja chatbot keräävät liidit, SoittoVahti pelastaa vastaamattomat puhelut, speed-to-lead vastaa ensimmäisenä ja herätys-automaatio herättää vanhat liidit. Yhdessä ne muodostavat koneiston, joka ei päästä asiakasta käsistä."
          />
        </div>

        {/* Services Grid */}
        <GlowGrid className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.08} className="h-full">
              <motion.div
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="h-full"
              >
              <GlowCard className="border-beam shadow-pop p-8 md:p-12 rounded-3xl transition-colors duration-500 group h-full">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan opacity-[0.05] blur-[90px] group-hover:opacity-[0.12] transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center mb-8">
                    <motion.div
                      animate={service.continuousAnimation}
                      transition={service.continuousTransition}
                      className="flex items-center justify-center w-full h-full"
                    >
                      <service.icon className="w-7 h-7 text-brand-cyan" />
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
                      Varaa ilmainen kartoitus
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    <Link
                      to="/yhteystiedot#laheta-viesti"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white/70 font-medium hover:bg-white/5 hover:text-white transition-all duration-300"
                    >
                      Kysy lisää
                    </Link>
                  </div>

                  {service.id === 'soittovahti' && (
                    <div className="mt-5 pt-5 border-t border-white/10">
                      <Dialog
                        trigger={
                          <button
                            type="button"
                            className="group/ex inline-flex items-center gap-2 text-sm font-medium text-brand-gray hover:text-brand-cyan transition-colors"
                          >
                            <PlayCircle className="w-4 h-4 text-brand-cyan" />
                            Esimerkki: näin se toimii käytännössä
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/ex:opacity-100 group-hover/ex:translate-x-0 transition-all" />
                          </button>
                        }
                        title="Vastaamaton puhelu: menetetty vs. pelastettu"
                        description="Sama tilanne työmaalla, kaksi eri lopputulosta."
                      >
                        <SoittoVahtiStory />
                      </Dialog>
                    </div>
                  )}
                </div>
              </GlowCard>
              </motion.div>
            </Reveal>
          ))}
        </GlowGrid>

        {/* Kinetic oversized statement band, full-bleed */}
        <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen mb-24 md:mb-28 py-10 md:py-14 overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent" />
          <KineticText text="VERKKOSIVUT · SOITTOVAHTI · CHATBOT · SPEED-TO-LEAD · LIIDIEN HERÄTYS · " duration={38} />
        </div>

        {/* Process Section */}
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-16">
            <SectionHeading
              title={<>Näin pääset <span className="text-gradient">liikkeelle</span></>}
              subtitle="Läpinäkyvä, kevyt prosessi. Näet hyödyn jo pilottivaiheessa, et vasta kuukausien päästä."
            />
          </div>

          <div ref={timelineRef} className="relative">
            {/* Track */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />
            {/* Scroll-linked fill */}
            <motion.div
              style={{ scaleY: lineScale }}
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-brand-cyan via-brand-purple to-brand-cyan md:-translate-x-1/2 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
            />

            {phases.map((phase, i) => (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col md:flex-row items-center gap-8 mb-16 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="group/badge w-16 h-16 rounded-full bg-brand-bg border-2 border-brand-cyan flex items-center justify-center text-xl font-bold text-brand-cyan z-10 shrink-0 absolute left-0 md:relative md:left-auto shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_28px_rgba(16,185,129,0.55)] transition-shadow duration-300">
                  <Tooltip content={phase.detail}>
                    <span className="cursor-help leading-none transition-transform duration-300 group-hover/badge:scale-110">{phase.step}</span>
                  </Tooltip>
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
          <div className="text-center glass-card p-12 rounded-3xl border border-brand-cyan/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/10 to-brand-purple/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Mikä näistä tukkisi sinun pahimman vuotokohtasi?</h2>
              <p className="text-xl text-brand-gray mb-10 max-w-2xl mx-auto">
                Et ole varma mistä aloittaa? Varaa ilmainen 30 minuutin kartoitus. Käymme läpi, mihin liidit hukkuvat ja mistä saat nopeimmin lisää töitä, ilman sitoutumista.
              </p>
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
        </Reveal>
      </div>
    </div>
  );
}
