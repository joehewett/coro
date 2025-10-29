import React from 'react';
import Navbar from './Navbar';
import ProjectCard from './ProjectCard';
import Footer from './Footer';

const ActressPage: React.FC = () => {
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
    <div className="min-h-screen bg-black pt-20">
      <Navbar 
        categoryImage="/landing/toplefttext.PNG"
        categoryRoute="/actress"
        categoryAlt="Actress"
        lightMode={false}
      />
      
      {/* Showreel Section */}
      <div className="px-10 max-w-6xl mx-auto pt-32 pb-32">
        <h2 className="text-6xl font-handwritten text-white text-center mb-12">
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

      {/* Image Gallery Section */}
      <div className="px-10 max-w-7xl mx-auto py-32">
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
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

      <Footer lightMode={false} />
    </div>
  );
};

export default ActressPage;
