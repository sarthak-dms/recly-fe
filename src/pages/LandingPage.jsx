import React, { useEffect, useRef, useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import BackdropMosaic from '../components/BackdropMosaic';
import SearchPanel from '../components/SearchPanel';
import { useAuth } from '../context/AuthContext';
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
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
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
    if (!isAuthenticated) {
      navigate('/signin', {
        state: {
          from: '/',
          message: 'Sign in with an admin account before searching recruiter data.',
        },
      });
      return;
    }

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

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: 'var(--color-primary)',
          colorBgContainer: 'var(--color-surface)',
          colorBorder: 'var(--color-border)',
          colorText: 'var(--color-text-main)',
          colorTextBase: 'var(--color-text-main)',
          colorTextPlaceholder: 'var(--color-text-muted)',
          borderRadius: 16,
          fontSize: 15,
          controlHeight: 56,
        },
        components: {
          Select: {
            colorBgContainer: 'var(--color-surface)',
            colorBgElevated: 'var(--color-surface)',
            colorBorder: 'var(--color-border)',
            colorPrimary: 'var(--color-primary)',
            colorPrimaryHover: 'var(--color-primary)',
            colorText: 'var(--color-text-main)',
            colorTextPlaceholder: 'var(--color-text-muted)',
            optionSelectedBg: 'var(--color-surface-muted)',
            optionActiveBg: 'var(--color-surface-muted)',
            optionSelectedColor: 'var(--color-text-main)',
            selectorBg: 'var(--color-surface)',
            activeBorderColor: 'var(--color-primary)',
            hoverBorderColor: 'var(--color-primary)',
          },
        },
      }}
    >
      <div className="marketing-page">
        <BackdropMosaic />

        <div className="page-shell page-shell--marketing">
          <section className="marketing-hero">
            <div className="marketing-hero__content">
              <p className="marketing-hero__eyebrow">Recruiter Directory</p>
              <h1 className="marketing-hero__title">
                Get recruiter information first and reach out before everyone else.
              </h1>
              <p className="marketing-hero__subtitle">
                Search company domains, find recruiter details faster, and move into
                targeted outreach with a workflow built for early contact.
              </p>

              <SearchPanel
                selectedCompany={selectedCompany}
                companyOptions={companyOptions}
                loadingCompanies={loadingCompanies}
                loadingRecruiters={loadingRecruiters}
                onCompanySearch={handleCompanySearch}
                onCompanyChange={handleCompanyChange}
                onSearch={searchRecruitersByCompanySelection}
                variant="hero"
              />

              {errorMessage ? <div className="error-banner">{errorMessage}</div> : null}
            </div>
          </section>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default LandingPage;
