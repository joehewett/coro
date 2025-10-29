import React from 'react';
import ProjectPage from '../ProjectPage';

const PalomitasSinMaiz: React.FC = () => {
  const credits = [
    { name: 'Coro Benavent', role: 'Created by', isHighlighted: true },
    { name: 'Gabrielle Torreborre', role: 'Created by' },
    { name: 'Coro Benavent', role: 'Starring', isHighlighted: true },
    { name: 'Gulliver Trim', role: 'Starring' },
    { name: 'Dinah Stabb', role: 'Starring' },
    { name: 'Gabrielle Torreborre', role: 'Director' },
    { name: 'Coro Benavent', role: 'Producer', isHighlighted: true },
    { name: 'James Lahaise', role: 'DOP' },
    { name: 'Lucia Lara', role: '1st AD' },
    { name: 'Kate Lovrinov', role: 'AC' },
    { name: 'Lewis Taylor', role: 'Camera Trainee' },
    { name: 'Gina Atkinson', role: 'Art Director' },
    { name: 'Megha Maria Maruca', role: 'Costume Designer' },
    { name: 'Aanandita Dhar', role: 'Hair Stylist' },
    { name: 'Maria Beker', role: 'MUA' },
    { name: 'Jane Giubbilei', role: 'MUA' },
    { name: 'Paul Bianchi', role: 'BTS Photography' },
    { name: 'Gabrielle Torreborre', role: 'Editor' },
    { name: 'Company 3', role: 'Colour' },
    { name: 'Santino Napolitano', role: 'Colourist' },
    { name: 'FOMO Rentals', role: 'Kit' },
    { name: 'Kodak', role: 'Film' },
    { name: 'Digital Orchard', role: 'Development and Scan' }
  ];

  const description = `Wrote, created and produced the music video for "Palomitas sin maíz", a song I wrote to my grandmother the day that she left us. The narrative explored my relationship to her and the other female role models in my life. It was shot on 16mm and starred Dinah Stabb, Gully, a horse and I.

It won the cinematography award at the British Young Arrows, was featured by Kodak, reviewed by Promonews, and pre-nominated for the Shiny Awards. This project marked the birth of my creative partnership with Gabrielle Torreborre and our film production company, Garo Studios. Through working hands-on with Gabby as the director, Coro learned invaluable lessons about filmmaking and collaboration.

Shot on 16mm, the film creates a soft, reminiscent atmosphere, revolving around a beautiful memory. This video gave us the chance to reflect, process, and remember to be grateful for those we still have around us and to celebrate those who have long left.`;

  return (
    <ProjectPage
      title="Palomitas Sin Maiz"
      categoryImage="/landing/toprighttext.PNG"
      categoryRoute="/director"
      categoryAlt="Director"

      credits={credits}
      description={description}
      mainImage="/director/palomitas.png"
      // additionalInfo={additionalInfo}
      youtubeUrl="https://www.youtube.com/embed/Zgvod014EPA"
    />
  );
};

export default PalomitasSinMaiz;
