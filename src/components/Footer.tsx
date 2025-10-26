import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

interface FooterProps {
  lightMode?: boolean;
}

const Footer: React.FC<FooterProps> = ({ lightMode = false }) => {
  const navigate = useNavigate();

  const links = [
    { label: 'Actress', route: '/actress' },
    { label: 'Director', route: '/director' },
    { label: 'Musician', route: '/musician' },
    { label: 'Me', route: '/me' }
  ];

  return (
    <footer className={`${lightMode ? 'bg-white' : 'bg-black'} py-16 px-10`}>
      <div className="max-w-4xl mx-auto min-h-[500px] flex flex-col items-center justify-center">
        {/* Divider line */}
        <div className={`w-full h-px ${lightMode ? 'bg-gray-300' : 'bg-gray-700'} mb-8`}></div>
        
        {/* Centered Logo */}
        <div className="w-full flex justify-center items-center my-32">
          <Logo size="md" lightMode={lightMode} />
        </div>

        {/* Centered horizontal links */}
        <div className="w-full flex justify-center items-center gap-8 flex-wrap">
          {links.map((link) => (
            <button
              key={link.route}
              onClick={() => navigate(link.route)}
              className={`${lightMode ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-300'} transition-colors text-base whitespace-nowrap`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

