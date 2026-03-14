import api from "../api/axiosInstance";
import { RECRUITER_ENDPOINTS } from "../constants/APIConstants";

const getRecruiterById = async (id) => {
    try {
        const recData = await api.get(RECRUITER_ENDPOINTS.SEARCH_BY_ID(id));
        return recData.data;
    } catch (error) {
        console.log(error);
    }
};

const searchCompanies = async (search) => {
    try {
        const response = await api.get(RECRUITER_ENDPOINTS.SEARCH_COMPANIES(search));
        return response.data;
    } catch (error) {
        console.log(error);
        return { resp: { companies: [] } };
    }
};

const getRecruitersByCompanyId = async (companyId) => {
    try {
        const response = await api.get(RECRUITER_ENDPOINTS.SEARCH_RECRUITERS_BY_COMPANY_ID(companyId));
        return response.data;
    } catch (error) {
        console.log(error);
        return { resp: { recruiters: [] } };
    }
};

const getRecruitersByDomain = async (domain) => {
    try {
        const response = await api.get(RECRUITER_ENDPOINTS.SEARCH_BY_DOMAIN(domain));
        return response.data;
    } catch (error) {
        console.log(error);
        return { resp: { recruiters: [] } };
    }
};

export {
    getRecruiterById,
    searchCompanies,
    getRecruitersByCompanyId,
    getRecruitersByDomain,
};
