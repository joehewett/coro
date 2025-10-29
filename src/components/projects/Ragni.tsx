import React from 'react';
import ProjectPage from '../ProjectPage';

const Ragni: React.FC = () => {
  const credits = [
    { name: 'Garo Studios', role: 'Created by' },
    { name: 'Coro Benavent', role: 'Creative Producer', isHighlighted: true }
  ];

  const description = `Creative Producer for Ragni - a music video created by Garo Studios, currently in post-production.

  A woman enters into a new relationship, but what begins as a gentle, promising romance slowly devolves, and she begins to see spiders everywhere she goes.

  Status: In Post-production`;

  const additionalInfo = `Ragni explores the fear many women share: being reduced to gendered expectations within a relationship. Here, the recurring presence of spiders becomes a metaphor for imposed gender roles and the anxieties of impending motherhood.

  On the flip side, female spiders are known for dominating their male counterparts. This shows the arbitrary nature of these gendered dynamics, and will be explored through the dance sequence where the woman dominates the space, surrounded by passive or fearful male onlookers/dancers.`;

  return (
    <ProjectPage
      title="Ragni"
      categoryImage="/landing/toprighttext.PNG"
      categoryRoute="/director"
      categoryAlt="Director"

      credits={credits}
      description={description}
      mainImage="/director/ragni.png"
      additionalInfo={additionalInfo}
    />
  );
};

export default Ragni;

