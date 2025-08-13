import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import ActressPage from './components/ActressPage';
import DirectorPage from './components/DirectorPage';
import MusicianPage from './components/MusicianPage';
import MePage from './components/MePage';
import PalomitasSinMaiz from './components/projects/PalomitasSinMaiz';
import MidnightEchoes from './components/projects/MidnightEchoes';

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
      
      {/* Project pages - will add these as we create them */}
      <Route path="/actress/palomitas-sin-maiz" element={<PalomitasSinMaiz />} />
      <Route path="/director/midnight-echoes" element={<MidnightEchoes />} />
    </Routes>
  );
};

export default App;
