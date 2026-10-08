import axios from "axios";     //importing axios library to make HTTP requests

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Small helper so components don't repeat the Authorization header everywhere
export const authConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

// Fetch Instagram metrics (LIVE + DB stored data)
export const fetchInstagramMetrics = async (data, token) => {
    const res = await API.post(
        "/metrics/instagram/fetch",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return res.data;
};


export default API;
