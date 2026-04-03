import React from 'react';
import ProjectPage from '../ProjectPage';

const LookAround: React.FC = () => {
  const credits: Array<{ name: string; role: string; isHighlighted?: boolean }> = [
    { name: 'Coro Benavent', role: 'Director', isHighlighted: true },
  ];

  const description = `Coming soon.`;

  return (
    <ProjectPage
      title="Look Around"
      categoryImage="/landing/toprighttext.PNG"
      categoryRoute="/director"
      categoryAlt="Director"
      credits={credits}
      description={description}
      mainImage=""
      status="In Post-Production"
    />
  );
};

export default LookAround;
