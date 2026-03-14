import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ConfigProvider, theme, Spin, Table } from 'antd';
import {
    getRecruitersByCompanyId,
    getRecruitersByDomain,
} from '../services/recruiterService';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <span style={{ fontWeight: 600 }}>{text}</span>,
    },
    {
        title: 'Designation',
        dataIndex: 'designation',
        key: 'designation',
        render: (text) => text || 'N/A',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        render: (text) => text || 'N/A',
    },
    {
        title: 'Company',
        dataIndex: 'companyName',
        key: 'companyName',
        render: (text) => text || 'N/A',
    },
    {
        title: 'Domain',
        dataIndex: 'domain',
        key: 'domain',
        render: (text) => text || 'N/A',
    },
    {
        title: 'Company ID',
        dataIndex: 'companyId',
        key: 'companyId',
        render: (text) => text ?? 'N/A',
    },
];

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
                    colorBgContainer: '#0f172a',
                    colorBorder: 'rgba(255, 255, 255, 0.08)',
                    colorText: '#e2e8f0',
                    colorTextPlaceholder: 'var(--color-text-muted)',
                    borderRadius: 8,
                    fontSize: 14,
                },
                components: {
                    Table: {
                        headerBg: 'rgba(99, 102, 241, 0.12)',
                        headerColor: '#c7d2fe',
                        rowHoverBg: 'rgba(99, 102, 241, 0.06)',
                        borderColor: 'rgba(255, 255, 255, 0.06)',
                        colorBgContainer: 'transparent',
                    },
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
                <div style={{
                    width: '100%',
                    maxWidth: '1100px',
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
                        {!loading && (
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

                    <Table
                        columns={columns}
                        dataSource={recruiters}
                        loading={loading}
                        rowKey={(record) => `${record.id}-${record.email}`}
                        pagination={{ pageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '50'] }}
                        scroll={{ x: 800 }}
                        locale={{ emptyText: 'No recruiters found.' }}
                    />
                </div>
            </div>
        </ConfigProvider>
    );
};

export default ResultsPage;
