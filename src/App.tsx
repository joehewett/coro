import React, { useState, useRef, useEffect } from 'react';
// import { FaBars, FaTimes } from 'react-icons/fa';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const aboutRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollPosition < windowHeight / 2) {
        setActiveSection('');
      } else if (aboutRef.current && scrollPosition >= aboutRef.current.offsetTop - windowHeight / 2) {
        setActiveSection('about');
      } else if (reelRef.current && scrollPosition >= reelRef.current.offsetTop - windowHeight / 2) {
        setActiveSection('reel');
      } else if (photosRef.current && scrollPosition >= photosRef.current.offsetTop - windowHeight / 2) {
        setActiveSection('photos');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className="h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: `url('coro-bw.jpg')`,
        }}
      >
        <div className="px-32 py-32 w-full font-serif flex justify-between items-center">
          <div className="text-white text-2xl md:text-4xl lg:text-6xl">
            Coro Benavent
          </div>
          <div className="md:hidden px-4">
            <button onClick={toggleMenu} className="text-white text-2xl">
              {isMenuOpen ? <p>X</p> : <p>///</p>}
              {/* {isMenuOpen ? <FaTimes /> : <FaBars />} */}
            </button>
          </div>
          <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block`}>
            <ul className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8">
              {['about', 'reel', 'photos'].map((section) => (
                <li key={section}>
                  <button
                    className={`px-4 py-2 text-white text-xl lg:text-2xl font-semibold transition-colors duration-300 ${activeSection === section
                      ? 'border-b-2 border-white'
                      : 'hover:text-gray-300'
                      }`}
                    onClick={() => {
                      scrollToSection(section === 'about' ? aboutRef : section === 'reel' ? reelRef : photosRef);
                      setIsMenuOpen(false);
                    }}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

        </div>
      </div>

      <div ref={aboutRef} className="py-16 px-4 md:px-8 lg:px-16">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Taxing Laughter: The Joke Tax Chronicles
        </h1>
        <h2 className="text-3xl font-bold mb-4">About</h2>
        <p className="text-lg">
          Coro Benavent is a versatile actress with a passion for bringing characters to life on stage and screen.
          With years of experience in theater, film, and television, Coro has captivated audiences with her powerful
          performances and dedication to her craft.
        </p>
      </div>

      <div ref={reelRef} className="bg-gray-200 py-16 px-4 md:px-8 lg:px-16">
        <h2 className="text-3xl font-bold mb-4">Reel</h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src="https://www.youtube.com/watch?v=DJiASArAgN4"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>

      <div ref={photosRef} className="py-16 px-4 md:px-8 lg:px-16">
        <h2 className="text-3xl font-bold mb-4">Photos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="aspect-w-3 aspect-h-4 bg-gray-300">
              <img
                src={`https://picsum.photos/seed/${index}/300/400`}
                alt={`Photo ${index}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
