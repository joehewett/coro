import React, { useId } from 'react';

/**
 * The GARO logo exactly as on garogirls.com: the same picture, with the same grain on the
 * white letters and a lighter grain on the egg (copied from their site's SVG filters).
 * The top of the egg lifts open, tilting up and to the right, and closes again,
 * twice every few seconds and whenever you point at it, to hint that it's clickable.
 *
 * `height` is any CSS size, e.g. '1em' to sit in a line of text.
 */
const SRC = '/director/garo/garo-logo-white.png';

const Grain: React.FC<{ id: string; low: number[] }> = ({ id, low }) => (
  <filter id={id} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves={3} seed={7} stitchTiles="stitch" result="t" />
    <feColorMatrix in="t" type="saturate" values="0" result="g" />
    <feComponentTransfer in="g" result="c">
      <feFuncR type="linear" slope="3.2" intercept="-1.1" />
      <feFuncG type="linear" slope="3.2" intercept="-1.1" />
      <feFuncB type="linear" slope="3.2" intercept="-1.1" />
      <feFuncA type="table" tableValues="1 1" />
    </feComponentTransfer>
    <feComponentTransfer in="c" result="m">
      <feFuncR type="table" tableValues={`${low.join(' ')} 1 1 1`} />
      <feFuncG type="table" tableValues={`${low.join(' ')} 1 1 1`} />
      <feFuncB type="table" tableValues={`${low.join(' ')} 1 1 1`} />
    </feComponentTransfer>
    <feBlend in="SourceGraphic" in2="m" mode="multiply" result="b" />
    <feComposite in="b" in2="SourceGraphic" operator="in" />
  </filter>
);

const GaroLogo: React.FC<{ height: string; className?: string }> = ({ height, className = '' }) => {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const letters = `garo-grain-${uid}`;
  const egg = `garo-grain-egg-${uid}`;
  return (
    <span className={`garo-logo relative inline-block align-middle ${className}`} style={{ height }}>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <Grain id={letters} low={[0.5, 0.68, 0.88]} />
        <Grain id={egg} low={[0.83, 0.89, 0.96]} />
      </svg>
      {/* G A R */}
      <img
        src={SRC}
        alt="GARO"
        className="fill-img block h-full w-auto"
        style={{ filter: `url(#${letters})`, clipPath: 'inset(0 23.94% 0 0)' }}
      />
      {/* bottom of the egg, stays still */}
      <img
        src={SRC}
        alt=""
        aria-hidden="true"
        className="fill-img absolute inset-0 h-full w-auto"
        style={{ filter: `url(#${egg})`, clipPath: 'inset(46% 0 0 76.06%)' }}
      />
      {/* top of the egg, lifts open */}
      <img
        src={SRC}
        alt=""
        aria-hidden="true"
        className="garo-egg-top fill-img absolute inset-0 h-full w-auto"
        style={{ filter: `url(#${egg})`, clipPath: 'inset(0 0 54% 76.06%)' }}
      />
    </span>
  );
};

export default GaroLogo;
