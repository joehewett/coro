import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  route?: string;
  externalLink?: string;
  status?: string;
  imageZoom?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ image, title, description, route, externalLink, status, imageZoom }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (externalLink) {
      window.open(externalLink, '_blank', 'noopener,noreferrer');
    } else if (route) {
      navigate(route);
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-full aspect-video cursor-pointer overflow-hidden bg-black transition-all duration-300 ease-out"
    >
      {/* Project image */}
      <img
        src={image}
        alt={title}
        className={`w-full h-full object-cover${imageZoom ? ' scale-[1.15]' : ''}`}
      />

      {/* Status badge */}
      {status && (
        <div className="absolute top-3 left-3 z-10">
          <span className="text-xs uppercase tracking-widest text-white bg-black/70 px-3 py-1">
            {status}
          </span>
        </div>
      )}
      
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
