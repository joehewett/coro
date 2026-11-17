import React from 'react';
import { Link } from 'react-router-dom';
import ColorLetters from './ColorLetters';

/**
 * The front page: Coro's own photo of an old TV fills the screen.
 * Her Tonos still sits on the TV's glass, with the menu and "Directed by Coro Benavent" on it.
 *
 * GLASS is the exact outline of the TV's glass, traced from /director/tv.jpg (735 x 499 px)
 * and given as percentages of the photo. If the TV photo is ever swapped, it must be traced again.
 */
const TV_RATIO = 735 / 499;

const GLASS =
  '44.65% 11.68%, 45.57% 11.70%, 46.52% 11.52%, 47.45% 11.68%, 48.41% 11.70%, 49.38% 11.72%, 50.38% 11.70%, 51.40% 11.68%, 52.44% 11.68%, 53.51% 11.70%, 54.62% 11.69%, 55.77% 11.70%, 56.96% 11.70%, 58.20% 11.69%, 59.48% 11.72%, 60.84% 11.72%, 62.28% 11.69%, 63.77% 11.72%, 65.37% 11.71%, 66.95% 11.90%, 68.75% 11.92%, 70.70% 11.92%, 72.65% 12.10%, 74.23% 12.90%, 75.04% 14.64%, 75.32% 16.90%, 75.45% 19.22%, 75.60% 21.44%, 75.72% 23.62%, 75.87% 25.70%, 75.99% 27.75%, 76.00% 29.81%, 76.14% 31.75%, 76.26% 33.66%, 76.27% 35.59%, 76.43% 37.42%, 76.41% 39.30%, 76.41% 41.14%, 76.40% 42.96%, 76.41% 44.76%, 76.41% 46.55%, 76.41% 48.33%, 76.39% 50.10%, 76.41% 51.87%, 76.41% 53.65%, 76.41% 55.44%, 76.40% 57.24%, 76.41% 59.06%, 76.41% 60.90%, 76.43% 62.78%, 76.27% 64.61%, 76.26% 66.54%, 76.14% 68.45%, 76.00% 70.39%, 75.99% 72.45%, 75.87% 74.50%, 75.72% 76.58%, 75.60% 78.76%, 75.45% 80.98%, 75.32% 83.30%, 75.04% 85.56%, 74.23% 87.30%, 72.81% 88.29%, 70.70% 88.28%, 68.75% 88.28%, 67.07% 88.48%, 65.37% 88.49%, 63.77% 88.48%, 62.28% 88.51%, 60.84% 88.48%, 59.48% 88.48%, 58.20% 88.51%, 56.96% 88.50%, 55.85% 88.72%, 54.68% 88.69%, 53.57% 88.68%, 52.49% 88.70%, 51.44% 88.70%, 50.42% 88.70%, 49.42% 88.72%, 48.44% 88.70%, 47.48% 88.72%, 46.52% 88.68%, 45.59% 88.70%, 44.66% 88.72%, 39.04% 88.72%, 38.11% 88.70%, 37.18% 88.68%, 36.22% 88.72%, 35.26% 88.70%, 34.28% 88.72%, 33.28% 88.70%, 32.26% 88.70%, 31.21% 88.70%, 30.13% 88.68%, 29.02% 88.69%, 27.86% 88.72%, 26.74% 88.50%, 25.50% 88.51%, 24.22% 88.48%, 22.86% 88.48%, 21.42% 88.51%, 19.93% 88.48%, 18.33% 88.49%, 16.63% 88.48%, 14.96% 88.28%, 13.01% 88.28%, 10.89% 88.29%, 9.47% 87.30%, 8.66% 85.56%, 8.38% 83.30%, 8.25% 80.98%, 8.10% 78.76%, 7.98% 76.58%, 7.83% 74.50%, 7.71% 72.45%, 7.70% 70.39%, 7.56% 68.45%, 7.44% 66.54%, 7.43% 64.61%, 7.27% 62.78%, 7.29% 60.90%, 7.29% 59.06%, 7.30% 57.24%, 7.29% 55.44%, 7.29% 53.65%, 7.29% 51.87%, 7.31% 50.10%, 7.29% 48.33%, 7.29% 46.55%, 7.29% 44.76%, 7.30% 42.96%, 7.29% 41.14%, 7.29% 39.30%, 7.27% 37.42%, 7.43% 35.59%, 7.44% 33.66%, 7.56% 31.75%, 7.70% 29.81%, 7.71% 27.75%, 7.83% 25.70%, 7.98% 23.62%, 8.10% 21.44%, 8.25% 19.22%, 8.38% 16.90%, 8.66% 14.64%, 9.47% 12.90%, 11.05% 12.10%, 13.01% 11.92%, 14.96% 11.92%, 16.75% 11.90%, 18.33% 11.71%, 19.93% 11.72%, 21.42% 11.69%, 22.86% 11.72%, 24.22% 11.72%, 25.50% 11.69%, 26.74% 11.70%, 27.94% 11.70%, 29.08% 11.69%, 30.19% 11.70%, 31.26% 11.68%, 32.30% 11.68%, 33.32% 11.70%, 34.32% 11.72%, 35.30% 11.70%, 36.25% 11.68%, 37.18% 11.52%, 38.13% 11.70%, 39.05% 11.68%';

// The box around the glass outline, as percentages of the photo
const BOX = { left: 7.27, top: 11.52, width: 76.43 - 7.27, height: 88.72 - 11.52 };

/**
 * Show the old TV around the picture? Coro asked to see the home page without it for now.
 * Set back to true to bring the TV frame back exactly as it was.
 */
const SHOW_TV_FRAME = false;

/** Everything on the screen: the Tonos still, the menu and "Directed by CORO BENAVENT".
 *  Sizes are in cqw (percent of the screen's width); k shrinks them when the picture is full-screen. */
const ScreenContent: React.FC<{ k: number }> = ({ k }) => {
  const cq = (n: number) => `${(n * k).toFixed(2)}cqw`;
  const menu = 'font-end leading-none hover:scale-110 transition-transform';
  return (
    <>
      <img src="/director/tonos-ending.jpg" alt="Still from Tonos" className="fill-img absolute inset-0 w-full h-full object-cover" />

      {/* Menu on the screen (laptops; phones use the bar at the top) */}
      <div className="absolute inset-x-0 top-0 hidden sm:flex items-center justify-end" style={{ padding: `${cq(5)} ${cq(8)} 0` }}>
        <nav className="flex items-center" style={{ gap: cq(3.5) }}>
          <Link to="/films" className={menu} style={{ fontSize: cq(2.6) }}><ColorLetters text="Films" /></Link>
          <Link to="/about" className={menu} style={{ fontSize: cq(2.6) }}><ColorLetters text="About" offset={2} /></Link>
          <Link to="/contact" className={menu} style={{ fontSize: cq(2.6) }}><ColorLetters text="Contact" offset={4} /></Link>
        </nav>
      </div>

      {/* Directed by */}
      <div className="absolute inset-0 flex items-center justify-center text-center pointer-events-none">
        <h1 className="font-credit text-white flex flex-col items-center" style={{ lineHeight: 1.1 }}>
          <span style={{ fontSize: `max(20px, ${cq(4.2)})` }}>Directed by</span>
          {/* CORO is Coro's own hand-drawn logo (the O is the fried egg), then BENAVENT */}
          <span className="flex items-center" style={{ fontSize: `max(26px, ${cq(5.6)})`, gap: cq(1.4), marginTop: cq(0.6) }}>
            <img src="/coro_text.png" alt="Coro" className="fill-img" style={{ height: `max(21px, ${cq(4.6)})`, width: 'auto' }} />
            <span style={{ letterSpacing: '0.06em' }}>BENAVENT</span>
          </span>
        </h1>
      </div>
    </>
  );
};

const TVHero: React.FC = () => {
  if (!SHOW_TV_FRAME) {
    // The still fills the whole screen
    return (
      <section className="relative w-full h-[100svh] overflow-hidden bg-black" style={{ containerType: 'inline-size' }}>
        <ScreenContent k={0.72} />
      </section>
    );
  }

  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-black flex items-center justify-center">
      {/* Fills the screen on laptops (cropping the TV's outer edge), fits the width on phones */}
      <div className="tv-frame relative shrink-0" style={{ aspectRatio: `${TV_RATIO}` }}>
        <img src="/director/tv.jpg" alt="" className="fill-img absolute inset-0 w-full h-full" />

        {/* Everything on the glass is cut to the glass outline */}
        <div className="absolute inset-0" style={{ clipPath: `polygon(${GLASS})` }}>
          <div
            className="absolute"
            style={{
              left: `${BOX.left}%`,
              top: `${BOX.top}%`,
              width: `${BOX.width}%`,
              height: `${BOX.height}%`,
              containerType: 'inline-size',
            }}
          >
            <ScreenContent k={1} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TVHero;
