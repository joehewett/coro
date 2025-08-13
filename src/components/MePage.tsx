import React from 'react';
import Navbar from './Navbar';
import ProjectCard from './ProjectCard';

const MePage: React.FC = () => {
  const projects = [
    {
      id: 1,
      image: '/coro4.webp',
      title: 'Personal Journey',
      description: 'A visual diary of creative explorations and self-discovery',
      route: '/me/personal-journey'
    },
    {
      id: 2,
      image: '/coro11.webp',
      title: 'Behind the Scenes',
      description: 'Documenting the creative process across different mediums',
      route: '/me/behind-the-scenes'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      paddingTop: '80px'
    }}>
      <Navbar 
        categoryImage="/landing/bottomrighttext.PNG"
        categoryRoute="/me"
        categoryAlt="Me"
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

export default MePage;
