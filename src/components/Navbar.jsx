import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Layers } from 'lucide-react';

const THEME_OPTIONS = [
  { value: 'classic', label: 'Classic' },
  { value: 'bmw', label: 'BMW Theme' },
  { value: 'netflix', label: 'Netflix Theme' },
  { value: 'batman', label: 'Batman Theme' },
];

const Navbar = ({ themeName, onThemeChange }) => {
  return (
    <nav className="site-nav">
      <div className="site-nav__inner">
        <Link to="/" className="site-nav__brand">
          <Layers size={24} />
          <span>Recly</span>
        </Link>

        <div className="site-nav__actions">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
