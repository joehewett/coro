import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  
  const quadrants = [
    { 
      bg: '/landing/topleft.jpg', 
      text: '/landing/toplefttext.PNG',
      alt: 'Top Left',
      route: '/actress'
    },
    { 
      bg: '/landing/topright.JPG', 
      text: '/landing/toprighttext.PNG',
      alt: 'Top Right',
      route: '/director'
    },
    { 
      bg: '/landing/bottomleft.jpeg', 
      text: '/landing/bottomlefttext.PNG',
      alt: 'Bottom Left',
      route: '/musician'
    },
    { 
      bg: '/landing/bottomright.jpeg', 
      text: '/landing/bottomrighttext.PNG',
      alt: 'Bottom Right',
      route: '/me'
    }
  ];

  useEffect(() => {
    // Debug: Check if images are loading
    const img = new window.Image();
    img.onload = () => console.log('Coro text loaded successfully');
    img.onerror = () => console.error('Failed to load coro_text.png');
    img.src = '/coro_text.png';
  }, []);

  return (
    <div className="homepage-no-scroll" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}>
      {/* 2x2 Grid of images */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', width: '100%', height: '100%' }}>
        {quadrants.map((quadrant, index) => (
          <div 
            key={index}
            style={{ position: 'relative', overflow: 'hidden' }}
            onMouseEnter={(e) => {
              console.log(`Hovering quadrant ${index}`);
              const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement;
              const textImg = e.currentTarget.querySelector('.text-img') as HTMLElement;
              if (overlay) overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
              if (textImg) textImg.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement;
              const textImg = e.currentTarget.querySelector('.text-img') as HTMLElement;
              if (overlay) overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
              if (textImg) textImg.style.opacity = '0';
            }}
            onClick={() => navigate(quadrant.route)}
          >
            {/* Background Image */}
            <img 
              src={quadrant.bg} 
              alt={quadrant.alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            
            {/* Hover overlay */}
            <div 
              className="overlay"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.3s ease',
                cursor: 'pointer'
              }}
            >
              {/* Text overlay image */}
              <img 
                className="text-img"
                src={quadrant.text}
                alt={`${quadrant.alt} Text`}
                style={{
                  maxWidth: '80%',
                  maxHeight: '80%',
                  objectFit: 'contain',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none'
                }}
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Centered coro_text.png */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 9999
        }}
      >
        <img 
          src="/coro_text.png" 
          alt="Coro Text"
          style={{
            maxWidth: '50%',
            maxHeight: '50%',
            objectFit: 'contain'
          }}
          onError={() => console.error('Failed to load coro_text.png in img tag')}
          onLoad={() => console.log('Coro text img tag loaded')}
        />
      </div>
    </div>
  );
};

export default Homepage;
