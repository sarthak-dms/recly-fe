import React from 'react';
import { Link } from 'react-router-dom';
import { Layers } from 'lucide-react';

const Navbar = () => {
    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            backdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            borderBottom: '1px solid var(--color-border)',
            padding: '1rem 2rem',
        }}>
            <div style={{
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
                    fontSize: '1.5rem',
                    letterSpacing: '-0.025em',
                }}>
                    <Layers size={28} />
                    <span style={{
                        background: 'var(--gradient-main)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        Recly
                    </span>
                </Link>

                {/* Navigation Links */}
                <div style={{
                    display: 'flex',
                    gap: '2rem',
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

                    <Link to="/login" style={{
                        textDecoration: 'none',
                        color: 'var(--color-text-muted)',
                        fontWeight: '500',
                        fontSize: '1rem',
                        transition: 'color 0.2s ease',
                    }}
                        onMouseEnter={(e) => e.target.style.color = 'var(--color-text-main)'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
                    >
                        Login
                    </Link>

                    <Link to="/signup" style={{
                        textDecoration: 'none',
                        padding: '0.5rem 1.25rem',
                        background: 'var(--gradient-main)',
                        borderRadius: '9999px',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '0.95rem',
                        transition: 'opacity 0.2s ease',
                        boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)',
                    }}
                        onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                        onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
