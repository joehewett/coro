import React from 'react';
import Navbar from './Navbar';
import ProjectCard from './ProjectCard';
import Footer from './Footer';
import { type ThemeMode, themeUtils } from '../theme';

interface MusicianPageProps {
  theme?: ThemeMode;
}

const MusicianPage: React.FC<MusicianPageProps> = ({ theme = 'light' }) => {
  const projects = [
    {
      id: 1,
      image: '/director/palomitas.png',
      title: 'Palomitas sin Maíz',
      description: 'CORO & Gully',
      route: '/musician/music-video-1'
    },
    {
      id: 2,
      image: '/music/champagnemoon.jpeg',
      title: 'Champagne Moon',
      description: 'CORO',
      route: '/musician/music-video-2'
    },
    {
      id: 3,
      image: '/music/endoftheworld.jpeg',
      title: 'The End of the World (Cover)',
      description: 'CORO & Diego Benavent',
      route: '/musician/music-video-3'
    },
    {
      id: 4,
      image: '/director/superglue.png',
      title: 'SUPERGLUE',
      description: 'CORO & Diego Benavent',
      route: '/musician/music-video-4'
    }
  ];

  return (
    <div className={`min-h-screen ${themeUtils.background(theme)} pt-20`}>
      <Navbar 
        categoryImage="/landing/bottomrighttext.PNG"
        categoryRoute="/musician"
        categoryAlt="Musician"
        theme={theme}
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
      <Footer theme={theme} />
    </div>
  );
};

export default MusicianPage;
