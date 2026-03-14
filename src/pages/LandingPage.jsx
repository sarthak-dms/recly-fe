import React, { useRef, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Select, ConfigProvider, theme, Spin } from 'antd';
import { searchCompanies } from '../services/recruiterService';

const LandingPage = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [companyOptions, setCompanyOptions] = useState([]);
    const [loadingCompanies, setLoadingCompanies] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const searchTimeoutRef = useRef(null);
    const searchSectionRef = useRef(null);

    const scrollToSearch = () => {
        searchSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleCompanySearch = (value) => {
        setErrorMessage('');

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (!value || value.trim().length < 2) {
            setCompanyOptions([]);
            return;
        }

        searchTimeoutRef.current = setTimeout(async () => {
            setLoadingCompanies(true);

            try {
                const response = await searchCompanies(value.trim());
                const companies = response?.resp?.companies || [];

                setCompanyOptions(
                    companies.map((company) => ({
                        value: `${company.companyId ?? 'domain'}::${company.domain}`,
                        label: company.domain,
                        companyId: company.companyId,
                        companyName: company.companyName,
                        domain: company.domain,
                        recruiterCount: company.recruiterCount,
                    }))
                );
            } finally {
                setLoadingCompanies(false);
            }
        }, 300);
    };

    const handleCompanyChange = (_, option) => {
        setSelectedCompany(option);
        setErrorMessage('');
    };

    const searchRecruitersByCompanySelection = () => {
        if (!selectedCompany) {
            setErrorMessage('Select a company from the dropdown first.');
            return;
        }

        setErrorMessage('');
        setHasSearched(true);

        const params = new URLSearchParams({
            companyId: selectedCompany.companyId || '',
            domain: selectedCompany.domain || '',
            companyName: selectedCompany.companyName || '',
        });

        window.open(`/results?${params.toString()}`, '_blank');
    };

    const labelStyle = {
        color: 'var(--color-text-muted)',
        fontSize: '0.875rem',
        fontWeight: '500',
        marginBottom: '0.5rem',
        display: 'block',
    };

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
            {/* ── Section 1: Hero Intro ── */}
            <div style={{
                minHeight: '100vh',
                paddingTop: '100px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                position: 'relative',
                padding: '0 2rem',
            }}>
                <h1 style={{
                    fontSize: '3.5rem',
                    lineHeight: '1.1',
                    fontWeight: '800',
                    letterSpacing: '-0.02em',
                    marginBottom: '1.5rem',
                }}>
                    <span style={{
                        background: 'linear-gradient(to right, #ffffff, #94a3b8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        Discover Recruiters
                    </span>
                    <br />
                    <span style={{
                        background: 'var(--gradient-main)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        at any company.
                    </span>
                </h1>

                <p style={{
                    color: 'var(--color-text-muted)',
                    fontSize: '1.25rem',
                    lineHeight: '1.7',
                    maxWidth: '600px',
                    marginBottom: '1rem',
                }}>
                    Recly helps you find recruiter contact information across thousands of
                    companies. Search by company name or domain and get instant results.
                </p>

                <p style={{
                    color: 'var(--color-text-muted)',
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    maxWidth: '520px',
                    opacity: 0.7,
                    marginBottom: '3rem',
                }}>
                    Stop guessing email addresses. Start connecting with the right people.
                </p>

                {/* Scroll-down indicator */}
                <button
                    onClick={scrollToSearch}
                    style={{
                        background: 'none',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '50%',
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        animation: 'bounce 2s infinite',
                        position: 'absolute',
                        bottom: '2rem',
                    }}
                >
                    <ChevronDown size={24} color="var(--color-text-muted)" />
                </button>

                <style>{`
                    @keyframes bounce {
                        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                        40% { transform: translateY(-8px); }
                        60% { transform: translateY(-4px); }
                    }
                `}</style>
            </div>

            {/* ── Section 2: Company Search ── */}
            <div
                ref={searchSectionRef}
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: hasSearched ? 'flex-start' : 'center',
                    gap: '2rem',
                    padding: '80px 2rem 4rem',
                    transition: 'all 0.6s ease',
                }}
            >
                <h2 style={{
                    fontSize: hasSearched ? '1.5rem' : '2rem',
                    fontWeight: '700',
                    letterSpacing: '-0.01em',
                    textAlign: hasSearched ? 'left' : 'center',
                    width: '100%',
                    transition: 'all 0.6s ease',
                }}>
                    <span style={{
                        background: 'linear-gradient(to right, #ffffff, #94a3b8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        Search by Company
                    </span>
                </h2>

                {/* Cards Row */}
                <div style={{
                    display: 'flex',
                    gap: '1.5rem',
                    width: '100%',
                    justifyContent: hasSearched ? 'flex-start' : 'center',
                    alignItems: 'flex-start',
                    transition: 'all 0.6s ease',
                }}>
                    {/* Search Card */}
                    <div style={{
                        width: hasSearched ? '380px' : '100%',
                        maxWidth: '520px',
                        background: 'rgba(15, 23, 42, 0.4)',
                        padding: hasSearched ? '1.5rem' : '2rem',
                        borderRadius: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.25rem',
                        transition: 'all 0.6s ease',
                        flexShrink: 0,
                    }}>
                        <div>
                            <label style={labelStyle}>Company name or domain</label>
                            <Select
                                showSearch
                                placeholder="Type to search companies..."
                                value={selectedCompany ? selectedCompany.value : undefined}
                                onSearch={handleCompanySearch}
                                onChange={handleCompanyChange}
                                options={companyOptions}
                                filterOption={false}
                                notFoundContent={loadingCompanies ? <Spin size="small" /> : null}
                                style={{ width: '100%' }}
                                size="large"
                            />
                        </div>

                        {errorMessage && (
                            <div style={{
                                padding: '0.75rem 1rem',
                                borderRadius: '10px',
                                background: 'rgba(248, 113, 113, 0.12)',
                                border: '1px solid rgba(248, 113, 113, 0.25)',
                                color: '#fecaca',
                                fontSize: '0.875rem',
                            }}>
                                {errorMessage}
                            </div>
                        )}

                        <button
                            style={{
                                background: 'var(--gradient-main)',
                                color: 'white',
                                padding: '0.875rem 1.5rem',
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
                                width: '100%',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.opacity = '0.9';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.opacity = '1';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                            onClick={searchRecruitersByCompanySelection}
                        >
                            Search by Company <ArrowRight size={20} />
                        </button>
                    </div>

                    {/* Info Card — appears after first search */}
                    <div style={{
                        flex: 1,
                        minWidth: 0,
                        background: 'rgba(15, 23, 42, 0.4)',
                        padding: '2rem',
                        borderRadius: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        opacity: hasSearched ? 1 : 0,
                        transform: hasSearched ? 'translateX(0)' : 'translateX(30px)',
                        transition: 'opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s',
                        pointerEvents: hasSearched ? 'auto' : 'none',
                        minHeight: '300px',
                    }}>
                        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem' }}>
                            <span style={{
                                background: 'linear-gradient(to right, #ffffff, #94a3b8)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>
                                Company Info
                            </span>
                        </h3>
                        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                            {/* Placeholder — add your custom content here */}
                            Select and search a company to view detailed information.
                        </p>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default LandingPage;
