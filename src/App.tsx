import React, { useState, useRef, useEffect } from 'react';

const App: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);
  const musicRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLDivElement>(null);
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
    if (refStr === 'CV') ref = cvRef;
    if (refStr === 'Contact' || refStr === 'Contacto') ref = cvRef;

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
      nav: ["Bio", "Reel", "Photos", "Music", "CV", "Contact"],
      title: "Actress /// Singer Performer. Creative",
      description: [
        "Coro Benavent is a vibrant, bilingual actress fluent in both English and Spanish. Born and raised in Madrid, she's been passionately pursuing her craft across borders. Recently, Coro honed her skills in the intensive 10-week theatre and film acting course at the prestigious Bristol Old Vic Theatre School. Her dedication to the art is evident in her ongoing education; she's currently wrapping up her second year in the Film and TV Acting Diploma program at Central de Cine, while simultaneously completing her third year at the renowned Corazza studio.",


        "Coro's on-screen experience includes notable roles in short films. She brought depth to her character in 'Ophelia', produced by CEU University in Madrid, and took center stage in Lourdes Cosentino's compelling short, 'INERTE'.",


        "Her stage presence is equally impressive. In 2024, Coro tackled the lead role of Connie in Lucy Prebble's thought-provoking play 'The Effect', directed by Natalie Simone at Bristol Old Vic. Her theatrical repertoire expanded significantly during her three-year training at Corazza, where she showcased her versatility in productions ranging from David Hare's 'The Blue Room' to Bertolt Brecht's 'Fear and Misery of the Third Reich', and even Shakespeare's timeless 'Much Ado About Nothing'.",


        "But Coro's talents don't stop at acting. She's also making waves in the music scene with her band, ALAMAYO. They've graced the stages of popular venues like Café la Palma, El Pez Gato, and La Nota Rock, to name a few. Coro's creative spirit shines through in her music career as well. She not only released her debut single 'Champagne Moon' but also took the reins in creating and directing its music video. 2024 saw her collaborative side bloom as she teamed up with her brother Diego Benavent to release three new tracks: the catchy 'Muke', the emotive 'Todo huele a ti', and the whimsical 'El primer helado'.",


        "With her multifaceted talents and boundless enthusiasm, Coro Benavent is definitely an artist to watch in both the acting and music worlds.",
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
        "Coro Benavent, actriz bilingüe en inglés y español. Nació en Madrid. Se entrenó recientemente en el Curso de Bristol Old Vic Theatre School de 10 semanas en interpretación para teatro y cine. En el curso 2023-2024 cursó 2º de Diplomatura de Interpretación para Cine y TV en Central de Cine y su tercer año en el estudio Corazza.",
        "Participó en el corto 'Ophelia' para la Universidad CEU de Madrid. Protagonizó el corto 'INERTE' de Lourdes Cosentino.",
        "Participó en la obra 'The Effect' de Lucy Prebble dirigida por Natalie Simone en Bristol Old Vic en 2024, interpretando el papel protagonista de Connie. Realizó muestras de teatro durante sus 3 años de formación en Corazza, trabajando con obras como: 'La habitación azul' de David Hare, 'Terror y miseria en el Tercer Reich' de Bertolt Brecht, y 'Mucho ruido y pocas nueces' de William Shakespeare.",
        "Además, toca junto a su banda ALAMAYO en salas como Café la Palma, El Pez Gato, La Nota Rock, El Chiringuito de Los Locos, El Castillo de Los Locos, etc. Lanzó su primer single 'Champagne Moon' con videoclip creado y dirigido por ella, y sacó 3 nuevas canciones en 2024 creadas junto a su hermano Diego Benavent: 'Muke', 'Todo huele a ti' y 'El primer helado'."
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
          {/* <div className="relative pt-[56.25%]">
            <iframe width="560" height="315"
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/sCgcDh2AVu4?si=AipQj9LPKv6TieMw" title="YouTube video player"
              frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen>
            </iframe>

          </div> */}
        </div>
        {/* spotify link */}
        <p className="text-center text-xl mt-8">Listen to more on <a href="https://open.spotify.com/artist/77zoboLJ6YVACYA4aagcgT" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Spotify</a></p>
      </div>

      <div ref={cvRef} className="p-16 md:p-48 lg:p-96 space-y-8">
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
