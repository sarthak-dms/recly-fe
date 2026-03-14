import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Copy, ExternalLink, Mail, Users } from 'lucide-react';

const RECRUITER_RESULTS_STORAGE_KEY = 'recruiter-search-results';

const RecruiterListPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [copyStatus, setCopyStatus] = useState('');
    const [payload, setPayload] = useState(() => {
        if (location.state?.recruiters?.length) {
            return location.state;
        }

        const cached = sessionStorage.getItem(RECRUITER_RESULTS_STORAGE_KEY);
        if (!cached) {
            return { recruiters: [], searchLabel: '' };
        }

        try {
            return JSON.parse(cached);
        } catch {
            return { recruiters: [], searchLabel: '' };
        }
    });

    useEffect(() => {
        if (!location.state?.recruiters?.length) {
            return;
        }
        setPayload(location.state);
    }, [location.state]);

    const recruiters = payload?.recruiters || [];
    const searchLabel = payload?.searchLabel || 'Latest recruiter search';

    const allEmails = useMemo(
        () => [...new Set(recruiters.map((recruiter) => recruiter.email).filter(Boolean))],
        [recruiters]
    );

    const copyAllEmails = async () => {
        if (!allEmails.length) {
            return;
        }

        try {
            await navigator.clipboard.writeText(allEmails.join(', '));
            setCopyStatus('Copied');
        } catch {
            setCopyStatus('Copy failed');
        }
        setTimeout(() => setCopyStatus(''), 2000);
    };

    return (
        <div className="page-shell">
            <section className="list-header">
                <div>
                    <p className="hero-kicker">Recruiters</p>
                    <h1 className="hero-title small">Recruiter list</h1>
                    <p className="hero-subtitle">{searchLabel}</p>
                </div>
                <div className="list-actions">
                    <button className="secondary-button" onClick={() => navigate('/')}>
                        New search
                    </button>
                    <button
                        className="primary-button"
                        onClick={copyAllEmails}
                        disabled={!allEmails.length}
                    >
                        <Copy size={16} />
                        Copy all emails
                    </button>
                </div>
            </section>

            {copyStatus ? <div className="success-banner">{copyStatus}</div> : null}

            {!recruiters.length ? (
                <div className="empty-panel">
                    No recruiter records found. <Link to="/">Go back and search again.</Link>
                </div>
            ) : (
                <div className="table-wrap">
                    <table className="recruiter-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Designation</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Company</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recruiters.map((recruiter, index) => {
                                const id = recruiter.id ?? recruiter.email ?? index;
                                return (
                                    <tr key={`${id}-${index}`}>
                                        <td>{recruiter.name || 'N/A'}</td>
                                        <td>{recruiter.designation || 'N/A'}</td>
                                        <td>
                                            <span className="cell-inline">
                                                <Mail size={14} />
                                                {recruiter.email || 'N/A'}
                                            </span>
                                        </td>
                                        <td>{recruiter.phone || 'N/A'}</td>
                                        <td>{recruiter.companyName || recruiter.domain || 'N/A'}</td>
                                        <td>
                                            <button
                                                className="table-link"
                                                onClick={() => navigate(`/recruiters/${encodeURIComponent(id)}`, {
                                                    state: { recruiter },
                                                })}
                                            >
                                                More details <ExternalLink size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <div className="mobile-list">
                        {recruiters.map((recruiter, index) => {
                            const id = recruiter.id ?? recruiter.email ?? index;
                            return (
                                <article className="mobile-card" key={`mobile-${id}-${index}`}>
                                    <h3>{recruiter.name || 'N/A'}</h3>
                                    <p>{recruiter.designation || 'N/A'}</p>
                                    <p>{recruiter.email || 'N/A'}</p>
                                    <button
                                        className="table-link"
                                        onClick={() => navigate(`/recruiters/${encodeURIComponent(id)}`, {
                                            state: { recruiter },
                                        })}
                                    >
                                        View profile <Users size={14} />
                                    </button>
                                </article>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecruiterListPage;
