import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeDoodle from './HomeDoodle';
import OptimizedImage from './OptimizedImage';

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  
  // Check if device is mobile/touch-enabled
  const isMobile = () => {
    return !window.matchMedia('(min-width: 768px) and (hover: hover)').matches;
  };
  
  // The doors on the "More of me" page.
  // For now only Actress and Music show, side by side. Me now lives on the About page and Fun Quests
  // has no stories yet. To go back to the four-photo page, set `show: true` on Me and Fun Quests
  // and put Actress back on its own photo, '/landing/actress-tile.jpg'.
  // `text` is a handwritten label image; `label` is used when there is no image yet.
  const allQuadrants: { bg: string; text?: string; label?: string; alt: string; route: string; show: boolean; labelAt?: 'top' | 'bottom'; labelPlace?: string; labelSize?: string }[] = [
    {
      // Uses the photo that was on the Me tile, with the Actress title
      bg: '/landing/bottomleft.jpeg',
      text: '/landing/toplefttext.PNG',
      alt: 'Actress',
      route: '/actress',
      show: true,
      // Title up in the sky (phones: right at the top, clear of the raised hand)
      labelAt: 'top',
      labelPlace: 'items-start justify-center pt-[3vh] md:pt-[14vh]',
      // A bit smaller on phones so it clears the little house in the corner
      labelSize: 'w-[46%] md:w-auto'
    },
    {
      bg: '/landing/bottomright.jpeg',
      text: '/landing/bottomrighttext.PNG',
      alt: 'Music',
      route: '/musician',
      show: true,
      // Phones: in the black space on the right, above the microphone. Laptops: down by the chin
      labelAt: 'bottom',
      labelPlace: 'items-start justify-end pt-[9vh] pr-[5%] md:items-end md:justify-center md:pt-0 md:pr-0 md:pb-[16vh]',
      // Smaller on phones so it fits inside the black space
      labelSize: 'w-[30%] md:w-auto'
    },
    {
      bg: '/landing/bottomleft.jpeg',
      text: '/landing/bottomlefttext.PNG',
      alt: 'Me',
      route: '/me',
      show: false
    },
    {
      bg: '/me/me6.jpeg',
      label: 'Fun Quests',
      alt: 'Fun Quests',
      route: '/fun-quests',
      show: false
    }
  ];
  const quadrants = allQuadrants.filter((q) => q.show);
  // Two doors sit side by side; four make the 2x2 grid
  // On phones the two photos stack (one on top of the other) so each shows wide; side by side from tablet size up
  const gridClass = quadrants.length <= 2 ? 'grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1' : 'grid-cols-2 grid-rows-2';

  return (
    <div className="grow-links homepage-no-scroll fixed top-0 left-0 w-screen h-screen">
      {/* 2x2 Grid of images */}
      <div className={`grid ${gridClass} w-full h-full bg-black`}>
        {quadrants.map((quadrant, index) => (
          <div 
            key={index}
            className="relative overflow-hidden"
            onMouseEnter={(e) => {
              if (isMobile()) return; // Skip hover effects on mobile
              const bg = e.currentTarget.querySelector('.quadrant-bg') as HTMLElement;
              const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement;
              const textImg = e.currentTarget.querySelector('.text-img') as HTMLElement;
              if (bg) bg.style.opacity = '1';
              if (overlay) overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
              if (textImg) textImg.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              if (isMobile()) return; // Skip hover effects on mobile
              const bg = e.currentTarget.querySelector('.quadrant-bg') as HTMLElement;
              const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement;
              const textImg = e.currentTarget.querySelector('.text-img') as HTMLElement;
              if (bg) bg.style.opacity = '';
              if (overlay) overlay.style.backgroundColor = 'rgba(255, 255, 255, 0)';
              if (textImg) textImg.style.opacity = '0';
            }}
            onClick={() => navigate(quadrant.route)}
          >
            {/* Background Image */}
            <OptimizedImage
              src={quadrant.bg}
              width={1200}
              alt={quadrant.alt}
              className="quadrant-bg w-full h-full object-cover absolute inset-0 z-0 bg-black transition-opacity duration-500 ease-in-out"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.backgroundColor = '#333';
              }}
            />
            
            {/* Hover overlay */}
            <div 
              className={`overlay absolute inset-0 flex ${quadrant.labelPlace ?? 'items-center justify-center'} bg-transparent transition-colors duration-300 ease-in-out cursor-pointer z-10`}
            >
              {/* Text overlay image */}
              {quadrant.text ? (
                <img
                  className={`text-img max-w-[20%] max-h-[20%] object-contain transition-opacity duration-300 ease-in-out pointer-events-none ${quadrant.labelSize ?? ''}`}
                  src={quadrant.text}
                  alt={quadrant.alt}
                />
              ) : (
                <span className="text-img font-handwritten text-white text-5xl md:text-7xl transition-opacity duration-300 ease-in-out pointer-events-none">
                  {quadrant.label}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* The CORO logo used to sit in the middle here; removed while there are two photos */}

      {/* Home: a little house that draws itself, back to the front page */}
      <HomeDoodle className="absolute top-5 left-5 z-50 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]" />
    </div>
  );
};

export default Homepage;
