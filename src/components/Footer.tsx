import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Instagram, Youtube } from 'lucide-react';
import Logo from './Logo';

export type ThemeMode = 'light' | 'dark' | 'beige';

interface FooterProps {
  theme?: ThemeMode;
  /** @deprecated Use theme prop instead */
  lightMode?: boolean;
}

const Footer: React.FC<FooterProps> = ({ theme, lightMode }) => {
  const navigate = useNavigate();

  // Support legacy lightMode prop for backward compatibility
  const resolvedTheme: ThemeMode = theme || (lightMode ? 'light' : 'dark');

  const links = [
    { label: 'Actress', route: '/actress' },
    { label: 'Director', route: '/director' },
    { label: 'Musician', route: '/musician' },
    { label: 'Me', route: '/me' }
  ];

  const getBackgroundClass = () => {
    switch (resolvedTheme) {
      case 'light':
        return 'bg-white';
      case 'beige':
        return 'bg-[#ffe8d6]';
      case 'dark':
      default:
        return 'bg-black';
    }
  };

  const getDividerClass = () => {
    switch (resolvedTheme) {
      case 'light':
        return 'bg-gray-300';
      case 'beige':
        return 'bg-[#f5c9a8]'; // Darker beige for divider
      case 'dark':
      default:
        return 'bg-gray-700';
    }
  };

  const getTextClass = () => {
    switch (resolvedTheme) {
      case 'light':
        return 'text-black hover:text-gray-600';
      case 'beige':
        return 'text-[#5a4a3a] hover:text-[#3a2a1a]'; // Brown text on beige
      case 'dark':
      default:
        return 'text-white hover:text-gray-300';
    }
  };

  return (
    <footer className={`${getBackgroundClass()} py-16 px-10`}>
      <div className="max-w-4xl mx-auto min-h-[500px] flex flex-col items-center justify-center">
        {/* Divider line */}
        <div className={`w-full h-px ${getDividerClass()} mb-8`}></div>
        
        {/* Centered Logo */}
        <div className="w-full flex justify-center items-center my-32">
          <Logo size="md" theme={resolvedTheme} />
        </div>

        {/* Centered horizontal links */}
        <div className="w-full flex justify-center items-center gap-8 flex-wrap">
          {links.map((link) => (
            <button
              key={link.route}
              onClick={() => navigate(link.route)}
              className={`${getTextClass()} transition-colors text-base whitespace-nowrap`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Social media icons */}
        <div className="w-full flex justify-center items-center gap-6 mt-8">
          <a 
            href="https://www.instagram.com/corobenavent/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className={`${getTextClass()} transition-colors`}
          >
            <Instagram size={24} />
          </a>
          <a 
            href="https://www.youtube.com/channel/UCBcovpzdJulXmepFhF_Rmow"
            target="_blank"
            rel="noopener noreferrer"
            className={`${getTextClass()} transition-colors`}
          >
            <Youtube size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

