import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Target, Lightbulb, ArrowRight, Linkedin, ShieldCheck, TrendingUp, HardHat, Globe, MessageSquare, Bot, Gauge, BellRing, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Reveal } from '../components/ui/Reveal';
import { GlowGrid, GlowCard } from '../components/ui/GlowCard';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { Aurora } from '../components/ui/Aurora';
import { Tooltip } from '../components/ui/Tooltip';
import { Dialog } from '../components/ui/Dialog';
import { usePageMeta } from '../hooks/usePageMeta';
import { calBookingProps } from '../lib/cal';

const serviceOverview = [
  { icon: Globe, title: 'Verkkosivut', desc: 'Nopeat, vakuuttavat sivut, joilla on yksi tehtävä: muuttaa kävijä yhteydenotoksi.' },
  { icon: MessageSquare, title: 'SoittoVahti', desc: 'Vastaamaton puhelu muuttuu tekstiviestiksi sekunneissa, ennen kuin asiakas soittaa kilpailijalle.' },
  { icon: Bot, title: 'Chatbot', desc: 'Muuttaa verkkosivun kävijät liideiksi: vastaa kysymyksiin ja ottaa numeron talteen myös yöllä.' },
  { icon: Gauge, title: 'Speed-to-lead', desc: 'Hälytys jokaisesta liidistä ja kaikki yhteydenotot yhdessä näkymässä, jossa mikään ei jää roikkumaan.' },
  { icon: BellRing, title: 'Liidien herätys', desc: 'Vanhat tarjouspyynnöt ja kuolleet liidit herätetään takaisin eloon automaattisilla viesteillä.' },
];

const values = [
  { icon: ShieldCheck, title: 'Läpinäkyvyys', desc: 'Kerron hinnan ja rajat etukäteen. Ei konsulttijargonia, ei piilokuluja, ei pitkää sitoutumista.' },
  { icon: TrendingUp, title: 'Tulos ratkaisee', desc: 'Rakennan vain sitä, mikä tuo lisää töitä. Jos jokin ei tuota, se ei jää käyttöön.' },
  { icon: HardHat, title: 'Tekijöiden kieli', desc: 'Puhun samaa kieltä kuin asiakkaani. Ratkaisut tehdään työmaan, ei toimiston ehdoilla.' },
];

/** Expanded founder story shown in the "Lue koko tarina" dialog. */
function FounderStory() {
  return (
    <div className="space-y-5 text-sm md:text-base leading-relaxed">
      <p>
        Aloin katsoa rakennus-, LVI- ja sähköalan arkea läheltä, ja sama kuvio toistui joka paikassa.
        Tekijät ovat ammattilaisia, työn jälki on kunnossa ja asiakkaat tyytyväisiä. Silti kauppoja
        valuu jatkuvasti ohi, eikä syy ole hinta tai laatu. Syy on se, ettei kesken työn ehdi vastata.
      </p>
      <p>
        Puhelin soi katon harjalla, kaivannossa tai sähkökeskuksen ääressä. Soittoon ei voi vastata
        juuri sillä hetkellä, ja kun illalla vihdoin ehtii soittaa takaisin, asiakas on jo palkannut
        sen tekijän joka ehti ensin. Jokainen vastaamaton soitto on tarjouspyyntö, joka päätyy
        kilpailijalle. Se on hiljaista hukkaa, jota kukaan ei kirjaa mihinkään, mutta joka syö katteen.
      </p>
      <p>
        Siitä ClarityAI syntyi. En halunnut myydä tekoälyhypeä enkä konsulttikalvoja, vaan rakentaa
        koneiston joka ottaa jokaisen liidin kiinni puolestasi: vastaamaton puhelu muuttuu
        tekstiviestiksi sekunneissa, verkkosivujen kävijä ohjautuu yhteydenotoksi, ja vanhat
        tarjouspyynnöt herätetään takaisin eloon. Sinä keskityt työhön, kone pitää huolen ettei
        yksikään asiakas jää vastaamatta.
      </p>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden />

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

export function About() {
  usePageMeta({
    title: 'Tietoa minusta: Heikki Niemimäki',
    description: 'ClarityAI:n takana on Heikki Niemimäki Oulusta. Rakennan rakennus-, LVI- ja sähköalan yrityksille koneiston, joka ei päästä yhtäkään liidiä käsistä.',
  });

  const reduce = useReducedMotion();

  const imageWrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageWrapRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <div className="pt-32 pb-20 min-h-screen relative">
      <Aurora className="opacity-40" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="mb-24 flex justify-center">
          <SectionHeading
            as="h1"
            eyebrow="Tietoa minusta"
            title={<>Ihminen <span className="text-gradient">koneiston takana</span></>}
            subtitle="ClarityAI syntyi yhdestä havainnosta: pieni tekijä menettää kauppoja harvoin laadun takia, vaan siksi ettei ehdi vastata ajoissa. Minä rakennan koneiston, joka ottaa jokaisen liidin kiinni puolestasi."
          />
        </div>

        {/* Vision & Mission */}
        <GlowGrid className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <Reveal direction="left">
            <GlowCard className="border-beam shadow-pop p-12 rounded-3xl h-full">
              <div className="w-14 h-14 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center mb-8">
                <Target className="w-7 h-7 text-brand-cyan" />
              </div>
              <h2 className="text-3xl font-display font-bold mb-6 text-white">Missioni</h2>
              <p className="text-brand-gray text-lg leading-relaxed">
                Varmistaa, ettei yksikään rakennus-, LVI- tai sähköalan yritys menetä kauppaa hitaaseen
                vastaamiseen. Poistan tekniset esteet ja rakennan koneiston, joka ottaa jokaisen liidin
                kiinni, jotta sinä voit keskittyä itse työhön.
              </p>
            </GlowCard>
          </Reveal>

          <Reveal direction="right">
            <GlowCard className="border-beam shadow-pop p-12 rounded-3xl h-full">
              <div className="w-14 h-14 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center mb-8">
                <Lightbulb className="w-7 h-7 text-brand-cyan" />
              </div>
              <h2 className="text-3xl font-display font-bold mb-6 text-white">Visioni</h2>
              <p className="text-brand-gray text-lg leading-relaxed">
                Tulevaisuus, jossa pieni tekijä voittaa ison kilpailijan nopeudella, ei mainosbudjetilla.
                Haluan olla rakennus- ja palvelualan luotettavin kumppani siinä, että jokainen
                yhteydenotto otetaan kiinni ja muutetaan kaupaksi.
              </p>
            </GlowCard>
          </Reveal>
        </GlowGrid>

        {/* Who am I Section */}
        <div className="mb-32">
          <div className="flex justify-center mb-16">
            <SectionHeading
              title={<>Kuka <span className="text-gradient">minä olen</span></>}
              subtitle="Yhdistän teknisen osaamisen ja työmaan arjen ymmärryksen."
            />
          </div>

          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="glass-card p-8 md:p-12 rounded-3xl flex flex-col md:flex-row gap-12 items-center">
                <div ref={imageWrapRef} className="w-full md:w-1/2 relative">
                  <div className="relative overflow-hidden rounded-3xl aspect-[4/5]">
                    <motion.img
                      src="/oma-kuva.jpg"
                      alt="Heikki Niemimäki, ClarityAI:n perustaja"
                      style={{ y: imageY, scale: 1.15 }}
                      className="object-cover w-full h-full"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent opacity-60" />
                    <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 flex gap-3">
                    <a href="https://www.linkedin.com/in/heikki-niemimäki/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-brand-cyan flex items-center justify-center text-brand-bg hover:scale-110 transition-transform shadow-lg shadow-brand-cyan/20" aria-label="Heikki Niemimäki LinkedInissä">
                      <Linkedin className="w-6 h-6" />
                    </a>
                  </div>
                </div>

                <div className="w-full md:w-1/2">
                  <h3 className="text-3xl font-bold text-white mb-2">Heikki Niemimäki</h3>
                  <p className="text-brand-cyan font-medium text-lg mb-6">Automaatioiden rakentaja pk-yrityksille</p>
                  <div className="space-y-4 text-brand-gray leading-relaxed">
                    <p>
                      Poistan rakennus-, LVI- ja sähköalan yrityksiltä yhden kalleimman ongelman: menetetyt liidit.
                    </p>
                    <p>
                      Alalla puhelin soi kesken työn, eikä siihen ehdi vastata. Jokainen vastaamaton soitto on tarjouspyyntö, joka menee seuraavalle tekijälle. Se on rahaa, joka valuu hukkaan joka päivä, eikä kukaan edes huomaa sitä.
                    </p>
                    <p>
                      Kylmä totuus on tämä: asiakas valitsee sen tekijän, joka vastaa ensimmäisenä. Ei välttämättä parasta, vaan nopeinta. Minä huolehdin, että se nopein olet sinä, vaikka kätesi olisivat täynnä.
                    </p>
                    <p>
                      En myy konsulttijargonia enkä tekoälyhypeä. Vibe-koodaan verkkosivut, viritän automaatiot ja kytken integraatiot niin, että vastaamaton puhelu muuttuu tekstiviestiksi sekunneissa ja liidit päätyvät kalenteriisi ilman että nostat puhelinta.
                    </p>
                  </div>
                  <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <button
                      type="button"
                      {...calBookingProps}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-cyan text-brand-bg font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    >
                      Varaa ilmainen kartoitus
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <Dialog
                      trigger={
                        <button
                          type="button"
                          className="group/story inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/10 text-white/80 font-medium hover:bg-white/5 hover:text-white hover:border-brand-cyan/30 transition-all duration-300"
                        >
                          <BookOpen className="w-4 h-4 text-brand-cyan" />
                          Lue koko tarina
                        </button>
                      }
                      title="Miksi rakennan liidikoneistoa"
                      description="Tarina sen takana, miksi tekijat menettavat kauppoja, ja mita teen sille."
                    >
                      <FounderStory />
                    </Dialog>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Focus stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 mt-8">
              {[
                {
                  value: 8,
                  suffix: ' s',
                  label: 'Vastaamaton puhelu tekstiviestiksi',
                  tip: 'Vastaamatta jääneeseen numeroon lähtee automaattinen tekstiviesti sekunneissa, ympäri vuorokauden.',
                },
                {
                  value: 3,
                  suffix: ' pv',
                  label: 'Pilotti pystyssä',
                  tip: 'Usein SoittoVahti on testattavissa omassa numerossasi muutamassa päivässä, joten näet hyödyn nopeasti.',
                },
                {
                  value: 100,
                  suffix: ' %',
                  label: 'Räätälöity sinun arkeesi',
                  tip: 'Viestit, äänensävy ja integraatiot rakennetaan sinun yrityksesi ja työmaan ehdoilla, ei mallipohjasta.',
                },
              ].map((stat, i) => (
                <Reveal key={i} delay={i * 0.08} className="h-full">
                  <motion.div
                    whileHover={reduce ? undefined : { y: -4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="glass-card h-full rounded-2xl p-6 text-center border border-white/10 hover:border-brand-cyan/30 transition-colors duration-300"
                  >
                    <div className="text-3xl md:text-4xl font-display font-bold text-gradient mb-2">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <Tooltip content={stat.tip}>
                      <span className="cursor-help text-brand-gray text-xs md:text-sm underline decoration-dotted decoration-white/25 underline-offset-4 hover:decoration-brand-cyan/60 transition-colors">
                        {stat.label}
                      </span>
                    </Tooltip>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* What I build: service overview */}
        <div className="mb-32">
          <div className="flex justify-center mb-16">
            <SectionHeading
              eyebrow="Mitä rakennan"
              title={<>Yksi koneisto, viisi <span className="text-gradient">osaa</span></>}
              subtitle="Jokainen osa tukkii yhden kohdan, josta liidit yleensä vuotavat. Yhdessä ne pitävät putken tiiviinä päästä päähän."
            />
          </div>

          <GlowGrid className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {serviceOverview.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06} className="h-full">
                <motion.div
                  whileHover={reduce ? undefined : { y: -6 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className="h-full"
                >
                  <GlowCard className="h-full p-8 rounded-3xl group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:border-brand-cyan/40 group-hover:bg-brand-cyan/10 group-hover:scale-105 transition-all duration-300">
                      <s.icon className="w-7 h-7 text-brand-cyan" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-cyan transition-colors duration-300">{s.title}</h3>
                    <p className="text-brand-gray leading-relaxed text-sm md:text-base">{s.desc}</p>
                  </GlowCard>
                </motion.div>
              </Reveal>
            ))}
          </GlowGrid>

          <div className="flex justify-center mt-10">
            <Link
              to="/palvelut"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white/80 font-medium hover:bg-white/5 hover:text-white transition-all duration-300"
            >
              Lue palveluista tarkemmin
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Values Section */}
        <Reveal>
          <div className="glass-card rounded-3xl p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center">Arvoni</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {values.map((value, i) => (
                  <Reveal key={i} delay={i * 0.1} className="h-full">
                    <motion.div
                      whileHover={reduce ? undefined : { y: -6 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                      className="text-center group h-full"
                    >
                      <div className="w-20 h-20 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-brand-cyan/40 group-hover:shadow-[0_0_24px_rgba(16,185,129,0.25)] transition-all duration-500">
                        <value.icon className="w-8 h-8 text-brand-cyan group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                      <p className="text-brand-gray leading-relaxed">{value.desc}</p>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Call to Action */}
        <Reveal className="mt-32 max-w-4xl mx-auto">
          <div className="text-center glass-card p-12 rounded-3xl border border-brand-cyan/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/10 to-brand-purple/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Lasketaanko yhdessä, montako liidiä menetät nyt?</h2>
              <p className="text-xl text-brand-gray mb-10 max-w-2xl mx-auto">
                Varaa ilmainen kartoitus, niin käydään läpi mistä liidit vuotavat ja mistä saat nopeimmin lisää töitä.
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
