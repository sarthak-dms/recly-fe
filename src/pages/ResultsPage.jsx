import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ConfigProvider, theme, Spin } from 'antd';
import {
    getRecruitersByCompanyId,
    getRecruitersByDomain,
} from '../services/recruiterService';

const ResultsPage = () => {
    const [searchParams] = useSearchParams();
    const companyId = searchParams.get('companyId');
    const domain = searchParams.get('domain');
    const companyName = searchParams.get('companyName');

    const [recruiters, setRecruiters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchRecruiters = async () => {
            try {
                let response;
                if (companyId && companyId !== 'null') {
                    response = await getRecruitersByCompanyId(companyId);
                } else if (domain) {
                    response = await getRecruitersByDomain(domain);
                } else {
                    setErrorMessage('No company or domain specified.');
                    setLoading(false);
                    return;
                }

                const recruiterList = response?.resp?.recruiters || [];
                setRecruiters(recruiterList);

                if (!recruiterList.length) {
                    setErrorMessage('No recruiters found for the selected company/domain.');
                }
            } catch (error) {
                console.error(error);
                setErrorMessage('Something went wrong while fetching recruiters.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecruiters();
    }, [companyId, domain]);

    const label = companyName && domain
        ? `${companyName} (${domain})`
        : domain || 'Unknown';

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
                },
            }}
        >
            <div style={{
                minHeight: '100vh',
                paddingTop: '100px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '100px 2rem 4rem',
            }}>
                {/* Results Card */}
                <div style={{
                    width: '100%',
                    maxWidth: '960px',
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
                        marginBottom: '1.5rem',
                        flexWrap: 'wrap',
                    }}>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.75rem' }}>
                                <span style={{
                                    background: 'linear-gradient(to right, #ffffff, #94a3b8)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}>
                                    Recruiter Results
                                </span>
                            </h2>
                            <p style={{ color: 'var(--color-text-muted)', margin: '0.5rem 0 0 0' }}>
                                {label}
                            </p>
                        </div>
                        {loading ? <Spin /> : (
                            <span style={{
                                color: 'var(--color-text-muted)',
                                fontSize: '0.875rem',
                            }}>
                                {recruiters.length} recruiter{recruiters.length !== 1 ? 's' : ''} found
                            </span>
                        )}
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

                    {loading ? (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '3rem',
                        }}>
                            <Spin size="large" />
                        </div>
                    ) : recruiters.length ? (
                        <div style={{
                            display: 'grid',
                            gap: '1rem',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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
                    ) : !errorMessage ? (
                        <div style={{
                            padding: '1.25rem',
                            borderRadius: '16px',
                            background: 'rgba(30, 41, 59, 0.45)',
                            color: 'var(--color-text-muted)',
                        }}>
                            No recruiters found.
                        </div>
                    ) : null}
                </div>
            </div>
        </ConfigProvider>
    );
};

export default ResultsPage;
