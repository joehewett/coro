import React from 'react';
import ProjectPage from '../ProjectPage';

const PalomitasSinMaiz: React.FC = () => {
  const credits = [
    { name: 'Maria Rodriguez', role: 'Director' },
    { name: 'Carlos Mendez', role: 'Producer' },
    { name: 'Coro', role: 'Lead Actress', isHighlighted: true },
    { name: 'Juan Pablo Silva', role: 'Cinematographer' },
    { name: 'Ana Lucia Torres', role: 'Supporting Actress' },
    { name: 'Roberto Fernandez', role: 'Editor' },
    { name: 'Sofia Martinez', role: 'Production Designer' },
    { name: 'Diego Ramirez', role: 'Sound Design' }
  ];

  const description = `Palomitas Sin Maiz is an experimental short film that challenges conventional narrative structures while exploring themes of memory, identity, and the surreal nature of everyday life. Set in a small coastal town, the film follows a young woman who discovers that her dreams are bleeding into reality, creating a tapestry of interconnected moments that blur the line between what is real and what is imagined.

  The project was filmed over three weeks in various locations along the coast, utilizing natural light and minimal equipment to capture the raw, dreamlike quality that defines the visual language of the film. Our approach was to create a sense of unease and wonder, allowing the audience to experience the protagonist's journey through a lens of magical realism.

  This film marks a significant milestone in my acting career, as it required me to embody multiple versions of the same character across different temporal and emotional planes. The challenge was to maintain a cohesive performance while allowing each iteration to have its own distinct personality and motivations.`;

  const additionalInfo = `The film premiered at the Cannes Film Festival Short Film Corner and has since been selected for numerous international festivals. The unique visual style and non-linear narrative structure have sparked conversations about the future of experimental cinema and the role of dreams in storytelling. Working on this project taught me the importance of trusting the creative process and embracing ambiguity as a powerful narrative tool.`;

  return (
    <ProjectPage
      title="Palomitas Sin Maiz"
      categoryImage="/landing/toplefttext.PNG"
      categoryRoute="/actress"
      categoryAlt="Actress"

      credits={credits}
      description={description}
      mainImage="/coro-headshot.jpg"
      additionalInfo={additionalInfo}
    />
  );
};

export default PalomitasSinMaiz;
