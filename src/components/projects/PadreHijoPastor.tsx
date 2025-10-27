import React from 'react';
import ProjectPage from '../ProjectPage';

const PadreHijoPastor: React.FC = () => {
  const credits = [
    { name: 'Coro Benavent', role: 'Director\'s Assistant', isHighlighted: true }
  ];

  const description = `Director's Assistant for Hijo, Padre, Pastor - a feature documentary currently in post-production.

  Fighting the tide of large-scale, commercial farming, a Spanish shepherd embarks on a 700 kilometre journey with his 70 year old father, two young sons and flock of 1700 sheep.

  Status: In Post-production`;

  const additionalInfo = `This feature documentary captures a disappearing way of life, following a multi-generational journey that represents both family tradition and resistance to modern commercial farming practices.

  The film documents the challenges and beauty of traditional shepherding, exploring themes of heritage, family bonds, and the clash between old and new ways of life in rural Spain.`;

  return (
    <ProjectPage
      title="Padre. Hijo. Pastor"
      categoryImage="/landing/toprighttext.PNG"
      categoryRoute="/director"
      categoryAlt="Director"

      credits={credits}
      description={description}
      mainImage="/director/padre.jpg"
      additionalInfo={additionalInfo}
    />
  );
};

export default PadreHijoPastor;
