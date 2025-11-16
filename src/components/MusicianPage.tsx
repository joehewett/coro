import React from 'react';
import Navbar from './Navbar';
import ProjectCard from './ProjectCard';
import Footer from './Footer';
import { type ThemeMode, themeUtils } from '../theme';

interface MusicianPageProps {
  theme?: ThemeMode;
}

const MusicianPage: React.FC<MusicianPageProps> = ({ theme = 'orange' }) => {
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

        {/* Alamayo Band Section */}
        <div className="mt-32 flex justify-center">
          <a 
            href="https://www.instagram.com/alamayobanda/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-8 group max-w-2xl"
          >
            {/* Circular Logo */}
            <div className="flex-shrink-0">
              <img 
                src="/music/alamayo.jpg"
                alt="Alamayo Band"
                className="w-32 h-32 rounded-full object-cover shadow-lg transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            
            {/* Description */}
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-foreground mb-3 font-handwritten">
                Alamayo
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Alamayo is a band that I co-founded with my brother Diego. We are a psychedelic rock band that plays a mix of traditional rhythms with contemporary sounds, creating joyful and energetic performances.
              </p>
            </div>
          </a>
        </div>
      </div>
      <Footer theme={theme} />
    </div>
  );
};

export default MusicianPage;
