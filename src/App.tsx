import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import ActressPage from './components/ActressPage';
import DirectorPage from './components/DirectorPage';
import MusicianPage from './components/MusicianPage';
import MePage from './components/MePage';
import PalomitasSinMaiz from './components/projects/PalomitasSinMaiz';
import SummerDreams from './components/projects/SummerDreams';
import UrbanTales from './components/projects/UrbanTales';
import TheLastDance from './components/projects/TheLastDance';
import MidnightEchoes from './components/projects/MidnightEchoes';
import CityLights from './components/projects/CityLights';
import EchoesOfTomorrow from './components/projects/EchoesOfTomorrow';
import LiveAtSunset from './components/projects/LiveAtSunset';
import PersonalJourney from './components/projects/PersonalJourney';
import BehindTheScenes from './components/projects/BehindTheScenes';
import PixelAdventure from './components/game/PixelAdventure';

const App: React.FC = () => {
  return (
    <Routes>
      {/* Homepage route without navigation */}
      <Route path="/" element={<Homepage />} />
      
      {/* Category pages */}
      <Route path="/actress" element={<ActressPage />} />
      <Route path="/director" element={<DirectorPage />} />
      <Route path="/musician" element={<MusicianPage />} />
      <Route path="/me" element={<MePage />} />
      
      {/* Actress project pages */}
      <Route path="/actress/palomitas-sin-maiz" element={<PalomitasSinMaiz />} />
      <Route path="/actress/summer-dreams" element={<SummerDreams />} />
      <Route path="/actress/urban-tales" element={<UrbanTales />} />
      <Route path="/actress/the-last-dance" element={<TheLastDance />} />
      
      {/* Director project pages */}
      <Route path="/director/midnight-echoes" element={<MidnightEchoes />} />
      <Route path="/director/city-lights" element={<CityLights />} />
      
      {/* Musician project pages */}
      <Route path="/musician/echoes-of-tomorrow" element={<EchoesOfTomorrow />} />
      <Route path="/musician/live-at-sunset" element={<LiveAtSunset />} />
      
      {/* Personal project pages */}
      <Route path="/me/personal-journey" element={<PersonalJourney />} />
      <Route path="/me/behind-the-scenes" element={<BehindTheScenes />} />
      
      {/* Secret game route */}
      <Route path="/secret" element={<PixelAdventure />} />
    </Routes>
  );
};

export default App;
