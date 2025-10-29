import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { type ThemeMode, themeUtils } from '../theme';

interface ProjectPageProps {
  title: string;
  categoryImage: string;
  categoryRoute: string;
  categoryAlt: string;
  credits: Array<{ name: string; role: string; isHighlighted?: boolean }>;
  description: string;
  mainImage: string;
  additionalInfo?: string;
  youtubeUrl?: string;
  theme?: ThemeMode;
}

const ProjectPage: React.FC<ProjectPageProps> = ({
  title,
  categoryImage,
  categoryRoute,
  categoryAlt,
  credits,
  description,
  mainImage,
  additionalInfo,
  youtubeUrl,
  theme = 'light'
}) => {
  // Create repeating title text
  const repeatingTitle = Array(20).fill(title).join(' ');

  // Function to convert URLs in text to clickable links
  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a 
            key={index} 
            href={part} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {part}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={`min-h-screen ${themeUtils.background(theme)} ${themeUtils.text(theme)} pt-20`}>
      <Navbar 
        categoryImage={categoryImage}
        categoryRoute={categoryRoute}
        categoryAlt={categoryAlt}
        theme={theme}
      />
      
      {/* Repeating title bar */}
      <div className="w-full py-5 overflow-hidden whitespace-nowrap text-5xl font-bold text-gray-700 font-handwritten relative z-10">
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
            <p className="text-base leading-relaxed text-gray-700 mb-8 whitespace-pre-line">
              {renderTextWithLinks(description)}
            </p>
            
            {/* YouTube embed if URL is provided */}
            {youtubeUrl && (
              <div className="relative w-full z-0" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={youtubeUrl}
                  title={title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            )}
            {additionalInfo && (
              <p className="text-base leading-relaxed text-gray-700 mb-8 whitespace-pre-line mt-8">
                {renderTextWithLinks(additionalInfo)}
              </p>
            )}
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
      <Footer theme={theme} />
    </div>
  );
};

export default ProjectPage;
