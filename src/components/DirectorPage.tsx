import React from 'react';
import Navbar from './Navbar';
import ProjectCard from './ProjectCard';

const DirectorPage: React.FC = () => {
  const projects = [
    {
      id: 1,
      image: '/coro2.webp',
      title: 'Midnight Echoes',
      description: 'Experimental short film exploring themes of memory and time',
      route: '/director/midnight-echoes'
    },
    {
      id: 2,
      image: '/coro6.webp',
      title: 'City Lights',
      description: 'Documentary about urban life and its hidden stories',
      route: '/director/city-lights'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      paddingTop: '80px'
    }}>
      <Navbar 
        categoryImage="/landing/toprighttext.PNG"
        categoryRoute="/director"
        categoryAlt="Director"
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

export default DirectorPage;
