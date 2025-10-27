import React from 'react';
import Navbar from './Navbar';
import ProjectCard from './ProjectCard';
import Footer from './Footer';

const DirectorPage: React.FC = () => {
  const projects = [
    {
      id: 1,
      image: '/director/superglue.png',
      title: 'SUPERGLUE',
      description: 'Directed music video exploring whether fractured relationships can be repaired through the central metaphor of a broken plate.',
      route: '/director/superglue'
    },
    {
      id: 2,
      image: '/director/palomitas.png',
      title: 'Palomitas sin maíz',
      description: 'Co-direction / creative producer for music video created by Garo Studios. Shot on 16mm, a tribute to life and the memories that outlast it.',
      route: '/director/palomitas-sin-maiz'
    },
    {
      id: 3,
      image: '/coro3.webp',
      title: 'Ragni',
      description: 'Creative producer for Garo Studios. A woman enters a new relationship that slowly devolves, and she begins to see spiders everywhere. In post-production.',
      route: '/director/ragni'
    },
    {
      id: 4,
      image: '/director/padre.jpg',
      title: 'Padre. Hijo. Pastor',
      description: 'Director\'s Assistant for feature documentary. Fighting the tide of commercial farming, a Spanish shepherd embarks on a 700km journey. In post-production.',
      route: '/director/padre-hijo-pastor'
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      <Navbar 
        categoryImage="/landing/toprighttext.PNG"
        categoryRoute="/director"
        categoryAlt="Director"
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
      <Footer />
    </div>
  );
};

export default DirectorPage;
