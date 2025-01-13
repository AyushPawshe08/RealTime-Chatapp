import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE ==="development"? "https://socialchat-socket.vercel.app": "/api",
    withCredentials:true,
})
