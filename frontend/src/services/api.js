import axios from "axios";     //importing axios library to make HTTP requests

const API = axios.create({      //Creates a customized Axios object, every request automatically starts with: http://localhost:3000/api
    baseURL: "http://localhost:3000/api"        // this is API instance
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