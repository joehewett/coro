import React from 'react';
import ProjectPage from '../ProjectPage';

const LookAround: React.FC = () => {
  const credits: Array<{ name: string; role: string; isHighlighted?: boolean }> = [
    // Direction & Production
    { name: 'Coro Benavent', role: 'Director', isHighlighted: true },
    { name: 'James Lahaise', role: 'Director of Photography' },
    { name: 'Gabrielle Torreborre', role: 'Producer' },
    { name: 'Ana Luísa Lellis', role: 'Producer' },
    { name: 'Lara Kuppel', role: 'Assistant Director' },

    // Art Department
    { name: 'Grey Hwang', role: 'Production Designer' },
    { name: 'Shealin Murphy', role: 'Art Director' },
    { name: 'Lucy Derheimer', role: 'Art Assistant' },
    { name: 'María Mayer', role: 'Art Assistant' },

    // Camera & Lighting
    { name: 'Kate Lovrinov', role: '2nd AC' },
    { name: 'Max Goodkind', role: 'Gaffer' },
    { name: 'Solomon Burke', role: 'Spark' },
    { name: 'Elia Gagliardi', role: 'Spark' },
    { name: 'Jag Conception', role: 'Spark' },

    // Costume, Hair & MUA
    { name: 'Megha Maria Marucca', role: 'Costume' },
    { name: 'María Bekker', role: 'Hair & MUA' },
    { name: 'Xin Maria', role: 'Hair & MUA' },

    // Production
    { name: 'Arianna Scarpa', role: 'Production Assistant' },
    { name: 'Lewis Taylor', role: 'Production Assistant' },
    { name: 'Anna Maren Kristofova', role: 'BTS Photography' },

    // Cast
    { name: 'Huxley Syers', role: 'Young Actor' },
    { name: 'Daniel Westcott-Toi', role: 'Vocalist' },
    { name: 'Shazzide Osariemen', role: 'Vocalist' },
    { name: 'Alex Lemon (LEMZI)', role: 'Rapper' },
    { name: 'Alex Rancovas', role: 'Melodica' },

    // Band
    { name: 'Edwin Kwapong', role: 'Drums' },
    { name: 'Peter Wicker', role: 'Bass' },
    { name: 'Michael Alexander', role: 'Lead Guitar' },
    { name: 'Alex Chiu', role: 'Keyboard' },

    // Extras
    { name: 'Giulia Improta, Maxime O\'Malley, Disha Amarnani, Rosanna Maruca, Marie Lundqvist, Arianna Scarpa, Kindred Salway, Harvey Hamer, Michael Stanway, Ananya Tej, Joe Griffith, Sofía Pascual, Rebeca Pascual, Rachel Duffy, Gabrielle Torreborre, María Luque Anguita, Nehemie Alice, Ayo Ladenika, Louis Mosquera', role: 'Extras' },
  ];

  const description = `A young boy perceives a song within three musicians who have seemingly lost their souls, before they can hear it themselves. Where they see a grey London, he sees endless possibility.

Through maps and treasure hunts, he guides them toward a dreamy 1920s concert finale.`;

  const stills = [
    '/director/look-around-still-1.jpg',
    '/director/look-around-still-2.jpg',
    '/director/look-around-still-3.jpg',
    '/director/look-around-still-4.jpg',
  ];

  return (
    <ProjectPage
      title="Look Around"
      categoryImage="/landing/toprighttext.PNG"
      categoryRoute="/director"
      categoryAlt="Director"
      credits={credits}
      description={description}
      mainImage="/director/look-around.jpg"
      status="In Post-Production"
      stills={stills}
    />
  );
};

export default LookAround;
