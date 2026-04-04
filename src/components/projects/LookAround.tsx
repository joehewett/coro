import React from 'react';
import ProjectPage from '../ProjectPage';

const LookAround: React.FC = () => {
  const credits: Array<{ name: string; role: string; isHighlighted?: boolean }> = [
    { name: 'Coro Benavent', role: 'Director', isHighlighted: true },
  ];

  const description = `A young boy perceives a song within three musicians who have seemingly lost their souls, before they can hear it themselves. Where they see a grey London, he sees endless possibility.

Through maps and treasure hunts, he guides them toward a dreamy 1920s concert finale.`;

  const stills = [
    '/director/look-around-still-1.jpg',
    '/director/look-around-still-2.jpg',
    '/director/look-around-still-3.jpg',
    '/director/look-around-still-4.jpg',
  ];

  return (
    <ProjectPage
      title="Look Around"
      categoryImage="/landing/toprighttext.PNG"
      categoryRoute="/director"
      categoryAlt="Director"
      credits={credits}
      description={description}
      mainImage="/director/look-around.jpg"
      status="In Post-Production"
      stills={stills}
    />
  );
};

export default LookAround;
