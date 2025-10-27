import React from 'react';
import Navbar from './Navbar';
import ProjectCard from './ProjectCard';
import Footer from './Footer';

const ActressPage: React.FC = () => {
  // Dummy project data - replace with real data later
  const projects = [
    {
      id: 1,
      image: '/coro1.webp',
      title: 'Palomitas Sin Maiz',
      description: 'A short film exploring the boundaries of reality and imagination',
      route: '/actress/palomitas-sin-maiz'
    },
    {
      id: 2,
      image: '/coro5.webp',
      title: 'Summer Dreams',
      description: 'Feature film debut as the lead character in this coming-of-age story',
      route: '/actress/summer-dreams'
    },
    {
      id: 3,
      image: '/coro9.webp',
      title: 'Urban Tales',
      description: 'Anthology series showcasing diverse stories from city life',
      route: '/actress/urban-tales'
    },
    {
      id: 4,
      image: '/coro14.webp',
      title: 'The Last Dance',
      description: 'Dramatic performance in this award-winning theater production',
      route: '/actress/the-last-dance'
    }
  ];

  // Generate array of image paths for the gallery
  const galleryImages = Array.from({ length: 26 }, (_, i) => `/actress/img${i + 1}.jpeg`);

  return (
    <div className="min-h-screen bg-white pt-20">
      <Navbar 
        categoryImage="/landing/toplefttext.PNG"
        categoryRoute="/actress"
        categoryAlt="Actress"
        lightMode={true}
      />
      
      {/* Showreel Section */}
      <div className="px-10 max-w-6xl mx-auto pt-32 pb-32">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full shadow-lg"
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
            <div key={index} className="break-inside-avoid">
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
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Projects</h2>
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

      <Footer lightMode={true} />
    </div>
  );
};

export default ActressPage;
