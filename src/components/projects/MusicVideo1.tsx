import React from 'react';
import MusicVideoPage from '../MusicVideoPage';

const MusicVideo1: React.FC = () => {
  return (
    <MusicVideoPage
      title="Palomitas sin Maíz - CORO & Gully"
      youtubeUrl="https://www.youtube.com/embed/Zgvod014EPA"
      categoryImage="/landing/bottomlefttext.PNG"
      categoryRoute="/musician"
      categoryAlt="Musician"
    />
  );
};

export default MusicVideo1;

