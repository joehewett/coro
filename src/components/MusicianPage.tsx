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

        {/* Spotify Link */}
        <div className="mt-20 flex justify-center">
          <a
            href="https://open.spotify.com/artist/77zoboLJ6YVACYA4aagcgT?si=Hd24wx--T5aIuO-BYxKrZg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 group px-8 py-4 border border-current hover:bg-white/10 transition-colors duration-200"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            <span className="text-lg font-handwritten">Listen on Spotify</span>
          </a>
        </div>

        {/* Alamayo Band Section */}
        <div className="mt-16 flex justify-center">
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
