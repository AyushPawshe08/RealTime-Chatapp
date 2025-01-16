import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE ==="development"? "https://real-time-chatapp-delta.vercel.app": "/api",
    withCredentials:true,
})
