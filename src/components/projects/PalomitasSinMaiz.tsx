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

  const description = `Wrote, created and produced the music video for "Palomitas sin maíz", a song I wrote to my grandmother the day that she passed away. The narrative explored my relationship to her and the other female role models in my life. It was shot on 16mm and starred Dinah Stabb, Gully (a musician), a horse and myself. 

  The 2-day shoot was featured by Kodak, reviewed by Promonews and has been pre-nominated for the Shiny Awards. This project was the first film I created alongside my creative partner Gabrielle Torreborre, when our film production company was born, Garo Studios.

  Watch: https://youtu.be/Zgvod014EPA`;

  const additionalInfo = `I wrote this song for my grandmother the night she left us. The narrative explores our relationships with our female role models, a joyful tribute to life and the memories that outlast it.

  Shot on 16mm, the film creates a soft, reminiscent atmosphere, revolving around a beautiful memory. This video gave us the chance to reflect, process, and remember to be grateful for those we still have around us and to celebrate those who have long left.

  The film stars Dinah Stabb, musician Gully, a horse, and myself. It won the cinematography award at the British Young Arrows, was featured by Kodak, reviewed by Promonews, and pre-nominated for the Shiny Awards.

  This project marked the birth of my creative partnership with Gabrielle Torreborre and our film production company, Garo Studios.`;

  return (
    <ProjectPage
      title="Palomitas Sin Maiz"
      categoryImage="/landing/toprighttext.PNG"
      categoryRoute="/director"
      categoryAlt="Director"

      credits={credits}
      description={description}
      mainImage="/director/palomitas.png"
      additionalInfo={additionalInfo}
    />
  );
};

export default PalomitasSinMaiz;
