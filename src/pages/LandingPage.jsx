import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { getRecruiterById } from '../services/recruiterService';

const LandingPage = () => {
    const [numberVal, setNumberVal] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const searchRecruiterById = async (id) => {
        try {
            const recData = await getRecruiterById(id);
            console.log(recData);
        } catch (error) {
            console.log(error);
        }
    }

    const inputContainerStyle = {
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        padding: '0.75rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        position: 'relative',
    };

    const labelStyle = {
        color: 'var(--color-text-muted)',
        fontSize: '0.875rem',
        fontWeight: '500',
    };

    const inputStyle = {
        background: 'transparent',
        border: 'none',
        color: 'var(--color-text-main)',
        fontSize: '1.25rem',
        fontWeight: '600',
        width: '100%',
        padding: '0.25rem 0',
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '80px', // Navbar height comp
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
        }}>

            {/* Hero Content */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                // maxWidth: '800px',
                padding: '0 2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2rem',
                width: '100%',
            }}>
                <h1 style={{
                    fontSize: '4rem',
                    lineHeight: '1.1',
                    fontWeight: '800',
                    letterSpacing: '-0.02em',
                }}>
                    <span style={{
                        background: 'linear-gradient(to right, #ffffff, #94a3b8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        Get Recuriter Info
                    </span>
                    <br />
                    <span style={{
                        background: 'var(--gradient-main)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        extraordinary.
                    </span>
                </h1>

                <p style={{
                    color: 'var(--color-text-muted)',
                    fontSize: '1.25rem',
                    // maxWidth: '600px',
                    lineHeight: '1.6',
                }}>
                    Dummy text
                </p>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    width: '70%'
                }}>

                {/* Input Section */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    width: '40%',
                    marginTop: '2rem',
                    background: 'rgba(15, 23, 42, 0.4)',
                    padding: '2rem',
                    borderRadius: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                }}>
                    {/* Number Input */}
                    
                        <div style={inputContainerStyle}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = 'var(--color-primary)';
                                e.currentTarget.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = 'var(--color-border)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                            tabIndex={0}
                        >
                            <label style={labelStyle}>Recuriter-id</label>
                            <input
                                type="number"
                                placeholder="0"
                                value={numberVal}
                                onChange={(e) => setNumberVal(e.target.value)}
                                style={inputStyle}
                            />
                        </div>

                    <button style={{
                        marginTop: '1rem',
                        background: 'var(--gradient-main)',
                        color: 'white',
                        padding: '1rem',
                        borderRadius: '12px',
                        fontWeight: '600',
                        fontSize: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'opacity 0.2s, transform 0.2s',
                        boxShadow: '0 10px 20px -5px rgba(99, 102, 241, 0.4)',
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = '0.9';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = '1';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                        onClick={() => searchRecruiterById(numberVal)}
                    >
                        Search by Recruiter Id <ArrowRight size={20} />
                    </button>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    width: '40%',
                    marginTop: '2rem',
                    background: 'rgba(15, 23, 42, 0.4)',
                    padding: '2rem',
                    borderRadius: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                }}>
                        {/* Dropdown Input */}
                        <div style={inputContainerStyle}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = 'var(--color-primary)';
                                e.currentTarget.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = 'var(--color-border)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                            tabIndex={0}
                        >
                            <label style={labelStyle}>Companies</label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <select
                                    value={selectedOption}
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                    style={{
                                        ...inputStyle,
                                        appearance: 'none',
                                        background: 'transparent',
                                        cursor: 'pointer',
                                        zIndex: 2,
                                    }}
                                >
                                    <option value="" disabled hidden>Select an option</option>
                                    <option value="option1" style={{ color: 'black' }}>Development</option>
                                    <option value="option2" style={{ color: 'black' }}>Design</option>
                                    <option value="option3" style={{ color: 'black' }}>Marketing</option>
                                </select>
                                <ChevronDown size={20} style={{
                                    position: 'absolute',
                                    right: 0,
                                    color: 'var(--color-text-muted)',
                                    pointerEvents: 'none',
                                    zIndex: 1,
                                }} />
                            </div>
                        </div>

                    <button style={{
                        marginTop: '1rem',
                        background: 'var(--gradient-main)',
                        color: 'white',
                        padding: '1rem',
                        borderRadius: '12px',
                        fontWeight: '600',
                        fontSize: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'opacity 0.2s, transform 0.2s',
                        boxShadow: '0 10px 20px -5px rgba(99, 102, 241, 0.4)',
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = '0.9';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = '1';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        Search by Company <ArrowRight size={20} />
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
