import axios from "axios";

const api = axios.create({
    baseURL: "https://recly-2k0t.onrender.com",
    timeout: 10000,
});

export default api;