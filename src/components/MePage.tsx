import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import OptimizedImage from './OptimizedImage';

/** The Me page content: photos and the full bio. Also used as the director site's About page. */
export const MeContent: React.FC<{ after?: React.ReactNode }> = ({ after }) => (
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
          {after}
        </div>
      </div>
);

/** One About section: text and a photo side by side, alternating sides. Every photo is the same 4:5 shape. */
const AboutRow: React.FC<{ img: string; alt: string; imageLeft?: boolean; quote?: boolean; children: React.ReactNode }> = ({
  img,
  alt,
  imageLeft,
  quote,
  children,
}) => (
  <section className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center">
    <div className={`md:col-span-5 ${imageLeft ? 'md:order-1' : 'md:order-2'}`}>
      <OptimizedImage src={img} width={900} alt={alt} className="w-full aspect-[4/5] object-cover" />
    </div>
    <div
      className={`md:col-span-7 ${imageLeft ? 'md:order-2' : 'md:order-1'} text-white/85 space-y-5 ${
        quote ? 'font-political text-2xl sm:text-3xl leading-snug' : 'text-[17px] leading-[1.8]'
      }`}
    >
      {children}
    </div>
  </section>
);

const link = 'underline underline-offset-4 decoration-white/30 hover:decoration-white';

/**
 * The director site's About page: the Me page's words and photos, laid out in calmer proportions.
 * No photo at the very top; the bio sits next to the black-and-white portrait with glasses.
 */
export const AboutContent: React.FC<{ after?: React.ReactNode }> = ({ after }) => (
  <div className="max-w-6xl mx-auto px-6 sm:px-10 py-12 sm:py-20">
    <h1 className="text-center text-6xl md:text-7xl text-white font-handwritten">Director</h1>

    <div className="mt-14 sm:mt-20 flex flex-col gap-24 sm:gap-32">
      <AboutRow img="/me/me1.jpg" alt="Coro Benavent">
        <p>
          Coro Benavent is a Spanish director, writer and actress based in London. She trained at Corazza in Madrid and at BOVTS, and toured Europe as lead singer of the band ALAMAYO. She holds a degree in Sociology and Global Sustainable Development.
        </p>
        <p>
          On set, she has worked across departments on productions from HBO’s House of the Dragon to A24’s Major Players. She brought all of it to her directing: her narrative music videos have been featured by Kodak and Promonews and earned nominations at the 1.4 Awards and the British Young Arrows.
        </p>
        <p>
          Her latest short, <a href="https://tonos.film" target="_blank" rel="noopener noreferrer" className={link}>Tonos</a>, now in post-production, was written with BAFTA winner Aleksandra Sykulak, produced by SkyeAngel Productions with Spanish co-producers, and shot on 16mm by two-time BAFTA winner Toby Lloyd. Coro stars opposite Goya nominee Julio Peña.
        </p>
        <p>
          In 2025 she co-founded <a href="https://www.garogirls.com" target="_blank" rel="noopener noreferrer" className={link}>GARO</a> with Gabrielle Torreborre, executive producing Gabby’s short Tussle. The screenplay for their upcoming co-directed short, Reva, was a Sofia Coppola DCP Award finalist, ranking in the top 1%, and was longlisted for the FFC Fund.
        </p>
        <p>
          Late 2025, Coro and Gabby flew to San Francisco to raise £80K for their two shorts. Along the way, they met the founders and VCs who inspired their first co-created feature, Two for Tango, which they are now about to develop, write and direct together.
        </p>
      </AboutRow>

      <AboutRow img="/me/me4.jpg" alt="Coro Benavent" imageLeft quote>
        <p>
          <a href="https://tonos.film" target="_blank" rel="noopener noreferrer" className={link}>Tonos</a> is the most personal thing I've made. It's about the voice I lost as a child and the years it took to find it again. Shot on 16mm, written by BAFTA-winning screenwriter Aleksandra Sykulak, starring Julio Pe&ntilde;a. A <a href="https://www.garogirls.com" target="_blank" rel="noopener noreferrer" className={link}>GARO</a> production.
        </p>
      </AboutRow>

      <AboutRow img="/me/me6.jpeg" alt="Coro Benavent" quote>
        <p>
          Palomitas sin maíz is a music video I wrote, directed, and starred in, dedicated to my grandmother the day she passed. It's about her, and the other women who shaped me. Shot on 16mm over two days; featured by Kodak and reviewed by Promonews.
        </p>
      </AboutRow>

      <AboutRow img="/me/me5.png" alt="Coro Benavent" imageLeft quote>
        <p>Outside of film, I write and perform music with my band ALAMAYO. My happy place is being in the water, surfing.</p>
      </AboutRow>

      {after}
    </div>
  </div>
);

const MePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black pt-20">
      <Navbar
        categoryImage="/landing/bottomlefttext.PNG"
        categoryRoute="/me"
        categoryAlt="Me"
      />
      <MeContent />
      <Footer />
    </div>
  );
};

export default MePage;
