import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SiteHeader from './SiteHeader';
import OptimizedImage from '../OptimizedImage';
import TVHero from './TVHero';
import ColorLetters from './ColorLetters';

/**
 * The director front page, designed like the end of an old film:
 * a "Directed by" title card, then the films and contact as rolling credits, then THE END.
 */

interface Credit {
  role: string;
  /** Defaults to Coro Benavent */
  name?: string;
}

interface Film {
  title: string;
  /** Title design shown over the still. Text title is used if missing. */
  titleImage?: string;
  /** Turn a black title design white so it reads on the dark still. */
  invertTitle?: boolean;
  /** Title has a black background: blend it so only the white letters show. */
  blendTitle?: boolean;
  still: string;
  credits: Credit[];
  year?: string;
  status?: string;
  description: string;
  route: string;
  garoLink?: string;
}

const GARO_URL = 'https://www.garogirls.com';

// The order here is the order on the page.
const films: Film[] = [
  {
    title: 'Tonos',
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
    titleImage: '/director/garo/titles/look-around-coro.png',
    still: '/director/garo/look-around-still.jpg',
    credits: [{ role: 'Directed by' }],
    description:
      'A young boy guides three musicians who have lost their souls toward a dreamy 1920s concert finale.',
    route: '/director/look-around',
    garoLink: `${GARO_URL}/collections.html`,
  },
  {
    title: 'Palomitas sin maíz',
    titleImage: '/director/garo/titles/palomitas-coro.png',
    still: '/director/garo/palomitas-still.jpg',
    credits: [{ role: 'Co-directed by' }, { role: 'Co-produced by' }],
    description:
      'Shot on 16mm, a tribute to life and the memories that outlast it. Featured by Kodak, winner at British Young Arrows.',
    route: '/director/palomitas-sin-maiz',
    garoLink: `${GARO_URL}/collections.html`,
  },
  {
    title: 'Ragni',
    titleImage: '/director/garo/titles/ragni-coro.webp',
    blendTitle: true,
    still: '/director/garo/ragni-still.jpg',
    credits: [{ role: 'Creative producer' }],
    description: '#1 Most Watched Music Video of 2025 on Promonews. Nominated for British Young Arrows.',
    route: '/director/ragni',
    garoLink: `${GARO_URL}/collections.html`,
  },
  {
    title: 'SUPERGLUE',
    titleImage: '/director/garo/titles/superglue-coro.png',
    still: '/director/superglue.png',
    credits: [{ role: 'Directed by' }],
    description:
      'A music video asking whether fractured relationships can be repaired, through the central metaphor of a broken plate.',
    route: '/director/superglue',
  },
  {
    title: 'Padre. Hijo. Pastor',
    still: '/director/padre.jpg',
    credits: [{ role: "Director's assistant" }],
    status: 'In Post-Production',
    description:
      'Feature documentary. Fighting the tide of commercial farming, a Spanish shepherd embarks on a 700km journey.',
    route: '/director/padre-hijo-pastor',
  },
];

// Colours from old Technicolor credits
const CREAM = 'text-[#f5ecd7]';
const GOLD = 'text-[#f1d96b]';

const roman = (n: number) => {
  const map: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
    [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let out = '';
  for (const [v, s] of map) while (n >= v) { out += s; n -= v; }
  return out;
};

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

const smallCaps = `font-wide uppercase tracking-[0.25em] text-xs sm:text-sm ${CREAM} opacity-60`;

const FilmBlock: React.FC<{ film: Film }> = ({ film }) => (
  <article className="group">
    <Link
      to={film.route}
     
      className="block relative overflow-hidden bg-neutral-900 aspect-[16/9] sm:aspect-[2.2/1]"
    >
      <OptimizedImage
        src={film.still}
        width={1920}
        alt={`Still from ${film.title}`}
        className="fill-img absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors duration-700" />
      <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.6)]" />
      <div className="absolute inset-0 flex items-center justify-center p-8">
        {film.titleImage ? (
          <img
            src={film.titleImage}
            alt={film.title}
            className={`max-h-[38%] max-w-[55%] object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]${
              film.invertTitle ? ' invert' : ''
            }${film.blendTitle ? ' mix-blend-screen' : ''}`}
          />
        ) : (
          <h3 className={`font-display title-glow uppercase ${CREAM} text-4xl sm:text-6xl text-center tracking-[0.04em]`}>
            {film.title}
          </h3>
        )}
      </div>
    </Link>

    <div className="mt-10 sm:mt-12 flex flex-col items-center text-center">
      <h3 className={`font-display uppercase tracking-[0.08em] ${CREAM} text-2xl sm:text-4xl`}>
        {film.title}
        {(film.year || film.status) && (
          <span className="block mt-2 font-wide normal-case tracking-[0.2em] text-sm sm:text-base opacity-50">
            {[film.year, film.status].filter(Boolean).join(' · ')}
          </span>
        )}
      </h3>
      <div className="mt-6 w-full max-w-2xl space-y-2">
        {film.credits.map((c) => (
          <CreditLine key={c.role} role={c.role} name={c.name} />
        ))}
      </div>
      <p className={`mt-6 max-w-xl font-display italic ${CREAM} opacity-60 text-base sm:text-lg leading-relaxed`}>
        {film.description}
      </p>
      <div className="mt-6 flex gap-8">
        <Link to={film.route} className={`${smallCaps} hover:opacity-100 transition-opacity`}>
          View film →
        </Link>
        {film.garoLink && (
          <a
            href={film.garoLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`${smallCaps} hover:opacity-100 transition-opacity`}
          >
            GARO ↗
          </a>
        )}
      </div>
    </div>
  </article>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className={`font-display title-glow uppercase text-center tracking-[0.12em] ${CREAM} text-3xl sm:text-5xl`}>
    {children}
  </h2>
);

const Ornament = () => (
  <div className={`flex items-center justify-center gap-4 ${GOLD} opacity-60 my-6`} aria-hidden="true">
    <span className="h-px w-12 bg-current" />
    <span className="text-xs">◆</span>
    <span className="h-px w-12 bg-current" />
  </div>
);

/** The End, at the bottom of every director page */
const TheEnd: React.FC = () => (
  <footer className="min-h-[60svh] flex flex-col items-center justify-center text-center px-6 pb-16">
    <p className="font-end text-7xl sm:text-9xl leading-none" style={{ transform: 'rotate(-2deg)' }}>
      <ColorLetters text="The End" />
    </p>
    <div className="mt-16 flex items-center gap-6 opacity-50">
      <img src="/coro_text.png" alt="Coro" style={{ height: 22, width: 'auto' }} />
    </div>
    <p className={`mt-6 font-wide uppercase tracking-[0.2em] text-[10px] sm:text-xs ${CREAM} opacity-40 max-w-xs leading-relaxed`}>
      Copyright {roman(new Date().getFullYear())} by Coro Benavent.
      <br />
      All rights reserved.
    </p>
  </footer>
);

/** Shared frame for the Films, About and Contact pages */
const DirectorPageFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="film-grain" aria-hidden="true" />
      <SiteHeader />
      <main className="pt-20">{children}</main>
      <TheEnd />
    </div>
  );
};

/** Front page: just the TV. The menu on its screen leads to the other pages. */
const DirectorHome: React.FC = () => (
  <div className="bg-black text-white h-[100svh] overflow-hidden">
    {/* On laptops the menu is on the TV screen; on phones this bar sits above the TV */}
    <SiteHeader hideOverHero />
    <TVHero />
  </div>
);

export const FilmsPage: React.FC = () => (
  <DirectorPageFrame>
    <section className="max-w-6xl mx-auto px-6 sm:px-10 py-20 sm:py-28">
      <SectionTitle>Filmography</SectionTitle>
      <Ornament />
      <div className="mt-16 sm:mt-24 flex flex-col gap-28 sm:gap-40">
        {films.map((film) => (
          <FilmBlock key={film.title} film={film} />
        ))}
      </div>
    </section>
  </DirectorPageFrame>
);

export const AboutPage: React.FC = () => (
  <DirectorPageFrame>
    <section className="max-w-6xl mx-auto px-6 sm:px-10 py-20 sm:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
      <OptimizedImage
        src="/me/me1.jpg"
        width={800}
        alt="Coro Benavent"
        className="w-full aspect-[4/5] object-cover grayscale sepia-[0.15]"
      />
      <div>
        <h1 className={`font-display title-glow uppercase tracking-[0.12em] ${CREAM} text-3xl sm:text-5xl`}>About</h1>
        <div className={`mt-8 space-y-5 ${CREAM} opacity-80 leading-relaxed`}>
          <p>
            Trained as an actress at Corazza, Madrid, and Bristol Old Vic, I came to directing through the stories I couldn't find told elsewhere. I've directed crews of up to 50 people on micro budgets; my work has been featured by Kodak and Promonews, and nominated for British Young Arrows.
          </p>
          <p>
            In 2025, I co-founded{' '}
            <a href={GARO_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-white/30 hover:decoration-white">
              GARO
            </a>{' '}
            with Gabrielle Torreborre, a production company for auteur-driven cinema.
          </p>
        </div>
        <Link to="/more" className={`inline-block mt-10 ${smallCaps} hover:opacity-100 transition-opacity`}>
          Actress, music and more of me →
        </Link>
      </div>
    </section>
  </DirectorPageFrame>
);

export const ContactPage: React.FC = () => (
  <DirectorPageFrame>
    <section className="max-w-4xl mx-auto px-6 sm:px-10 py-20 sm:py-28">
      <SectionTitle>Contact</SectionTitle>
      <Ornament />
      <div className="mt-12 space-y-3">
        <CreditLine role="Email" name="coro@garo.studio" href="mailto:coro@garo.studio" />
        <CreditLine role="Instagram" name="@corobenavent" href="https://www.instagram.com/corobenavent/" external />
        <CreditLine role="YouTube" name="Coro Benavent" href="https://www.youtube.com/channel/UCBcovpzdJulXmepFhF_Rmow" external />
        <CreditLine role="Production company" name="GARO" href={GARO_URL} external />
      </div>
    </section>
  </DirectorPageFrame>
);

export default DirectorHome;
