import React from 'react';
import { Link } from 'react-router-dom';
import ColorLetters from './director/ColorLetters';
import { type ThemeMode, themeUtils } from '../theme';

/**
 * Footer for the Actress and Music pages, matching the rest of the site
 * (colourful menu, serif links, "© year Coro Benavent") but without THE END.
 * Each side gets its own links: the CV for acting, YouTube for music.
 * Takes the page's theme so the text colour suits its background.
 */
interface Props {
  section: 'actress' | 'music';
  theme?: ThemeMode;
}

const SectionFooter: React.FC<Props> = ({ section, theme = 'dark' }) => {
  const links =
    section === 'actress'
      ? [
          { label: 'Download CV', href: '/cv.pdf' },
          { label: 'Instagram', href: 'https://www.instagram.com/corobenavent/' },
          { label: 'Contact', to: '/contact' },
        ]
      : [
          { label: 'YouTube', href: 'https://www.youtube.com/channel/UCBcovpzdJulXmepFhF_Rmow' },
          { label: 'Instagram', href: 'https://www.instagram.com/corobenavent/' },
          { label: 'Contact', to: '/contact' },
        ];

  const linkClass = `font-political text-lg sm:text-xl ${themeUtils.textWithHover(theme)}`;

  return (
    <footer className={`grow-links ${themeUtils.background(theme)} ${themeUtils.text(theme)} px-6 py-24 sm:py-32`}>
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-10">
        {/* Same colourful menu as the rest of the site */}
        <nav className="flex items-center gap-8 sm:gap-10">
          <Link to="/films" className="font-end text-2xl sm:text-3xl leading-none"><ColorLetters text="Films" /></Link>
          <Link to="/about" className="font-end text-2xl sm:text-3xl leading-none"><ColorLetters text="About" offset={2} /></Link>
          <Link to="/contact" className="font-end text-2xl sm:text-3xl leading-none"><ColorLetters text="Contact" offset={4} /></Link>
        </nav>

        {/* Links for this side of the work */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {links.map((l) =>
            'to' in l && l.to ? (
              <Link key={l.label} to={l.to} className={linkClass}>
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {l.label}
              </a>
            )
          )}
        </div>

        <p className="font-political text-sm sm:text-base opacity-60">© {new Date().getFullYear()} Coro Benavent</p>
      </div>
    </footer>
  );
};

export default SectionFooter;
