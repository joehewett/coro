import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import ActressPage from './components/ActressPage';
import DirectorPage from './components/DirectorPage';
import MusicianPage from './components/MusicianPage';
import MePage from './components/MePage';
import PalomitasSinMaiz from './components/projects/PalomitasSinMaiz';
import SesionDeSurf from './components/projects/SesionDeSurf';
import UrbanTales from './components/projects/UrbanTales';
import TheLastDance from './components/projects/TheLastDance';
import Inerte from './components/projects/Inerte';
import Superglue from './components/projects/Superglue';
import PadreHijoPastor from './components/projects/PadreHijoPastor';
import Ragni from './components/projects/Ragni';
import EchoesOfTomorrow from './components/projects/EchoesOfTomorrow';
import LiveAtSunset from './components/projects/LiveAtSunset';
import MusicVideo1 from './components/projects/MusicVideo1';
import MusicVideo2 from './components/projects/MusicVideo2';
import MusicVideo3 from './components/projects/MusicVideo3';
import MusicVideo4 from './components/projects/MusicVideo4';
import PersonalJourney from './components/projects/PersonalJourney';
import BehindTheScenes from './components/projects/BehindTheScenes';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        {/* Homepage route without navigation */}
        <Route path="/" element={<Homepage />} />
        
        {/* Category pages */}
        <Route path="/actress" element={<ActressPage />} />
        <Route path="/director" element={<DirectorPage />} />
        <Route path="/musician" element={<MusicianPage />} />
        <Route path="/me" element={<MePage />} />
        
        {/* Actress project pages */}
        <Route path="/actress/inerte" element={<Inerte />} />
        <Route path="/actress/palomitas-sin-maiz" element={<PalomitasSinMaiz />} />
        <Route path="/actress/sesion-de-surf" element={<SesionDeSurf />} />
        <Route path="/actress/urban-tales" element={<UrbanTales />} />
        <Route path="/actress/the-last-dance" element={<TheLastDance />} />
        
        {/* Director project pages */}
        <Route path="/director/superglue" element={<Superglue />} />
        <Route path="/director/palomitas-sin-maiz" element={<PalomitasSinMaiz />} />
        <Route path="/director/ragni" element={<Ragni />} />
        <Route path="/director/padre-hijo-pastor" element={<PadreHijoPastor />} />
        
        {/* Musician project pages */}
        <Route path="/musician/echoes-of-tomorrow" element={<EchoesOfTomorrow />} />
        <Route path="/musician/live-at-sunset" element={<LiveAtSunset />} />
        <Route path="/musician/music-video-1" element={<MusicVideo1 />} />
        <Route path="/musician/music-video-2" element={<MusicVideo2 />} />
        <Route path="/musician/music-video-3" element={<MusicVideo3 />} />
        <Route path="/musician/music-video-4" element={<MusicVideo4 />} />
        
        {/* Personal project pages */}
        <Route path="/me/personal-journey" element={<PersonalJourney />} />
        <Route path="/me/behind-the-scenes" element={<BehindTheScenes />} />
      </Routes>
    </>
  );
};

export default App;
