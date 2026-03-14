import React, { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { InputNumber, Select, ConfigProvider, theme, Spin } from 'antd';
import {
    getRecruiterById,
    searchCompanies,
    getRecruitersByCompanyId,
    getRecruitersByDomain,
} from '../services/recruiterService';

const LandingPage = () => {
    const [numberVal, setNumberVal] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(undefined);
    const [companyOptions, setCompanyOptions] = useState([]);
    const [recruiters, setRecruiters] = useState([]);
    const [lastSearchLabel, setLastSearchLabel] = useState('');
    const [loadingCompanies, setLoadingCompanies] = useState(false);
    const [loadingRecruiters, setLoadingRecruiters] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const searchTimeoutRef = useRef(null);

    const searchRecruiterById = async (id) => {
        try {
            const recData = await getRecruiterById(id);
            const recruiter = recData?.resp ? [recData.resp] : [];
            setRecruiters(recruiter);
            setLastSearchLabel(id ? `Recruiter id: ${id}` : '');
            setErrorMessage(recruiter.length ? '' : 'No recruiter found for this recruiter id.');
        } catch (error) {
            console.log(error);
        }
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

    const searchRecruitersByCompanySelection = async () => {
        if (!selectedCompany) {
            setErrorMessage('Select a company from the dropdown first.');
            return;
        }

        setLoadingRecruiters(true);
        setErrorMessage('');

        try {
            let response;

            if (selectedCompany.companyId) {
                response = await getRecruitersByCompanyId(selectedCompany.companyId);
            } else {
                response = await getRecruitersByDomain(selectedCompany.domain);
            }

            const recruiterList = response?.resp?.recruiters || [];
            setRecruiters(recruiterList);
            setLastSearchLabel(
                `${selectedCompany.companyName} (${selectedCompany.domain})`
            );

            if (!recruiterList.length) {
                setErrorMessage('No recruiters found for the selected company/domain.');
            }
        } finally {
            setLoadingRecruiters(false);
        }
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
                                    showSearch
                                    filterOption={false}
                                    labelInValue
                                    placeholder="Type at least 2 characters"
                                    value={selectedCompany ? {
                                        value: selectedCompany.value,
                                        label: selectedCompany.label,
                                    } : undefined}
                                    onSearch={handleCompanySearch}
                                    onChange={handleCompanyChange}
                                    notFoundContent={loadingCompanies ? <Spin size="small" /> : null}
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
                                onClick={searchRecruitersByCompanySelection}
                            >
                                Search by Company <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>

                    <div style={{
                        width: '70%',
                        marginTop: '1rem',
                        background: 'rgba(15, 23, 42, 0.4)',
                        padding: '2rem',
                        borderRadius: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        textAlign: 'left',
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '1rem',
                            marginBottom: '1rem',
                            flexWrap: 'wrap',
                        }}>
                            <div>
                                <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Recruiter Results</h2>
                                <p style={{ color: 'var(--color-text-muted)', margin: '0.5rem 0 0 0' }}>
                                    {lastSearchLabel || 'Run a recruiter or company search to see results.'}
                                </p>
                            </div>
                            {loadingRecruiters ? <Spin /> : null}
                        </div>

                        {errorMessage ? (
                            <div style={{
                                marginBottom: '1rem',
                                padding: '1rem',
                                borderRadius: '12px',
                                background: 'rgba(248, 113, 113, 0.12)',
                                border: '1px solid rgba(248, 113, 113, 0.25)',
                                color: '#fecaca',
                            }}>
                                {errorMessage}
                            </div>
                        ) : null}

                        {recruiters.length ? (
                            <div style={{
                                display: 'grid',
                                gap: '1rem',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                            }}>
                                {recruiters.map((recruiter) => (
                                    <div
                                        key={`${recruiter.id}-${recruiter.email}`}
                                        style={{
                                            background: 'rgba(30, 41, 59, 0.7)',
                                            border: '1px solid rgba(255, 255, 255, 0.06)',
                                            borderRadius: '18px',
                                            padding: '1.25rem',
                                        }}
                                    >
                                        <div style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                                            {recruiter.name}
                                        </div>
                                        <div style={{ color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                                            {recruiter.designation || 'No designation'}
                                        </div>
                                        <div style={{ display: 'grid', gap: '0.45rem', color: '#cbd5e1' }}>
                                            <span><strong>Email:</strong> {recruiter.email}</span>
                                            <span><strong>Phone:</strong> {recruiter.phone || 'N/A'}</span>
                                            <span><strong>Company:</strong> {recruiter.companyName || 'N/A'}</span>
                                            <span><strong>Domain:</strong> {recruiter.domain || 'N/A'}</span>
                                            <span><strong>Company Id:</strong> {recruiter.companyId ?? 'N/A'}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{
                                padding: '1.25rem',
                                borderRadius: '16px',
                                background: 'rgba(30, 41, 59, 0.45)',
                                color: 'var(--color-text-muted)',
                            }}>
                                No recruiters loaded yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default LandingPage;
