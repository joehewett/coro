import React from 'react';
import OptimizedImage from '../OptimizedImage';

/**
 * Opening title card shown inside an old 1970s television,
 * modelled on the TV photo Coro sent: grey-blue metal face, silver-rimmed curved screen,
 * black control panel on the right with knobs and a channel number.
 * The screen switches on like an old CRT, then "Directed by Coro Benavent" fades in.
 */

const CREAM = '#f5ecd7';

const Knob: React.FC<{ size?: string }> = ({ size = '58%' }) => (
  <div
    className="rounded-full mx-auto"
    style={{
      width: size,
      aspectRatio: '1',
      background: 'radial-gradient(circle at 35% 30%, #fafafa, #b9b9b9 45%, #6d6d6d 75%, #3a3a3a)',
      boxShadow: '0 2px 3px rgba(0,0,0,0.7), inset 0 -1px 2px rgba(0,0,0,0.4)',
    }}
  />
);

const TVHero: React.FC<{ garoUrl: string }> = ({ garoUrl }) => {
  return (
    <div
      className="relative mx-auto"
      style={{ width: 'min(92vw, calc((100svh - 190px) * 1.47), 1080px)', aspectRatio: '1.47' }}
    >
      {/* Cabinet */}
      <div
        className="absolute inset-0 rounded-[1.6%/2.4%]"
        style={{
          background: 'linear-gradient(180deg, #2a221b, #15110d)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.8), 0 0 140px rgba(241,217,107,0.08)',
          padding: '1.4%',
        }}
      >
        {/* Metal face */}
        <div
          className="relative w-full h-full rounded-[1%/1.5%] flex"
          style={{
            background: 'linear-gradient(160deg, #8c9796 0%, #6e7978 45%, #5b6463 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -2px 6px rgba(0,0,0,0.35)',
            padding: '3.2% 2.6% 3.2% 2.8%',
            gap: '2.4%',
          }}
        >
          {/* Screen with silver rim */}
          <div
            className="relative h-full"
            style={{
              flex: '0 0 79%',
              borderRadius: '9% / 12%',
              padding: '0.55%',
              background: 'linear-gradient(135deg, #f0f0ee, #a9adab 40%, #e6e6e3 60%, #8d918f)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
            }}
          >
            <div
              className="relative w-full h-full overflow-hidden bg-black"
              style={{ borderRadius: '8.6% / 11.6%', padding: '1.6%' }}
            >
              {/* The glass */}
              <div
                className="tv-screen relative w-full h-full overflow-hidden bg-black"
                style={{ borderRadius: '8% / 11%', containerType: 'inline-size' }}
              >
                <div className="tv-on absolute inset-0">
                  <OptimizedImage
                    src="/director/garo/tonos-2.jpg"
                    width={1600}
                    alt="Still from Tonos"
                    className="fill-img absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-[6%] flicker">
                    <p
                      className="font-display italic title-glow"
                      style={{ color: CREAM, fontSize: '4.6cqw', animation: 'fadeUp 1.4s 1.5s ease-out both' }}
                    >
                      Directed by
                    </p>
                    <h1
                      className="font-display font-medium uppercase title-glow leading-[0.95] tracking-[0.03em]"
                      style={{ color: CREAM, fontSize: '9.4cqw', marginTop: '1.5cqw', animation: 'fadeUp 1.6s 2.1s ease-out both' }}
                    >
                      Coro Benavent
                    </h1>
                    <p
                      className="font-wide uppercase tracking-[0.3em] opacity-75"
                      style={{ color: CREAM, fontSize: 'max(8px, 1.9cqw)', marginTop: '3.5cqw', animation: 'fadeUp 1.4s 2.8s ease-out both' }}
                    >
                      A{' '}
                      <a
                        href={garoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 decoration-white/30 hover:decoration-white"
                      >
                        GARO
                      </a>{' '}
                      production
                    </p>
                  </div>
                </div>

                {/* Old-screen texture: scanlines, curved-glass shading and a soft reflection */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 3px)',
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ boxShadow: 'inset 0 0 8cqw rgba(0,0,0,0.85), inset 0 0 2cqw rgba(0,0,0,0.6)' }}
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(ellipse 60% 40% at 25% 15%, rgba(255,255,255,0.10), transparent 70%)',
                  }}
                />
                <div className="tv-flash pointer-events-none absolute inset-0" />
              </div>
            </div>
          </div>

          {/* Control panel */}
          <div
            className="relative h-full flex"
            style={{
              flex: '1 1 auto',
              background: 'linear-gradient(90deg, #0d0d0d, #1c1c1c 60%, #0f0f0f)',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08), 0 1px 3px rgba(0,0,0,0.5)',
              borderRadius: '3% / 1%',
            }}
          >
            <div className="w-[52%] h-full flex flex-col items-center justify-between py-[30%]">
              <span className="font-wide text-white/70" style={{ fontSize: 'max(6px, 0.9vw)' }}>Ü</span>
              <span className="font-wide text-white/25" style={{ fontSize: 'max(5px, 0.5vw)' }}>●</span>
              <span
                className="font-wide uppercase text-black bg-[#d9d9d6] px-[8%]"
                style={{ fontSize: 'max(5px, 0.6vw)' }}
              >
                Coro
              </span>
            </div>
            <div
              className="w-[38%] h-[96%] self-center flex flex-col items-center justify-between py-[20%]"
              style={{ borderLeft: '1px solid rgba(220,220,215,0.5)', borderRight: '1px solid rgba(220,220,215,0.5)' }}
            >
              <div className="w-full space-y-[30%]">
                <Knob />
                <Knob />
                <Knob />
              </div>
              <span className="font-wide text-white/80" style={{ fontSize: 'max(7px, 1.2vw)' }}>24</span>
              <div className="w-full space-y-[18%]">
                <Knob size="40%" />
                <Knob size="40%" />
                <Knob size="40%" />
                <Knob size="40%" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVHero;
