import React, { useEffect, useRef, useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import RevealOnScroll from '../components/RevealOnScroll';
import SearchPanel from '../components/SearchPanel';
import SectionIntro from '../components/SectionIntro';
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
      <div className="page-shell">
        <RevealOnScroll className="hero-panel hero-panel--fullscreen is-visible">
          <SectionIntro
            className="section-intro--full"
            kicker="Recruiter Directory"
            title="Discover the right recruiter contact before your outreach starts."
            description="Recly helps you search company domains, pull recruiter results fast, and move into profile review with a cleaner, modern workflow."
          />
        </RevealOnScroll>

        <RevealOnScroll className="landing-search-section" delay={120}>
          <SearchPanel
            selectedCompany={selectedCompany}
            companyOptions={companyOptions}
            loadingCompanies={loadingCompanies}
            loadingRecruiters={loadingRecruiters}
            onCompanySearch={handleCompanySearch}
            onCompanyChange={handleCompanyChange}
            onSearch={searchRecruitersByCompanySelection}
          />
        </RevealOnScroll>

        {errorMessage ? <div className="error-banner">{errorMessage}</div> : null}
      </div>
    </ConfigProvider>
  );
};

export default LandingPage;
