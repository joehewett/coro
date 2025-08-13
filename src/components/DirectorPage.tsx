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
    <div className="min-h-screen bg-black pt-20">
      <Navbar 
        categoryImage="/landing/toprighttext.PNG"
        categoryRoute="/director"
        categoryAlt="Director"
      />
      
      <div className="px-10 max-w-7xl mx-auto">
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
    </div>
  );
};

export default DirectorPage;
