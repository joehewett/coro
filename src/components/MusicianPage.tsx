import React from 'react';
import Navbar from './Navbar';
import ProjectCard from './ProjectCard';
import Footer from './Footer';

const MusicianPage: React.FC = () => {
  const projects = [
    {
      id: 1,
      image: '/coro3.webp',
      title: 'Palomitas sin Maíz',
      description: 'CORO & Gully',
      route: '/musician/music-video-1'
    },
    {
      id: 2,
      image: '/coro7.webp',
      title: 'Champagne Moon',
      description: 'CORO',
      route: '/musician/music-video-2'
    },
    {
      id: 3,
      image: '/coro11.webp',
      title: 'The End of the World (Cover)',
      description: 'CORO & Diego Benavent',
      route: '/musician/music-video-3'
    },
    {
      id: 4,
      image: '/coro14.webp',
      title: 'SUPERGLUE',
      description: 'CORO & Diego Benavent',
      route: '/musician/music-video-4'
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      <Navbar 
        categoryImage="/landing/bottomrighttext.PNG"
        categoryRoute="/musician"
        categoryAlt="Musician"
        lightMode={true}
      />
      
      <div className="px-10 max-w-7xl mx-auto py-48">
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

export default MusicianPage;
