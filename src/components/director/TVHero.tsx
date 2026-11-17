import React from 'react';
import { Link } from 'react-router-dom';
import ColorLetters from './ColorLetters';

/**
 * The opening: Coro's own photo of an old TV fills the whole first screen.
 * Her Tonos still plays on the TV's glass, with the menu and "Directed by Coro Benavent" on it.
 *
 * The glass position below is measured from /director/tv.jpg (735 x 499 px):
 * x 57 to 560, y 59 to 442. If the TV photo is ever swapped, re-measure these.
 */
const TV_RATIO = 735 / 499;
const SCREEN = { left: 57 / 735, top: 59 / 499, width: 503 / 735, height: 383 / 499 };
const pct = (n: number) => `${(n * 100).toFixed(3)}%`;

const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const TVHero: React.FC = () => {
  const menu = 'font-end text-[2.6cqw] leading-none hover:scale-110 transition-transform';
  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-black flex items-center justify-center">
      {/* Fills the screen on laptops (cropping the TV's outer edge), fits the width on phones */}
      <div
        className="tv-frame relative shrink-0"
        style={{ aspectRatio: `${TV_RATIO}` }}
      >
        <img src="/director/tv.jpg" alt="" className="fill-img absolute inset-0 w-full h-full" />

        {/* The glass */}
        <div
          className="tv-screen absolute overflow-hidden bg-black"
          style={{
            left: pct(SCREEN.left),
            top: pct(SCREEN.top),
            width: pct(SCREEN.width),
            height: pct(SCREEN.height),
            borderRadius: '9% / 12%',
            containerType: 'inline-size',
          }}
        >
          <div className="tv-on absolute inset-0">
            <img
              src="/director/tonos-ending.jpg"
              alt="Still from Tonos"
              className="fill-img absolute inset-0 w-full h-full object-cover"
            />

            {/* Menu inside the screen (laptops; phones use the bar above the TV) */}
            <div
              className="absolute inset-x-0 top-0 hidden sm:flex items-center justify-between"
              style={{ padding: '5cqw 8cqw 0', animation: 'fadeUp 1.2s 1.6s ease-out both' }}
            >
              <img src="/coro_text.png" alt="Coro" className="fill-img" style={{ height: '3.4cqw', width: 'auto' }} />
              <nav className="flex items-center" style={{ gap: '3.5cqw' }}>
                <button onClick={() => goTo('films')} className={menu}><ColorLetters text="Films" /></button>
                <button onClick={() => goTo('about')} className={menu}><ColorLetters text="About" offset={2} /></button>
                <button onClick={() => goTo('contact')} className={menu}><ColorLetters text="Contact" offset={4} /></button>
                <Link to="/more" className={menu}><ColorLetters text="More of me" offset={1} /></Link>
              </nav>
            </div>

            {/* Directed by */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p
                className="font-credit text-white"
                style={{ fontSize: '4.4cqw', lineHeight: 1.15, animation: 'fadeUp 1.4s 1.9s ease-out both' }}
              >
                Directed by
                <br />
                Coro Benavent
              </p>
            </div>
          </div>
          <div className="tv-flash pointer-events-none absolute inset-0" />
        </div>
      </div>
    </section>
  );
};

export default TVHero;
