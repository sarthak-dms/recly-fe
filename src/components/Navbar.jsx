import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Layers } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const THEME_OPTIONS = [
  { value: 'classic', label: 'Classic' },
  { value: 'bmw', label: 'BMW Theme' },
  { value: 'netflix', label: 'Netflix Theme' },
  { value: 'batman', label: 'Batman Theme' },
];

const Navbar = ({ themeName, onThemeChange }) => {
  const location = useLocation();
  const isMarketingPage = location.pathname === '/' || location.pathname === '/signin';
  const { isAuthenticated, signOut } = useAuth();

  return (
    <nav className={`site-nav${isMarketingPage ? ' site-nav--marketing' : ''}`}>
      <div className="site-nav__inner">
        <Link to="/" className="site-nav__brand">
          <Layers size={24} />
          <span className="site-nav__brand-text">Recly</span>
        </Link>

        <div className="site-nav__actions">
          {isMarketingPage ? (
            <>
              {isAuthenticated ? (
                <>
                  <Link to="/recruiters" className="site-nav__link site-nav__link--marketing">
                    Recruiters
                  </Link>
                  <button type="button" className="site-nav__cta site-nav__cta--ghost" onClick={signOut}>
                    Sign Out
                  </button>
                </>
              ) : (
                <Link to={location.pathname === '/signin' ? '/' : '/signin'} className="site-nav__cta">
                  {location.pathname === '/signin' ? 'Home' : 'Sign In'}
                </Link>
              )}
            </>
          ) : (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `site-nav__link${isActive ? ' site-nav__link--active' : ''}`
                }
                end
              >
                Home
              </NavLink>

              <NavLink
                to="/recruiters"
                className={({ isActive }) =>
                  `site-nav__link${isActive ? ' site-nav__link--active' : ''}`
                }
              >
                Recruiters
              </NavLink>

              <select
                value={themeName}
                onChange={(event) => onThemeChange(event.target.value)}
                className="site-nav__theme-switcher"
              >
                {THEME_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {isAuthenticated ? (
                <button type="button" className="site-nav__link site-nav__button" onClick={signOut}>
                  Sign Out
                </button>
              ) : null}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
