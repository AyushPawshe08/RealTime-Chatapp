import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE ==="development"? "https://social-chain.onrender.com/api": "/api",
    withCredentials:true,
})
