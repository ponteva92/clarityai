import { motion } from 'framer-motion';
import { BrainCircuit, Code2, Database, LineChart, MessageSquare, Settings, ArrowRight, CheckCircle2, Users, Bot, GraduationCap, Workflow, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 'strategy',
    title: 'AI-Strategia & Konsultointi',
    description: 'Kartoitan yrityksesi tekoälypotentiaalin ja luon selkeän tiekartan sen hyödyntämiseen. En myy teknologiaa, vaan ratkaisen liiketoimintaongelmia.',
    icon: BrainCircuit,
    color: 'from-brand-cyan to-blue-500',
    iconAnimation: 'group-hover:scale-110 group-hover:rotate-6 transition-all duration-300',
    continuousAnimation: { y: [0, -3, 0], scale: [1, 1.02, 1] },
    continuousTransition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    features: ['Liiketoiminnan nykytila-analyysi', 'AI-kypsyysarviointi', 'Use case -tunnistus ja priorisointi', 'ROI-laskelmat ja business case'],
  },
  {
    id: 'chatbots',
    title: 'Räätälöidyt Chatbotit',
    description: 'Kehitän yrityksesi tarpeisiin räätälöityjä, älykkäitä chatbotteja. Paranna asiakaspalvelua ja tehosta sisäistä viestintää 24/7.',
    icon: Bot,
    color: 'from-brand-purple to-pink-500',
    iconAnimation: 'group-hover:-translate-y-2 group-hover:scale-110 transition-all duration-300',
    continuousAnimation: { y: [0, -4, 0] },
    continuousTransition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
    features: ['Asiakaspalvelubotit', 'Sisäiset HR- ja IT-botit', 'Integraatiot olemassa oleviin järjestelmiin', 'Monikielinen tuki'],
  },
  {
    id: 'courses',
    title: 'Alkeiskurssit',
    description: 'Koulutan tiimisi ymmärtämään ja hyödyntämään tekoälyä tehokkaasti arjessa. Selkeät ja käytännönläheiset kurssit kaikille taitotasoille.',
    icon: GraduationCap,
    color: 'from-brand-amber to-orange-500',
    iconAnimation: 'group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300',
    continuousAnimation: { rotate: [0, 3, -3, 0] },
    continuousTransition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 },
    features: ['Tekoälyn perusteet', 'ChatGPT tehokäyttö', 'Työkalujen soveltaminen arjessa', 'Räätälöidyt työpajat'],
  },
  {
    id: 'automation',
    title: 'Älykäs Prosessiautomaatio',
    description: 'Yhdistän perinteisen ohjelmistorobotiikan (RPA) tekoälyyn. Automatisoi monimutkaiset, päätöksentekoa vaativat prosessit.',
    icon: Workflow,
    color: 'from-emerald-400 to-teal-500',
    iconAnimation: 'group-hover:scale-110 transition-all duration-300',
    continuousAnimation: { rotate: [0, 5, -5, 0] },
    continuousTransition: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
    features: ['Laskujen ja kuittien automaattinen käsittely', 'Sähköpostien luokittelu ja reititys', 'Raportoinnin automatisointi', 'Järjestelmäintegraatiot'],
  },
  {
    id: 'dev',
    title: 'AI-Sovelluskehitys',
    description: 'Rakennan moderneja, tekoälyä hyödyntäviä verkkosovelluksia ja työkaluja yrityksesi sisäiseen tai asiakkaiden käyttöön.',
    icon: Terminal,
    color: 'from-rose-400 to-red-500',
    iconAnimation: 'group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300',
    continuousAnimation: { opacity: [1, 0.85, 1], scale: [1, 1.02, 1] },
    continuousTransition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
    features: ['Full-stack web-kehitys (React, Node.js)', 'API-suunnittelu ja toteutus', 'Pilviarkkitehtuuri (AWS, GCP, Azure)', 'Käyttöliittymäsuunnittelu (UI/UX)'],
  },
];

export function Services() {
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
            Palvelut, Jotka <span className="text-gradient">Muuttavat Pelin</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-brand-gray leading-relaxed"
          >
            Tarjoan kokonaisvaltaisia tekoälyratkaisuja strategiasta toteutukseen. 
            Jokainen projekti räätälöidään vastaamaan yrityksesi uniikkeja haasteita.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/10 hover:border-brand-cyan/50 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,245,255,0.2)] transition-all duration-500 group relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${service.color} opacity-10 blur-[80px] group-hover:opacity-30 group-hover:animate-pulse transition-opacity duration-500`} />
              
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
                  <Link 
                    to="/yhteystiedot" 
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-cyan/10 text-brand-cyan font-semibold hover:bg-brand-cyan hover:text-black transition-all duration-300 group/btn"
                  >
                    Varaa ilmainen konsultaatio
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    to="/yhteystiedot#laheta-viesti" 
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white/70 font-medium hover:bg-white/5 hover:text-white transition-all duration-300"
                  >
                    Kysy lisää
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6"><span className="text-gradient">Toimintamalli</span></h2>
            <p className="text-xl text-brand-gray">Läpinäkyvä ja ketterä prosessini takaa tulokset nopeasti ja riskittömästi.</p>
          </div>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-cyan/50 via-brand-purple/50 to-transparent md:-translate-x-1/2" />
            
            {[
              { step: '01', title: 'Kartoitus & Strategia', desc: 'Analysoin nykytilanteen ja tunnistan suurimman arvon tuottavat tekoälykohteet. Luon selkeän tiekartan.' },
              { step: '02', title: 'Proof of Concept (PoC)', desc: 'Rakennan nopean prototyypin varmistaakseni teknisen toteutettavuuden ja liiketoiminta-arvon ennen suuria investointeja.' },
              { step: '03', title: 'Kehitys & Integraatio', desc: 'Toteutan tuotantovalmiin ratkaisun ja integroin sen saumattomasti olemassa oleviin järjestelmiisi.' },
              { step: '04', title: 'Koulutus & Skaalaus', desc: 'Koulutan tiimisi käyttämään uusia työkaluja ja autan skaalaamaan ratkaisun koko organisaatioon.' },
            ].map((phase, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-center gap-8 mb-16 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="w-16 h-16 rounded-full bg-brand-bg border-2 border-brand-cyan flex items-center justify-center text-xl font-bold text-brand-cyan z-10 shrink-0 absolute left-0 md:relative md:left-auto">
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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 max-w-4xl mx-auto text-center glass-card p-12 rounded-[3rem] border border-brand-cyan/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/10 to-brand-purple/10" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Valmiina aloittamaan?</h2>
            <p className="text-xl text-brand-gray mb-10 max-w-2xl mx-auto">
              Varaa ilmainen 30 minuutin konsultaatio. Keskustellaan yrityksesi tarpeista ja katsotaan, miten tekoäly voisi auttaa juuri teitä.
            </p>
            <Link 
              to="/yhteystiedot" 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-cyan text-black font-bold text-lg hover:bg-white hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-all duration-300"
            >
              Varaa ilmainen konsultaatio
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
