import React, { useState, useRef, useEffect } from 'react';
import RetroButton from './components/RetroButton';

const App: React.FC = () => {
  const bioTitleRef = useRef<HTMLHeadingElement>(null);
  const reelTitleRef = useRef<HTMLHeadingElement>(null);
  const photosTitleRef = useRef<HTMLHeadingElement>(null);
  const musicTitleRef = useRef<HTMLHeadingElement>(null);


  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollToSection = (refStr: string) => {
    const refMap = {
      'Bio': bioTitleRef,
      'Bibliografía': bioTitleRef,
      'Reel': reelTitleRef,
      'Photos': photosTitleRef,
      'Fotos': photosTitleRef,
      'Music': musicTitleRef,
      'Música': musicTitleRef,

    };

    const targetRef = refMap[refStr as keyof typeof refMap];

    if (!targetRef?.current) return;

    const offset = 40;
    const elementTop = targetRef.current.getBoundingClientRect().top;
    const absoluteElementTop = elementTop + window.scrollY;

    window.scrollTo({
      top: absoluteElementTop - offset,
      behavior: 'smooth'
    });
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
      nav: ["Bio", "Reel", "Photos", "Music", "CV"],
      title: "Actress, Director, Singer",
      description: [
        "I am an actress, director and singer (musician) building my career by telling human stories. I was trained as an actress at Corazza, Madrid, and The Bristol Old Vic. I have been creating music and art for 10 years. In my art, I try to bring to life the creativity and humanity that emerges in groups oriented at common objectives. Above all I value the freedom to create, and I believe this can only be done with an open heart.",
        "In August 2025, I am officially starting a production company with my co-creative partner Gabrielle Torreborre :)",
        "In July 2025, I directed a narrative music video for one of my songs, \"SUPERGLUE\", a self composed song. The film involves two actors playing a couple in crisis, with two Conservatoire dancers playing their alter egos.",
        "In June 2025, I worked as the director's assistant on a documentary following shepherds during their 40-day transhumance journey from southern to northern Spain. As the director was from Scotland and didn't speak Spanish, I was their bridge, responsible for gathering local context, orchestrating conversations about this disappearing tradition, and capturing authentic moments.",
        "In May 2025, I created and produced a music video for \"Palomitas sin maíz\", a song I wrote to my grandmother the day that she passed away. The narrative explored my relationship to her and the other female role models in my life. It was shot on 16mm and starred Dinah Stabb, Gully (a musician), a horse and myself. The 2-day shoot was featured by Kodak, reviewed by Promonews and has been pre-nominated for the Shiny Awards.",
        "In February 2025, I co-created a concept photoshoot called 'Sisters, sisters' with Gabrielle Torreborre about two sisters reconnecting after a big dispute.",
        "In December, I organised and performed at one of our many concerts of my band ALAMAYO, where we presented many new songs that are coming out slowly but surely.",
        "Finally, my happy place is being in the water surfing and have a strong passion for all sorts of sports.",
      ],
      reel: "Reel",
      reelDescription: "Some of my scenes",
      photos: "Photos",
      music: "Music",

    },
    es: {
      name: "Coro Benavent",
      nav: ["Bibliografía", "Reel", "Fotos", "Música", "CV"],
      title: "Actriz /// Cantante Intérprete. Creativa",
      description: [
        "Soy actriz, directora y cantante (músico) construyendo mi carrera contando historias humanas. Me formé como actriz en Corazza, Madrid, y en The Bristol Old Vic. He estado creando música y arte durante 10 años. En mi arte, intento dar vida a la creatividad y humanidad que emerge en grupos orientados a objetivos comunes. Sobre todo valoro la libertad para crear, y creo que esto solo se puede hacer con el corazón abierto.",
        "En agosto de 2025, estoy oficialmente iniciando una productora con mi compañera creativa Gabrielle Torreborre :)",
        "En julio de 2025, dirigí un videoclip narrativo para una de mis canciones, \"SUPERGLUE\", una canción autocompuesta. La película involucra a dos actores interpretando a una pareja en crisis, con dos bailarines del Conservatorio interpretando sus alter egos.",
        "En junio de 2025, trabajé como asistente de dirección en un documental siguiendo a pastores durante su viaje de trashumancia de 40 días desde el sur hasta el norte de España. Como el director era de Escocia y no hablaba español, yo era su puente, responsable de recopilar contexto local, orquestar conversaciones sobre esta tradición que desaparece, y capturar momentos auténticos.",
        "En mayo de 2025, creé y produje un videoclip para \"Palomitas sin maíz\", una canción que escribí a mi abuela el día que falleció. La narrativa exploraba mi relación con ella y las otras modelos femeninas en mi vida. Fue filmado en 16mm y protagonizado por Dinah Stabb, Gully (un músico), un caballo y yo misma. El rodaje de 2 días fue destacado por Kodak, reseñado por Promonews y ha sido pre-nominado para los Shiny Awards.",
        "En febrero de 2025, co-creé una sesión de fotos conceptual llamada 'Sisters, sisters' con Gabrielle Torreborre sobre dos hermanas que se reconectan después de una gran disputa.",
        "En diciembre, organicé y actué en uno de nuestros muchos conciertos de mi banda ALAMAYO, donde presentamos muchas canciones nuevas que están saliendo lentamente pero seguramente.",
        "Finalmente, mi lugar feliz es estar en el agua surfeando y tengo una fuerte pasión por todo tipo de deportes.",
      ],
      reel: "Reel",
      reelDescription: "Algunas de sus escenas",
      photos: "Fotos",
      music: "Música",

    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);

      const scrollPositionWithOffset = position + 100;
      const sections = [
        { id: 'about', ref: bioTitleRef },
        { id: 'reel', ref: reelTitleRef },
        { id: 'photos', ref: photosTitleRef },
        { id: 'music', ref: musicTitleRef }
      ];

      const currentSection = sections.reverse().find(section =>
        section.ref.current && scrollPositionWithOffset >= section.ref.current.offsetTop
      );

      setActiveSection(currentSection ? currentSection.id : '');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className="h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: `url('night.jpg')`,
        }}
      >
        {/* Coro Text Overlay */}
        <div className="absolute inset-0 flex items-start justify-center pointer-events-none pt-12">
          <img 
            src="coro_text.png" 
            alt="Coro" 
            className="max-w-[50%] max-h-[30%] object-contain"
            style={{
              filter: 'brightness(0) invert(1)',
            }}
          />
        </div>
        
        {/* Navigation Buttons */}
        <div className="absolute top-8 left-0 right-0 flex justify-center">
          <div className="flex flex-row space-x-4">
            {content[language].nav.map((section) => (
              section === "CV" ? (
                <a key={section} href="/cv2.pdf" download className="block w-32">
                  <RetroButton size="md" className="w-full">
                    {section}
                  </RetroButton>
                </a>
              ) : (
                <RetroButton
                  key={section}
                  size="md"
                  className="w-32"
                  onClick={() => {
                    scrollToSection(section);
                  }}
                >
                  {section}
                </RetroButton>
              )
            ))}
          </div>
        </div>
        
        <div className="w-full flex justify-end p-4">
          <div className="flex items-center">
            <div className="mr-4 flex items-center rounded-full p-1">
              <span className="mr-2 font-semibold">🇬🇧</span>
              <button
                onClick={toggleLanguage}
                className="w-7 h-4 relative rounded-full bg-gray-400 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-300 focus:ring-white"
              >
                <span className="sr-only">Toggle Language</span>
                <span
                  className={`absolute inset-y-0 left-0 w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-300 ease-in-out ${language === 'es' ? 'translate-x-3' : ''}`}
                />
              </button>
              <span className="ml-2 font-semibold">🇪🇸</span>
            </div>
          </div>
        </div>

        <div className="px-8 md:px-16 lg:px-32 w-full h-full font-serif flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex flex-row justify-between items-center w-full">


          </div>


        </div>
      </div>

      <div className="p-16 md:p-48 lg:px-96 space-y-8">
        <div className="relative space-y-16">
          <h1 ref={bioTitleRef} className="scroll-m-20 text-4xl font-serif tracking-tight lg:text-5xl mb-2">
            {content[language].title}
          </h1>
          {content[language].description.map((paragraph, index) => (
            <p key={index} className="text-lg lg:text-xl text-gray-600">{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="bg-gray-200 py-48 px-4 md:px-8 lg:px-16">
        <h2 ref={reelTitleRef} className="scroll-m-20 text-4xl font-serif tracking-tight lg:text-5xl mb-2 text-center">
          Reel
        </h2>
        <p className="text-center text-xl mb-8">{content[language].reelDescription}</p>
        <div className="max-w-4xl py-16 mx-auto space-y-6">
          <div className="relative pt-[56.25%]">
            <iframe width="560" height="315"
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/3lYq80w47Mg?si=OSlI7bmty0YDHo23"
              title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
          <div className="relative pt-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/p_XBSMKQYT0?si=zSdPoenXEOCYb9_M"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <div className="py-16 px-4 md:px-8 lg:px-16">
        <h2 ref={photosTitleRef} className="scroll-m-20 text-4xl font-serif tracking-tight lg:text-5xl mb-2 text-center">
          {content[language].photos}
        </h2>
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

      <div className="bg-gray-200 py-48 px-4 md:px-8 lg:px-16">
        <h2 ref={musicTitleRef} className="scroll-m-20 text-4xl font-serif tracking-tight lg:text-5xl mb-2 text-center">
          {content[language].music}
        </h2>
        <div className="max-w-4xl py-16 mx-auto space-y-6">
          <div className="relative pt-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              width="560" height="315" src="https://www.youtube.com/embed/DJiASArAgN4?si=QFFHvowjkyZSu3Jh" title="YouTube video player"
              frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
            </iframe>
          </div>
        </div>
        <p className="text-center text-xl mt-8">Listen to more on <a href="https://open.spotify.com/artist/77zoboLJ6YVACYA4aagcgT" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Spotify</a></p>
      </div>


    </div>
  );
};

export default App;
