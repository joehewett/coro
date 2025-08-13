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
      className="relative w-full aspect-square cursor-pointer overflow-hidden bg-black"
    >
      {/* Project image */}
      <img 
        src={image}
        alt={title}
        className={`w-full h-full object-cover transition-all duration-300 ease-in-out ${
          isHovered ? 'scale-105 brightness-75' : 'scale-100 brightness-100'
        }`}
      />
      
      {/* Hover overlay with title and description */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black from-90% to-transparent transition-transform duration-300 ease-in-out text-white ${
          isHovered ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <h3 className="m-0 mb-2.5 text-2xl font-bold text-gray-300 font-handwritten">
          {title}
        </h3>
        <p className="m-0 text-base leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
