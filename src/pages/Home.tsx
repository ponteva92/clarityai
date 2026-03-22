import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Background3D } from '../components/3d/Background3D';
import { ArrowRight, BrainCircuit, BarChart3, MessageSquare, Zap, ShieldCheck, Globe, Users, ChevronRight, CheckCircle2, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
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
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32 px-6 md:px-12">
        <Background3D />
        
        <div className="container mx-auto relative z-10">
          <motion.div 
            style={{ y, opacity }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-brand-cyan/20 text-brand-cyan text-sm font-medium mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
              Seuraavan Sukupolven Tekoälyratkaisut
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[1.1] mb-8"
            >
              Tekoäly Joka <br className="hidden md:block" />
              <span className="text-gradient">Mullistaa</span> Liiketoimintasi
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-2xl text-brand-gray max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Autan suomalaisia yrityksiä hyödyntämään tekoälyn koko potentiaalin. 
              Kasvata tuottavuutta, optimoi prosessit ja luo uutta arvoa.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <button 
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
              </button>
              
              <Link 
                to="/yhteystiedot#laheta-viesti" 
                className="px-8 py-4 rounded-2xl glass hover:bg-white/10 border border-white/10 transition-all duration-300 font-semibold text-lg w-full sm:w-auto text-center flex items-center justify-center gap-2"
              >
                Ota yhteyttä
              </Link>
            </motion.div>
          </motion.div>
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

      {/* Interactive AI Showcase */}
      <section id="ai-showcase" className="py-32 relative z-10 bg-brand-bg">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Koe Tekoälyn Voima <span className="text-gradient">Juuri Nyt</span></h2>
            <p className="text-brand-gray text-lg">Testaa interaktiivisia demojamme ja näe, miten tekoäly voi ratkaista yrityksesi haasteita reaaliajassa.</p>
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
            <Link 
              to="/yhteystiedot" 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-cyan text-black font-bold text-lg hover:bg-white hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all duration-300"
            >
              Varaa ilmainen konsultaatio
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition Matrix */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Miksi Valita <span className="text-gradient">Minut</span>?</h2>
            <p className="text-brand-gray text-lg">Yhdistän syvän teknisen osaamisen liiketoiminnan ymmärrykseen. Tuloksena on ratkaisuja, jotka tuottavat mitattavaa arvoa.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Automaatio', desc: 'Vapauta tiimisi aikaa rutiineista luovaan ja strategiseen työhön.', icon: Zap, color: 'from-brand-cyan to-blue-500' },
              { title: 'Älykäs Analytiikka', desc: 'Muuta raakadata ymmärrettäviksi oivalluksiksi ja päätöksenteon tueksi.', icon: BarChart3, color: 'from-brand-purple to-pink-500' },
              { title: 'Skaalautuvuus', desc: 'Rakenna järjestelmiä, jotka kasvavat saumattomasti yrityksesi mukana.', icon: Globe, color: 'from-brand-amber to-orange-500' },
              { title: 'Tietoturva', desc: 'Yritystason tietoturva ja GDPR-yhteensopivuus sisäänrakennettuna.', icon: ShieldCheck, color: 'from-emerald-400 to-teal-500' },
              { title: 'Käyttäjäkokemus', desc: 'Intuitiiviset käyttöliittymät, joita tiimisi rakastaa käyttää.', icon: Users, color: 'from-blue-400 to-indigo-500' },
              { title: 'Jatkuva Kehitys', desc: 'Tekoälymallit oppivat ja kehittyvät jatkuvasti datasi pohjalta.', icon: BrainCircuit, color: 'from-rose-400 to-red-500' },
            ].map((feature, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(0,245,255,0.25)] hover:border-brand-cyan/40 transition-all duration-500 group relative overflow-hidden">
                {/* Pulsing glow background on hover */}
                <div className="absolute inset-0 bg-brand-cyan/5 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500 pointer-events-none" />
                
                <div className={`relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg shadow-black/50 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="relative z-10 text-xl font-bold mb-3 text-white group-hover:text-brand-cyan transition-colors">{feature.title}</h3>
                <p className="relative z-10 text-brand-gray leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="glass-card rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-cyan/20 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">Oletko Valmis <span className="text-gradient">Tulevaisuuteen?</span></h2>
              <p className="text-xl text-brand-gray mb-12">Varaa ilmainen 30 minuutin konsultaatio, niin kartoitetaan yrityksesi AI-potentiaali.</p>
              
              <button 
                data-cal-namespace="konsultaattio"
                data-cal-link="heikki-niemimaki-09cgi0/konsultaattio"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl bg-white text-brand-bg font-bold text-xl hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(0,245,255,0.3)]"
              >
                Varaa Aika Nyt
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
