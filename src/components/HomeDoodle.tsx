import React from 'react';
import { Link } from 'react-router-dom';

/**
 * A little hand-drawn house that draws itself in, with smoke curling from the chimney.
 * It takes you back to the front page (the TV).
 */
const HomeDoodle: React.FC<{ to?: string; className?: string }> = ({ to = '/', className = '' }) => (
  <Link to={to} aria-label="Back home" className={`home-doodle group ${className}`}>
    <svg viewBox="0 0 64 64" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      {/* roof */}
      <path className="hd-line" style={{ animationDelay: '0s' }} d="M7 31 L32 9 L57 31" />
      {/* chimney */}
      <path className="hd-line" style={{ animationDelay: '0.35s' }} d="M44 20 V12 H50 V25" />
      {/* walls */}
      <path className="hd-line" style={{ animationDelay: '0.55s' }} d="M13 27 V56 H51 V27" />
      {/* door, swings open on hover */}
      <path className="hd-line hd-door" style={{ animationDelay: '0.9s' }} d="M27 56 V42 Q32 37 37 42 V56" />
      {/* window */}
      <path className="hd-line" style={{ animationDelay: '1.1s' }} d="M18 36 H24 V42 H18 Z M21 36 V42 M18 39 H24" />
      {/* heart in the other window */}
      <path
        className="hd-line"
        style={{ animationDelay: '1.3s' }}
        d="M44 41 C44 38.5 41 38 41 40.3 C41 42.5 44 44.5 44 44.5 C44 44.5 47 42.5 47 40.3 C47 38 44 38.5 44 41 Z"
      />
      {/* smoke */}
      <path className="hd-smoke" d="M47 9 C44 6 50 4 47 1" strokeWidth="1.8" />
      <path className="hd-smoke" style={{ animationDelay: '1.2s' }} d="M49 9 C46 6 52 4 49 1" strokeWidth="1.8" />
    </svg>
  </Link>
);

export default HomeDoodle;
