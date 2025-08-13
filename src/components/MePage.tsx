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
    <div className="min-h-screen bg-black pt-20">
      <Navbar 
        categoryImage="/landing/bottomrighttext.PNG"
        categoryRoute="/me"
        categoryAlt="Me"
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

export default MePage;
