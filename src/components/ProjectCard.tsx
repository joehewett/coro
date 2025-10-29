import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  route: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ image, title, description, route }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={() => navigate(route)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-full aspect-video cursor-pointer overflow-hidden bg-black transition-all duration-300 ease-out"
    >
      {/* Project image */}
      <img 
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
      
      {/* Black overlay with 80% opacity */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ease-out ${
          isHovered ? 'opacity-80' : 'opacity-0'
        }`}
      />
      
      {/* Centered title */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-out ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h3 className="text-4xl font-bold text-white font-handwritten text-center px-6">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default ProjectCard;
