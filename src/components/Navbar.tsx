import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ColorLetters from './director/ColorLetters';
import Logo from './Logo';
import { type ThemeMode, themeUtils } from '../theme';

interface NavbarProps {
  categoryImage?: string;
  categoryRoute?: string;
  categoryAlt?: string;
  theme?: ThemeMode;
  /** Where the little "Back" button goes (in the site's colourful menu letters). No button if left out. */
  backTo?: string;
}

const Navbar: React.FC<NavbarProps> = ({ categoryImage, categoryRoute, categoryAlt, theme = 'dark', backTo }) => {
  const navigate = useNavigate();

  return (
    <nav className={`fixed top-0 left-0 right-0 h-20 ${themeUtils.background(theme)} bg-opacity-70 backdrop-blur-md flex items-center px-10 z-50 gap-5`}>
      {/* Coro logo - always goes to homepage */}
      <Logo size="sm" theme={theme} />
      
      {/* Category text image if provided */}
      {categoryImage && (
        <img 
          src={categoryImage}
          alt={categoryAlt || 'Category'}
          onClick={() => categoryRoute && navigate(categoryRoute)}
          className={`h-10 object-contain ${categoryRoute ? 'cursor-pointer' : 'cursor-default'} ${themeUtils.shouldInvertImages(theme) ? 'invert' : ''}`}
        />
      )}

      {backTo && (
        <Link
          to={backTo}
          aria-label="Back"
          className="ml-auto font-end text-xl sm:text-2xl leading-none inline-block transition-transform hover:scale-110"
        >
          {/* colours chosen to stay visible on the orange Music page too (no orange letter) */}
          <span style={{ color: '#19c3b8' }}>←</span> <ColorLetters text="Back" offset={4} />
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
