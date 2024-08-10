import React, { useState, useRef, useEffect } from 'react';
// import { FaBars, FaTimes } from 'react-icons/fa';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const aboutRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);

  const [language, setLanguage] = useState<'en' | 'es'>('en');

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  };


  const content = {
    en: {
      name: "Coro Benavent",
      nav: ["About", "Reel", "Photos"],
      title: "Actress /// Singer Performer. Creative",
      description: "Coro Benavent is a versatile actress with a passion for bringing characters to life on stage and screen. With years of experience in theater, film, and television, Coro has captivated audiences with her powerful performances and dedication to her craft.",
      reel: "Reel",
      photos: "Photos"
    },
    es: {
      name: "Coro Benavent",
      nav: ["Sobre mí", "Reel", "Fotos"],
      title: "Actriz /// Cantante Intérprete. Creativa",
      description: "Coro Benavent es una actriz versátil con pasión por dar vida a personajes en el escenario y la pantalla. Con años de experiencia en teatro, cine y televisión, Coro ha cautivado al público con sus poderosas interpretaciones y su dedicación a su oficio.",
      reel: "Reel",
      photos: "Fotos"
    }
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
        <div className="w-full flex justify-end p-4" >
          <div className="flex items-center">
            <div className="mr-4 flex items-center rounded-full p-1">
              <span className={`mr-2 font-semibold ${language === 'en' ? 'text-blue-600' : 'text-gray-600'}`}>EN</span>
              <button
                onClick={toggleLanguage}
                className="w-7 h-4 relative rounded-full bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Toggle Language</span>
                <span
                  className={`absolute inset-y-0 left-0 w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-300 ease-in-out ${language === 'es' ? 'translate-x-3' : ''
                    }`}
                />
              </button>
              <span className={`ml-2 font-semibold ${language === 'es' ? 'text-red-600' : 'text-gray-600'}`}>ES</span>
            </div>
          </div>
        </div>
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
              {content[language].nav.map((section) => (
                <li key={section}>
                  <button
                    className={`px-4 py-2 text-white text-xl lg:text-2xl transition-colors duration-300 ${activeSection === section
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

      <div ref={aboutRef} className="p-16 md:p-48 lg:p-96 space-y-8">
        <div className="relative">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
            {content[language].title}
          </h1>
          <p className="text-lg lg:text-xl text-gray-600">{content[language].description}</p>
        </div>


      </div>

      <div className="bg-gray-200 py-48 px-4 md:px-8 lg:px-16">
        <h2 ref={reelRef} className="text-3xl font-bold mb-8 text-center">Reel</h2>
        <div className="max-w-4xl py-16 mx-auto">
          <div className="relative pt-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/3lYq80w47Mg?si=OSlI7bmty0YDHo23"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
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
