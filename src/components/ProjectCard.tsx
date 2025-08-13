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
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1',
        cursor: 'pointer',
        overflow: 'hidden',
        backgroundColor: '#000'
      }}
    >
      {/* Project image */}
      <img 
        src={image}
        alt={title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.3s ease, filter 0.3s ease',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          filter: isHovered ? 'brightness(0.7)' : 'brightness(1)'
        }}
      />
      
      {/* Hover overlay with title and description */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '20px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)',
          transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s ease',
          color: '#fff'
        }}
      >
        <h3 style={{
          margin: '0 0 10px 0',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#ff6b35' // Orange highlight color
        }}>
          {title}
        </h3>
        <p style={{
          margin: 0,
          fontSize: '16px',
          lineHeight: '1.5'
        }}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
