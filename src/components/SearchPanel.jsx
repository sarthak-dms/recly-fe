import { ArrowRight, Building2 } from 'lucide-react';
import { Select, Spin } from 'antd';

const SearchPanel = ({
  selectedCompany,
  companyOptions,
  loadingCompanies,
  loadingRecruiters,
  onCompanySearch,
  onCompanyChange,
  onSearch,
}) => {
  return (
    <section className="search-panel search-panel--modern">
      <div className="search-panel__header">
        <div className="search-icon">
          <Building2 size={20} />
        </div>
        <div>
          <p className="search-panel__eyebrow">Quick search</p>
          <h2>Search a company and open recruiter profiles in one step</h2>
        </div>
      </div>

      <div className="search-panel__body">
        <div className="search-field">
          <label className="field-label">Company search</label>
          <Select
            showSearch
            filterOption={false}
            labelInValue
            placeholder="Type at least 2 characters"
            value={
              selectedCompany
                ? {
                    value: selectedCompany.value,
                    label: selectedCompany.label,
                  }
                : undefined
            }
            onSearch={onCompanySearch}
            onChange={onCompanyChange}
            notFoundContent={loadingCompanies ? <Spin size="small" /> : null}
            options={companyOptions}
            style={{ width: '100%' }}
            size="large"
            popupClassName="company-select-dropdown"
          />
        </div>

        <button
          className="primary-button primary-button--glow"
          onClick={onSearch}
          disabled={loadingRecruiters}
        >
          <span>{loadingRecruiters ? 'Searching...' : 'View Recruiters'}</span>
          {loadingRecruiters ? null : <ArrowRight size={18} />}
        </button>
      </div>
    </section>
  );
};

export default SearchPanel;
