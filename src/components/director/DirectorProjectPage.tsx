import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import OptimizedImage from '../OptimizedImage';
import { films, DirectorPageFrame } from './DirectorHome';

/**
 * One director film's own page, in the dark style of the rest of the site:
 * handwritten "Film Director", the still, the film's title design, Coro's role,
 * the story, the video, stills, and the credits rolling like real end credits.
 *
 * Takes the same details as the old ProjectPage, so each film file only swaps the component.
 * The title design and still order come from the films list in DirectorHome.tsx (matched by page address).
 */
interface Props {
  title: string;
  credits: Array<{ name: string; role: string; isHighlighted?: boolean }>;
  description: string;
  mainImage: string;
  additionalInfo?: string;
  youtubeUrl?: string;
  status?: string;
  stills?: string[];
  // Kept so the film files don't need changing; the dark page doesn't use them
  categoryImage?: string;
  categoryRoute?: string;
  categoryAlt?: string;
}

const CREAM = '#f5ecd7';

/** Turn web addresses in the text into links */
const withLinks = (text: string) =>
  text.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-4 decoration-white/30 hover:decoration-white break-words"
      >
        {part.replace(/^https?:\/\//, '')}
      </a>
    ) : (
      <span key={i}>{part}</span>
    )
  );

const DirectorProjectPage: React.FC<Props> = ({
  title,
  credits,
  description,
  mainImage,
  additionalInfo,
  youtubeUrl,
  status,
  stills,
}) => {
  const { pathname } = useLocation();
  // Match by the end of the address too, so /actress/palomitas-sin-maiz finds Palomitas
  const film = films.find((f) => f.route === pathname || pathname.endsWith(`/${f.route.split('/').pop()}`));
  const coro = credits.find((c) => c.isHighlighted);
  // Films Coro directed or co-directed don't repeat her role under the title; it's in the credits.
  // Other roles (e.g. Creative producer, Director's assistant) still show.
  const fullRole = film?.role ?? coro?.role;
  const role = fullRole && /^(co-)?director(?!'s)/i.test(fullRole) ? undefined : fullRole;

  return (
    <DirectorPageFrame>
      <article className="max-w-6xl mx-auto px-6 sm:px-10 pt-6 sm:pt-10">
        {/* Handwritten "Film Director", back to the Films page */}
        <Link to="/films" aria-label="Back to Films" className="inline-block">
          <img
            src="/landing/toprighttext.PNG"
            alt="Film Director"
            className="fill-img"
            style={{ height: 'clamp(28px, 3.4vw, 44px)', width: 'auto' }}
          />
        </Link>

        {/* Title design big and centred at the top, then status and Coro's role */}
        <header className="mt-6 sm:mt-8 flex flex-col items-center text-center">
          {film?.titleImage ? (
            <img
              src={film.titleImage}
              alt={film.title}
              className={`fill-img block w-auto max-w-[92%] object-contain${film.invertTitle ? ' invert' : ''}${
                film.blendTitle ? ' mix-blend-screen' : ''
              }`}
              style={{ height: `calc(clamp(96px, 13vw, 190px) * ${film.titleScale ?? 1})` }}
            />
          ) : (
            <h1 className="font-political text-white text-5xl sm:text-7xl">{film?.title ?? title}</h1>
          )}
          {status && (
            <p className="mt-5 font-credit text-2xl sm:text-3xl" style={{ color: CREAM }}>
              {status}
            </p>
          )}
          {role && <p className="mt-2 font-political text-lg sm:text-xl text-white/60">{role}</p>}
        </header>

        {/* The still */}
        <div className="mt-10 sm:mt-14">
          <OptimizedImage src={mainImage} width={1600} alt={`Still from ${film?.title ?? title}`} className="block w-full h-auto" />
        </div>

        {/* The story */}
        <div
          className="mt-10 sm:mt-14 max-w-2xl font-political text-lg sm:text-xl leading-relaxed whitespace-pre-line"
          style={{ color: CREAM, fontWeight: 500, opacity: 0.85 }}
        >
          {withLinks(description)}
        </div>

        {/* The film */}
        {youtubeUrl && (
          <div className="mt-16 sm:mt-24 relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={youtubeUrl}
              title={film?.title ?? title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        )}

        {/* Stills */}
        {stills && stills.length > 0 && (
          <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {stills.map((src, i) => (
              <OptimizedImage
                key={src}
                src={src}
                width={1200}
                alt={`${film?.title ?? title} still ${i + 1}`}
                className="block w-full h-auto"
              />
            ))}
          </div>
        )}

        {/* Credits, like the end of a film: role above, NAME below, one card after another */}
        <section aria-label="Credits" className="mt-28 sm:mt-40 flex flex-col items-center text-center gap-10 sm:gap-14">
          {credits.map((c) => (
            <div key={`${c.role}-${c.name}`} className="font-credit text-white">
              <p className="text-xl sm:text-2xl">{c.role}</p>
              <p className="text-3xl sm:text-4xl uppercase tracking-[0.06em] leading-tight">{c.name}</p>
            </div>
          ))}
        </section>

        {/* Production note and links */}
        {additionalInfo && (
          <div
            className="mt-24 sm:mt-32 max-w-2xl mx-auto text-center font-political text-lg leading-relaxed whitespace-pre-line"
            style={{ color: CREAM, opacity: 0.75 }}
          >
            {withLinks(additionalInfo)}
          </div>
        )}
      </article>
    </DirectorPageFrame>
  );
};

export default DirectorProjectPage;
