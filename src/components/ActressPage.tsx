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
          Experiencia
        </h2>
        
        <div className="space-y-16">
          {/* Formación Artística */}
          <div>
            <h3 className={`text-3xl font-handwritten mb-6 ${themeUtils.text(theme)}`}>
              Formación Artística
            </h3>
            <ul className={`space-y-3 text-foreground`}>
              <li>Curso intensivo para profesionales en RADA, Londres</li>
              <li>Curso Semanal Meisner (The London Meisner Company)</li>
              <li>Entrenamiento en Bristol Old Vic Theatre School, Londres</li>
              <li>Tres años en el regular del Estudio Corazza para la Actuación</li>
              <li>2º de Diplomatura de Interpretación para Cine en la Central de Cine</li>
              <li>Formación continua en canto con diferentes maestr@s</li>
              <li>2023. Entrenamiento ante la cámara con el director Álvaro Fernández Armero (Mayo-Junio)</li>
              <li>2021. Seminario "La voz en la actuación", Módulo I y Módulo II y Módulo III impartido por Nuria Castaño en el Estudio Corazza</li>
              <li>2021. Seminario de "Clown Esencial" impartido por Alain Vigneau en el Estudio Corazza</li>
              <li>2019-2021. Componente de la Sociedad de Teatro de la Universidad de Warwick</li>
              <li>2017-2019. Interpretación para el Teatro Musical en la Escuela JANA</li>
            </ul>
          </div>

          {/* Audiovisual */}
          <div>
            <h3 className={`text-3xl font-handwritten mb-6 ${themeUtils.text(theme)}`}>
              Audiovisual
            </h3>
            <ul className={`space-y-3 text-foreground`}>
              <li>2025. Videoclip de SUPERGLUE, composición e interpretación junto con su hermano Diego Benavent: <a href="https://www.youtube.com/watch?v=ALAMAYO-SUPERGLUE" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">ALAMAYO - SUPERGLUE (Official Music Video)</a></li>
              <li>2025. Videoclip de 'Palomitas sin Maíz', composición e interpretación junto con Gully. <a href="https://www.youtube.com/watch?v=palomitas-sin-maiz" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">CORO & Gully - Palomitas sin maíz (Official Music Video)</a></li>
              <li>2024: Short Film "Seeking Girl for Risky Shoot"</li>
              <li>2022. Videoclip en Youtube de "Champagne Moon", composición e interpretación. <a href="https://www.youtube.com/watch?v=champagne-moon" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">CORO - Champagne Moon (Videoclip)</a></li>
              <li>2022. Actriz del Corto "INERTE" de Lourdes Cosentino. <a href="https://www.youtube.com/watch?v=inerte" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Inerte-Cortometraje</a></li>
              <li>2022. Vídeo sesión de surf para anuncio Petit Bambou España</li>
              <li>2020. The End of the World Cover con Diego Benavent <a href="https://www.youtube.com/watch?v=end-of-the-world" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">The end of the world Cover Coro y Diego Benavent</a></li>
            </ul>
          </div>

          {/* Teatro */}
          <div>
            <h3 className={`text-3xl font-handwritten mb-6 ${themeUtils.text(theme)}`}>
              Teatro
            </h3>
            <ul className={`space-y-3 text-foreground`}>
              <li>"The Effect" de Lucy Prebble. Personaje: Connie. Directora: Natalie Simone (2024)</li>
              <li>"La habitación azul" de David Hare. Director: Alberto López Murtra (2024)</li>
              <li>"Terror y miseria del Tercer Reich" de Bertolt Brecht. Director: Alberto López Murtra (2024)</li>
              <li>"Mucho ruido y pocas nueces" de William Shakespeare. Director: James Murray (2023)</li>
              <li>"High School Musical" Directora: Miriam Madrid. Teatro INFANTA ISABEL (2020)</li>
              <li>"La novia Cadáver" Director: Jacobo Muñoz. En la Escuela de JANA. Personaje: Blandito (2019)</li>
              <li>"Romeo y Julieta" de William Shakespeare. International College of Spain. Lord Capulet (2017)</li>
            </ul>
          </div>

          {/* Otras Habilidades */}
          <div>
            <h3 className={`text-3xl font-handwritten mb-6 ${themeUtils.text(theme)}`}>
              Otras Habilidades / Capacidades
            </h3>
            <div className={`space-y-4 text-foreground`}>
              <div>
                <strong>Deportes:</strong> Baloncesto, Surf, Baile, Esquí, Tenis, Pádel, Fútbol, Natación, Ciclismo, Atletismo
              </div>
              <div>
                <strong>Música:</strong> Cantante, guitarra, ukelele y piano básico
              </div>
              <div>
                <strong>Idiomas:</strong> Castellano (nativo), Inglés (bilingüe), Francés (básico)
              </div>
              <div>
                <strong>Otros:</strong> Directora, escritora y productora de películas
              </div>
            </div>
          </div>

          {/* Formación No Artística */}
          <div>
            <h3 className={`text-3xl font-handwritten mb-6 ${themeUtils.text(theme)}`}>
              Formación No Artística
            </h3>
            <ul className={`space-y-3 text-foreground`}>
              <li>2019-2022. Sociología y Desarrollo Global Sostenible en University of Warwick, UK</li>
              <li>2017-2019. IB (Bachillerato Internacional) en el ICS (International College of Spain, Madrid)</li>
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
