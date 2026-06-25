import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, FileText, Cookie, Mail } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Reveal } from '../components/ui/Reveal';
import { Aurora } from '../components/ui/Aurora';
import { usePageMeta } from '../hooks/usePageMeta';

/* ----------------------------- Shared shell ----------------------------- */

interface LegalShellProps {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  updated: string;
  metaTitle: string;
  metaDescription: string;
  children: ReactNode;
}

function LegalShell({ eyebrow, title, intro, updated, metaTitle, metaDescription, children }: LegalShellProps) {
  usePageMeta({ title: metaTitle, description: metaDescription });
  return (
    <div className="pt-32 pb-20 min-h-screen relative overflow-hidden">
      <Aurora className="opacity-40" />
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-3xl">
        {/* Header */}
        <div className="mb-12 flex justify-center text-center">
          <SectionHeading as="h1" eyebrow={eyebrow} title={title} subtitle={intro} />
        </div>

        <Reveal>
          <div className="flex justify-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-brand-gray text-xs font-mono uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Päivitetty {updated}
            </span>
          </div>
        </Reveal>

        {/* Content */}
        <Reveal delay={0.05}>
          <article className="glass-card gloss rounded-2xl border border-white/10 p-8 md:p-12 shadow-premium space-y-10">
            {children}
          </article>
        </Reveal>

        {/* Cross-links + CTA */}
        <Reveal delay={0.1}>
          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            {[
              { to: '/tietosuoja', icon: ShieldCheck, label: 'Tietosuojaseloste' },
              { to: '/kayttoehdot', icon: FileText, label: 'Käyttöehdot' },
              { to: '/evasteet', icon: Cookie, label: 'Evästekäytännöt' },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="group glass-card border-gradient-hover rounded-2xl p-5 flex items-center gap-3 text-sm text-brand-gray hover:text-white transition-colors"
              >
                <l.icon className="w-5 h-5 text-brand-cyan shrink-0" />
                <span className="font-medium">{l.label}</span>
                <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 text-center glass-card rounded-2xl border border-brand-cyan/20 p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/10 to-brand-purple/10 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 text-white">Kysyttävää tietosuojasta tai ehdoista?</h2>
              <p className="text-brand-gray mb-8 max-w-xl mx-auto">
                Vastaan jokaiseen tiedusteluun henkilökohtaisesti 24 tunnin sisällä. Läpinäkyvyys ei ole markkinointilause, se on toimintatapani.
              </p>
              <Link
                to="/yhteystiedot"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-brand-cyan text-brand-bg font-bold hover:bg-white hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-[1.03] active:scale-95 transition-all duration-300"
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

/* ----------------------------- Prose helpers ----------------------------- */

function Section({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="space-y-4 scroll-mt-32">
      <h2 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight">{title}</h2>
      <div className="space-y-4 text-brand-gray leading-relaxed">{children}</div>
    </section>
  );
}

function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-cyan shrink-0" />
          <span className="text-brand-gray">{item}</span>
        </li>
      ))}
    </ul>
  );
}

const REKISTERINPITAJA = (
  <span className="text-white/90">
    ClarityAI / Heikki Niemimäki, Oulu, Suomi · <a href="mailto:clarity.ai@outlook.com" className="text-brand-cyan link-underline">clarity.ai@outlook.com</a>
  </span>
);

/* ----------------------------- Privacy page ----------------------------- */

export function Privacy() {
  return (
    <LegalShell
      eyebrow="Tietosuoja"
      title={<>Tietosuoja<span className="text-gradient">seloste</span></>}
      intro="Käsittelen henkilötietoja vastuullisesti, läpinäkyvästi ja EU:n yleisen tietosuoja-asetuksen (GDPR) mukaisesti. Tässä selosteessa kerron tarkalleen, mitä tietoja kerään, miksi ja miten suojaan ne."
      updated="15.6.2026"
      metaTitle="Tietosuojaseloste"
      metaDescription="ClarityAI:n tietosuojaseloste: mitä henkilötietoja kerätään, miksi ja miten ne suojataan GDPR:n mukaisesti. Rekisteröidyn oikeudet ja yhteystiedot."
    >
      <Section id="rekisterinpitaja" title="1. Rekisterinpitäjä">
        <p>{REKISTERINPITAJA}</p>
        <p>Vastaan kaikkiin tietosuojaa koskeviin tiedusteluihin henkilökohtaisesti 24 tunnin sisällä.</p>
      </Section>

      <Section id="tiedot" title="2. Mitä tietoja kerään">
        <p>Kerään vain ne tiedot, jotka ovat välttämättömiä yhteydenpitoon ja palvelun tuottamiseen. Tyypillisesti nämä ovat:</p>
        <List
          items={[
            <>Yhteydenottolomakkeen tiedot: <span className="text-white/90">nimi, sähköposti, yrityksen nimi, puhelinnumero ja viestisi sisältö.</span></>,
            <>Ajanvarauksen tiedot, kun varaat konsultaation (käsitellään Cal.com-palvelussa).</>,
            <>Tekniset lokitiedot, kuten IP-osoite ja selaintyyppi, palvelun tietoturvan varmistamiseksi.</>,
          ]}
        />
        <p>En kerää arkaluonteisia henkilötietoja enkä myy tietojasi koskaan kolmansille osapuolille.</p>
      </Section>

      <Section id="kayttotarkoitus" title="3. Mihin tietoja käytetään">
        <List
          items={[
            'Yhteydenottoihin vastaaminen ja tarjousten laatiminen.',
            'Sovittujen palveluiden toteuttaminen ja ylläpito.',
            'Ajanvarausten hallinta ja muistutukset.',
            'Lakisääteisten velvoitteiden, kuten kirjanpidon, täyttäminen.',
          ]}
        />
        <p>Käsittelyn oikeusperusteena on suostumuksesi, sopimuksen täytäntöönpano tai oikeutettu etuni vastata liiketoimintatiedusteluihin.</p>
      </Section>

      <Section id="palvelut" title="4. Käytetyt kolmannen osapuolen palvelut">
        <p>Käytän luotettavia, GDPR-yhteensopivia työkaluja tietojen käsittelyyn:</p>
        <List
          items={[
            <><span className="text-white/90">Make.com & Formspree</span>: yhteydenotto- ja pilottilomakkeiden välitys ja automaatio.</>,
            <><span className="text-white/90">Cal.com</span>: ajanvaraukset ja kalenterihallinta.</>,
            <><span className="text-white/90">Sähköposti­palveluntarjoaja (Microsoft Outlook)</span>: viestintä.</>,
          ]}
        />
        <p>Jokainen palveluntarjoaja käsittelee tietoja oman tietosuojaselosteensa ja kanssani solmitun käsittelysopimuksen mukaisesti.</p>
      </Section>

      <Section id="sailytys" title="5. Tietojen säilytys ja suojaus">
        <p>Säilytän henkilötietoja vain niin kauan kuin on tarpeen käyttötarkoituksen kannalta tai lain edellyttämän ajan. Yhteydenottojen tiedot poistetaan, kun niitä ei enää tarvita aktiiviseen asiakassuhteeseen.</p>
        <p>Tiedot suojataan teknisin ja organisatorisin toimenpitein: salatut yhteydet (SSL/TLS), pääsynhallinta ja säännöllinen tietoturvan arviointi.</p>
      </Section>

      <Section id="oikeudet" title="6. Rekisteröidyn oikeudet">
        <p>Sinulla on GDPR:n mukaiset oikeudet omiin tietoihisi:</p>
        <List
          items={[
            'Oikeus tarkastaa, mitä tietoja sinusta on tallennettu.',
            'Oikeus oikaista virheelliset tai puutteelliset tiedot.',
            'Oikeus tulla unohdetuksi eli pyytää tietojesi poistamista.',
            'Oikeus rajoittaa tai vastustaa käsittelyä sekä peruuttaa suostumus.',
            'Oikeus siirtää tiedot järjestelmästä toiseen.',
          ]}
        />
        <p>Voit käyttää oikeuksiasi ottamalla yhteyttä sähköpostitse. Sinulla on myös oikeus tehdä valitus tietosuojavaltuutetun toimistolle (tietosuoja.fi).</p>
      </Section>
    </LegalShell>
  );
}

/* ------------------------------ Terms page ------------------------------ */

export function Terms() {
  return (
    <LegalShell
      eyebrow="Ehdot"
      title={<>Käyttö<span className="text-gradient">ehdot</span></>}
      intro="Selkeät pelisäännöt, ei piilotettua pientä präntättyä. Nämä ehdot koskevat tämän verkkosivuston käyttöä sekä ClarityAI:n tarjoamia palveluita."
      updated="15.6.2026"
      metaTitle="Käyttöehdot"
      metaDescription="ClarityAI:n käyttöehdot: palvelun kuvaus, pilottiohjelman ehdot, immateriaalioikeudet, vastuunrajoitus ja sovellettava laki."
    >
      <Section id="palvelu" title="1. Palvelun kuvaus">
        <p>ClarityAI tarjoaa verkkosivujen toteutusta, chatbotteja sekä liidiautomaatioita (kuten vastaamattomien puheluiden tekstiviestiautomaatio, speed-to-lead -hälytykset ja liidien herätys) ensisijaisesti rakennus-, LVI- ja sähköalan pk-yrityksille. Palveluiden tarkka sisältö, aikataulu ja hinta sovitaan aina erikseen tarjouksessa tai sopimuksessa.</p>
      </Section>

      <Section id="vastuut" title="2. Vastuut ja palvelun käyttö">
        <List
          items={[
            'Sitoudun tuottamaan palvelut ammattitaidolla ja sovitun mukaisesti.',
            'Asiakas vastaa toimittamiensa tietojen oikeellisuudesta ja tarvittavista käyttöoikeuksista.',
            'Tämän sivuston sisältö on tarkoitettu yleiseksi informaatioksi, eikä se muodosta sitovaa tarjousta.',
          ]}
        />
      </Section>

      <Section id="pilotti" title="3. Pilottiohjelman ehdot">
        <p>Pilottiohjelma on rajattu tarjous, johon sovelletaan ilmoitettua kiinteää hintaa ja paikkamäärää. Pilotti ei sisällä pitkää sitoutumista: voit lopettaa palvelun ensimmäisen kuukauden jälkeen ilman lisäkuluja. Pilotin yhteydessä syntyvää työtä voidaan käyttää referenssinä, ellei toisin sovita.</p>
      </Section>

      <Section id="immateriaali" title="4. Immateriaalioikeudet">
        <p>Tämän verkkosivuston sisältö, ulkoasu ja koodi ovat ClarityAI:n omaisuutta tai käytetty luvalla. Asiakkaalle toteutettujen ratkaisujen oikeuksista sovitaan projektikohtaisesti. Et saa kopioida, jäljentää tai hyödyntää tämän sivuston sisältöä kaupallisesti ilman lupaa.</p>
      </Section>

      <Section id="vastuunrajoitus" title="5. Vastuunrajoitus">
        <p>Pyrin pitämään sivuston tiedot ajantasaisina ja virheettöminä, mutta en vastaa välillisistä vahingoista, jotka aiheutuvat sivuston tai sen kautta saatavan tiedon käytöstä. Vastuuni rajoittuu kulloinkin sovellettavan pakottavan lainsäädännön sallimaan enimmäismäärään.</p>
      </Section>

      <Section id="laki" title="6. Sovellettava laki">
        <p>Näihin ehtoihin ja palveluihin sovelletaan Suomen lakia. Mahdolliset erimielisyydet pyritään ratkaisemaan ensisijaisesti neuvottelemalla, ja viime kädessä Oulun käräjäoikeudessa.</p>
      </Section>
    </LegalShell>
  );
}

/* ----------------------------- Cookies page ----------------------------- */

export function Cookies() {
  return (
    <LegalShell
      eyebrow="Evästeet"
      title={<>Eväste<span className="text-gradient">käytännöt</span></>}
      intro="Pidän evästekäytännöt yhtä kevyinä kuin sivustoni latausnopeuden. Tässä kerron, mitä evästeitä käytetään ja miten voit hallita niitä."
      updated="15.6.2026"
      metaTitle="Evästekäytännöt"
      metaDescription="ClarityAI:n evästekäytännöt: mitä evästeitä sivustolla käytetään, kolmannen osapuolen evästeet (Cal.com) ja miten voit hallita niitä selaimessasi."
    >
      <Section id="mita" title="1. Mitä evästeet ovat">
        <p>Evästeet ovat pieniä tekstitiedostoja, jotka tallentuvat laitteellesi sivustolla vieraillessa. Ne auttavat sivustoa toimimaan sujuvasti ja mahdollistavat tiettyjen toimintojen, kuten ajanvarauksen, käytön.</p>
      </Section>

      <Section id="kaytetyt" title="2. Käyttämäni evästeet">
        <List
          items={[
            <><span className="text-white/90">Välttämättömät evästeet</span>: varmistavat sivuston perustoiminnan ja tietoturvan. Näitä ei voi kytkeä pois käytöstä.</>,
            <><span className="text-white/90">Toiminnalliset evästeet</span>: esimerkiksi ajanvarauksen (Cal.com) ja lomakkeiden toiminta sekä keskeneräisen hakemuksen tallennus selaimesi muistiin.</>,
          ]}
        />
        <p>En käytä mainos- tai seurantaevästeitä enkä profiloi kävijöitä markkinointitarkoituksiin.</p>
      </Section>

      <Section id="kolmannet" title="3. Kolmannen osapuolen evästeet">
        <p>Sivustolla upotettu Cal.com-ajanvaraus voi asettaa omia evästeitään palvelun toiminnan mahdollistamiseksi. Näiden käsittelyä ohjaa Cal.comin oma tietosuoja- ja evästekäytäntö.</p>
      </Section>

      <Section id="hallinta" title="4. Evästeiden hallinta">
        <p>Voit hallita ja poistaa evästeitä selaimesi asetuksista. Huomaa, että välttämättömien evästeiden estäminen voi heikentää sivuston toimintaa. Useimmat selaimet sallivat evästeiden eston tai poiston asetusvalikon kautta.</p>
        <p className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
          <span>Lisätietoja evästeistä ja tietojesi käsittelystä saat lukemalla <Link to="/tietosuoja" className="text-brand-cyan link-underline">tietosuojaselosteen</Link> tai olemalla yhteydessä suoraan minuun.</span>
        </p>
      </Section>
    </LegalShell>
  );
}
