import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import RecruiterListPage from './pages/RecruiterListPage';
import RecruiterDetailsPage from './pages/RecruiterDetailsPage';
import SignInPage from './pages/SignInPage';
import './App.css';

const THEME_STORAGE_KEY = 'recly-theme';

function App() {
  const [themeName, setThemeName] = useState(() => localStorage.getItem(THEME_STORAGE_KEY) || 'netflix');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem(THEME_STORAGE_KEY, themeName);
  }, [themeName]);

  return (
    <Router>
      <AuthProvider>
        <Navbar
          themeName={themeName}
          onThemeChange={setThemeName}
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route
            path="/recruiters"
            element={(
              <ProtectedRoute>
                <RecruiterListPage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/recruiters/:recruiterId"
            element={(
              <ProtectedRoute>
                <RecruiterDetailsPage />
              </ProtectedRoute>
            )}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
