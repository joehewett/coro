import React from 'react';
import MusicVideoPage from '../MusicVideoPage';

const MusicVideo1: React.FC = () => {
  return (
    <MusicVideoPage
      title="Palomitas sin Maíz - CORO & Gully"
      youtubeUrl="https://www.youtube.com/embed/Zgvod014EPA"
      spotifyUrl="https://open.spotify.com/embed/track/7CILggdAdwn3MICyNAY6V5?utm_source=generator"
      categoryImage="/landing/bottomlefttext.PNG"
      categoryRoute="/musician"
      categoryAlt="Musician"
    />
  );
};

export default MusicVideo1;

