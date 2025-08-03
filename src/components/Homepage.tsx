import React, { useEffect } from 'react';

const Homepage: React.FC = () => {
  const images = [
    { src: '/coro4.webp', alt: 'Image 1' },
    { src: '/coro5.webp', alt: 'Image 2' },
    { src: '/coro6.webp', alt: 'Image 3' },
    { src: '/coro7.webp', alt: 'Image 4' }
  ];

  useEffect(() => {
    // Debug: Check if images are loading
    const img = new Image();
    img.onload = () => console.log('Coro text loaded successfully');
    img.onerror = () => console.error('Failed to load coro_text.png');
    img.src = '/coro_text.png';
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}>
      {/* 2x2 Grid of images */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', width: '100%', height: '100%' }}>
        {images.map((image, index) => (
          <div 
            key={index}
            style={{ position: 'relative', overflow: 'hidden' }}
            onMouseEnter={(e) => {
              console.log(`Hovering image ${index}`);
              const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement;
              const text = e.currentTarget.querySelector('.text') as HTMLElement;
              if (overlay) overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
              if (text) text.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement;
              const text = e.currentTarget.querySelector('.text') as HTMLElement;
              if (overlay) overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
              if (text) text.style.opacity = '0';
            }}
          >
            {/* Image */}
            <img 
              src={image.src} 
              alt={image.alt}
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
              <span 
                className="text"
                style={{
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none'
                }}
              >
                placeholder
              </span>
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
