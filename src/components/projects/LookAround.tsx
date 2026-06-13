import React from 'react';
import ProjectPage from '../ProjectPage';

const LookAround: React.FC = () => {
  const credits: Array<{ name: string; role: string; isHighlighted?: boolean }> = [
    // Direction & Production
    { name: 'Coro Benavent', role: 'Director & Editor', isHighlighted: true },
    { name: 'Gabrielle Torreborre', role: 'Producer' },
    { name: 'Ana Luísa Lellis', role: 'Producer' },
    { name: 'James Lahaise', role: 'Director of Photography' },

    // Cast
    { name: 'Huxley Syers', role: 'Young Boy' },
    { name: 'Daniel Westcott-Toi', role: 'Vocalist' },
    { name: 'Alex Lemon (LEMZI)', role: 'Vocalist' },
    { name: 'Shazzide Osariemen', role: 'Vocalist' },

    // Musicians
    { name: 'Edwin Kwapong', role: 'Drums' },
    { name: 'Peter Wicker', role: 'Bass' },
    { name: 'Michael Alexander', role: 'Lead Guitar' },
    { name: 'Alex Chiu', role: 'Keyboard' },
    { name: 'Alex Rancovas', role: 'Melodica' },

    // Camera, Grip & Lighting
    { name: 'Lara Kuppel', role: 'Assistant Director' },
    { name: 'Arianna Scarpa', role: '3rd Assistant Director' },
    { name: 'Kate Lovrinov', role: '2nd AC' },
    { name: 'Max Goodkind', role: 'Gaffer' },
    { name: 'Elia Gagliardi', role: 'Spark' },
    { name: 'Solomon Burke', role: 'Spark' },
    { name: 'Jag Conception', role: 'Spark' },
    { name: 'Lewis Taylor', role: 'Spark Trainee' },

    // Art Department
    { name: 'Grey Hwang', role: 'Production Designer' },
    { name: 'Shealin Murphy', role: 'Art Director' },
    { name: 'Lucy Derheimer', role: 'Set Dresser' },
    { name: 'María Mayer', role: 'Maps' },
    { name: 'Lucy Derheimer', role: 'Maquette & Figurines' },
    { name: 'Kathryn (Cockney Green)', role: 'Graffiti Artist' },
    { name: 'Alan Davis', role: 'Graffiti Artist' },

    // Hair, Make Up & Costume
    { name: 'María Bekker', role: 'Hair & Make Up' },
    { name: 'Xin Maria', role: 'Hair & Make Up' },
    { name: 'Megha Maria Marucca', role: 'Costume Designer' },

    // Behind the Scenes
    { name: 'Anna Maren Kristofova', role: 'Behind the Scenes' },

    // Sound
    { name: 'João Martins', role: 'Mixing Engineer' },
    { name: 'Sewor', role: 'Recording Engineer' },
    { name: 'Nestor Sarabia', role: 'Video Sound Engineer' },

    // Colour
    { name: 'Company 3', role: 'Colour' },
    { name: 'Santino', role: 'Colorist' },
    { name: 'Kerri Aungle', role: 'Colour Producer' },

    // Film & Post
    { name: 'Kodak', role: 'Film Stock & Development' },
    { name: 'Digital Orchard', role: 'Scan' },
    { name: 'SHL London', role: 'Lighting' },

    // Studios
    { name: 'Crixus Studios', role: 'Studio' },
    { name: 'Studio Bohemian', role: 'Studio' },

    // Supporting Artists
    { name: 'Giulia Improta, Katie Welsh, Disha Amarnani, Rosanna Maruca, Marie Lundqvist, Kindred Salway, Harvey Hamer, Michael Stanway, Ananya Tej, Sofía Pascual, Rebeca Pascual, Nabeel Renaaz, María Luque Anguita, Nehemia Alice, Ayo Ladenike, Louis Mosquera, Martín Escobar, Lorna Bermingham, Guy Nitzani, Koko, Denys Kutsak, Molly Chadwick, Siena Toi, Archie Long, Rose Marie Stephenson, Remy Murphy, Emma Vais, Isabella Zapata, Whitney Moss, Rose Anne Stephenson', role: 'Supporting Artists' },
  ];

  const description = `A young boy perceives a song within three musicians who have seemingly lost their souls, before they can hear it themselves. Where they see a grey London, he sees endless possibility.

Through maps and treasure hunts, he guides them toward a dreamy 1920s concert finale.`;

  const stills = [
    '/director/look-around-still-1.jpg',
    '/director/look-around-still-2.jpg',
    '/director/look-around-still-3.jpg',
    '/director/look-around-still-4.jpg',
    '/director/look-around-still-5.jpg',
    '/director/look-around-still-6.jpg',
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
      youtubeUrl="https://www.youtube.com/embed/9ZEv3jyrC3g"
      stills={stills}
    />
  );
};

export default LookAround;
