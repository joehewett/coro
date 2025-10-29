import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Instagram, Youtube } from 'lucide-react';
import Logo from './Logo';
import { type ThemeMode, themeUtils } from '../theme';

interface FooterProps {
  theme?: ThemeMode;
}

const Footer: React.FC<FooterProps> = ({ theme = 'dark' }) => {
  const navigate = useNavigate();

  const links = [
    { label: 'Actress', route: '/actress' },
    { label: 'Director', route: '/director' },
    { label: 'Musician', route: '/musician' },
    { label: 'Me', route: '/me' }
  ];

  return (
    <footer className={`${themeUtils.background(theme)} py-16 px-10`}>
      <div className="max-w-4xl mx-auto min-h-[500px] flex flex-col items-center justify-center">
        {/* Divider line */}
        <div className={`w-full h-px ${themeUtils.divider(theme)} mb-8`}></div>
        
        {/* Centered Logo */}
        <div className="w-full flex justify-center items-center my-32">
          <Logo size="md" theme={theme} />
        </div>

        {/* Centered horizontal links */}
        <div className="w-full flex justify-center items-center gap-8 flex-wrap">
          {links.map((link) => (
            <button
              key={link.route}
              onClick={() => navigate(link.route)}
              className={`${themeUtils.textWithHover(theme)} text-base whitespace-nowrap`}
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
            className={themeUtils.textWithHover(theme)}
          >
            <Instagram size={24} />
          </a>
          <a 
            href="https://www.youtube.com/channel/UCBcovpzdJulXmepFhF_Rmow"
            target="_blank"
            rel="noopener noreferrer"
            className={themeUtils.textWithHover(theme)}
          >
            <Youtube size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

