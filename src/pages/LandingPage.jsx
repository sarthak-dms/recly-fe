import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { InputNumber, Select, ConfigProvider, theme } from 'antd';
import { getRecruiterById } from '../services/recruiterService';

const LandingPage = () => {
    const [numberVal, setNumberVal] = useState(null);
    const [selectedOption, setSelectedOption] = useState(undefined);

    const searchRecruiterById = async (id) => {
        try {
            const recData = await getRecruiterById(id);
            console.log(recData);
        } catch (error) {
            console.log(error);
        }
    };

    const labelStyle = {
        color: 'var(--color-text-muted)',
        fontSize: '0.875rem',
        fontWeight: '500',
        marginBottom: '0.5rem',
        display: 'block',
    };

    const companyOptions = [
        { value: 'option1', label: 'Apple' },
        { value: 'option2', label: 'Amazon' },
        { value: 'option3', label: 'Google' },
    ];

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: '#6366f1',
                    colorBgContainer: 'var(--color-bg-card)',
                    colorBorder: 'var(--color-border)',
                    colorText: 'var(--color-text-main)',
                    colorTextPlaceholder: 'var(--color-text-muted)',
                    borderRadius: 12,
                    fontSize: 16,
                    controlHeight: 48,
                },
                components: {
                    InputNumber: {
                        activeBorderColor: '#6366f1',
                        hoverBorderColor: '#6366f1',
                        activeShadow: '0 0 0 4px rgba(99, 102, 241, 0.1)',
                        colorBgContainer: 'var(--color-bg-card)',
                        fontSizeLG: 20,
                        fontWeightStrong: 600,
                    },
                    Select: {
                        colorBgContainer: 'var(--color-bg-card)',
                        colorBgElevated: '#1e293b',
                        optionSelectedBg: 'rgba(99, 102, 241, 0.2)',
                        optionActiveBg: 'rgba(99, 102, 241, 0.1)',
                        selectorBg: 'var(--color-bg-card)',
                    },
                },
            }}
        >
            <div style={{
                minHeight: '100vh',
                paddingTop: '100px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}>

                {/* Hero Content */}
                <div style={{
                    position: 'relative',
                    zIndex: 10,
                    padding: '0 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '2rem',
                    width: '100%',
                }}>
                    <div>
                        <h1 style={{
                            fontSize: '3rem',
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
                            lineHeight: '1.6',
                        }}>
                            Dummy text
                        </p>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        width: '70%',
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
                            <div>
                                <label style={labelStyle}>Recuriter-id</label>
                                <InputNumber
                                    placeholder="0"
                                    value={numberVal}
                                    onChange={(value) => setNumberVal(value)}
                                    style={{ width: '100%' }}
                                    size="large"
                                    controls={false}
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
                                border: 'none',
                                cursor: 'pointer',
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
                            <div>
                                <label style={labelStyle}>Companies</label>
                                <Select
                                    placeholder="Select an option"
                                    value={selectedOption}
                                    onChange={(value) => setSelectedOption(value)}
                                    options={companyOptions}
                                    style={{ width: '100%' }}
                                    size="large"
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
                                border: 'none',
                                cursor: 'pointer',
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
        </ConfigProvider>
    );
};

export default LandingPage;
