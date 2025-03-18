import React from 'react';
import DummyStory from './pages/DummyStory';
import LandingPage from './pages/LandingPage';
import AddEntityForm from './pages/AddEntityForm';  
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/story" element={<DummyStory />} />
        <Route path="/add-entity" element={<AddEntityForm />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
