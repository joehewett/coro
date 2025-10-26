import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

interface NavbarProps {
  categoryImage?: string;
  categoryRoute?: string;
  categoryAlt?: string;
  lightMode?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ categoryImage, categoryRoute, categoryAlt, lightMode = false }) => {
  const navigate = useNavigate();

  return (
    <nav className={`fixed top-0 left-0 right-0 h-20 ${lightMode ? 'bg-white' : 'bg-black'} bg-opacity-70 backdrop-blur-md flex items-center px-10 z-50 gap-5`}>
      {/* Coro logo - always goes to homepage */}
      <Logo size="sm" lightMode={lightMode} />
      
      {/* Category text image if provided */}
      {categoryImage && (
        <img 
          src={categoryImage}
          alt={categoryAlt || 'Category'}
          onClick={() => categoryRoute && navigate(categoryRoute)}
          className={`h-10 object-contain ${categoryRoute ? 'cursor-pointer' : 'cursor-default'} ${lightMode ? 'invert' : ''}`}
        />
      )}
    </nav>
  );
};

export default Navbar;
