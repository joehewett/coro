import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SiteHeader from './SiteHeader';
import OptimizedImage from '../OptimizedImage';
import TVHero from './TVHero';
import ColorLetters from './ColorLetters';
import { AboutContent } from '../MePage';
import GaroLogo from './GaroLogo';

/**
 * The director front page, designed like the end of an old film:
 * a "Directed by" title card, then the films and contact as rolling credits, then THE END.
 */

interface Credit {
  role: string;
  /** Defaults to Coro Benavent */
  name?: string;
}

export interface Film {
  title: string;
  /** Title design shown over the still. Text title is used if missing. */
  titleImage?: string;
  /** Turn a black title design white so it reads on the dark still. */
  invertTitle?: boolean;
  /** Title has a black background: blend it so only the white letters show. */
  blendTitle?: boolean;
  still: string;
  /** Coro's role. Not shown on the Films page for now; kept for the film's own page later. */
  role: string;
  /** Which heading the film sits under on the Films page */
  group: 'Films' | 'Music Videos' | 'Documentary';
  /** Make a title design bigger or smaller under the still (1 = normal) */
  titleScale?: number;
  credits: Credit[];
  year?: string;
  status?: string;
  description: string;
  route: string;
  garoLink?: string;
}

export const GARO_URL = 'https://www.garogirls.com';

// The order here is the order on the page.
export const films: Film[] = [
  {
    title: 'Tonos',
    group: 'Films',
    role: "Director & lead actress",
    titleImage: '/director/garo/titles/tonos.png',
    invertTitle: true,
    still: '/director/garo/tonos-1.jpg',
    credits: [{ role: 'Directed by' }, { role: 'Starring' }],
    year: '2026',
    description:
      'A short film about reclaiming your voice. Shot on 16mm, written by BAFTA-winning screenwriter Aleksandra Sykulak, starring Julio Peña.',
    route: '/director/tonos',
    garoLink: `${GARO_URL}/tonos.html`,
  },
  {
    title: 'Look Around',
    group: 'Music Videos',
    role: "Director",
    titleImage: '/director/garo/titles/look-around-coro-trim.png',
    still: '/director/garo/look-around-still.jpg',
    credits: [{ role: 'Directed by' }],
    description:
      'A young boy guides three musicians who have lost their souls toward a dreamy 1920s concert finale.',
    route: '/director/look-around',
    garoLink: `${GARO_URL}/collections.html`,
  },
  {
    title: 'Palomitas sin maíz',
    group: 'Music Videos',
    titleScale: 1.5,
    role: "Co-director & co-producer",
    titleImage: '/director/garo/titles/palomitas-coro-trim.png',
    still: '/director/garo/palomitas-still.jpg',
    credits: [{ role: 'Co-directed by' }, { role: 'Co-produced by' }],
    description:
      'Shot on 16mm, a tribute to life and the memories that outlast it. Featured by Kodak, winner at British Young Arrows.',
    route: '/director/palomitas-sin-maiz',
    garoLink: `${GARO_URL}/collections.html`,
  },
  {
    title: 'Ragni',
    group: 'Music Videos',
    role: "Creative producer",
    titleImage: '/director/garo/titles/ragni-coro-trim.jpg',
    blendTitle: true,
    still: '/director/garo/ragni-still.jpg',
    credits: [{ role: 'Creative producer' }],
    description: '#1 Most Watched Music Video of 2025 on Promonews. Nominated for British Young Arrows.',
    route: '/director/ragni',
    garoLink: `${GARO_URL}/collections.html`,
  },
  {
    title: 'SUPERGLUE',
    group: 'Music Videos',
    role: "Director",
    titleImage: '/director/garo/titles/superglue-coro-trim.png',
    still: '/director/superglue.png',
    credits: [{ role: 'Directed by' }],
    description:
      'A music video asking whether fractured relationships can be repaired, through the central metaphor of a broken plate.',
    route: '/director/superglue',
  },
  {
    title: 'Padre. Hijo. Pastor',
    group: 'Documentary',
    role: "Director's assistant",
    still: '/director/padre.jpg',
    credits: [{ role: "Director's assistant" }],
    description:
      'Feature documentary. Fighting the tide of commercial farming, a Spanish shepherd embarks on a 700km journey.',
    route: '/director/padre-hijo-pastor',
  },
];

// Colours from old Technicolor credits
const CREAM = 'text-[#f5ecd7]';
const GOLD = 'text-[#f1d96b]';

/** One line of credits: "Directed by ~ ~ ~ CORO BENAVENT" */
const CreditLine: React.FC<{ role: string; name?: string; href?: string; external?: boolean }> = ({
  role,
  name = 'Coro Benavent',
  href,
  external,
}) => {
  const nameEl = (
    <span className={`font-wide uppercase font-semibold tracking-[0.02em] sm:tracking-[0.06em] ${GOLD} break-words`}>{name}</span>
  );
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-baseline gap-2 sm:gap-5 text-[15px] sm:text-2xl leading-tight">
      <span className={`font-wide font-semibold text-right ${CREAM}`}>{role}</span>
      <span className={`font-wide ${GOLD} opacity-80 tracking-[0.15em] sm:tracking-[0.3em]`} aria-hidden="true">
        ~ ~
      </span>
      <span className="text-left min-w-0">
        {href ? (
          <a
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="hover:opacity-70 transition-opacity"
          >
            {nameEl}
          </a>
        ) : (
          nameEl
        )}
      </span>
    </div>
  );
};


/** One film on the Films page: a wide still with its title design, then title, year and role */
const FilmCard: React.FC<{ film: Film; featured?: boolean }> = ({ film, featured }) => (
  <Link to={film.route} className="film-card group block">
    {/* The featured film shows its full still; the rest share one widescreen shape */}
    {/* On hover only the picture grows; the title below stays put */}
    <div
      className={`relative overflow-hidden bg-neutral-900 transition-transform duration-500 ease-out group-hover:scale-[1.04]${
        featured ? '' : ' aspect-[16/9]'
      }`}
    >
      <OptimizedImage
        src={film.still}
        width={featured ? 1920 : 1200}
        alt={`Still from ${film.title}`}
        className={`${
          featured ? 'block w-full h-auto' : 'fill-img absolute inset-0 w-full h-full object-cover'
        }`}
      />
    </div>

    {/* Title design under the still, then role and year */}
    <div className="mt-5">
      {film.titleImage ? (
        <img
          src={film.titleImage}
          alt={film.title}
          className={`fill-img block w-auto max-w-[80%] object-contain object-left${film.invertTitle ? ' invert' : ''}${
            film.blendTitle ? ' mix-blend-screen' : ''
          }`}
          style={{
            height: featured
              ? `calc(clamp(84px, 10vw, 140px) * ${film.titleScale ?? 1})`
              : `calc(clamp(44px, 4.5vw, 64px) * ${film.titleScale ?? 1})`,
          }}
        />
      ) : (
        <h2 className="font-political text-white text-3xl sm:text-4xl">{film.title}</h2>
      )}
    </div>
  </Link>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className={`font-political text-center ${CREAM} text-4xl sm:text-6xl`}>
    {children}
  </h2>
);

/** The End, at the bottom of every director page */
const TheEnd: React.FC = () => (
  <footer className="min-h-[60svh] flex flex-col items-center justify-center text-center px-6 pb-16">
    <p className="font-end text-7xl sm:text-9xl leading-none" style={{ transform: 'rotate(-2deg)' }}>
      <ColorLetters text="The End" />
    </p>
    <p className={`mt-16 font-political text-sm sm:text-base ${CREAM} opacity-50`}>
      © {new Date().getFullYear()} Coro Benavent
    </p>
  </footer>
);

/** Shared frame for the Films, About and Contact pages */
export const DirectorPageFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="grow-links bg-black text-white min-h-screen">
      <div className="film-grain" aria-hidden="true" />
      <SiteHeader />
      <main className="pt-20">{children}</main>
      <TheEnd />
    </div>
  );
};

/** Front page: just the TV. The menu on its screen leads to the other pages. */
const DirectorHome: React.FC = () => {
  // The front page stays perfectly still: no scrolling or bouncing, even if you try.
  // Scrolling comes back as soon as you leave for another page.
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const before = [html.style.overflow, body.style.overflow, html.style.overscrollBehavior, body.style.overscrollBehavior];
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    html.style.overscrollBehavior = 'none';
    body.style.overscrollBehavior = 'none';
    window.scrollTo(0, 0);
    return () => {
      [html.style.overflow, body.style.overflow, html.style.overscrollBehavior, body.style.overscrollBehavior] = before;
    };
  }, []);

  return (
    <div className="grow-links fixed inset-0 bg-black text-white overflow-hidden touch-none">
      {/* On laptops the menu is on the TV screen; on phones this bar sits above the TV */}
      <SiteHeader hideOverHero />
      <TVHero />
    </div>
  );
};

/** "Founder of GARO": GARO's own logo and heading font, linking to their site */
const FounderOfGaro: React.FC = () => (
  <a
    href={GARO_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 text-white"
    aria-label="Founder of GARO"
  >
    <span className="font-garo text-base sm:text-xl">Founder of</span>
    <GaroLogo height="clamp(22px, 2.6vw, 34px)" />
  </a>
);

const GroupHeading: React.FC<{ children: React.ReactNode; center?: boolean }> = ({ children, center }) => (
  <h2 className={`font-political text-white text-4xl sm:text-6xl${center ? ' text-center' : ''}`}>{children}</h2>
);

export const FilmsPage: React.FC = () => {
  const inGroup = (g: Film['group']) => films.filter((f) => f.group === g);
  return (
    <DirectorPageFrame>
      <section className="max-w-7xl mx-auto px-6 sm:px-10 pt-4 sm:pt-6 pb-10 flex flex-col gap-24 sm:gap-32">
        {/* Films */}
        <div>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <h1 className="font-political text-white text-4xl sm:text-6xl">Films</h1>
            <FounderOfGaro />
          </div>
          <div className="mt-6 sm:mt-8 flex flex-col gap-14 sm:gap-20">
            {inGroup('Films').map((film, i) => (
              <div key={film.title} className="w-full md:w-[86%] mx-auto">
                <FilmCard film={film} featured={i === 0} />
              </div>
            ))}
          </div>
        </div>

        {/* Music videos */}
        <div>
          <GroupHeading>Music Videos</GroupHeading>
          <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-14 sm:gap-y-20">
            {inGroup('Music Videos').map((film) => (
              <FilmCard key={film.title} film={film} />
            ))}
          </div>
        </div>

        {/* Documentary: heading on the left like the others; the one film centred, same size as a music video card */}
        <div>
          <GroupHeading>Documentary</GroupHeading>
          <div className="mt-10 sm:mt-14 mx-auto w-full md:w-[calc(50%-1rem)] lg:w-[calc(50%-1.5rem)]">
            {inGroup('Documentary').map((film) => (
              <FilmCard key={film.title} film={film} />
            ))}
          </div>
        </div>
      </section>
    </DirectorPageFrame>
  );
};

/** About uses the Me page (photos and full bio), inside the director site's frame, with "More of me" at the end */
export const AboutPage: React.FC = () => (
  <DirectorPageFrame>
    <AboutContent
      after={
        <Link to="/more" className="block w-max mx-auto text-center">
          <span className="font-end text-3xl sm:text-4xl leading-none">
            <ColorLetters text="More of me" offset={1} />
          </span>
          <span className={`block mt-3 font-political text-base sm:text-lg ${CREAM} opacity-70`}>Actress · Music →</span>
        </Link>
      }
    />
  </DirectorPageFrame>
);

/** One contact line, like a film credit card: Label ........ value */
const ContactLine: React.FC<{ label: string; value: React.ReactNode; href: string; external?: boolean }> = ({
  label,
  value,
  href,
  external,
}) => (
  <a
    href={href}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    className="contact-line flex items-baseline gap-1.5 w-full hover:opacity-80 transition-opacity"
  >
    <span className="shrink-0">{label}</span>
    {/* the dots fill whatever space is left between the label and the value */}
    <span aria-hidden="true" className="flex-1 overflow-hidden whitespace-nowrap opacity-90 tracking-[0.12em]">
      {'.'.repeat(120)}
    </span>
    <span className="shrink-0">{value}</span>
  </a>
);

/** Contact, styled like the warm end-credits card Coro sent: brown film frame, glowing lettering, dotted lines */
export const ContactPage: React.FC = () => (
  <DirectorPageFrame>
    <section className="overflow-x-clip px-4 sm:px-10 py-10 sm:py-16">
      <div className="contact-frame relative mx-auto max-w-4xl rounded-[28px] sm:rounded-[44px] px-6 sm:px-16 py-16 sm:py-24">
        <div className="contact-text contact-roll mx-auto max-w-lg font-[Poppins,sans-serif] font-semibold text-[13px] sm:text-lg">
          <h1 className="text-center text-base sm:text-xl">Contact</h1>
          <div className="mt-6 sm:mt-8" />
          <div className="flex flex-col gap-3 sm:gap-4">
            <ContactLine label="Email" value="coro@garo.studio" href="mailto:coro@garo.studio" />
            <ContactLine label="Instagram" value="@corobenavent" href="https://www.instagram.com/corobenavent/" external />
            <ContactLine label="YouTube" value="Coro Benavent" href="https://www.youtube.com/channel/UCBcovpzdJulXmepFhF_Rmow" external />
            <ContactLine label="LinkedIn" value="Coro Benavent" href="https://www.linkedin.com/in/coro-benavent-30838519b/" external />
            <ContactLine label="Production company" value={<GaroLogo height="1.05em" className="-translate-y-[0.08em]" />} href={GARO_URL} external />
          </div>
        </div>
      </div>
    </section>
  </DirectorPageFrame>
);

export default DirectorHome;
