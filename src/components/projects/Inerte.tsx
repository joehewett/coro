import React from 'react';
import ProjectPage from '../ProjectPage';

const Inerte: React.FC = () => {
  const credits = [
    { name: 'Coro Benavent', role: 'Actress', isHighlighted: true },
    { name: 'Lourdes Consentino', role: 'Director' }
  ];

  const description = `Una chica se encuentra en conflicto con su propios pensamientos que la vienen ahogando desde hace tiempo. Se la ve en un espacio íntimo donde comienza a cuestionarse el daño que se hace a ella misma al darle protagonismo a la opinión de los demás. Allí realiza un descargo emocional que le da el empujón para salir de su zona de confort y poder tomar las riendas de su vida, dejando atrás el sobre análisis exhaustivo que daña su salud mental.

Ver más en Behance: https://www.behance.net/gallery/142827749/Inerte-Cortometraje`;

  return (
    <ProjectPage
      title="Inerte"
      categoryImage="/landing/toplefttext.PNG"
      categoryRoute="/actress"
      categoryAlt="Actress"

      credits={credits}
      description={description}
      mainImage="/actress/inerte.jpg"
    />
  );
};

export default Inerte;

