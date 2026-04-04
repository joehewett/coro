import React from 'react';
import ProjectPage from '../ProjectPage';

const Ragni: React.FC = () => {
  const credits = [
    { name: 'Gaia Banfi', role: 'Song by' },
    { name: 'Garo Studios', role: 'Created by' },
    { name: 'Gabrielle Torreborre', role: 'Director' },
    { name: 'Coro Benavent', role: 'Producer', isHighlighted: true },
    { name: 'James Lahaise', role: 'Director of Photography' },
    { name: 'Mackenzie Stretch', role: 'Choreographer' },
    { name: 'Fernanda Márquez', role: 'Dance Assistant' },
    { name: 'Lucia Lara Hernandez', role: '1st AD' },
    { name: 'Ernest Tu', role: '1st AC' },
    { name: 'Kate Lovrinov', role: '2nd AC' },
    { name: 'Nathan Claridge', role: 'Steadicam' },
    { name: 'Max Goodkind', role: 'Gaffer' },
    { name: 'Hardik Manmode', role: 'Best Boy' },
    { name: 'Xavier Nolan', role: 'Light Board Op' },
    { name: 'Solomon Burke', role: 'Sparks' },
    { name: 'Emily England', role: 'Production Designer' },
    { name: 'Maria Mayer', role: 'Art Assistant' },
    { name: 'Megha Maria Maruca, Sara Usai', role: 'Costume Designers' },
    { name: 'Maria Bekker, Jonna Nilsson', role: 'Hair Stylists' },
    { name: 'Maria Bekker, Isabel Dawid', role: 'Makeup' },
    { name: 'Lewis Taylor, Maxine Lidman', role: 'Production Assistants' },
    { name: 'Leonie Dwight', role: 'BTS Photography' },
    { name: 'Hannah Orman, Levi Kenway', role: 'Starring' },
    { name: 'Claudio Cabral, Taylor Churchman, Kieran Curtin, Joshua Egundebi, Rishbh Patel, Lorenzo Pryce, Ashcon Rahmani, Aryan Saleheiy', role: 'Dancers' },
    { name: 'Gabrielle Torreborre', role: 'Editor' },
    { name: 'Santino Napolitano', role: 'Colourist' },
    { name: 'Company 3', role: 'Colour' },
    { name: 'London Film Studios', role: 'Studio' },
    { name: 'SHL Film & TV', role: 'Lighting' },
    { name: 'Kodak', role: 'Film Stock' },
    { name: 'Digital Orchard', role: 'Development & Scan' },
  ];

  const description = `A woman enters into a new relationship, but what begins as a gentle, promising romance slowly devolves, and she begins to see spiders everywhere she goes.

#1 Most Watched Music Video of 2025 on Promonews, ahead of Lady Gaga and Snoop Dogg. Nominated for British Young Arrows for Best Unsigned Director and Best Editor.`;

  const additionalInfo = `Ragni explores the fear many women share: being reduced to gendered expectations within a relationship. Here, the recurring presence of spiders becomes a metaphor for imposed gender roles and the anxieties of impending motherhood.

On the flip side, female spiders are known for dominating their male counterparts — showing the arbitrary nature of these gendered dynamics, explored through a dance sequence where the woman dominates the space, surrounded by passive or fearful male onlookers.`;

  return (
    <ProjectPage
      title="Ragni"
      categoryImage="/landing/toprighttext.PNG"
      categoryRoute="/director"
      categoryAlt="Director"
      credits={credits}
      description={description}
      mainImage="/director/ragni-still.jpg"
      additionalInfo={additionalInfo}
      youtubeUrl="https://www.youtube.com/embed/GMujCiddg6E"
    />
  );
};

export default Ragni;
