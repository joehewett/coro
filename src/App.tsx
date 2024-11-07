import React, { useState, useRef, useEffect } from 'react';

const App: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);
  const musicRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (refStr: string) => {
    let ref = reelRef;
    if (refStr === 'Bio' || refStr === 'Bibliografía') ref = aboutRef;
    if (refStr === 'Reel') ref = reelRef;
    if (refStr === 'Photos' || refStr === 'Fotos') ref = photosRef;
    if (refStr === 'Music' || refStr === 'Música') ref = musicRef;
    if (refStr === 'Contact' || refStr === 'Contacto') ref = contactRef;

    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  };

  const photos = [
    'coro6.webp',
    'coro7.webp',
    'coro9.webp',
    'coro11.webp',
    'coro14.webp',
    'coro15.webp',
    'coro16.webp',
    'coro17.webp',
    'coro18.webp',
    'coro19.webp',
    'coro20.webp',
    'coro21.webp',
    'coro22.webp',
    'coro23.webp',
    'coro24.jpg',
    'coro0.webp',
    'coro1.webp',
    'coro2.webp',
    'coro3.webp',
    'coro4.webp',
  ];

  const content = {
    en: {
      name: "Coro Benavent",
      nav: ["Bio", "Reel", "Photos", "Music", "Contact"],
      title: "Actress /// Singer Performer. Creative",
      description: [
        "Coro Benavent is a versatile, bilingual actress fluent in English and Spanish, with training in the British accent. Born in Madrid, she has pursued acting across borders, recently completing an intensive 10-week course at the prestigious Bristol Old Vic Theatre School. Coro continues to refine her craft at MADS as a creative actor, building on her three years at the renowned Corazza studio and one year at Central de Cine.",
        "Her on-screen experience includes roles in short films such as 'Ophelia' (CEU University) and 'INERTE' (dir. Lourdes Cosentino). On stage, Coro recently led as Connie in Lucy Prebble's 'The Effect' at Bristol Old Vic. Her theatrical repertoire spans work by David Hare, Bertolt Brecht, and Shakespeare, showcased during her Corazza training. Known for her collaborative spirit, Coro excels in ensemble work and brings a positive energy to every production.",
        "Beyond acting, Coro is making waves in music, releasing her first EP with her brother Diego Benavent, by the name 'ALAMAYO', available on all music platforms. The duo has since performed their EP at various stages across Madrid, Cantabria, and Bristol, expanding their musical reach. Prior to this, Coro launched her solo career with the single 'Champagne Moon', for which she also created and directed the music video.",
        "Coro's dynamic lifestyle complements her artistic pursuits. She maintains a high level of proficiency in various sports, including surfing, basketball, football, tennis, padel, athletics, and yoga, demonstrating her dedication and versatility both on and off stage.",
        "With her diverse talents and continued commitment to growth, Coro Benavent is an emerging artist to watch in both acting and music.",
      ],
      reel: "Reel",
      reelDescription: "Some of her scenes",
      photos: "Photos",
      music: "Music",
      contact: "Contact",
      contactDescription: "I'm looking for new opportunities. If you'd like to work with me, please reach out.",
    },
    es: {
      name: "Coro Benavent",
      nav: ["Bibliografía", "Reel", "Fotos", "Música", "CV", "Contacto"],
      title: "Actriz /// Cantante Intérprete. Creativa",
      description: [
        "Coro Benavent es una actriz versátil y bilingüe, con fluidez en inglés y español, y entrenada en el acento británico. Nacida en Madrid, ha perseguido su carrera actoral más allá de las fronteras, completando recientemente un curso intensivo de 10 semanas en la prestigiosa Bristol Old Vic Theatre School. Coro continúa perfeccionando su arte en MADS como actriz creativa, tras sus tres años en el estudio Corazza y segundo de diplomatura en Central de Cine.",
        "Su experiencia en pantalla incluye papeles en cortometrajes como 'Ophelia' (Universidad CEU) e 'INERTE' (dir. Lourdes Cosentino). En el escenario, Coro protagonizó recientemente como Connie en 'The Effect' de Lucy Prebble en el Bristol Old Vic. Su repertorio teatral abarca obras de David Hare, Bertolt Brecht y Shakespeare, mostradas durante su formación en Corazza. Conocida por su espíritu colaborativo, Coro destaca en el trabajo en equipo y aporta una energía positiva a cada producción.",
        "Más allá de la actuación, Coro está haciendo olas en la música. Lanzando su primer EP junto a su hermano Diego Benavent con el título 'ALAMAYO', disponible en todas las plataformas musicales. El dúo ha presentado su EP en varios escenarios de Madrid, Cantabria y Bristol. Antes de esto, Coro lanzó su carrera en solitario con el single 'Champagne Moon', para el cual también creó y dirigió el videoclip.",
        "El estilo de vida dinámico de Coro complementa sus actividades artísticas. Mantiene un alto nivel de competencia en varios deportes, incluyendo surf, baloncesto, fútbol, tenis, pádel, atletismo y yoga, demostrando su dedicación y versatilidad tanto dentro como fuera del escenario.",
        "Con sus diversos talentos y su continuo compromiso con el crecimiento, Coro Benavent es una artista emergente a seguir tanto en la actuación como en la música.",
      ],
      reel: "Reel",
      reelDescription: "Algunas de sus escenas",
      photos: "Fotos",
      music: "Música",
      contact: "Contacto",
      contactDescription: "Estoy buscando nuevas oportunidades. Si te gustaría trabajar conmigo, por favor contáctame.",
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
      } else if (musicRef.current && scrollPosition >= musicRef.current.offsetTop - windowHeight / 2) {
        setActiveSection('music');
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

        <div className="px-8 md:px-16 lg:px-32 w-full h-full font-serif flex flex-col md:flex-row justify-between items-start md:items-center">

          <div className="flex flex-row justify-between items-center w-full">
            <div className="text-white text-2xl tracking-wide md:text-4xl lg:text-6xl">
              Coro Benavent
            </div>

            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-white text-2xl">
                {isMenuOpen ? <p className="font-sans">X</p> : <p>☰</p>}
              </button>
            </div>
          </div>

          <div id="navbar" className="fixed right-4 my-12 md:right-24 lg:right-48">
            <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block`}>
              <ul className="flex flex-col space-y-4 ">
                {content[language].nav.map((section) => (
                  <li key={section} className="flex justify-end">
                    <button
                      className={`px-4 py-2 text-gray-700 text-xl lg:text-2xl transition-colors duration-300 ${activeSection === section
                        ? 'border-l-2 border-white pl-3'
                        : 'hover:text-gray-500'
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
      </div>

      <div ref={aboutRef} className="p-16 md:p-48 lg:px-96 space-y-8">
        <div className="relative space-y-16">
          <h1 className="scroll-m-20 text-4xl font-serif tracking-tight lg:text-5xl mb-2">
            {content[language].title}
          </h1>
          {content[language].description.map((paragraph, index) => (
            <p key={index} className="text-lg lg:text-xl text-gray-600">{paragraph}</p>
          ))}
        </div>
      </div>

      <div ref={reelRef} className="bg-gray-200 py-48 px-4 md:px-8 lg:px-16">
        <h2 className="scroll-m-20 text-4xl font-serif tracking-tight lg:text-5xl mb-2 text-center">Reel</h2>
        <p className="text-center text-xl mb-8">{content[language].reelDescription}</p>
        <div className="max-w-4xl py-16 mx-auto space-y-6">
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
          <div className="relative pt-[56.25%]">
            <iframe width="560" height="315"
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/p_XBSMKQYT0?si=zSdPoenXEOCYb9_M"
              title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

          </div>
          <div className="relative pt-[56.25%]">
            <iframe width="560" height="315"
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/U0h0afKJd_U?si=UiZVGOGoMMfKHNjb"
              title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
        </div>
      </div>

      <div ref={photosRef} className="py-16 px-4 md:px-8 lg:px-16">
        <h2 className="scroll-m-20 text-4xl font-serif tracking-tight lg:text-5xl mb-2 text-center">{content[language].photos}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((url, index) => (
            <div key={index} className="aspect-w-3 aspect-h-4 bg-gray-300">
              <img
                src={url}
                alt={`Photo ${index}`}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <div ref={musicRef} className="bg-gray-200 py-48 px-4 md:px-8 lg:px-16">
        <h2 className="scroll-m-20 text-4xl font-serif tracking-tight lg:text-5xl mb-2 text-center">{content[language].music}</h2>
        <div className="max-w-4xl py-16 mx-auto space-y-6">
          <div className="relative pt-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              width="560" height="315" src="https://www.youtube.com/embed/DJiASArAgN4?si=QFFHvowjkyZSu3Jh" title="YouTube video player"
              frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
            </iframe>
          </div>
        </div>
        {/* spotify link */}
        <p className="text-center text-xl mt-8">Listen to more on <a href="https://open.spotify.com/artist/77zoboLJ6YVACYA4aagcgT" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Spotify</a></p>
      </div>

      <div ref={contactRef} className="p-16 md:p-48 lg:px-96 lg:py-48 space-y-8">
        <div className="relative space-y-8">
          <h1 className="scroll-m-20 text-4xl font-serif tracking-tight lg:text-5xl mb-2">
            CV & {content[language].contact}
          </h1>
          <p className="text-lg lg:text-xl text-gray-600">{content[language].contactDescription}</p>
          <div>
            <a href="/cv.pdf" download>
              <button className="bg-black text-white px-4 py-2 rounded-lg">
                Download CV
              </button>
            </a>
          </div>
          <div>
            <p>Email: <a href="" className="text-blue-600 hover:underline">coro benavent 2014 @ gmail . com</a></p>
            <p>Instagram: <a href="https://www.instagram.com/corobenavent" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@corobenavent</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
