import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Lightbulb, Zap, ArrowRight, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Reveal } from '../components/ui/Reveal';
import { GlowGrid, GlowCard } from '../components/ui/GlowCard';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { Aurora } from '../components/ui/Aurora';
import { usePageMeta } from '../hooks/usePageMeta';

export function About() {
  usePageMeta({
    title: 'Tietoa minusta — Heikki Niemimäki, tekoälyarkkitehti',
    description: 'ClarityAI:n takana on Heikki Niemimäki — tekoälyarkkitehti ja automaatiostrategi Oulusta. Erikoisalana rakennus-, LVI- ja sähköalan pk-yritysten tehostaminen tekoälyllä.',
  });

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
            title={<>Ihminen <span className="text-gradient">Tekoälyn Takana</span></>}
            subtitle="ClarityAI syntyi halusta tehdä monimutkaisesta teknologiasta ymmärrettävää ja tuottavaa. En piiloudu jargonin taakse — rakennan toimivia koneistoja, ja paras tekoäly on sellainen, jota et edes huomaa käyttäväsi."
          />
        </div>

        {/* Vision & Mission */}
        <GlowGrid className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <Reveal direction="left">
            <GlowCard className="shadow-pop p-12 rounded-[2.5rem] h-full">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-cyan to-blue-500 flex items-center justify-center mb-8 shadow-lg shadow-black/50">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-display font-bold mb-6 text-white">Missioni</h2>
              <p className="text-brand-gray text-lg leading-relaxed">
                Vapauttaa suomalaiset pk-yritykset manuaalisesta rutiinityöstä. Poistan tekniset esteet ja
                rakennan tekoälyratkaisut, jotka tuottavat mitattavaa tulosta — niin että sinä ja tiimisi
                voitte keskittyä siihen, mikä oikeasti laskuttaa.
              </p>
            </GlowCard>
          </Reveal>

          <Reveal direction="right">
            <GlowCard className="shadow-pop p-12 rounded-[2.5rem] h-full">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-purple to-pink-500 flex items-center justify-center mb-8 shadow-lg shadow-black/50">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-display font-bold mb-6 text-white">Visioni</h2>
              <p className="text-brand-gray text-lg leading-relaxed">
                Tulevaisuus, jossa tekoäly hoitaa toiston ja ihmiset tekevät merkityksellistä työtä.
                Haluan olla rakennus- ja palvelualan luotettavin kumppani eettisen, läpinäkyvän ja
                aidosti hyödyllisen tekoälyn käyttöönotossa.
              </p>
            </GlowCard>
          </Reveal>
        </GlowGrid>

        {/* Who am I Section */}
        <div className="mb-32">
          <div className="flex justify-center mb-16">
            <SectionHeading
              title={<>Kuka <span className="text-gradient">Minä Olen</span></>}
              subtitle="Yhdistän syvän teknisen osaamisen liiketoiminnan ymmärrykseen."
            />
          </div>

          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="glass-card p-8 md:p-12 rounded-[3rem] flex flex-col md:flex-row gap-12 items-center">
                <div ref={imageWrapRef} className="w-full md:w-1/2 relative">
                  <div className="relative overflow-hidden rounded-3xl aspect-[4/5]">
                    <motion.img
                      src="/oma-kuva.jpg"
                      alt="Profiilikuva"
                      style={{ y: imageY, scale: 1.15 }}
                      className="object-cover w-full h-full"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent opacity-60" />
                    <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 flex gap-3">
                    <a href="https://www.linkedin.com/in/heikki-niemimäki/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-brand-cyan flex items-center justify-center text-brand-bg hover:scale-110 transition-transform shadow-lg shadow-brand-cyan/20">
                      <Linkedin className="w-6 h-6" />
                    </a>
                  </div>
                </div>

                <div className="w-full md:w-1/2">
                  <h3 className="text-3xl font-bold text-white mb-2">Heikki Niemimäki</h3>
                  <p className="text-brand-cyan font-medium text-lg mb-6">Tekoälyarkkitehti & Automaatiostrategi</p>
                  <div className="space-y-4 text-brand-gray leading-relaxed">
                    <p>
                      Poistan manuaalisen rutiinityön yrityksestäsi, jotta sinä ja tiimisi voitte keskittyä "oikeisiin hommiin" – eli tuottavaan työhön ja laskuttamiseen.
                    </p>
                    <p>
                      Olen erikoistunut sähkö-, LVI-, rakennus- ja talotekniikka-alan yritysten tehostamiseen. Autan pk-yrityksiä kasvattamaan myyntiä ja tehostamaan asiakaspalvelua rakentamalla idioottivarmoja AI-automaatioita.
                    </p>
                    <p>
                      Rakennus- ja asennusala on täynnä firmoja, jotka hukkaavat kymmeniä tunteja viikossa paperisotaan, tarjousten kopiointiin ja tietojen siirtelyyn järjestelmästä toiseen. Se on silkkaa rahan polttamista.
                    </p>
                    <p>
                      Kylmä totuus on tämä: Tekoäly ei vie sinun töitäsi. Mutta kilpailijasi, joka omaksuu tekoälyn ja automatisoi rutiininsa, vie takuulla asiakkaasi ja työntekijäsi. Kaavoihin kangistuminen on nykypäivänä liiketoiminnallinen itsemurha.
                    </p>
                    <p>
                      En myy konsulttijargonia tai utopistista hypeä. Rakennan toimivia koneistoja. Vibe-koodaan verkkosivut lennosta, automatisoin tilausvahvistukset ja viritän integraatiot niin, että tiedot siirtyvät CRM:ään ja kalenteriin ilman yhtäkään ihmisen kosketusta.
                    </p>
                  </div>
                  <div className="mt-10">
                    <button
                      data-cal-namespace="konsultaattio"
                      data-cal-link="heikki-niemimaki-09cgi0/konsultaattio"
                      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-cyan text-brand-bg font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(0,245,255,0.3)]"
                    >
                      Varaa ilmainen kartoitus
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Focus stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 mt-8">
              {[
                { value: 10, suffix: '+ h', label: 'Säästöä viikossa' },
                { value: 3, suffix: ' pv', label: 'Toteutus jopa' },
                { value: 100, suffix: ' %', label: 'Räätälöity' },
              ].map((stat, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="glass-card rounded-2xl p-6 text-center border border-white/10">
                    <div className="text-3xl md:text-4xl font-display font-bold text-gradient mb-2">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-brand-gray text-xs md:text-sm">{stat.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <Reveal>
          <div className="glass-card rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center">Arvoni</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  { title: 'Läpinäkyvyys', desc: 'En piiloudu teknisen jargonin taakse. Selitän monimutkaiset asiat ymmärrettävästi ja olen avoin tekoälyn rajoitteista.' },
                  { title: 'Vaikuttavuus', desc: 'Keskityn ratkaisuihin, jotka tuottavat todellista, mitattavaa arvoa. En tee tekoälyä vain tekoälyn vuoksi.' },
                  { title: 'Vastuullisuus', desc: 'Kehitän eettistä tekoälyä, joka kunnioittaa yksityisyyttä, on puolueeton ja palvelee ihmiskuntaa kestävästi.' },
                ].map((value, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="text-center group">
                      <div className="w-20 h-20 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-brand-amber/40 group-hover:shadow-[0_0_24px_rgba(245,158,11,0.25)] transition-all duration-500">
                        <Zap className="w-8 h-8 text-brand-amber group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                      <p className="text-brand-gray leading-relaxed">{value.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Call to Action */}
        <Reveal className="mt-32 max-w-4xl mx-auto">
          <div className="text-center glass-card p-12 rounded-[3rem] border border-brand-cyan/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/10 to-brand-purple/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Haluatko kuulla lisää?</h2>
              <p className="text-xl text-brand-gray mb-10 max-w-2xl mx-auto">
                Ota yhteyttä, niin jutellaan siitä, miten voin auttaa yritystäsi hyödyntämään tekoälyä tehokkaasti ja vastuullisesti.
              </p>
              <Link
                to="/yhteystiedot"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-cyan text-black font-bold text-lg hover:bg-white hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] hover:scale-[1.03] active:scale-95 transition-all duration-300"
              >
                Ota yhteyttä
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
