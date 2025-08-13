import React from 'react';
import Navbar from './Navbar';
import ProjectCard from './ProjectCard';

const MusicianPage: React.FC = () => {
  const projects = [
    {
      id: 1,
      image: '/coro3.webp',
      title: 'Echoes of Tomorrow',
      description: 'Debut album blending electronic and classical elements',
      route: '/musician/echoes-of-tomorrow'
    },
    {
      id: 2,
      image: '/coro7.webp',
      title: 'Live at Sunset',
      description: 'Concert recording from the summer festival tour',
      route: '/musician/live-at-sunset'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      paddingTop: '80px'
    }}>
      <Navbar 
        categoryImage="/landing/bottomlefttext.PNG"
        categoryRoute="/musician"
        categoryAlt="Musician"
      />
      
      <div style={{
        padding: '40px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '40px'
        }}>
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
    </div>
  );
};

export default MusicianPage;
