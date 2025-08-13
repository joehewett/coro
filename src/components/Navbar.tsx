import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  categoryImage?: string;
  categoryRoute?: string;
  categoryAlt?: string;
}

const Navbar: React.FC<NavbarProps> = ({ categoryImage, categoryRoute, categoryAlt }) => {
  const navigate = useNavigate();

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '80px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 40px',
      zIndex: 1000,
      gap: '20px'
    }}>
      {/* Coro logo - always goes to homepage */}
      <img 
        src="/coro_text.png" 
        alt="Coro"
        onClick={() => navigate('/')}
        style={{
          height: '50px',
          cursor: 'pointer',
          objectFit: 'contain'
        }}
      />
      
      {/* Category text image if provided */}
      {categoryImage && (
        <img 
          src={categoryImage}
          alt={categoryAlt || 'Category'}
          onClick={() => categoryRoute && navigate(categoryRoute)}
          style={{
            height: '40px',
            cursor: categoryRoute ? 'pointer' : 'default',
            objectFit: 'contain'
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
