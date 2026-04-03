import React from 'react';
import ProjectPage from '../ProjectPage';

const Tonos: React.FC = () => {
  const credits = [
    { name: 'Coro Benavent', role: 'Director & Lead Actress', isHighlighted: true },
    { name: 'Julio Peña', role: 'Lead Actor' },
    { name: 'Aleksandra Sykulak', role: 'Writer' },
    { name: 'Gabrielle Torreborre', role: 'Executive Producer' },
    { name: 'Teresa Trueba', role: 'Associate Producer' },
    { name: 'Crea Sullivan', role: 'Composer' },
    { name: 'Garo Studios', role: 'Production Company' },
  ];

  const description = `Athenea grew up on a farm in Spain surrounded by animals and a big loud family. With them, she barely needed to speak. At school, her best friend Alberto spoke on her behalf. Now in her 20s, she moves to London to prove she has a voice of her own. When Alberto reappears, he tricks her into confronting her biggest fear.

This film is personal. It's about the voice I lost as a child and the years it took to find it again. It's about the small creatures I kept close by and about my best friend Alejandro who would speak for me until teachers separated us into different classes.

Shot on 16mm film. Written by BAFTA-winning screenwriter Aleksandra Sykulak. Starring Julio Peña (Netflix's Berlin, El Cautivo).`;

  const additionalInfo = `Tonos is a Garo Studios production. A women-led team championing auteur-driven cinema.

Visit the film's website: https://tonos.film`;

  return (
    <ProjectPage
      title="TONOS"
      categoryImage="/landing/toprighttext.PNG"
      categoryRoute="/director"
      categoryAlt="Director"

      credits={credits}
      description={description}
      mainImage="/director/tonos.jpeg"
      additionalInfo={additionalInfo}
      status="In Pre-Production"
    />
  );
};

export default Tonos;
