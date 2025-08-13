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
    <div className="min-h-screen bg-black text-white pt-20">
      <Navbar 
        categoryImage={categoryImage}
        categoryRoute={categoryRoute}
        categoryAlt={categoryAlt}
      />
      
      {/* Repeating title bar */}
      <div className="w-full py-5 bg-gray-900 overflow-hidden whitespace-nowrap border-t border-b border-gray-700 text-2xl font-bold text-orange-500">
        {repeatingTitle}
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-10 py-15">
        <div className="project-content grid grid-cols-1 lg:grid-cols-2 gap-15 items-start">
          {/* Left column - Credits and description */}
          <div>
            <h2 className="text-3xl font-bold text-orange-500 mb-5">
              Credits
            </h2>
            <ul className="mb-15 list-none p-0">
              {credits.map((credit, index) => (
                <li key={index} className="flex justify-between items-center py-8 border-b border-gray-700 last:border-b-0">
                  <span className={credit.isHighlighted ? 'text-orange-500 font-bold' : 'text-white'}>
                    {credit.name}
                  </span>
                  <span className="text-gray-400">
                    {credit.role}
                  </span>
                </li>
              ))}
            </ul>

            <div>
              <h2 className="text-3xl font-bold text-orange-500 mb-5">
                About the Project
              </h2>
              <p className="text-base leading-relaxed text-gray-300">
                {description}
              </p>
            </div>
          </div>

          {/* Right column - Image */}
          <div>
            <img 
              src={mainImage}
              alt={title}
              className="w-full h-auto rounded-lg"
            />
            
            {/* Additional info below image */}
            <div className="mt-10 p-8 bg-gray-900 rounded-lg">
              <p className="text-base leading-relaxed text-gray-300">
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
