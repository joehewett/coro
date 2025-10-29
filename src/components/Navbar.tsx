import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { type ThemeMode, themeUtils } from '../theme';

interface NavbarProps {
  categoryImage?: string;
  categoryRoute?: string;
  categoryAlt?: string;
  theme?: ThemeMode;
}

const Navbar: React.FC<NavbarProps> = ({ categoryImage, categoryRoute, categoryAlt, theme = 'dark' }) => {
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
    </nav>
  );
};

export default Navbar;
