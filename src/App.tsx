import React, { useState, useRef, useEffect } from 'react';
// import { FaBars, FaTimes } from 'react-icons/fa';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const aboutRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const [language, setLanguage] = useState<'en' | 'es'>('en');

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (refStr: string) => {
    // This is appaling and I'm sorry if you're reading this.
    let ref = reelRef;
    if (refStr === 'Bio' || refStr === 'Bibliografía') ref = aboutRef;
    if (refStr === 'Reel') ref = reelRef;
    if (refStr === 'Photos' || refStr === 'Fotos') ref = photosRef;
    if (refStr === 'CV') ref = cvRef;
    if (refStr === 'Contact' || refStr === 'Contacto') ref = contactRef;

    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  };

  const photos = [
    'coro8.jpg',
    'coro9.jpg',
    'coro11.jpg',
    'coro12.jpg',
    'coro13.jpg',
    'coro14.jpg',
    'coro15.jpg',
    'coro16.jpg',
    'coro17.jpg',
    'coro18.jpg',
    'coro19.jpg',
    'coro20.jpg',
    'coro-beach.jpg',
    'coro-headshot.jpg',
    'coro1.jpg',
    'coro2.jpg',
    'coro3.jpg',
    'coro4.jpg',
    'coro5.jpg',
    'coro6.jpg',
    'coro7.jpg',
    // 'coro21.jpg',
    // 'coro22.jpg',
    // 'coro23.jpg',
    // 'coro24.jpg',
    // 'coro25.jpg',
    // 'coro26.jpg',
    // 'coro27.jpg',
    // 'coro28.jpg',
    // 'coro29.jpg',
    // 'coro30.jpg',
    // 'coro31.jpg',
    // 'coro32.jpg'

  ];


  const content = {
    en: {
      name: "Coro Benavent",
      nav: ["Bio", "Reel", "Photos", "CV", "Contact"],
      title: "Actress /// Singer Performer. Creative",
      description: `Coro Benavent, bilingual actress in English and Spanish. Born in Madrid. She recently trained in the 10-week Bristol Old Vic Theatre School Course in theatre and film acting. In the 2023-2024 academic year, she completed her 2nd year of the Diploma in Film and TV Acting at Central de Cine and her third year at the Corazza studio.

She participated in the short film 'Ophelia' for CEU University in Madrid. She starred in the short film "INERTE" by Lourdes Cosentino.

She performed in Lucy Prebble's play "The Effect" directed by Natalie Simone at Bristol Old Vic in 2024, playing the lead role of Connie. She took part in theatre showcases during her 3 years of training at Corazza, working on plays such as: 'The Blue Room' by David Hare, 'Fear and Misery of the Third Reich' by Bertolt Brecht, and 'Much Ado About Nothing' by William Shakespeare.

Additionally, she performs with her band ALAMAYO in venues such as Café la Palma, El Pez Gato, La Nota Rock, El Chiringuito de Los Locos, El Castillo de Los Locos, etc. She released her first single 'Champagne Moon' with a music video created and directed by herself, and released 3 new songs in 2024 created with her brother Diego Benavent: 'Muke', 'Todo huele a ti' and 'El primer helado'.`,
      reel: "Reel",
      photos: "Photos"
    },
    es: {
      name: "Coro Benavent",
      nav: ["Bibliografía", "Reel", "Fotos", "CV", "Contacto"],
      title: "Actriz /// Cantante Intérprete. Creativa",
      description: `Coro Benavent, actriz bilingüe en inglés y español. Nació en Madrid. Se entrenó recientemente en el Curso de Bristol Old Vic Theatre School de 10 semanas en interpretación para teatro y cine. En el curso 2023-2024 cursó 2º de Diplomatura de Interpretación para Cine y TV en Central de Cine y su tercer año en el estudio Corazza.
Participó en el corto 'Ophelia' para la Universidad CEU de Madrid. Protagonizó el corto "INERTE" de Lourdes Cosentino.

Participó en la obra "The Effect" de Lucy Prebble dirigida por Natalie Simone en Bristol Old Vic en 2024, interpretando el papel protagonista de Connie. Realizó muestras de teatro durante sus 3 años de formación en Corazza, trabajando con obras como: 'La habitación azul' de David Hare, 'Terror y miseria en el Tercer Reich' de Bertolt Brecht, y 'Mucho ruido y pocas nueces' de William Shakespeare.

Además, toca junto a su banda ALAMAYO en salas como Café la Palma, El Pez Gato, La Nota Rock, El Chiringuito de Los Locos, El Castillo de Los Locos, etc. Lanzó su primer single 'Champagne Moon' con videoclip creado y dirigido por ella, y sacó 3 nuevas canciones en 2024 creadas junto a su hermano Diego Benavent: 'Muke', 'Todo huele a ti' y 'El primer helado'.`,
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
      } else if (cvRef.current && scrollPosition >= cvRef.current.offsetTop - windowHeight / 2) {
        setActiveSection('cv');
      } else if (contactRef.current && scrollPosition >= contactRef.current.offsetTop - windowHeight / 2) {
        setActiveSection('contact');
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
              <span className="mr-2 font-semibold">🇬🇧</span>
              <button
                onClick={toggleLanguage}
                className="w-7 h-4 relative rounded-full bg-gray-400 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-300 focus:ring-white"
              >
                <span className="sr-only">Toggle Language</span>
                <span
                  className={`absolute inset-y-0 left-0 w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-300 ease-in-out ${language === 'es' ? 'translate-x-3' : ''
                    }`}
                />
              </button>
              <span className="ml-2 font-semibold">🇪🇸</span>
            </div>
          </div>
        </div>
        {/* py-16 md:py-24 lg:py-32  */}
        <div className="px-8 md:px-16 lg:px-32 w-full h-full font-serif flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="text-white text-2xl tracking-wide md:text-4xl lg:text-6xl mb-8 md:mb-0">
            Coro Benavent
          </div>

          <div className="md:hidden mb-4">
            <button onClick={toggleMenu} className="text-white text-2xl">
              {isMenuOpen ? <p>X</p> : <p>///</p>}
            </button>
          </div>
          <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block`}>
            <ul className="flex flex-col space-y-4 ">
              {content[language].nav.map((section) => (
                <li key={section} className="flex justify-end">
                  <button
                    className={`px-4 py-2 text-white text-xl lg:text-2xl transition-colors duration-300 ${activeSection === section
                      ? 'border-l-2 border-white pl-3'
                      : 'hover:text-gray-300'
                      }`}
                    onClick={() => {
                      scrollToSection(
                        section
                      );
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
        <div className="relative space-y-16">
          <h1 className="scroll-m-20 text-4xl font-serif tracking-tight lg:text-5xl mb-2">
            {content[language].title}
          </h1>
          <p className="text-lg lg:text-xl text-gray-600">{content[language].description}</p>
        </div>
      </div>

      <div ref={reelRef} className="bg-gray-200 py-48 px-4 md:px-8 lg:px-16">
        <h2 className="scroll-m-20 text-4xl font-serif tracking-tight lg:text-5xl mb-2 text-center">Reel</h2>
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

      <div ref={photosRef} className="py-48 px-4 md:px-8 lg:px-16">
        <h2 className="scroll-m-20 text-4xl font-serif tracking-tight lg:text-5xl mb-2 text-center"></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((url, index) => (
            <div key={index} className="aspect-w-3 aspect-h-4 bg-gray-300">
              <img
                src={url}
                alt={`Photo ${index}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>

      <div ref={cvRef} className="p-16 md:p-48 lg:p-96 space-y-8">
        <div className="relative space-y-8">
          <h1 className="scroll-m-20 text-4xl font-serif tracking-tight lg:text-5xl mb-2">
            CV & Contact
          </h1>
          <p className="text-lg lg:text-xl text-gray-600">Please reach out at <code></code> if you'd like to work with me.</p>
          {/* Download button for CV at /cv.pdf */}
          <div>

            <a href="/cv.pdf" download>
              <button className="bg-black text-white px-4 py-2 rounded-lg">
                Download CV
              </button>
            </a>
          </div>


        </div>
      </div>
    </div>

  );
};

export default App;
