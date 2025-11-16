import React from 'react';
import Navbar from './Navbar';
import ProjectCard from './ProjectCard';
import Footer from './Footer';
import { type ThemeMode, themeUtils } from '../theme';

interface ActressPageProps {
  theme?: ThemeMode;
}

const ActressPage: React.FC<ActressPageProps> = ({ theme = 'beige' }) => {
  // Dummy project data - replace with real data later
  const projects = [
    {
      id: 1,
      image: '/actress/inerte.jpg',
      title: 'Inerte',
      description: 'Un cortometraje sobre el conflicto interno y la búsqueda de liberación emocional',
      route: '/actress/inerte'
    },
    {
      id: 2,
      image: '/director/palomitas.png',
      title: 'Palomitas Sin Maiz',
      description: 'A short film exploring the boundaries of reality and imagination',
      route: '/director/palomitas-sin-maiz'
    },
    {
      id: 3,
      image: '/actress/sesion-de-surf.jpg',
      title: 'Sesión de Surf',
      description: 'Feature film debut as the lead character in this coming-of-age story',
      route: '/actress/sesion-de-surf'
    },
    {
      id: 4,
      image: '/actress/billabong.jpg',
      title: 'Billabong Surf',
      description: 'A girl surfing in the waves of the ocean',
      route: '/actress/billabong'
    }
  ];

  // Generate array of image paths for the gallery
  const excludedImages = [13, 14, 15, 16, 23];
  const galleryImages = Array.from({ length: 34 }, (_, i) => i + 1)
    .filter(num => !excludedImages.includes(num))
    .map(num => `/actress/img${num}.jpeg`);

  return (
    <div className={`min-h-screen ${themeUtils.background(theme)} pt-20`}>
      <Navbar 
        categoryImage="/landing/toplefttext.PNG"
        categoryRoute="/actress"
        categoryAlt="Actress"
        theme={theme}
      />
      
      {/* Showreel Section */}
      <div className="px-10 max-w-6xl mx-auto pt-32 pb-32">
        <h2 className={`text-6xl font-handwritten text-center mb-12 ${themeUtils.text(theme)}`}>
          Acting Showreel
        </h2>
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/3lYq80w47Mg"
            title="Acting Showreel"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>

      {/* Experience Section */}
      <div className="px-10 max-w-6xl mx-auto py-32">
        <h2 className={`text-6xl font-handwritten text-center mb-20 ${themeUtils.text(theme)}`}>
          Experience
        </h2>
        
        <div className="space-y-16">
          {/* Artistic Training */}
          <div>
            <h3 className={`text-3xl font-handwritten mb-6 ${themeUtils.text(theme)}`}>
              Artistic Training
            </h3>
            <ul className={`space-y-3 text-foreground`}>
              <li>Intensive professional course at RADA, London</li>
              <li>Weekly Meisner Course (The London Meisner Company)</li>
              <li>Training at Bristol Old Vic Theatre School, London</li>
              <li>Three years in Estudio Corazza's regular acting program</li>
              <li>2nd Year Diploma in Film Acting at Central de Cine</li>
              <li>Continuous vocal training with various teachers</li>
              <li>2023. On-camera training with director Álvaro Fernández Armero (May-June)</li>
              <li>2021. "Voice in Acting" workshop, Module I, II and III taught by Nuria Castaño at Estudio Corazza</li>
              <li>2021. "Essential Clown" workshop taught by Alain Vigneau at Estudio Corazza</li>
              <li>2019-2021. Member of the University of Warwick Theatre Society</li>
              <li>2017-2019. Musical Theatre Performance at JANA School</li>
            </ul>
          </div>

          {/* Audiovisual */}
          <div>
            <h3 className={`text-3xl font-handwritten mb-6 ${themeUtils.text(theme)}`}>
              Film & Video
            </h3>
            <ul className={`space-y-3 text-foreground`}>
              <li>2025. SUPERGLUE music video, composed and performed with her brother Diego Benavent: <a href="https://www.youtube.com/watch?v=ALAMAYO-SUPERGLUE" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">ALAMAYO - SUPERGLUE (Official Music Video)</a></li>
              <li>2025. 'Palomitas sin Maíz' music video, composed and performed with Gully. <a href="https://www.youtube.com/watch?v=palomitas-sin-maiz" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">CORO & Gully - Palomitas sin maíz (Official Music Video)</a></li>
              <li>2024. Short Film "Seeking Girl for Risky Shoot"</li>
              <li>2022. "Champagne Moon" music video on YouTube, composed and performed. <a href="https://www.youtube.com/watch?v=champagne-moon" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">CORO - Champagne Moon (Music Video)</a></li>
              <li>2022. Actress in short film "INERTE" by Lourdes Cosentino. <a href="https://www.youtube.com/watch?v=inerte" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Inerte - Short Film</a></li>
              <li>2022. Surf session video for Petit Bambou Spain advertisement</li>
              <li>2020. The End of the World Cover with Diego Benavent <a href="https://www.youtube.com/watch?v=end-of-the-world" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">The End of the World Cover - Coro & Diego Benavent</a></li>
            </ul>
          </div>

          {/* Theatre */}
          <div>
            <h3 className={`text-3xl font-handwritten mb-6 ${themeUtils.text(theme)}`}>
              Theatre
            </h3>
            <ul className={`space-y-3 text-foreground`}>
              <li>"The Effect" by Lucy Prebble. Role: Connie. Director: Natalie Simone (2024)</li>
              <li>"The Blue Room" by David Hare. Director: Alberto López Murtra (2024)</li>
              <li>"Fear and Misery of the Third Reich" by Bertolt Brecht. Director: Alberto López Murtra (2024)</li>
              <li>"Much Ado About Nothing" by William Shakespeare. Director: James Murray (2023)</li>
              <li>"High School Musical" Director: Miriam Madrid. INFANTA ISABEL Theatre (2020)</li>
              <li>"Corpse Bride" Director: Jacobo Muñoz. At JANA School. Role: Blandito (2019)</li>
              <li>"Romeo and Juliet" by William Shakespeare. International College of Spain. Lord Capulet (2017)</li>
            </ul>
          </div>

          {/* Skills */}
          <div>
            <h3 className={`text-3xl font-handwritten mb-6 ${themeUtils.text(theme)}`}>
              Skills & Abilities
            </h3>
            <div className={`space-y-4 text-foreground`}>
              <div>
                <strong>Sports:</strong> Basketball, Surfing, Dance, Skiing, Tennis, Padel, Football, Swimming, Cycling, Athletics
              </div>
              <div>
                <strong>Music:</strong> Singer, guitar, ukulele and basic piano
              </div>
              <div>
                <strong>Languages:</strong> Spanish (native), English (bilingual), French (basic)
              </div>
              <div>
                <strong>Other:</strong> Director, writer and film producer
              </div>
            </div>
          </div>

          {/* Academic Education */}
          <div>
            <h3 className={`text-3xl font-handwritten mb-6 ${themeUtils.text(theme)}`}>
              Academic Education
            </h3>
            <ul className={`space-y-3 text-foreground`}>
              <li>2019-2022. Sociology and Global Sustainable Development at University of Warwick, UK</li>
              <li>2017-2019. IB (International Baccalaureate) at ICS (International College of Spain, Madrid)</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="pt-8 border-t border-muted">
            <p className={`text-center text-foreground`}>
              Instagram: <a href="https://instagram.com/corobenavent" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">@corobenavent</a>
            </p>
          </div>
        </div>
      </div>

      {/* Image Gallery Section */}
      <div className="px-10 max-w-7xl mx-auto py-32">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryImages.map((image, index) => (
            <div key={index} className="break-inside-avoid relative group">
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-auto shadow-md hover:shadow-xl transition-shadow duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div className="px-10 max-w-7xl mx-auto py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              image={project.image}
              title={project.title}
              description={project.description}
              route={project.route}
            />
          ))}
        </div>
      </div>

      <Footer theme={theme} />
    </div>
  );
};

export default ActressPage;
