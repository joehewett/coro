import React from 'react';
import MusicVideoPage from '../MusicVideoPage';

const MusicVideo2: React.FC = () => {
  return (
    <MusicVideoPage
      title="Champagne Moon - CORO"
      youtubeUrl="https://www.youtube.com/embed/DJiASArAgN4"
      spotifyUrl="https://open.spotify.com/embed/track/1NSuBOR1sCArcTR02oDkMn?utm_source=generator"
      categoryImage="/landing/bottomlefttext.PNG"
      categoryRoute="/musician"
      categoryAlt="Musician"
    />
  );
};

export default MusicVideo2;

