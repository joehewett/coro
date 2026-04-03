import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const MePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black pt-20">
      <Navbar 
        categoryImage="/landing/bottomlefttext.PNG"
        categoryRoute="/me"
        categoryAlt="Me"
      />
      
      <div className="px-10 max-w-6xl mx-auto py-16">
        <div className="flex flex-col gap-16 max-w-5xl mx-auto">
          {/* Hero Image */}
          <div className="w-full max-w-3xl mx-auto">
            <img 
              src="/me/me1.jpg" 
              alt="Coro Benavent"
              className="w-full aspect-square object-cover shadow-2xl"
            />
          </div>
          
          {/* Title */}
          <div className="w-full text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white font-handwritten">
              Director
            </h1>
          </div>

          {/* First Text Section with Side Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-white/90 leading-relaxed space-y-4 text-base">
              <p>
                I am a director telling human stories through film. I was trained as an actress at Corazza, Madrid, and The Bristol Old Vic, and have been creating music and art for 10 years. I've directed crews of up to 50 people on micro budgets, and my work has been featured by Kodak, Promonews, and nominated for British Young Arrows. Above all I value the freedom to create, and I believe this can only be done with an open heart.
              </p>

              <p>
                In 2025, I co-founded <a href="https://garo.studio" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Garo Studios</a> with my co-creative partner Gabrielle Torreborre, a production company for auteur-driven film. Together we've released Ragni (#1 Most Watched Music Video of 2025 on Promonews), Palomitas sin maíz (featured by Kodak), and SUPERGLUE. Nominated for British Young Arrows. We're currently in production on two short films, <a href="https://tonos.film" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Tonos</a> and Tussle, with a feature in the pipeline.
              </p>
            </div>
            <div>
              <img 
                src="/me/me3.jpg" 
                alt="Coro Benavent"
                className="w-full h-auto object-cover shadow-2xl"
              />
            </div>
          </div>

          {/* Second Text Section with Opposite Side Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="md:order-2 text-white/90 leading-relaxed space-y-4 text-base">
              <p>
                Right now, I'm directing <a href="https://tonos.film" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Tonos</a>, a short film about reclaiming your voice. It's the most personal thing I've made, about the voice I lost as a child and the years it took to find it again. Shot on 16mm, written by BAFTA-winning screenwriter Aleksandra Sykulak, starring Julio Pe&ntilde;a. A <a href="https://garo.studio" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Garo Studios</a> production.
              </p>
            </div>
            <div className="md:order-1">
              <img
                src="/me/me4.jpg"
                alt="Coro Benavent"
                className="w-full h-auto object-cover shadow-2xl"
              />
            </div>
          </div>

          {/* Full Width Image */}
          <div className="w-full">
            <img
              src="/me/me5.png"
              alt="Coro Benavent"
              className="w-full h-auto object-cover shadow-2xl"
            />
          </div>

          {/* Third Text Section with Side Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-white/90 leading-relaxed space-y-4 text-base">
              <p>
                Palomitas sin maíz is a music video I wrote, directed and starred in, dedicated to my grandmother the day she passed away. It explores my relationship to her and the other female role models in my life. Shot on 16mm over two days, it was featured by Kodak and reviewed by Promonews.
              </p>
            </div>
            <div>
              <img
                src="/me/me6.jpeg"
                alt="Coro Benavent"
                className="w-full h-auto object-cover shadow-2xl"
              />
            </div>
          </div>

          {/* Final Text Section */}
          <div className="w-full max-w-3xl mx-auto text-white/90 leading-relaxed space-y-4 text-base">
            <p>
              Outside of film, I write and perform music with my band ALAMAYO. My happy place is being in the water surfing.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MePage;
