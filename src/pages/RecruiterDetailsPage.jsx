import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { BriefcaseBusiness, Building2, Mail, Phone, UserRound } from 'lucide-react';
import { getRecruiterById } from '../services/recruiterService';

const RecruiterDetailsPage = () => {
    const { recruiterId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [recruiter, setRecruiter] = useState(location.state?.recruiter || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadRecruiter = async () => {
            if (recruiter || !/^\d+$/.test(recruiterId || '')) {
                return;
            }

            setLoading(true);
            setError('');

            try {
                const data = await getRecruiterById(recruiterId);
                if (data?.resp) {
                    setRecruiter(data.resp);
                } else {
                    setError('Recruiter details are not available.');
                }
            } finally {
                setLoading(false);
            }
        };

        loadRecruiter();
    }, [recruiter, recruiterId]);

    const safeEmail = recruiter?.email || '';

    return (
        <div className="page-shell">
            <section className="details-header">
                <button className="secondary-button" onClick={() => navigate('/recruiters')}>
                    Back to list
                </button>
            </section>

            {loading ? <div className="empty-panel">Loading profile...</div> : null}
            {!loading && error ? <div className="error-banner">{error}</div> : null}
            {!loading && !error && !recruiter ? (
                <div className="empty-panel">
                    Recruiter profile is not available. <Link to="/recruiters">Return to recruiter list.</Link>
                </div>
            ) : null}

            {recruiter ? (
                <article className="profile-card">
                    <header className="profile-header">
                        <div className="avatar-circle">
                            <UserRound size={22} />
                        </div>
                        <div>
                            <h1>{recruiter.name || 'Unknown recruiter'}</h1>
                            <p>{recruiter.designation || 'No designation available'}</p>
                        </div>
                    </header>

                    <section className="profile-grid">
                        <div className="profile-item">
                                <Mail size={16} />
                            <div>
                                <label>Email</label>
                                {safeEmail ? <a href={`mailto:${safeEmail}`}>{safeEmail}</a> : <span>N/A</span>}
                            </div>
                        </div>

                        <div className="profile-item">
                            <Phone size={16} />
                            <div>
                                <label>Phone</label>
                                <span>{recruiter.phone || 'N/A'}</span>
                            </div>
                        </div>

                        <div className="profile-item">
                            <BriefcaseBusiness size={16} />
                            <div>
                                <label>Company</label>
                                <span>{recruiter.companyName || 'N/A'}</span>
                            </div>
                        </div>

                        <div className="profile-item">
                            <Building2 size={16} />
                            <div>
                                <label>Domain</label>
                                <span>{recruiter.domain || 'N/A'}</span>
                            </div>
                        </div>
                    </section>
                </article>
            ) : null}
        </div>
    );
};

export default RecruiterDetailsPage;
