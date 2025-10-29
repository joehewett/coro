import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

export type ThemeMode = 'light' | 'dark' | 'beige';

interface NavbarProps {
  categoryImage?: string;
  categoryRoute?: string;
  categoryAlt?: string;
  theme?: ThemeMode;
  /** @deprecated Use theme prop instead */
  lightMode?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ categoryImage, categoryRoute, categoryAlt, theme, lightMode }) => {
  const navigate = useNavigate();

  // Support legacy lightMode prop for backward compatibility
  const resolvedTheme: ThemeMode = theme || (lightMode ? 'light' : 'dark');

  const getNavbarClasses = () => {
    switch (resolvedTheme) {
      case 'light':
        return 'bg-white';
      case 'beige':
        return 'bg-[#ffe8d6]'; // Beige color
      case 'dark':
      default:
        return 'bg-black';
    }
  };

  const shouldInvert = resolvedTheme === 'light' || resolvedTheme === 'beige';

  return (
    <nav className={`fixed top-0 left-0 right-0 h-20 ${getNavbarClasses()} bg-opacity-70 backdrop-blur-md flex items-center px-10 z-50 gap-5`}>
      {/* Coro logo - always goes to homepage */}
      <Logo size="sm" theme={resolvedTheme} />
      
      {/* Category text image if provided */}
      {categoryImage && (
        <img 
          src={categoryImage}
          alt={categoryAlt || 'Category'}
          onClick={() => categoryRoute && navigate(categoryRoute)}
          className={`h-10 object-contain ${categoryRoute ? 'cursor-pointer' : 'cursor-default'} ${shouldInvert ? 'invert' : ''}`}
        />
      )}
    </nav>
  );
};

export default Navbar;
