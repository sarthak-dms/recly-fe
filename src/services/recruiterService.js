import api from "../api/axiosInstance";
import { RECRUITER_ENDPOINTS } from "../constants/APIConstants";

const getRecruiterById = async (id) => {
    try {
        const recData = await api.get(RECRUITER_ENDPOINTS.SEARCH_BY_ID(id));
        return recData.data;
    } catch (error) {
        console.log(error);
    }
}

export { getRecruiterById };