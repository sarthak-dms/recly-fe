export const RECRUITER_ENDPOINTS = {
    SEARCH_BY_ID: (id) => `/recruiter/${encodeURIComponent(id)}`,
    LIST: "/recruiter",
    SEARCH_COMPANIES: (search) => `/recruiter/company/search/${encodeURIComponent(search)}`,
    SEARCH_BY_DOMAIN: (domain) => `/recruiter/domain/${encodeURIComponent(domain)}`,
    SEARCH_RECRUITERS_BY_COMPANY_ID: (companyId) => `/recruiter/company/${encodeURIComponent(companyId)}/recruiters`,
};
