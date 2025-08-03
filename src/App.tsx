import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Homepage from './components/Homepage';

const App: React.FC = () => {
  return (
    <Routes>
      {/* Homepage route without navigation */}
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
};

export default App;
