import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { PhoneMissed, MessageSquare, CalendarCheck, RotateCcw, Phone, X, Check, HardHat, Wrench, Zap } from 'lucide-react';

/**
 * Speed-to-lead simulator. A single missed call races down two lanes in real
 * time: without SoittoVahti the stopwatch climbs and the customer defects to a
 * competitor; with it, an automatic SMS fires within seconds and the thread
 * books the job. Honest (it is a labelled, accelerated simulation), on-message,
 * and reduced-motion safe (jumps straight to the end state).
 */

type Phase = 'idle' | 'running' | 'done';

interface Industry {
  id: string;
  label: string;
  icon: typeof HardHat;
  job: string;
  value: string;
}

const INDUSTRIES: Industry[] = [
  { id: 'rakennus', label: 'Rakennus', icon: HardHat, job: 'kylpyhuoneremontista', value: '~3 200 €' },
  { id: 'lvi', label: 'LVI', icon: Wrench, job: 'putkiremontista', value: '~2 400 €' },
  { id: 'sahko', label: 'Sähkö', icon: Zap, job: 'sähkötöistä', value: '~1 800 €' },
];

// Real elapsed milliseconds at which each lane event becomes visible.
const B = { detect: 600, sms: 1200, reply: 2300, book: 3300, ok: 4100 };
const A = { reject: 300, wait: 1700, leave: 3100 };
const END = 4900;
// Where the "without" stopwatch lands (simulated 23:00) for the contrast punch.
const A_MAX_SIM = 1380;

function mmss(totalSec: number) {
  const m = Math.floor(totalSec / 60);
  const s = Math.floor(totalSec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function Bubble({
  side,
  children,
  delay = 0,
}: {
  side: 'in' | 'out';
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`flex ${side === 'out' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          side === 'out'
            ? 'bg-white/10 text-white rounded-br-md border border-white/10'
            : 'bg-brand-cyan/15 text-white rounded-bl-md border border-brand-cyan/25'
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
}

export function SpeedToLeadDemo() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('idle');
  const [elapsed, setElapsed] = useState(0); // real ms into the run
  const [industry, setIndustry] = useState<Industry>(INDUSTRIES[0]);

  const rafStart = useRef<number | null>(null);
  const rafId = useRef<number>(0);

  const stop = () => cancelAnimationFrame(rafId.current);

  useEffect(() => () => stop(), []);

  const run = () => {
    stop();
    if (reduce) {
      // No animation: present the finished comparison immediately.
      setElapsed(END);
      setPhase('done');
      return;
    }
    setElapsed(0);
    setPhase('running');
    rafStart.current = null;

    const tick = (now: number) => {
      if (rafStart.current === null) rafStart.current = now;
      const e = now - rafStart.current;
      if (e >= END) {
        setElapsed(END);
        setPhase('done');
        confetti({
          particleCount: 120,
          spread: 70,
          startVelocity: 38,
          origin: { x: 0.72, y: 0.5 },
          colors: ['#10b981', '#059669', '#fafafa'],
        });
        return;
      }
      setElapsed(e);
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
  };

  const active = phase !== 'idle';
  const done = phase === 'done';

  // Lane A stopwatch races toward the simulated 23:00; Lane B freezes at 0:08.
  const simA = active ? Math.round((Math.min(elapsed, END) / END) * A_MAX_SIM) : 0;
  const simB = active ? Math.min(8, Math.round((Math.min(elapsed, B.sms) / B.sms) * 8)) : 0;

  const show = (t: number) => active && elapsed >= t;

  return (
    <div className="glass-card gloss rounded-2xl border border-white/10 p-5 md:p-8 relative overflow-hidden">
      {/* Industry selector + run control */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">
        <div className="flex items-center gap-2" role="group" aria-label="Valitse toimiala">
          {INDUSTRIES.map((it) => {
            const selected = it.id === industry.id;
            return (
              <button
                key={it.id}
                type="button"
                disabled={phase === 'running'}
                onClick={() => setIndustry(it)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border transition-all duration-300 disabled:opacity-50 ${
                  selected
                    ? 'bg-brand-cyan/15 border-brand-cyan/40 text-brand-cyan'
                    : 'bg-white/5 border-white/10 text-brand-gray hover:text-white hover:border-white/20'
                }`}
              >
                <it.icon className="w-4 h-4" />
                {it.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={run}
          disabled={phase === 'running'}
          className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-brand-bg font-bold px-6 py-3.5 text-base hover:shadow-[0_0_30px_rgba(16,185,129,0.45)] disabled:opacity-70 transition-all duration-300 active:scale-[0.98]"
        >
          {phase === 'running' ? (
            <>
              <span className="w-4 h-4 border-2 border-brand-bg/40 border-t-brand-bg rounded-full animate-spin" />
              Simulaatio käynnissä
            </>
          ) : done ? (
            <>
              <RotateCcw className="w-5 h-5" />
              Aja uudelleen
            </>
          ) : (
            <>
              <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Simuloi vastaamaton puhelu
            </>
          )}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* LANE A — without SoittoVahti */}
        <div
          className={`relative rounded-3xl border bg-black/30 p-5 md:p-6 min-h-[360px] flex flex-col transition-colors duration-500 ${
            done ? 'border-red-500/40' : 'border-white/10'
          }`}
        >
          <div className="flex items-center justify-between mb-5">
            <span className="text-sm font-semibold text-brand-gray">Ilman SoittoVahtia</span>
            <span
              className={`font-mono text-sm tabular-nums px-2.5 py-1 rounded-lg border ${
                done ? 'text-red-300 border-red-500/30 bg-red-500/10' : 'text-brand-gray border-white/10 bg-white/5'
              }`}
            >
              {mmss(simA)}
            </span>
          </div>

          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3 text-white/90">
              <span className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <PhoneMissed className="w-5 h-5 text-red-400" />
              </span>
              <span className="text-sm">Saapuva puhelu uudelta asiakkaalta</span>
            </div>

            <AnimatePresence>
              {show(A.reject) && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 text-brand-gray pl-12"
                >
                  <span className="text-sm">Et ehtinyt vastata. Olit työmaalla.</span>
                </motion.div>
              )}
              {show(A.wait) && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 text-brand-gray pl-12"
                >
                  <span className="text-sm">Ei takaisinsoittoa. Ei viestiä.</span>
                </motion.div>
              )}
              {show(A.leave) && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 text-brand-gray pl-12"
                >
                  <span className="text-sm">Asiakas soittaa jo seuraavalle tekijälle.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {done && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 rounded-2xl bg-red-500/10 border border-red-500/30 p-4"
              >
                <div className="flex items-center gap-2 text-red-300 font-semibold">
                  <X className="w-4 h-4" />
                  Kauppa menetetty
                </div>
                <div className="text-sm text-brand-gray mt-1">0 €. Liidi meni kilpailijalle.</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* LANE B — with SoittoVahti */}
        <div
          className={`relative rounded-3xl border bg-black/30 p-5 md:p-6 min-h-[360px] flex flex-col transition-colors duration-500 ${
            done ? 'border-emerald-500/40' : 'border-brand-cyan/20'
          }`}
        >
          <div className="flex items-center justify-between mb-5">
            <span className="text-sm font-semibold text-brand-cyan">SoittoVahdin kanssa</span>
            <span
              className={`font-mono text-sm tabular-nums px-2.5 py-1 rounded-lg border ${
                show(B.sms)
                  ? 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10'
                  : 'text-brand-cyan border-brand-cyan/30 bg-brand-cyan/10'
              }`}
            >
              {mmss(simB)}
            </span>
          </div>

          <div className="space-y-2.5 flex-1">
            <div className="flex items-center gap-3 text-white/90">
              <span className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <PhoneMissed className="w-5 h-5 text-brand-cyan" />
              </span>
              <span className="text-sm">Sama vastaamaton puhelu.</span>
            </div>

            <AnimatePresence>
              {show(B.detect) && (
                <Bubble key="detect" side="in">
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-brand-cyan/90">
                    <MessageSquare className="w-3.5 h-3.5" /> Automaattinen viesti
                  </span>
                </Bubble>
              )}
              {show(B.sms) && (
                <Bubble key="sms" side="in">
                  Hei! Tässä {industry.label === 'LVI' ? 'LVI-Tahko' : industry.label === 'Sähkö' ? 'SähköVire' : 'Rakennus Aalto'}. Emme ehtineet
                  vastata, mutta hoidamme asian. Miten voimme auttaa?
                </Bubble>
              )}
              {show(B.reply) && (
                <Bubble key="reply" side="out">
                  Moi, kaipaisin tarjousta {industry.job}. Milloin ehtisitte?
                </Bubble>
              )}
              {show(B.book) && (
                <Bubble key="book" side="in">
                  Hienoa. Varasin teille soittoajan huomenna klo 9.10. Sopiiko?
                </Bubble>
              )}
              {show(B.ok) && (
                <Bubble key="ok" side="out">
                  Sopii hyvin, kiitos!
                </Bubble>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {done && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-4"
              >
                <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                  <Check className="w-4 h-4" />
                  Kauppa voitettu
                </div>
                <div className="text-sm text-brand-gray mt-1 inline-flex items-center gap-1.5">
                  <CalendarCheck className="w-3.5 h-3.5 text-emerald-300/80" />
                  Tapaaminen kalenterissa. Esimerkkityö {industry.value}.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-brand-gray/60">
        Kiihdytetty havainnesimulaatio. Luvut ovat esimerkkejä, eivät lupaus.
      </p>
    </div>
  );
}
