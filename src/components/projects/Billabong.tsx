import React from 'react';
import MusicVideoPage from '../MusicVideoPage';

const Billabong: React.FC = () => {
  return (
    <MusicVideoPage
      title="Billabong Surf"
      youtubeUrl="https://www.youtube.com/embed/1G1yeA002VI"
      categoryImage="/landing/toplefttext.PNG"
      categoryRoute="/actress"
      categoryAlt="Actress"
    />
  );
};

export default Billabong;

