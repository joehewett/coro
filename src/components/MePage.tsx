import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import OptimizedImage from './OptimizedImage';

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
            <OptimizedImage
              src="/me/me1.jpg"
              width={800}
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
                Coro Benavent is a Spanish director, writer and actress based in London. She trained at Corazza in Madrid and at BOVTS, and toured Europe as lead singer of the band ALAMAYO. She holds a degree in Sociology and Global Sustainable Development.
              </p>

              <p>
                On set, she has worked across departments on productions from HBO’s House of the Dragon to A24’s Major Players. She brought all of it to her directing: her narrative music videos have been featured by Kodak and Promonews and earned nominations at the 1.4 Awards and the British Young Arrows.
              </p>

              <p>
                Her latest short, <a href="https://tonos.film" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Tonos</a>, now in post-production, was written with BAFTA winner Aleksandra Sykulak, produced by SkyeAngel Productions with Spanish co-producers, and shot on 16mm by two-time BAFTA winner Toby Lloyd. Coro stars opposite Goya nominee Julio Peña.
              </p>

              <p>
                In 2025 she co-founded <a href="https://www.garogirls.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">GARO</a> with Gabrielle Torreborre, executive producing Gabby’s short Tussle. The screenplay for their upcoming co-directed short, Reva, was a Sofia Coppola DCP Award finalist, ranking in the top 1%, and was longlisted for the FFC Fund.
              </p>

              <p>
                Late 2025, Coro and Gabby flew to San Francisco to raise £80K for their two shorts. Along the way, they met the founders and VCs who inspired their first co-created feature, Two for Tango, which they are now about to develop, write and direct together.
              </p>
            </div>
            <div>
              <OptimizedImage
                src="/me/me3.jpg"
                width={600}
                alt="Coro Benavent"
                className="w-full h-auto object-cover shadow-2xl"
              />
            </div>
          </div>

          {/* Second Text Section with Opposite Side Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="md:order-2 text-white/90 leading-relaxed space-y-4 text-base">
              <p>
                <a href="https://tonos.film" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Tonos</a> is the most personal thing I've made. It's about the voice I lost as a child and the years it took to find it again. Shot on 16mm, written by BAFTA-winning screenwriter Aleksandra Sykulak, starring Julio Pe&ntilde;a. A <a href="https://garo.studio" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">GARO</a> production.
              </p>
            </div>
            <div className="md:order-1">
              <OptimizedImage
                src="/me/me4.jpg"
                width={600}
                alt="Coro Benavent"
                className="w-full h-auto object-cover shadow-2xl"
              />
            </div>
          </div>

          {/* Full Width Image */}
          <div className="w-full">
            <OptimizedImage
              src="/me/me5.png"
              width={1200}
              alt="Coro Benavent"
              className="w-full h-auto object-cover shadow-2xl"
            />
          </div>

          {/* Third Text Section with Side Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-white/90 leading-relaxed space-y-4 text-base">
              <p>
                Palomitas sin maíz is a music video I wrote, directed, and starred in, dedicated to my grandmother the day she passed. It's about her, and the other women who shaped me. Shot on 16mm over two days; featured by Kodak and reviewed by Promonews.
              </p>
            </div>
            <div>
              <OptimizedImage
                src="/me/me6.jpeg"
                width={600}
                alt="Coro Benavent"
                className="w-full h-auto object-cover shadow-2xl"
              />
            </div>
          </div>

          {/* Final Text Section */}
          <div className="w-full max-w-3xl mx-auto text-white/90 leading-relaxed space-y-4 text-base">
            <p>
              Outside of film, I write and perform music with my band ALAMAYO. My happy place is being in the water, surfing.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MePage;
