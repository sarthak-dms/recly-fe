import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Building2 } from 'lucide-react';
import { Select, ConfigProvider, theme, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    searchCompanies,
    getRecruitersByCompanyId,
    getRecruitersByDomain,
} from '../services/recruiterService';

const RECRUITER_RESULTS_STORAGE_KEY = 'recruiter-search-results';

const LandingPage = () => {
    const [selectedCompany, setSelectedCompany] = useState(undefined);
    const [companyOptions, setCompanyOptions] = useState([]);
    const [loadingCompanies, setLoadingCompanies] = useState(false);
    const [loadingRecruiters, setLoadingRecruiters] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const searchTimeoutRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => () => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
    }, []);

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
            const searchLabel = `${selectedCompany.companyName} (${selectedCompany.domain})`;

            if (!recruiterList.length) {
                setErrorMessage('No recruiters found for the selected company/domain.');
                return;
            }

            const payload = {
                recruiters: recruiterList,
                searchLabel,
                updatedAt: Date.now(),
            };

            sessionStorage.setItem(RECRUITER_RESULTS_STORAGE_KEY, JSON.stringify(payload));
            navigate('/recruiters', { state: payload });
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
                algorithm: theme.defaultAlgorithm,
                token: {
                    colorPrimary: '#2f6b5f',
                    colorBgContainer: '#ffffff',
                    colorBorder: 'var(--color-border)',
                    colorText: 'var(--color-text-main)',
                    colorTextPlaceholder: 'var(--color-text-muted)',
                    borderRadius: 12,
                    fontSize: 15,
                    controlHeight: 44,
                },
                components: {
                    Select: {
                        colorBgContainer: '#ffffff',
                        colorBgElevated: '#ffffff',
                        optionSelectedBg: '#e7f0ee',
                        optionActiveBg: '#f2f7f5',
                        selectorBg: '#ffffff',
                    },
                },
            }}
        >
            <div className="page-shell">
                <section className="hero-panel">
                    <p className="hero-kicker">Recruiter Directory</p>
                    <h1 className="hero-title">Find recruiters by company</h1>
                    <p className="hero-subtitle">
                        Search a company domain, fetch the list, and open detailed profiles from a dedicated page.
                    </p>
                </section>

                <section className="search-panel">
                    <div className="search-icon"><Building2 size={20} /></div>
                    <div className="search-field">
                        <label style={labelStyle}>Company search</label>
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

                    <button
                        className="primary-button"
                        onClick={searchRecruitersByCompanySelection}
                        disabled={loadingRecruiters}
                    >
                        {loadingRecruiters ? 'Searching...' : 'View Recruiters'}
                        {loadingRecruiters ? null : <ArrowRight size={18} />}
                    </button>
                </section>

                {errorMessage ? (
                    <div className="error-banner">{errorMessage}</div>
                ) : null}
            </div>
        </ConfigProvider>
    );
};

export default LandingPage;
