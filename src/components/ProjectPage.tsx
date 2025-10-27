import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface ProjectPageProps {
  title: string;
  categoryImage: string;
  categoryRoute: string;
  categoryAlt: string;
  credits: Array<{ name: string; role: string; isHighlighted?: boolean }>;
  description: string;
  mainImage: string;
  additionalInfo?: string;
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
    <div className="min-h-screen bg-white text-black pt-20">
      <Navbar 
        categoryImage={categoryImage}
        categoryRoute={categoryRoute}
        categoryAlt={categoryAlt}
        lightMode={true}
      />
      
      {/* Repeating title bar */}
      <div className="w-full py-5 overflow-hidden whitespace-nowrap text-5xl font-bold text-gray-700 font-handwritten">
        {repeatingTitle}
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-10 py-15">
        {/* Image at top, same width as columns */}
        <div className="w-full mb-15">
          <img 
            src={mainImage}
            alt={title}
            className="w-full h-auto"
          />
        </div>
        <div className="project-content grid grid-cols-1 lg:grid-cols-2 gap-15 items-start">
          {/* Left column - About the Project */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-5 font-handwritten">
              About the Project
            </h2>
            <p className="text-base leading-relaxed text-gray-700">
              {description}
            </p>
          </div>

          {/* Right column - Cast List */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-5 font-handwritten">
              Credits
            </h2>
            <ul className="list-none p-0">
              {credits.map((credit, index) => (
                <li key={index} className="flex justify-between items-center py-3 border-b border-gray-300 last:border-b-0">
                  <span className={credit.isHighlighted ? 'text-gray-900 font-bold' : 'text-black'}>
                    {credit.name}
                  </span>
                  <span className="text-gray-600">
                    {credit.role}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer lightMode={true} />
    </div>
  );
};

export default ProjectPage;
