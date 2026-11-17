import React from 'react';
import { Link } from 'react-router-dom';
import SiteHeader from './SiteHeader';
import OptimizedImage from '../OptimizedImage';

interface Film {
  title: string;
  /** GARO title design, shown over the still. Text title is used if missing. */
  titleImage?: string;
  /** Turn a black title design white so it reads on the dark still. */
  invertTitle?: boolean;
  still: string;
  role: string;
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
    role: 'Director & lead actress',
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
    role: 'Director',
    description:
      'A young boy guides three musicians who have lost their souls toward a dreamy 1920s concert finale.',
    route: '/director/look-around',
    garoLink: `${GARO_URL}/collections.html`,
  },
  {
    title: 'Palomitas sin maíz',
    titleImage: '/director/garo/titles/palomitas-coro.png',
    still: '/director/garo/palomitas-still.jpg',
    role: 'Co-director & co-producer',
    description:
      'Shot on 16mm, a tribute to life and the memories that outlast it. Featured by Kodak, winner at British Young Arrows.',
    route: '/director/palomitas-sin-maiz',
    garoLink: `${GARO_URL}/collections.html`,
  },
  {
    title: 'Ragni',
    still: '/director/garo/ragni-still.jpg',
    role: 'Creative producer',
    description:
      '#1 Most Watched Music Video of 2025 on Promonews. Nominated for British Young Arrows.',
    route: '/director/ragni',
    garoLink: `${GARO_URL}/collections.html`,
  },
  {
    title: 'SUPERGLUE',
    titleImage: '/director/garo/titles/superglue-coro.png',
    still: '/director/superglue.png',
    role: 'Director',
    description:
      'A music video asking whether fractured relationships can be repaired, through the central metaphor of a broken plate.',
    route: '/director/superglue',
  },
  {
    title: 'Padre. Hijo. Pastor',
    still: '/director/padre.jpg',
    role: "Director's assistant",
    status: 'In Post-Production',
    description:
      'Feature documentary. Fighting the tide of commercial farming, a Spanish shepherd embarks on a 700km journey.',
    route: '/director/padre-hijo-pastor',
  },
];

const label = 'font-wide text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-white/50';

const FilmBlock: React.FC<{ film: Film; index: number }> = ({ film, index }) => (
  <article className="group">
    <Link to={film.route} data-cursor="Watch" className="block relative overflow-hidden bg-neutral-900 aspect-[16/9] sm:aspect-[2.2/1]">
      <OptimizedImage
        src={film.still}
        width={1920}
        alt={`Still from ${film.title}`}
        className="fill-img absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors duration-700" />
      <div className="absolute inset-0 flex items-center justify-center p-8">
        {film.titleImage ? (
          <img
            src={film.titleImage}
            alt={film.title}
            className={`max-h-[38%] max-w-[55%] object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]${film.invertTitle ? ' invert' : ''}`}
          />
        ) : (
          <h3 className="font-display text-white text-5xl sm:text-7xl text-center drop-shadow-lg">
            {film.title}
          </h3>
        )}
      </div>
    </Link>

    <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-[200px_1fr_auto] gap-3 md:gap-10 items-baseline">
      <p className={label}>
        {String(index + 1).padStart(2, '0')} · {film.role}
      </p>
      <div>
        <h3 className="font-display text-white text-2xl sm:text-3xl">
          {film.title}
          {film.year && <span className="text-white/40"> · {film.year}</span>}
          {film.status && <span className="text-white/40"> · {film.status}</span>}
        </h3>
        <p className="mt-2 text-white/60 text-sm leading-relaxed max-w-2xl">{film.description}</p>
      </div>
      <div className="flex gap-6 md:justify-end">
        <Link to={film.route} className={`${label} hover:text-white transition-colors`}>
          View film →
        </Link>
        {film.garoLink && (
          <a
            href={film.garoLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`${label} hover:text-white transition-colors`}
          >
            GARO ↗
          </a>
        )}
      </div>
    </div>
  </article>
);

const DirectorHome: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="relative h-[100svh] min-h-[560px] overflow-hidden">
        <OptimizedImage
          src="/director/garo/tonos-2.jpg"
          width={1920}
          alt="Still from Tonos"
          className="fill-img absolute inset-0 w-full h-full object-cover animate-[heroIn_2.4s_ease-out_both]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />
        <div className="absolute inset-x-0 bottom-0 max-w-7xl mx-auto px-6 sm:px-10 pb-16 sm:pb-24">
          <p className={label}>Film Director</p>
          <h1 className="font-display mt-5 text-6xl sm:text-8xl lg:text-[9rem] leading-[0.9]">
            Coro Benavent
          </h1>
          <p className="mt-6 max-w-xl text-white/70 text-sm sm:text-base leading-relaxed">
            Stories about women finding their voice. Shot on film, made with{' '}
            <a href={GARO_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-white/30 hover:decoration-white">
              GARO
            </a>
            .
          </p>
          <button
            onClick={() => document.getElementById('films')?.scrollIntoView({ behavior: 'smooth' })}
            className={`mt-10 ${label} hover:text-white transition-colors`}
          >
            See the films ↓
          </button>
        </div>
      </section>

      {/* Films */}
      <section id="films" className="max-w-7xl mx-auto px-6 sm:px-10 py-24 sm:py-32 scroll-mt-20">
        <div className="flex items-baseline justify-between mb-14 sm:mb-20">
          <h2 className={label}>Films</h2>
          <a href={GARO_URL} target="_blank" rel="noopener noreferrer" className={`${label} hover:text-white transition-colors`}>
            A GARO production ↗
          </a>
        </div>
        <div className="flex flex-col gap-24 sm:gap-36">
          {films.map((film, i) => (
            <FilmBlock key={film.title} film={film} index={i} />
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-white/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-24 sm:py-32 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <OptimizedImage
            src="/me/me1.jpg"
            width={800}
            alt="Coro Benavent"
            className="w-full aspect-[4/5] object-cover grayscale"
          />
          <div>
            <h2 className={label}>About</h2>
            <div className="mt-8 space-y-5 text-white/75 leading-relaxed">
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
            <Link to="/more" className={`inline-block mt-10 ${label} hover:text-white transition-colors`}>
              Actress, music and more of me →
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-white/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-24 sm:py-32">
          <h2 className={label}>Contact</h2>
          <a
            href="mailto:coro@garo.studio"
            className="font-display italic mt-8 block text-4xl sm:text-6xl hover:text-white/70 transition-colors break-words"
          >
            coro@garo.studio
          </a>
          <div className="mt-10 flex flex-wrap gap-8">
            <a href="https://www.instagram.com/corobenavent/" target="_blank" rel="noopener noreferrer" className={`${label} hover:text-white transition-colors`}>
              Instagram ↗
            </a>
            <a href="https://www.youtube.com/channel/UCBcovpzdJulXmepFhF_Rmow" target="_blank" rel="noopener noreferrer" className={`${label} hover:text-white transition-colors`}>
              YouTube ↗
            </a>
            <a href={GARO_URL} target="_blank" rel="noopener noreferrer" className={`${label} hover:text-white transition-colors`}>
              GARO ↗
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <img src="/coro_text.png" alt="Coro" className="opacity-60" style={{ height: 20, width: 'auto' }} />
          <p className="text-[11px] tracking-[0.2em] uppercase text-white/30">© {new Date().getFullYear()} Coro Benavent</p>
        </div>
      </footer>
    </div>
  );
};

export default DirectorHome;
