import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface MusicVideoPageProps {
  title: string;
  youtubeUrl: string;
  spotifyUrl?: string;
  categoryImage: string;
  categoryRoute: string;
  categoryAlt: string;
}

const MusicVideoPage: React.FC<MusicVideoPageProps> = ({
  title,
  youtubeUrl,
  spotifyUrl,
  categoryImage,
  categoryRoute,
  categoryAlt
}) => {
  // Create repeating title text
  const repeatingTitle = Array(20).fill(title).join(' ');

  return (
    <div className="bg-white text-black">
      <Navbar 
        categoryImage={categoryImage}
        categoryRoute={categoryRoute}
        categoryAlt={categoryAlt}
        lightMode={true}
      />
      
      {/* Main content - full viewport height */}
      <div className="h-screen pt-20 flex flex-col">
        {/* Repeating title bar */}
        <div className="w-full py-5 overflow-hidden whitespace-nowrap text-5xl font-bold text-gray-700 font-handwritten">
          {repeatingTitle}
        </div>

        {/* Centered video */}
        <div className="flex-1 flex justify-center items-center px-10">
          {/* YouTube embed */}
          <div className="w-full max-w-4xl flex flex-col items-center gap-6">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={youtubeUrl}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            
            {/* Spotify embed */}
            {spotifyUrl && (
              <div className="w-full">
                <iframe
                  style={{ borderRadius: '12px' }}
                  src={spotifyUrl}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer - off the page */}
      <Footer lightMode={true} />
    </div>
  );
};

export default MusicVideoPage;

