import { motion } from 'framer-motion';
import { Users, Target, Lightbulb, Zap, ArrowRight, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export function About() {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold mb-8"
          >
            Ihminen <span className="text-gradient">Tekoälyn Takana</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-brand-gray leading-relaxed"
          >
            ClarityAI syntyi halusta tehdä monimutkaisesta teknologiasta ymmärrettävää ja hyödyllistä. 
            Uskon, että paras tekoäly on sellainen, jota et edes huomaa käyttäväsi.
          </motion.p>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 rounded-[2.5rem] border border-white/10"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-cyan to-blue-500 flex items-center justify-center mb-8 shadow-lg shadow-black/50">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-display font-bold mb-6 text-white">Missioni</h2>
            <p className="text-brand-gray text-lg leading-relaxed">
              Autan suomalaisia yrityksiä hyödyntämään tekoälyn koko potentiaalin. 
              Tavoitteeni on poistaa tekniset esteet ja tehdä tekoälystä jokaisen organisaation tehokkain työkalu.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 rounded-[2.5rem] border border-white/10"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-purple to-pink-500 flex items-center justify-center mb-8 shadow-lg shadow-black/50">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-display font-bold mb-6 text-white">Visioni</h2>
            <p className="text-brand-gray text-lg leading-relaxed">
              Näen tulevaisuuden, jossa tekoäly vapauttaa ihmiset rutiineista luovaan ja merkitykselliseen työhön. 
              Haluan olla suunnannäyttäjä eettisen ja läpinäkyvän tekoälyn kehittämisessä.
            </p>
          </motion.div>
        </div>

        {/* Who am I Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Kuka <span className="text-gradient">Minä Olen</span></h2>
            <p className="text-xl text-brand-gray max-w-2xl mx-auto">
              Yhdistän syvän teknisen osaamisen liiketoiminnan ymmärrykseen.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:p-12 rounded-[3rem] flex flex-col md:flex-row gap-12 items-center"
            >
              <div className="w-full md:w-1/2 relative">
                <div className="relative overflow-hidden rounded-3xl aspect-[4/5]">
                  <img 
                    src="/oma-kuva.jpg" 
                    alt="Profiilikuva" 
                    className="object-cover w-full h-full"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent opacity-60" />
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
            </motion.div>
          </div>
        </div>

        {/* Values Section */}
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
                <div key={i} className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    <Zap className="w-8 h-8 text-brand-amber" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-brand-gray leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 max-w-4xl mx-auto text-center glass-card p-12 rounded-[3rem] border border-brand-cyan/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/10 to-brand-purple/10" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Haluatko kuulla lisää?</h2>
            <p className="text-xl text-brand-gray mb-10 max-w-2xl mx-auto">
              Ota yhteyttä, niin jutellaan siitä, miten voin auttaa yritystäsi hyödyntämään tekoälyä tehokkaasti ja vastuullisesti.
            </p>
            <Link 
              to="/yhteystiedot" 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-cyan text-black font-bold text-lg hover:bg-white hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-all duration-300"
            >
              Ota yhteyttä
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
