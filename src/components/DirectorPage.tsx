import React from 'react';
import Navbar from './Navbar';
import ProjectCard from './ProjectCard';
import Footer from './Footer';
import { type ThemeMode, themeUtils } from '../theme';

interface DirectorPageProps {
  theme?: ThemeMode;
}

const DirectorPage: React.FC<DirectorPageProps> = ({ theme = 'dark' }) => {
  const projects = [
    {
      id: 1,
      image: '/director/tonos.jpeg',
      title: 'TONOS',
      description: 'Director & lead actress. A short film about reclaiming your voice. Shot on 16mm, written by BAFTA-winning screenwriter Aleksandra Sykulak, starring Julio Peña. A Garo Studios production.',
      route: '/director/tonos',
      status: 'In Pre-Production'
    },
    {
      id: 6,
      image: '/director/look-around.jpg',
      title: 'Look Around',
      description: 'Director. A young boy guides three musicians who have lost their souls toward a dreamy 1920s concert finale.',
      route: '/director/look-around',
      status: 'In Post-Production'
    },
    {
      id: 2,
      image: '/director/ragni-still.jpg',
      title: 'Ragni',
      description: 'Creative producer for Garo Studios. #1 Most Watched Music Video of 2025 on Promonews. Nominated for British Young Arrows.',
      route: '/director/ragni'
    },
    {
      id: 3,
      image: '/director/superglue.png',
      title: 'SUPERGLUE',
      description: 'Directed music video exploring whether fractured relationships can be repaired through the central metaphor of a broken plate.',
      route: '/director/superglue'
    },
    {
      id: 4,
      image: '/director/palomitas.png',
      title: 'Palomitas sin maíz',
      description: 'Co-direction / creative producer for music video created by Garo Studios. Shot on 16mm, a tribute to life and the memories that outlast it.',
      route: '/director/palomitas-sin-maiz'
    },
    {
      id: 5,
      image: '/director/padre.jpg',
      title: 'Padre. Hijo. Pastor',
      description: 'Director\'s Assistant for feature documentary. Fighting the tide of commercial farming, a Spanish shepherd embarks on a 700km journey. In post-production.',
      route: '/director/padre-hijo-pastor'
    }
  ];

  return (
    <div className={`min-h-screen ${themeUtils.background(theme)}`}>
      <Navbar 
        categoryImage="/landing/toprighttext.PNG"
        categoryRoute="/director"
        categoryAlt="Director"
        theme={theme}
      />
      
      <div className="min-h-screen pt-24 sm:pt-32 lg:pt-20 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 pb-16">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
            {projects.map(project => (
              <ProjectCard
                key={project.id}
                image={project.image}
                title={project.title}
                description={project.description}
                route={project.route}
                status={project.status}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer theme={theme} />
    </div>
  );
};

export default DirectorPage;
