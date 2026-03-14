import React from 'react';
import { Link } from 'react-router-dom';
import { Layers } from 'lucide-react';

const THEME_OPTIONS = [
    { value: 'classic', label: 'Classic' },
    { value: 'bmw', label: 'BMW Theme' },
    { value: 'netflix', label: 'Netflix Theme' },
    { value: 'batman', label: 'Batman Theme' },
];

const Navbar = ({ themeName, onThemeChange }) => {
    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            backdropFilter: 'blur(8px)',
            backgroundColor: 'var(--color-bg-card)',
            borderBottom: '1px solid var(--color-border)',
            padding: '0.85rem 1.2rem',
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                {/* Logo */}
                <Link to="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none',
                    color: 'var(--color-primary)',
                    fontWeight: '700',
                    fontSize: '1.35rem',
                    letterSpacing: '-0.025em',
                }}>
                    <Layers size={24} />
                    <span>Recly</span>
                </Link>

                {/* Navigation Links */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                }}>
                    <Link to="/" style={{
                        textDecoration: 'none',
                        color: 'var(--color-text-main)',
                        fontWeight: '500',
                        fontSize: '1rem',
                        transition: 'color 0.2s ease',
                    }}
                        onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--color-text-main)'}
                    >
                        Home
                    </Link>

                    <Link to="/recruiters" style={{
                        textDecoration: 'none',
                        color: 'var(--color-text-muted)',
                        fontWeight: '500',
                        fontSize: '1rem',
                        transition: 'color 0.2s ease',
                    }}
                        onMouseEnter={(e) => e.target.style.color = 'var(--color-text-main)'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
                    >
                        Recruiters
                    </Link>

                    <select
                        value={themeName}
                        onChange={(event) => onThemeChange(event.target.value)}
                        style={{
                            border: '1px solid var(--color-border)',
                            borderRadius: '10px',
                            background: 'var(--color-bg-card)',
                            color: 'var(--color-text-main)',
                            padding: '0.42rem 0.55rem',
                            fontSize: '0.88rem',
                        }}
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
