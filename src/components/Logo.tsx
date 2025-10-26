import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LogoProps {
  /** Size preset for the logo */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Custom height in pixels (overrides size preset) */
  height?: number;
  /** Whether to invert colors for light mode */
  lightMode?: boolean;
  /** Whether the logo should be clickable to navigate home */
  clickable?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  height,
  lightMode = false,
  clickable = true,
  className = ''
}) => {
  const navigate = useNavigate();

  // Define size presets with explicit heights
  const sizeMap = {
    xs: 16,  // 1rem / 16px
    sm: 24,  // 1.5rem / 24px
    md: 32,  // 2rem / 32px
    lg: 48,  // 3rem / 48px
    xl: 64   // 4rem / 64px
  };

  const logoHeight = height || sizeMap[size];

  const handleClick = () => {
    if (clickable) {
      navigate('/');
    }
  };

  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{ 
        height: `${logoHeight}px`,
        maxWidth: '100%'
      }}
    >
      <img 
        src="/coro_text.png" 
        alt="Coro"
        onClick={handleClick}
        className={`max-h-full w-auto object-contain ${clickable ? 'cursor-pointer' : ''} ${lightMode ? 'invert' : ''}`}
        style={{ display: 'block', maxWidth: '100%' }}
      />
    </div>
  );
};

export default Logo;

