import React from 'react';
import Navbar from './Navbar';

interface ProjectPageProps {
  title: string;
  categoryImage: string;
  categoryRoute: string;
  categoryAlt: string;
  credits: Array<{ name: string; role: string; isHighlighted?: boolean }>;
  description: string;
  mainImage: string;
  additionalInfo: string;
}

const ProjectPage: React.FC<ProjectPageProps> = ({
  title,
  categoryImage,
  categoryRoute,
  categoryAlt,
  credits,
  description,
  mainImage,
  additionalInfo
}) => {
  // Create repeating title text
  const repeatingTitle = Array(20).fill(title).join(' ');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      color: '#fff',
      paddingTop: '80px'
    }}>
      <Navbar 
        categoryImage={categoryImage}
        categoryRoute={categoryRoute}
        categoryAlt={categoryAlt}
      />
      
      {/* Repeating title bar */}
      <div className="repeating-title" style={{
        width: '100%',
        padding: '20px 0',
        backgroundColor: '#111',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        borderTop: '1px solid #333',
        borderBottom: '1px solid #333'
      }}>
        {repeatingTitle}
      </div>

      {/* Main content */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '60px 40px'
      }}>
        <div className="project-content" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'start'
        }}>
          {/* Left column - Credits and description */}
          <div>
            <h2 className="project-credits">
              Credits
            </h2>
            
            <ul style={{ marginBottom: '60px' }}>
              {credits.map((credit, index) => (
                <li key={index}>
                  <span className={credit.isHighlighted ? 'highlighted' : ''}>
                    {credit.name}
                  </span>
                  <span style={{
                    color: '#888'
                  }}>
                    {credit.role}
                  </span>
                </li>
              ))}
            </ul>

            <div>
              <h2 className="project-about">
                About the Project
              </h2>
              <p className="project-about">
                {description}
              </p>
            </div>
          </div>

          {/* Right column - Image */}
          <div>
            <img 
              src={mainImage}
              alt={title}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px'
              }}
            />
            
            {/* Additional info below image */}
            <div style={{
              marginTop: '40px',
              padding: '30px',
              backgroundColor: '#111',
              borderRadius: '8px'
            }}>
              <p className="project-additional">
                {additionalInfo}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
