import React from 'react';
import ProjectPage from '../ProjectPage';

const Superglue: React.FC = () => {
  const credits = [
    { name: 'Paula Lindblom', role: 'Starring' },
    { name: 'Harry Mason', role: 'Starring' },
    { name: 'Mariia Litvin', role: 'Dancer & Choreographer' },
    { name: 'Stepan Kozhaev', role: 'Dancer & Choreographer' },
    { name: 'Diego Benavent', role: 'Artist' },
    { name: 'Coro Benavent', role: 'Director & Artist', isHighlighted: true },
    { name: 'Chiara Carrubba', role: 'Producer' },
    { name: 'Leon Silavant', role: 'DOP' },
    { name: 'Arianna Scarpa', role: '1st AD' },
    { name: 'Shealin Murphy', role: 'Art Director' },
    { name: 'David Gregory', role: 'AC' },
    { name: 'Andrea Robustini', role: 'Steadicam Operator' },
    { name: 'Gabrielle Torreborre', role: 'Production Assistant' },
    { name: 'Karina Stephan', role: 'Gaffer' },
    { name: 'Maria Mayer', role: 'Art Assistant' },
    { name: 'Kitty Lok Lam Ma', role: 'Art Assistant' },
    { name: 'Maria Bekker', role: 'Hair and Make-up' },
    { name: 'Karan Kaur', role: 'Hair and Make-up' },
    { name: 'Coro Benavent', role: 'Costume Designer', isHighlighted: true },
    { name: 'Rastine Mir', role: 'Spark' },
    { name: 'Fatima Zahara Khan', role: 'Spark' },
    { name: 'Gabrielle Torreborre', role: 'Editor & BTS Photography' },
    { name: 'Santino Napolitano', role: 'Colourist' },
    { name: 'Company 3', role: 'Colour' },
    { name: 'Alberto Martínez-Llop Prieto (MWolf)', role: 'Music Producer' },
    { name: 'Fadrique Kindler Von Knobloch Luengo (Kindler)', role: 'Music Producer' },
    { name: 'Max Lyons-Depont', role: 'Sound' },
    { name: 'FOMO Rentals', role: 'Kit' },
    { name: 'Diego Cayuela', role: 'Music Composer' },
    { name: 'Diego Benavent', role: 'Music Composer' },
    { name: 'Coro Benavent', role: 'Music Composer', isHighlighted: true },
  ];

  const description = `Using the central metaphor of a broken plate, this film examines whether fractured relationships can be repaired. When two former lovers reunite, they face a vulnerable moment of truth: can what's been shattered be made whole again?

  The characters and their emotions come alive through movement and dance, each gesture revealing the weight of their time apart, the pain of what was lost, and the fragile hope of repair. They are finally confronted by the question: Is their bond strong enough to hold, or will the cracks always show?

 `;

  const additionalInfo = ``;

  return (
    <ProjectPage
      title="SUPERGLUE"
      categoryImage="/landing/toprighttext.PNG"
      categoryRoute="/director"
      categoryAlt="Director"

      credits={credits}
      description={description}
      mainImage="/director/superglue.png"
      additionalInfo={additionalInfo}
      youtubeUrl="https://www.youtube.com/embed/23vBDDMK-68"
    />
  );
};

export default Superglue;
