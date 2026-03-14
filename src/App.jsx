import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ResultsPage from './pages/ResultsPage';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/results" element={<ResultsPage />} />
        {/* Placeholder for future routes */}
        <Route path="/login" element={<div style={{ paddingTop: '100px', textAlign: 'center' }}>Login Page (Coming Soon)</div>} />
        <Route path="/signup" element={<div style={{ paddingTop: '100px', textAlign: 'center' }}>Sign Up Page (Coming Soon)</div>} />
      </Routes>
    </Router>
  );
}

export default App;
