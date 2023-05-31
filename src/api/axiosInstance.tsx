import axios from "axios";
import { parseCookies } from "nookies";


const { "socialMate.token": token } = parseCookies();



const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  
    // baseURL: "http://localhost:3443/api",

});

export default axiosInstance;

if (token) {
    axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
}


