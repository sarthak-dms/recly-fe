import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import RecruiterListPage from './pages/RecruiterListPage';
import RecruiterDetailsPage from './pages/RecruiterDetailsPage';
import './App.css';

const THEME_STORAGE_KEY = 'recly-theme';

function App() {
  const [themeName, setThemeName] = useState(() => localStorage.getItem(THEME_STORAGE_KEY) || 'classic');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem(THEME_STORAGE_KEY, themeName);
  }, [themeName]);

  return (
    <Router>
      <Navbar
        themeName={themeName}
        onThemeChange={setThemeName}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/recruiters" element={<RecruiterListPage />} />
        <Route path="/recruiters/:recruiterId" element={<RecruiterDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
